import { Link } from "@tanstack/react-router";
import { firm, nav } from "@/data/firm";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="site-wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src="/firm/logo.png"
            alt=""
            className="mb-4 h-11 w-auto bg-paper p-1.5"
            width={154}
            height={44}
          />
          <p className="max-w-xs text-sm text-paper/70">
            {firm.shortName}. Sede em {firm.city}, presença na {firm.region}. Desde {firm.foundedLabel}.
          </p>
        </div>
        <div>
          <p className="mb-3 font-display text-lg uppercase tracking-wide">Navegação</p>
          <ul className="space-y-2 text-sm text-paper/80">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/noticias" className="hover:text-paper">
                Notícias
              </Link>
            </li>
            <li>
              <Link to="/atualizacoes" className="hover:text-paper">
                Atualizações
              </Link>
            </li>
            <li>
              <a href={firm.clientArea} className="hover:text-paper">
                Área do cliente
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-display text-lg uppercase tracking-wide">Contato</p>
          <p className="text-sm text-paper/80">
            {firm.address}
            <br />
            {firm.city} · CEP {firm.cep}
            <br />
            <a href={firm.phones.landline.href}>{firm.phones.landline.display}</a>
            <br />
            <a href={firm.phones.whatsapp.href}>{firm.phones.whatsapp.display}</a>
            <br />
            <a href={`mailto:${firm.email}`}>{firm.email}</a>
          </p>
          <p className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-widest">
            <a href={firm.social.instagram}>Instagram</a>
            <a href={firm.social.facebook}>Facebook</a>
            <a href={firm.social.linkedin}>LinkedIn</a>
            <a href={firm.social.youtube}>YouTube</a>
          </p>
        </div>
        <div>
          <p className="mb-3 font-display text-lg uppercase tracking-wide">Como chegar</p>
          <iframe
            title="Mapa Oliveira e Sampaio Advocacia"
            src={firm.mapsEmbed}
            width={400}
            height={220}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="footer-map"
          />
          <a href={firm.mapsUrl} className="mt-2 inline-block text-xs uppercase tracking-widest text-paper/70 hover:text-paper">
            Abrir no Google Maps
          </a>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="site-wrap flex flex-col gap-2 py-5 text-xs text-paper/50 md:flex-row md:justify-between">
          <span>
            {firm.shortName} · em conformidade com a Lei nº 13.709/2018 (LGPD), conforme aviso do site
            institucional.
          </span>
          <a href={firm.privacy} className="hover:text-paper">
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
