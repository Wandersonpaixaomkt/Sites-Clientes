import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import { WHATSAPP_LINK } from "../lib/whatsapp";

export const metadata: Metadata = {
  title: "Serviços | AVEX Ads",
  description:
    "Conheça todas as soluções da AVEX em Produção de Conteúdo, Geração de Demanda e Soluções para o seu Negócio.",
  openGraph: {
    title: "Serviços | AVEX Ads",
    description:
      "Conheça todas as soluções da AVEX em Produção de Conteúdo, Geração de Demanda e Soluções para o seu Negócio.",
    type: "website",
  },
};

const audienceBullets = [
  "Precisam atrair novos clientes",
  "Desejam fortalecer sua autoridade",
  "Querem melhorar sua presença digital",
  "Recebem contatos, mas não conseguem convertê-los",
  "Dependem principalmente de indicações",
  "Precisam organizar marketing, atendimento e vendas",
  "Querem utilizar anúncios e conteúdos de forma mais estratégica",
];

const categories = [
  {
    id: "producao-de-conteudo",
    number: "1",
    title: "Produção de Conteúdo",
    subtitle: "Autoridade para sua marca, serviço ou imagem profissional",
    intro:
      "Não se trata apenas de publicar por publicar. Os conteúdos são pensados para apresentar serviços, esclarecer dúvidas, gerar confiança, mostrar diferenciais e preparar o público para uma futura decisão de compra.",
    items: [
      { title: "Planejamento de conteúdo", text: "Definição dos temas, formatos e objetivos dos conteúdos que serão produzidos durante o período." },
      { title: "Calendário de publicações", text: "Organização das pautas e datas de publicação para manter consistência e facilitar a execução do planejamento." },
      { title: "Pesquisa de temas", text: "Levantamento de assuntos relevantes com base nas dúvidas, interesses e necessidades do público-alvo." },
      { title: "Estratégia de posicionamento", text: "Definição da maneira como a empresa ou profissional deve se apresentar, comunicar seus diferenciais e construir autoridade." },
      { title: "Copywriting", text: "Criação de textos estratégicos para posts, anúncios, páginas, apresentações, legendas e materiais comerciais." },
      { title: "Roteiros para vídeos", text: "Desenvolvimento de roteiros objetivos para vídeos informativos, educativos, comerciais ou institucionais." },
      { title: "Design para redes sociais", text: "Criação de peças visuais para publicações, anúncios, carrosséis, comunicados e campanhas." },
      { title: "Produção de carrosséis", text: "Desenvolvimento de conteúdos informativos organizados em páginas, com títulos, explicações e chamadas para ação." },
      { title: "Gravação de vídeos", text: "Produção de vídeos para apresentação de serviços, fortalecimento de marca e divulgação de campanhas." },
      { title: "Edição de vídeos", text: "Tratamento e organização do material gravado, incluindo cortes, legendas, trilha, elementos gráficos e finalização." },
      { title: "Organização do perfil", text: "Ajustes na apresentação visual e estratégica das redes sociais para tornar o perfil mais claro, profissional e comercial." },
      { title: "Orientação de conteúdo", text: "Acompanhamento para ajudar o cliente a produzir conteúdos mais objetivos, relevantes e alinhados às oportunidades de venda." },
    ],
  },
  {
    id: "geracao-de-demanda",
    number: "2",
    title: "Geração de Demanda",
    subtitle: "Estratégias para gerar contatos, conversões e vendas",
    intro:
      "O trabalho não termina quando o anúncio gera uma mensagem. Também analisamos o que acontece depois que o potencial cliente entra em contato, identificando possíveis falhas no atendimento, na qualificação e no acompanhamento.",
    items: [
      { title: "Gestão de anúncios no Meta Ads", text: "Planejamento, criação, acompanhamento e otimização de campanhas no Instagram e no Facebook." },
      { title: "Gestão de anúncios no Google Ads", text: "Criação e gerenciamento de campanhas para alcançar pessoas que já estão procurando pelos serviços ou produtos oferecidos pela empresa." },
      { title: "Campanhas de pesquisa", text: "Anúncios exibidos nos resultados do Google para buscas relacionadas aos serviços, produtos, localização ou necessidades do público." },
      { title: "Campanhas para Instagram e Facebook", text: "Estratégias para alcançar novos públicos, gerar interesse, mensagens, cadastros, agendamentos ou vendas." },
      { title: "Remarketing", text: "Campanhas direcionadas para pessoas que já visitaram o site, visualizaram conteúdos, interagiram com o perfil ou demonstraram interesse anteriormente." },
      { title: "Segmentação de públicos", text: "Definição de localização, interesses, comportamentos, características e perfis com maior possibilidade de conversão." },
      { title: "Criação e teste de públicos", text: "Desenvolvimento de diferentes grupos de audiência para identificar quais perfis apresentam melhor resposta às campanhas." },
      { title: "Planejamento de campanhas", text: "Definição do objetivo, público, oferta, mensagem, orçamento, canais e indicadores que serão acompanhados." },
      { title: "Pesquisa de palavras-chave", text: "Identificação dos termos utilizados por potenciais clientes ao procurarem produtos ou serviços no Google." },
      { title: "Análise de concorrentes", text: "Estudo da comunicação, posicionamento, ofertas, anúncios e presença digital de empresas que disputam o mesmo mercado." },
      { title: "Criação de ofertas", text: "Estruturação de ofertas comerciais mais claras, atrativas e adequadas ao perfil do público." },
      { title: "Estruturação da jornada do cliente", text: "Organização do caminho entre o primeiro contato com o anúncio e a decisão de compra." },
      { title: "Landing page para campanhas", text: "Criação de páginas específicas para apresentar uma oferta, captar dados, receber solicitações ou gerar agendamentos." },
      { title: "Formulários de qualificação", text: "Desenvolvimento de formulários com perguntas estratégicas para identificar o perfil, a necessidade e o potencial de cada contato." },
      { title: "Captação pelo WhatsApp", text: "Estratégias para direcionar potenciais clientes para conversas no WhatsApp de forma organizada." },
      { title: "Captação por agenda", text: "Integração de campanhas com ferramentas de agendamento para facilitar a marcação de reuniões, consultas ou avaliações." },
      { title: "Implantação de CRM", text: "Organização dos contatos em etapas como novo lead, atendimento iniciado, qualificado, agendado, proposta enviada, fechado ou perdido." },
      { title: "Scripts de atendimento", text: "Criação de mensagens e roteiros para recepção, vendedores e equipes comerciais conduzirem melhor cada contato." },
      { title: "Scripts de qualificação", text: "Perguntas estratégicas para identificar a necessidade, o momento e o potencial de compra de cada oportunidade." },
      { title: "Scripts de follow-up", text: "Mensagens de acompanhamento para contatos que não responderam, não decidiram ou interromperam a conversa." },
      { title: "Treinamento de atendimento", text: "Orientação para recepcionistas, vendedores e atendentes melhorarem o tempo de resposta, a comunicação e a conversão." },
      { title: "Acompanhamento comercial", text: "Análise do que acontece com os contatos gerados pelas campanhas e identificação dos principais pontos de perda." },
      { title: "Monitoramento de campanhas", text: "Acompanhamento dos investimentos, resultados, custos, mensagens, cadastros e demais conversões." },
      { title: "Otimização contínua", text: "Realização de testes e ajustes para melhorar públicos, anúncios, palavras-chave, orçamento e taxa de conversão." },
      { title: "Relatórios de desempenho", text: "Apresentação dos principais resultados, ações realizadas, aprendizados e próximos ajustes recomendados." },
    ],
  },
  {
    id: "solucoes-para-o-seu-negocio",
    number: "3",
    title: "Soluções para o seu Negócio",
    subtitle: "Serviços avulsos para resolver necessidades específicas",
    intro:
      "Esses serviços podem complementar os planos de Produção de Conteúdo e Geração de Demanda ou ser contratados de forma independente — indicados para quem precisa resolver um ponto específico sem contratar um plano recorrente completo.",
    items: [
      { title: "Diagnóstico estratégico", text: "Análise do negócio, posicionamento, comunicação, processo comercial, presença digital e oportunidades de melhoria." },
      { title: "Pesquisa de mercado", text: "Levantamento de informações sobre público, concorrentes, tendências, comportamento de compra e oportunidades do segmento." },
      { title: "Análise de produto ou serviço", text: "Avaliação da forma como a oferta está sendo apresentada, percebida e comercializada." },
      { title: "Análise da jornada do cliente", text: "Mapeamento do caminho percorrido desde o primeiro contato até o fechamento da venda." },
      { title: "Consultoria de marketing", text: "Orientação estratégica para organizar campanhas, comunicação, posicionamento, canais e prioridades." },
      { title: "Consultoria comercial", text: "Análise do processo de vendas, atendimento, abordagem, qualificação, acompanhamento e fechamento." },
      { title: "Desenvolvimento de landing pages", text: "Criação de páginas para captação, apresentação de serviços, campanhas, formulários ou agendamentos." },
      { title: "Desenvolvimento de sites", text: "Criação de sites institucionais para apresentar a empresa, os serviços, diferenciais e canais de contato." },
      { title: "Otimização do Google Business Profile", text: "Criação, configuração e atualização do perfil da empresa no Google para melhorar sua presença nas buscas locais." },
      { title: "Implantação de CRM", text: "Configuração de ferramentas para organizar leads, clientes, tarefas, negociações e acompanhamentos." },
      { title: "Automação de atendimento", text: "Criação de fluxos automáticos para responder, organizar, encaminhar e acompanhar contatos." },
      { title: "Integração de ferramentas", text: "Conexão entre formulários, planilhas, CRM, WhatsApp, agenda, e-mail e outras plataformas." },
      { title: "Criação de scripts comerciais", text: "Desenvolvimento de roteiros para atendimento, vendas, prospecção, qualificação e follow-up." },
      { title: "Treinamento de equipes", text: "Capacitação de recepcionistas, vendedores e atendentes para melhorar comunicação, organização e conversão." },
      { title: "Criação de apresentações comerciais", text: "Desenvolvimento de apresentações para propostas, reuniões, serviços, produtos ou projetos." },
      { title: "Criação de propostas comerciais", text: "Organização do diagnóstico, solução, escopo, etapas, investimento e próximos passos de uma contratação." },
      { title: "Planejamento de campanhas", text: "Criação da estratégia de divulgação sem a necessidade de contratação da gestão mensal." },
      { title: "Auditoria de campanhas", text: "Análise de contas e campanhas existentes no Google Ads e Meta Ads para identificar erros, desperdícios e oportunidades." },
      { title: "Configuração de rastreamento", text: "Instalação e organização de ferramentas como Google Analytics, Google Tag Manager, Pixel da Meta e eventos de conversão." },
      { title: "Dashboards e relatórios", text: "Criação de painéis para acompanhar leads, vendas, investimentos, custos e indicadores comerciais." },
      { title: "Soluções com inteligência artificial", text: "Criação e implantação de prompts, agentes, automações e ferramentas de inteligência artificial para melhorar processos internos." },
      { title: "Desenvolvimento de ferramentas personalizadas", text: "Criação de soluções digitais simples para organizar tarefas, gerar propostas, controlar leads, automatizar atividades ou resolver demandas específicas." },
      { title: "Melhoria contínua", text: "Análise de gargalos e criação de ajustes progressivos para melhorar os resultados de marketing, atendimento, vendas e operação." },
    ],
  },
];

