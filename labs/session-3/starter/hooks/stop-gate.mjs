// Stop gate: the agent may not finish while the whole site fails the checks.
import {readEvent, siteFiles, checkFile, report} from './lib.mjs';

const event = readEvent();
// Loop guard: if this turn was already continued by a Stop hook, let the agent stop.
// Without this, a problem the agent cannot fix keeps it running forever.
if (event.stop_hook_active) {
  console.log('{}');
  process.exit(0);
}
const problems = siteFiles().flatMap(checkFile);
if (problems.length) {
  console.error(`کار هنوز تمام نیست؛ بررسی کل سایت این خطاها را دارد:\n${report(problems)}`);
  process.exit(2);
}
// Codex expects JSON on stdout when Stop exits 0; an empty object means "allow".
console.log('{}');
process.exit(0);
