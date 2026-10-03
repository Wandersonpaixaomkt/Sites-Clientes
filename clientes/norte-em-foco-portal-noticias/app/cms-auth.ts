import { env } from "cloudflare:workers";
import { requireChatGPTUser } from "./chatgpt-auth";

export async function requireCmsAdmin(returnTo: string) {
  const user = await requireChatGPTUser(returnTo);
  const allowed = (env.CMS_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (allowed.length > 0 && !allowed.includes(user.email.toLowerCase())) {
    throw new Response("Sem permissão para administrar o portal.", { status: 403 });
  }
  return user;
}
