# آزمایشگاه 3 — سرور واقعی MCP برای سایت

## پیش از کلاس
Node.js 22 یا بالاتر، Python 3.11 یا بالاتر و Git لازم است. تمرین را در یک checkout آموزشی اجرا کنید. هیچ کلید یا فایل ورود را commit نکنید. همهٔ فرمان‌ها از ریشهٔ مخزن هستند مگر مسیر دیگری ذکر شود. فایل‌های کامل و پاسخ مرجع همراه تمرین‌اند؛ فعالیت کلاس بازبینی، تغییر کنترل‌شده و آزمون شکست است.

## هدف و خروجی
دو tool و یک resource واقعی با SDK رسمی Python اجرا کنید. این تمرین کاملاً بدون API مدل انجام می‌شود. زمان عملی: ۲۵ دقیقه؛ نصب را پیش از کلاس انجام دهید.
## نصب
```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python labs/session-3/smoke.py
```
در ویندوز مسیر اجرایی محیط مجازی Scripts/python.exe است. server.py دادهٔ content/course.json را نسبت به مسیر خودش می‌خواند و به cwd متکی نیست.
## گام‌ها — هر گام ۵ دقیقه
1. server.py را بخوانید. تفاوت search_lessons، get_session و course://syllabus را توضیح دهید.
2. smoke.py را اجرا کنید. کشف ابزار و یک جستجوی MCP با limit=1 را مشاهده کنید.
3. resource را بخوانید؛ جمع duration باید ۷۲۰ باشد. query بدون تطابق باید [] بدهد.
4. ورودی limit=99 را امتحان کنید؛ isError باید true باشد. query خالی و whitespace نیز رد می‌شوند.
5. در یکی از میزبان‌های رسمی ثبت کنید و نتیجه را با smoke client مقایسه کنید. اگر میزبان نصب نیست، اسکریپت client شاهد مستقل قرارداد است.
## اتصال به Codex و Claude
مسیرهای /ABS/PROJECT را با مسیر مطلق همین checkout جایگزین کنید. نمونه‌ها مقدار secret ندارند.
```sh
codex mcp add course-catalog -- /ABS/PROJECT/.venv/bin/python /ABS/PROJECT/labs/session-3/server.py
codex mcp list
claude mcp add --transport stdio course-catalog -- /ABS/PROJECT/.venv/bin/python /ABS/PROJECT/labs/session-3/server.py
claude mcp list
```
درخواست پیشنهادی: «با ابزار course-catalog جلسه‌های مربوط به MCP را حداکثر در یک نتیجه پیدا کن و سپس سرفصل همان جلسه را بخوان.»
## پاسخ مرجع
list_tools شامل search_lessons و get_session است. resource شش رکورد دارد و هرکدام duration=120 دارند. جستجو بر پایهٔ substring در محتوای دوره است، پس ممکن است چند جلسه شامل MCP باشند؛ با limit=1 دقیقاً یک رکورد برمی‌گردد. get_session(3) باید ۲۴ عنوان اسلاید جلسهٔ سوم را بدهد.
## مدل تهدید و محدودیت
این سرور فقط STDIO محلی و خواندن دادهٔ عمومی مشخص است. URL دلخواه، shell، نوشتن فایل و publish ندارد. هیچ OAuth server در آن پیاده نشده است. برای HTTP عمومی باید TLS، بررسی Origin، authorization استاندارد، audience، scope، محدودیت نرخ و logging پالایش‌شده اضافه شود. stdout مخصوص پروتکل است؛ log روی stderr باشد.
## تشخیص خطا و تحویل
ModuleNotFoundError یعنی Python اشتباه یا نصب ناقص است. خروجی متن عادی روی stdout می‌تواند پروتکل را خراب کند. برای تحویل، خروجی smoke، ابزارهای کشف‌شده و رد ورودی نامعتبر را ثبت کنید؛ اتصال میزبان را فقط اگر واقعاً آزمایش شده تأیید کنید.
