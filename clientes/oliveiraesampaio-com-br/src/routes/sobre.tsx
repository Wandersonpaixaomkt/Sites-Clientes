import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { firm } from "@/data/firm";

export const Route = createFileRoute("/sobre")({ component: Sobre });

function Sobre() {
  return (
    <SiteShell>
      <main>
        <header className="bg-ink py-16 text-paper">
          <div className="site-wrap">
            <p className="kicker mb-3">// Sobre nós</p>
            <h1 className="display text-5xl">O escritório</h1>
          </div>
        </header>
        <section className="site-wrap grid gap-10 py-16 lg:grid-cols-2">
          <img src="/firm/hero-4.jpg" alt="Recepção Oliveira e Sampaio" className="h-full max-h-[28rem] w-full object-cover" />
          <div>
            <p className="mb-4 text-muted">
              Fundado em {firm.foundedLabel}, o {firm.name} reúne uma equipe de advogados experientes e
              estrutura sólida para oferecer soluções jurídicas seguras, inovadoras e ágeis.
            </p>
            <p className="mb-4 text-muted">
              Tem sede na cidade de {firm.city} e presença reconhecida na {firm.region}. Atua diretamente nos
              estados do {firm.states}, e em todo o Brasil através de parceiros e correspondentes.
            </p>
            <p className="mb-8 text-muted">
              Destaca-se pelo atendimento personalizado no acompanhamento das questões jurídicas, com ênfase
              em Direito do Trabalho (coletivo ou individual), Direito Civil e Comercial.
            </p>
            <h2 className="display mb-2 text-2xl">Missão</h2>
            <p className="mb-6 text-muted">{firm.mission}</p>
            <h2 className="display mb-2 text-2xl">Visão</h2>
            <p className="mb-6 text-muted">{firm.vision}</p>
            <h2 className="display mb-2 text-2xl">Valores</h2>
            <p className="mb-8 text-muted">{firm.values.join(", ")}.</p>
            <Link to="/contato" className="btn-primary">
              Falar com o escritório
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
