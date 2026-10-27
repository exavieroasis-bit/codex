# PRIDE. — Lion PFP Studio

An original illustrated lion collectible generator. The blue lion, flowing mane, three-quarter pose, and existing studio layout are retained. Headwear, eyewear, clothing, and facial traits are now painted on the character: each variation includes the surrounding fur, compressed hat seat, seated bridge and temples, or mane crossing the collar.

The renderer replaces broad anatomical regions instead of scaling isolated accessory cutouts over a fixed photograph. It blends complementary premultiplied colors without opening an alpha gap. Skin colors change the cyan fur pigment while preserving fabric and metal colors. Eyes, mouths, and scars also use localized, in-situ painted variations. Iris colors change the existing painted pigment, preserving the original eyelids, pupil shape, and highlights. The live preview, full-art view, saved thumbnails, and exports all use the finished flattened image.

## Open the studio

The root `index.html` is a conventional hosted web application with separate JavaScript in `app/` and lossless artwork in `assets/`. Serve these files together over HTTP(S), including under a repository subpath such as `/codex/`. No account, wallet, installer, or ZIP is needed to use the hosted application. GitHub Pages must actually complete its deployment before its address will work; the published address has not been verified from this session.

A user reported an antivirus warning for `PRIDE-Studio.zip`. Its source and contents have been reviewed, but the antivirus detection remains unresolved. Keep the protection enabled; see [DOWNLOAD-REVIEW.md](DOWNLOAD-REVIEW.md) for the exact archive hash, findings, and limits of that review. The archive has been retained unchanged for comparison.

`PRIDE-Studio.html` is the separate, self-contained offline build. The normal hosted `index.html` should not be opened through `file://`, because browser origin rules can prevent canvas exports with separate local image files. A workspace code viewer does not run either application.

## Create and export

- Select backgrounds, skins, hats, glasses, eye types, eye colors, mouths, scars, and tops. All nine categories and 68 options remain available. Opaque glasses cover the eyes naturally.
- Shuffle combinations and lock individual categories. Reset restores the blue lion with navy cap, gold navigator glasses, sand hoodie, and closed confident expression.
- Name your lion and choose an edition number.
- Save up to 60 lions in this browser, reopen them, or remove them. Older saved thumbnails refresh to the current artwork. Export important creations before clearing browser storage or switching browsers.
- Export PNG at 512, 1024, or 2048 pixels. Artwork sources are 1254 pixels square, so 2048 exports upscale the illustration.
- Download a self-contained SVG containing **one flattened PNG image**. This preserves exactly the same completed art; individual accessory vectors are not exported.
- Download JSON metadata with all nine selected trait names and a matching image filename. Upload the image separately and replace that filename with its hosted URI before minting.
- The retired tongue trait reopens as the closed confident expression.

This app creates artwork and metadata. It does not mint NFTs, deploy contracts, connect a wallet, or upload creations.

## Build from source

The downloaded HTML has no dependencies. Rebuilding requires Python and Pillow (`python -m pip install Pillow`).

```sh
python build.py
python package.py
```

`build.py` extracts lossless contextual regions from the authored portraits. It emits ordinary WebP files for the hosted site and embeds the same bytes in the separate standalone HTML. It does not resize or degrade the artwork. The runtime composites at 1254 pixels, finishes the portrait on canvas, and embeds that complete result as PNG.

For local development, run `python -m http.server 8000 --directory /workspace/codex`. Cloud browser checks use an internal HTTP server because the managed browser blocks `file://` navigation. The standalone build embeds its images to avoid separate-file origin restrictions.

## Source files

- `lion-unified/master.png`: complete, cohesive cap/navigator/hoodie portrait.
- `lion-unified/hat-*.png`, `glasses-*.png`, `top-*.png`, `eye-*.png`, `mouth-*.png`, `scar-*.png`: full in-situ edited portraits; only their relevant contextual regions enter the app.
- `lion-art.js`: trait definitions, region replacement, pigment recoloring, canvas flattening, render cache, and SVG wrapper.
- `studio.template.html`: preserved layout and controls, collection storage, and downloads.
- `app/`: generated external scripts for the hosted site.
- `assets/`: generated lossless WebP portrait regions for the hosted site.
- `PRIDE-Studio.html`: separate generated standalone offline build.
- `DOWNLOAD-REVIEW.md`: reported download warning, source/package findings, and remaining diagnostic requirements.
- `build.py`, `package.py`: standalone HTML builder and ZIP packager.
- `PRIDE-Preview.png`: current default generated artwork.

Earlier base images, atlas assets, procedural facial/trait modules, rig modules, and `mossborn.html` remain as historical source material. The new live renderer does not use those isolated hat, frame, or garment atlases.
