import { env } from "cloudflare:workers";
import type { Story } from "./news-data";
import { stories } from "./news-data";
import { hasSupabase, supabase } from "./supabase";

export type ArticleStatus = "draft" | "review" | "published" | "scheduled" | "archived";

export type CmsArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  bodyJson: string;
  status: ArticleStatus;
  categoryId: string | null;
  categoryName: string | null;
  authorName: string | null;
  featuredImageUrl: string | null;
  publishedAt: number | null;
  scheduledAt: number | null;
  tags: string[];
  source: string | null;
  sourceUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  robotsIndex: boolean;
  robotsFollow: boolean;
  ogTitle: string | null;
  ogDescription: string | null;
};

export type EditorOptions = {
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
};

const now = () => Date.now();
const id = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;
const slugify = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 110);

function database(): D1Database {
  if (!env.DB) throw new Error("Banco CMS indisponível.");
  return env.DB;
}

export async function seedCmsIfEmpty() {
  if (hasSupabase()) return;
  const db = database();
  const existing = await db.prepare("SELECT count(*) as count FROM articles").first<{ count: number }>();
  if ((existing?.count ?? 0) > 0) return;
  const timestamp = now();
  const statements: D1PreparedStatement[] = [
    db.prepare("INSERT OR IGNORE INTO authors (id, name, slug, created_at, updated_at) VALUES (?, ?, ?, ?, ?)")
      .bind("author-norte-em-foco", "Redação Norte em Foco", "redacao-norte-em-foco", timestamp, timestamp),
  ];
  for (const story of stories) {
    const articleId = `seed-${story.id}`;
    const articleSlug = `${slugify(story.title)}-${story.id}`;
    const category = story.tags[0] || "Regional";
    const categoryId = `category-${slugify(category)}`;
    const sourceId = `source-${slugify(story.source)}`;
    const sourceUrl = new URL(story.sourceUrl).origin;
    statements.push(
      db.prepare("INSERT OR IGNORE INTO categories (id, name, slug, created_at, updated_at) VALUES (?, ?, ?, ?, ?)")
        .bind(categoryId, category, slugify(category), timestamp, timestamp),
      db.prepare("INSERT OR IGNORE INTO sources (id, name, base_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?)")
        .bind(sourceId, story.source, sourceUrl, timestamp, timestamp),
      db.prepare("INSERT OR IGNORE INTO articles (id, title, slug, excerpt, body_json, status, category_id, author_id, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'published', ?, 'author-norte-em-foco', ?, ?, ?)")
        .bind(articleId, story.title, articleSlug, story.summary, JSON.stringify({ type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: story.summary }] }] }), categoryId, timestamp, timestamp, timestamp),
      db.prepare("INSERT OR IGNORE INTO article_sources (id, article_id, source_id, original_url, credit_text, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .bind(`article-source-${story.id}`, articleId, sourceId, story.sourceUrl, `Fonte: ${story.source}`, timestamp, timestamp),
      db.prepare("INSERT OR IGNORE INTO article_seo (article_id, meta_title, meta_description, robots_index, robots_follow, twitter_card, created_at, updated_at) VALUES (?, ?, ?, 1, 1, 'summary_large_image', ?, ?)")
        .bind(articleId, story.title.slice(0, 60), story.summary.slice(0, 155), timestamp, timestamp),
    );
    for (const tag of story.tags) {
      const tagId = `tag-${slugify(tag)}`;
      statements.push(
        db.prepare("INSERT OR IGNORE INTO tags (id, name, slug, created_at, updated_at) VALUES (?, ?, ?, ?, ?)")
          .bind(tagId, tag, slugify(tag), timestamp, timestamp),
        db.prepare("INSERT OR IGNORE INTO article_tags (article_id, tag_id) VALUES (?, ?)")
          .bind(articleId, tagId),
      );
    }
  }
  await db.batch(statements);
}

function parseTags(value: string | null) {
  return value ? value.split("||").filter(Boolean) : [];
}

