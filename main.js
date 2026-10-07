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
  document.querySelectorAll('.js-mail').forEach(function (a) {
    a.setAttribute('href', 'mailto:' + address);
  });
})();
