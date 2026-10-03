import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SiteShell } from "@/components/site/shell";
import { gallery } from "@/data/firm";

export const Route = createFileRoute("/galeria")({ component: Galeria });

function Galeria() {
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? null : gallery[open];

  function step(dir: 1 | -1) {
    if (open === null) return;
    setOpen((open + dir + gallery.length) % gallery.length);
  }

  return (
    <SiteShell>
      <main>
        <header className="bg-ink py-16 text-paper">
          <div className="site-wrap">
            <p className="kicker mb-3">// Galeria</p>
            <h1 className="display text-5xl">A equipe</h1>
            <p className="mt-4 max-w-xl text-paper/70">
              Clique em uma foto para ampliar. Retratos oficiais dos advogados do escritório.
            </p>
          </div>
        </header>
        <section className="site-wrap py-16">
          <div className="mosaic">
            {gallery.map((item, i) => (
              <button
                key={item.src}
                type="button"
                className={`mosaic-btn m${i + 1}`}
                onClick={() => setOpen(i)}
                aria-label={`Ampliar foto de ${item.alt}`}
              >
                <img src={item.src} alt={item.alt} />
              </button>
            ))}
          </div>
        </section>
      </main>
      {current ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.alt}>
          <button type="button" className="lightbox-close" onClick={() => setOpen(null)} aria-label="Fechar">
            <X className="size-6" />
          </button>
          <button type="button" className="lightbox-nav is-prev" onClick={() => step(-1)} aria-label="Anterior">
            <ChevronLeft className="size-7" />
          </button>
          <figure>
            <img src={current.src} alt={current.alt} />
            <figcaption>{current.alt}</figcaption>
          </figure>
          <button type="button" className="lightbox-nav is-next" onClick={() => step(1)} aria-label="Próxima">
            <ChevronRight className="size-7" />
          </button>
        </div>
      ) : null}
    </SiteShell>
  );
}
