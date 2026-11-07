# Advanced Agentic AI Engineering
دورهٔ فارسی و RTL مهندسی پیشرفتهٔ ایجنت‌های هوش مصنوعی: **۶ جلسهٔ دوساعته، ۱۴۵ اسلاید محتوایی، ۷۲۰ دقیقه**.

- وب‌سایت: https://vshahparifard-cloud.github.io/advanced-agentic-engineering/
- منبع: https://github.com/vshahparifard-cloud/advanced-agentic-engineering
- الهام بصری: سایت agentic_course؛ زمینهٔ تیره، accent نئونی، کارت جلسه و نمایشگر اسلاید. مخزن مرجع تغییر داده نشده است.

## اجرا
Node.js 22+ و Python 3.11+ لازم‌اند. سایت وابستگی npm ندارد و فونت فارسی محلی است.
```sh
npm run check
npm run dev
```
ابتدا build با check تولید می‌شود. dev خروجی dist را روی http://localhost:4173 سرو می‌کند. برای ویرایش، پس از تغییر npm run build اجرا کنید.

## ساختار
- content/course.json: منبع شش ارائه؛ ۲۴ تا ۲۵ اسلاید، زمان، یادداشت، نمودار و سنجش برای هر جلسه.
- assets: رابط فارسی، نمایشگر تعاملی، فونت محلی و سبک چاپ.
- labs/session-1 تا session-6: پیاده‌سازی، آزمون، راهنمای گام‌به‌گام و پاسخ مرجع.
- docs: سیلابس، شش دفترچهٔ مدرس، معماری، منابع و rubric پروژه.
- scripts/build.mjs: ساخت مستقل HTML، بستهٔ ZIP و شش مسیر ارائه.
- .github/workflows/pages.yml: آزمون، ساخت و انتشار GitHub Pages.

## آزمایشگاه‌ها
۱. نشست و قرارداد Codex؛ ۲. مهارت، validator، پلاگین و hook؛ ۳. سرور و client واقعی MCP؛ ۴. fallback قطعی و اتصال واقعی OpenRouter/LiteLLM/Langfuse؛ ۵. حافظهٔ زمانی قطعی و اتصال Graphiti؛ ۶. runner محدود، PR/MR normalization و recovery.

آزمون MCP نیاز به نصب dependency دارد:
```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python labs/session-3/smoke.py
```
آزمون‌های سایت، Node و Python در npm run check اجرا می‌شوند. سرویس‌های پولی و Docker در CI عمومی اجرا نمی‌شوند. دستورهای مسیر زنده در README هر آزمایشگاه‌اند. فایل requirements-live.txt برای آن مسیرهاست؛ هیچ کلید یا دادهٔ خصوصی در سایت نیاز نیست.

## قابلیت‌های ارائه
نمایش ۶ deck با لینک مستقل، کلیدهای جهت، انتخاب اسلاید، فهرست، یادداشت مدرس، پرسش و بازخورد، چاپ/PDF، کپی فرمان و ادامه از اسلاید قبلی. پیشرفت فقط در localStorage مرورگر ذخیره می‌شود. یادداشت‌ها عمومی‌اند؛ هیچ محتوای محرمانه‌ای در آن‌ها قرار ندهید.

## انتشار
در Settings → Pages منبع GitHub Actions را انتخاب کنید. push روی main، workflow را اجرا می‌کند. نیاز: pages:write و id-token:write برای deploy، و contents:read. artifact فقط dist است؛ labs و docs به‌صورت بستهٔ آموزشی عمومی عرضه می‌شوند. کد هیچ فراخوان پولی در مرورگر انجام نمی‌دهد.

## حدود تأیید
آزمون قطعی با اتصال زنده متفاوت است. Graphiti، Langfuse، OpenRouter و CLIهای مدل به اعتبار و سرویس کاربر وابسته‌اند؛ قبل از ادعای موفقیت باید جداگانه اجرا و مشاهده شوند. نمونهٔ حافظه Graphiti نیست، شبیه‌ساز gateway LiteLLM نیست و runner محلی ledger توزیع‌شده نیست. [منابع و ماتریس قابلیت‌ها](docs/sources.md) و [گزارش تأیید](docs/verification.md) را ببینید.

## نگهداری
پس از تغییر زمان یا تعداد اسلاید، npm run check باید همچنان پاس شود. یادداشت‌های Markdown با scripts/author_content.py از منبع تألیفی تولید می‌شوند. قیمت، entitlement و نام مدل را قبل از هر نوبت تدریس از مرجع رسمی بررسی کنید.

## مجوز
کد و محتوای تألیفی: MIT. فونت Vazirmatn: SIL Open Font License (assets/FONT-LICENSE.txt). نام محصولات متعلق به صاحبان آن‌هاست.
