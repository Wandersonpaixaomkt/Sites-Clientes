import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the AVEX landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="pt-BR">/i);
  assert.match(html, /<title>AVEX Ads \| Demanda com previsibilidade<\/title>/i);
  assert.match(html, /Não dependa mais só de indicações/);
  assert.match(html, /com previsibilidade/);
  assert.match(html, /Reunião Agendada/);
  assert.match(html, /Lead Qualificado Recebido/);
  assert.match(html, /Diagnóstico gratuito/);
  assert.match(html, /Tudo que <strong>você tem acesso<\/strong> com a AVEX/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders the /servicos page", async () => {
  const response = await render("/servicos");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Serviços \| AVEX Ads<\/title>/i);
  assert.match(html, /Produção de Conteúdo/);
  assert.match(html, /Geração de Demanda/);
  assert.match(html, /Soluções para o seu Negócio/);
  assert.match(html, /Gestão de anúncios no Meta Ads/);
  assert.match(html, /Diagnóstico estratégico/);
});

test("uses AVEX assets and brand colors", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /AVEX Ads \| Demanda com previsibilidade/);
  assert.match(page, /\/assets\/brand\/logo-inverted\.png/);
  assert.match(page, /\/assets\/brand\/x-mark\.png/);
  assert.match(css, /--accent:\s*#f15e22/i);
  assert.match(css, /font-family:\s*"Sora"/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
