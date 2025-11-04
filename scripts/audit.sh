#!/bin/bash
set -euo pipefail

#!/usr/bin/env bash
# Fast, configurable audits: QUICK, SKIP_INSTALL, SKIP_BUILD, ROUTES, PORT, LHCI=0|1, A11Y=0|1
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# -------- config (env overridable) --------
PORT="${PORT:-3000}"
BASE_URL="http://localhost:${PORT}"
QUICK="${QUICK:-0}"          # 1 = faster defaults
A11Y="${A11Y:-1}"            # 0 = skip axe
LHCI="${LHCI:-1}"            # 0 = skip Lighthouse CI
SKIP_INSTALL="${SKIP_INSTALL:-0}"
SKIP_BUILD="${SKIP_BUILD:-0}"
WAIT_TIMEOUT="${WAIT_TIMEOUT:-120000}" # ms for wait-on

# Routes: comma-separated env or defaults
if [[ "${ROUTES:-}" != "" ]]; then
  IFS=',' read -r -a ROUTES <<< "$ROUTES"
else
  if [[ "$QUICK" == "1" ]]; then
    ROUTES=( "/" )
  else
    ROUTES=( "/" "/services" "/process" "/contact" )
  fi
fi
# -----------------------------------------

# 6) stop app
log() { echo "[$(ts)] $*"; }

if [[ "$SKIP_INSTALL" != "1" ]]; then
  log "Using pnpm. Removing npm lock if present."
  rm -f package-lock.json
  log "Install deps (cached if warm store)."
  pnpm install --frozen-lockfile || pnpm install
else
  log "SKIP_INSTALL=1 → skipping pnpm install"
fi

if [[ "$SKIP_BUILD" != "1" ]]; then
  log "Build"
  pnpm build
else
  log "SKIP_BUILD=1 → skipping build"
fi

log "Start server :$PORT"
PORT="$PORT" pnpm start & APP_PID=$!
trap '[[ -n "${APP_PID:-}" ]] && kill $APP_PID >/dev/null 2>&1 || true' EXIT

log "Wait for server → $BASE_URL"
pnpm dlx wait-on "$BASE_URL" --timeout "$WAIT_TIMEOUT"

log "Security headers"
( curl -sI "$BASE_URL" | rg -i "x-frame|x-content-type|referrer-policy|permissions-policy|strict-transport" ) \
  || ( curl -sI "$BASE_URL" | grep -Ei "x-frame|x-content-type|referrer-policy|permissions-policy|strict-transport" || true )

if [[ "$A11Y" == "1" ]]; then
  log "Axe accessibility audits (parallel)"
  printf "%s\n" "${ROUTES[@]}" | xargs -I{} -P "${AXE_CONCURRENCY:-4}" sh -c '
    echo "  - '"$BASE_URL"'{}"
    pnpm dlx @axe-core/cli "'"$BASE_URL"'{}"
  '
else
  log "A11Y=0 → skipping axe"
fi

if [[ "$LHCI" == "1" ]]; then
  log "Lighthouse CI (lean)"
  pnpm dlx @lhci/cli autorun \
    --collect.url="$BASE_URL" \
    --collect.numberOfRuns="${LH_RUNS:-1}" \
    --collect.settings.preset="${LH_PRESET:-desktop}" \
    --collect.settings.onlyCategories="${LH_CATS:-performance,accessibility}" \
    --collect.settings.skipAudits="${LH_SKIP:-uses-http2,redirects,render-blocking-resources}" \
    --upload.target=temporary-public-storage || true
else
  log "LHCI=0 → skipping Lighthouse"
fi

log "Done"
kill $APP_PID || true
