"use client";

import { useMemo, useState } from "react";
import { filters, sourceOrder, stories } from "./news-data";

const featuredStory = stories.find((story) => story.id === 13) ?? stories[0];

function initials(source: string) {
  return source
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toLocaleUpperCase("pt-BR");
}

export default function NewsPortal() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [activeSource, setActiveSource] = useState("Todos os portais");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredStories = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");

    return stories.filter((story) => {
      const matchesFilter = activeFilter === "Todos" || story.tags.includes(activeFilter);
      const matchesSource = activeSource === "Todos os portais" || story.source === activeSource;
      const searchable = `${story.title} ${story.summary} ${story.source} ${story.tags.join(" ")}`
        .toLocaleLowerCase("pt-BR");

      return matchesFilter && matchesSource && (!normalized || searchable.includes(normalized));
    });
  }, [activeFilter, activeSource, query]);

  const resetFilters = () => {
    setActiveFilter("Todos");
    setActiveSource("Todos os portais");
    setQuery("");
  };

  return (
    <main className="portal-shell">
      <header className="portal-topbar">
        <div className="portal-brand-group">
          <button
            className="portal-menu-button"
            type="button"
            aria-label="Abrir lista de portais"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <a className="portal-brand" href="#top" aria-label="Norte em Foco — início">
            <span className="portal-brand-mark">N</span>
            <span>
              <strong>NORTE EM FOCO</strong>
              <small>GIRO REGIONAL</small>
            </span>
          </a>
        </div>

        <form className="portal-search" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="site-search">Buscar notícias, cidades ou portais</label>
          <input
            id="site-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar notícia, cidade ou fonte"
          />
          <span aria-hidden="true">⌕</span>
        </form>

        <div className="portal-update-status">
          <i />
          <span><strong>ATUALIZADO</strong><small>15 AGO 2026</small></span>
        </div>
      </header>

      <aside className={`portal-sidebar ${menuOpen ? "is-open" : ""}`} aria-label="Filtrar por portal">
        <nav>
          <p className="portal-sidebar-title">FONTES MONITORADAS</p>
          <button
            className={`portal-source-button ${activeSource === "Todos os portais" ? "active" : ""}`}
            type="button"
            onClick={() => { setActiveSource("Todos os portais"); setMenuOpen(false); }}
          >
            <span className="portal-source-avatar all">13</span>
            <span>Todos os portais</span>
            <small>65</small>
          </button>
          {sourceOrder.map((source) => (
            <button
              className={`portal-source-button ${activeSource === source ? "active" : ""}`}
              type="button"
              key={source}
              onClick={() => { setActiveSource(source); setMenuOpen(false); }}
            >
              <span className="portal-source-avatar">{initials(source)}</span>
              <span>{source}</span>
              <small>5</small>
            </button>
          ))}
        </nav>
        <div className="portal-sidebar-note">
          <strong>Curadoria responsável</strong>
          <p>Resumos autorais com acesso direto à publicação de origem.</p>
        </div>
      </aside>

      {menuOpen && (
        <button
          className="portal-menu-backdrop"
          type="button"
          aria-label="Fechar lista de portais"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="portal-content" id="top">
        <section className="portal-hero" aria-labelledby="hero-title">
          <div className="portal-hero-grid" aria-hidden="true" />
          <div className="portal-hero-copy">
            <p className="portal-eyebrow"><span>EDIÇÃO ESPECIAL</span> • CARAJÁS E PARÁ</p>
            <h1 id="hero-title">A região em foco.<br /><em>As fontes à vista.</em></h1>
            <p>Uma seleção de 65 notícias publicadas por 13 portais, organizada por cidade e assunto. Cada resumo leva você à matéria original.</p>
            <div className="portal-hero-actions">
              <a href="#noticias">Explorar notícias <span>↓</span></a>
              <button type="button" onClick={() => setActiveFilter("Emprego")}>Ver oportunidades</button>
            </div>
          </div>

          <article className="portal-hero-story">
            <div className="portal-hero-story-top">
              <span>DESTAQUE</span>
              <time>{featuredStory.publishedAt}</time>
            </div>
            <p>{featuredStory.tags.slice(0, 2).join(" • ")}</p>
            <h2>{featuredStory.title}</h2>
            <a href={featuredStory.sourceUrl} target="_blank" rel="noopener noreferrer">
              Fonte: {featuredStory.source} <span>↗</span>
            </a>
          </article>
        </section>

        <section className="portal-dashboard-strip" aria-label="Resumo da curadoria">
          <div><strong>65</strong><span>notícias selecionadas</span></div>
          <div><strong>13</strong><span>fontes consultadas</span></div>
          <div><strong>5</strong><span>matérias por portal</span></div>
          <p><span>CRITÉRIO</span> Relevância regional, serviço, economia, política, segurança, mineração e emprego.</p>
        </section>

        <section className="portal-news-section" id="noticias" aria-labelledby="latest-heading">
          <div className="portal-section-heading">
            <div>
              <p>GIRO DE NOTÍCIAS</p>
              <h2 id="latest-heading">{activeSource === "Todos os portais" ? "Seleção regional" : activeSource}</h2>
            </div>
            <p><strong>{filteredStories.length}</strong> resultado{filteredStories.length === 1 ? "" : "s"}</p>
          </div>

          <div className="portal-filter-row" aria-label="Filtrar por cidade ou tema">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={activeFilter === filter ? "selected" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="portal-active-context" aria-live="polite">
            <span>FILTRO ATUAL</span>
            <strong>{activeFilter}</strong>
            {activeSource !== "Todos os portais" && <strong>{activeSource}</strong>}
            {(activeFilter !== "Todos" || activeSource !== "Todos os portais" || query) && (
              <button type="button" onClick={resetFilters}>Limpar filtros ×</button>
            )}
          </div>

          {filteredStories.length ? (
            <div className="portal-news-grid">
              {filteredStories.map((story, index) => (
                <article className="portal-news-card" key={story.id}>
                  <div className="portal-card-head">
                    <span className="portal-card-number">{String(index + 1).padStart(2, "0")}</span>
                    <div className="portal-source-lockup">
                      <span className="portal-source-avatar">{initials(story.source)}</span>
                      <span><strong>{story.source}</strong><small>{story.publishedAt}</small></span>
                    </div>
                  </div>
                  <div className="portal-tag-list">
                    {story.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <h3>{story.title}</h3>
                  <p className="portal-summary">{story.summary}</p>
                  {story.sourceNote && <p className="portal-source-note">ⓘ {story.sourceNote}</p>}
                  <footer className="portal-card-source">
                    <span>Fonte: <strong>{story.source}</strong></span>
                    <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer">
                      Ler matéria original <span aria-hidden="true">↗</span>
                    </a>
                  </footer>
                </article>
              ))}
            </div>
          ) : (
            <div className="portal-empty-state">
              <span>⌕</span>
              <h3>Nenhuma notícia encontrada</h3>
              <p>Tente outro termo, tema ou portal.</p>
              <button type="button" onClick={resetFilters}>Mostrar todas as notícias</button>
            </div>
          )}
        </section>

        <section className="portal-editorial-note" aria-labelledby="editorial-note-title">
          <span>NOTA EDITORIAL</span>
          <div>
            <h2 id="editorial-note-title">Curadoria não é reprodução.</h2>
            <p>Os textos exibidos são resumos originais baseados nas informações públicas de cada veículo. Para contexto completo, autoria e atualizações, acesse sempre o link da fonte.</p>
          </div>
        </section>

        <footer className="portal-site-footer">
          <a className="portal-brand" href="#top">
            <span className="portal-brand-mark">N</span>
            <span><strong>NORTE EM FOCO</strong><small>GIRO REGIONAL</small></span>
          </a>
          <p>Informação regional organizada com transparência de fonte.</p>
          <span>© 2026 Norte em Foco</span>
        </footer>
      </div>
    </main>
  );
}
