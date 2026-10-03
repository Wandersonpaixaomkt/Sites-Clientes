import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug } from "@/app/cms";

type Props = { params: Promise<{ slug: string }> };
const siteUrl = "https://norte-em-foco-noticias.wandersonpaixaomkt.chatgpt.site";

function plainText(body: string, fallback: string) {
  try {
    const json = JSON.parse(body);
    const collect = (node: { text?: string; content?: unknown[] }): string => [node.text || "", ...(node.content || []).map((child) => collect(child as { text?: string; content?: unknown[] }))].join(" ");
    return collect(json).replace(/\s+/g, " ").trim() || fallback;
  } catch { return fallback; }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug).catch(() => null);
  if (!article) return {};
  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt;
  const canonical = article.canonicalUrl || `${siteUrl}/noticias/${article.slug}`;
  return { title, description, alternates: { canonical }, robots: { index: article.robotsIndex, follow: article.robotsFollow }, openGraph: { type: "article", title: article.ogTitle || title, description: article.ogDescription || description, url: canonical, images: article.featuredImageUrl ? [article.featuredImageUrl] : [] }, twitter: { card: "summary_large_image", title: article.ogTitle || title, description: article.ogDescription || description } };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug((await params).slug).catch(() => null);
  if (!article) notFound();
  const canonical = article.canonicalUrl || `${siteUrl}/noticias/${article.slug}`;
  const body = plainText(article.bodyJson, article.excerpt);
  const schema = { "@context": "https://schema.org", "@type": "NewsArticle", headline: article.title, description: article.excerpt, datePublished: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined, dateModified: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined, mainEntityOfPage: canonical, author: { "@type": "Person", name: article.authorName || "Redação Norte em Foco" }, publisher: { "@type": "Organization", name: "Norte em Foco" } };
  return <main className="article-page"><nav><Link href="/">← Voltar ao portal</Link><Link href="/admin">Painel editorial</Link></nav><article><p className="article-page-tag">{article.categoryName || article.tags[0] || "Notícias"}</p><h1>{article.title}</h1><p className="article-page-lead">{article.excerpt}</p><p className="article-page-meta">Por {article.authorName || "Redação Norte em Foco"} {article.publishedAt ? "• " + new Date(article.publishedAt).toLocaleDateString("pt-BR") : ""}</p>{article.featuredImageUrl && <img src={article.featuredImageUrl} alt="" />}<div className="article-page-body"><p>{body}</p></div>{article.source && article.sourceUrl && <footer className="article-page-source"><b>Fonte e créditos</b><p>Conteúdo elaborado pelo Norte em Foco a partir de informações publicadas por <strong>{article.source}</strong>.</p><a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">Ver publicação original ↗</a></footer>}</article><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></main>;
}
