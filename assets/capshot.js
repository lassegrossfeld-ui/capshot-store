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
  var pdpMain = document.querySelector('[data-gallery-pdp-main]');
  var thumbs = document.querySelectorAll('[data-gallery-thumb]');

  if (pdpMain && thumbs.length) {
    var pdpImage = pdpMain.querySelector('img');
    var thumbRail = document.querySelector('[data-gallery-thumbs]');
    var prevBtn = document.querySelector('[data-gallery-prev]');
    var nextBtn = document.querySelector('[data-gallery-next]');
    var index = 0;
    var count = thumbs.length;

    function revealThumb(thumb) {
      if (!thumbRail || !thumb) return;
      var railRect = thumbRail.getBoundingClientRect();
      var thumbRect = thumb.getBoundingClientRect();
      if (thumbRect.top < railRect.top) {
        thumbRail.scrollTop -= railRect.top - thumbRect.top;
      } else if (thumbRect.bottom > railRect.bottom) {
        thumbRail.scrollTop += thumbRect.bottom - railRect.bottom;
      }
      if (thumbRect.left < railRect.left) {
        thumbRail.scrollLeft -= railRect.left - thumbRect.left;
      } else if (thumbRect.right > railRect.right) {
        thumbRail.scrollLeft += thumbRect.right - railRect.right;
      }
    }

    function setActive(next) {
      index = Math.max(0, Math.min(count - 1, next));
      var thumb = thumbs[index];
      var src = thumb.getAttribute('data-src');
      var alt = thumb.getAttribute('data-alt') || '';
      if (!src) {
        var thumbImg = thumb.querySelector('img');
        if (thumbImg) src = thumbImg.getAttribute('src');
      }
      if (pdpImage && src) {
        pdpImage.setAttribute('src', src);
        pdpImage.setAttribute('alt', alt);
      }
      thumbs.forEach(function (item, i) {
        var on = i === index;
        item.classList.toggle('is-active', on);
        if (on) item.setAttribute('aria-current', 'true');
        else item.removeAttribute('aria-current');
      });
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index === count - 1;
      revealThumb(thumb);
    }

    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener('click', function () {
        setActive(i);
      });
    });
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        setActive(index - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        setActive(index + 1);
      });
    }

    setActive(0);
  } else if (main && thumbs.length) {
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
  }

  function euro(cents) {
    return (cents / 100).toFixed(2).replace('.', ',') + ' €';
  }

  var box = document.querySelector('[data-buy-box]');
  if (box) {
    var sale = Number(box.getAttribute('data-price-sale')) || 2490;
    var offers = box.querySelectorAll('[data-offer]');
    var qty = box.querySelector('[data-qty]');
    var stickyQty = document.querySelector('[data-sticky-qty]');

    function selectedCount() {
      var count = 1;
      offers.forEach(function (offer) {
        if (offer.checked) count = Number(offer.value) || 1;
      });
      return count < 1 ? 1 : count;
    }

    function render() {
      var count = selectedCount();
      var total = sale * count;
      if (qty) qty.value = String(count);
      if (stickyQty) stickyQty.value = String(count);
      var stickyPrice = document.querySelector('[data-sticky-price]');
      if (stickyPrice) stickyPrice.textContent = euro(total);
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

  var stickyBar = document.querySelector('[data-sticky-bar]');
  var mainAtc = document.querySelector('.buy-box .btn--primary');
  if (stickyBar && mainAtc && 'IntersectionObserver' in window) {
    var stickyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var show = !entry.isIntersecting;
        stickyBar.classList.toggle('is-visible', show);
        stickyBar.setAttribute('aria-hidden', show ? 'false' : 'true');
      });
    }, { threshold: 0.15 });
    stickyObserver.observe(mainAtc);
  }

  var slideshow = document.querySelector('[data-slideshow]');
  if (slideshow) {
    var slides = Array.prototype.slice.call(slideshow.querySelectorAll('[data-slideshow-slide]'));
    var index = 0;
    var timer = null;
    var intervalMs = Number(slideshow.getAttribute('data-slideshow-interval')) || 4500;
    if (intervalMs < 4000) intervalMs = 4000;
    if (intervalMs > 5000) intervalMs = 5000;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(next) {
      if (!slides.length) return;
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var on = i === index;
        slide.hidden = !on;
        slide.classList.toggle('is-active', on);
        slide.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
    }

    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    function start() {
      stop();
      if (reduce || slides.length < 2) return;
      timer = window.setInterval(function () {
        show(index + 1);
      }, intervalMs);
    }

    var prev = slideshow.querySelector('[data-slideshow-prev]');
    var nextBtn = slideshow.querySelector('[data-slideshow-next]');
    if (prev) {
      prev.addEventListener('click', function () {
        show(index - 1);
        start();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        show(index + 1);
        start();
      });
    }
    slideshow.addEventListener('mouseenter', stop);
    slideshow.addEventListener('mouseleave', start);
    slideshow.addEventListener('focusin', stop);
    slideshow.addEventListener('focusout', function (event) {
      if (!slideshow.contains(event.relatedTarget)) start();
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else start();
    });

    show(0);
    start();
  }

  var cartDrawer = document.querySelector('[data-cart-drawer]');
  var cartOpeners = document.querySelectorAll('[data-cart-open]');
  var cartClosers = document.querySelectorAll('[data-cart-close]');
  var cartPanel = cartDrawer ? cartDrawer.querySelector('.cart-drawer__panel') : null;
  var lastFocus = null;

  function openCart() {
    if (!cartDrawer || !cartPanel) return;
    lastFocus = document.activeElement;
    cartDrawer.hidden = false;
    document.body.classList.add('is-cart-open');
    window.requestAnimationFrame(function () {
      cartDrawer.classList.add('is-open');
    });
    cartOpeners.forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'true');
    });
    cartPanel.focus();
  }

  function closeCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('is-open');
    document.body.classList.remove('is-cart-open');
    cartOpeners.forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
    });
    window.setTimeout(function () {
      if (!cartDrawer.classList.contains('is-open')) cartDrawer.hidden = true;
    }, 260);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  cartOpeners.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      openCart();
    });
  });
  cartClosers.forEach(function (btn) {
    btn.addEventListener('click', closeCart);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && cartDrawer && cartDrawer.classList.contains('is-open')) {
      closeCart();
    }
  });

  document.querySelectorAll('[data-faq-accordion]').forEach(function (faqAccordion) {
    faqAccordion.querySelectorAll('[data-faq-trigger]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('[data-faq-item]');
        if (!item) return;
        var open = item.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  });
})();

