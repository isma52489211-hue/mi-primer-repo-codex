(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#main-nav');
  if (!header || !toggle || !nav) return;

  const mobile = window.matchMedia('(max-width: 1050px)');
  document.documentElement.classList.add('js');
  toggle.hidden = false;

  function setOpen(open, returnFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    toggle.querySelector('.menu-label').textContent = open ? 'Cerrar' : 'Menú';
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !mobile.matches) return;
    setOpen(false);
    const destination = document.getElementById(link.hash.slice(1));
    if (destination) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });

  document.addEventListener('click', event => {
    if (!header.contains(event.target) && mobile.matches) setOpen(false);
  });

  mobile.addEventListener('change', () => {
    const focused = document.activeElement;
    setOpen(false);
    // Keep focus on a visible control when the layout changes.
    if (mobile.matches && nav.contains(focused)) toggle.focus();
    if (!mobile.matches && focused === toggle) nav.querySelector('a').focus();
  });

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
  const markCurrent = id => {
    links.forEach(link => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const syncCurrent = () => {
    const threshold = header.getBoundingClientRect().height + 70;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= threshold) current = section;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    if (current) markCurrent(current.id);
  };
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => { syncCurrent(); scheduled = false; });
  }, { passive: true });
  window.addEventListener('resize', syncCurrent);
  syncCurrent();
})();
