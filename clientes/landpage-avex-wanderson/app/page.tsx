import SiteHeader from "./components/SiteHeader";
import { WHATSAPP_LINK } from "./lib/whatsapp";

const differentials = [
  {
    title: "Diagnóstico gratuito",
    text: "analisamos seu momento atual antes de indicar qualquer solução",
  },
  {
    title: "Sem contrato de fidelidade",
    text: "soluções avulsas ou planos recorrentes, você escolhe",
  },
  {
    title: "Foco em resultado",
    text: "acompanhamos o que acontece depois do lead chegar",
  },
];

const audience = [
  "É empresa, clínica, profissional liberal ou prestador de serviço que precisa atrair novos clientes",
  "Quer parar de depender só de indicações para vender todo mês",
  "Recebe contatos mas não consegue convertê-los em vendas",
  "Já tem um time comercial e quer aumentar os resultados",
  "Quer organizar marketing, atendimento e vendas num processo só",
  'Quer usar anúncios e conteúdo de forma mais estratégica, não só "postar por postar"',
];

// Resumo das 3 categorias detalhadas em /servicos (conteúdo completo em
// servicos-avex-landing-page.md). Aqui fica só o essencial + destaques;
// a lista completa de ~50 itens vive na página dedicada.
const solutionCategories = [
  {
    id: "producao-de-conteudo",
    title: "Produção de Conteúdo",
    text: "autoridade para sua marca, serviço ou imagem profissional",
    highlights: [
      "Planejamento e calendário de publicações",
      "Copywriting e roteiros para vídeos",
      "Design, carrosséis, gravação e edição",
    ],
  },
  {
    id: "geracao-de-demanda",
    title: "Geração de Demanda",
    text: "estratégias para gerar contatos, conversões e vendas",
    highlights: [
      "Gestão de anúncios no Meta Ads e Google Ads",
      "Landing pages e formulários de qualificação",
      "CRM, scripts de atendimento e follow-up",
    ],
  },
  {
    id: "solucoes-para-o-seu-negocio",
    title: "Soluções para o seu Negócio",
    text: "serviços avulsos para resolver necessidades específicas",
    highlights: [
      "Diagnóstico estratégico e consultoria comercial",
      "Sites, landing pages e Google Business Profile",
      "Automações e soluções com inteligência artificial",
    ],
  },
];

// Itens abaixo refletem o processo real documentado no SOP interno da AVEX
// (pipeline de CRM, SLA de resposta, regra de não prometer resultado, plano
// de execução em fases). É verificável e não depende de caso de sucesso
// publicado — por isso substitui uma seção de "números" que ainda não temos.
const methodPoints = [
  {
    title: "Diagnóstico antes de qualquer campanha",
    text: "nenhuma campanha começa sem briefing aprovado, acessos configurados e oferta validada",
  },
  {
    title: "Resposta rápida a cada lead",
    text: "novos contatos são registrados e respondidos em até 15 minutos em horário comercial",
  },
  {
    title: "Cada cliente tem acompanhamento próprio",
    text: "cadastro individual no CRM, com pipeline, prazos e responsáveis definidos etapa por etapa",
  },
  {
    title: "Execução em fases, com decisão por dado",
    text: "plano de 30 dias dividido em estrutura, teste, corte do que não funciona e otimização",
  },
  {
    title: "Relatório e reunião todo mês",
    text: "resultados, aprendizados e plano do próximo ciclo — sempre revisados com você, não só informados",
  },
  {
    title: "Método, não promessa",
    text: "vendemos processo, teste e acompanhamento baseado em dados — nunca garantia de resultado",
  },
];

const leftNotifications = [
  "Reunião Agendada",
  "Reunião Agendada",
  "Reunião Agendada",
];

