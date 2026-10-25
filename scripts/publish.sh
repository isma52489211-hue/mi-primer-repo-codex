#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")/.."
python3 scripts/build.py
git diff --check
git add -- index.html servicios.html proyectos.html herramientas.html sobre-mi.html contacto.html aviso-legal.html favicon.svg favicon-32.png apple-touch-icon.png og-image.png LICENSE-lucide.txt geist.woff2 LICENSE-geist.txt ismael-720.webp ismael-480.webp captura-maria-1080.webp captura-maria-640.webp captura-adolfo-1080.webp captura-adolfo-640.webp captura-app-apertura-1080.webp captura-app-apertura-640.webp captura-app-cierre-1080.webp captura-app-cierre-640.webp styles.css site.js docs scripts README.md
if ! git diff --cached --quiet; then
  git commit -m "Actualizar web de Ismael IA Aplicada"
fi
branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" = "main" ]; then
  git push origin main
  echo "Archivos publicados. GitHub Pages actualizará la web (main, carpeta docs) en uno o dos minutos."
else
  # Fuera de main no se publica directamente: se sube la rama y se une con una solicitud de cambios.
  git push -u origin "$branch"
  echo "Rama $branch subida. La web NO se ha actualizado: abre una solicitud de cambios (pull request) hacia main y únela para publicar."
fi
