export default function SiteHeader() {
  return (
    <header className="site-header" aria-label="Navegação principal">
      <a className="brand" href="/" aria-label="AVEX Ads">
        <img src="/assets/brand/logo-inverted.png" alt="AVEX" />
      </a>
      <nav className="top-nav">
        <a href="/">Início</a>
        <a href="/servicos">Serviços</a>
        <a href="/#diagnostico">Diagnóstico</a>
      </nav>
    </header>
  );
}
