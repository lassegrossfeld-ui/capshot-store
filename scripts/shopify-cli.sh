#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NODE_BIN="$ROOT/.shopify/node-v22.23.3-darwin-x64/bin"

if [[ -x "$NODE_BIN/node" ]]; then
  export PATH="$NODE_BIN:$PATH"
elif ! node -e "process.exit(Number(process.version.slice(1).split('.')[0] < 22))" 2>/dev/null; then
  echo "Shopify CLI needs Node.js 22+. Current: $(node -v 2>/dev/null || echo unknown)." >&2
  echo "Install Node 22 (nvm install 22) or use the bundled runtime in .shopify/." >&2
  exit 1
fi

exec npm exec --prefix "$ROOT/.shopify-cli" shopify -- "$@"