const rightNotifications = [
  "Lead Qualificado Recebido",
  "Lead Qualificado Recebido",
  "Lead Qualificado Recebido",
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true">
          <div className="wood-panel" />
          <div className="hero-glow" />
          <div className="notification-stack stack-left">
            {leftNotifications.map((item, index) => (
              <div className="notify-card" key={`${item}-${index}`}>
                <span className="notify-icon calendar">G</span>
                <span>
                  <strong>{item}</strong>
                  <small>Você agendou com um potencial cliente!</small>
                </span>
              </div>
            ))}
          </div>
          <div className="notification-stack stack-right">
            {rightNotifications.map((item, index) => (
              <div className="notify-card" key={`${item}-${index}`}>
                <span className="notify-icon lead">AV</span>
                <span>
                  <strong>{item}</strong>
                  <small>Novo contato qualificado chegou pelo WhatsApp!</small>
                </span>
              </div>
            ))}
          </div>
        </div>

        <SiteHeader />

        <div className="hero-brand">
          <img src="/assets/brand/logo-inverted.png" alt="AVEX" />
        </div>

        <div className="hero-copy">
          <div>
            <p className="eyebrow">Do básico ao avançado</p>
            <h1 id="hero-title">
              Não dependa mais só de indicações, e gere demanda{" "}
              <strong>com previsibilidade.</strong>
            </h1>
          </div>
          <div className="hero-action">
            <p>
              Da atração ao fechamento, a AVEX te ajuda a estruturar marketing,
              anúncios e processo comercial para transformar visibilidade em
              vendas reais.
            </p>
            <a
              className="primary-button"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
            >
              Quero estruturar minhas vendas agora!
            </a>
            <span>Clique no botão acima e fale com a nossa equipe no WhatsApp.</span>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Diferenciais AVEX">
        {differentials.map((item) => (
          <article className="proof-card" key={item.title}>
            <span className="arrow">↗</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="method-section" aria-labelledby="method-title">
        <div className="section-heading center">
          <h2 id="method-title">
            Como a AVEX <strong>trabalha, na prática</strong>
          </h2>
          <p>
            Sem caso publicado ainda? Sem problema — isso aqui é o nosso
            processo real, o mesmo que roda por trás de cada cliente.
          </p>
        </div>
        <div className="method-grid">
          {methodPoints.map((item) => (
            <article className="method-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="audience-section" id="para-quem">
        <div className="section-heading center">
          <h2>
            A AVEX é pra <strong>você que:</strong>
          </h2>
        </div>
        <div className="audience-grid">
          {audience.map((item) => (
            <article className="audience-card" key={item}>
              <span>→</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
        <a className="primary-button middle" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
          Quero estruturar minhas vendas agora!
        </a>
      </section>

      <section className="solutions-section" id="solucoes">
        <div className="section-heading">
          <h2>
            Tudo que <strong>você tem acesso</strong> com a AVEX
          </h2>
          <p>
            Organizamos nossas soluções em 3 frentes — Produção de Conteúdo,
            Geração de Demanda e Soluções para o seu Negócio:
          </p>
        </div>

        <div className="solutions-layout">
          <div className="category-grid">
            {solutionCategories.map((category) => (
              <article className="category-card" key={category.id}>
                <h3>{category.title}</h3>
                <p className="category-text">{category.text}</p>
                <ul>
                  {category.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href={`/servicos#${category.id}`}>Ver tudo dessa frente →</a>
              </article>
            ))}
          </div>
          <aside className="highlight-panel">
            <img src="/assets/brand/x-mark.png" alt="" aria-hidden="true" />
            <p>
              Esse é o conjunto completo de soluções da AVEX. Mas depois de
              conversar com o nosso time, <strong>você recebe um plano sob medida</strong>,
              com prioridades claras para o seu momento de negócio — sem pagar por
              algo que você ainda não precisa.
            </p>
          </aside>
        </div>

        <a className="secondary-link" href="/servicos">
          Ver a lista completa de serviços →
        </a>
      </section>

      <section className="diagnostic-section" id="diagnostico">
        <div className="diagnostic-copy">
          <p className="eyebrow">Diagnóstico estratégico</p>
          <h2>
            Saia do ponto atual ao <strong>ápice do mercado.</strong>
          </h2>
          <p>
            A AVEX entende sua operação antes de executar: oferta, tráfego,
            atendimento, CRM e follow-up entram no mesmo plano para gerar demanda
            previsível.
          </p>
        </div>
        <a
          className="primary-button final"
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
        >
          Falar com a equipe AVEX
        </a>
      </section>
    </main>
  );
}
