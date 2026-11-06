# منابع رسمی و ماتریس قابلیت‌ها
تاریخ بازبینی مستندات برای این نسخه: ۶ نوامبر ۲۰۲۶. لینک‌های زیر هنگام تألیف باز شده‌اند؛ redirect رسمی بعضی صفحات Codex به ChatGPT Learn مشاهده شد. نام مدل، قیمت، دسترسی حساب و گزینه‌های آزمایشی باید پیش از تدریس دوباره بررسی شوند. مسیرهای زنده به سرویس و credential جداگانه نیاز دارند.

## جلسهٔ اول — Codex و نشست
- [مرجع CLI رسمی](https://developers.openai.com/codex/cli/reference/): بررسی فرمان‌های login، exec و resume. رفتار نسخهٔ نصب‌شده را با --help تطبیق دهید.
- [اجرای غیرتعاملی](https://developers.openai.com/codex/noninteractive/): exec، JSONL، schema خروجی و ادامهٔ اجرای غیرتعاملی. فرمان قدیمی --full-auto در سند جاری دیگر پشتیبانی نمی‌شود؛ sandbox صریح انتخاب می‌شود.
- [AGENTS.md](https://developers.openai.com/codex/guides/agents-md/): قرارداد و دامنهٔ دستورهای پروژه.
- [پیکربندی](https://developers.openai.com/codex/config-basic/): تفکیک سیاست تأیید از دسترسی محیط اجرا.
- [احراز هویت](https://developers.openai.com/codex/auth/): ورود ChatGPT برای دسترسی اشتراکی و API key برای مصرف API؛ سیاست و صورتحساب یکسان نیستند.

## جلسهٔ دوم — مهارت و معماری
- [ساخت مهارت](https://developers.openai.com/codex/skills/): SKILL.md، توصیف کاربرد و منابع همراه.
- [مفهوم مهارت در پلاگین](https://developers.openai.com/plugins/concepts/skills): گردش‌کار در کنار ابزارهای MCP.
- [بسته‌بندی پلاگین](https://developers.openai.com/api/docs/guides/agents-api/tools/plugins): manifest نمونه با .codex-plugin/plugin.json. سازگاری فرمت بسته باید برای میزبان مورد استفاده تأیید شود.
- [مرجع hook در Claude](https://code.claude.com/docs/en/hooks): رخداد PreToolUse و رفتار hook. نمونهٔ این مخزن فقط ابزار Edit را پوشش می‌دهد.
- [Remote Control در Claude](https://code.claude.com/docs/en/remote-control): قابلیت رسمی همان محصول؛ نام و فرمان آن را به Codex تعمیم ندهید.

## جلسهٔ سوم — MCP
- [ساخت server](https://modelcontextprotocol.io/docs/develop/build-server): ابزار، resource و انضباط transport.
- [SDK رسمی Python](https://github.com/modelcontextprotocol/python-sdk): FastMCP و client چرخهٔ initialize.
- [authorization استاندارد](https://modelcontextprotocol.io/specification/latest/basic/authorization): جریان HTTP و حدود استفاده از credential در STDIO.
- [اتصال Codex](https://developers.openai.com/codex/mcp/): ثبت server و تنظیم میزبان.
- [اتصال Claude](https://code.claude.com/docs/en/mcp): transport و مدیریت server در میزبان Claude.

## جلسهٔ چهارم — درگاه و trace
- [OpenRouter Quickstart](https://openrouter.ai/docs/quickstart): endpoint و قرارداد فراخوانی. قیمت و مدل از کاتالوگ حساب انتخاب می‌شود.
- [LiteLLM fallback](https://docs.litellm.ai/docs/proxy/reliability): مسیر جایگزین بین گروه مدل‌ها و retry محدود.
- [Langfuse tracing](https://langfuse.com/docs/observability/get-started): span، generation و flush در فرایند کوتاه‌عمر.

## جلسهٔ پنجم — حافظه و cache
- [Graphiti رسمی](https://github.com/getzep/graphiti): گراف دانش پویا، episode و ذخیره‌ساز.
- [مثال‌های رسمی Graphiti](https://github.com/getzep/graphiti/tree/main/examples/quickstart): امضای add_episode و search در نسخهٔ مورد استفاده.
- [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching): اهمیت پیشوند ثابت و سنجش cached tokens؛ بدون تضمین نرخ صرفه‌جویی.

## جلسهٔ ششم — اجرای Headless و انتشار
- [Codex non-interactive](https://developers.openai.com/codex/noninteractive/): استفاده از احراز هویت ذخیره‌شده و مسیرهای رسمی اتوماسیون. امکان حساب و سیاست سازمان بررسی شود.
- [Claude programmatic CLI](https://code.claude.com/docs/en/headless): -p، output-format و کنترل ابزارها.
- [Claude authentication](https://code.claude.com/docs/en/authentication): روش ورود افراد و سازمان‌ها. دسترسی CLI اشتراکی را مجوز SDK شخص ثالث یا سرویس چندکاربره ندانید.
- [GitHub Pages workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages): configure-pages، upload-pages-artifact و deploy-pages.

## وضعیت قابلیت و ادعای دوره
| قابلیت | پیاده‌سازی این مخزن | نیاز به سرویس زنده |
| --- | --- | --- |
| سایت و شش ارائه | HTML/CSS/JS مستقل با دادهٔ محلی | خیر |
| MCP | server و client واقعی SDK، فقط خواندن | نصب dependency؛ مدل لازم نیست |
| مهارت و validator | فایل مهارت، پلاگین نمونه و آزمون قرارداد | انتخاب خودکار مهارت نیاز به میزبان دارد |
| Gateway | شبیه‌ساز قطعی و config واقعی LiteLLM | مسیر واقعی نیاز به provider و کلید دارد |
| Langfuse | اسکریپت instrumentation واقعی | پروژه و credential لازم است |
| حافظه | مدل قطعی زمان و tenant | خیر |
| Graphiti | اسکریپت واقعی و Neo4j محلی | دیتابیس و مدل extraction/embedding |
| CLI Headless | فرمان رسمی و schema گزارش | CLI، ورود معتبر و entitlement |
| Runner | قفل محلی، state اتمیک، timeout و retry صریح | POSIX؛ ledger توزیع‌شده نیست |

## سیاست به‌روزآوری
پیش از هر دوره نسخهٔ CLI و dependencyها را ثبت کنید؛ smoke test را اجرا کنید؛ نام مدل را از کاتالوگ واقعی بردارید؛ لینک‌ها و entitlement را بررسی کنید. هیچ توکن ورود، secret یا فایل auth را در مخزن عمومی قرار ندهید.
