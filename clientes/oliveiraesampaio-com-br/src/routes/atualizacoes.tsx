import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { getLegalNews, type LegalHeadline } from "@/lib/legal-news";

export const Route = createFileRoute("/atualizacoes")({ component: Atualizacoes });

function Atualizacoes() {
  const [items, setItems] = useState<LegalHeadline[] | null>(null);

  useEffect(() => {
    getLegalNews()
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  return (
    <SiteShell>
      <main>
        <header className="bg-ink py-16 text-paper">
          <div className="site-wrap">
            <p className="kicker mb-3">// Atualizações</p>
            <h1 className="display text-5xl">Pará, Brasil e tribunais</h1>
            <p className="mt-4 max-w-xl text-paper/70">
              Manchetes recentes sobre STF, TST, OAB, TJPA e Direito — atualizadas automaticamente.
            </p>
          </div>
        </header>
        <section className="site-wrap py-16">
          {items === null ? <p className="text-muted">Carregando…</p> : null}
          {items && items.length === 0 ? (
            <p className="text-muted">Não foi possível carregar as manchetes agora.</p>
          ) : null}
          {items && items.length > 0 ? (
            <div className="blog-grid">
              {items.map((item) => (
                <article key={item.url} className="blog-card">
                  <p className="news-meta">
                    {item.date} · {item.source}
                  </p>
                  <a href={item.url} className="news-title" target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                </article>
              ))}
            </div>
          ) : null}
        </section>
      </main>
    </SiteShell>
  );
}
