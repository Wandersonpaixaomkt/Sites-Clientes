/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { stories, type Story } from "./news-data";

const categories = [
  "Todos",
  "Parauapebas",
  "Canaã dos Carajás",
  "Marabá",
  "Curionópolis",
  "Eldorado",
  "Belém / Pará",
  "Política",
  "Economia",
  "Mineração",
  "Emprego",
  "Polícia",
  "Agenda Regional",
  "Utilidade Pública",
];

const navigation = [
  ["⌂", "Início"],
  ["◉", "Destaques"],
  ["▤", "Últimas"],
  ["★", "Mais lidas"],
];

const editorial = [
  ["PA", "Belém / Pará"],
  ["PO", "Política"],
  ["EC", "Economia"],
  ["MI", "Mineração"],
  ["EM", "Emprego"],
  ["PL", "Polícia"],
];

const images = [
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=84",
  "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=84",
  "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=900&q=84",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=84",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=84",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=84",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=84",
  "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=900&q=84",
];

function imageFor(story: Story) {
  const numericId = typeof story.id === "number" ? story.id : Array.from(String(story.id)).reduce((total, char) => total + char.charCodeAt(0), 0);
  return images[(numericId - 1) % images.length];
}

function mainCategory(story: Story) {
  return story.tags.find((tag) => ["Política", "Economia", "Mineração", "Emprego", "Polícia", "Utilidade Pública", "Agenda Regional"].includes(tag)) ?? story.tags[0];
}

function locations(story: Story) {
  return story.tags.filter((tag) => ["Parauapebas", "Canaã dos Carajás", "Marabá", "Curionópolis", "Eldorado", "Belém / Pará"].includes(tag));
}

function subjects(story: Story) {
  return story.tags.filter((tag) => !locations(story).includes(tag));
}

