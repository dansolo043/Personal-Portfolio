const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = 'cubic-bezier(0.6, 0.02, 0.1, 1)'; // same curve as --ease-cut
const slides = [...document.querySelectorAll('main > section[id]')];
const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

// 1. Scroll: slide arrival fallback where CSS view-timeline is not supported
if (!reduce && !CSS.supports('animation-timeline: view()') && 'IntersectionObserver' in window) {
  const arrive = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Settle slides already scrolled past (for example after a reload)
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        entry.target.classList.add('is-in');
        arrive.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -15% 0px' });

  slides.filter((slide) => !slide.classList.contains('hero')).forEach((slide) => {
    slide.classList.add('will-arrive');
    arrive.observe(slide);
  });

  // At the very bottom of the page, ensure all slides are settled
  window.addEventListener('scroll', () => {
    if (atBottom()) slides.forEach((slide) => slide.classList.add('is-in'));
  }, { passive: true });

  // When focusing via keyboard Tab, settle the slide immediately
  document.addEventListener('focusin', (event) => {
    const slide = event.target.closest('.will-arrive');
    if (slide) slide.classList.add('is-in');
  });
}

// 2. Navigation: progress bar and Slide N of M counter
const bar = document.querySelector('.deck-bar');
if (bar) {
  const counterN = bar.querySelector('.slide-n');
  const fill = bar.querySelector('.deck-progress span');
  let current = 0, ticking = false;
  bar.querySelector('.slide-m').textContent = slides.length;

  function setCurrent(i) {
    if (i === current) return;
    current = i;
    counterN.textContent = i + 1;
    if (!reduce) {
      counterN.animate(
        [
          { transform: 'translateY(45%)', opacity: 0 },
          { transform: 'none', opacity: 1 }
        ],
        { duration: 350, easing: EASE }
      );
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const tops = slides.map((slide) => slide.getBoundingClientRect().top);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      let index = 0;
      tops.forEach((top, n) => {
        if (top <= window.innerHeight * 0.5) index = n;
      });
      if (atBottom()) index = slides.length - 1;
      fill.style.setProperty('--progress', (max > 0 ? window.scrollY / max : 0).toFixed(4));
      setCurrent(index);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// 3. Signature: real numbers count up on the Results slide
const metrics = [...document.querySelectorAll('[data-count]')];

function parseMetric(text) {
  const m = text.trim().match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const decimals = (m[2].split('.')[1] || '').length;
  return {
    prefix: m[1],
    suffix: m[3],
    decimals,
    grouped: m[2].includes(','),
    value: parseFloat(m[2].replace(/,/g, ''))
  };
}

function runCount(el, delay) {
  if (el.dataset.counted) return;
  el.dataset.counted = 'yes';
  const original = el.textContent;
  const p = parseMetric(original);
  const from = el.dataset.from ? parseFloat(el.dataset.from) : 0;
  if (!p || reduce || from === p.value) return;

  const show = (v) =>
    p.prefix +
    v.toLocaleString('en-CA', {
      minimumFractionDigits: p.decimals,
      maximumFractionDigits: p.decimals,
      useGrouping: p.grouped
    }) +
    p.suffix;

  const real = Object.assign(document.createElement('span'), {
    className: 'count-final',
    textContent: original
  });
  const live = Object.assign(document.createElement('span'), {
    className: 'count-live',
    textContent: show(from)
  });
  live.setAttribute('aria-hidden', 'true');
  el.textContent = '';
  el.append(real, live);
  el.classList.add('is-counting');

  const start = performance.now() + delay;
  (function frame(now) {
    const t = Math.min(1, Math.max(0, (now - start) / 800));
    // Hard brake easing (same character as --ease-cut)
    live.textContent = show(from + (p.value - from) * (1 - Math.pow(1 - t, 4)));
    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      el.textContent = original;
      el.classList.remove('is-counting');
    }
  })(start);
}

if (metrics.length && 'IntersectionObserver' in window) {
  const watcher = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          runCount(el, metrics.indexOf(el) * 120);
        } else if (entry.boundingClientRect.top < 0) {
          el.dataset.counted = 'yes';
        }
        watcher.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  metrics.forEach((el) => watcher.observe(el));
}

