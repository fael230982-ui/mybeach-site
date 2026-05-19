const header = document.querySelector(".site-header");
const languageSelect = document.querySelector("#languageSelect");
const brandName = "My Beach";

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-solid", window.scrollY > 24);
}

function protectBrandName() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.includes(brandName)) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest(".notranslate, script, style, textarea, option")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    const parts = node.nodeValue.split(brandName);

    parts.forEach((part, index) => {
      if (part) fragment.append(document.createTextNode(part));
      if (index < parts.length - 1) {
        const span = document.createElement("span");
        span.className = "notranslate";
        span.setAttribute("translate", "no");
        span.textContent = brandName;
        fragment.append(span);
      }
    });

    node.replaceWith(fragment);
  });
}

function getSelectedLanguage() {
  const match = document.cookie.match(/(?:^|; )googtrans=\/pt\/([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "pt";
}

function setTranslateCookie(language) {
  const value = language === "pt" ? "/pt/pt" : `/pt/${language}`;
  const expires = "expires=Fri, 31 Dec 9999 23:59:59 GMT";
  document.cookie = `googtrans=${value}; ${expires}; path=/`;
  document.cookie = `googtrans=${value}; ${expires}; path=/; domain=.github.io`;
}

function syncLanguageSelect() {
  if (!languageSelect) return;
  languageSelect.value = getSelectedLanguage();
}

window.googleTranslateElementInit = function googleTranslateElementInit() {
  if (!window.google || !window.google.translate) return;

  new window.google.translate.TranslateElement(
    {
      pageLanguage: "pt",
      includedLanguages: "pt,en,es,fr,it,de",
      autoDisplay: false,
    },
    "google_translate_element",
  );
};

if (languageSelect) {
  syncLanguageSelect();
  languageSelect.addEventListener("change", (event) => {
    setTranslateCookie(event.target.value);
    window.location.reload();
  });
}

protectBrandName();
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
