import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
export function validate(report) {
  for (const key of ['summary','tests','risks']) {
    if (typeof report?.[key] !== 'string' || !report[key].trim()) throw new Error(`Missing evidence: ${key}`);
  }
  return true;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { validate(JSON.parse(readFileSync(process.argv[2], 'utf8'))); console.log('Report accepted'); }
  catch (error) { console.error(error.message); process.exitCode=1; }
}
