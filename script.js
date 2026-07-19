const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const trialForm = document.querySelector(".trial-form");

menuToggle?.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

menu?.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    menu.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".activity-card, .journey-line article, .parents-grid article").forEach((item) => {
  observer.observe(item);
});

trialForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(trialForm);
  const message = [
    "Hello Amma's Ark, I would like to book a free demo.",
    `Parent: ${data.get("name") || ""}`,
    `Phone: ${data.get("phone") || ""}`,
    `Child age: ${data.get("age") || ""}`,
    `Activity: ${data.get("activity") || ""}`
  ].join("\n");

  window.open(`https://wa.me/919003433304?text=${encodeURIComponent(message)}`, "_blank", "noreferrer");
});
