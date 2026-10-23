(() => {
  // Preserve links shared before the site was split into separate pages.
  if (document.body.dataset.page === 'inicio') {
    const legacy = {
      servicios: 'servicios.html', metodo: 'servicios.html#metodo',
      proyectos: 'proyectos.html', webs: 'proyectos.html#webs',
      pescaderia: 'proyectos.html#pescaderia', 'como-funciona': 'proyectos.html#como-funciona',
      herramientas: 'herramientas.html', 'sobre-mi': 'sobre-mi.html',
      preguntas: 'servicios.html#preguntas', 'preguntas-titulo': 'servicios.html#preguntas', contacto: 'contacto.html'
    };
    const destination = legacy[window.location.hash.slice(1)];
    if (destination) {
      window.location.replace(new URL(destination, window.location.href));
      return;
    }
  }
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
    const link = event.target.closest('a');
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

  // Category links also open the corresponding native disclosure.
  if (document.body.dataset.page === 'herramientas') {
    const openToolGroup = (id, focus = false) => {
      const group = document.getElementById(id);
      if (!group || !group.classList.contains('tool-group')) return;
      group.open = true;
      if (focus) group.querySelector('summary').focus({ preventScroll: true });
    };
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', event => {
        const group = document.getElementById(link.hash.slice(1));
        if (!group || !group.classList.contains('tool-group')) return;
        // Sin preventDefault, el salto al ancla le quita el foco al resumen.
        event.preventDefault();
        history.pushState(null, '', link.hash);
        openToolGroup(group.id);
        group.scrollIntoView();
        group.querySelector('summary').focus({ preventScroll: true });
      });
    });
    window.addEventListener('hashchange', () => openToolGroup(window.location.hash.slice(1)));
    openToolGroup(window.location.hash.slice(1));
  }

  // Glow that follows the pointer on cards and on the home background (mouse only, motion allowed).
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (finePointer.matches && !reducedMotion.matches) {
    const home = document.body.dataset.page === 'inicio' ? document.querySelector('main') : null;
    let frame = 0;
    let last = null;
    document.addEventListener('pointermove', event => {
      last = event;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const card = last.target.closest('.glow-card');
        if (card) {
          const box = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${last.clientX - box.left}px`);
          card.style.setProperty('--my', `${last.clientY - box.top}px`);
        }
        if (home) {
          const box = home.getBoundingClientRect();
          home.style.setProperty('--hx', `${last.clientX - box.left}px`);
          home.style.setProperty('--hy', `${last.clientY - box.top}px`);
        }
      });
    }, { passive: true });
  }
})();