export default function NewsChannel({ initialStories }: { initialStories?: Story[] }) {
  const portalStories = initialStories?.length ? initialStories : stories;
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    if (!selectedStory) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedStory(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedStory]);

  const filteredStories = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return portalStories.filter((story) => {
      const matchesCategory = activeCategory === "Todos" || story.tags.includes(activeCategory);
      const matchesQuery = !normalized || `${story.title} ${story.summary} ${story.tags.join(" ")}`
        .toLocaleLowerCase("pt-BR")
        .includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, portalStories, query]);

  const featured = portalStories[12] || portalStories[0];

  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="brand-group">
          <button className="icon-button menu-button" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <span /><span /><span />
          </button>
          <a className="brand" href="#top" aria-label="Norte em Foco - início">
            <span className="brand-mark">N</span>
            <span className="brand-name">NORTE EM FOCO</span>
          </a>
        </div>

        <form className="search" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="site-search">Buscar notícias</label>
          <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar notícias" />
          <button type="submit" aria-label="Buscar">⌕</button>
        </form>

        <div className="top-actions">
          <button className="icon-button hide-mobile" type="button" aria-label="Notificações">♢</button>
          <button className="profile" type="button" aria-label="Perfil do visitante">NF</button>
        </div>
      </header>

      <aside className={`sidebar ${menuOpen ? "is-open" : ""}`} aria-label="Navegação principal">
        <nav>
          <div className="nav-section">
            {navigation.map(([icon, label], index) => (
              <a className={index === 0 ? "active" : ""} href="#conteudo" key={label}>
                <span className="nav-icon">{icon}</span><span>{label}</span>
              </a>
            ))}
          </div>
          <div className="nav-section editorial">
            <p>Editorias</p>
            {editorial.map(([icon, label]) => (
              <button type="button" key={label} onClick={() => { setActiveCategory(label); setMenuOpen(false); }}>
                <span className="nav-avatar">{icon}</span><span>{label}</span>
              </button>
            ))}
          </div>
          <div className="sidebar-note"><span>Portal regional</span><strong>Informação com fonte e transparência</strong></div>
        </nav>
      </aside>

      {menuOpen && <button className="menu-backdrop" type="button" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}

      <section className="content" id="top">
        <div className="chip-row" aria-label="Filtrar por editoria">
          {categories.map((category) => (
            <button type="button" key={category} className={activeCategory === category ? "selected" : ""} onClick={() => setActiveCategory(category)}>
              {category}
            </button>
          ))}
        </div>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <span className="live-pill"><i /> DESTAQUE</span>
            <p className="eyebrow">Plantão Norte em Foco</p>
            <h1 id="hero-title">{featured.title}</h1>
            <p className="hero-summary">{featured.summary}</p>
            <div className="hero-actions">
              <button type="button" onClick={() => setSelectedStory(featured)}><span>▶</span> Ler notícia</button>
              <a href="#conteudo">Ver últimas notícias</a>
            </div>
          </div>
          <div className="hero-side-note"><span>ATUALIZAÇÃO</span><strong>Giro regional</strong><small>65 notícias selecionadas</small></div>
        </section>

        <section className="news-section" id="conteudo" aria-labelledby="latest-heading">
          <div className="section-heading">
            <div><span className="section-kicker">EM ALTA</span><h2 id="latest-heading">Últimas notícias</h2></div>
            <p>{filteredStories.length} notícias</p>
          </div>

          {filteredStories.length ? (
            <div className="video-grid">
              {filteredStories.map((story) => (
                <article className="video-card" key={story.id}>
                  <button type="button" className="thumbnail" onClick={() => setSelectedStory(story)} aria-label={`Ler: ${story.title}`}>
                    <img src={imageFor(story)} alt="" />
                    <span className="duration">{mainCategory(story)}</span>
                    <span className="play">▶</span>
                  </button>
                  <div className="card-body">
                    <div className="channel-avatar">N</div>
                    <div className="card-copy">
                      <button className="story-title-button" type="button" onClick={() => setSelectedStory(story)}><h3>{story.title}</h3></button>
                      <p>Norte em Foco <span className="verified">✓</span></p>
                      <p>{story.publishedAt} <b>•</b> {locations(story).join(" · ") || "Pará"}</p>
                    </div>
                    <button className="more" type="button" aria-label={`Mais opções para ${story.title}`}>⋮</button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>⌕</span><h3>Nenhuma notícia encontrada</h3><p>Tente buscar outro termo ou escolher outra editoria.</p>
              <button type="button" onClick={() => { setQuery(""); setActiveCategory("Todos"); }}>Limpar filtros</button>
            </div>
          )}
        </section>

        <footer>
          <div className="brand footer-brand"><span className="brand-mark">N</span><span className="brand-name">NORTE EM FOCO</span></div>
          <p>Notícias regionais com crédito às fontes consultadas.</p>
          <span>© 2026 Norte em Foco</span>
        </footer>
      </section>

      {selectedStory && (
        <div className="player-modal article-modal" role="dialog" aria-modal="true" aria-labelledby="player-title">
          <button className="modal-backdrop" aria-label="Fechar notícia" onClick={() => setSelectedStory(null)} />
          <article className="player-panel article-panel">
            <button className="close" type="button" aria-label="Fechar" onClick={() => setSelectedStory(null)}>×</button>
            <div className="article-cover" style={{ backgroundImage: `url(${imageFor(selectedStory)})` }}>
              <span className="demo-label">NORTE EM FOCO • {mainCategory(selectedStory).toLocaleUpperCase("pt-BR")}</span>
            </div>
            <div className="player-info article-info">
              <span>{selectedStory.tags.join(" • ")}</span>
              <h2 id="player-title">{selectedStory.title}</h2>
              <p className="article-meta">Publicado em {selectedStory.publishedAt}</p>
              <div className="article-text">
                <p>{selectedStory.summary}</p>
                <p>O assunto integra a cobertura de {subjects(selectedStory).join(", ").toLocaleLowerCase("pt-BR")} e interessa especialmente a quem acompanha {locations(selectedStory).join(", ") || "os acontecimentos do Pará"}.</p>
                <p>O Norte em Foco apresenta esta síntese em texto próprio, preservando os fatos centrais divulgados e indicando a publicação consultada para quem desejar conferir o contexto completo.</p>
              </div>
              <footer className="article-credit">
                {selectedStory.sourceNote && <p className="article-source-note">ⓘ {selectedStory.sourceNote}</p>}
                <div className="article-credit-row">
                  <div><span>CRÉDITOS</span><strong>Fonte: {selectedStory.source}</strong></div>
                  <a href={selectedStory.sourceUrl} target="_blank" rel="noopener noreferrer">Acessar publicação original ↗</a>
                </div>
                {selectedStory.slug && <Link className="article-read-link" href={"/noticias/" + selectedStory.slug}>Abrir matéria no Norte em Foco →</Link>}
              </footer>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
