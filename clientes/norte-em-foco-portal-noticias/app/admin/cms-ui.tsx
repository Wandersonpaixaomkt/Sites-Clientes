"use client";

import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useMemo, useState } from "react";
import type { CmsArticle, EditorOptions, ArticleStatus } from "@/app/cms";

const nav = [
  ["Visão geral", "/admin"], ["Notícias", "/admin/articles/new"], ["Mídia", "/admin#midia"],
  ["Publicidade", "/admin#publicidade"], ["SEO e UTMs", "/admin#seo"], ["Configurações", "/admin#configuracoes"],
];

export function CmsShell({ children }: { children: React.ReactNode }) {
  return <div className="cms-shell">
    <aside className="cms-sidebar"><Link className="cms-brand" href="/admin">NORTE <b>EM FOCO</b><small>CMS editorial</small></Link>
      <nav>{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <Link className="cms-back" href="/">← Ver portal</Link>
    </aside>
    <main className="cms-main">{children}</main>
  </div>;
}

export function Dashboard({ overview }: { overview: { counts: Record<string, number>; queue: { id: string; title: string; status: string; updated_at: number }[]; activeSlots: number } }) {
  const published = overview.counts.published || 0;
  return <CmsShell><div className="cms-head"><div><p className="cms-kicker">CENTRAL EDITORIAL</p><h1>Bom trabalho, Redação.</h1><p>Publique, acompanhe sua pauta e prepare a monetização do Norte em Foco.</p></div><Link className="cms-primary" href="/admin/articles/new">+ Nova notícia</Link></div>
    <section className="cms-stats">
      <Stat label="Publicadas" value={published} note="visíveis no portal" />
      <Stat label="Em revisão" value={overview.counts.review || 0} note="aguardando aprovação" />
      <Stat label="Rascunhos" value={overview.counts.draft || 0} note="em produção" />
      <Stat label="Espaços de anúncio" value={overview.activeSlots} note="ativos no inventário" />
    </section>
    <section className="cms-grid"><div className="cms-card cms-queue"><div className="cms-card-title"><h2>Fila editorial</h2><Link href="/admin/articles/new">Criar notícia</Link></div>
      {overview.queue.length ? overview.queue.map((item) => <Link className="cms-queue-item" href={"/admin/articles/" + item.id} key={item.id}><span><b>{item.title}</b><small>Atualizada {new Date(item.updated_at).toLocaleDateString("pt-BR")}</small></span><em>{statusLabel(item.status)}</em></Link>) : <p className="cms-muted">Tudo em dia. Crie uma notícia para começar.</p>}
    </div>
    <div className="cms-card"><h2>Analytics</h2><div className="cms-chart"><span style={{ height: "38%" }} /><span style={{ height: "52%" }} /><span style={{ height: "41%" }} /><span style={{ height: "76%" }} /><span style={{ height: "64%" }} /><span style={{ height: "86%" }} /></div><p className="cms-muted">Conecte a propriedade GA4 para visualizar usuários, sessões e matérias mais lidas.</p></div></section>
    <section id="publicidade" className="cms-card cms-ad-card"><div><p className="cms-kicker">MONETIZAÇÃO</p><h2>Publicidade pronta para organizar</h2><p>Cadastre campanhas, posições de banner e scripts de AdSense ou Google Tag Manager sem tocar no código.</p></div><button type="button" disabled>Em breve: gerenciar campanhas</button></section>
  </CmsShell>;
}

function Stat({ label, value, note }: { label: string; value: number; note: string }) { return <div className="cms-stat"><small>{label}</small><strong>{value}</strong><span>{note}</span></div>; }
function statusLabel(status: string) { return ({ draft: "Rascunho", review: "Revisão", scheduled: "Agendada", published: "Publicada" } as Record<string, string>)[status] || status; }

type FormState = {
  title: string; slug: string; excerpt: string; status: ArticleStatus; categoryId: string; tags: string; sourceName: string; sourceUrl: string;
  metaTitle: string; metaDescription: string; canonicalUrl: string; robotsIndex: boolean; robotsFollow: boolean; ogTitle: string; ogDescription: string; featuredMediaId: string;
};
const emptyBody = { type: "doc", content: [{ type: "paragraph", content: [] }] };

export function ArticleEditor({ article, options }: { article: CmsArticle | null; options: EditorOptions }) {
  const initial = useMemo<FormState>(() => ({
    title: article?.title || "", slug: article?.slug || "", excerpt: article?.excerpt || "", status: article?.status || "draft",
    categoryId: article?.categoryId || "", tags: article?.tags.join(", ") || "", sourceName: article?.source || "", sourceUrl: article?.sourceUrl || "",
    metaTitle: article?.metaTitle || "", metaDescription: article?.metaDescription || "", canonicalUrl: article?.canonicalUrl || "",
    robotsIndex: article?.robotsIndex ?? true, robotsFollow: article?.robotsFollow ?? true, ogTitle: article?.ogTitle || "", ogDescription: article?.ogDescription || "", featuredMediaId: "",
  }), [article]);
  const [form, setForm] = useState(initial); const [tab, setTab] = useState<"content" | "seo">("content"); const [message, setMessage] = useState(""); const [mediaUrl, setMediaUrl] = useState(article?.featuredImageUrl || "");
  const editor = useEditor({ extensions: [StarterKit, LinkExtension.configure({ openOnClick: false }), Placeholder.configure({ placeholder: "Escreva a notícia com contexto, serviço e informações verificadas…" })], content: article?.bodyJson ? JSON.parse(article.bodyJson) : emptyBody, immediatelyRender: false });
  const set = (key: keyof FormState, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));
  async function submit(status?: ArticleStatus) {
    if (!editor) return; setMessage("Salvando…");
    const response = await fetch("/api/admin/articles", { method: article ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, status: status || form.status, id: article?.id, tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean), bodyJson: JSON.stringify(editor.getJSON()) }) });
    const data = await response.json();
    if (!response.ok) { setMessage(data.error || "Não foi possível salvar."); return; }
    setMessage(status === "published" ? "Notícia publicada no portal." : "Alterações salvas.");
    if (!article) window.history.replaceState({}, "", "/admin/articles/" + data.id);
  }
  async function upload(file: File) {
    setMessage("Otimizando imagem…"); const data = new FormData(); data.set("file", file); data.set("alt", form.title);
    const response = await fetch("/api/admin/media", { method: "POST", body: data }); const result = await response.json();
    if (!response.ok) { setMessage(result.error || "Falha no upload."); return; }
    set("featuredMediaId", result.id); setMediaUrl(result.url); setMessage("Imagem convertida para WebP.");
  }
  return <CmsShell><div className="cms-head editor-head"><div><Link className="cms-breadcrumb" href="/admin">← Painel</Link><h1>{article ? "Editar notícia" : "Nova notícia"}</h1></div><div className="cms-actions"><span>{message}</span><button onClick={() => submit("draft")} className="cms-ghost">Salvar rascunho</button><button onClick={() => submit("published")} className="cms-primary">Publicar</button></div></div>
    <div className="editor-layout"><section className="editor-main"><div className="cms-tabs"><button onClick={() => setTab("content")} className={tab === "content" ? "active" : ""}>Conteúdo</button><button onClick={() => setTab("seo")} className={tab === "seo" ? "active" : ""}>SEO e UTMs</button></div>
      {tab === "content" ? <><label className="cms-field"><span>Título</span><input value={form.title} onChange={(e) => { set("title", e.target.value); if (!form.slug) set("slug", e.target.value); }} placeholder="Título claro e informativo" /></label>
        <label className="cms-field"><span>Resumo</span><textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="O que aconteceu e por que isso importa?" /></label>
        <div className="cms-field"><span>Texto da notícia</span><div className="editor-toolbar"><button onClick={() => editor?.chain().focus().toggleBold().run()}><b>B</b></button><button onClick={() => editor?.chain().focus().toggleItalic().run()}><i>I</i></button><button onClick={() => editor?.chain().focus().toggleBulletList().run()}>Lista</button><button onClick={() => editor?.chain().focus().toggleBlockquote().run()}>Citação</button></div><EditorContent editor={editor} className="tiptap-editor" /></div>
        <div className="cms-credit"><b>Crédito editorial obrigatório</b><p>Use texto próprio, confirmação de fatos e imagens próprias/licenciadas. A fonte e o link original aparecem no final da matéria.</p></div></> :
        <SeoPanel form={form} set={set} />}
    </section>
    <aside className="editor-side"><label className="cms-field"><span>Status</span><select value={form.status} onChange={(e) => set("status", e.target.value)}><option value="draft">Rascunho</option><option value="review">Pendente de revisão</option><option value="published">Publicado</option><option value="scheduled">Agendado</option></select></label>
      <label className="cms-field"><span>Categoria</span><select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}><option value="">Sem categoria</option>{options.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
      <label className="cms-field"><span>Tags</span><input value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Parauapebas, Economia" /><small>Separe por vírgulas.</small></label>
      <hr /><label className="cms-field"><span>Fonte / veículo</span><input value={form.sourceName} onChange={(e) => set("sourceName", e.target.value)} placeholder="Ex.: Agência Pará" /></label><label className="cms-field"><span>Link original</span><input value={form.sourceUrl} onChange={(e) => set("sourceUrl", e.target.value)} placeholder="https://…" /></label>
      <div className="cms-media-placeholder"><b>Imagem de destaque</b><input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />{mediaUrl && <img src={mediaUrl} alt="" />}<p>Conversão automática em WebP, até 1920px e 10 MB.</p></div>
    </aside></div>
  </CmsShell>;
}

