from pathlib import Path
from PIL import Image
from pillow_heif import register_heif_opener

register_heif_opener()

root = Path(__file__).resolve().parent / "gallery"
for path in root.iterdir():
    if path.suffix.lower() != ".heic":
        continue

    out = path.with_suffix(".jpg")
    if out.exists():
        continue

    try:
        with Image.open(path) as img:
            img.convert("RGB").save(out, "JPEG", quality=90)
        print(f"converted {path.name} -> {out.name}")
    except Exception as exc:
        print(f"failed {path.name}: {exc}")
