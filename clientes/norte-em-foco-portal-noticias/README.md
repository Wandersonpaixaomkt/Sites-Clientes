# Norte em Foco — Portal de Notícias

Portal editorial com visual inspirado em canal de vídeo para organizar notícias de Carajás e do Pará por cidade e tema.

## Conteúdo editorial

- 65 notícias selecionadas em 15 de agosto de 2026.
- Cinco matérias de cada um dos 13 portais monitorados.
- Filtros por cidade e assunto, além de busca textual.
- Leitura da notícia dentro do Norte em Foco.
- Créditos e link opcional para a publicação original apenas no rodapé da notícia aberta.

O endereço do EldoNews fornecido corresponde a Eldorado, Mato Grosso do Sul, e não a Eldorado dos Carajás. A Agência Pará estava suspensa por legislação eleitoral durante a curadoria. As notícias abertas dessas duas fontes apresentam esses avisos.

Arquivos principais: `app/news-data.ts`, `app/news-channel.tsx`, `app/globals.css`, `app/channel.css` e `tests/rendered-html.test.mjs`.

## CMS editorial

O painel em `/admin` permite criar e atualizar matérias sem depender do chat:

- editor rico, categorias, tags, status e autores;
- créditos e link da fonte original no rodapé;
- SEO por notícia: meta tags, canonical, Open Graph, robots, Schema.org e UTM;
- upload de imagens com conversão WebP e armazenamento R2;
- banco Cloudflare D1 com migrações Drizzle.

Antes de publicar o site para visitantes, configure `CMS_ADMIN_EMAILS` no ambiente de hospedagem para limitar o acesso ao painel.

## Base técnica

Aplicação full-stack em [vinext](https://github.com/cloudflare/vinext), Cloudflare D1, R2 e Drizzle.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: validar o portal e os créditos editoriais
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
