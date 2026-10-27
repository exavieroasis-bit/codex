"""Build the ordinary hosted site and its self-contained offline counterpart."""
from pathlib import Path
from io import BytesIO
import base64
import json
import re
from PIL import Image

root = Path(__file__).resolve().parent
app_dir = root / 'app'
asset_dir = root / 'assets'
app_dir.mkdir(exist_ok=True)
asset_dir.mkdir(exist_ok=True)
regions = {'master': (0, 0, 1254, 1254), 'hat': (0, 0, 1254, 600),
           'glasses': (510, 420, 1080, 840), 'top': (0, 780, 1254, 1254), 'eye': (600, 420, 1000, 615), 'mouth': (640, 700, 1254, 980), 'scar': (550, 420, 910, 810)}
expected = ['master'] + ['hat-' + key for key in ['none', 'beanie', 'bucket', 'crown', 'cowboy', 'sailor', 'halo']] + ['glasses-' + key for key in ['none', 'shades', 'round', 'pixel', 'heart', 'monocle']] + ['top-' + key for key in ['none', 'varsity', 'tee', 'denim', 'suit', 'tank', 'aloha', 'mariner']]
expected += ['eye-' + key for key in ['sleepy', 'angry', 'wide', 'hearts', 'cyborg']]
expected += ['mouth-' + key for key in ['bored', 'grin', 'snarl', 'gold', 'bubble', 'cigar']]
expected += ['scar-' + key for key in ['cheek', 'claws', 'cross', 'lightning', 'bandage', 'eyebrow']]
expected += ['glasses-aviator', 'skin-tiger']
regions['skin'] = (570, 330, 1010, 820)
portraits = {}
hosted_portraits = {}
for key in expected:
    box = regions[key.split('-')[0]]
    if key == 'mouth-cigar':
        box = (640, 590, 1254, 980)
    path = root / 'lion-unified' / (key + '.png')
    if key == 'glasses-aviator':
        path = root / 'lion-unified' / 'master.png'
    with Image.open(path) as source:
        assert source.size == (1254, 1254), (key, source.size)
        # Packaging only: lossless region extraction keeps authored pixels exact.
        region = source.crop(box)
        encoded = BytesIO()
        region.save(encoded, format='WEBP', lossless=True, method=6)
        image_bytes = encoded.getvalue()
        (asset_dir / (key + '.webp')).write_bytes(image_bytes)
        dimensions = {'x': box[0], 'y': box[1], 'width': box[2] - box[0], 'height': box[3] - box[1]}
        portraits[key] = {'src': 'data:image/webp;base64,' + base64.b64encode(image_bytes).decode('ascii'), **dimensions}
        hosted_portraits[key] = {'src': 'assets/' + key + '.webp', **dimensions}

art_source = (root / 'lion-art.js').read_text()
assert art_source.count('__UNIFIED_PORTRAITS__') == 1
artwork = art_source.replace('__UNIFIED_PORTRAITS__', json.dumps(portraits, separators=(',', ':')))
assert '</script' not in artwork.lower()
template = (root / 'studio.template.html').read_text()
assert template.count('__LION_ART_SCRIPT__') == 1
standalone = template.replace('__LION_ART_SCRIPT__', artwork)
(root / 'PRIDE-Studio.html').write_text(standalone)

# The hosted page uses readable external programs and ordinary image files.
# Preserve the interface and application program exactly as in the template.
scripts = list(re.finditer(r'<script\b[^>]*>(.*?)</script\s*>', template, re.IGNORECASE | re.DOTALL))
assert len(scripts) == 2
assert '__LION_ART_SCRIPT__' in scripts[0].group(1)
assert '__LION_ART_SCRIPT__' not in scripts[1].group(1)
(app_dir / 'portrait-sources.js').write_text(
    '/* Ordinary same-origin artwork files for the hosted studio. */\n'
    'window.LionPortraitSources=' + json.dumps(hosted_portraits, separators=(',', ':')) + ';\n'
)
(app_dir / 'lion-art.js').write_text(art_source.replace('__UNIFIED_PORTRAITS__', 'window.LionPortraitSources'))
(app_dir / 'studio.js').write_text(scripts[1].group(1).strip() + '\n')
external_scripts = '\n'.join(
    '  <script src="app/' + name + '"></script>'
    for name in ['portrait-sources.js', 'lion-art.js', 'studio.js']
)
hosted = (
    template[:scripts[0].start()] + external_scripts
    + template[scripts[0].end():scripts[1].start()] + template[scripts[1].end():]
)
policy = (
    "default-src 'self'; script-src 'self'; img-src 'self' data: blob:; "
    "style-src 'self' 'unsafe-inline'; connect-src 'none'; object-src 'none'; "
    "base-uri 'self'; form-action 'none'"
)
charset = '<meta charset="utf-8">'
assert hosted.count(charset) == 1
hosted = hosted.replace(charset, charset + '\n  <meta http-equiv="Content-Security-Policy" content="' + policy + '">', 1)
hosted = '\n'.join(line.rstrip() for line in hosted.split('\n'))
assert '__LION_ART_SCRIPT__' not in hosted
assert '__UNIFIED_PORTRAITS__' not in hosted
assert 'base64,' not in hosted
(root / 'index.html').write_text(hosted)
print(f'Built hosted index.html ({len(hosted.encode()):,} bytes), three external scripts, and {len(hosted_portraits)} lossless artwork files.')
print(f'Built unchanged-format PRIDE-Studio.html ({len(standalone.encode()):,} bytes) with embedded artwork for offline use.')