function toArticle(row: Record<string, unknown>): CmsArticle {
  return {
    id: String(row.id), title: String(row.title), slug: String(row.slug), excerpt: String(row.excerpt),
    bodyJson: String(row.body_json ?? ""), status: row.status as ArticleStatus,
    categoryId: row.category_id ? String(row.category_id) : null, categoryName: row.category_name ? String(row.category_name) : null,
    authorName: row.author_name ? String(row.author_name) : null, featuredImageUrl: row.featured_image_url ? String(row.featured_image_url) : null,
    publishedAt: row.published_at ? Number(row.published_at) : null, scheduledAt: row.scheduled_at ? Number(row.scheduled_at) : null,
    tags: parseTags(row.tags as string | null), source: row.source_name ? String(row.source_name) : null,
    sourceUrl: row.source_url ? String(row.source_url) : null, metaTitle: row.meta_title ? String(row.meta_title) : null,
    metaDescription: row.meta_description ? String(row.meta_description) : null, canonicalUrl: row.canonical_url ? String(row.canonical_url) : null,
    robotsIndex: Boolean(row.robots_index ?? 1), robotsFollow: Boolean(row.robots_follow ?? 1),
    ogTitle: row.og_title ? String(row.og_title) : null, ogDescription: row.og_description ? String(row.og_description) : null,
  };
}

const articleSelect = `SELECT a.*, c.name category_name, au.name author_name, m.url featured_image_url,
  s.name source_name, aps.original_url source_url, seo.meta_title, seo.meta_description, seo.canonical_url,
  seo.robots_index, seo.robots_follow, seo.og_title, seo.og_description,
  GROUP_CONCAT(t.name, '||') tags
  FROM articles a
  LEFT JOIN categories c ON c.id = a.category_id
  LEFT JOIN authors au ON au.id = a.author_id
  LEFT JOIN media m ON m.id = a.featured_media_id
  LEFT JOIN article_sources aps ON aps.article_id = a.id
  LEFT JOIN sources s ON s.id = aps.source_id
  LEFT JOIN article_seo seo ON seo.article_id = a.id
  LEFT JOIN article_tags at ON at.article_id = a.id
  LEFT JOIN tags t ON t.id = at.tag_id`;

export async function listPublishedStories(): Promise<Story[]> {
  if (hasSupabase()) return (await listSupabaseArticles("status=eq.published&order=published_at.desc")).map(articleToStory);
  await seedCmsIfEmpty();
  const rows = await database().prepare(`${articleSelect} WHERE a.status = 'published' AND (a.published_at IS NULL OR a.published_at <= ?) GROUP BY a.id ORDER BY a.published_at DESC LIMIT 120`).bind(now()).all<Record<string, unknown>>();
  return rows.results.map(toArticle).map((article) => ({
    id: article.id, slug: article.slug, title: article.title, summary: article.excerpt, source: article.source || "Norte em Foco",
    sourceUrl: article.sourceUrl || "#", publishedAt: article.publishedAt ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(article.publishedAt) : "Agora",
    tags: article.tags, sourceNote: article.sourceUrl ? "Crédito e link da fonte original no fim da notícia." : undefined,
  }));
}

export async function getArticleBySlug(slug: string) {
  if (hasSupabase()) return (await listSupabaseArticles(`slug=eq.${encodeURIComponent(slug)}&limit=1`))[0] || null;
  await seedCmsIfEmpty();
  const row = await database().prepare(`${articleSelect} WHERE a.slug = ? GROUP BY a.id LIMIT 1`).bind(slug).first<Record<string, unknown>>();
  return row ? toArticle(row) : null;
}

export async function getEditorOptions(): Promise<EditorOptions> {
  if (hasSupabase()) {
    const [categories, tags] = await Promise.all([
      supabase<{ id: string; name: string }[]>("rest/v1/categories?select=id,name&order=name"),
      supabase<{ id: string; name: string }[]>("rest/v1/tags?select=id,name&order=name"),
    ]);
    return { categories, tags };
  }
  await seedCmsIfEmpty();
  const db = database();
  const [categoryRows, tagRows] = await Promise.all([
    db.prepare("SELECT id, name FROM categories ORDER BY name").all<{ id: string; name: string }>(),
    db.prepare("SELECT id, name FROM tags ORDER BY name").all<{ id: string; name: string }>(),
  ]);
  return { categories: categoryRows.results, tags: tagRows.results };
}

