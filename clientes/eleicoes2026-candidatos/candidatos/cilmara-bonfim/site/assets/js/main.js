/* ============================================================
   CILMARA BONFIM — Movimento pela Inclusão
   Interações principais v2
   · Menu mobile com drawer e auto-fechamento
   · Highlight de seção ativa no nav ao rolar
   · Reveal-on-scroll com IntersectionObserver
   · Máscara leve de WhatsApp enquanto digita
   · Validação inline + estado de loading no submit
   · Snackbar/toast para feedback
   · Header compacto após scroll
   · Ripple leve nos botões
   ============================================================ */

(function () {
  'use strict';

  /* ===== Helpers ===== */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     1. MASCARA DE TELEFONE (94) 99999-9999
     ============================================================ */
  function maskPhone(input) {
    if (!input) return;
    input.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      if (v.length > 10) v = v.slice(0, 10) + '-' + v.slice(10);
      else if (v.length > 9) v = v.slice(0, 9) + '-' + v.slice(9);
      e.target.value = v;
    });
  }

  /* ============================================================
     2. ACESSIBILIDADE — fonte ampliável
     ============================================================ */
  const toggleFont = $('#font-toggle');
  if (toggleFont) {
    toggleFont.addEventListener('click', (e) => {
      document.body.classList.toggle('font-large');
      const active = document.body.classList.contains('font-large');
      e.currentTarget.setAttribute('aria-pressed', String(active));
      e.currentTarget.textContent = active ? 'Fonte padrão' : 'Aumentar fonte';
    });
  }

  /* ============================================================
     3. HEADER — sombra ao rolar + nav drawer mobile
     ============================================================ */
  const header = $('#site-header');
  const navToggle = $('#nav-toggle');
  const navLinks = $('#nav-links');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    document.body.classList.remove('menu-open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu');
    }
  }
  function openMenu() {
    document.body.classList.add('menu-open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Fechar menu');
    }
  }
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = document.body.classList.contains('menu-open');
      if (open) closeMenu(); else openMenu();
    });
  }
  // Fecha o drawer ao clicar em qualquer link
  $$('[data-nav-link]').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 880px)').matches) closeMenu();
    });
  });
  // Esc fecha o menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ============================================================
     4. SCROLL SUAVE + FOCO NA SEÇÃO
     ============================================================ */
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ============================================================
     5. ACTIVE NAV LINK (highlight da seção atual)
     ============================================================ */
  if ('IntersectionObserver' in window) {
    const sections = $$('main section[id]');
    const links = $$('[data-nav-link]');
    const map = new Map(links.map(l => [l.getAttribute('href').slice(1), l]));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('is-active'));
          const link = map.get(entry.target.id);
          if (link) link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => observer.observe(s));
  }

  /* ============================================================
     6. REVEAL ON SCROLL
     ============================================================ */
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealItems = $$('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealItems.forEach(el => revealObs.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  /* ============================================================
     7. VÍDEO DA HISTÓRIA
     ============================================================ */
  const VIDEO_FAMILIA_URL = '';
  const VIDEO_FAMILIA_LEGENDA = 'Vídeo da família — depoimentos de Rodrigo, Eduardo e dona Irene';
  $$('[data-video]').forEach((button) => {
    button.addEventListener('click', () => {
      if (VIDEO_FAMILIA_URL) {
        window.open(VIDEO_FAMILIA_URL, '_blank', 'noopener,noreferrer');
      } else {
        showSnackbar(VIDEO_FAMILIA_LEGENDA + ' — em breve', 'default');
      }
    });
  });

  /* ============================================================
     8. SNACKBAR GLOBAL
     ============================================================ */
  const snackbar = $('#snackbar');
  let snackbarTimer = null;
  function showSnackbar(message, variant = 'default') {
    if (!snackbar) return;
    snackbar.textContent = message;
    snackbar.className = 'snackbar is-visible';
    if (variant === 'success') snackbar.classList.add('snackbar--success');
    else if (variant === 'error') snackbar.classList.add('snackbar--error');
    clearTimeout(snackbarTimer);
    snackbarTimer = setTimeout(() => {
      snackbar.classList.remove('is-visible');
    }, 4200);
  }

  /* ============================================================
     9. FORMULÁRIO — validação, loading, submit
     ============================================================ */
  const form = $('#movement-form');
  const status = $('#form-status');
  const submit = $('#form-submit');
  const FORM_ENDPOINT = '';
  const WHATSAPP_GROUP = 'https://wa.me/message/';

  function setFieldError(field, hasError) {
    if (!field) return;
    field.classList.toggle('field--invalid', hasError);
    const input = field.querySelector('input, select, textarea');
    if (input) input.setAttribute('aria-invalid', String(hasError));
  }

  function showStatus(message, isError) {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-error', Boolean(isError));
    status.style.display = isError || message ? 'flex' : 'none';
  }

  // Validação inline ao sair do campo
  $$('.junte-se-form .field input, .junte-se-form .field select').forEach((field) => {
    field.addEventListener('blur', () => {
      const wrapper = field.closest('.field');
      setFieldError(wrapper, !field.checkValidity());
    });
    field.addEventListener('input', () => {
      if (field.closest('.field').classList.contains('field--invalid') && field.checkValidity()) {
        setFieldError(field.closest('.field'), false);
      }
    });
  });

  if (form && submit) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Validação geral
      let firstInvalid = null;
      $$('.field input, .field select', form).forEach((input) => {
        const wrapper = input.closest('.field');
        const ok = input.checkValidity();
        setFieldError(wrapper, !ok);
        if (!ok && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        showStatus('Confira os campos destacados antes de continuar.', true);
        firstInvalid.focus();
        return;
      }

      const dados = Object.fromEntries(new FormData(form).entries());
      submit.classList.add('is-loading');
      submit.setAttribute('aria-disabled', 'true');
      showStatus('Enviando seu cadastro...', false);

      try {
        if (FORM_ENDPOINT) {
          const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
          });
          if (!response.ok) throw new Error('Resposta inválida');
        } else {
          // Simulação para ambiente sem backend
          await new Promise(r => setTimeout(r, 700));
        }

        showStatus('Cadastro recebido com sucesso. Vamos abrir o grupo no WhatsApp.', false);
        showSnackbar('Bem-vinda(o) ao movimento!', 'success');
        form.reset();
        $$('.field', form).forEach(f => setFieldError(f, false));

        if (WHATSAPP_GROUP) {
          setTimeout(() => window.open(WHATSAPP_GROUP, '_blank', 'noopener,noreferrer'), 700);
        }
      } catch (error) {
        showStatus('Não conseguimos enviar agora. Tente novamente em alguns minutos.', true);
        showSnackbar('Erro ao enviar. Tente novamente.', 'error');
      } finally {
        submit.classList.remove('is-loading');
        submit.removeAttribute('aria-disabled');
      }
    });
  }

  // Máscara do telefone
  maskPhone($('#phone'));

  /* ============================================================
     10. RIPPLE LEVE NOS BOTÕES (origem do mouse)
     ============================================================ */
  if (!prefersReducedMotion) {
    $$('.button').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty('--x', (e.clientX - rect.left) + 'px');
        btn.style.setProperty('--y', (e.clientY - rect.top) + 'px');
      });
    });
  }

  /* ============================================================
     11. REEL PLAY → snackbar com placeholder
     ============================================================ */
  $$('.reel-play').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const label = btn.getAttribute('aria-label') || 'Reel';
      showSnackbar(label + ' — conectaremos à API do Instagram em breve', 'default');
    });
  });
  // Clicar no reel abre a mesma snackbar
  $$('.reel').forEach((reel) => {
    reel.addEventListener('click', () => {
      const label = reel.querySelector('.reel-play')?.getAttribute('aria-label') || 'Reel';
      showSnackbar(label + ' — em breve', 'default');
    });
  });

  /* ============================================================
     12. ANO AUTOMÁTICO
     ============================================================ */
  const ano = $('#ano-atual');
  if (ano) ano.textContent = String(new Date().getFullYear());

})();
