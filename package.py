"""Package the standalone studio for opening outside a source-code viewer."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent
page = root / "index.html"
instructions = """PRIDE — LION PFP STUDIO

1. Extract this ZIP archive.
2. Open PRIDE-Studio.html in Chrome, Edge, Firefox, or Safari.
   If a text editor opens instead, right-click the file, choose Open With,
   and select a web browser.

All artwork and controls are included inside the HTML file. No installation,
server, account, wallet, or internet connection is needed after downloading.

A code viewer displays HTML source instead of running the page. Open the
extracted .html file in a full browser, not the workspace code viewer.

This studio exports artwork and trait metadata; it does not mint NFTs.
"""
archive = root / "PRIDE-Studio.zip"
with ZipFile(archive, "w", compression=ZIP_DEFLATED) as bundle:
    bundle.write(page, "PRIDE-Studio.html")
    bundle.writestr("OPEN-FIRST.txt", instructions)
print(f"Packaged {archive.name}: {archive.stat().st_size:,} bytes")
