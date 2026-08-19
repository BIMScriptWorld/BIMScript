(function () {
  var slider = document.getElementById('slider');
  if (!slider) return;
  var clip = document.getElementById('clip');
  var handle = document.getElementById('handle');
  var imgScan = document.getElementById('imgScan');
  var imgBim = document.getElementById('imgBim');
  var dragging = false;

  // Keep the clipped (left) image the same rendered width as the base image,
  // so the two halves stay in register while the clip window changes.
  function sync() { imgScan.style.width = slider.clientWidth + 'px'; }

  function setPct(p) {
    p = Math.max(0, Math.min(100, p));
    clip.style.width = p + '%';
    handle.style.left = p + '%';
  }
  function fromEvent(e) {
    var x = (e.touches ? e.touches[0].clientX : e.clientX);
    var r = slider.getBoundingClientRect();
    setPct(((x - r.left) / r.width) * 100);
  }

  slider.addEventListener('mousedown', function (e) { dragging = true; fromEvent(e); });
  window.addEventListener('mousemove', function (e) { if (dragging) fromEvent(e); });
  window.addEventListener('mouseup', function () { dragging = false; });
  slider.addEventListener('touchstart', function (e) { dragging = true; fromEvent(e); }, { passive: true });
  slider.addEventListener('touchmove', function (e) { if (dragging) fromEvent(e); }, { passive: true });
  slider.addEventListener('touchend', function () { dragging = false; });
  window.addEventListener('resize', sync);
  imgBim.addEventListener('load', sync);
  sync(); setPct(50);

  // scene switcher
  var btns = document.querySelectorAll('#scenes button');
  Array.prototype.forEach.call(btns, function (b) {
    b.addEventListener('click', function () {
      Array.prototype.forEach.call(btns, function (o) { o.classList.remove('is-active'); });
      b.classList.add('is-active');
      var id = b.getAttribute('data-id');
      imgScan.src = 'static/images/scan_' + id + '.jpg';
      imgBim.src = 'static/images/bim_' + id + '.jpg';
      setPct(50);
    });
  });
})();
