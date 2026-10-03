import { Dashboard } from "./cms-ui";
import { requireCmsAdmin } from "@/app/cms-auth";
import { getCmsOverview } from "@/app/cms";

export const dynamic = "force-dynamic";
export default async function AdminPage() {
  await requireCmsAdmin("/admin");
  return <Dashboard overview={await getCmsOverview()} />;
}