(function () {
  var key = 'capshot-lang';

  function apply(lang) {
    lang = lang === 'en' ? 'en' : 'de';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang-block]').forEach(function (block) {
      block.hidden = block.getAttribute('data-lang-block') !== lang;
    });
    document.querySelectorAll('[data-i18n-en]').forEach(function (el) {
      if (!el.getAttribute('data-i18n-de')) el.setAttribute('data-i18n-de', el.textContent);
      el.textContent = el.getAttribute(lang === 'en' ? 'data-i18n-en' : 'data-i18n-de');
    });
    document.querySelectorAll('[data-locale-code]').forEach(function (el) {
      el.textContent = lang === 'en' ? 'EN' : 'DE';
    });
    document.querySelectorAll('[data-locale-flag]').forEach(function (img) {
      img.src = lang === 'en'
        ? 'https://cdn.shopify.com/static/images/flags/gb.svg'
        : 'https://cdn.shopify.com/static/images/flags/de.svg';
    });
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-set-lang') === lang);
    });
    try { localStorage.setItem(key, lang); } catch (err) {}
  }

  function closePanels() {
    document.querySelectorAll('[data-panel-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.hidden = true;
    });
  }

  var saved = 'de';
  try { saved = localStorage.getItem(key) || 'de'; } catch (err) {}
  if (document.querySelector('[data-set-lang], [data-i18n-en], [data-lang-block]')) apply(saved);

  document.querySelectorAll('[data-panel-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      event.stopPropagation();
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var willOpen = panel && panel.hidden;
      closePanels();
      if (willOpen) {
        panel.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.querySelectorAll('.shop-settings__panel').forEach(function (panel) {
    panel.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  });

  document.addEventListener('click', closePanels);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closePanels();
  });

  document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      apply(btn.getAttribute('data-set-lang'));
      closePanels();
    });
  });
})();
