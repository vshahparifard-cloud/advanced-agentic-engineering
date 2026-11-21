// Shared helpers for the session-3 hooks. Each hook reads one JSON event from stdin.
// The same scripts serve Claude Code (.claude/settings.json) and Codex (.codex/hooks.json).
import {readFileSync, readdirSync, existsSync} from 'node:fs';
import {dirname, extname, isAbsolute, join, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

// The project root is the folder that contains hooks/, not the host's cwd.
export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function readEvent() {
  const raw = readFileSync(0, 'utf8');
  return raw.trim() ? JSON.parse(raw) : {};
}

// Claude Code sends tool_input.file_path for Edit and Write.
// Codex sends apply_patch as tool_input.command containing the patch text.
export function changedFiles(toolInput = {}) {
  const files = [];
  if (typeof toolInput.file_path === 'string') files.push(toolInput.file_path);
  if (typeof toolInput.command === 'string') {
    for (const match of toolInput.command.matchAll(/^\*\*\* (?:Add File|Update File|Delete File|Move to): (.+)$/gm)) files.push(match[1].trim());
  }
  return files.map(file => relative(ROOT, isAbsolute(file) ? file : join(ROOT, file)).split('\\').join('/'));
}

const PROTECTED = [
  [/^dist\//, 'خروجی build است؛ فایل منبع را ویرایش کن و دوباره build بگیر.'],
  [/(^|\/)\.env($|\.)/, 'فایل اسرار است؛ ایجنت اجازهٔ ویرایش آن را ندارد.'],
  [/(^|\/)package-lock\.json$/, 'با npm install ساخته می‌شود؛ دستی ویرایش نکن.'],
  [/^hooks\//, 'خود هوک‌ها فقط با بازبینی انسانی تغییر می‌کنند.'],
];
export function protectedReason(file) {
  return PROTECTED.find(([pattern]) => pattern.test(file))?.[1];
}

const DANGEROUS = [
  [/\bgit\s+push\b.*\s(--force|-f)\b/, 'push اجباری تاریخچهٔ دیگران را پاک می‌کند.'],
  [/\bgit\s+reset\s+--hard\b/, 'تغییرهای ذخیره‌نشده از بین می‌روند.'],
  [/\brm\s+-[a-z]*r[a-z]*f|\brm\s+-[a-z]*f[a-z]*r/, 'حذف بازگشتی بدون تأیید انسانی ممنوع است.'],
  [/\bnpm\s+publish\b/, 'انتشار بسته نیاز به تأیید انسانی دارد.'],
];
export function dangerousReason(command) {
  return DANGEROUS.find(([pattern]) => pattern.test(command))?.[1];
}

// A tiny dependency-free stand-in for ESLint/Stylelint, tuned for a Persian RTL site.
const RULES = {
  '.js': [
    [/\bvar\s+[\w$]/, 'no-var', 'به جای var از const یا let استفاده کن'],
    [/(^|[^=!<>])==(?!=)|!=(?!=)/, 'eqeqeq', 'از === و !== استفاده کن'],
    [/\bconsole\.log\(/, 'no-console', 'console.log را پیش از تحویل حذف کن'],
  ],
  '.css': [
    [/\b(margin|padding)-(left|right)\s*:/, 'logical-properties', 'برای RTL از margin-inline-start/end استفاده کن'],
    [/\btext-align\s*:\s*(left|right)\b/, 'logical-align', 'برای RTL از text-align: start/end استفاده کن'],
  ],
  '.html': [
    [/<img\b(?![^>]*\balt=)[^>]*>/, 'img-alt', 'هر تصویر باید alt داشته باشد'],
  ],
};
RULES['.mjs'] = RULES['.js'];

export function checkFile(file) {
  const path = join(ROOT, file);
  const rules = RULES[extname(file)];
  if (!rules || !existsSync(path)) return [];
  const text = readFileSync(path, 'utf8');
  const problems = [];
  text.split('\n').forEach((line, i) => {
    for (const [pattern, id, message] of rules) if (pattern.test(line)) problems.push(`${file}:${i + 1} [${id}] ${message}`);
  });
  if (extname(file) === '.html' && !/<html\b[^>]*\blang="fa"[^>]*\bdir="rtl"|<html\b[^>]*\bdir="rtl"[^>]*\blang="fa"/.test(text)) {
    problems.push(`${file}:1 [rtl-root] تگ html باید lang="fa" و dir="rtl" داشته باشد`);
  }
  return problems;
}

const SKIP = new Set(['.git', '.claude', '.codex', 'node_modules', 'dist', 'hooks']);
export function siteFiles(dir = ROOT) {
  return readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
    if (SKIP.has(entry.name)) return [];
    const path = join(dir, entry.name);
    return entry.isDirectory() ? siteFiles(path) : [relative(ROOT, path).split('\\').join('/')];
  });
}

// Keep feedback short: everything on stderr enters the model's context and costs tokens.
export function report(problems, limit = 15) {
  const shown = problems.slice(0, limit);
  if (problems.length > limit) shown.push(`… و ${problems.length - limit} مورد دیگر`);
  return shown.join('\n');
}