export async function getArticleForEditor(articleId: string) {
  if (hasSupabase()) return (await listSupabaseArticles(`id=eq.${encodeURIComponent(articleId)}&limit=1`))[0] || null;
  const row = await database().prepare(`${articleSelect} WHERE a.id = ? GROUP BY a.id LIMIT 1`).bind(articleId).first<Record<string, unknown>>();
  return row ? toArticle(row) : null;
}

export async function getCmsOverview() {
  if (hasSupabase()) {
    const [articles, slots] = await Promise.all([
      supabase<{ id: string; title: string; status: string; updated_at: string }[]>("rest/v1/articles?select=id,title,status,updated_at&order=updated_at.desc"),
      supabase<{ count: number }[]>("rest/v1/ad_slots?select=count&enabled=eq.true"),
    ]);
    const counts = articles.reduce<Record<string, number>>((result, item) => ({ ...result, [item.status]: (result[item.status] || 0) + 1 }), {});
    return { counts, queue: articles.filter((article) => ["draft", "review", "scheduled"].includes(article.status)).slice(0, 8).map((article) => ({ ...article, updated_at: new Date(article.updated_at).getTime() })), activeSlots: slots[0]?.count || 0 };
  }
  await seedCmsIfEmpty();
  const db = database();
  const [counts, queue, ads] = await Promise.all([
    db.prepare("SELECT status, count(*) count FROM articles GROUP BY status").all<{ status: string; count: number }>(),
    db.prepare("SELECT id, title, status, updated_at FROM articles WHERE status IN ('draft','review','scheduled') ORDER BY updated_at DESC LIMIT 8").all<{ id: string; title: string; status: string; updated_at: number }>(),
    db.prepare("SELECT count(*) count FROM ad_slots WHERE enabled = 1").first<{ count: number }>(),
  ]);
  return { counts: Object.fromEntries(counts.results.map((item) => [item.status, item.count])), queue: queue.results, activeSlots: ads?.count ?? 0 };
}

export type SaveArticleInput = {
  id?: string; title: string; slug: string; excerpt: string; bodyJson: string; status: ArticleStatus;
  categoryId?: string | null; featuredMediaId?: string | null; tags: string[]; sourceName?: string; sourceUrl?: string; metaTitle?: string;
  metaDescription?: string; canonicalUrl?: string; robotsIndex: boolean; robotsFollow: boolean; ogTitle?: string; ogDescription?: string;
};

