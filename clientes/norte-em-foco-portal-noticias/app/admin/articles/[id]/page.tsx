import { notFound } from "next/navigation";
import { ArticleEditor } from "../../cms-ui";
import { requireCmsAdmin } from "@/app/cms-auth";
import { getArticleForEditor, getEditorOptions } from "@/app/cms";
export const dynamic = "force-dynamic";
export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) { await requireCmsAdmin("/admin"); const { id } = await params; const article = await getArticleForEditor(id); if (!article) notFound(); return <ArticleEditor article={article} options={await getEditorOptions()} />; }
