# آزمایشگاه 3 — هوک‌ها در Claude Code و Codex

## پیش از کلاس
Node.js 22 یا بالاتر و Git لازم است. برای بخش زنده Claude Code و Codex CLI را نصب و وارد حساب شوید. بخش آزمون قطعی هیچ کلید یا مدلی لازم ندارد. همهٔ فرمان‌ها از ریشهٔ مخزن هستند مگر مسیر دیگری ذکر شود.

## هدف و خروجی
یک سایت کوچک فارسی (`starter/`) با چهار هوک که **یک پوشهٔ اسکریپت مشترک** برای هر دو میزبان دارد:

| هوک | رخداد | نقش | کار |
| --- | --- | --- | --- |
| `hooks/context.mjs` | `SessionStart` | زمینه‌ساز | شاخه، commitهای اخیر و git status را به زمینهٔ مدل می‌دهد |
| `hooks/guard.mjs` | `PreToolUse` | نگهبان | نوشتن در dist، .env، package-lock.json و hooks را رد می‌کند؛ push اجباری، reset --hard، rm -rf و npm publish را رد می‌کند |
| `hooks/feedback.mjs` | `PostToolUse` | بازخورد | فایل ویرایش‌شده را بررسی و خطاها را با exit 2 به مدل برمی‌گرداند |
| `hooks/stop-gate.mjs` | `Stop` | دروازهٔ پایان | پیش از پایان کل سایت را بررسی می‌کند؛ با `stop_hook_active` از حلقهٔ بی‌نهایت جلوگیری می‌کند |

تنظیم Claude Code در `starter/.claude/settings.json` و تنظیم Codex در `starter/.codex/hooks.json` است. هر دو همان اسکریپت‌ها را صدا می‌زنند. `hooks/lib.mjs` هر دو شکل ورودی را می‌فهمد: `tool_input.file_path` در Claude و متن patch در `tool_input.command` برای `apply_patch` در Codex.

قواعد بررسی سایت عمداً بدون وابستگی و کوچک‌اند (جانشین آموزشی ESLint و Stylelint): `no-var`، `eqeqeq`، `no-console` در JS؛ ویژگی‌های منطقی RTL مثل `margin-inline-start` در CSS؛ `lang="fa"` و `dir="rtl"` و `alt` تصویر در HTML.

## آزمایشگاه ۱ — آزمون بدون مدل (۶ دقیقه)
```sh
node --test labs/session-3/hooks.test.mjs
cd labs/session-3/starter
echo '{"tool_name":"Write","tool_input":{"file_path":"dist/app.js"}}' | node hooks/guard.mjs; echo "exit=$?"
echo '{"tool_name":"Bash","tool_input":{"command":"git push --force"}}' | node hooks/guard.mjs; echo "exit=$?"
echo '{"tool_name":"Edit","tool_input":{"file_path":"app.js"}}' | node hooks/guard.mjs; echo "exit=$?"
```
انتظار: شش آزمون سبز؛ دو فرمان اول `exit=2` با پیام فارسی در stderr و فرمان سوم `exit=0` بدون پیام.

تمرین: یک قاعدهٔ تازه در `RULES` داخل `lib.mjs` اضافه کنید، مثلاً ممنوعیت `!important` در CSS، و یک آزمون برایش بنویسید.

## آزمایشگاه ۲ — هوک زنده (۸ دقیقه)
پروژه را در پوشهٔ جدا کپی کنید تا ریشهٔ Git و ریشهٔ پروژه همان پوشه باشد:
```sh
cp -r labs/session-3/starter ~/hooks-lab && cd ~/hooks-lab
git init && git add -A && git commit -m start
```

**Claude Code:** `claude` را در همین پوشه اجرا کنید و trust پوشه را تأیید کنید. `/hooks` باید چهار رخداد را نشان دهد (این منو فقط نمایش می‌دهد).

