// PostToolUse feedback loop: the edit already happened. Exit 2 does not undo it;
// it shows the problems to the model so the model fixes them in its next step.
import {readEvent, changedFiles, checkFile, report} from './lib.mjs';

const event = readEvent();
const problems = changedFiles(event.tool_input ?? {}).flatMap(checkFile);
if (problems.length) {
  console.error(`بررسی خودکار فایلی که ویرایش کردی خطا دارد؛ فقط همین موارد را اصلاح کن:\n${report(problems)}`);
  process.exit(2);
}
process.exit(0);
