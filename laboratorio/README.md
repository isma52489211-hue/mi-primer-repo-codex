# Laboratorio web · IA aplicada

Rama de pruebas de diseño (`laboratorio-web-ia-aplicada`). **No se une a `main`.** Las ideas aprobadas se pasan a la web real más adelante, todas juntas y con las comprobaciones de siempre.

Cada experimento es una página independiente que usa las imágenes y la tipografía de la raíz. Se ve en un enlace privado de vista previa.

| Nº | Experimento | Archivo | Estado |
|---|---|---|---|
| 01 | Portada cinematográfica: titular palabra a palabra, partículas que reaccionan al ratón o al dedo, foto con inclinación 3D y tarjetas flotantes | `01-portada-cinematografica.html` | ✅ **Aprobado para pasar a la web** (29/10/2026) |
| 02 | Scroll narrativo: cada proyecto se cuenta en tres pasos (el reto, qué hice, qué tiene ahora) mientras la captura se queda fija y cambia | `02-scroll-narrativo.html` | ✅ **Aprobado para pasar a la web** (29/10/2026) |
| 03 | Proyectos en 3D: carrusel en profundidad que se desliza con el dedo, el ratón o las flechas; cada tarjeta se gira para contar el reto, qué hice y qué tiene ahora | `03-proyectos-3d.html` | ❓ En duda: le gusta, pero menos que el 02 (29/10/2026) |
| 04 | Cursor y microinteracciones: cursor propio, botones imán, tarjetas con brillo e inclinación, ondas al pulsar | `04-cursor-microinteracciones.html` | ⏸️ Aparcado: Ismael lo revisará en el ordenador (29/10/2026) |
| 05 | Modo claro y oscuro: interruptor animado (luna y sol), la página cambia con un círculo que se abre desde el botón; usa el modo del dispositivo y recuerda la elección | `05-modo-claro-oscuro.html` | ❓ En duda (29/10/2026) |
| 06 | Asistente simulado: chat de demostración con respuestas preparadas a partir de los textos de la web; se presenta como demostración y lleva siempre al contacto | `06-asistente-simulado.html` | ❓ En duda (29/10/2026) |

Ya se han hecho los seis experimentos propuestos.

## Al pasar algo aprobado a la web

- Adaptarlo a `index.html`, `styles.css` y `site.js` sin dependencias externas.
- Respetar las reglas de `CLAUDE.md`: nada animado con "reducir movimiento", texto mínimo de 12 px, enlaces táctiles de 44 px y tarjetas que no tapen la cara.
- Medir el rendimiento en móvil, porque las partículas consumen batería.
- Hacer las comprobaciones de siempre en las 7 páginas.
- Valorar la inclinación de la foto con el sensor del móvil. En la vista previa no se puede probar y el iPhone pide permiso al visitante.
