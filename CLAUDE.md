# Web de Ismael · IA Aplicada

Web personal y portfolio de Ismael (marca "ISMAEL · IA APLICADA"): soluciones digitales para pequeños negocios con experiencia de negocio e IA aplicada. Publicada en https://isma52489211-hue.github.io/mi-primer-repo-codex/ con GitHub Pages desde `main`, carpeta `docs/`.

**Lee el README antes de empezar**: describe cada página, las decisiones tomadas y la sección "Pendientes acordados" con lo siguiente que hay que hacer.

## Cómo trabajar con Ismael

- Responde siempre en español, claro y sin tecnicismos innecesarios. Ismael no es programador: trabaja con IA, aprende mientras construye y valida cada cambio.
- Una acción concreta cada vez y espera su resultado (a menudo envía capturas del móvil). Parte de lo que muestra la pantalla.
- Sé crítico y honesto: si algo es mejorable o una idea suya no conviene, dilo y explica por qué. Cuando haya alternativas, compáralas y recomienda una.
- Para decisiones de gusto (logo, tipografía, portada), prepara 3 o 4 opciones visuales reales (capturas de prototipos) y deja que elija.
- No inventes funciones, botones, datos ni capacidades. Verifica en fuentes actuales lo que pueda haber cambiado (precios, herramientas, normativa).
- Al terminar cada tarea, resume qué se hizo, qué se comprobó, qué queda y cuál es el siguiente paso.

## Reglas de contenido (no negociables)

- **El cliente es el centro.** Los textos hablan de lo que necesita y consigue el cliente, no de Ismael. En proyectos: "El reto", "Qué hice" y "Qué tiene ahora"; nada de "qué aporta a mi experiencia". Cada página lleva al contacto (botón "Cuéntame tu idea" y WhatsApp).
- Nada inventado: ni cifras, ni testimonios, ni resultados, ni capturas falsas. Si una frase no se puede respaldar, se suaviza (por ejemplo, "Webs claras y rápidas" en lugar de "Webs que convierten").
- Formación: "Estoy terminando el máster en IA de BIG school". No decir que ya lo tiene hasta que lo termine y lo confirme.
- Experiencia: conoce la pescadería desde dentro; otros comercios de alimentación se presentan como "parecidos", no como experiencia directa.
- Herramientas: se respetan los niveles declarados (uso práctico, uso acotado o con apoyo, formación). Agentes, Make, n8n, API y MCP figuran como aprendizaje.
- Proyectos: María Flores PNI (web hecha por él, publicada), Pescaderías Adolfo (web hecha con ayuda de IA, publicada y en mejora) y Pescadería Contable (app propia en local, en desarrollo; calcula el beneficio neto del día sin gastos generales). Las capturas de la app usan datos inventados; nunca cifras reales del negocio.
- Personas en imágenes: María Flores y el personal de Pescaderías Adolfo dieron permiso. Para cualquier imagen nueva con personas, confirmar el permiso.
- El aviso legal (`aviso-legal.html`) contiene datos reales del titular; no cambiarlos sin que él lo pida. `build.py` se detiene si una página contiene "PENDIENTE".

## Estructura

- Servicios actualizados: cuatro áreas principales — web/tienda, negocio conectado, marketing y captación, digitalización y aplicaciones — y una tarjeta secundaria de IA y automatizaciones en exploración. No prometer cifras de ventas ni resultados de campañas. Los informes y el mantenimiento se ofrecen solo con alcance acordado.
- Páginas de trabajo en la raíz: `index.html`, `servicios.html`, `proyectos.html`, `herramientas.html`, `sobre-mi.html`, `contacto.html`, `aviso-legal.html`, más `styles.css` y `site.js`. No hay frameworks ni dependencias.
- `docs/` se genera con `python3 scripts/build.py`: nunca se edita a mano.
- `scripts/build.py`: valida enlaces, anclas, imágenes, un solo `h1` por página y que no haya "PENDIENTE"; copia los archivos públicos (lista `PAGES` y `ASSETS`) a `docs/`, añade huella de versión a `styles.css` y `site.js` y genera `sitemap.xml`. Cada archivo nuevo publicable se añade a `ASSETS` y a la lista de `scripts/publish.sh`.
- `scripts/preview.py`: vista previa en http://localhost:8000.

## Sistema visual

- Fondo `#101014`, morado `#b497ff`, texto `#f4f2f8`, gris `#b1abba`. Acentos: turquesa `#7fd3e6` y coral `#ff9d8a` (degradado de títulos morado → turquesa → coral). Verde de WhatsApp `#a3d8bb`.
- Tipografía Geist alojada en la web (`geist.woff2`); nada de Google Fonts ni recursos externos: el aviso legal dice que no hay terceros.
- Todo en tarjetas (`glow-card`: brillo que sigue al ratón y elevación), iconos Lucide integrados en el HTML con `width`/`height`, fondo "aurora" en todas las páginas, revelado al hacer scroll (`animation-timeline: view()`), transiciones entre páginas (`@view-transition`).
- Texto mínimo 12 px; enlaces táctiles de al menos 44 px en móvil.
- Con "reducir movimiento" no puede haber ninguna animación.
- Imágenes en WebP sin metadatos, con versión de 640/480 px para móvil vía `srcset`.

## Errores ya conocidos (no repetir)

- No insertar saltos de línea entre elementos en línea (`<a>`, `<span>`): añaden espacios visibles.
- Los elementos situados al final de una página no deben llevar revelado al hacer scroll: en pantallas altas se quedan semitransparentes.
- Una animación que usa `translate` anula cualquier `translate` de posicionamiento del mismo elemento.
- Las tarjetas flotantes de la portada no deben tapar la cara de Ismael, sobre todo en móvil.
- En capturas de página completa con Playwright, las imágenes con `loading="lazy"` salen vacías: no es un fallo de la web.

## Flujo de trabajo

1. Trabajar en la rama de la sesión; si la solicitud de cambios anterior ya se unió, partir de `origin/main` actualizado.
2. Editar los archivos de la raíz y ejecutar `python3 scripts/build.py`.
3. Comprobar antes de publicar: en Chromium (Playwright, ejecutable `/opt/pw-browsers/chromium`), las 7 páginas en móvil (390 px), tablet (820 px) y escritorio (1440 px): sin desbordes, sin errores de consola, sin texto menor de 12 px, contraste sin fallos con axe-core una vez revelado el contenido, nada animado con "reducir movimiento". Revisar capturas visuales de lo que cambie.
4. `git diff --check`, commit con mensaje en español, push y abrir solicitud de cambios solo cuando Ismael lo pida.
5. Ismael la une desde GitHub en el móvil ("Merge pull request" → "Confirm merge"). Recordarle que **no pulse "Delete branch"**.
6. `scripts/publish.sh` publica solo desde `main`; desde otra rama sube la rama y avisa.

## Si cambia la dirección de la web

Con dominio propio: actualizar la constante `SITE` de `scripts/build.py` y las etiquetas `canonical` y Open Graph de los 7 HTML, configurar el DNS y el archivo `CNAME`, dar de alta la web en Google Search Console y enviar el sitemap.
