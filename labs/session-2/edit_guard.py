"""Educational Claude PreToolUse hook for the Edit tool only, not a sandbox."""
import json, sys
try:
    event = json.load(sys.stdin)
    path = str(event.get('tool_input', {}).get('file_path', ''))
    from pathlib import PurePath
    if event.get('tool_name') == 'Edit' and any(p.startswith('.env') for p in PurePath(path).parts):
        print('Editing environment credential files is denied by this demo hook.', file=sys.stderr)
        sys.exit(2)
except (ValueError, TypeError):
    print('Invalid hook input', file=sys.stderr)
    sys.exit(2)
