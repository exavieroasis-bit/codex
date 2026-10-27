# Download warning review

The user confirmed that Chrome’s Downloads page reports **“Virus detected”** for `PRIDE-Studio.zip`. This is the detection result, rather than “Virus scan failed.” The responsible security product and underlying threat name have not yet been supplied. **The cause is not confirmed.**

## Archive reviewed

- File: `PRIDE-Studio.zip`
- Size: 18,099,534 bytes
- SHA-256: `5d2d31309b5dd66d250a3c2c1e451b9bcc23050836605569658fe4fb6f1ee1f9`
- Entries: `PRIDE-Studio.html` (20,759,934 bytes), `OPEN-FIRST.txt` (662 bytes), `PRIDE-Preview.png` (2,408,920 bytes).
- ZIP integrity passes. No encrypted entries, executables, or nested archives.
- Archived HTML and preview match the repository files byte for byte.

## Source and data checks

The reviewed application has no remote scripts, outbound network APIs, dynamic code evaluation, credential access, forms, service workers, or permission prompts. Export downloads run only from the corresponding button handlers. Browser storage holds saved artwork and trait selections.

The 41 embedded artwork images decode as valid WebP files with matching RIFF lengths and no appended data. The preview PNG contains standard image chunks. Most of the standalone HTML's size is encoded artwork inside its script data. Such packaging can resemble patterns used by harmful HTML downloads, but that is only a possible explanation for this report.

These are source, format, and integrity checks, **not an antivirus scan or a guarantee that a detection is a false positive**. Do not disable antivirus, create exclusions, or override the warning based on this review. The original reported archive is retained unchanged for comparison.

## Conventional web build

The hosted `index.html` uses separate, readable JavaScript files and lossless image files. It does not distribute a large embedded executable HTML payload as a ZIP. Its Content Security Policy limits scripts to the same website, disallows network API connections and embedded plugin objects, and prevents form submissions. Runtime images and user-requested artwork exports still use ordinary canvas/data/blob APIs.

The standalone HTML remains a distinct offline build. Its security warning remains unresolved; repackaging the website does not establish an antivirus verdict or guarantee that a particular download will be accepted.

A hosted build must be served over HTTP(S); opening the split files directly through `file://` can block canvas exports. GitHub Pages deployment and the reported 404 are separate from this download warning and still require confirmation of the repository's Pages settings/status.

## Information needed

The exact warning, browser/security product, and detected threat name or Protection History entry are needed to identify which scanner blocked the download and pursue a false-positive review if appropriate.
