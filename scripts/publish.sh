#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")/.."
python3 scripts/build.py
git diff --check
git add -- index.html styles.css docs scripts README.md
if ! git diff --cached --quiet; then
  git commit -m "Actualizar web de Ismael IA Aplicada"
fi
git push origin HEAD:main
echo "Archivos publicados. GitHub Pages actualizará la web si está habilitado para main /docs."
