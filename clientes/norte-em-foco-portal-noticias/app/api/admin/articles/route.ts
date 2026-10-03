import { NextResponse } from "next/server";
import { requireCmsAdmin } from "@/app/cms-auth";
import { saveArticle, type SaveArticleInput } from "@/app/cms";

export const runtime = "edge";

export async function POST(request: Request) {
  const user = await requireCmsAdmin("/admin/articles/new");
  const input = await request.json() as SaveArticleInput;
  if (!input.title?.trim() || !input.excerpt?.trim()) {
    return NextResponse.json({ error: "Título e resumo são obrigatórios." }, { status: 400 });
  }
  if (input.sourceUrl) {
    try { new URL(input.sourceUrl); } catch {
      return NextResponse.json({ error: "O link da fonte original é inválido." }, { status: 400 });
    }
  }
  const article = await saveArticle(input, user);
  return NextResponse.json(article, { status: 201 });
}

export async function PATCH(request: Request) {
  const user = await requireCmsAdmin("/admin");
  const input = await request.json() as SaveArticleInput;
  if (!input.id || !input.title?.trim() || !input.excerpt?.trim()) {
    return NextResponse.json({ error: "Dados insuficientes para atualizar a notícia." }, { status: 400 });
  }
  const article = await saveArticle(input, user);
  return NextResponse.json(article);
}
