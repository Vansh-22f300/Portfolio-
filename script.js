/**
 * Progressive enhancement only.
 *
 * Every page is fully readable and navigable with this file blocked: nav links are
 * real anchors, the lightbox triggers are real links to the image, and reveal
 * animations are cancelled by the .no-js class that is removed below.
 */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------ mobile nav */

  var header = document.querySelector('[data-header]');
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('site-nav');

  function setNav(open) {
    if (!header || !toggle) return;
    header.setAttribute('data-open', String(open));
    toggle.setAttribute('aria-expanded', String(open));
  }

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      setNav(header.getAttribute('data-open') !== 'true');
    });

    // Close on link activation so in-page anchors don't leave the menu covering the target.
    if (nav) {
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) setNav(false);
      });
    }

    // Click outside closes.
    document.addEventListener('click', function (e) {
      if (header.getAttribute('data-open') !== 'true') return;
      if (!header.contains(e.target)) setNav(false);
    });

    // Escape closes and returns focus to the control that opened it.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.getAttribute('data-open') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });

    // Reset state when crossing the desktop breakpoint.
    var desktop = window.matchMedia('(min-width: 881px)');
    var onBreak = function (e) { if (e.matches) setNav(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onBreak);
    else if (desktop.addListener) desktop.addListener(onBreak);
  }

  /* -------------------------------------------------- sticky header border */

  if (header) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;pointer-events:none;';
    document.body.prepend(sentinel);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        header.setAttribute('data-stuck', String(!entries[0].isIntersecting));
      }).observe(sentinel);
    }
  }

  /* ----------------------------------------------------- reveal on scroll */

  var revealables = document.querySelectorAll('.rv');

  if (!('IntersectionObserver' in window) || reduced.matches) {
    // No observer support, or the user asked for no motion: show everything now.
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(revealables, function (el) { revealObserver.observe(el); });

    // If the user switches on reduced motion mid-session, stop animating.
    var onMotion = function (e) {
      if (!e.matches) return;
      Array.prototype.forEach.call(revealables, function (el) { el.classList.add('in'); });
    };
    if (reduced.addEventListener) reduced.addEventListener('change', onMotion);
  }

  /* ------------------------------------------------ active section in nav

     One generalised spy drives both the homepage nav and the case-study
     contents rail. The [data-spy] container may set data-spy-attr /
     data-spy-value to choose what is written on the active link; the default
     is aria-current="true" (the primary nav), while the contents rail asks for
     aria-current="location". A link may target a section directly (#work) or a
     section's heading (#h-overview) — a heading target is resolved to its
     enclosing section so the observed box is the section, not the sticky label
     pinned near the top of the viewport, which would never sit in the band. */

  var spyRoot = document.querySelector('[data-spy]');
  var sectionLinks = spyRoot ? spyRoot.querySelectorAll('a[href^="#"]') : [];

  if (sectionLinks.length && 'IntersectionObserver' in window) {
    var spyAttr = spyRoot.getAttribute('data-spy-attr') || 'aria-current';
    var spyVal = spyRoot.getAttribute('data-spy-value') || 'true';
    var pairs = [];

    Array.prototype.forEach.call(sectionLinks, function (link) {
      var el = document.getElementById(link.getAttribute('href').slice(1));
      if (!el) return;
      if (/^H[1-6]$/.test(el.tagName)) el = el.closest('section') || el;
      pairs.push({ link: link, target: el });
    });

    var clearSpy = function () {
      Array.prototype.forEach.call(sectionLinks, function (l) { l.removeAttribute(spyAttr); });
    };

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var match = null;
        for (var i = 0; i < pairs.length; i++) {
          if (pairs[i].target === entry.target) { match = pairs[i]; break; }
        }
        if (!match) return;
        clearSpy();
        match.link.setAttribute(spyAttr, spyVal);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    pairs.forEach(function (p) { spy.observe(p.target); });
  }

  /* --------------------------------------------------------- copy to clipboard */

  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    var feedback = btn.parentNode.querySelector('.copyfx');

    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-copy');

      var done = function (msg) {
        if (feedback) {
          feedback.textContent = msg;
          window.setTimeout(function () { feedback.textContent = ''; }, 2600);
        }
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(
          function () { done('Copied to clipboard.'); },
          function () { done(value); }
        );
      } else {
        // Fallback for non-secure contexts where the Clipboard API is unavailable.
        var ta = document.createElement('textarea');
        ta.value = value;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:absolute;left:-9999px;';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done('Copied to clipboard.'); }
        catch (err) { done(value); }
        document.body.removeChild(ta);
      }
    });
  });

  /* ------------------------------------------------------------- lightbox */

  var triggers = document.querySelectorAll('[data-lightbox]');
  if (!triggers.length) return;

  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('data-open', 'false');
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Screenshot viewer');
  lb.innerHTML =
    '<button class="lb__close" type="button" aria-label="Close viewer">&times;</button>' +
    '<figure class="lb__fig">' +
      '<img class="lb__img" alt="" />' +
      '<figcaption class="lb__cap"></figcaption>' +
    '</figure>';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector('.lb__img');
  var lbCap = lb.querySelector('.lb__cap');
  var lbClose = lb.querySelector('.lb__close');
  var lastFocused = null;

  function openLb(src, alt, caption) {
    lastFocused = document.activeElement;
    lbImg.setAttribute('src', src);
    lbImg.setAttribute('alt', alt || '');
    lbCap.textContent = caption || '';
    lb.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLb() {
    lb.setAttribute('data-open', 'false');
    document.body.style.overflow = '';
    // Release the decoded image so it isn't retained after closing.
    window.setTimeout(function () {
      if (lb.getAttribute('data-open') === 'false') lbImg.removeAttribute('src');
    }, 300);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  Array.prototype.forEach.call(triggers, function (trigger) {
    trigger.addEventListener('click', function (e) {
      // Plain left-click only: let modifier-clicks open the image normally.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      openLb(
        trigger.getAttribute('href') || trigger.getAttribute('data-src'),
        trigger.getAttribute('data-alt'),
        trigger.getAttribute('data-caption')
      );
    });
  });

  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });

  document.addEventListener('keydown', function (e) {
    if (lb.getAttribute('data-open') !== 'true') return;
    if (e.key === 'Escape') { closeLb(); return; }
    // Modal focus trap: only the close button is focusable inside.
    if (e.key === 'Tab') { e.preventDefault(); lbClose.focus(); }
  });
})();

