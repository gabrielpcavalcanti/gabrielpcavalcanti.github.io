// ===== CONFIGURAÇÃO =====
// Número com código do país e DDD, só dígitos. Ex.: 5561999999999
const WHATSAPP = "5561991733346";
const MENSAGEM_PADRAO = "Olá, Gabriel! Quero agendar uma aula.";
// ========================

document.documentElement.classList.add("js");

// Links do WhatsApp
document.querySelectorAll("[data-wa]").forEach((el) => {
  const msg = el.dataset.msg || MENSAGEM_PADRAO;
  el.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
});

// Menu mobile
const btn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
btn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    btn.setAttribute("aria-expanded", false);
  }
});

// Animação ao rolar
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
  }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Ano no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Esconde o botão flutuante quando a seção final aparece
const flutuante = document.querySelector(".wa-float");
const fim = document.getElementById("contato");
new IntersectionObserver(([e]) => flutuante.classList.toggle("hide", e.isIntersecting)).observe(fim);

// ===== Escolha de assunto -> mensagem pronta no WhatsApp =====
(() => {
  const cta = document.getElementById("cta-wa");
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      cta.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá, Gabriel! " + chip.dataset.msg)}`;
    });
  });
})();
