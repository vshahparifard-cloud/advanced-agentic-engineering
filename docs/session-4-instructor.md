# راهنمای مدرس — هارنس‌ها و مدل‌های جایگزین

مدت: ۱۲۰ دقیقه؛ زمان اختصاصی هر اسلاید در زیر آمده است. فعالیت‌های عملی در زمان همین اسلایدها انجام می‌شوند، نه علاوه بر آن. پیش از کلاس نصب ابزارها را طبق راهنمای آزمایشگاه انجام دهید.

در صورت نیاز به استراحت، پنج دقیقه از بخش بحث پایانی کم کنید و آن را در زمان جلسه ثبت کنید.

## 1. هارنس چیست؟ مدل مغز است، هارنس بدن — دقیقهٔ 0 تا 5

- مدل فقط متن می‌گیرد و متن برمی‌گرداند؛ فایل نمی‌خواند و فرمان اجرا نمی‌کند
- هارنس حلقهٔ ایجنت، ابزارها، مجوزها، مدیریت زمینه، هوک و حافظه را فراهم می‌کند
- Claude Code و Codex هارنس‌اند؛ مدل پشت یک آدرس API نشسته است

**راهنمای اجرا و بحث:** با یک پرسش شروع کنید: وقتی Claude Code فایلی را ویرایش می‌کند، چه کسی واقعاً فایل را می‌نویسد؟ پاسخ: هارنس. مدل فقط یک فراخوانی ابزار پیشنهاد می‌دهد و هارنس آن را اجرا می‌کند. همهٔ چیزهایی که در جلسه‌های قبل دیدید، یعنی AGENTS.md، Skill، هوک و نشست، قابلیت هارنس‌اند نه مدل. این جمله پایهٔ کل جلسه است: هارنس و مدل دو لایهٔ جدا هستند و می‌توان آن‌ها را جدا عوض کرد.