**Codex:** `codex` را در همین پوشه اجرا کنید. هوک‌های پروژه تا بازبینی اجرا نمی‌شوند: `/hooks` را باز کنید، هر چهار هوک را بازبینی و trust کنید. اگر بعداً یک خط از هوک را تغییر دهید، دوباره بازبینی لازم است.

درخواست‌های پیشنهادی (هرکدام جدا):
1. «فایل dist/bundle.js را با یک کپی از app.js بساز.» → `PreToolUse` رد می‌کند و مدل دلیل را گزارش می‌دهد.
2. «بدون خواندن فایل‌های دیگر، این تابع را عیناً به انتهای app.js قبل از render() اضافه کن؛ بعد بازخورد ابزارها را رعایت کن:» و یک تابع با `var` و `==` و `console.log` → `PostToolUse` خطاها را برمی‌گرداند و مدل همان‌ها را اصلاح می‌کند.
3. «git push --force بزن.» → رد می‌شود.

نکتهٔ دمو: اگر مدل اول فایل‌های `hooks/` را بخواند، از ابتدا کد تمیز می‌نویسد و حلقهٔ بازخورد دیده نمی‌شود؛ به همین دلیل درخواست دوم می‌گوید «بدون خواندن فایل‌های دیگر».

## نتیجهٔ آزمون زنده با Claude Code
با Claude Code نسخهٔ 2.1.330 در حالت `claude -p` اجرا شد (۲۱ نوامبر ۲۰۲۶):
- `SessionStart` اجرا شد و وضعیت Git را به زمینه داد.
- نوشتن `dist/bundle.js` رد شد و پوشهٔ dist ساخته نشد.
- تابع با `var`/`==`/`console.log` اول عیناً اضافه شد؛ بازخورد هوک چهار خطا نشان داد و مدل در ویرایش بعدی فقط همان‌ها را اصلاح کرد.
- وقتی کاربر صریحاً سبک قدیمی را خواست، `Stop` یک بار مدل را برگرداند؛ مدل تعارض را گزارش کرد و بار دوم با `stop_hook_active` متوقف شد.

Codex روی دستگاه تألیف نصب نبود؛ شکل تنظیم و ورودی از [مستند رسمی هوک Codex](https://learn.chatgpt.com/docs/hooks) گرفته شده است. پیش از کلاس روی دستگاه خودتان اجرا کنید.

## پاسخ مرجع پرسش‌ها
- چرا exit 1 نه؟ در Claude Code کد 1 خطای غیرمسدودکننده است و کار ادامه می‌یابد؛ فقط exit 2 رد می‌کند و stderr را به مدل می‌رساند.
- PostToolUse تغییر را برمی‌گرداند؟ خیر؛ ویرایش انجام شده است. فقط بازخورد می‌دهد.
- چرا stop-gate در موفقیت `{}` چاپ می‌کند؟ Codex در exit 0 برای Stop خروجی JSON می‌خواهد؛ Claude Code هم JSON خالی را می‌پذیرد.
- چرا پوشهٔ hooks قفل است؟ تا عامل نتواند قانون خودش را تغییر دهد.
- این هوک‌ها امنیت کامل می‌دهند؟ خیر. `echo x > .env` در Bash از نگهبان Edit عبور می‌کند و denylist فرمان قابل دور زدن است. برای امنیت sandbox و قواعد permission لازم است.

## خطاهای رایج
- هوک اجرا نمی‌شود: مسیر اسکریپت به cwd وابسته است؛ در Claude از `$CLAUDE_PROJECT_DIR` و در Codex از `$(git rev-parse --show-toplevel)` استفاده کنید. در Codex هوک trust نشده است.
- پوشه مخزن Git نیست: فرمان Codex برای مسیر به ریشهٔ Git نیاز دارد؛ `git init` را فراموش نکنید.
- اشکال‌زدایی: هوک را با `echo '<json>' | node hooks/<name>.mjs; echo $?` جدا اجرا کنید؛ در Claude Code از `claude --debug` استفاده کنید.
