import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Landmark,
  MapPinned,
  Play,
  Scale,
  Shield,
  Star,
  Users,
  FolderLock,
} from "lucide-react";
import { features, firm, reviews, services, team } from "@/data/firm";
import { firmNews } from "@/data/news";
import { DailyLegalNews } from "@/components/site/daily-news";
import { cn } from "@/lib/utils";

const icons = {
  briefcase: Briefcase,
  scale: Scale,
  shield: Shield,
  landmark: Landmark,
} as const;

export function HomePage() {
  const firstService = services[0].id;
  const [hovered, setHovered] = useState<(typeof services)[number]["id"] | null>(null);
  const founder = team[0];
  const teamTrack = useRef<HTMLDivElement>(null);
  const reviewTrack = useRef<HTMLDivElement>(null);

  function scrollStrip(el: HTMLDivElement | null, dir: 1 | -1) {
    if (!el) return;
    const card = el.querySelector("article");
    const styles = getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 16;
    const step = (card?.getBoundingClientRect().width ?? 200) + gap;
    const max = el.scrollWidth - el.clientWidth;
    let left = el.scrollLeft + dir * step;
    if (left > max - 2) left = 0;
    if (left < 0) left = max;
    el.scrollTo({ left, behavior: "smooth" });
  }

  function scrollTeam(dir: 1 | -1) {
    scrollStrip(teamTrack.current, dir);
  }

  return (
    <main>
      <section className="hero-banner">
        <img
          className="hero-desk"
          src="/firm/hero-5.png"
          alt="Fachada do escritório Oliveira e Sampaio Advocacia"
        />
        <img
          className="hero-mob"
          src="/firm/familia.png"
          alt="Dr. Rômulo Oliveira com a família"
        />
        <div className="scrim" aria-hidden="true" />
        <div className="site-wrap hero-copy">
          <h1 className="display max-w-xl text-4xl text-paper sm:text-5xl md:text-6xl">
            Uma história construída
            <br />
            com o Direito.
            <br />
            E com pessoas.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/80 md:text-base">
            Oliveira & Sampaio Advocacia. Desde 2002, presente em Parauapebas e na
            região de Carajás.
          </p>
          <Link to="/sobre" className="btn-primary mt-8">
            Conheça o Oliveira & Sampaio
          </Link>
        </div>
      </section>

      <section className="relative z-10 bg-paper pb-6">
        <div className="site-wrap">
          <div
            className="service-grid"
            onPointerLeave={() => setHovered(null)}
          >
            {services.map((item) => {
              const Icon = icons[item.icon];
              const hot = hovered === item.id;
              const pinned = hovered === null && item.id === firstService;
              const featured = hot || pinned;
              return (
                <article
                  key={item.id}
                  className={cn("service-card", pinned && "is-on", hot && "is-hot")}
                  onPointerEnter={() => setHovered(item.id)}
                >
                  <span className="icon-box" aria-hidden="true">
                    {featured ? (
                      <span className="font-display text-3xl leading-none">×</span>
                    ) : (
                      <Icon className="size-8" strokeWidth={1.4} />
                    )}
                  </span>
                  <h2 className="display mb-3 text-xl">{item.title}</h2>
                  <p className="lede mb-6 text-sm leading-relaxed">{item.summary}</p>
                  <Link to="/areas" className="more mt-auto inline-flex items-center gap-2">
                    Saiba mais <ArrowRight className="size-3.5" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="site-wrap grid items-stretch gap-12 lg:grid-cols-2">
          <div className="fachada hidden lg:block">
            <img
              src="/firm/familia.png"
              alt="Dr. Rômulo Oliveira com a família"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="kicker mb-3">// O escritório</p>
            <h2 className="display mb-5 text-4xl md:text-5xl">
              Soluções jurídicas
              <br />
              modernas e próximas
            </h2>
            <p className="mb-8 max-w-lg text-left text-muted">
              Fundado em {firm.foundedLabel}, o {firm.shortName} atende pessoas, empresas e sindicatos a
              partir de {firm.city}. Atuação direta em {firm.states}, e no restante do Brasil por
              correspondentes.
            </p>
            <ul className="space-y-5 text-left">
              <li className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-brand-ink">
                  <Scale className="size-5" />
                </span>
                <div>
                  <p className="font-display text-lg uppercase">Atendimento personalizado</p>
                  <p className="text-sm text-muted">Ética, técnica e eficiência em cada causa — como a missão do escritório descreve.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-brand-ink">
                  <Briefcase className="size-5" />
                </span>
                <div>
                  <p className="font-display text-lg uppercase">Ênfase em Direito do Trabalho</p>
                  <p className="text-sm text-muted">Coletivo e individual, para reclamantes e reclamados, com núcleos próprios.</p>
                </div>
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <div className="flex items-center gap-3">
                <img
                  src={founder.photo}
                  alt={founder.name}
                  className="size-14 rounded-full object-cover object-top"
                />
                <div>
                  <p className="font-display text-lg uppercase leading-none">{founder.name}</p>
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {founder.role} · {founder.oab}
                  </p>
                </div>
              </div>
              <div className="border border-line px-5 py-3">
                <p className="font-display text-3xl leading-none text-ink">{firm.years}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted">
                  anos desde a fundação
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="site-wrap flex flex-col items-center gap-6 py-10 text-center md:flex-row md:items-center md:justify-between md:py-12 md:text-left">
          <div>
            <p className="kicker mb-3">// Por que o escritório</p>
            <h2 className="display text-4xl text-paper md:text-5xl">
              Serviços com
              <br />
              diferenciais reais
            </h2>
          </div>
          <Link to="/contato" className="btn-primary gap-2">
            Entrar em contato <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      <section className="bg-mist py-20">
        <div className="site-wrap">
          <div className="feature-grid">
            {features.map((item, i) => {
              const FeatureIcon = [Scale, Shield, Briefcase, Users, MapPinned, FolderLock][i] ?? Shield;
              return (
                <article key={item.title} className="feature-card">
                  <div className="mb-4 flex items-start justify-between">
                    <span className="icon-box" aria-hidden="true">
                      <FeatureIcon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="display mb-2 text-lg">{item.title}</h3>
                  <p className="lede text-sm">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="yt-band">
        <img className="yt-band-bg hidden md:block" src="/firm/hero-3.jpg" alt="" />
        <img
          className="yt-band-bg md:hidden"
          src="/firm/youtube-hand.png"
          alt=""
          style={{ objectPosition: "84% 46%" }}
        />
        <div className="yt-band-scrim" aria-hidden="true" />
        <div className="site-wrap yt-band-inner">
          <div className="yt-band-copy">
            <h2 className="display">
              Assessoria jurídica
              <br />
              preparada
            </h2>
            <a href={firm.youtube} className="yt-cta" target="_blank" rel="noreferrer">
              <span>
                Acesse nossos
                <br />
                conteúdos no YouTube
              </span>
              <span className="yt-play" aria-hidden="true">
                <Play className="size-5 fill-current" />
              </span>
            </a>
          </div>
          <img
            className="yt-devices hidden md:block"
            src="/firm/youtube-devices.png"
            alt="Canal Oliveira e Sampaio no YouTube, no notebook e no celular"
          />
        </div>
      </section>

      <section className="bg-paper py-20" id="advogados">
        <div className="site-wrap">
          <div className="mb-10 flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <p className="kicker mb-3">// Advogados</p>
              <h2 className="display text-4xl">Conheça os profissionais</h2>
            </div>
            <Link to="/advogados" className="btn-ghost">
              Ver equipe completa
            </Link>
          </div>
          <div className="team-carousel">
            <button
              type="button"
              className="team-nav is-prev"
              aria-label="Ver advogados anteriores"
              onClick={() => scrollTeam(-1)}
            >
              <ChevronLeft className="size-6" strokeWidth={1.75} />
            </button>
            <div className="team-track" ref={teamTrack}>
              {team.map((person) => (
                <article key={person.oab} className="team-card">
                  <img src={person.photo} alt={person.name} className="team-photo" />
                  <div className="p-3">
                    <h3 className="font-display text-base uppercase leading-tight">{person.name}</h3>
                    <p className="text-xs text-muted">
                      {person.role}
                      <br />
                      {person.oab}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <button
              type="button"
              className="team-nav is-next"
              aria-label="Ver próximos advogados"
              onClick={() => scrollTeam(1)}
            >
              <ChevronRight className="size-6" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-mist py-20" id="noticias">
        <div className="site-wrap">
          <p className="kicker mb-3">// Notícias</p>
          <h2 className="display mb-10 text-4xl">Do escritório e do mundo jurídico</h2>
          <div className="news-columns">
            <div>
              <div className="mb-6 flex items-end justify-between gap-3">
                <h3 className="display text-2xl">Blog Oliveira & Sampaio</h3>
                <Link to="/noticias" className="text-xs font-bold uppercase tracking-widest text-brand">
                  Ver todas
                </Link>
              </div>
              <ul className="news-list blog-panel">
                {firmNews.slice(0, 3).map((item) => (
                  <li key={item.url} className="news-item">
                    <span className="news-frame" aria-hidden="true">
                      {item.image ? <img src={item.image} alt="" /> : null}
                    </span>
                    <div className="news-body">
                      <p className="news-meta">{item.dateLabel} · Notícias</p>
                      <a href={item.url} className="news-title" target="_blank" rel="noreferrer">
                        {item.title}
                      </a>
                      {item.excerpt ? <p className="news-excerpt">{item.excerpt}</p> : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-6 flex items-end justify-between gap-3">
                <div>
                  <h3 className="display text-2xl">Pará, Brasil e tribunais</h3>
                  <p className="mt-1 text-sm text-muted">STF, TST, OAB/PA e Direito — atualizado diariamente.</p>
                </div>
                <Link to="/atualizacoes" className="text-xs font-bold uppercase tracking-widest text-brand">
                  Ver todas
                </Link>
              </div>
              <DailyLegalNews limit={4} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20" id="avaliacoes">
        <div className="site-wrap">
          <div className="mb-10 text-center md:text-left">
            <p className="kicker mb-3">// Google</p>
            <h2 className="display text-4xl">O que dizem os clientes</h2>
            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted md:justify-start">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-brand text-brand" />
                ))}
              </span>
              {firm.rating.value} · {firm.rating.count} avaliações no Google
            </p>
          </div>
          <div className="review-carousel">
            <button
              type="button"
              className="team-nav is-prev"
              aria-label="Ver depoimentos anteriores"
              onClick={() => scrollStrip(reviewTrack.current, -1)}
            >
              <ChevronLeft className="size-6" strokeWidth={1.75} />
            </button>
            <div className="review-track" ref={reviewTrack}>
              {reviews.map((item) => (
                <article key={item.author} className="review-card">
                  <span className="flex gap-0.5" aria-label="5 estrelas">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-brand text-brand" />
                    ))}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed">“{item.text}”</p>
                  <p className="mt-5 font-display text-base uppercase">{item.author}</p>
                  <p className="text-xs text-muted">{item.date} · Google</p>
                </article>
              ))}
            </div>
            <button
              type="button"
              className="team-nav is-next"
              aria-label="Ver próximos depoimentos"
              onClick={() => scrollStrip(reviewTrack.current, 1)}
            >
              <ChevronRight className="size-6" strokeWidth={1.75} />
            </button>
          </div>
          <div className="mt-10 flex justify-center">
            <a href={firm.mapsUrl} className="btn-ghost" target="_blank" rel="noreferrer">
              Ver no Google
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
