#!/bin/sh
# Claude Code harness + DeepSeek models (api-docs.deepseek.com, Claude Code integration).
# The key comes from your environment; it is never written into this file.
: "${DEEPSEEK_API_KEY:?export DEEPSEEK_API_KEY first}"
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN="$DEEPSEEK_API_KEY"
export ANTHROPIC_API_KEY=
export ANTHROPIC_MODEL='deepseek-flash[1m]'
# DeepSeek's guide maps every alias to deepseek-flash; deepseek-v4-pro is stronger but text-only (no images).
export ANTHROPIC_DEFAULT_OPUS_MODEL='deepseek-flash[1m]'
export ANTHROPIC_DEFAULT_SONNET_MODEL='deepseek-flash[1m]'
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-flash
export CLAUDE_CODE_AUTO_COMPACT_WINDOW=786432
exec claude "$@"
