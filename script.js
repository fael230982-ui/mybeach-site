const header = document.querySelector(".site-header");

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-solid", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