const contractOptions = [
  "Um plano recorrente de Produção de Conteúdo",
  "Um plano recorrente de Geração de Demanda",
  "Uma combinação entre conteúdo e anúncios",
  "Uma ou mais Soluções Avulsas",
  "Uma assessoria mais completa envolvendo marketing, atendimento, processos e vendas",
];

export default function Servicos() {
  return (
    <main className="services-page">
      <section className="services-hero">
        <SiteHeader />
        <div className="services-hero-copy">
          <p className="eyebrow">Soluções AVEX</p>
          <h1>
            Soluções estratégicas para fortalecer sua marca, gerar demanda e{" "}
            <strong>melhorar suas vendas.</strong>
          </h1>
          <p className="services-hero-text">
            Nosso trabalho não se limita à criação de anúncios ou conteúdos.
            Analisamos a jornada do cliente, identificamos gargalos e
            estruturamos estratégias para transformar visibilidade em
            oportunidades reais de negócio.
          </p>
        </div>
      </section>

      <section className="services-audience" aria-labelledby="services-audience-title">
        <h2 id="services-audience-title">
          Indicado para empresas, clínicas, profissionais liberais, prestadores
          de serviços, lojas e negócios locais que:
        </h2>
        <ul className="services-audience-list">
          {audienceBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {categories.map((category) => (
        <section
          className="service-category"
          id={category.id}
          key={category.id}
          aria-labelledby={`${category.id}-title`}
        >
          <div className="service-category-heading">
            <span className="service-category-number">{category.number}</span>
            <div>
              <h2 id={`${category.id}-title`}>{category.title}</h2>
              <p className="service-category-subtitle">{category.subtitle}</p>
              <p className="service-category-intro">{category.intro}</p>
            </div>
          </div>
          <div className="service-item-grid">
            {category.items.map((item) => (
              <article className="service-item-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="services-how" aria-labelledby="services-how-title">
        <div className="section-heading center">
          <h2 id="services-how-title">
            Como a <strong>AVEX atua</strong>
          </h2>
          <p>
            Cada empresa possui uma realidade diferente. Por isso, antes de
            indicar uma solução, analisamos o momento atual do negócio, seus
            objetivos, sua capacidade de atendimento e os principais gargalos
            existentes. A partir desse diagnóstico, definimos quais serviços
            fazem mais sentido e estruturamos um plano com prioridades claras.
          </p>
        </div>
        <ul className="services-how-list">
          {contractOptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="diagnostic-section" id="diagnostico">
        <div className="diagnostic-copy">
          <p className="eyebrow">Diagnóstico estratégico</p>
          <h2>
            Vamos entender qual solução <strong>faz sentido pra você.</strong>
          </h2>
          <p>
            Sem pacote fechado empurrado antes da conversa — o plano sai do
            diagnóstico, não o contrário.
          </p>
        </div>
        <a className="primary-button final" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
          Falar com a equipe AVEX
        </a>
      </section>
    </main>
  );
}