function SeoPanel({ form, set }: { form: FormState; set: (key: keyof FormState, value: string | boolean) => void }) {
  const utm = `${form.canonicalUrl || "https://norteemfoco.com/noticias/" + (form.slug || "sua-noticia")}?utm_source=instagram&utm_medium=social&utm_campaign=noticia`;
  return <div className="seo-panel"><div className="cms-two"><label className="cms-field"><span>Slug amigável</span><input value={form.slug} onChange={(e) => set("slug", e.target.value)} /></label><label className="cms-field"><span>Canonical</span><input value={form.canonicalUrl} onChange={(e) => set("canonicalUrl", e.target.value)} placeholder="https://norteemfoco.com/noticias/…" /></label></div>
    <label className="cms-field"><span>Meta title <small>{form.metaTitle.length}/60</small></span><input value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} /></label><label className="cms-field"><span>Meta description <small>{form.metaDescription.length}/155</small></span><textarea value={form.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} /></label>
    <div className="snippet"><small>norteemfoco.com › noticias</small><b>{form.metaTitle || form.title || "Título da notícia"}</b><p>{form.metaDescription || form.excerpt || "A prévia de resultado do Google será exibida aqui."}</p></div>
    <h2>Redes sociais</h2><label className="cms-field"><span>Open Graph title</span><input value={form.ogTitle} onChange={(e) => set("ogTitle", e.target.value)} /></label><label className="cms-field"><span>Open Graph description</span><textarea value={form.ogDescription} onChange={(e) => set("ogDescription", e.target.value)} /></label>
    <div className="cms-checks"><label><input type="checkbox" checked={form.robotsIndex} onChange={(e) => set("robotsIndex", e.target.checked)} /> Permitir indexação</label><label><input type="checkbox" checked={form.robotsFollow} onChange={(e) => set("robotsFollow", e.target.checked)} /> Seguir links</label></div>
    <h2>Gerador de UTM</h2><code>{utm}</code><p className="cms-muted">Ajuste a URL canonical e copie o link para usar em campanhas e redes sociais.</p>
  </div>;
}
