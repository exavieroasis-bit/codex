"""Build the dependency-free, single-file lion PFP studio."""
from pathlib import Path
import base64

root = Path(__file__).resolve().parent
template = (root / 'studio.template.html').read_text()
modules = ['lion-mane-geometry.js', 'lion-atelier-geometry.js', 'lion-premium-face.js', 'lion-premium-traits.js', 'lion-regal.js', 'lion-atelier.js', 'lion-art.js']
artwork = '\n'.join((root / name).read_text() for name in modules)
base = root / 'lion-base.png'
image = 'data:image/png;base64,' + base64.b64encode(base.read_bytes()).decode('ascii')
assert artwork.count('__PREMIUM_LION_BASE__') == 1
artwork = artwork.replace('__PREMIUM_LION_BASE__', image)
for token,filename in [('__ATELIER_WEARABLES__','lion-wearables.png'),('__ATELIER_WARDROBE__','lion-wardrobe.png'),('__REGAL_CAP__','lion-regal-cap.png'),('__REGAL_GLASSES__','lion-regal-glasses.png'),('__REFINED_MANE__','lion-refined-mane.png')]:
    assert artwork.count(token)==1
    artwork=artwork.replace(token,'data:image/png;base64,'+base64.b64encode((root/filename).read_bytes()).decode('ascii'))
assert template.count('__LION_ART_SCRIPT__') == 1
assert '</script' not in artwork.lower(), 'Artwork source must be safe to inline'
output = template.replace('__LION_ART_SCRIPT__', artwork)
(root / 'index.html').write_text(output)
print(f'Built index.html ({len(output.encode()):,} bytes); all scripts, styles, and artwork embedded.')
