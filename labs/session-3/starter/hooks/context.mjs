// SessionStart: plain stdout is added to the model's context in both Claude Code and Codex.
import {execFileSync} from 'node:child_process';
import {ROOT} from './lib.mjs';

const git = args => {
  try { return execFileSync('git', args, {cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim(); }
  catch { return null; }
};
const branch = git(['branch', '--show-current']);
const lines = ['وضعیت پروژه در شروع نشست:'];
if (branch === null) lines.push('- این پوشه مخزن Git نیست.');
else {
  lines.push(`- شاخه: ${branch || '(detached)'}`);
  lines.push(`- آخرین commitها:\n${git(['log', '--oneline', '-3']) || '(هنوز commit ندارد)'}`);
  lines.push(`- تغییرهای ثبت‌نشده:\n${git(['status', '--short']) || '(تمیز)'}`);
}
lines.push('- قواعد: سایت فارسی و RTL است؛ dist و .env را ویرایش نکن؛ پیش از پایان، بررسی کل سایت باید پاس شود.');
console.log(lines.join('\n'));
