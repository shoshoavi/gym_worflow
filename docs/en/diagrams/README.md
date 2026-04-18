> English translation of [docs/diagrams/README.md](../../diagrams/README.md)

# Save Diagrams Locally (WSL2 Ubuntu)

The images are **not** permanently stored in Git: they are fetched with `curl` from Google (Stitch) and Figma (FigJam thumbnails). **Run the script in WSL**, not in PowerShell.

## Prerequisites

- **WSL2** with **Ubuntu**
- Package `curl` (usually already installed): `sudo apt update && sudo apt install -y curl`
- The file **`scripts/download_diagrams.sh` must have Unix line endings (LF)**. If you see `exit 1`, `bad interpreter`, or strange syntax errors:

```bash
sed -i 's/\r$//' /home/a/workspace/whatsapp_bot/scripts/download_diagrams.sh
file /home/a/workspace/whatsapp_bot/scripts/download_diagrams.sh   # should say "ASCII text" / "with no line terminators" etc. — NOT "CRLF"
```

The repo's [`.gitattributes`](../.gitattributes) is configured so that `*.sh` files are checked out as **LF** (after `git add` / a fresh clone).

## One-Time: Run the Script

In the **Ubuntu terminal** (WSL):

```bash
cd ~/workspace/whatsapp_bot
# if your path is different, e.g.:
# cd /home/YOURUSER/workspace/whatsapp_bot

chmod +x scripts/download_diagrams.sh
./scripts/download_diagrams.sh
```

Result in the `docs/diagrams/` folder:

| File | Contents |
|------|---------|
| `stitch-architecture-desktop.png` | Stitch Blueprint (desktop) |
| `stitch-architecture-mobile.png` | Stitch variant mobile |
| `stitch-architecture-desktop.html` | Stitch export HTML (desktop) |
| `stitch-architecture-mobile.html` | Stitch export HTML (mobile) |
| `figjam-01-target-architecture.png` | FigJam flowchart |
| `figjam-02-inbound-sequence.png` | FigJam sequence diagram |
| `figjam-03-lead-payment-states.png` | FigJam state diagram |
| `download.log` | Log of the last run |

## If `curl` Fails for Figma (403 / Expired)

The **S3 thumbnail URLs** in `scripts/download_diagrams.sh` are only valid for **~7 days**. Then:

1. Run the **Figma MCP** action `generate_diagram` in Cursor for the three diagrams (or get new exports from FigJam).
2. Update the new `imageUrl` links in `scripts/download_diagrams.sh`.
3. Run the script again.

Current **FigJam claim links** (as of last generation): see [FIGJAM_LINKS.md](FIGJAM_LINKS.md).

## Updating Stitch

New screenshot URLs: **Stitch MCP** → `list_screens` with project ID `3827988862232643991` → copy `downloadUrl` into the script.

## Troubleshooting

### If Your One-Liner Test Exits 1

- **`set -e` + `grep`:** `grep` returns exit code **1** when there are **no matches** (not an error). Use `grep ... /tmp/log || true` or `if grep ...; then ...; fi` instead of relying on `set -e` for that line.
- **`du .../*`:** if the folder is empty, the glob can make `du` complain — your `|| true` already covers that.
