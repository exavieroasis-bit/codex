# PRIDE. — Lion PFP Studio

An original lion collectible generator with a detailed illustrated lion, expressive inked facial features, and fitted accessory layers. The Artist Series replaces the initial simplified character with a 1254px transparent illustrated base, intricate mane detail, shaded anatomy, and more elaborate hats, eyewear, scars, and clothing.

The current refinement includes a dedicated full-resolution navy cap and a complete gold navigator frame, with continuous rims, nose pads, and controlled reflections. Glasses are fitted as one intact pair, rather than separately cropped lenses. The lower mane has a repainted finish with smoother directed locks, blended beneath the unchanged face and upper mane. Clothing sits behind a continuous mane silhouette, without the old rectangular neck cutoff.

Open **index.html** in a modern browser. The exported HTML contains all scripts, styles, illustrated base, and editable traits. No package installation, network connection, account, or wallet is needed. The managed browser used in this cloud environment blocks `file://` URLs, so automated browser validation uses an internal local HTTP server instead.

If the workspace link displays HTML source, it has opened the code viewer. Download **PRIDE-Studio.zip**, extract it, and open **PRIDE-Studio.html** with a web browser. The ZIP includes the complete page and short instructions. Run `python package.py` after rebuilding to refresh the downloadable package. The code viewer cannot execute the page, and this repository is not currently deployed to a public website.

## Create a lion

- Choose **hats, glasses, skins, eye types, eye colors, mouths, face scars, tops, and backgrounds**. Skins recolor the illustrated base; eye, mouth, and accessory options have individually drawn shapes. The opening portrait is the blue lion with its navy cap, gold navigator glasses, sand hoodie, closed confident expression, and teal backdrop.
- The tongue option has been retired. Previously saved tongue choices reopen with the closed confident expression; other saved identity and trait settings are retained. Gold and silver navigator finishes replace the former cropped aviator and round-lens treatments.
- Click **Shuffle traits** to randomly pick a combination. Accessory options include no accessory.
- Lock individual categories to preserve them during shuffling. Locks do not prevent manual editing. Reset restores the default lion and clears locks.
- Give your lion a name and edition number.
- **Save to my pride** keeps up to 60 lions in this browser. Reopen any saved lion to edit or export it. Browser storage must be available; clearing browser data, private browsing, or changing browsers/URLs can lose saved creations. Export important artwork as a file.
- Export a **PNG** at 512, 1024, or 2048 pixels, or download the self-contained **SVG**. The SVG contains the embedded PNG illustration and editable vector overlays; the base is raster artwork and 2048px export upscales it.
- Export **NFT metadata** with human-readable trait names. The JSON references the matching PNG filename. Before minting, upload the artwork and replace the JSON `image` field with its hosted URI.
- **View full artwork** enlarges the actual current creation, including all selected traits.

The app creates artwork and metadata. It does not deploy contracts, mint tokens, connect a wallet, or upload anything.

## Source files

- `lion-art.js`: trait definitions, skin palettes, artwork composition, and SVG renderer.
- `lion-premium-face.js`: fitted eye and mouth expressions.
- `lion-premium-traits.js`: detailed hats, glasses, scars, clothing, and layering masks.
- `lion-mane-geometry.js`: connected mane boundary used to fit collars and clothing beneath the fur without restoring bare shoulder pixels. This precomputed vector geometry adds no runtime or build dependencies.
- `lion-base.png`: transparent detailed lion illustration used by the live generator.
- `lion-refined-mane.png`: repainted lower-mane finish, blended into the original portrait below the face.
- `lion-regal-cap.png`, `lion-regal-glasses.png`: dedicated high-resolution cap and complete frame illustration.
- `lion-regal.js`: fitted intact frames, cap placement, and their shared material/contact treatment.
- `lion-wearables.png`, `lion-wardrobe.png`: transparent illustrated layer sheets used by the live generator.
- `lion-atelier.js`: individual wearable placement, head openings, contact shading, and fitted lens rendering.
- `lion-atelier-geometry.js`: precomputed alpha outlines that isolate individual sheet assets without neighboring artwork. No geometry-processing packages are needed to build or run the app.
- `studio.template.html`: interface, styling, and application logic.
- `lion-concept.png`: earlier concept illustration, retained separately.
- `build.py`: combines those files into the standalone `index.html`. Run `python build.py` after editing source files.
- `mossborn.html`: the previous MOSSBORN generator, preserved as a separate standalone page.
- `lion-art-v1.js`: the previous simplified lion renderer, retained separately.
- `PRIDE-Preview.png`: the current default portrait exported by the actual generator, also included in the ZIP for quick review.

For optional local development, run `python -m http.server 8000 --directory /workspace/codex` and open the page using your browser’s local server workflow.
