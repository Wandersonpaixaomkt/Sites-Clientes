# Cilmara Bonfim

Repertório da candidatura de **Cilmara Teixeira Bonfim Leal** (Cilmara Bonfim) para 2026 — Parauapebas / Pará.

Esta pasta reúne o núcleo estruturado original do repositório e a **Base de Dados** operacional da campanha (documentos, dossiê da landing page e site).

> Material de trabalho da equipe. O repositório deve permanecer **privado**.

## Como começar

Quem for criar qualquer peça deve ler, nesta ordem:

1. [`base-de-dados/01_RESUMO_EXECUTIVO.md`](base-de-dados/01_RESUMO_EXECUTIVO.md)
2. [`base-de-dados/10_TESE_ESTRATEGICA_DE_COMUNICACAO_2026.md`](base-de-dados/10_TESE_ESTRATEGICA_DE_COMUNICACAO_2026.md)
3. [`dados/identidade.yaml`](dados/identidade.yaml)

## Estrutura

```
cilmara-bonfim/
├── README.md                 ← este índice
├── dados/                    ← dados estruturados (YAML)
├── propostas/                ← agenda programática resumida
├── materiais/                ← briefing de 18 tópicos
├── fontes/                   ← fontes e pendências de validação
├── base-de-dados/            ← 11 documentos de referência + pesquisa
├── dados-para-site/          ← dossiê, copy e lacunas da landing page
└── site/                     ← landing page (HTML/CSS/JS + assets)
```

### `base-de-dados/` — documentos de referência

| # | Arquivo | Conteúdo |
| --- | --- | --- |
| 01 | [`01_RESUMO_EXECUTIVO.md`](base-de-dados/01_RESUMO_EXECUTIVO.md) | Síntese, tese e cuidados antes de publicar |
| 02 | [`02_QUEM_E_CILMARA_BONFIM.md`](base-de-dados/02_QUEM_E_CILMARA_BONFIM.md) | Identidade pública e atributos |
| 03 | [`03_HISTORIA_PESSOAL_E_TRAJETORIA_DE_SUPERACAO.md`](base-de-dados/03_HISTORIA_PESSOAL_E_TRAJETORIA_DE_SUPERACAO.md) | Trajetória pessoal |
| 04 | [`04_HISTORICO_POLITICO_E_ELEITORAL.md`](base-de-dados/04_HISTORICO_POLITICO_E_ELEITORAL.md) | Candidaturas 2020–2026 |
| 05 | [`05_ATUACAO_INSTITUCIONAL_NA_COMPED.md`](base-de-dados/05_ATUACAO_INSTITUCIONAL_NA_COMPED.md) | Atuação na COMPED |
| 06 | [`06_CAUSAS_CENTRAIS.md`](base-de-dados/06_CAUSAS_CENTRAIS.md) | Causas e eixos de inclusão |
| 07 | [`07_IMAGEM_PUBLICA_E_REDES_SOCIAIS.md`](base-de-dados/07_IMAGEM_PUBLICA_E_REDES_SOCIAIS.md) | Imagem pública e redes |
| 08 | [`08_MATERIAIS_DE_CAMPANHA_E_EVOLUCAO_VISUAL.md`](base-de-dados/08_MATERIAIS_DE_CAMPANHA_E_EVOLUCAO_VISUAL.md) | Identidade visual e peças |
| 09 | [`09_FORCAS_FRAGILIDADES_OPORTUNIDADES_E_RISCOS.md`](base-de-dados/09_FORCAS_FRAGILIDADES_OPORTUNIDADES_E_RISCOS.md) | Forças, fragilidades, oportunidades e riscos |
| 10 | [`10_TESE_ESTRATEGICA_DE_COMUNICACAO_2026.md`](base-de-dados/10_TESE_ESTRATEGICA_DE_COMUNICACAO_2026.md) | Tese de comunicação 2026 |
| 11 | [`11_PLATAFORMA_PROGRAMATICA_2026.md`](base-de-dados/11_PLATAFORMA_PROGRAMATICA_2026.md) | Plataforma programática 2026 |
| — | [`Pesquisa Sobre Cilmara Bonfim.md`](base-de-dados/Pesquisa%20Sobre%20Cilmara%20Bonfim.md) | Pesquisa consolidada de fontes |

### `dados-para-site/` — pacote da landing page

- [`01_DOSSIE_LP/DOSSIE_LP_CILMARA_BONFIM.md`](dados-para-site/01_DOSSIE_LP/DOSSIE_LP_CILMARA_BONFIM.md) — dossiê principal (24 capítulos)
- [`02_DADOS_BRUTOS/DADOS_BRUTOS.md`](dados-para-site/02_DADOS_BRUTOS/DADOS_BRUTOS.md) — entidades, histórico, COMPED, propostas, citações
- [`03_COPY_POR_ANCORA/COPY_POR_ANCORA.md`](dados-para-site/03_COPY_POR_ANCORA/COPY_POR_ANCORA.md) — textos finais por âncora
- [`04_LACUNAS_E_RISCOS/LACUNAS_E_RISCOS.md`](dados-para-site/04_LACUNAS_E_RISCOS/LACUNAS_E_RISCOS.md) — roteiro de entrevista e checklist de publicação

Índice: [`dados-para-site/README.md`](dados-para-site/README.md)

### `site/` — landing page

- [`site/index.html`](site/index.html)
- [`site/assets/css/styles.css`](site/assets/css/styles.css)
- [`site/assets/js/main.js`](site/assets/js/main.js)
- `site/assets/images/` — logo, número 70700, banner e ativo visual
- Guia: [`site/assets/docs/README-SITE.md`](site/assets/docs/README-SITE.md)

Para abrir localmente: sirva a pasta `site/` com `python3 -m http.server 8123`.

### Núcleo estruturado (YAML e sínteses)

1. [`dados/identidade.yaml`](dados/identidade.yaml)
2. [`dados/historico-eleitoral.yaml`](dados/historico-eleitoral.yaml)
3. [`dados/atuacao-e-causas.yaml`](dados/atuacao-e-causas.yaml)
4. [`propostas/agenda-programatica-2026.md`](propostas/agenda-programatica-2026.md)
5. [`materiais/briefing-18-topicos.md`](materiais/briefing-18-topicos.md)
6. [`fontes/fontes-e-pendencias.md`](fontes/fontes-e-pendencias.md)

## Uso dos documentos

- **Conteúdo validado:** frases, marcos e números daqui podem aparecer em materiais oficiais.
- **Conteúdo em revisão:** datas, nomes e números de votação devem ser checados com a coordenação antes de publicação.
- **Conteúdo sigiloso:** dados pessoais, jurídicos ou estratégicos ficam restritos à coordenação.

PDFs, apresentações e fotos originais que ainda apontam para `ARQUIVOS/` continuam no acervo do Google Drive da campanha. A pesquisa consolidada já está neste repositório.

## Pendências de publicação

Antes de qualquer peça pública, confirmar no TSE: situação da candidatura, partido, número, declaração de bens e dados eleitorais. Também validar com a equipe dados biográficos, nomes de associações e qualquer afirmação comparativa (ex.: “primeira deputada estadual surda do Brasil”).

Pedido de registro no TSE, na última extração da base (31/08/2026): *Aguardando Julgamento*.
