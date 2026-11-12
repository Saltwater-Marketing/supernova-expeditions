(function () {
  var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();

  // Mobile menu
  var t = document.querySelector('.menu-toggle'), nav = document.getElementById('primary-nav');
  if (t && nav) t.addEventListener('click', function () {
    var open = t.getAttribute('aria-expanded') === 'true';
    t.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('open', !open);
    document.body.style.overflow = open ? '' : 'hidden';
  });

  // Click-to-load video facades
  document.querySelectorAll('.video[data-src]').forEach(function (v) {
    v.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = v.getAttribute('data-src'); f.allow = 'autoplay; fullscreen; picture-in-picture'; f.allowFullscreen = true;
      f.title = v.getAttribute('data-title') || 'Video'; v.innerHTML = ''; v.appendChild(f);
    }, { once: true });
  });

  // Newsletter popup: once per visitor, after 25s or 55% scroll
  var modal = document.getElementById('nl-modal'); if (!modal) return;
  var KEY = 'sn_nl_seen';
  function seen() { try { return localStorage.getItem(KEY); } catch (e) { return '1'; } }
  function mark() { try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {} }
  if (seen() || /\/thanks\//.test(location.pathname)) return;
  var shown = false;
  function show() { if (shown) return; shown = true; modal.hidden = false; mark(); var i = modal.querySelector('input[type=email]'); if (i) setTimeout(function(){ i.focus(); }, 50); }
  function hide() { modal.hidden = true; }
  setTimeout(show, 25000);
  window.addEventListener('scroll', function onS() {
    var h = document.documentElement; if ((h.scrollTop + innerHeight) / h.scrollHeight > 0.55) { show(); removeEventListener('scroll', onS); }
  }, { passive: true });
  modal.querySelector('.nl-close').addEventListener('click', hide);
  modal.querySelector('.nl-later').addEventListener('click', hide);
  modal.addEventListener('click', function (e) { if (e.target === modal) hide(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
})();
