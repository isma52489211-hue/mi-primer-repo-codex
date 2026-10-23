# ISMAEL · IA APLICADA

Web personal de Ismael: gestión de pequeños negocios, marketing digital y creación de soluciones con apoyo de IA, con experiencia empresarial en el comercio de alimentación.

## Dirección de la web

https://isma52489211-hue.github.io/mi-primer-repo-codex/

Publicada con GitHub Pages desde `main`, carpeta `docs`.

## Servicios y portfolio

La página de Servicios desarrolla tres áreas:

- **Presencia digital y captación**: webs, marketing y contenido de marca, con enlaces a María Flores PNI y Pescaderías Adolfo.
- **Aplicaciones y control del negocio**: definición de requisitos, primeras versiones con IA y validación en la operativa, con Pescadería Contable como proyecto en desarrollo.
- **IA y automatizaciones**: definición de tareas y pruebas acotadas; agentes, Make, n8n e integraciones se mantienen como formación en curso.

Cada área explica la necesidad, qué puede aportar Ismael y cómo se revisaría el resultado. Incluye acceso rápido a cada área, proceso de trabajo, preguntas frecuentes sobre alcance y pruebas, y cierre hacia Contacto. Los ejemplos de necesidades son ilustrativos. No se publican precios, métricas ni garantías de resultados. El canal de contacto incluye el correo y el número facilitados por Ismael para su publicación.

La presentación se basa en el perfil aportado por Ismael: experiencia práctica en gestión, marketing y dirección de soluciones digitales con ayuda de IA. Se distingue esa experiencia de la formación técnica en curso. No se atribuye dominio autónomo de programación, arquitectura, ciberseguridad ni integraciones complejas, ni resultados comerciales no documentados.

Se explica el proceso de entender, concretar, construir/probar y evaluar.

## Menú y herramientas

La web tiene seis páginas independientes: Inicio (`index.html`), Servicios (`servicios.html`), Proyectos (`proyectos.html`), Herramientas (`herramientas.html`), Sobre mí (`sobre-mi.html`) y Contacto (`contacto.html`). El menú fijo enlaza esas páginas. Las preguntas frecuentes están en Servicios y Proyectos. En móvil se abre con un botón, se cierra al seleccionar un destino, al tocar fuera o con Escape, y conserva acceso por teclado. Sin JavaScript quedan visibles todos los enlaces. La página actual se indica en el menú, también sin JavaScript. Los enlaces antiguos compartidos con fragmentos desde Inicio se redirigen a su nueva página.

Herramientas agrupadas por IA/asistentes, automatización, webs/aplicaciones, marketing y productividad/datos. Se distingue uso habitual o práctico, uso acotado/con apoyo y formación:

- ChatGPT, ChatGPT Work/Codex, Claude: uso práctico o habitual. Microsoft Copilot se ha retirado de la lista: solo estaba en la formación y no es una herramienta de trabajo.
- Make y n8n: formación. Tareas programadas y conectores de ChatGPT (una sola ficha): uso práctico.
- Sites, Antigravity y WordPress: uso práctico. Vercel: con apoyo. GitHub y Hostinger: uso acotado.
- Meta Ads, Instagram, WhatsApp Business y Google Business Profile: experiencia práctica. Metricool se ha retirado de la lista.
- Google Workspace (Sheets, Gmail y Drive, en una sola ficha): uso práctico. Gemini se ubica junto a Workspace como "Gemini en el ecosistema de Google": uso personal y formación, para no dar a entender un dominio que no se ha declarado.

Las clasificaciones proceden de lo aportado por Ismael. Las herramientas solo investigadas o presentes en cursos quedan fuera de la lista de manejo. Agentes, API y MCP se presentan como conceptos y tecnologías en aprendizaje. No se atribuye dominio de Next.js, Tailwind o GSAP.

Proyectos:

