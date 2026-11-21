# آزمایشگاه 4 — هارنس‌ها و مدل‌های جایگزین

## پیش از کلاس
Node.js 22+ و Python 3.11+ لازم است. Claude Code برای آزمایشگاه ۱ کافی است و **هیچ کلیدی لازم ندارد**. برای آزمایشگاه ۲ یکی از این‌ها لازم است: کلید DeepSeek، کلید OpenRouter یا Codex 0.164+. همهٔ فرمان‌ها از ریشهٔ مخزن هستند. هیچ کلیدی را در فایل یا مخزن ننویسید؛ همهٔ نمونه‌ها کلید را از متغیر محیطی می‌خوانند.

## هدف
هارنس (Claude Code، Codex) را از مدل جدا ببینید: همان هارنس، مقصد متفاوت.

| فایل | کاربرد |
| --- | --- |
| `mock-anthropic.mjs` | سرور محلی که پروتکل Anthropic Messages را تقلید می‌کند و هر درخواست را خلاصه می‌کند؛ کلید را هرگز ثبت نمی‌کند |
| `configs/claude-mock.sh` | Claude Code ← سرور جعلی |
| `configs/claude-deepseek.sh` | Claude Code ← DeepSeek (طبق راهنمای رسمی DeepSeek) |
| `configs/claude-openrouter.sh` | Claude Code ← OpenRouter |
| `configs/codex-deepseek.config.toml` | Codex ← DeepSeek با Responses API |
| `configs/codex-openrouter-claude.config.toml` | Codex ← مدل Claude از راه OpenRouter |
| `configs/opencode.json` | OpenCode ← DeepSeek |

## آزمون قطعی
```sh
node --test labs/session-4/mock.test.mjs
python3 -m unittest discover -s labs/session-4 -p "test_*.py"
```
آزمون‌ها شکل پاسخ عادی و streaming سرور جعلی، نبودن کلید در خلاصهٔ لاگ و فایل‌های نمونه، و معتبر بودن TOML تنظیمات Codex را بررسی می‌کنند.

## آزمایشگاه ۱ — هارنس چه می‌فرستد؟ (۶ دقیقه)
```sh
node labs/session-4/mock-anthropic.mjs                 # ترمینال اول
./labs/session-4/configs/claude-mock.sh -p "سلام"     # ترمینال دوم
```
انتظار: پاسخ «پاسخ از مدل آموزشی محلی…» در ترمینال دوم، و در ترمینال اول یک خط JSON برای هر درخواست با `model`، `system_chars`، `tools`، `tool_names`، `thinking` و `anthropic_beta`.

اجرای واقعی با Claude Code نسخهٔ 2.1.330 (۲۱ نوامبر ۲۰۲۶): پاسخ جعلی چاپ شد؛ سرور ۱۳ ابزار، ۷۰۸۲ نویسه prompt سیستم، `thinking: adaptive` و چند هدر beta دید. Claude Code هشدار داد نام مدل را نمی‌شناسد و پنجرهٔ ۱ میلیون توکن فرض می‌کند. عددها به تنظیمات، پلاگین‌ها و MCPهای هر سیستم بستگی دارند.

پرسش کلاس: اگر هر نوبت حدود ۷ هزار نویسه prompt سیستم و تعریف ابزار تکرار شود، بدون prompt caching هزینه چطور رشد می‌کند؟

## آزمایشگاه ۲ — یک کار، دو مدل (۶ دقیقه)
```sh
export DEEPSEEK_API_KEY=...
./labs/session-4/configs/claude-deepseek.sh
```
داخل Claude Code فرمان `/status` را بزنید تا آدرس و اعتبار فعال را ببینید.

Codex: فایل `configs/codex-deepseek.config.toml` را در `~/.codex/deepseek.config.toml` کپی کنید و `codex --profile deepseek` را اجرا کنید. `model_provider` فقط در تنظیمات سطح کاربر خوانده می‌شود، نه در `.codex/config.toml` پروژه.

کار پیشنهادی: «یک قاعدهٔ ممنوعیت `!important` به `labs/session-3/starter/hooks/lib.mjs` اضافه کن و آزمونش را بنویس.» زمان، هزینه، تعداد فراخوانی ابزار و سبز شدن آزمون را برای هر مدل در جدول کلاس ثبت کنید.

## پاسخ مرجع
- چرا `ANTHROPIC_API_KEY` را خالی می‌کنیم؟ تا کلید Anthropic احتمالی در محیط جایگزین اعتبار درگاه نشود؛ OpenRouter صریحاً خالی بودن آن را می‌خواهد.
- چرا Codex با نقطهٔ پایانی OpenAI-compatible خود Anthropic کار نمی‌کند؟ آن لایه فقط Chat Completions است و Codex فقط Responses API را می‌فهمد.
- چرا prompt caching مهم است؟ سرویس‌دهنده‌ای که `cache_control` را نادیده بگیرد خطا نمی‌دهد، ولی هر نوبت را با قیمت کامل حساب می‌کند.
- اشتراک Claude Pro/Max در OpenCode یا Kilo؟ طبق قواعد Anthropic مجاز نیست؛ برای ابزار شخص ثالث API Key لازم است.

## محدودیت‌ها
مسیرهای DeepSeek، OpenRouter و Codex در این مخزن از مستند رسمی هر سرویس برداشته شده‌اند ولی به دلیل نیاز به کلید پولی به‌صورت زنده اجرا نشده‌اند. استفاده از `env_key` در نمونهٔ Codex به جای `experimental_bearer_token` راهنمای DeepSeek، انتخاب امن‌تر این دوره است. Anthropic مسیر مدل غیر Claude در Claude Code را پشتیبانی یا ممیزی نمی‌کند. نام مدل‌ها مرتب تغییر می‌کنند؛ پیش از کلاس از صفحهٔ هر سرویس‌دهنده بررسی کنید.
