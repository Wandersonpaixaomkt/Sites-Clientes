import { ArticleEditor } from "../../cms-ui";
import { requireCmsAdmin } from "@/app/cms-auth";
import { getEditorOptions } from "@/app/cms";
export const dynamic = "force-dynamic";
export default async function NewArticlePage() { await requireCmsAdmin("/admin/articles/new"); return <ArticleEditor article={null} options={await getEditorOptions()} />; }