/* ------------------------------------------------------------------ contact

   Progressive enhancement over a real <form>. Without JS the form still POSTs
   natively to Web3Forms; with JS it submits in the background and reports
   status inline. The access-key guard is deliberate: an unconfigured form must
   announce itself rather than appear to send and quietly drop the message. */
(function () {
  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

  var statusEl = form.querySelector('[data-form-status]');
  var setupEl = form.querySelector('[data-form-setup]');
  var submit = form.querySelector('button[type="submit"]');
  var PLACEHOLDER = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';
  var configured = form.getAttribute('data-access-key') !== PLACEHOLDER;

  function say(msg, state) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    if (state) statusEl.setAttribute('data-state', state);
    else statusEl.removeAttribute('data-state');
  }

  // Not configured yet: surface the notice, disable submit, keep the mailto
  // links as the working path. Never pretend to send.
  if (!configured) {
    if (setupEl) setupEl.hidden = false;
    if (submit) {
      submit.disabled = true;
      submit.setAttribute('aria-disabled', 'true');
      submit.style.opacity = '0.55';
      submit.style.cursor = 'not-allowed';
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    return;
  }

  // Take over validation only now that JS is confirmed running. Without JS the
  // markup keeps native browser validation instead of silently losing it.
  form.setAttribute('novalidate', '');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Native constraint validation; focus the first offender for keyboard users.
    if (!form.checkValidity()) {
      var bad = form.querySelector(':invalid');
      if (bad && bad.focus) bad.focus();
      say('Please complete the highlighted fields.', 'err');
      return;
    }

    if (submit) { submit.disabled = true; submit.setAttribute('aria-busy', 'true'); }
    say('Sending…', 'busy');

    var data = new FormData(form);

    window.fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (body) {
          return { ok: res.ok, body: body };
        });
      })
      .then(function (r) {
        if (r.ok) {
          form.reset();
          say('Thanks — your message has been sent. I will reply by email.', 'ok');
        } else {
          say(
            (r.body && r.body.message) ||
              'Something went wrong. Please email vanshmittal021@gmail.com instead.',
            'err'
          );
        }
      })
      .catch(function () {
        say('Network error. Please email vanshmittal021@gmail.com instead.', 'err');
      })
      .then(function () {
        if (submit) { submit.disabled = false; submit.removeAttribute('aria-busy'); }
      });
  });
})();
