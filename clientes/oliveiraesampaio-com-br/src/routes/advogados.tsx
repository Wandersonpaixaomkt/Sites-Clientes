import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { team } from "@/data/firm";

export const Route = createFileRoute("/advogados")({ component: Advogados });

function Advogados() {
  return (
    <SiteShell>
      <main>
        <header className="bg-ink py-16 text-paper">
          <div className="site-wrap">
            <p className="kicker mb-3">// Equipe</p>
            <h1 className="display text-5xl">Advogados do escritório</h1>
            <p className="mt-4 max-w-xl text-paper/70">
              Nomes, fotos e inscrições OAB publicados na página institucional. Cargos conforme o site original.
            </p>
          </div>
        </header>
        <section className="site-wrap grid grid-cols-2 gap-5 py-16 md:grid-cols-3 lg:grid-cols-5">
          {team.map((person) => (
            <article key={person.oab} className="bg-mist">
              <img src={person.photo} alt={person.name} className="aspect-[4/5] w-full object-cover object-top" />
              <div className="p-4">
                <h2 className="font-display text-lg uppercase leading-tight">{person.name}</h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                  {person.role}
                  <br />
                  {person.oab}
                </p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
