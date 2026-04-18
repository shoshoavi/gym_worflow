# Diagramme lokal speichern (WSL2 Ubuntu)

Die Bilder liegen **nicht** dauerhaft in Git: Sie werden mit `curl` von Google (Stitch) und Figma (FigJam-Thumbnails) geladen. **Führe das Skript in WSL aus**, nicht in PowerShell.

## Voraussetzungen

- **WSL2** mit **Ubuntu**
- Paket `curl` (meist schon da): `sudo apt update && sudo apt install -y curl`
- Datei **`scripts/download_diagrams.sh` muss Unix-Zeilenenden (LF)** haben. Wenn du `exit 1`, `bad interpreter` oder seltsame Syntaxfehler siehst:

```bash
sed -i 's/\r$//' /home/a/workspace/whatsapp_bot/scripts/download_diagrams.sh
file /home/a/workspace/whatsapp_bot/scripts/download_diagrams.sh   # sollte "ASCII text" / "with no line terminators" o. ä. — nicht "CRLF"
```

Im Repo ist [`.gitattributes`](../.gitattributes) so gesetzt, dass `*.sh` als **LF** ausgecheckt werden (nach `git add` / neuem Klon).

## Einmalig: Skript ausführen

Im **Ubuntu-Terminal** (WSL):

```bash
cd ~/workspace/whatsapp_bot
# falls dein Pfad anders ist, z. B.:
# cd /home/DEINUSER/workspace/whatsapp_bot

chmod +x scripts/download_diagrams.sh
./scripts/download_diagrams.sh
```

Ergebnis im Ordner `docs/diagrams/`:

| Datei | Inhalt |
|--------|--------|
| `stitch-architecture-desktop.png` | Stitch-Blueprint (Desktop) |
| `stitch-architecture-mobile.png` | Stitch-Variante Mobile |
| `stitch-architecture-desktop.html` | Stitch-Export HTML (Desktop) |
| `stitch-architecture-mobile.html` | Stitch-Export HTML (Mobile) |
| `figjam-01-target-architecture.png` | FigJam Flussdiagramm |
| `figjam-02-inbound-sequence.png` | FigJam Sequenzdiagramm |
| `figjam-03-lead-payment-states.png` | FigJam Zustandsdiagramm |
| `download.log` | Protokoll des letzten Laufs |

## Wenn `curl` bei Figma fehlschlägt (403 / abgelaufen)

Die **S3-Thumbnail-URLs** in `scripts/download_diagrams.sh` sind nur **ca. 7 Tage** gültig. Dann:

1. In Cursor die **Figma MCP**-Aktion `generate_diagram` für die drei Diagramme ausführen (oder neue Exports aus FigJam).
2. Die neuen `imageUrl`-Links in `scripts/download_diagrams.sh` eintragen.
3. Skript erneut ausführen.

Aktuelle **FigJam-Claim-Links** (Stand Generierung): siehe [FIGJAM_LINKS.md](FIGJAM_LINKS.md).

## Stitch aktualisieren

Neue Screenshot-URLs: **Stitch MCP** → `list_screens` mit Projekt-ID `3827988862232643991` → `downloadUrl` in das Skript kopieren.

## English

Run **`./scripts/download_diagrams.sh` inside WSL2 Ubuntu** from the repo root. FigJam S3 URLs expire in ~7 days; refresh them in the script via Figma MCP `generate_diagram` output (`imageUrl`).

### If your one-liner test exits 1

- **`set -e` + `grep`:** `grep` returns exit code **1** when there are **no matches** (not an error). Use `grep ... /tmp/log || true` or `if grep ...; then ...; fi` instead of relying on `set -e` for that line.
- **`du .../*`:** if the folder is empty, the glob can make `du` complain — your `|| true` already covers that.
