import { NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { requireCmsAdmin } from "@/app/cms-auth";
import { hasSupabase, supabase } from "@/app/supabase";

export const runtime = "edge";

export async function POST(request: Request) {
  const user = await requireCmsAdmin("/admin");
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Envie uma imagem válida." }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "A imagem deve ter no máximo 10 MB." }, { status: 400 });
  }
  const transformed = await env.IMAGES.input(file.stream()).transform({ width: 1920 }).output({ format: "webp", quality: 82 });
  const key = `uploads/${crypto.randomUUID()}.webp`;
  if (hasSupabase()) {
    const image = transformed.response();
    const uploaded = await fetch(`${env.SUPABASE_URL}/storage/v1/object/news-media/${key}`, {
      method: "POST",
      headers: { apikey: env.SUPABASE_SECRET_KEY, Authorization: `Bearer ${env.SUPABASE_SECRET_KEY}`, "Content-Type": "image/webp", "x-upsert": "false" },
      body: image.body,
    });
    if (!uploaded.ok) return NextResponse.json({ error: "Não foi possível enviar a imagem ao Supabase." }, { status: 502 });
    const url = `${env.SUPABASE_URL}/storage/v1/object/public/news-media/${key}`;
    const [media] = await supabase<{ id: string }[]>("rest/v1/media", { method: "POST", prefer: "return=representation", body: { storage_path: key, public_url: url, alt: String(form.get("alt") || ""), mime_type: "image/webp", bytes: file.size } });
    return NextResponse.json({ id: media.id, url, alt: String(form.get("alt") || "") }, { status: 201 });
  }
  await env.MEDIA.put(key, transformed.response().body, { httpMetadata: { contentType: "image/webp" } });
  const timestamp = Date.now();
  const mediaId = `media-${crypto.randomUUID()}`;
  await env.DB.prepare("INSERT INTO media (id,storage_key,url,alt,mime_type,width,height,bytes,created_by_user_id,created_at,updated_at) VALUES (?, ?, ?, ?, 'image/webp', NULL, NULL, ?, ?, ?, ?)")
    .bind(mediaId, key, `/media/${key}`, String(form.get("alt") || ""), file.size, user.userId, timestamp, timestamp).run();
  return NextResponse.json({ id: mediaId, url: `/media/${key}`, alt: String(form.get("alt") || "") }, { status: 201 });
}
