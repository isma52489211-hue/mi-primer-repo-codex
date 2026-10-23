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

})();
