const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const welcome = $("#welcome");
const world = $("#world");
const envelope = $("#envelope");
const openBtn = $("#openBtn");
const modal = $("#modal");
const toast = $("#toast");
const finale = $("#finale");

document.addEventListener("mousemove", e => {
  const g = $("#cursorGlow");
  g.style.left = e.clientX + "px";
  g.style.top = e.clientY + "px";
});

function createStars() {
  const box = $("#stars");
  for (let i = 0; i < 55; i++) {
    const s = document.createElement("span");
    s.textContent = Math.random() > .5 ? "·" : "✦";
    s.style.position = "fixed";
    s.style.left = Math.random()*100 + "%";
    s.style.top = Math.random()*100 + "%";
    s.style.color = "#d7b7c1";
    s.style.opacity = (.15 + Math.random()*.55);
    s.style.fontSize = (5 + Math.random()*9) + "px";
    s.style.animation = `twinkle ${2 + Math.random()*4}s infinite alternate`;
    box.appendChild(s);
  }
}
createStars();

openBtn.addEventListener("click", () => {
  envelope.classList.add("opened");
  welcome.style.transition = "opacity 1s, transform 1s";
  welcome.style.opacity = "0";
  welcome.style.transform = "scale(1.04)";
  setTimeout(() => {
    welcome.classList.add("hidden");
    world.classList.remove("hidden");
    window.scrollTo(0,0);
  }, 900);
});

$$(".object[data-modal]").forEach(obj => {
  obj.addEventListener("click", () => openModal(obj.dataset.modal));
});

function openModal(name) {
  $$(".modal-panel").forEach(p => p.classList.add("hidden-panel"));
  const target = $("#" + name.replace("-modal","") + "Modal");
  if (target) target.classList.remove("hidden-panel");
  modal.classList.add("open");
}

$(".close").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("open");
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.classList.remove("open");
});

$("#playFake").addEventListener("click", e => {
  e.currentTarget.textContent = e.currentTarget.textContent.includes("play") ? "Ⅱ playing..." : "▶ play";
  toast.textContent = "Add your song URL/audio file in script.js ♡";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
});

$("#giftBtn").addEventListener("click", () => {
  finale.classList.remove("hidden");
  finale.classList.add("show");
  let n = 3;
  const count = $("#countdown");
  count.textContent = n;
  const timer = setInterval(() => {
    n--;
    if (n > 0) count.textContent = n;
    else {
      clearInterval(timer);
      finale.classList.add("reveal");
    }
  }, 900);
});

$("#soundBtn").addEventListener("click", () => {
  toast.textContent = "Music is intentionally off until you choose the song. ♡";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
});
