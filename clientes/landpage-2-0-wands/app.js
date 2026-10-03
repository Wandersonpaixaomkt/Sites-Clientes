const WA = "5594991960570";
const HERO_MSG =
  "Olá Wanderson, vi a página da AVEX Ads. Quero uma análise da captação de pacientes da clínica.";
const HIRE_MSG =
  "Olá Wanderson, vi a simulação de atendimento e quero contratar o sistema de demanda para a clínica.";

function waUrl(message) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(message)}`;
}

["wa-hero", "wa-sobre", "wa-footer", "wa-float"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.href = waUrl(id === "wa-hire" ? HIRE_MSG : HERO_MSG);
});

function maskPhone(value) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const phone = document.getElementById("whatsapp");
if (phone) {
  phone.addEventListener("input", () => {
    phone.value = maskPhone(phone.value);
  });
}

document.querySelectorAll(".faq-item button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const open = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("open"));
    if (!open) item.classList.add("open");
  });
});

const form = document.getElementById("lead-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    try {
      const prev = JSON.parse(localStorage.getItem("avex-leads") || "[]");
      localStorage.setItem("avex-leads", JSON.stringify([{ ...data, at: Date.now() }, ...prev].slice(0, 40)));
    } catch {
      /* ignore */
    }
    const message = `Olá Wanderson, acabei de pedir a análise gratuita da captação. Meu nome é ${data.nome}. Especialidade: ${data.especialidade}. Cidade: ${data.cidade}. Principal desafio: ${data.desafio || "gerar mais pacientes com intenção de consulta"}. WhatsApp: ${data.whatsapp}.`;
    window.open(waUrl(message), "_blank", "noopener,noreferrer");
    form.innerHTML = `
      <div class="success">
        <h3>Pedido enviado</h3>
        <p class="muted">O próximo passo é o WhatsApp. Se a janela não abriu, use o botão.</p>
        <a class="btn btn-lg btn-primary mt-10" href="${waUrl(message)}" target="_blank" rel="noreferrer">Abrir conversa no WhatsApp</a>
      </div>`;
  });
}

const WRONG = [
  { who: "lead", delay: 280, text: "Oi, vi o anúncio e gostaria de saber mais sobre a consulta dermatológica.", time: "09:14" },
  { who: "agent", delay: 900, typing: true },
  { who: "agent", delay: 500, text: "Bom dia.", time: "09:29" },
  { who: "lead", delay: 900, text: "Eu gostaria de saber sobre a consulta.", time: "09:31" },
  { who: "agent", delay: 900, typing: true },
  { who: "agent", delay: 500, text: "O que você quer saber?", time: "09:43" },
  { who: "lead", delay: 900, text: "Gostaria de saber valores e disponibilidade.", time: "09:44" },
  { who: "agent", delay: 900, typing: true },
  { who: "agent", delay: 500, text: "O doutor tem agenda quarta às 16h e sexta às 10h.", time: "10:02" },
  { who: "lead", delay: 800, text: "E o valor?", time: "10:03" },
  { who: "agent", delay: 900, typing: true },
  { who: "agent", delay: 500, text: "Depende, senhor.", time: "10:17" },
  { who: "lead", delay: 900, text: "Tudo bem, depois eu vejo isso então.", time: "10:19" },
];

const RIGHT = [
  { who: "lead", delay: 280, text: "Oi, vi o anúncio e gostaria de saber mais sobre a consulta dermatológica.", time: "09:14" },
  { who: "agent", delay: 700, typing: true },
  { who: "agent", delay: 500, text: "Olá! Tudo bem? Te ajudo sim. Você busca consulta por acne, manchas, coceira, queda de cabelo ou uma avaliação de rotina?", time: "09:16" },
  { who: "lead", delay: 1000, text: "Estou com umas manchas vermelhas na pele e muita coceira há alguns dias.", time: "09:17" },
  { who: "agent", delay: 700, typing: true },
  { who: "agent", delay: 500, text: "Entendi. Sinto pelo incômodo. O ideal é o dermatologista avaliar presencialmente. Posso te passar horários e o valor da avaliação?", time: "09:18" },
  { who: "lead", delay: 800, text: "Pode sim. Queria saber disponibilidade e valor.", time: "09:19" },
  { who: "agent", delay: 700, typing: true },
  { who: "agent", delay: 500, text: "Temos quarta às 16h, quinta às 09h ou sexta às 10h. A avaliação fica R$ 280. Procedimentos, se forem necessários, só depois da consulta.", time: "09:20" },
  { who: "lead", delay: 800, text: "Quinta às 09h fica bom.", time: "09:21" },
  { who: "agent", delay: 700, typing: true },
  { who: "agent", delay: 500, text: "Perfeito. Vou deixar quinta às 09h pré-reservado. Me envie seu nome completo para concluir o cadastro.", time: "09:22" },
  { who: "lead", delay: 800, text: "Pode deixar. Meu nome é Mariana.", time: "09:23" },
  { who: "agent", delay: 700, text: "Obrigada, Mariana. Horário encaminhado. Em seguida envio as orientações de chegada.", time: "09:24" },
];

function playChat(areaId, messages) {
  const area = document.getElementById(areaId);
  if (!area) return 0;
  area.innerHTML = "";
  let elapsed = 0;
  messages.forEach((message) => {
    elapsed += message.delay;
    setTimeout(() => {
      if (!message.typing) {
        area.querySelector("[data-typing]")?.remove();
      }
      const bubble = document.createElement("div");
      bubble.className = `bubble ${message.who}`;
      if (message.typing) {
        bubble.dataset.typing = "1";
        bubble.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
      } else {
        bubble.innerHTML = `<p>${message.text}</p><small>${message.time}</small>`;
      }
      area.appendChild(bubble);
      area.scrollTop = area.scrollHeight;
    }, elapsed);
  });
  return elapsed;
}

document.querySelectorAll("[data-run]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const kind = btn.dataset.run;
    const list = kind === "wrong" ? WRONG : RIGHT;
    btn.disabled = true;
    const wait = playChat(kind === "wrong" ? "wrong-chat" : "right-chat", list) + 400;
    setTimeout(() => {
      btn.disabled = false;
      if (kind === "right") {
        document.getElementById("contratar")?.classList.add("ready");
        document.getElementById("contratar")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, wait);
  });
});
