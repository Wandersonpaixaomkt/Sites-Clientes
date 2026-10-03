import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { firm, nav } from "@/data/firm";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="site-wrap flex min-h-20 items-center justify-between gap-4">
        <Link to="/" className="shrink-0" aria-label={firm.name}>
          <img src="/firm/logo.png" alt={firm.name} className="h-12 w-auto" width={168} height={48} />
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "text-xs font-semibold uppercase tracking-widest text-ink transition-colors duration-150 hover:text-brand",
                pathname === item.to && "text-brand",
              )}
            >
              {item.label}
            </Link>
          ))}
          <a href={firm.phones.whatsapp.message} className="btn-primary">
            Fale conosco
          </a>
        </nav>
        <button
          type="button"
          className="btn-ghost lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">Menu</span>
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-line bg-paper px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center text-sm font-semibold uppercase tracking-widest"
              >
                {item.label}
              </Link>
            ))}
            <a href={firm.phones.whatsapp.message} className="btn-primary mt-2">
              WhatsApp
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
