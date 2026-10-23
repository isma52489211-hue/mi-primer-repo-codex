"""Valida las páginas y copia únicamente los archivos públicos a docs/."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import shutil

ROOT = Path(__file__).resolve().parent.parent
PAGES = ('index.html', 'servicios.html', 'proyectos.html', 'herramientas.html', 'sobre-mi.html', 'contacto.html')
PUBLIC_FILES = (*PAGES, 'styles.css', 'site.js')

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.references = []
        self.headings = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'h1':
            self.headings += 1
        attribute = 'href' if tag in ('a', 'link') else 'src' if tag == 'script' else None
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
    for name in PUBLIC_FILES:
        shutil.copyfile(ROOT / name, output / name)
    (output / '.nojekyll').touch()
    print(f'{len(PAGES)} páginas validadas: enlaces, destinos internos, estilos y JavaScript. Web preparada en docs/.')


if __name__ == '__main__':
    main()
