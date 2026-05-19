const header = document.querySelector(".site-header");
const languageSelect = document.querySelector("#languageSelect");

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-solid", window.scrollY > 24);
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

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
