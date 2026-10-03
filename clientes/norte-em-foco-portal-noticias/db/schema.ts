import { index, integer, primaryKey, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

const auditColumns = {
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
};

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role", { enum: ["admin", "editor", "author", "viewer"] }).notNull().default("author"),
  avatarUrl: text("avatar_url"),
  ...auditColumns,
});

export const authors = sqliteTable("authors", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  bio: text("bio"),
  avatarMediaId: text("avatar_media_id"),
  ...auditColumns,
});

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  color: text("color").notNull().default("#e11d48"),
  ...auditColumns,
});

export const tags = sqliteTable("tags", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  ...auditColumns,
});

export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  storageKey: text("storage_key").notNull().unique(),
  url: text("url").notNull(),
  alt: text("alt").notNull().default(""),
  mimeType: text("mime_type").notNull(),
  width: integer("width"),
  height: integer("height"),
  bytes: integer("bytes"),
  createdByUserId: text("created_by_user_id").references(() => users.id, { onDelete: "set null" }),
  ...auditColumns,
});

export const articles = sqliteTable("articles", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  bodyJson: text("body_json").notNull().default('{"type":"doc","content":[]}'),
  status: text("status", { enum: ["draft", "review", "published", "scheduled", "archived"] }).notNull().default("draft"),
  categoryId: text("category_id").references(() => categories.id, { onDelete: "set null" }),
  authorId: text("author_id").references(() => authors.id, { onDelete: "set null" }),
  featuredMediaId: text("featured_media_id").references(() => media.id, { onDelete: "set null" }),
  publishedAt: integer("published_at", { mode: "timestamp_ms" }),
  scheduledAt: integer("scheduled_at", { mode: "timestamp_ms" }),
  createdByUserId: text("created_by_user_id").references(() => users.id, { onDelete: "set null" }),
  ...auditColumns,
}, (table) => [
  index("articles_status_published_idx").on(table.status, table.publishedAt),
  index("articles_category_published_idx").on(table.categoryId, table.publishedAt),
]);

export const articleTags = sqliteTable("article_tags", {
  articleId: text("article_id").notNull().references(() => articles.id, { onDelete: "cascade" }),
  tagId: text("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
}, (table) => [primaryKey({ columns: [table.articleId, table.tagId] })]);

export const sources = sqliteTable("sources", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  baseUrl: text("base_url").notNull(),
  ...auditColumns,
});

export const articleSources = sqliteTable("article_sources", {
  id: text("id").primaryKey(),
  articleId: text("article_id").notNull().references(() => articles.id, { onDelete: "cascade" }),
  sourceId: text("source_id").notNull().references(() => sources.id, { onDelete: "restrict" }),
  originalUrl: text("original_url").notNull(),
  creditText: text("credit_text").notNull(),
  ...auditColumns,
}, (table) => [
  uniqueIndex("article_sources_original_url_idx").on(table.originalUrl),
  index("article_sources_article_idx").on(table.articleId),
]);

export const articleSeo = sqliteTable("article_seo", {
  articleId: text("article_id").primaryKey().references(() => articles.id, { onDelete: "cascade" }),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  canonicalUrl: text("canonical_url"),
  robotsIndex: integer("robots_index", { mode: "boolean" }).notNull().default(true),
  robotsFollow: integer("robots_follow", { mode: "boolean" }).notNull().default(true),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImageMediaId: text("og_image_media_id").references(() => media.id, { onDelete: "set null" }),
  twitterCard: text("twitter_card").notNull().default("summary_large_image"),
  ...auditColumns,
});

export const articleVersions = sqliteTable("article_versions", {
  id: text("id").primaryKey(),
  articleId: text("article_id").notNull().references(() => articles.id, { onDelete: "cascade" }),
  bodyJson: text("body_json").notNull(),
  title: text("title").notNull(),
  note: text("note"),
  createdByUserId: text("created_by_user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const adSlots = sqliteTable("ad_slots", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  placement: text("placement", { enum: ["header", "sidebar", "in_article", "footer"] }).notNull(),
  width: integer("width"),
  height: integer("height"),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  fallbackScript: text("fallback_script"),
  ...auditColumns,
});

export const advertisers = sqliteTable("advertisers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  contactEmail: text("contact_email"),
  ...auditColumns,
});

export const adCampaigns = sqliteTable("ad_campaigns", {
  id: text("id").primaryKey(),
  advertiserId: text("advertiser_id").references(() => advertisers.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  startsAt: integer("starts_at", { mode: "timestamp_ms" }).notNull(),
  endsAt: integer("ends_at", { mode: "timestamp_ms" }).notNull(),
  status: text("status", { enum: ["draft", "active", "paused", "completed"] }).notNull().default("draft"),
  ...auditColumns,
});

export const adCreatives = sqliteTable("ad_creatives", {
  id: text("id").primaryKey(),
  campaignId: text("campaign_id").notNull().references(() => adCampaigns.id, { onDelete: "cascade" }),
  slotId: text("slot_id").notNull().references(() => adSlots.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  imageMediaId: text("image_media_id").references(() => media.id, { onDelete: "set null" }),
  destinationUrl: text("destination_url"),
  htmlScript: text("html_script"),
  impressions: integer("impressions").notNull().default(0),
  clicks: integer("clicks").notNull().default(0),
  ...auditColumns,
});

export const auditLogs = sqliteTable("audit_logs", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  action: text("action").notNull(),
  metadataJson: text("metadata_json"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});
