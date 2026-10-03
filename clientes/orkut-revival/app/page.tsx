"use client";

import { FormEvent, useState } from "react";

type View = "inicio" | "perfil" | "scraps" | "depoimentos" | "comunidades";

const people = [
  ["Marina", "MA", "#7f93bf"], ["Bruno", "BR", "#b46d75"], ["Júlia", "JU", "#669d83"],
  ["Caio", "CA", "#aa7d52"], ["Nina", "NI", "#836da4"], ["Rafa", "RA", "#4c8ca0"],
];

const communities = [
  ["Eu odeio acordar cedo", "☀", "1.842.913"],
  ["Fotografia é poesia", "▣", "328.406"],
  ["Brasileiros que amam café", "☕", "704.219"],
  ["Música boa não tem idade", "♫", "912.301"],
];

function Avatar({ initials, color, size = "md" }: { initials: string; color: string; size?: "sm" | "md" | "lg" }) {
  return <span className={`avatar avatar-${size}`} style={{ background: color }} aria-hidden="true">{initials}</span>;
}

function Panel({ title, action, children, className = "" }: { title: string; action?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel-head"><h2>{title}</h2>{action && <button className="text-action">{action}</button>}</header>
      {children}
    </section>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("inicio");
  const [theme, setTheme] = useState("classic");
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [draft, setDraft] = useState("");
  const [posts, setPosts] = useState([
    { name: "Marina Lopes", initials: "MA", color: "#7f93bf", time: "há 12 minutos", text: "Encontrei um álbum antigo e passei a tarde inteira viajando nas lembranças. Quem mais sente saudade dos scraps?", reactions: "😀 8  ·  ❤️ 12" },
    { name: "Bruno Nogueira", initials: "BR", color: "#b46d75", time: "há 38 minutos", text: "entrou na comunidade Música boa não tem idade.", reactions: "😎 4" },
    { name: "Júlia Freitas", initials: "JU", color: "#669d83", time: "há 1 hora", text: "Atualizou o álbum: Férias em Alter do Chão", reactions: "😍 17  ·  ☀️ 6" },
  ]);
  const [toast, setToast] = useState("");

  function changeView(next: View) {
    setView(next);
    setNoticeOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function publish(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim()) return;
    setPosts([{ name: "Wanderson Paixão", initials: "WP", color: "#ea1d8d", time: "agora", text: draft.trim(), reactions: "" }, ...posts]);
    setDraft("");
    setToast("Sua atualização foi publicada.");
    setTimeout(() => setToast(""), 2200);
  }

  return (
    <div className={`site theme-${theme}`}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="historical-bar"><span><strong>modo setembro de 2014</strong> · uma reconstrução histórica e afetiva</span><button aria-label="Ocultar aviso">×</button></div>

      <header className="topbar">
        <div className="topbar-inner">
          <button className="wordmark" onClick={() => changeView("inicio")} aria-label="Ir para o início">orkut<span>revival</span></button>
          <nav className="top-links" aria-label="Navegação rápida">
            <button onClick={() => changeView("inicio")}>início</button>
            <button onClick={() => changeView("scraps")}>scraps</button>
            <button onClick={() => changeView("comunidades")}>comunidades</button>
          </nav>
          <label className="search"><span className="sr-only">Pesquisar no Orkut Revival</span><input placeholder="pesquisar no orkut"/><button aria-label="Pesquisar">⌕</button></label>
          <div className="top-actions">
            <button className="notification-button" aria-expanded={noticeOpen} onClick={() => setNoticeOpen(!noticeOpen)} aria-label="3 notificações não lidas">●<span>3</span></button>
            <button className="mini-user" onClick={() => changeView("perfil")}><Avatar initials="WP" color="#ea1d8d" size="sm"/><span>Wanderson</span></button>
          </div>
          {noticeOpen && <div className="popover" role="dialog" aria-label="Notificações"><div className="popover-title">notificações <button onClick={() => setNoticeOpen(false)}>×</button></div><button><b>Marina</b> deixou um novo scrap</button><button><b>Bruno</b> comentou numa atualização</button><button><b>Júlia</b> visitou seu perfil</button><div className="popover-footer">ver todas as notificações</div></div>}
        </div>
      </header>

      <div className="mobile-nav" role="navigation" aria-label="Menu principal">
        {(["inicio", "perfil", "scraps", "comunidades"] as View[]).map(item => <button key={item} className={view === item ? "active" : ""} onClick={() => changeView(item)}>{item}</button>)}
      </div>

      <main id="conteudo" className="shell">
        <aside className="left-column" aria-label="Perfil e navegação">
          <div className="profile-card panel">
            <Avatar initials="WP" color="#ea1d8d" size="lg"/>
            <button className="profile-name" onClick={() => changeView("perfil")}>Wanderson Paixão</button>
            <span className="presence"><i/> disponível</span>
            <p>negócios, ideias e um bom café ☕</p>
          </div>
          <nav className="side-nav panel" aria-label="Menu principal">
            {([
              ["inicio", "⌂", "início"], ["perfil", "☺", "perfil"], ["scraps", "✉", "scraps", "188"],
              ["depoimentos", "★", "depoimentos", "12"], ["comunidades", "♟", "comunidades", "16"],
            ] as [View, string, string, string?][]).map(([id, icon, label, count]) => <button key={id} className={view === id ? "active" : ""} aria-current={view === id ? "page" : undefined} onClick={() => changeView(id)}><span>{icon}</span>{label}{count && <b>{count}</b>}</button>)}
            <button><span>▣</span>fotos<b>42</b></button><button><span>♬</span>vídeos</button><button><span>♙</span>amigos<b>301</b></button>
          </nav>
          <div className="theme-box panel"><b>mudar tema</b><div><button className="swatch classic" onClick={() => setTheme("classic")} aria-label="Tema clássico"/><button className="swatch blue" onClick={() => setTheme("blue")} aria-label="Tema azul e branco"/><button className="swatch dark" onClick={() => setTheme("dark")} aria-label="Tema escuro"/></div></div>
        </aside>

        <section className="center-column" aria-live="polite">
          {view === "inicio" && <>
            <div className="welcome panel"><div><span>olá, Wanderson!</span><h1>Bem-vindo de volta</h1><p>Você tem <button onClick={() => changeView("scraps")}>3 novos scraps</button>, <button>2 atualizações</button> e <button>1 depoimento</button> esperando por você.</p></div><div className="reputation"><span>confiável <b>☺☺☺</b></span><span>legal <b>♥♥♥</b></span><span>sexy <b>✦✦✦</b></span></div></div>
            <form className="composer panel" onSubmit={publish}><label htmlFor="update">conte para seus amigos...</label><textarea id="update" value={draft} onChange={e => setDraft(e.target.value)} placeholder="o que você está pensando?"/><div><span>{draft.length}/280</span><button className="primary" disabled={!draft.trim()}>publicar</button></div></form>
            <Panel title="atualizações dos seus amigos" action="atualizar">
              <div className="feed">{posts.map((post, index) => <article className="feed-item" key={`${post.name}-${index}`}><Avatar initials={post.initials} color={post.color}/><div><header><button>{post.name}</button><time>{post.time}</time></header><p>{post.text}</p><footer><button onClick={() => setToast("Você reagiu a esta atualização.")}>gostou? ☺</button><button>comentar</button>{post.reactions && <span>{post.reactions}</span>}</footer></div></article>)}</div>
            </Panel>
          </>}

          {view === "perfil" && <>
            <Panel title="Wanderson Paixão" className="profile-main">
              <div className="profile-intro"><Avatar initials="WP" color="#ea1d8d" size="lg"/><div><h1>Wanderson Paixão</h1><p>“Se dá para imaginar, dá para construir.”</p><div className="profile-actions"><button className="primary">adicionar amigo</button><button onClick={() => changeView("scraps")}>deixar scrap</button></div></div></div>
              <div className="profile-tabs"><button className="active">perfil</button><button>pessoal</button><button>profissional</button><button>interesses</button></div>
              <dl className="facts"><dt>quem sou eu:</dt><dd>empreendedor criativo, estrategista e apaixonado por tecnologia</dd><dt>cidade:</dt><dd>Belém, Pará, Brasil</dd><dt>aniversário:</dt><dd>17 de maio</dd><dt>relacionamento:</dt><dd>comprometido</dd><dt>interesses:</dt><dd>marketing, design, negócios, música e viagens</dd></dl>
            </Panel>
            <Panel title="depoimentos" action="ver todos"><blockquote>“O Wanderson é daquelas pessoas que transformam qualquer conversa em uma grande ideia.”<cite>— Marina Lopes</cite></blockquote></Panel>
          </>}

          {view === "scraps" && <>
            <Panel title="scrapbook" className="scrapbook"><form onSubmit={e => { e.preventDefault(); setToast("Scrap enviado com sucesso!"); }}><label htmlFor="scrap">deixe um recado para Wanderson</label><textarea id="scrap" placeholder="escreva seu scrap aqui..."/><div><span>você pode usar emoticons ☺</span><button className="primary">enviar scrap</button></div></form></Panel>
            <Panel title="188 scraps" action="mais recentes">
              {[['Marina Lopes','MA','#7f93bf','14/08/2014 às 09:42','Passei para desejar uma semana cheia de ideias boas! ☀'],['Bruno Nogueira','BR','#b46d75','13/08/2014 às 21:18','Lembra daquela comunidade que a gente criou? Ainda está viva!'],['Júlia Freitas','JU','#669d83','12/08/2014 às 16:05','Adorei as fotos da viagem. Depois manda as outras!']].map(s => <article className="scrap" key={s[0]}><Avatar initials={s[1]} color={s[2]}/><div><header><button>{s[0]}</button><time>{s[3]}</time></header><p>{s[4]}</p><footer><button>responder</button><button>apagar</button></footer></div></article>)}
            </Panel>
          </>}

          {view === "depoimentos" && <Panel title="depoimentos sobre você"><div className="testimonial pending"><span>aguardando sua aprovação</span><p>“Amigo leal, parceiro para todas as horas e dono das melhores ideias. Ter você por perto faz tudo ficar mais leve.”</p><footer>Marina Lopes · 11/08/2014 <button>aprovar</button><button>recusar</button></footer></div><div className="testimonial"><p>“Wanderson sempre enxerga possibilidades onde todo mundo vê problemas.”</p><footer>Bruno Nogueira · 02/07/2014</footer></div></Panel>}

          {view === "comunidades" && <>
            <Panel title="minhas comunidades" action="gerenciar"><div className="community-list">{communities.map(c => <article key={c[0]}><span className="community-thumb">{c[1]}</span><div><button>{c[0]}</button><p>{c[2]} membros</p><small>novos tópicos hoje</small></div></article>)}</div></Panel>
            <Panel title="fórum em destaque"><div className="topics"><div className="topic-head"><span>tópico</span><span>respostas</span><span>última</span></div>{[['Por que segunda-feira existe?','128','agora'],['A música que marcou sua adolescência','94','12 min'],['Mostre a última foto que você tirou','62','38 min'],['Café com ou sem açúcar?','211','1 h']].map(t => <button className="topic-row" key={t[0]}><span>{t[0]}<small>por um membro da comunidade</small></span><b>{t[1]}</b><time>{t[2]}</time></button>)}</div></Panel>
          </>}
        </section>

        <aside className="right-column" aria-label="Amigos e comunidades">
          <Panel title="amigos" action="ver todos (301)"><div className="friends-grid">{people.map(p => <button key={p[0]}><Avatar initials={p[1]} color={p[2]}/><span>{p[0]}</span></button>)}</div></Panel>
          <Panel title="visitantes recentes" action="ver todos"><div className="visitor-list">{people.slice(2,5).map((p, i) => <button key={p[0]}><Avatar initials={p[1]} color={p[2]} size="sm"/><span>{p[0]}<small>{i === 0 ? "hoje" : "ontem"}</small></span></button>)}</div></Panel>
          <Panel title="comunidades" action="ver todas (16)"><div className="mini-communities">{communities.slice(0,3).map(c => <button key={c[0]}><span>{c[1]}</span><b>{c[0]}</b></button>)}</div></Panel>
        </aside>
      </main>

      <button className="chat-dock" onClick={() => { setChatOpen(!chatOpen); setChatMinimized(false); }}><span className="presence-dot"/> amigos online <b>8</b></button>
      {chatOpen && <div className={`chat-window ${chatMinimized ? "minimized" : ""}`}><header><span><i/> Marina Lopes</span><div><button onClick={() => setChatMinimized(!chatMinimized)} aria-label="Minimizar chat">—</button><button onClick={() => setChatOpen(false)} aria-label="Fechar chat">×</button></div></header>{!chatMinimized && <><div className="chat-messages"><p><b>Marina</b> Oi! Você viu que o Orkut voltou? ☺</p><p className="mine">Vi sim! A nostalgia bateu forte.</p></div><form onSubmit={e => e.preventDefault()}><label className="sr-only" htmlFor="message">Mensagem</label><input id="message" placeholder="digite uma mensagem..."/><button>enviar</button></form></>}</div>}
      {toast && <div className="toast" role="status">{toast}</div>}
      <footer className="site-footer">orkut revival · uma reconstrução independente para fins de demonstração <button>sobre</button> <button>privacidade</button></footer>
    </div>
  );
}
