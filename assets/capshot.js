(function () {
  var toggle = document.querySelector('[data-menu-toggle]');
  var panel = document.querySelector('[data-menu-panel]');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var open = panel.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var main = document.querySelector('[data-gallery-main]');
  var thumbs = document.querySelectorAll('[data-gallery-thumb]');
  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      if (!main) return;
      var src = thumb.getAttribute('data-src');
      var alt = thumb.getAttribute('data-alt') || '';
      var image = main.querySelector('img');
      if (image && src) {
        image.setAttribute('src', src);
        image.setAttribute('alt', alt);
      }
      thumbs.forEach(function (item) {
        item.classList.toggle('is-active', item === thumb);
      });
    });
  });

  function euro(cents) {
    return (cents / 100).toFixed(2).replace('.', ',') + ' €';
  }

  var box = document.querySelector('[data-buy-box]');
  if (box) {
    var sale = Number(box.getAttribute('data-price-sale')) || 2490;
    var bundle = Number(box.getAttribute('data-price-bundle')) || 2190;
    var offers = box.querySelectorAll('[data-offer]');
    var qty = box.querySelector('[data-qty]');
    var stickyQty = document.querySelector('[data-sticky-qty]');
    var stickyAtc = document.querySelector('[data-sticky-atc]');

    function selectedCount() {
      var count = 1;
      offers.forEach(function (offer) {
        if (offer.checked) count = Number(offer.value) || 1;
      });
      return count < 1 ? 1 : count;
    }

    function render() {
      var count = selectedCount();
      var unit = count >= 2 ? bundle : sale;
      var total = unit * count;
      if (qty) qty.value = String(count);
      if (stickyQty) stickyQty.value = String(count);
      if (stickyAtc) {
        stickyAtc.textContent = 'In den Warenkorb · ' + euro(total);
      }
    }

    offers.forEach(function (offer) {
      offer.addEventListener('change', render);
    });

    var tabs = box.querySelectorAll('[data-tab]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var name = tab.getAttribute('data-tab');
        tabs.forEach(function (item) {
          var on = item === tab;
          item.classList.toggle('is-active', on);
          item.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        var desc = box.querySelector('#TabDesc');
        var ship = box.querySelector('#TabShip');
        if (desc) desc.hidden = name !== 'desc';
        if (ship) ship.hidden = name !== 'ship';
      });
    });

    render();
  }
})();
