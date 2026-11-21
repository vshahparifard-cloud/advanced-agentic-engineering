#!/bin/sh
# Claude Code harness + any OpenRouter model (openrouter.ai Claude Code integration guide).
# OpenRouter only guarantees this path with Anthropic models; other models may misbehave.
: "${OPENROUTER_API_KEY:?export OPENROUTER_API_KEY first}"
export ANTHROPIC_BASE_URL=https://openrouter.ai/api
export ANTHROPIC_AUTH_TOKEN="$OPENROUTER_API_KEY"
export ANTHROPIC_API_KEY=
export CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1
exec claude "$@"
