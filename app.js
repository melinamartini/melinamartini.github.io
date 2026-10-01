(function () {
  // Menú móvil
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!open));
      nav.setAttribute('data-open', String(!open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.setAttribute('data-open', 'false');
      }
    });
  }

  // Países del mapa
  var chips = document.querySelectorAll('.chip[data-country]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var k = chip.getAttribute('data-country');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      document.querySelectorAll('.ficha').forEach(function (f) { f.hidden = f.id !== 'ficha-' + k; });
      document.querySelectorAll('.map .layer').forEach(function (l) { l.classList.toggle('on', l.getAttribute('data-layer') === k); });
    });
  });

  // Filtros de trayectoria
  var filters = document.querySelectorAll('.filter[data-filter]');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      document.querySelectorAll('.timeline > [data-cat]').forEach(function (el) {
        el.hidden = !(f === 'All' || (el.getAttribute('data-cat') || '').split(' ').indexOf(f) !== -1);
      });
    });
  });

  // Copiar email
  document.querySelectorAll('.copy[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () { btn.textContent = 'Copiado'; setTimeout(function () { btn.textContent = 'Copiar email'; }, 2000); };
      var fallback = function () {
        var code = btn.parentNode.querySelector('code');
        if (!code) return;
        var r = document.createRange(); r.selectNodeContents(code);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        btn.textContent = 'Seleccionado';
      };
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, fallback);
        } else { fallback(); }
      } catch (e) { fallback(); }
    });
  });
})();