1. **María Flores PNI** — https://mariaflorespni.com/ — creada por Ismael por su cuenta, publicada y operativa según su descripción.
2. **Pescaderías Adolfo** — https://pescaderiasadolfo.es/ — desarrollada con ayuda de IA, publicada y en mejora según Ismael.
3. **Pescadería Contable** — aplicación propia en desarrollo: preparación de jornada, existencias, compras, ventas, revisión de efectivo y tarjeta, histórico y copia de registros.

Los dos proyectos web se presentan con texto y enlaces, sin capturas, métricas ni funciones no verificadas. Sus dominios no pudieron inspeccionarse desde este entorno por restricciones de acceso. El texto se basa en lo aportado por Ismael.

La aplicación se presenta con un esquema explicativo, no con una demostración funcional. No se publican ubicaciones ni información de pruebas. El registro de las operaciones es manual; no se atribuyen funciones de IA ni un cálculo completo del beneficio.

## Scripts

No requiere dependencias ni compilación. `site.js` gestiona el menú móvil, la compatibilidad con enlaces antiguos y la apertura de categorías del catálogo de herramientas. Usa fuentes de sistema y no incluye analítica, cookies ni formularios de recogida de datos.

- Preparar y validar: `python3 scripts/build.py`.
- Vista previa: `python3 scripts/preview.py`; abrir `http://localhost:8000`.
- Publicar: `bash scripts/publish.sh`. Desde `main` actualiza la web; desde cualquier otra rama solo sube esa rama y avisa de que hay que unirla a `main` con una solicitud de cambios (pull request). Así nunca se publica algo sin revisar por accidente.

Editar los archivos HTML correspondientes, `styles.css` y `site.js`; después ejecutar el script de preparación. El script comprueba las seis páginas, los recursos y los destinos de enlaces antes de copiar los archivos públicos. Solo `docs/` se sirve como web pública. También puedes abrir `index.html` directamente en tu navegador.

## Desarrollo por etapas

Inicio se ha desarrollado como una portada breve con cuatro bloques: presentación, tres áreas de ayuda, resumen de los tres proyectos y cierre hacia Contacto. El detalle de las otras páginas se ha trasladado desde la web anterior, sin ampliar sus servicios ni atribuir nuevos resultados.

Servicios se ha desarrollado con las tres áreas acordadas. Proyectos ya presenta contexto, aportación y estado de los tres trabajos, accesos rápidos, enlaces a las webs publicadas y el funcionamiento de Pescadería Contable. La presentación se basa en lo aportado por Ismael: no añade métricas, testimonios, capturas ni funciones no comprobadas. Herramientas se ha desarrollado con explicación de niveles, accesos a las cinco categorías, usos prácticos y formación en curso. Las 18 fichas conservan sus niveles (dentro de cada grupo, primero el uso práctico y después la formación); los enlaces de categorías abren su grupo y admiten acceso directo por fragmento. Sobre mí ya desarrolla la experiencia de negocio, el trabajo en marketing, los criterios de utilidad y coste y la formación técnica en curso, con enlaces a proyectos y herramientas. No añade fechas, cargos ni una imagen personal no facilitados. La formación se presenta como "terminando el máster en IA de BIG school", sin añadir titulación ni universidad asociada: cuando Ismael lo termine y pueda acreditarlo, se podrá actualizar con el título real. Hasta entonces no debe afirmarse que ya lo tiene. Contacto ya ofrece correo, WhatsApp y llamada con los datos facilitados expresamente por Ismael. El número se presenta con prefijo español +34. Los enlaces preparan el contacto; la web no envía mensajes ni almacena datos. Las seis páginas están desarrolladas. No volver a reunir todo el contenido en Inicio. Mantener negro y morado, el perfil honesto, los proyectos y los niveles de experiencia ya acordados.

## Código y teclado

Los HTML llevan un salto de línea en cada bloque estructural (`section`, `article`, `nav`, `details`, listas…) para que los cambios se lean bien en GitHub. Se comprobó que el reformateo no alteró nada visible: 21 capturas (7 páginas × 3 tamaños) idénticas píxel a píxel. Al editar, no insertar saltos de línea entre elementos en línea (`<a>`, `<span>`): añadirían espacios visibles.

