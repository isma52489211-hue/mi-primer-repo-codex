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

  // Portada: partículas que reaccionan al puntero y foto con inclinación 3D.
  const hero = document.querySelector('.hero-cine');
  if (hero) {
    const reduce = reducedMotion.matches;
    const canvas = hero.querySelector('.hero-particles');
    const ctx = canvas.getContext('2d');
    const colors = ['180,151,255', '127,211,230', '255,157,138'];
    const pointer = { x: 0, y: 0, active: false };
    let w = 0, h = 0, dots = [], visible = true;

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.width; h = box.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.round((w * h) / (w < 600 ? 12000 : 9500)));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.6 + .6, c: colors[Math.floor(Math.random() * 3)]
      }));
      if (reduce) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const link = w < 600 ? 95 : 130, reach = w < 600 ? 120 : 170;
      for (const d of dots) {
        if (!reduce) {
          const dx = d.x - pointer.x, dy = d.y - pointer.y, dist = Math.hypot(dx, dy);
          if (pointer.active && dist < reach && dist > 0) {
            const f = (1 - dist / reach) * 1.4;
            d.x += dx / dist * f; d.y += dy / dist * f;
          }
          d.x += d.vx; d.y += d.vy;
          if (d.x < 0 || d.x > w) d.vx *= -1;
          if (d.y < 0 || d.y > h) d.vy *= -1;
        }
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283);
        ctx.fillStyle = `rgba(${d.c},.8)`; ctx.fill();
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j], dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < link) {
            ctx.strokeStyle = `rgba(${a.c},${(1 - dist / link) * .22})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        if (pointer.active) {
          const dist = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          if (dist < reach * 1.25) {
            ctx.strokeStyle = `rgba(${a.c},${(1 - dist / (reach * 1.25)) * .55})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
          }
        }
      }
    };

    const tilt = hero.querySelector('.hero-tilt');
    const glare = hero.querySelector('.hero-glare');
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const aim = (nx, ny) => {
      tx = Math.max(-1, Math.min(1, nx)); ty = Math.max(-1, Math.min(1, ny));
      tilt.classList.remove('auto');
    };
    const aimAt = (clientX, clientY) => {
      const box = tilt.getBoundingClientRect();
      aim(((clientX - box.left) / box.width - .5) * 2, ((clientY - box.top) / box.height - .5) * 2);
    };
    const setPointer = (clientX, clientY) => {
      const box = canvas.getBoundingClientRect();
      pointer.x = clientX - box.left; pointer.y = clientY - box.top; pointer.active = true;
    };

    const frame = () => {
      if (!visible) return;
      draw();
      cx += (tx - cx) * .08; cy += (ty - cy) * .08;
      if (!tilt.classList.contains('auto')) {
        // En una columna la foto es más estrecha: menos giro para que las tarjetas no se acerquen a la cara.
        const amp = mobile.matches ? .55 : 1;
        tilt.style.setProperty('--ry', `${(cx * 14 * amp).toFixed(2)}deg`);
        tilt.style.setProperty('--rx', `${(-cy * 11 * amp).toFixed(2)}deg`);
        glare.style.setProperty('--gx', `${50 + cx * 45}%`);
        glare.style.setProperty('--gy', `${40 + cy * 45}%`);
      }
      requestAnimationFrame(frame);
    };

    let resizeTimer = 0;
    window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150); });
    resize();

    if (!reduce) {
      tilt.classList.add('auto');
      hero.addEventListener('pointermove', event => setPointer(event.clientX, event.clientY), { passive: true });
      hero.addEventListener('pointerleave', () => { pointer.active = false; });
      document.addEventListener('pointermove', event => {
        if (event.pointerType === 'mouse') aimAt(event.clientX, event.clientY);
      }, { passive: true });
      hero.addEventListener('touchmove', event => {
        const t = event.touches[0];
        setPointer(t.clientX, t.clientY); aimAt(t.clientX, t.clientY);
      }, { passive: true });
      hero.addEventListener('touchend', () => { pointer.active = false; tx = 0; ty = 0; });
      // En Android la foto sigue la inclinación del móvil. En iPhone haría falta pedir permiso, así que flota sola.
      if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
        let baseBeta = null;
        window.addEventListener('deviceorientation', event => {
          if (event.beta === null || event.gamma === null) return;
          if (baseBeta === null) baseBeta = event.beta;
          aim(event.gamma / 25, (event.beta - baseBeta) / 25);
        });
      }
      new IntersectionObserver(([entry]) => {
        const was = visible;
        visible = entry.isIntersecting && !document.hidden;
        if (visible && !was) requestAnimationFrame(frame);
      }).observe(hero);
      document.addEventListener('visibilitychange', () => {
        const was = visible;
        visible = !document.hidden && hero.getBoundingClientRect().bottom > 0;
        if (visible && !was) requestAnimationFrame(frame);
      });
      requestAnimationFrame(frame);
    }
  }
})();
