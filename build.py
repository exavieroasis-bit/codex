"""Embed lossless in-situ portrait regions into the standalone studio."""
from pathlib import Path
from io import BytesIO
import base64
import json
from PIL import Image

root = Path(__file__).resolve().parent
regions = {'master': (0, 0, 1254, 1254), 'hat': (0, 0, 1254, 600),
           'glasses': (510, 420, 1080, 840), 'top': (0, 780, 1254, 1254), 'eye': (600, 420, 1000, 615), 'mouth': (640, 700, 1254, 980), 'scar': (550, 420, 910, 810)}
expected = ['master'] + ['hat-' + key for key in ['none', 'beanie', 'bucket', 'crown', 'cowboy', 'sailor', 'halo']] + ['glasses-' + key for key in ['none', 'shades', 'round', 'pixel', 'heart', 'monocle']] + ['top-' + key for key in ['none', 'varsity', 'tee', 'denim', 'suit', 'tank', 'aloha', 'mariner']]
expected += ['eye-' + key for key in ['sleepy', 'angry', 'wide', 'hearts', 'cyborg']]
expected += ['mouth-' + key for key in ['bored', 'grin', 'snarl', 'gold', 'bubble', 'cigar']]
expected += ['scar-' + key for key in ['cheek', 'claws', 'cross', 'lightning', 'bandage', 'eyebrow']]
expected += ['glasses-aviator', 'skin-tiger']
regions['skin'] = (570, 330, 1010, 820)
portraits = {}
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
        portraits[key] = {'src': 'data:image/webp;base64,' + base64.b64encode(encoded.getvalue()).decode('ascii'),
                          'x': box[0], 'y': box[1], 'width': box[2] - box[0], 'height': box[3] - box[1]}
modules = ['lion-art.js']
artwork = '\n'.join((root / name).read_text() for name in modules)
assert artwork.count('__UNIFIED_PORTRAITS__') == 1
artwork = artwork.replace('__UNIFIED_PORTRAITS__', json.dumps(portraits, separators=(',', ':')))
assert '</script' not in artwork.lower()
template = (root / 'studio.template.html').read_text()
assert template.count('__LION_ART_SCRIPT__') == 1
output = template.replace('__LION_ART_SCRIPT__', artwork)
(root / 'index.html').write_text(output)
(root / 'PRIDE-Studio.html').write_text(output)
print(f'Built index.html ({len(output.encode()):,} bytes); {len(portraits)} lossless in-situ portrait sources embedded.')