En Herramientas, al pulsar una categoría se abre su grupo, la página baja hasta él y el foco del teclado queda en su título. Sin JavaScript, un enlace directo a una categoría (`herramientas.html#marketing`) la muestra gracias a `::details-content`, en los navegadores que lo admiten.

## Legibilidad

Ningún texto de la web baja de 12 px (antes había etiquetas de 9 a 11 px). Si se añade CSS nuevo, mantener ese mínimo.

En pantallas táctiles y en móvil (`pointer:coarse` o menos de 760 px) los enlaces y botones independientes miden al menos 44 px de alto. Los enlaces dentro de un párrafo quedan como están.

## Aviso legal y privacidad

`aviso-legal.html` reúne los datos del titular exigidos por el artículo 10 de la LSSI, las condiciones de uso, la política de privacidad de los contactos por correo, WhatsApp y teléfono, y la información sobre cookies y alojamiento en GitHub Pages. Se enlaza desde el pie de todas las páginas y no se indexa en buscadores.

Los datos del titular (nombre, NIF y domicilio) están completados con los facilitados por Ismael, como autónomo. `scripts/build.py` se detiene si en alguna página queda un marcador `PENDIENTE`, para no publicar nunca información incompleta. El texto es una base general: conviene que lo revise un asesor.

## Identidad y vista previa al compartir

Marca mínima, sin manual de marca: paleta `#101014` (fondo), `#b497ff` (morado) y `#f4f2f8` (texto), tipografía del sistema y el punto morado del logotipo "ISMAEL · IA APLICADA". El icono es una "I" blanca con ese punto morado (`favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`). `og-image.png` (1200×630) es la tarjeta que aparece al compartir el enlace en WhatsApp, LinkedIn y otras redes.

Cada página lleva sus etiquetas Open Graph y su `canonical` con la dirección de GitHub Pages. **Si la web cambia de dirección (por ejemplo, a un dominio propio), hay que actualizar esas URL absolutas** en los siete HTML. Las redes sociales guardan en caché la tarjeta: tras cambiarla, hay que volver a analizar el enlace en sus depuradores.

## Buscadores

`scripts/build.py` genera `docs/sitemap.xml` con las páginas indexables (todas menos el aviso legal, que lleva `noindex`), así que no hay que mantenerlo a mano.

No hay `robots.txt` a propósito: los buscadores solo lo leen en la raíz del dominio (`isma52489211-hue.github.io/robots.txt`) y esta web vive en la subcarpeta `/mi-primer-repo-codex/`, así que un archivo aquí no tendría ningún efecto. Si algún día la web pasa a un dominio propio, ya se podrá añadir. Para que Google encuentre el sitemap hay que enviarlo desde Google Search Console.

## Pendientes acordados

1. **Comprar un dominio propio.** Recomendación: un `.es` en DonDominio (unos 7 €/año, mismo precio al renovar; confirmar en el carrito). No contratar hosting: GitHub Pages admite dominio propio gratis. Al tenerlo: configurar el DNS y el archivo `CNAME`, cambiar la constante `SITE` de `scripts/build.py` y las etiquetas `canonical` y Open Graph de los HTML, dar de alta la web en Google Search Console y enviar el sitemap, y valorar un correo con el dominio.
2. **Oferta concreta (punto 3 de la auditoría).** Definir uno o dos servicios cerrados que Ismael pueda entregar sin dudar (por ejemplo, una web de presentación para un comercio local), con plazos o precio orientativo si quiere publicarlos, y presentarlos en Servicios.
3. **Mejoras visuales** (en curso): iconos, fotografía propia, capturas reales de los proyectos, fondos y tarjetas. Criterios: ligereza, sin imágenes de archivo genéricas de IA y sin capturas ni cifras que no sean reales.

## Próximas mejoras

Incorporar capturas o una demostración cuando estén disponibles y documentar resultados solo si se pueden verificar.
