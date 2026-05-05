import PageLayout from "@/components/PageLayout";
import { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  heading: string;
  children: ReactNode;
}

export default function LegalPage({ title, description, heading, children }: Props) {
  return (
    <PageLayout title={title} description={description}>
      <section className="section">
        <div className="container-tight max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">{heading}</h1>
          <div className="prose prose-sm mt-6 max-w-none text-foreground [&>h2]:mt-8 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-primary [&>p]:mt-3 [&>p]:text-muted-foreground [&>ul]:mt-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:text-muted-foreground">
            {children}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
