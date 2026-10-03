# Site Cilmara Bonfim — Movimento pela Inclusão

Esta pasta contém o site oficial do movimento da liderança Cilmara Bonfim em Parauapebas (PA).

## Status atual (01/09/2026)

O layout ainda usa **placeholders** para retrato, história, impacto, reels e avatares de apoio. Em `assets/images/` já estão os assets de marca da campanha:

- `70700.png`
- `Ativo 1.png`
- `BANNER SITE - POST INSTAGRAM.png`
- `LOGO 03.png`

## Estrutura

- `index.html` — Página principal (10 seções, com `.placeholder` no lugar das imagens).
- `assets/css/styles.css` — Folha de estilo completa, inclui `.placeholder`, `.placeholder--hero`, `.placeholder--story`, `.placeholder--impact`, `.placeholder--reel` e `.apoio-avatar`.
- `assets/js/main.js` — Interações: acessibilidade, vídeo, formulário, máscara WhatsApp, snackbar, nav drawer, reveal-on-scroll.
- `assets/images/` — logo, número 70700, banner e ativo visual. Retratos e fotos de ação ainda entram no lugar dos placeholders.
- `assets/docs/README-SITE.md` — Este guia.

## Como abrir

Abra `index.html` em qualquer navegador moderno ou sirva via `python3 -m http.server 8123`.

## Como restaurar as imagens (placeholders → fotos reais)

### 1. Salvar as imagens em `assets/images/`

Nomes sugeridos (substituem diretamente os placeholders):

| Placeholder                | Arquivo físico esperado                  |
| -------------------------- | ---------------------------------------- |
| `.placeholder--hero`       | `assets/images/hero-cilmara.png` (recorte vertical, fundo transparente se possível) |
| `.placeholder--story`      | `assets/images/story-familia.jpg` (família Bonfim) |
| `.placeholder--impact` (4) | `assets/images/impacto-{01..04}.jpg` (reuniões, rua, eventos) |
| `.placeholder--reel` (4)   | `assets/images/reel-{01..04}.jpg` (frames de reel) |
| `.apoio-avatar` (4)        | `assets/images/apoio-{01..04}.jpeg` (avatars circulares) |

### 2. Substituir cada `<div class="placeholder">` por `<img>`

Localizar no `index.html`:

```html
<div class="placeholder placeholder--hero" role="img" aria-label="...">
  <span class="placeholder-tag">Foto</span>
  <span class="placeholder-label">Retrato oficial</span>
</div>
```

Trocar por:

```html
<img src="assets/images/hero-cilmara.png"
     alt="Retrato oficial de Cilmara Bonfim"
     class="hero-photo__img" />
```

### 3. Reativar regras CSS das imagens

Em `assets/css/styles.css`, descomentar/restaurar as regras `img` que foram convertidas:

```css
.hero-photo img {
  position: absolute;
  bottom: 0;
  right: 0;
  width: min(100%, 540px);
  height: 100%;
  object-fit: contain;
  object-position: bottom center;
  filter: drop-shadow(0 24px 32px rgba(9, 47, 95, .28));
  z-index: 1;
}
.quem-e-media > img { /* mesmas regras do placeholder */ }
.impacto-card img,
.reel img { width:100%; height:100%; object-fit:cover; }
.apoio-card img { width:52px; height:52px; border-radius:50%; object-fit:cover; }
```

Para os apoios, substituir `.apoio-avatar` por `<img>` dentro de `<a class="apoio-card">`.

## Acessibilidade mantida

- Modo alto contraste, fonte ampliável via `#font-toggle`.
- Skip-link para o conteúdo.
- Pula para seções com `tabindex="-1"` após click.
- Selos VLibras / WCAG no rodapé.
- Cada placeholder tem `role="img"` + `aria-label` para leitores de tela.

## Próximos passos

1. Validar dados biográficos, datas e números no TSE antes de publicar.
2. Adicionar as imagens oficiais seguindo a tabela acima.
3. Subir os vídeos oficiais (substituir `VIDEO_FAMILIA_URL` em `assets/js/main.js`).
4. Configurar endpoint do formulário (substituir `FORM_ENDPOINT` em `assets/js/main.js`).
5. Conectar feed de Reels à API do Instagram com token no servidor.
