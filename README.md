# ISMAEL · IA APLICADA

Web personal de Ismael, empresario que se está especializando en inteligencia artificial aplicada a pequeños negocios.

## Ver la web

Abre `index.html` en un navegador. No requiere instalación ni compilación.

## Publicación y scripts

La web se publica con GitHub Pages desde la carpeta `docs` de la rama `main`.

- Preparar y validar: `python3 scripts/build.py`.
- Ver en tu ordenador: primero prepara la web y ejecuta `python3 scripts/preview.py`; abre `http://localhost:8000`.
- Subir una actualización: `bash scripts/publish.sh` (requiere acceso Git a este repositorio y permiso para actualizar `main`).

El script de preparación solo copia HTML y CSS a `docs`; los scripts y otros archivos del repositorio no se incluyen en la web publicada.

## Archivos

- `index.html`: Inicio, Sobre mí, Proyectos y Contacto.
- `styles.css`: diseño adaptable en negro y morado. Las fuentes de Google son opcionales; hay fuentes de sistema como alternativa.

Los proyectos se presentan como líneas de trabajo, sin casos de éxito inventados. Queda pendiente añadir un canal de contacto real y proyectos documentados.
