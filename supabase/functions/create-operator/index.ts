import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });
}

async function requireOwner(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return { error: json({ error: "Unauthorized" }, 401) };
  const token = authHeader.slice("Bearer ".length);

  const url = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const userClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
  const { data: claims, error: claimsErr } = await userClient.auth.getClaims(token);
  if (claimsErr || !claims?.claims?.sub) return { error: json({ error: "Unauthorized" }, 401) };
  const callerId = claims.claims.sub as string;

  const admin = createClient(url, service);
  const { data: row, error: roleErr } = await admin
    .from("staff_members")
    .select("role")
    .eq("user_id", callerId)
    .maybeSingle();
  if (roleErr) return { error: json({ error: roleErr.message }, 500) };
  if (!row || row.role !== "owner") return { error: json({ error: "Forbidden — owner only" }, 403) };

  return { admin, callerId };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const gate = await requireOwner(req);
    if ("error" in gate) return gate.error;
    const { admin } = gate;

    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const mode = body.mode === "invite" ? "invite" : "password";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ error: "Ungültige E-Mail-Adresse." }, 400);
    }
    if (mode === "password" && password.length < 8) {
      return json({ error: "Passwort muss mindestens 8 Zeichen haben." }, 400);
    }

    let userId: string | null = null;

    async function findExisting(): Promise<string | null> {
      for (let page = 1; page <= 10; page++) {
        const { data: list, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
        if (error) return null;
        const match = list.users.find((u) => u.email?.toLowerCase() === email);
        if (match) return match.id;
        if (list.users.length < 200) break;
      }
      return null;
    }

    if (mode === "password") {
      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      if (created?.user) {
        userId = created.user.id;
      } else if (createErr) {
        const msg = createErr.message?.toLowerCase() ?? "";
        const exists =
          msg.includes("already been registered") ||
          msg.includes("already registered") ||
          msg.includes("already exists");
        if (!exists) return json({ error: createErr.message }, 400);
        const found = await findExisting();
        if (!found) return json({ error: "User existiert, konnte aber nicht gefunden werden." }, 500);
        const { error: updErr } = await admin.auth.admin.updateUserById(found, {
          password,
          email_confirm: true,
        });
        if (updErr) return json({ error: updErr.message }, 400);
        userId = found;
      }
    } else {
      // invite
      const { data: invited, error: inviteErr } = await admin.auth.admin.inviteUserByEmail(email);
      if (invited?.user) {
        userId = invited.user.id;
      } else if (inviteErr) {
        const msg = inviteErr.message?.toLowerCase() ?? "";
        const exists =
          msg.includes("already been registered") ||
          msg.includes("already registered") ||
          msg.includes("already exists");
        if (!exists) return json({ error: inviteErr.message }, 400);
        const found = await findExisting();
        if (!found) return json({ error: "User existiert, konnte aber nicht gefunden werden." }, 500);
        userId = found;
      }
    }

    if (!userId) return json({ error: "Konnte User nicht erstellen." }, 500);

    // Force operator role only — owner role can never be created here
    const { error: staffErr } = await admin
      .from("staff_members")
      .upsert({ user_id: userId, role: "operator" }, { onConflict: "user_id" });
    if (staffErr) return json({ error: staffErr.message }, 500);

    return json({ success: true, user_id: userId, mode });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
