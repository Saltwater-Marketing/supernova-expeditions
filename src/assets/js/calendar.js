(function () {
  var el = document.getElementById('trip-data'); if (!el) return;
  var trips = JSON.parse(el.textContent).trips || [];
  var grid = document.getElementById('cal-grid'), label = document.getElementById('cal-label'), note = document.getElementById('cal-note');
  var form = document.getElementById('request-form');
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var TYPES = { scuba: 'Scuba Diving Expedition', private: 'Private Charter', bike: 'Mountain Bike Expedition', dry: 'Dry Boat Charter' };
  var rank = { booked: 3, limited: 2, open: 1 };
  var today = new Date(); today.setHours(0,0,0,0);
  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
  function tripsOn(s) { return trips.filter(function (t) { return s >= t.start && s <= t.end; }); }

  var view = new Date(today.getFullYear(), today.getMonth(), 1);
  var selected = null;
  var next = trips.filter(function (t) { return t.end >= iso(today); }).sort(function (a,b){ return a.start < b.start ? -1 : 1; })[0];
  if (next && !trips.some(function (t) { return t.start.slice(0,7) === iso(today).slice(0,7); })) view = new Date(+next.start.slice(0,4), +next.start.slice(5,7)-1, 1);

  function render() {
    label.textContent = MONTHS[view.getMonth()] + ' ' + view.getFullYear();
    grid.querySelectorAll('.cal-day').forEach(function (n) { n.remove(); });
    var first = new Date(view), pad = first.getDay(), days = new Date(view.getFullYear(), view.getMonth()+1, 0).getDate();
    for (var i = 0; i < pad; i++) { var b = document.createElement('span'); b.className = 'cal-day blank'; grid.appendChild(b); }
    for (var d = 1; d <= days; d++) {
      var date = new Date(view.getFullYear(), view.getMonth(), d), s = iso(date);
      var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'cal-day'; btn.textContent = d; btn.dataset.date = s;
      var on = tripsOn(s), status = null;
      on.forEach(function (t) { if (!status || rank[t.status] > rank[status]) status = t.status; });
      if (date < today) { btn.classList.add('past'); btn.disabled = true; }
      else if (status) { btn.classList.add(status); var dot = document.createElement('span'); dot.className = 'dot'; btn.appendChild(dot); }
      var lbl = d + ', ' + date.toDateString() + (status ? ', ' + status + ': ' + on.map(function(t){return t.title;}).join(', ') : ', available to request');
      btn.setAttribute('aria-label', lbl);
      if (s === selected) btn.classList.add('selected');
      grid.appendChild(btn);
    }
  }
  grid.addEventListener('click', function (e) {
    var b = e.target.closest('.cal-day'); if (!b || b.disabled || b.classList.contains('blank')) return;
    var s = b.dataset.date, on = tripsOn(s), nice = new Date(s + 'T12:00:00').toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
    if (b.classList.contains('booked') && on.every(function(t){return t.status==='booked';})) {
      note.innerHTML = '<strong>' + nice + '</strong> is booked. Pick another date, or ask us about nearby dates below.';
      return;
    }
    selected = s; render();
    if (on.length) {
      var t = on.filter(function(x){return x.status!=='booked';})[0] || on[0];
      note.innerHTML = '<strong>' + t.title + '</strong> runs ' + fmt(t.start) + ' to ' + fmt(t.end) + (t.spots ? ' · ' + t.spots : '') + '. We\'ve added it to your request below.';
      fill(t.type, t.start, t.title);
    } else {
      note.innerHTML = '<strong>' + nice + '</strong> is open. We\'ve added it to your request below. Tell us the trip you have in mind.';
      fill(null, s, '');
    }
  });
  function fmt(s) { return new Date(s + 'T12:00:00').toLocaleDateString('en-US', { month:'short', day:'numeric' }); }
  function fill(type, start, title) {
    if (!form) return;
    if (start) form.elements['start_date'].value = start;
    if (type) form.elements['trip_type'].value = TYPES[type];
    form.elements['scheduled_trip'].value = title || '';
  }
  document.getElementById('cal-prev').addEventListener('click', function () { view.setMonth(view.getMonth()-1); render(); });
  document.getElementById('cal-next').addEventListener('click', function () { view.setMonth(view.getMonth()+1); render(); });
  document.querySelectorAll('[data-join]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.dataset.join.split('|'); var t = trips.filter(function(x){ return x.start === k[0] && x.title === k[1]; })[0]; if (!t) return;
      fill(t.type, t.start, t.title);
      view = new Date(+t.start.slice(0,4), +t.start.slice(5,7)-1, 1); selected = t.start; render();
      document.getElementById('request').scrollIntoView({ behavior: 'smooth' });
    });
  });
  var tripParam = new URLSearchParams(location.search).get('trip');
  if (tripParam && TYPES[tripParam] && form) form.elements['trip_type'].value = TYPES[tripParam];
  render();
})();