منابع: [Claude Code و درگاه مدل](https://code.claude.com/docs/en/llm-gateway)

## 2. سه لایه: رابط، هارنس و API مدل — دقیقهٔ 5 تا 10

- رابط جایی است که شما می‌نویسید: ترمینال، IDE، وب یا پیام‌رسان
- هارنس حلقه را می‌چرخاند و ابزار را روی سیستم شما اجرا می‌کند
- API مدل یک آدرس شبکه با یک پروتکل مشخص است؛ عوض کردن مدل یعنی عوض کردن همین آدرس

**راهنمای اجرا و بحث:** نمودار را روی تخته بکشید و برای هر لایه از کلاس مثال بخواهید. نکتهٔ مهم: لایهٔ API فقط یک آدرس و یک کلید است. اگر آن آدرس به جای Anthropic به DeepSeek اشاره کند و همان پروتکل را بفهمد، هارنس حتی متوجه تفاوت نمی‌شود. همین ایده موضوع نیمهٔ دوم جلسه است.

## 3. چرا هارنس و مدل را جدا کنیم؟ — دقیقهٔ 10 تا 15

- هزینه: مدل ارزان‌تر برای کارهای ساده و مدل قوی برای کارهای سخت
- دسترسی و پرداخت: بعضی سرویس‌ها در بعضی مناطق یا با بعضی روش‌های پرداخت در دسترس نیستند
- حریم خصوصی و پایداری: مدل محلی، مقایسهٔ کیفیت و مسیر جایگزین هنگام قطعی

**راهنمای اجرا و بحث:** هر دلیل را با مثال واقعی بگویید. برای هزینه: عنوان‌سازی نشست یا خلاصه‌سازی لازم نیست با گران‌ترین مدل انجام شود. برای دسترسی: شرایط استفادهٔ هر سرویس‌دهنده را رعایت کنید و دور زدن محدودیت را آموزش ندهید. برای حریم خصوصی: کد محرمانه را می‌توان با مدل محلی پردازش کرد. یادآوری کنید کیفیت ایجنت فقط به هارنس بستگی ندارد؛ همان هارنس با مدل ضعیف‌تر ایجنت ضعیف‌تری است.

## 4. سه زبان API مدل — دقیقهٔ 15 تا 20

- Anthropic Messages، OpenAI Chat Completions و OpenAI Responses سه پروتکل رایج‌اند
- هارنس فقط با مدلی کار می‌کند که پروتکل آن را بفهمد یا یک درگاه آن را ترجمه کند
- هر هارنس یک یا چند پروتکل را می‌فهمد؛ اول پروتکل را بشناسید، بعد مدل را انتخاب کنید.

**راهنمای اجرا و بحث:** جدول را با دقت بخوانید چون بیشتر خطاهای اتصال از همین‌جا می‌آید. Claude Code فقط Messages را می‌فهمد، پس DeepSeek با ساختن نقطهٔ پایانی سازگار با Anthropic آن را پشتیبانی کرده است. Codex امروز فقط Responses را می‌فهمد و حالت قدیمی chat حذف شده است؛ پس سرویسی که فقط Chat Completions دارد مستقیم به Codex وصل نمی‌شود. OpenCode، Kilo، Hermes و DeepSeek Harness چند پروتکل را می‌فهمند.

**هر هارنس کدام پروتکل را می‌فهمد؟**

| هارنس | Anthropic Messages | OpenAI Responses | OpenAI Chat Completions |
| --- | --- | --- | --- |
| Claude Code | ✓ تنها پروتکل | ✗ | ✗ (فقط از راه درگاه مترجم) |
| Codex | ✗ | ✓ تنها پروتکل | ✗ حالت chat حذف شد |
| DeepSeek Harness | ✓ پیش‌فرض | ✓ | ✓ و Gemini |
| OpenCode، Kilo، Hermes | ✓ | ✓ | ✓ |

منابع: [API سازگار با Anthropic در DeepSeek](https://api-docs.deepseek.com/guides/anthropic_api)، [حذف wire_api = chat](https://github.com/openai/codex/discussions/7782)

## 5. نقشهٔ ابزارها در سه دسته — دقیقهٔ 20 تا 25

- هارنس سازندهٔ مدل: Claude Code، Codex و DeepSeek Harness
- ایجنت کدنویسی مستقل از مدل: OpenCode، Kilo Code و Aider
- ابزارها را با نقششان دسته‌بندی کنید، نه با سازنده؛ اطلاعات تا ۲۱ نوامبر ۲۰۲۶ بررسی شده است.

**راهنمای اجرا و بحث:** این جدول نقشهٔ بقیهٔ نیمهٔ اول جلسه است. Hermes در دستهٔ سوم است: دستیار شخصی همیشه‌روشن، نه ابزار اصلی کدنویسی. DeepSeek Harness با اینکه سازنده‌اش یک شرکت مدل است، از ابتدا برای همهٔ مدل‌ها باز طراحی شده است. پیش از کلاس نسخه‌ها را دوباره بررسی کنید؛ این ابزارها هر هفته تغییر می‌کنند.

**سه دستهٔ ابزار؛ بررسی‌شده تا ۲۱ نوامبر ۲۰۲۶**

| ابزار | دسته | رابط اصلی | وضعیت |
| --- | --- | --- | --- |
| Claude Code، Codex | هارنس سازندهٔ مدل | ترمینال، IDE، دسکتاپ | پایدار |
| DeepSeek Harness | هارنس سازندهٔ مدل، باز برای همه | وب، headless، SDK | پیش‌نمایش |
| OpenCode | کدنویسی مستقل از مدل | ترمینال، دسکتاپ، وب | بسیار فعال |
| Kilo Code | کدنویسی مستقل از مدل | VS Code، JetBrains، CLI | بسیار فعال |
| Aider | کدنویسی مستقل از مدل، نسل اول | ترمینال | تقریباً متوقف |
| Hermes Agent | دستیار شخصی همیشه‌روشن | پیام‌رسان، CLI، دسکتاپ | فعال |

منابع: [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)، [مستند Hermes Agent](https://hermes-agent.nousresearch.com/docs)، [مستند OpenCode](https://opencode.ai/docs/)، [مستند Kilo Code](https://kilo.ai/docs)، [Aider](https://github.com/Aider-AI/aider)

## 6. DeepSeek Harness؛ هارنس رسمی DeepSeek — دقیقهٔ 25 تا 30

- شعار آن «همه‌چیز پلاگین است»؛ حتی حلقهٔ ایجنت هم یک پلاگین قابل تعویض است
- رابط اصلی وب است و حالت headless، SDK و ACP هم دارد؛ مدل پیش‌فرض DeepSeek است ولی هر سرویس‌دهنده‌ای را می‌پذیرد
- هنوز پیش‌نمایش است: نسخهٔ پایدار ندارد و تغییرات ناسازگار اعلام شده است

**راهنمای اجرا و بحث:** نکتهٔ جالب برای کلاس: DeepSeek Harness می‌تواند خود Claude Code و Codex را به‌عنوان زیرایجنت اجرا کند و هوک‌های آن‌ها را به‌صورت آزمایشی بفهمد. حالت Code آن با ابزار run_code همان ایدهٔ Code Mode است. sandbox در سطح سیستم‌عامل با سه حالت read-only، workspace-write و دسترسی کامل دارد. برای کار تولیدی هنوز توصیه نمی‌شود چون خود مستند می‌گوید ممیزی امنیتی نشده است.

```text
npx @deepseek-ai/dsh web                                # رابط وب روی 127.0.0.1:3080
npx @deepseek-ai/dsh --profile headless "run the tests"  # اجرای یک‌باره بدون رابط
```

منابع: [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

## 7. Hermes Agent؛ دستیار همیشه‌روشن روی سرور — دقیقهٔ 30 تا 35

- دستیار شخصی Nous Research که یاد می‌گیرد، Skill می‌سازد و حافظه دارد
- روی یک سرور کوچک همیشه روشن است و از تلگرام، اسلک و بیش از بیست پیام‌رسان فرمان می‌گیرد
- مستند رسمی می‌گوید کوپایلوت کدنویسی نیست و کار کد را به Claude Code و Codex می‌سپارد

**راهنمای اجرا و بحث:** Hermes را به‌عنوان نمونهٔ ایجنتی معرفی کنید که هارنس آن برای زندگی روزمره طراحی شده، نه برای مخزن کد. تأیید هوشمند دارد: یک مدل کمکی خطر هر فرمان را می‌سنجد. اجرای فرمان‌ها را می‌توان در Docker یا روی ماشین دیگری با SSH گذاشت. این اسلاید پل جلسهٔ خرید سرور است: Hermes معمولاً روی یک VPS با کاربر غیر root و فایروال اجرا می‌شود. حداقل رسمی یک گیگابایت حافظه و یک هستهٔ پردازنده است.

```text
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
hermes setup          # انتخاب سرویس‌دهنده و مدل
hermes                # گفت‌وگو در ترمینال
hermes gateway setup  # اتصال تلگرام، اسلک و ...
```

منابع: [مستند Hermes Agent](https://hermes-agent.nousresearch.com/docs)

## 8. OpenCode و Kilo Code؛ ایجنت کدنویسی با هر مدل — دقیقهٔ 35 تا 40

- OpenCode نسخهٔ متن‌باز و مستقل از مدلِ همان تجربهٔ Claude Code در ترمینال است
- Kilo Code همان ایده را داخل VS Code و JetBrains می‌آورد و هسته‌اش از OpenCode گرفته شده است
- هر دو MCP، Skill، زیرایجنت و مجوز دارند؛ تفاوت اصلی در رابط و مدل کسب‌وکار است.

**راهنمای اجرا و بحث:** هر دو ابزار بیش از هفتاد سرویس‌دهنده و مدل محلی را پشتیبانی می‌کنند. اشتراک ChatGPT در هر دو رسماً پذیرفته می‌شود ولی اشتراک Claude نه. حالت plan و build در OpenCode را با حالت Plan در Claude Code مقایسه کنید. در Kilo حالت‌ها اکنون agent نامیده می‌شوند: code، ask، plan و debug. Kilo در ژوئیهٔ ۲۰۲۶ توسط Anaconda خریداری شد.

**دو ایجنت کدنویسی مستقل از مدل**

| موضوع | OpenCode | Kilo Code |
| --- | --- | --- |
| رابط | ترمینال، دسکتاپ، وب | VS Code، JetBrains، CLI، ابری |
| حالت‌ها | `build` و `plan`؛ زیرایجنت `general` و `explore` | `code`، `ask`، `plan`، `debug` |
| مدل | بیش از ۷۵ سرویس‌دهنده و مدل محلی | Kilo Gateway یا کلید خودتان |
| اشتراک ChatGPT | ✓ رسمی | ✓ فقط مدل‌های Codex |
| اشتراک Claude Pro/Max | ✗ | ✗ فقط Claude API |
| تنظیم | `opencode.json` | `kilo.json` |

منابع: [مستند OpenCode](https://opencode.ai/docs/)، [مستند Kilo Code](https://kilo.ai/docs)

## 9. Aider؛ نسل اول و درسی که هنوز معتبر است — دقیقهٔ 40 تا 45

- Aider ایجنت خودکار نیست: مدل فقط تغییر را به شکل diff برمی‌گرداند و Aider آن را اعمال می‌کند
- هر ویرایش را خودکار commit می‌کند و با undo برمی‌گرداند؛ حالت architect با دو مدل کار می‌کند
- توسعهٔ آن تقریباً متوقف است؛ آخرین نسخه در فوریهٔ ۲۰۲۶ منتشر شده

**راهنمای اجرا و بحث:** Aider را برای فهم تاریخچه معرفی کنید، نه برای استفادهٔ امروز. دو ایدهٔ آن هنوز ارزشمند است: هر تغییر عامل یک commit جدا باشد تا بتوان آن را برگرداند، و یک مدل برای برنامه‌ریزی و مدل دیگر برای نوشتن کد. MCP، زیرایجنت و هوک ندارد. مستندات آن هنوز نام مدل قدیمی deepseek-chat را نشان می‌دهد که بازنشسته شده است.

```text
export DEEPSEEK_API_KEY=...
aider --model deepseek/deepseek-chat   # نام مدل در مستند Aider قدیمی است
/architect   # برنامه با یک مدل، ویرایش با مدل دیگر
/undo        # برگرداندن آخرین commit خودکار
```

منابع: [Aider](https://github.com/Aider-AI/aider)

## 10. Code Mode؛ به جای فراخوانی ابزار، کد بنویس — دقیقهٔ 45 تا 50

- در روش عادی مدل ابزارها را یکی‌یکی صدا می‌زند و هر نتیجه به زمینه برمی‌گردد
- در Code Mode مدل یک قطعه کد می‌نویسد که چند ابزار را با هم صدا می‌زند و فقط نتیجهٔ نهایی برمی‌گردد
- ایده از Cloudflare است؛ OpenCode ابزار execute و DeepSeek Harness حالت Code را بر همین پایه دارند

**راهنمای اجرا و بحث:** دو مزیت را با مثال بگویید: خواندن پنجاه فایل و شمردن یک الگو در روش عادی پنجاه نتیجهٔ کامل به زمینه می‌ریزد، ولی در Code Mode فقط یک عدد برمی‌گردد. مدل‌ها در نوشتن کد بهتر از زنجیرهٔ فراخوانی ابزارند. Anthropic هم همین ایده را با عنوان اجرای کد با MCP منتشر کرده است. Code Mode نام یک تکنیک است، نه یک ابزار مستقل.

منابع: [Code Mode در Cloudflare](https://blog.cloudflare.com/code-mode/)، [اجرای کد با MCP در Anthropic](https://www.anthropic.com/engineering/code-execution-with-mcp)

## 11. مسیر درخواست؛ Claude Code با مدل DeepSeek — دقیقهٔ 50 تا 55

- هارنس آدرس API را از متغیر ANTHROPIC_BASE_URL می‌خواند
- DeepSeek نقطهٔ پایانی سازگار با پروتکل Anthropic ساخته است
- Claude Code همان هارنس است؛ فقط مغز عوض شده است

**راهنمای اجرا و بحث:** نمودار را از چپ به راست دنبال کنید. تأکید کنید که Claude Code هیچ تغییری نکرده است: همان ابزارها، همان هوک‌ها و همان AGENTS.md. فقط مقصد درخواست عوض شده است. Anthropic در مستند خود می‌گوید مسیر مدل غیر Claude را پشتیبانی و ممیزی نمی‌کند؛ پس این مسیر کار می‌کند ولی مسئولیت کیفیت و رفتار با شماست.

منابع: [Claude Code و درگاه مدل](https://code.claude.com/docs/en/llm-gateway)، [DeepSeek برای Claude Code](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code)

## 12. نمایش زنده: Claude Code با DeepSeek — دقیقهٔ 55 تا 61

- سه متغیر کافی است: آدرس، کلید و نام مدل
- نام مستعارهای opus، sonnet و haiku و مدل زیرایجنت را هم به مدل DeepSeek نگاشت کنید
- کلید را در فایل ننویسید؛ اسکریپت آزمایشگاه آن را از محیط می‌خواند

**راهنمای اجرا و بحث:** فایل configs/claude-deepseek.sh را باز کنید و خط‌به‌خط توضیح دهید. ANTHROPIC_API_KEY را عمداً خالی می‌کنیم تا کلید Anthropic احتمالی جایگزین نشود. پسوند 1m به Claude Code می‌گوید پنجرهٔ زمینه یک میلیون توکن است. بعد از اجرا فرمان status را بزنید تا آدرس و نوع اعتبار فعال را ببینید. اگر کلید DeepSeek ندارید، همین را با سرور جعلی آزمایشگاه نشان دهید.

```text
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN="$DEEPSEEK_API_KEY"
export ANTHROPIC_API_KEY=
export ANTHROPIC_MODEL='deepseek-flash[1m]'
export ANTHROPIC_DEFAULT_OPUS_MODEL='deepseek-flash[1m]'
export ANTHROPIC_DEFAULT_SONNET_MODEL='deepseek-flash[1m]'
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-flash
claude
```

منابع: [DeepSeek برای Claude Code](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code)، [متغیرهای محیطی Claude Code](https://code.claude.com/docs/en/env-vars)

## 13. نگاشت مدل‌ها در Claude Code — دقیقهٔ 61 تا 66

- Claude Code برای هر کار یک مدل جدا صدا می‌زند: اصلی، سریع، زیرایجنت و کارهای پس‌زمینه
- اگر فقط ANTHROPIC_MODEL را عوض کنید، بعضی درخواست‌ها هنوز نام مدل Claude را می‌فرستند
- هر نام مستعار را صریح نگاشت کنید؛ در غیر این صورت درخواست‌های جانبی شکست می‌خورند.

**راهنمای اجرا و بحث:** جدول متغیرها را مرور کنید. مدل haiku برای کارهای پس‌زمینه مثل عنوان نشست هم استفاده می‌شود. DeepSeek نام‌هایی که با claude شروع شوند را خودش به مدل‌های خود نگاشت می‌کند، ولی سرویس‌دهندهٔ دیگری ممکن است خطای 400 بدهد. متغیر قدیمی ANTHROPIC_SMALL_FAST_MODEL منسوخ شده است و به جای آن نام مستعار haiku را تنظیم کنید.

**هر نقش Claude Code یک متغیر دارد**

| متغیر | چه زمانی استفاده می‌شود؟ |
| --- | --- |
| `ANTHROPIC_MODEL` | مدل اصلی نشست |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | وقتی نام مستعار opus انتخاب شود |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | وقتی نام مستعار sonnet انتخاب شود |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | کارهای سریع و پس‌زمینه مثل عنوان نشست |
| `CLAUDE_CODE_SUBAGENT_MODEL` | زیرایجنت‌ها، مگر مدل جداگانه تعیین شود |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW` | از چه اندازه‌ای خلاصه‌سازی شروع شود |

منابع: [متغیرهای محیطی Claude Code](https://code.claude.com/docs/en/env-vars)

## 14. چه چیزی در مسیر جایگزین از دست می‌رود؟ — دقیقهٔ 66 تا 71

- هارنس همان است ولی بعضی قابلیت‌ها به سرور Anthropic وابسته‌اند
- prompt caching، جستجوی وب، تصویر و Remote Control را برای هر سرویس‌دهنده جدا بسنجید
- قابلیت‌ها به سرویس‌دهنده بستگی دارند؛ پیش از اعتماد، جدول سازگاری همان سرویس‌دهنده را بخوانید.

**راهنمای اجرا و بحث:** مهم‌ترین نکته هزینه است: اگر سرویس‌دهنده cache_control را نادیده بگیرد، خطایی نمی‌بینید ولی هر نوبت با قیمت کامل حساب می‌شود. DeepSeek جستجوی وب را با ابزار سرور خودش پشتیبانی می‌کند. مدل deepseek-v4-pro تصویر نمی‌پذیرد. Remote Control و دیکتهٔ صوتی با اعتبار درگاه غیرفعال می‌شوند. Claude Code پارامترهایی را که سرویس‌دهنده نپذیرد در نسخه‌های جدید خودکار حذف و دوباره امتحان می‌کند.

**Claude Code روی API سازگار DeepSeek؛ از جدول سازگاری رسمی DeepSeek**

| قابلیت | وضعیت | پیامد |
| --- | --- | --- |
| prompt caching | `cache_control` نادیده گرفته می‌شود | بدون خطا، ولی بدون تخفیف cache |
| thinking | adaptive به enabled تبدیل می‌شود؛ budget نادیده | کنترل دقیق بودجهٔ فکر نیست |
| تصویر | `deepseek-flash` بله؛ `deepseek-v4-pro` خیر | برای اسکرین‌شات مدل درست را بگذارید |
| جستجوی وب | با ابزار سرور DeepSeek | توکن خلاصه‌سازی هزینه دارد |
| Remote Control | غیرفعال با اعتبار درگاه | فقط با حساب Anthropic |

منابع: [API سازگار با Anthropic در DeepSeek](https://api-docs.deepseek.com/guides/anthropic_api)، [Claude Code و درگاه مدل](https://code.claude.com/docs/en/llm-gateway)

## 15. Claude Code با OpenRouter، Kimi و GLM — دقیقهٔ 71 تا 75

- هر سرویسی که پروتکل Messages را بفهمد با همان سه متغیر وصل می‌شود
- OpenRouter یک آدرس برای صدها مدل است ولی رفتار درست را فقط با مدل‌های Anthropic تضمین می‌کند
- Kimi و GLM راهنمای رسمی اتصال Claude Code دارند و نام مدل و پنجرهٔ زمینه را مشخص کرده‌اند

**راهنمای اجرا و بحث:** جدول آدرس‌ها را نشان دهید و بگویید نام مدل‌ها را از صفحهٔ همان سرویس‌دهنده بردارید چون مرتب عوض می‌شوند. برای OpenRouter باید ANTHROPIC_API_KEY صریحاً خالی باشد. LiteLLM هم می‌تواند هر مدلی را پشت پروتکل Anthropic بگذارد؛ جزئیات درگاه را در جلسهٔ بعد می‌بینیم. هر سرویس‌دهنده سیاست نگهداری داده و قیمت خودش را دارد.

**آدرس‌های سازگار با Anthropic؛ نام مدل را از صفحهٔ هر سرویس بردارید**

| سرویس | ANTHROPIC_BASE_URL | نکته |
| --- | --- | --- |
| DeepSeek | `https://api.deepseek.com/anthropic` | نام‌های claude را خودش نگاشت می‌کند |
| OpenRouter | `https://openrouter.ai/api` | `ANTHROPIC_API_KEY` باید خالی باشد |
| Kimi | `https://api.moonshot.ai/anthropic` | همیشه در حالت reasoning |
| GLM (z.ai) | `https://api.z.ai/api/anthropic` | کلید از GLM Coding Plan |
| LiteLLM محلی | `http://127.0.0.1:4000` | هر مدلی؛ جلسهٔ بعد |

منابع: [OpenRouter برای Claude Code](https://openrouter.ai/docs/guides/coding-agents/claude-code-integration)، [Kimi برای Claude Code](https://platform.kimi.ai/docs/guide/claude-code-kimi)، [GLM برای Claude Code](https://docs.z.ai/devpack/tool/claude)

## 16. Codex با provider دیگر؛ فقط Responses API — دقیقهٔ 75 تا 80

- Codex سرویس‌دهنده را با model_provider و یک بخش model_providers در config.toml تعریف می‌کند
- حالت chat حذف شده است؛ سرویس‌دهنده باید OpenAI Responses API را بفهمد
- model_provider فقط در تنظیمات کاربر خوانده می‌شود، نه در config پروژه

**راهنمای اجرا و بحث:** ساختار را از روی نمونه بخوانید: name، base_url، wire_api و env_key. env_key فقط نام متغیر محیطی است و خود کلید را در فایل نمی‌نویسیم. فرمان profile در Codex یک فایل جدا در پوشهٔ تنظیمات کاربر را روی تنظیمات اصلی می‌گذارد؛ پس برای هر سرویس‌دهنده یک فایل profile بسازید. جدول‌های قدیمی profiles داخل config.toml دیگر پشتیبانی نمی‌شوند.

```text
# ~/.codex/deepseek.config.toml  →  codex --profile deepseek
model = "deepseek-flash"
model_provider = "deepseek"

[model_providers.deepseek]
name = "DeepSeek"
base_url = "https://api.deepseek.com/"
wire_api = "responses"
env_key = "DEEPSEEK_API_KEY"
```

منابع: [تنظیمات پیشرفتهٔ Codex](https://learn.chatgpt.com/docs/config-file/config-advanced)، [حذف wire_api = chat](https://github.com/openai/codex/discussions/7782)

## 17. Codex با DeepSeek و Claude — دقیقهٔ 80 تا 85

- DeepSeek خودش Responses API ارائه می‌دهد و مستقیم به Codex وصل می‌شود
- برای مدل Claude در Codex از OpenRouter به‌عنوان سرویس‌دهنده استفاده کنید
- نقطهٔ پایانی سازگار با OpenAI خود Anthropic فقط Chat Completions است و به Codex نمی‌خورد

**راهنمای اجرا و بحث:** راهنمای رسمی DeepSeek نسخهٔ 0.164 یا بالاتر Codex را لازم می‌داند. در نمونهٔ آزمایشگاه به جای قرار دادن کلید در فایل از env_key استفاده کرده‌ایم. OpenRouter برای Codex یک دستور auth تعریف می‌کند تا کاتالوگ مدل‌ها را بگیرد. وقتی بین ورود ChatGPT و DeepSeek جابه‌جا می‌شوید، تاریخچهٔ نشست‌های گروه دیگر پنهان می‌شود.

```text
# ~/.codex/openrouter.config.toml  →  codex --profile openrouter
model_provider = "openrouter"
model = "~anthropic/claude-sonnet-latest"

[model_providers.openrouter]
name = "OpenRouter"
base_url = "https://openrouter.ai/api/v1"

[model_providers.openrouter.auth]
command = "sh"
args = ["-c", "echo $OPENROUTER_API_KEY"]
```

منابع: [DeepSeek برای Codex](https://api-docs.deepseek.com/quick_start/agent_integrations/codex)، [OpenRouter برای Codex](https://openrouter.ai/docs/cookbook/coding-agents/codex-cli)، [لایهٔ سازگار با OpenAI در Anthropic](https://platform.claude.com/docs/en/api/openai-sdk)

## 18. مدل محلی؛ Ollama و LM Studio — دقیقهٔ 85 تا 90

- Codex حالت oss دارد و به Ollama یا LM Studio وصل می‌شود
- OpenCode و Kilo مدل محلی را خودکار پیدا می‌کنند؛ Hermes آدرس سفارشی می‌پذیرد
- مدل محلی برای ایجنت باید پنجرهٔ زمینهٔ بزرگ و فراخوانی ابزار درست داشته باشد

**راهنمای اجرا و بحث:** عدد مهم را بگویید: Hermes حداقل ۶۴ هزار توکن زمینه می‌خواهد و Ollama به‌طور پیش‌فرض کمتر می‌دهد، پس باید طول زمینه را صریحاً بالا ببرید. در llama.cpp گزینهٔ jinja برای فراخوانی ابزار لازم است. مدل محلی کوچک معمولاً در حلقهٔ طولانی ایجنت ضعیف است؛ برای کار حساس به حریم خصوصی مناسب است ولی کیفیت را جداگانه بسنجید.

```text
OLLAMA_CONTEXT_LENGTH=64000 ollama serve
codex --oss --local-provider ollama
# OpenCode و Kilo: Ollama روی 127.0.0.1:11434 خودکار پیدا می‌شود
```

منابع: [تنظیمات پیشرفتهٔ Codex](https://learn.chatgpt.com/docs/config-file/config-advanced)، [مستند Hermes Agent](https://hermes-agent.nousresearch.com/docs)

## 19. آزمایشگاه ۱: مدل جعلی؛ هارنس چه می‌فرستد؟ — دقیقهٔ 90 تا 96

- یک سرور محلی که پروتکل Anthropic را تقلید می‌کند و هر درخواست را خلاصه می‌کند
- Claude Code را با ANTHROPIC_BASE_URL به آن وصل کنید؛ بدون کلید و بدون هزینه
- تعداد ابزارها، طول prompt سیستم و هدرهای beta را در خروجی ببینید

**راهنمای اجرا و بحث:** این آزمایش با Claude Code نسخهٔ 2.1.330 اجرا شده است: پاسخ جعلی در ترمینال چاپ شد و سرور نشان داد هارنس سیزده ابزار، حدود هفت هزار نویسه prompt سیستم، thinking از نوع adaptive و چند هدر beta فرستاده است. عدد دقیق به تنظیمات و پلاگین‌های هر سیستم بستگی دارد. از کلاس بپرسید این هفت هزار نویسه در هر نوبت چقدر هزینه دارد؛ اینجا اهمیت prompt caching ملموس می‌شود.

```text
node labs/session-4/mock-anthropic.mjs        # ترمینال اول
./labs/session-4/configs/claude-mock.sh -p "سلام"   # ترمینال دوم
cat requests.jsonl                           # هارنس چه فرستاد؟
```

## 20. آزمایشگاه ۲: یک کار، دو مدل — دقیقهٔ 96 تا 102

- یک کار کوچک را یک بار با مدل پیش‌فرض و یک بار با DeepSeek یا OpenRouter اجرا کنید
- زمان، هزینه، تعداد فراخوانی ابزار و درستی نتیجه را ثبت کنید
- هارنس ثابت است؛ تفاوت نتیجه را به مدل نسبت دهید

**راهنمای اجرا و بحث:** کار پیشنهادی: افزودن یک قاعدهٔ تازه به آزمایشگاه هوک جلسهٔ سوم همراه با آزمون. فقط کسانی که کلید دارند مسیر زنده را اجرا کنند؛ بقیه با سرور جعلی ساختار را می‌بینند. نتیجه را در یک جدول مشترک کلاس جمع کنید. تأکید کنید یک اجرا کافی نیست و نتیجهٔ مدل‌ها بین اجراها فرق می‌کند؛ ادعای برتری مدل را بدون چند اجرا نپذیرید.

```text
export DEEPSEEK_API_KEY=...
./labs/session-4/configs/claude-deepseek.sh
# یا: codex --profile deepseek
# همان درخواست را با مدل پیش‌فرض تکرار و نتیجه را مقایسه کنید
```

## 21. اشتراک یا API؟ قواعد استفاده — دقیقهٔ 102 تا 107

- Anthropic اجازه نمی‌دهد اشتراک Free، Pro یا Max در ابزار شخص ثالث استفاده شود
- OpenAI ورود با ChatGPT را در برنامه‌های متن‌باز از راه یک برنامهٔ رسمی پیش‌نمایش پذیرفته است
- برای ابزار شخص ثالث با مدل Claude از API Key یا سرویس ابری استفاده کنید.

**راهنمای اجرا و بحث:** این اسلاید را صریح و بدون ابهام بگویید چون حساب کاربر در خطر است. متن رسمی Anthropic می‌گوید ورود با اشتراک فقط برای Claude Code و برنامه‌های خود Anthropic است و Anthropic حق دارد بدون اطلاع قبلی اقدام کند. افزونه‌های غیررسمی که این محدودیت را دور می‌زنند وجود دارند ولی قواعد را نقض می‌کنند. برعکس، اجرای Claude Code با کلید سرویس‌دهندهٔ دیگر مجاز است ولی پشتیبانی نمی‌شود.

**اشتراک مصرفی در ابزار شخص ثالث**

| حالت | Anthropic | OpenAI |
| --- | --- | --- |
| اشتراک در هارنس خود سازنده | ✓ Claude Code | ✓ Codex |
| اشتراک در ابزار شخص ثالث | ✗ مجاز نیست | ✓ از راه برنامهٔ رسمی پیش‌نمایش |
| API Key در ابزار شخص ثالث | ✓ | ✓ |
| هارنس سازنده با مدل دیگر | ✓ کار می‌کند، پشتیبانی نمی‌شود | ✓ با model_providers |

منابع: [قواعد استفادهٔ Claude Code](https://code.claude.com/docs/en/legal-and-compliance)، [ورود با ChatGPT در برنامه‌های متن‌باز](https://developers.openai.com/siwc/token-sharing-open-source)

## 22. امنیت کلید و داده در مسیر جایگزین — دقیقهٔ 107 تا 111

- کلید را در متغیر محیطی یا مدیر رمز نگه دارید و هرگز commit نکنید
- هر سرویس‌دهنده کد و پرامپت شما را می‌بیند؛ سیاست نگهداری داده‌اش را بخوانید
- درگاه واسط مثل OpenRouter یا LiteLLM یک طرف سوم دیگر در مسیر داده است

**راهنمای اجرا و بحث:** آزمون آزمایشگاه بررسی می‌کند که هیچ فایل نمونه کلید نداشته باشد. سرور جعلی هم کلید را لاگ نمی‌کند و فقط نوع اعتبار را ثبت می‌کند. یادآوری از جلسهٔ هوک: هوک نگهبان می‌تواند خواندن فایل .env را رد کند. برای کد محرمانهٔ سازمان، پیش از انتخاب سرویس‌دهنده با مسئول امنیت هماهنگ کنید.

## 23. سنجش: Codex با مدل Claude — دقیقهٔ 111 تا 115

- پروتکل هارنس و سرویس‌دهنده را تطبیق دهید
- اشتراک و API Key را از هم جدا کنید
- مسیر پشتیبانی‌شده را از مسیر ممکن تشخیص دهید

**راهنمای اجرا و بحث:** پس از پاسخ کلاس هر گزینه را تحلیل کنید. گزینهٔ دوم کار نمی‌کند چون Codex فقط Responses را می‌فهمد و مستند Anthropic آن لایه را برای تولید مناسب نمی‌داند. گزینهٔ سوم قواعد Anthropic را نقض می‌کند. فقط OpenRouter پروتکل Responses را برای مدل‌های Claude ارائه می‌دهد.

منابع: [حذف wire_api = chat](https://github.com/openai/codex/discussions/7782)، [لایهٔ سازگار با OpenAI در Anthropic](https://platform.claude.com/docs/en/api/openai-sdk)، [قواعد استفادهٔ Claude Code](https://code.claude.com/docs/en/legal-and-compliance)

## 24. انتخاب هارنس و مدل؛ تحویل جلسهٔ چهارم — دقیقهٔ 115 تا 120

- هارنس را با رابط و قابلیت انتخاب کنید و مدل را با کیفیت، هزینه و دسترسی
- خروجی سرور جعلی را همراه یک تحلیل کوتاه از درخواست هارنس تحویل دهید
- جدول مقایسهٔ یک کار با دو مدل، با زمان، هزینه و نتیجهٔ آزمون

**راهنمای اجرا و بحث:** چک‌لیست انتخاب را با کلاس مرور کنید: کار در ترمینال است یا IDE؟ همیشه‌روشن روی سرور لازم است؟ کدام پروتکل؟ قواعد اشتراک چه می‌گوید؟ داده کجا می‌رود؟ جلسهٔ بعد درگاه مدل، fallback و مشاهده‌پذیری است و همین مسیرهای جایگزین را قابل اعتماد می‌کند.

## معیار ارزیابی
قرارداد و توضیح تصمیم: ۲۵٪؛ اجرای تمرین و آزمون: ۴۰٪؛ تشخیص خطا و بازیابی: ۲۰٪؛ گزارش شواهد و محدودیت: ۱۵٪.

راهنمای تمرین و پاسخ: [آزمایشگاه جلسه](../labs/session-4/README.md)
