# Laboratorio web · IA aplicada

Rama de pruebas de diseño (`laboratorio-web-ia-aplicada`). **No se une a `main`.** Las ideas aprobadas se pasan a la web real más adelante, todas juntas y con las comprobaciones de siempre.

Cada experimento es una página independiente que usa las imágenes y la tipografía de la raíz. Se ve en un enlace privado de vista previa.

| Nº | Experimento | Archivo | Estado |
|---|---|---|---|
| 01 | Portada cinematográfica: titular palabra a palabra, partículas que reaccionan al ratón o al dedo, foto con inclinación 3D y tarjetas flotantes | `01-portada-cinematografica.html` | ✅ **Aprobado para pasar a la web** (29/10/2026) |
| 04 | Cursor y microinteracciones: cursor propio, botones imán, tarjetas con brillo e inclinación, ondas al pulsar | `04-cursor-microinteracciones.html` | 🧪 En prueba |

Experimentos propuestos que aún no se han hecho: 02 scroll narrativo, 03 proyectos en 3D, 05 modo claro/oscuro, 06 asistente simulado.

## Al pasar algo aprobado a la web

- Adaptarlo a `index.html`, `styles.css` y `site.js` sin dependencias externas.
- Respetar las reglas de `CLAUDE.md`: nada animado con "reducir movimiento", texto mínimo de 12 px, enlaces táctiles de 44 px y tarjetas que no tapen la cara.
- Medir el rendimiento en móvil, porque las partículas consumen batería.
- Hacer las comprobaciones de siempre en las 7 páginas.
- Valorar la inclinación de la foto con el sensor del móvil. En la vista previa no se puede probar y el iPhone pide permiso al visitante.
