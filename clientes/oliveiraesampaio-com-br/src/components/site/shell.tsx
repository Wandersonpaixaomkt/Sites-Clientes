import type { ReactNode } from "react";
import { SiteHeader } from "./header";
import { SiteFooter } from "./footer";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
