import { env } from "cloudflare:workers";

type SupabaseOptions = { method?: "GET" | "POST" | "PATCH" | "DELETE"; body?: unknown; prefer?: string };

export function hasSupabase() {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_SECRET_KEY);
}

export async function supabase<T>(path: string, options: SupabaseOptions = {}): Promise<T> {
  if (!hasSupabase()) throw new Error("Supabase não está configurado.");
  const response = await fetch(`${env.SUPABASE_URL}/${path.replace(/^\//, "")}`, {
    method: options.method || "GET",
    headers: {
      apikey: env.SUPABASE_SECRET_KEY,
      Authorization: `Bearer ${env.SUPABASE_SECRET_KEY}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.prefer ? { Prefer: options.prefer } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!response.ok) throw new Error(`Supabase: ${response.status} ${await response.text()}`);
  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}