export async function saveArticle(input: SaveArticleInput, user: { userId: string; email: string; displayName: string }) {
  if (hasSupabase()) return saveSupabaseArticle(input, user);
  const db = database(); const timestamp = now(); const articleId = input.id || id("article");
  const cleanSlug = slugify(input.slug || input.title);
  const authorId = `author-${user.userId}`;
  await db.batch([
    db.prepare("INSERT OR IGNORE INTO users (id, email, name, role, created_at, updated_at) VALUES (?, ?, ?, 'admin', ?, ?)")
      .bind(user.userId, user.email, user.displayName, timestamp, timestamp),
    db.prepare("INSERT OR IGNORE INTO authors (id, user_id, name, slug, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(authorId, user.userId, user.displayName, `autor-${slugify(user.userId)}`, timestamp, timestamp),
    db.prepare(`INSERT INTO articles (id,title,slug,excerpt,body_json,status,category_id,author_id,featured_media_id,published_at,created_by_user_id,created_at,updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CASE WHEN ? = 'published' THEN ? ELSE NULL END, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET title=excluded.title,slug=excluded.slug,excerpt=excluded.excerpt,body_json=excluded.body_json,status=excluded.status,category_id=excluded.category_id,author_id=excluded.author_id,featured_media_id=excluded.featured_media_id,published_at=CASE WHEN excluded.status='published' THEN COALESCE(articles.published_at, excluded.published_at) ELSE articles.published_at END,updated_at=excluded.updated_at`)
      .bind(articleId, input.title, cleanSlug, input.excerpt, input.bodyJson, input.status, input.categoryId || null, authorId, input.featuredMediaId || null, input.status, timestamp, user.userId, timestamp, timestamp),
    db.prepare(`INSERT INTO article_seo (article_id,meta_title,meta_description,canonical_url,robots_index,robots_follow,og_title,og_description,twitter_card,created_at,updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'summary_large_image', ?, ?)
      ON CONFLICT(article_id) DO UPDATE SET meta_title=excluded.meta_title,meta_description=excluded.meta_description,canonical_url=excluded.canonical_url,robots_index=excluded.robots_index,robots_follow=excluded.robots_follow,og_title=excluded.og_title,og_description=excluded.og_description,updated_at=excluded.updated_at`)
      .bind(articleId, input.metaTitle || null, input.metaDescription || null, input.canonicalUrl || null, input.robotsIndex ? 1 : 0, input.robotsFollow ? 1 : 0, input.ogTitle || null, input.ogDescription || null, timestamp, timestamp),
  ]);
  await db.batch([
    db.prepare("DELETE FROM article_tags WHERE article_id = ?").bind(articleId),
    db.prepare("DELETE FROM article_sources WHERE article_id = ?").bind(articleId),
  ]);
  const relations: D1PreparedStatement[] = [];
  for (const name of input.tags.map((tag) => tag.trim()).filter(Boolean)) {
    const tagId = `tag-${slugify(name)}`;
    relations.push(
      db.prepare("INSERT OR IGNORE INTO tags (id,name,slug,created_at,updated_at) VALUES (?, ?, ?, ?, ?)").bind(tagId, name, slugify(name), timestamp, timestamp),
      db.prepare("INSERT OR IGNORE INTO article_tags (article_id,tag_id) VALUES (?, ?)").bind(articleId, tagId),
    );
  }
  if (input.sourceName && input.sourceUrl) {
    const sourceId = `source-${slugify(input.sourceName)}`;
    let baseUrl = input.sourceUrl;
    try { baseUrl = new URL(input.sourceUrl).origin; } catch { /* validated by API */ }
    relations.push(
      db.prepare("INSERT OR IGNORE INTO sources (id,name,base_url,created_at,updated_at) VALUES (?, ?, ?, ?, ?)").bind(sourceId, input.sourceName, baseUrl, timestamp, timestamp),
      db.prepare("INSERT INTO article_sources (id,article_id,source_id,original_url,credit_text,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(id("article-source"), articleId, sourceId, input.sourceUrl, `Fonte: ${input.sourceName}`, timestamp, timestamp),
    );
  }
  if (relations.length) await db.batch(relations);
  await db.prepare("INSERT INTO article_versions (id,article_id,body_json,title,note,created_by_user_id,created_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(id("version"), articleId, input.bodyJson, input.title, `Status: ${input.status}`, user.userId, timestamp).run();
  return { id: articleId, slug: cleanSlug };
}

type SupabaseArticleRow = {
  id: string; title: string; slug: string; excerpt: string; body: unknown; status: ArticleStatus;
  category_id: string | null; published_at: string | null; scheduled_at: string | null;
  categories?: { name: string } | null; authors?: { name: string } | null; media?: { public_url: string } | null;
  article_sources?: { original_url: string; sources?: { name: string } | null }[];
  article_tags?: { tags?: { name: string } | null }[];
  article_seo?: { meta_title: string | null; meta_description: string | null; canonical_url: string | null; robots_index: boolean; robots_follow: boolean; og_title: string | null; og_description: string | null } | null;
};

async function listSupabaseArticles(filter: string): Promise<CmsArticle[]> {
  const rows = await supabase<SupabaseArticleRow[]>(
    `rest/v1/articles?select=id,title,slug,excerpt,body,status,category_id,published_at,scheduled_at,categories(name),authors(name),media:featured_media_id(public_url),article_sources(original_url,sources(name)),article_tags(tags(name)),article_seo(meta_title,meta_description,canonical_url,robots_index,robots_follow,og_title,og_description)&${filter}`,
  );
  return rows.map((row) => ({
    id: row.id, title: row.title, slug: row.slug, excerpt: row.excerpt, bodyJson: JSON.stringify(row.body),
    status: row.status, categoryId: row.category_id, categoryName: row.categories?.name || null, authorName: row.authors?.name || null,
    featuredImageUrl: row.media?.public_url || null, publishedAt: row.published_at ? new Date(row.published_at).getTime() : null,
    scheduledAt: row.scheduled_at ? new Date(row.scheduled_at).getTime() : null,
    tags: (row.article_tags || []).map((item) => item.tags?.name).filter((name): name is string => Boolean(name)),
    source: row.article_sources?.[0]?.sources?.name || null, sourceUrl: row.article_sources?.[0]?.original_url || null,
    metaTitle: row.article_seo?.meta_title || null, metaDescription: row.article_seo?.meta_description || null,
    canonicalUrl: row.article_seo?.canonical_url || null, robotsIndex: row.article_seo?.robots_index ?? true,
    robotsFollow: row.article_seo?.robots_follow ?? true, ogTitle: row.article_seo?.og_title || null, ogDescription: row.article_seo?.og_description || null,
  }));
}

function articleToStory(article: CmsArticle): Story {
  return {
    id: article.id, slug: article.slug, title: article.title, summary: article.excerpt,
    source: article.source || "Norte em Foco", sourceUrl: article.sourceUrl || "#",
    publishedAt: article.publishedAt ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(article.publishedAt) : "Agora",
    tags: article.tags, sourceNote: article.sourceUrl ? "Crédito e link da fonte original no fim da notícia." : undefined,
  };
}

async function saveSupabaseArticle(input: SaveArticleInput, user: { userId: string; email: string; displayName: string }) {
  const cleanSlug = slugify(input.slug || input.title);
  const authorSlug = `autor-${slugify(user.displayName)}`;
  const [author] = await supabase<{ id: string }[]>(
    `rest/v1/authors?on_conflict=slug`,
    { method: "POST", prefer: "resolution=merge-duplicates,return=representation", body: { name: user.displayName, slug: authorSlug } },
  );
  const payload = {
    title: input.title, slug: cleanSlug, excerpt: input.excerpt, body: JSON.parse(input.bodyJson), status: input.status,
    category_id: input.categoryId || null, author_id: author.id,
    published_at: input.status === "published" ? new Date().toISOString() : null,
  };
  const articles = input.id
    ? await supabase<{ id: string }[]>(`rest/v1/articles?id=eq.${encodeURIComponent(input.id)}`, { method: "PATCH", prefer: "return=representation", body: payload })
    : await supabase<{ id: string }[]>(`rest/v1/articles?on_conflict=slug`, { method: "POST", prefer: "resolution=merge-duplicates,return=representation", body: payload });
  const article = articles[0];
  if (!article) throw new Error("Não foi possível salvar a notícia no Supabase.");

  await Promise.all([
    supabase(`rest/v1/article_tags?article_id=eq.${article.id}`, { method: "DELETE" }),
    supabase(`rest/v1/article_sources?article_id=eq.${article.id}`, { method: "DELETE" }),
  ]);
  for (const tagName of input.tags.map((tag) => tag.trim()).filter(Boolean)) {
    const [tag] = await supabase<{ id: string }[]>(`rest/v1/tags?on_conflict=slug`, { method: "POST", prefer: "resolution=merge-duplicates,return=representation", body: { name: tagName, slug: slugify(tagName) } });
    await supabase("rest/v1/article_tags", { method: "POST", body: { article_id: article.id, tag_id: tag.id } });
  }
  if (input.sourceName && input.sourceUrl) {
    const baseUrl = new URL(input.sourceUrl).origin;
    const [source] = await supabase<{ id: string }[]>(`rest/v1/sources?on_conflict=name`, { method: "POST", prefer: "resolution=merge-duplicates,return=representation", body: { name: input.sourceName, base_url: baseUrl } });
    await supabase("rest/v1/article_sources", { method: "POST", body: { article_id: article.id, source_id: source.id, original_url: input.sourceUrl, credit_text: `Fonte: ${input.sourceName}` } });
  }
  await supabase(`rest/v1/article_seo?on_conflict=article_id`, { method: "POST", prefer: "resolution=merge-duplicates", body: {
    article_id: article.id, meta_title: input.metaTitle || null, meta_description: input.metaDescription || null,
    canonical_url: input.canonicalUrl || null, robots_index: input.robotsIndex, robots_follow: input.robotsFollow,
    og_title: input.ogTitle || null, og_description: input.ogDescription || null,
  } });
  await supabase("rest/v1/article_versions", { method: "POST", body: { article_id: article.id, body: JSON.parse(input.bodyJson), title: input.title, note: `Status: ${input.status}` } });
  return { id: article.id, slug: cleanSlug };
}
