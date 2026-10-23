"""Valida y prepara únicamente los archivos públicos para GitHub Pages."""
from html.parser import HTMLParser
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent.parent

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'a':
            self.links.append(attrs.get('href', ''))

def main():
    page = Page()
    page.feed((ROOT / 'index.html').read_text())
    if len(page.ids) != len(set(page.ids)):
        raise ValueError('Hay identificadores duplicados')
    for link in page.links:
        if link.startswith('#') and link[1:] not in page.ids:
            raise ValueError(f'Enlace interno roto: {link}')
    output = ROOT / 'docs'
    output.mkdir(exist_ok=True)
    for name in ('index.html', 'styles.css', 'site.js'):
        shutil.copyfile(ROOT / name, output / name)
    (output / '.nojekyll').touch()
    print('Web validada y preparada en docs/')

if __name__ == '__main__':
    main()
