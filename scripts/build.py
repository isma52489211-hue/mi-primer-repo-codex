"""Valida las páginas y copia únicamente los archivos públicos a docs/."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import hashlib
import shutil

ROOT = Path(__file__).resolve().parent.parent
PAGES = ('index.html', 'servicios.html', 'proyectos.html', 'herramientas.html', 'sobre-mi.html', 'contacto.html', 'aviso-legal.html')
SITE = 'https://isma52489211-hue.github.io/mi-primer-repo-codex/'
ASSETS = ('favicon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'og-image.png', 'LICENSE-lucide.txt', 'geist.woff2', 'LICENSE-geist.txt', 'ismael-720.webp', 'ismael-480.webp', 'ismael-avatar.webp')
PUBLIC_FILES = (*PAGES, 'styles.css', 'site.js', *ASSETS)

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.references = []
        self.headings = 0
        self.text = ''

    def handle_data(self, data):
        self.text += data

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'h1':
            self.headings += 1
        attribute = 'href' if tag in ('a', 'link') else 'src' if tag in ('script', 'img') else None
        if attribute and attribute in attrs:
            self.references.append(attrs[attribute])


def main():
    parsed = {}
    for name in PAGES:
        page = Page()
        page.feed((ROOT / name).read_text())
        if len(page.ids) != len(set(page.ids)):
            raise ValueError(f'{name}: identificadores duplicados')
        if page.headings != 1:
            raise ValueError(f'{name}: debe haber un título principal')
        if 'PENDIENTE' in page.text:
            raise ValueError(f'{name}: quedan datos PENDIENTES; complétalos antes de publicar')
        parsed[name] = page

    for name, page in parsed.items():
        for reference in page.references:
            url = urlsplit(reference)
            if url.scheme or url.netloc:
                continue
            target = unquote(url.path) or name
            if target not in PUBLIC_FILES:
                raise ValueError(f'{name}: recurso público desconocido: {reference}')
            if not (ROOT / target).is_file():
                raise ValueError(f'{name}: no existe {target}')
            if url.fragment and (target not in parsed or unquote(url.fragment) not in parsed[target].ids):
                raise ValueError(f'{name}: destino inexistente: {reference}')

    output = ROOT / 'docs'
    output.mkdir(exist_ok=True)
    # Versioned CSS/JS links: a browser never combines new HTML with a cached old stylesheet.
    versions = {name: hashlib.sha256((ROOT / name).read_bytes()).hexdigest()[:10] for name in ('styles.css', 'site.js')}
    for name in PUBLIC_FILES:
        if name in PAGES:
            html = (ROOT / name).read_text()
            html = html.replace('href="styles.css"', f'href="styles.css?v={versions["styles.css"]}"')
            html = html.replace('src="site.js"', f'src="site.js?v={versions["site.js"]}"')
            (output / name).write_text(html)
        else:
            shutil.copyfile(ROOT / name, output / name)
    (output / '.nojekyll').touch()

    # El sitemap se genera con las páginas indexables: así nunca queda desfasado.
    urls = []
    for name in PAGES:
        if 'noindex' in (ROOT / name).read_text():
            continue
        urls.append(SITE if name == 'index.html' else SITE + name)
    entries = ''.join(f'  <url><loc>{url}</loc></url>\n' for url in urls)
    (output / 'sitemap.xml').write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entries + '</urlset>\n')
    print(f'{len(PAGES)} páginas validadas: enlaces, destinos internos, estilos y JavaScript. Web preparada en docs/ con sitemap de {len(urls)} páginas.')


if __name__ == '__main__':
    main()
