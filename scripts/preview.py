"""Vista previa local: python3 scripts/preview.py, después localhost:8000."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

root = Path(__file__).resolve().parent.parent
handler = partial(SimpleHTTPRequestHandler, directory=str(root / 'docs'))
print('Vista previa en http://localhost:8000 (Ctrl+C para detener)')
ThreadingHTTPServer(('127.0.0.1', 8000), handler).serve_forever()
