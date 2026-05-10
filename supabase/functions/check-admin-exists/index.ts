import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Primary check: at least one staff_members owner exists
    const { count: ownerCount, error: ownerErr } = await supabase
      .from("staff_members")
      .select("*", { count: "exact", head: true })
      .eq("role", "owner");

    if (ownerErr) throw ownerErr;

    let exists = (ownerCount ?? 0) > 0;

    // Legacy fallback: check user_roles admin
    if (!exists) {
      const { count: adminCount, error: adminErr } = await supabase
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .eq("role", "admin");
      if (adminErr) throw adminErr;
      exists = (adminCount ?? 0) > 0;
    }

    return new Response(JSON.stringify({ exists }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
