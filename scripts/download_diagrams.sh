#!/usr/bin/env bash
# Run inside WSL2 Ubuntu. Line endings MUST be LF (Unix). If you see "bad interpreter"
# or cryptic errors from Windows, run: sed -i 's/\r$//' scripts/download_diagrams.sh
#
# Fetches Stitch screenshots/HTML + FigJam PNG thumbnails into docs/diagrams/
# FigJam S3 URLs expire (~7 days) — refresh via Figma MCP generate_diagram → paste imageUrl below.

set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/docs/diagrams"
LOG="$OUT/download.log"
mkdir -p "$OUT"

# Avoid `exec > >(tee)` — some WSL/bash builds misbehave; log via explicit tee.
log_run() {
  echo "=== $(date -Iseconds) download_diagrams.sh ==="
  echo "OUT=$OUT"

  ok_curl() {
    local out="$1"
    shift
    local code=0
    curl -fsSL -o "$out" "$@" || code=$?
    if [[ "$code" -eq 0 && -f "$out" ]]; then
      echo "OK  $out ($(wc -c < "$out" | tr -d ' ') bytes)"
    elif [[ "$code" -ne 0 ]]; then
      echo "FAIL $out (curl exit $code)"
    else
      echo "FAIL $out (missing file after curl)"
    fi
  }

  ok_curl "$OUT/stitch-architecture-desktop.png" \
    'https://lh3.googleusercontent.com/aida/ADBb0ujMjO3oCgm_iHMIymEYfgd9Ij0f-ajLb8WNEP8E7kc754gO8-V_GJGsVG30OQbtU70k_HRzBKQrnxJNEuor-thhLLfdui6tuUNa1RPUoVSHm1f9dvg_A9aARU7jgV6kOHSrMUh-r2yi35yefckxoD_ZZ5iVyAlqw7-iOz5Y5QZJkPN6vxV53FuVaHGyxVe4jLuvBhixxr0JaXqqnMEBjL2QTXqdDOyQl1DKBtRliYXO0a-vOXfyfhZZfIk' || true

  ok_curl "$OUT/stitch-architecture-mobile.png" \
    'https://lh3.googleusercontent.com/aida/ADBb0ugNcFlF7sI_ZGhzFiSH3fARe1GJilqRSWwQ0BupdjW62jgqDcgj0VkCB1O18IriKRxMglrlqdG4yc8VIQ4rCxv4i2c4Eu0bB28z6eD0CgR_kifomQTowEWpOiGxl9tJ75i6IAuDjEadGKiWIv_L1Cyemcq0qOoiltUGS-hzE2Wbkqol8gg55xsfQJPxphgbmHC6GDO2LhEQYI8o8QA0UtHMGlHAhofrHEoBobhY-7WHapj3Elmcrqxuxd8' || true

  ok_curl "$OUT/stitch-architecture-desktop.html" \
    'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2M3ODdkN2IzYzUyYTQ3MGZhNzgxZDJlNmE4YmU4N2RlEgsSBxC4wu2M3AEYAZIBIwoKcHJvamVjdF9pZBIVQhMzODI3OTg4ODYyMjMyNjQzOTkx&filename=&opi=96797242' || true

  ok_curl "$OUT/stitch-architecture-mobile.html" \
    'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzRhOTE5YWRjZTNiNjRiOWI4MmIxNTJmNTQwMjRhZjg0EgsSBxC4wu2M3AEYAZIBIwoKcHJvamVjdF9pZBIVQhMzODI3OTg4ODYyMjMyNjQzOTkx&filename=&opi=89354086' || true

  ok_curl "$OUT/figjam-01-target-architecture.png" \
    'https://s3-alpha.figma.com/thumbnails/1b97847f-3235-4298-9a5c-7ce7a24815be?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ4GOSFWCYKED6IIG%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T164049Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=5ee0c1e91f80556f6e195b022a5243e841af15f074dbb5a1c28b7824fa57529b' || true

  ok_curl "$OUT/figjam-02-inbound-sequence.png" \
    'https://s3-alpha.figma.com/thumbnails/4c8ee6fb-ca62-424f-8bd9-48ef01527993?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ4GOSFWCYKED6IIG%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T164050Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=1fdf06267f82472d50fde691c81d1e8b5a019d74c304d6d0117a1b83cd03e26e' || true

  ok_curl "$OUT/figjam-03-lead-payment-states.png" \
    'https://s3-alpha.figma.com/thumbnails/4973b82d-5276-4b99-800b-9d32ab80d1f5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ4GOSFWCYKED6IIG%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T164053Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=78f4a75a136f0ccd89f32b1514ae0521d3f05d9d3f137511caaebd0a5ae67543' || true

  echo "--- listing ---"
  ls -la "$OUT"
  echo "Log: $LOG"
  echo "Done."
}

log_run 2>&1 | tee -a "$LOG"
exit 0
