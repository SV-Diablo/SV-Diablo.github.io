(function () {
  var root = document.documentElement;

  function readLang() {
    try { return localStorage.getItem('lang'); } catch (e) { return null; }
  }
  function saveLang(lang) {
    try { localStorage.setItem('lang', lang); } catch (e) { /* storage blocked */ }
  }
  function setLang(lang) {
    root.setAttribute('lang', lang);
  }

  var initial = readLang() || ((navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');
  setLang(initial);

  var toggle = document.querySelector('.lang');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('lang') === 'es' ? 'en' : 'es';
      setLang(next);
      saveLang(next);
    });
  }

  // Email built at runtime so simple scrapers don't harvest it from the HTML.
  var address = ['ebastian004', 'gmail.com'].join('@');
  var subjects = { es: 'Contacto desde tu portafolio', en: 'Contact from your portfolio' };

  // Opens Gmail's compose window in a new tab instead of the OS mail client.
  function gmailUrl() {
    var lang = root.getAttribute('lang') === 'en' ? 'en' : 'es';
    return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(address) +
      '&su=' + encodeURIComponent(subjects[lang]);
  }
  document.querySelectorAll('.js-mail').forEach(function (a) {
    a.setAttribute('href', gmailUrl());
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
    a.addEventListener('click', function () { a.setAttribute('href', gmailUrl()); });
  });

  // Fallback for visitors who don't use Gmail: copy the address.
  var copy = document.querySelector('.js-copy');
  if (copy) {
    copy.hidden = false;
    copy.addEventListener('click', function () {
      var done = function () {
        copy.classList.add('copied');
        setTimeout(function () { copy.classList.remove('copied'); }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(done, function () { window.prompt('', address); });
      } else {
        window.prompt('', address);
      }
    });
  }
})();
