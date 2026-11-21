#!/bin/sh
# Claude Code -> local mock API (no key, no cost). Start the mock first: node labs/session-4/mock-anthropic.mjs
export ANTHROPIC_BASE_URL=http://127.0.0.1:8787
export ANTHROPIC_AUTH_TOKEN=local-demo
export ANTHROPIC_API_KEY=
export ANTHROPIC_MODEL=claude-local-mock
exec claude "$@"
