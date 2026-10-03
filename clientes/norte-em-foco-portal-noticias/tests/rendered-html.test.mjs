import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

const expectedSources = [
  "Zé Dudu",
  "Pebinha de Açúcar",
  "Portal Canaã",
  "Portal Parauapebas",
  "Correio de Carajás",
  "Portal Debate",
  "Gazeta Carajás",
  "Info30",
  "EldoNews",
  "O Liberal",
  "Diário do Pará",
  "Agência Pará",
  "G1 Pará",
];

test("mantém 65 notícias e cinco itens por portal", async () => {
  const data = await readFile(new URL("app/news-data.ts", projectRoot), "utf8");
  const storyIds = [...data.matchAll(/^\s+id:\s+\d+,/gm)];
  const sourceUrls = [...data.matchAll(/^\s+sourceUrl:\s+"https:\/\//gm)];

  assert.equal(storyIds.length, 65);
  assert.equal(sourceUrls.length, 65);

  for (const source of expectedSources) {
    const occurrences = data.split(`source: "${source}"`).length - 1;
    assert.equal(occurrences, 5, `${source} deve ter cinco notícias`);
  }
});

test("abre a notícia internamente e deixa os créditos no rodapé", async () => {
  const portal = await readFile(new URL("app/news-channel.tsx", projectRoot), "utf8");
  const layout = await readFile(new URL("app/layout.tsx", projectRoot), "utf8");

  assert.match(portal, /setSelectedStory\(story\)/);
  assert.match(portal, /Fonte: \{selectedStory\.source\}/);
  assert.match(portal, /Acessar publicação original/);
  assert.match(portal, /target="_blank"/);
  assert.match(portal, /rel="noopener noreferrer"/);
  assert.match(portal, /portalStories\.filter/);
  assert.doesNotMatch(portal, /stories\.slice/);
  assert.match(layout, /Norte em Foco \| Portal de Notícias/);
});

test("sinaliza as exceções editoriais das fontes", async () => {
  const data = await readFile(new URL("app/news-data.ts", projectRoot), "utf8");

  assert.match(data, /Eldorado, Mato Grosso do Sul — fora da região de Carajás/);
  assert.match(data, /Agência Pará está temporariamente suspenso em respeito à legislação eleitoral/);
});
