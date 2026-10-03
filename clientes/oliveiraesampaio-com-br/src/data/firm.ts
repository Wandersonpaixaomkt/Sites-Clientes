export const firm = {
  name: "Oliveira & Sampaio Advocacia",
  shortName: "Oliveira & Sampaio",
  kicker: "Bem-vindo ao escritório",
  founded: 2002,
  foundedLabel: "junho de 2002",
  years: new Date().getFullYear() - 2002,
  city: "Parauapebas/PA",
  region: "Região de Carajás",
  address: "Rua D, 286, Cidade Nova",
  cep: "68515-000",
  phones: {
    landline: { display: "(94) 3346-6446", href: "tel:+559433466446" },
    mobile: { display: "(94) 9 9184-1310", href: "tel:+5594991841310" },
    whatsapp: {
      display: "(94) 9 9136-5950",
      href: "https://wa.me/5594991365950",
      message:
        "https://wa.me/5594991365950?text=Olá,%20gostaria%20de%20falar%20com%20o%20escritório%20Oliveira%20e%20Sampaio.",
    },
  },
  email: "advocacia@oliveiraesampaio.com.br",
  clientArea: "https://lw.alkasoft.com.br/oliveiraesampaio/lawyervirtual/",
  webmail: "http://webmail.oliveiraesampaio.com.br/",
  privacy: "https://oliveiraesampaio.com.br/politicas-de-privacidade",
  youtube: "https://www.youtube.com/@OliveiraeSampaioADV/videos",
  social: {
    instagram: "https://www.instagram.com/oliveiraesampaio",
    facebook: "https://www.facebook.com/oliveiraesampaio/",
    linkedin: "https://www.linkedin.com/company/oliveiraesampaio/",
    youtube: "https://www.youtube.com/@OliveiraeSampaioADV/videos",
  },
  mission:
    "Defender direitos e prevenir conflitos. Atendimento personalizado, com ética, técnica e eficiência, buscando a melhor solução para cada causa.",
  vision:
    "Ser referência na prestação de serviços jurídicos e primeira escolha de clientes e parceiros.",
  values: [
    "Dedicação profissional",
    "Ética",
    "Transparência",
    "Espírito de equipe",
    "Lealdade",
    "Respeito",
  ],
  states: "Pará, Tocantins e Maranhão",
  mapsUrl: "https://maps.app.goo.gl/meF2kCX1sJdjixnr8",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1503.3057957301205!2d-49.9106386!3d-6.0646467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92dd5051ea60f8cf%3A0x49dd848ad0e53c96!2sOliveira%20e%20Sampaio%20Advocacia!5e1!3m2!1spt-BR!2sbr!4v1789537652937!5m2!1spt-BR!2sbr",
  rating: { value: "5,0", count: 5 },
} as const;

export const services = [
  {
    id: "trabalho",
    title: "Direito do Trabalho",
    summary:
      "Ações individuais e coletivas. Núcleos para trabalhadores, empresas e sindicatos — reclamantes ou reclamados.",
    body: "Ao longo de mais de 17 anos de atuação intensa em ações trabalhistas, o escritório tornou-se referência na região. Departamentos distintos atendem trabalhadores, empresas e sindicatos.",
    icon: "briefcase",
  },
  {
    id: "civil",
    title: "Direito Civil",
    summary:
      "Núcleo próprio para causas cíveis e comerciais, com advogados dedicados aos ramos do direito civil.",
    body: "O Oliveira e Sampaio mantém departamento específico para ações cíveis e comerciais, preparado para os mais variados ramos do direito civil.",
    icon: "scale",
  },
  {
    id: "consumidor",
    title: "Direito do Consumidor",
    summary:
      "Contratos de consumo, ações, defesas e recursos no Procon, Decon, Ministério Público, Juizados e Justiça Comum.",
    body: "Estruturação e revisão de contratos que envolvam relações de consumo, ajuizamento de ações e acompanhamento processual perante os órgãos competentes.",
    icon: "shield",
  },
  {
    id: "previdenciario",
    title: "Direito Previdenciário",
    summary:
      "Pedidos previdenciários e acidentários, orientação a segurados e acompanhamento junto aos institutos.",
    body: "Orientação e ações judiciais para segurados da previdência, pedidos previdenciários e acidentários, além de orientação sobre contribuições.",
    icon: "landmark",
  },
] as const;

export const team = [
  { name: "Rômulo Oliveira", role: "Sócio advogado", oab: "OAB/PA 10.801", photo: "/firm/romulo.jpg" },
  { name: "Cristiane Sampaio", role: "Sócia advogada", oab: "OAB/PA 11.499", photo: "/firm/cristiane.jpg" },
  { name: "Sofia Sampaio", role: "Advogada", oab: "OAB/PA 33.148", photo: "/firm/sofia.jpg" },
  { name: "Jocilvane Brito", role: "Advogada", oab: "OAB/PA 18.156", photo: "/firm/jocilvane.jpg" },
  { name: "Mariana Linhares", role: "Advogada", oab: "OAB/PA 19.833", photo: "/firm/mariana.jpg" },
  { name: "Gilvan Barata", role: "Advogado", oab: "OAB/PA 16.797", photo: "/firm/gilvan.jpg" },
  { name: "Ana Paula Nogueira", role: "Advogada", oab: "OAB/PA 30.587", photo: "/firm/ana-paula.jpg" },
  { name: "Fernanda Aguiar", role: "Advogada", oab: "OAB/PA 29.824", photo: "/firm/fernanda.jpg" },
  { name: "Vinícius Borges", role: "Advogado", oab: "OAB/MG 138.145", photo: "/firm/vinicius.jpg" },
  { name: "Rafael Leal", role: "Advogado", oab: "OAB/PA 32.969", photo: "/firm/rafael.jpg" },
] as const;

export const features = [
  { title: "Ética e transparência", text: "Valores publicados pelo próprio escritório e aplicados em cada causa." },
  { title: "Atendimento próximo", text: "Acompanhamento personalizado — não um protocolo genérico de grande banca." },
  { title: "Trabalho em profundidade", text: "Referência regional em ações individuais e coletivas, para ambos os polos." },
  { title: "Equipe com OAB", text: "Sócios e advogados listados publicamente, com inscrição à vista." },
  { title: "PA, TO e MA", text: "Atuação direta nos três estados; demais unidades da federação via correspondentes." },
  { title: "Área do cliente", text: "Andamento e documentos digitais para quem já tem processo em curso." },
] as const;

export const gallery = team.map((person) => ({
  src: person.photo,
  alt: `${person.name} · ${person.role}`,
}));

export const reviews = [
  {
    author: "Gleice Kelly",
    date: "há 4 anos",
    text: "Profissionais extremamente competentes, éticos e atenciosos, super indico, principalmente a doutora Sofia Sampaio",
  },
  {
    author: "Claudemir Batista",
    date: "há 4 anos",
    text: "Excelente atendimento e um profissionalismo ímpar. Recomendo.",
  },
  {
    author: "Moises Moraes",
    date: "há 5 anos",
    text: "Ótimo atendimento",
  },
] as const;

export const nav = [
  { to: "/", label: "Home", hash: undefined },
  { to: "/sobre", label: "Sobre nós", hash: undefined },
  { to: "/areas", label: "Áreas de atuação", hash: undefined },
  { to: "/advogados", label: "Advogados", hash: undefined },
  { to: "/galeria", label: "Galeria", hash: undefined },
  { to: "/contato", label: "Contato", hash: undefined },
] as const;
