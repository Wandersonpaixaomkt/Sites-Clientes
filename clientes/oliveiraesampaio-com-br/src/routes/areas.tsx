import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Landmark, Scale, Shield } from "lucide-react";
import { SiteShell } from "@/components/site/shell";
import { firm, services } from "@/data/firm";

const icons = {
  briefcase: Briefcase,
  scale: Scale,
  shield: Shield,
  landmark: Landmark,
} as const;

export const Route = createFileRoute("/areas")({ component: Areas });

function Areas() {
  return (
    <SiteShell>
      <main>
        <header className="bg-ink py-16 text-paper">
          <div className="site-wrap">
            <p className="kicker mb-3">// Áreas de atuação</p>
            <h1 className="display text-5xl">Quatro frentes, um escritório</h1>
          </div>
        </header>
        <section className="site-wrap grid gap-8 py-16 md:grid-cols-2">
          {services.map((item) => {
            const Icon = icons[item.icon];
            return (
              <article key={item.id} className="border border-line bg-paper p-8 shadow-lift">
                <Icon className="mb-4 size-8 text-brand" strokeWidth={1.4} />
                <h2 className="display mb-3 text-3xl">{item.title}</h2>
                <p className="text-muted">{item.body}</p>
              </article>
            );
          })}
        </section>
        <section className="bg-mist py-12">
          <div className="site-wrap flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="max-w-xl text-muted">
              Dúvida sobre o enquadramento da sua causa? Fale com a recepção em {firm.city} — o escritório
              indica a área responsável.
            </p>
            <a href={firm.phones.whatsapp.message} className="btn-primary">
              WhatsApp
            </a>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
