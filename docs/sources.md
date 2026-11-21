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
- [مرجع hook در Claude](https://code.claude.com/docs/en/hooks): رخداد PreToolUse و رفتار hook. نمونهٔ این جلسه فقط ابزار Edit را پوشش می‌دهد؛ جلسهٔ سوم هوک را کامل و برای Claude Code و Codex آموزش می‌دهد.
- [Remote Control در Claude](https://code.claude.com/docs/en/remote-control): قابلیت رسمی همان محصول؛ نام و فرمان آن را به Codex تعمیم ندهید.

## جلسهٔ سوم — هوک در Claude Code و Codex
بازبینی: ۲۱ نوامبر ۲۰۲۶.
- [مرجع هوک Claude Code](https://code.claude.com/docs/en/hooks): رخدادها، matcher، ورودی JSON، معنای exit 0 و exit 2، خروجی JSON، `stop_hook_active` و نکته‌های امنیتی.
- [راهنمای هوک Claude Code](https://code.claude.com/docs/en/hooks-guide): نمونه‌های فرمت خودکار، اعلان و محافظت از فایل.
- [مرجع هوک Codex](https://learn.chatgpt.com/docs/hooks): مکان hooks.json، trust با /hooks، ورودی `apply_patch` در `tool_input.command`، Stop با خروجی JSON و فعال بودن پیش‌فرض.
- [مرجع config.toml در Codex](https://learn.chatgpt.com/docs/config-file/config-reference): کلید `features.hooks`، نام مستعار قدیمی `codex_hooks` و گزینهٔ `notify`.
- نسخه و تاریخ ورود هوک به Codex در منابع رسمی خوانده‌شده نیامده است؛ آن را روی اسلاید ادعا نکنید.

## جلسهٔ چهارم — هارنس‌ها و مدل‌های جایگزین
بازبینی: ۲۱ نوامبر ۲۰۲۶. این ابزارها سریع تغییر می‌کنند؛ نسخه و نام مدل را پیش از کلاس دوباره بررسی کنید.
- [Claude Code و درگاه مدل](https://code.claude.com/docs/en/llm-gateway): مسیر مدل غیر Claude کار می‌کند ولی پشتیبانی و ممیزی نمی‌شود.
- [متغیرهای محیطی Claude Code](https://code.claude.com/docs/en/env-vars): ANTHROPIC_BASE_URL، نام‌های مستعار مدل و CLAUDE_CODE_SUBAGENT_MODEL.
- [DeepSeek برای Claude Code](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code) و [جدول سازگاری API Anthropic در DeepSeek](https://api-docs.deepseek.com/guides/anthropic_api).
- [DeepSeek برای Codex](https://api-docs.deepseek.com/quick_start/agent_integrations/codex) و [تنظیمات پیشرفتهٔ Codex](https://learn.chatgpt.com/docs/config-file/config-advanced): model_providers و Responses API.
- [حذف wire_api = chat در Codex](https://github.com/openai/codex/discussions/7782).
- [OpenRouter برای Claude Code](https://openrouter.ai/docs/guides/coding-agents/claude-code-integration) و [OpenRouter برای Codex](https://openrouter.ai/docs/cookbook/coding-agents/codex-cli).
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness): پیش‌نمایش، MIT، همه‌چیز پلاگین.
- [Hermes Agent](https://hermes-agent.nousresearch.com/docs): دستیار همیشه‌روشن Nous Research.
- [OpenCode](https://opencode.ai/docs/)، [Kilo Code](https://kilo.ai/docs) و [Aider](https://github.com/Aider-AI/aider).
- [Code Mode در Cloudflare](https://blog.cloudflare.com/code-mode/) و [اجرای کد با MCP](https://www.anthropic.com/engineering/code-execution-with-mcp).
- [قواعد استفادهٔ Claude Code](https://code.claude.com/docs/en/legal-and-compliance): اشتراک مصرفی در ابزار شخص ثالث مجاز نیست. [ورود با ChatGPT در برنامه‌های متن‌باز](https://developers.openai.com/siwc/token-sharing-open-source).

## جلسهٔ پنجم — درگاه و trace
- [OpenRouter Quickstart](https://openrouter.ai/docs/quickstart): endpoint و قرارداد فراخوانی. قیمت و مدل از کاتالوگ حساب انتخاب می‌شود.
- [LiteLLM fallback](https://docs.litellm.ai/docs/proxy/reliability): مسیر جایگزین بین گروه مدل‌ها و retry محدود.
- [Langfuse tracing](https://langfuse.com/docs/observability/get-started): span، generation و flush در فرایند کوتاه‌عمر.

## جلسهٔ ششم — حافظه و cache
- [Graphiti رسمی](https://github.com/getzep/graphiti): گراف دانش پویا، episode و ذخیره‌ساز.
- [مثال‌های رسمی Graphiti](https://github.com/getzep/graphiti/tree/main/examples/quickstart): امضای add_episode و search در نسخهٔ مورد استفاده.
- [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching): اهمیت پیشوند ثابت و سنجش cached tokens؛ بدون تضمین نرخ صرفه‌جویی.

## جلسهٔ هفتم — اجرای Headless و انتشار
- [Codex non-interactive](https://developers.openai.com/codex/noninteractive/): استفاده از احراز هویت ذخیره‌شده و مسیرهای رسمی اتوماسیون. امکان حساب و سیاست سازمان بررسی شود.
- [Claude programmatic CLI](https://code.claude.com/docs/en/headless): -p، output-format و کنترل ابزارها.
- [Claude authentication](https://code.claude.com/docs/en/authentication): روش ورود افراد و سازمان‌ها. دسترسی CLI اشتراکی را مجوز SDK شخص ثالث یا سرویس چندکاربره ندانید.
- [GitHub Pages workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages): configure-pages، upload-pages-artifact و deploy-pages.

## وضعیت قابلیت و ادعای دوره
| قابلیت | پیاده‌سازی این مخزن | نیاز به سرویس زنده |
| --- | --- | --- |
| سایت و هفت ارائه | HTML/CSS/JS مستقل با دادهٔ محلی | خیر |
| هوک | چهار هوک مشترک Claude و Codex با آزمون ورودی JSON | آزمون قطعی خیر؛ اجرای زنده نیاز به CLI و ورود دارد |
| مهارت و validator | فایل مهارت، پلاگین نمونه و آزمون قرارداد | انتخاب خودکار مهارت نیاز به میزبان دارد |
| هارنس و API جایگزین | سرور جعلی Anthropic و نمونهٔ تنظیم Claude Code، Codex و OpenCode | سرور جعلی خیر؛ DeepSeek و OpenRouter کلید لازم دارند |
| Gateway | شبیه‌ساز قطعی و config واقعی LiteLLM | مسیر واقعی نیاز به provider و کلید دارد |
| Langfuse | اسکریپت instrumentation واقعی | پروژه و credential لازم است |
| حافظه | مدل قطعی زمان و tenant | خیر |
| Graphiti | اسکریپت واقعی و Neo4j محلی | دیتابیس و مدل extraction/embedding |
| CLI Headless | فرمان رسمی و schema گزارش | CLI، ورود معتبر و entitlement |
| Runner | قفل محلی، state اتمیک، timeout و retry صریح | POSIX؛ ledger توزیع‌شده نیست |

## سیاست به‌روزآوری
پیش از هر دوره نسخهٔ CLI و dependencyها را ثبت کنید؛ smoke test را اجرا کنید؛ نام مدل را از کاتالوگ واقعی بردارید؛ لینک‌ها و entitlement را بررسی کنید. هیچ توکن ورود، secret یا فایل auth را در مخزن عمومی قرار ندهید.

## تکمیل جلسهٔ اول — تحویل Claude Code محلی به Codex
در ۷ نوامبر ۲۰۲۶، قرارداد resume و تنظیم config.toml از مستند رسمی Codex و راهنمای حافظهٔ پروژه از مستند رسمی Claude Code بررسی شدند. گردش‌کار HANDOFF.md در این دوره روش پیشنهادی تحویل هدف، تصمیم، وضعیت فایل‌ها و قدم بعدی است؛ در بازبینی تکمیلی، /import رسمی Codex برای ورود موارد پشتیبانی‌شده و چت‌های اخیر Claude Code تأیید و به درس اضافه شد؛ روش HANDOFF همچنان یک مسیر عمومی و گزینشی است.

- [قالب TOML](https://toml.io/en/): قالب متن ساختاریافتهٔ تنظیمات.
- [Persistence در LangGraph](https://docs.langchain.com/oss/python/langgraph/persistence): کاربرد فنی checkpointer در ذخیره و بازیابی state؛ جدا از یادداشت وضعیت سادهٔ این جلسه.

## تکمیل مدیریت نشست — Fork، Branch و Import
- [فرمان‌های Codex](https://learn.chatgpt.com/docs/developer-commands?surface=cli): /fork و قابلیت‌های مدیریت نشست.
- [Import از عامل دیگر](https://learn.chatgpt.com/docs/import): مسیر رسمی ورود موارد انتخاب‌شده؛ توضیح قبلی صرفاً HANDOFF را پوشش می‌داد و اکنون اصلاح شده است.
- [فرمان‌های Claude Code](https://code.claude.com/docs/en/commands): تفاوت /branch، /fork و /btw در مستند فعلی.
- [فرمان‌های Antigravity CLI](https://antigravity.google/docs/cli/using/): /fork با workspace موجود.
- [Checkpointing در Claude](https://code.claude.com/docs/en/checkpointing): دامنه و محدودیت بازگردانی.
