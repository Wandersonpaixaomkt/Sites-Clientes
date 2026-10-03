import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;

  return {
    title: "Orkut Revival — amizades, scraps e comunidades",
    description: "Uma reconstrução nostálgica e moderna da experiência final do Orkut.",
    openGraph: { title: "Orkut Revival", description: "amizades, scraps e comunidades", images: [image] },
    twitter: { card: "summary_large_image", title: "Orkut Revival", description: "amizades, scraps e comunidades", images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
