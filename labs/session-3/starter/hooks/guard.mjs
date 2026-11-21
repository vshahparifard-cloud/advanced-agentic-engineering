// PreToolUse guard: decides BEFORE the tool runs. Exit 2 blocks it and stderr tells the model why.
import {readEvent, changedFiles, protectedReason, dangerousReason} from './lib.mjs';

const event = readEvent();
const input = event.tool_input ?? {};

if (event.tool_name === 'Bash' && typeof input.command === 'string') {
  const reason = dangerousReason(input.command);
  if (reason) {
    console.error(`مسدود شد: ${reason} اگر واقعاً لازم است، از کاربر بخواه خودش اجرا کند.`);
    process.exit(2);
  }
}

for (const file of changedFiles(input)) {
  const reason = protectedReason(file);
  if (reason) {
    console.error(`مسدود شد: ${file} — ${reason}`);
    process.exit(2);
  }
}
process.exit(0);
