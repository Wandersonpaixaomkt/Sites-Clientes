import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteShell } from "@/components/site/shell";
import { firm } from "@/data/firm";

export const Route = createFileRoute("/contato")({ component: Contato });

function Contato() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") || "").trim();
    const tel = String(data.get("telefone") || "").trim();
    const msg = String(data.get("mensagem") || "").trim();
    const text = encodeURIComponent(
      `Olá, sou ${nome}. Telefone: ${tel}. ${msg}`,
    );
    window.open(`https://wa.me/5594991365950?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <SiteShell>
      <main>
        <header className="bg-ink py-16 text-paper">
          <div className="site-wrap">
            <p className="kicker mb-3">// Contato</p>
            <h1 className="display text-5xl">Entre em contato</h1>
          </div>
        </header>
        <section className="site-wrap grid gap-10 py-16 lg:grid-cols-2">
          <div>
            <h2 className="display mb-4 text-3xl">{firm.address}</h2>
            <p className="mb-6 text-muted">
              {firm.city} · CEP {firm.cep}
            </p>
            <ul className="space-y-2 text-ink">
              <li>
                Tel. <a href={firm.phones.landline.href}>{firm.phones.landline.display}</a>
              </li>
              <li>
                Cel. <a href={firm.phones.mobile.href}>{firm.phones.mobile.display}</a>
              </li>
              <li>
                WhatsApp <a href={firm.phones.whatsapp.href}>{firm.phones.whatsapp.display}</a>
              </li>
              <li>
                <a href={`mailto:${firm.email}`}>{firm.email}</a>
              </li>
            </ul>
            <iframe
              title="Mapa da sede em Parauapebas"
              className="mt-8 h-64 w-full border-0 grayscale"
              src="https://maps.google.com/maps?q=Rua%20D%2C%20286%2C%20Cidade%20Nova%2C%20Parauapebas%20PA&z=16&output=embed"
              loading="lazy"
            />
          </div>
          <form onSubmit={onSubmit} className="bg-mist p-8">
            <p className="mb-6 text-sm text-muted">
              A mensagem abre o WhatsApp do escritório com os seus dados. Nada é armazenado neste site.
            </p>
            <label className="mb-4 block text-xs font-bold uppercase tracking-widest">
              Nome
              <input
                required
                name="nome"
                className="mt-2 min-h-11 w-full border border-line bg-paper px-3 text-sm"
              />
            </label>
            <label className="mb-4 block text-xs font-bold uppercase tracking-widest">
              Telefone
              <input
                required
                name="telefone"
                className="mt-2 min-h-11 w-full border border-line bg-paper px-3 text-sm"
              />
            </label>
            <label className="mb-6 block text-xs font-bold uppercase tracking-widest">
              Mensagem
              <textarea
                required
                name="mensagem"
                rows={5}
                className="mt-2 w-full border border-line bg-paper px-3 py-2 text-sm"
              />
            </label>
            <button type="submit" className="btn-primary">
              Enviar pelo WhatsApp
            </button>
            {sent ? (
              <p className="mt-3 text-sm text-muted">Se o WhatsApp não abriu, use o número {firm.phones.whatsapp.display}.</p>
            ) : null}
          </form>
        </section>
      </main>
    </SiteShell>
  );
}
