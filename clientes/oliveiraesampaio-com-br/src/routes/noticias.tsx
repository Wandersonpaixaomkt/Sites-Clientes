import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { firmNews } from "@/data/news";

export const Route = createFileRoute("/noticias")({ component: Noticias });

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

function Noticias() {
  return (
    <SiteShell>
      <main>
        <header className="bg-ink py-16 text-paper">
          <div className="site-wrap">
            <p className="kicker mb-3">// Blog</p>
            <h1 className="display text-5xl">Notícias do escritório</h1>
            <p className="mt-4 max-w-xl text-paper/70">
              Arquivo completo do blog institucional — {firmNews.length} publicações.
            </p>
          </div>
        </header>
        <section className="site-wrap py-16">
          <ul className="news-list blog-panel">
            {firmNews.map((item) => (
              <li key={item.url} className="news-item">
                <span className="news-frame" aria-hidden="true">
                  {item.image ? <img src={item.image} alt="" /> : null}
                </span>
                <div className="news-body">
                  <p className="news-meta">{formatDate(item.date)} · Notícias</p>
                  <a href={item.url} className="news-title" target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                  {item.excerpt ? <p className="news-excerpt">{item.excerpt}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </SiteShell>
  );
}
