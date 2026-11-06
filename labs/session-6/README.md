# آزمایشگاه 6 — Headless، PR و بازیابی

## پیش از کلاس
Node.js 22 یا بالاتر، Python 3.11 یا بالاتر و Git لازم است. تمرین را در یک checkout آموزشی اجرا کنید. هیچ کلید یا فایل ورود را commit نکنید. همهٔ فرمان‌ها از ریشهٔ مخزن هستند مگر مسیر دیگری ذکر شود. فایل‌های کامل و پاسخ مرجع همراه تمرین‌اند؛ فعالیت کلاس بازبینی، تغییر کنترل‌شده و آزمون شکست است.

## هدف و خروجی
یک job محدود با وضعیت ماندگار، timeout و جلوگیری از تکرار اجرا کنید. سپس دادهٔ PR و MR را بدون اثر خارجی به برنامهٔ بازبینی تبدیل کنید. زمان فعالیت: ۲۵ دقیقه.
## گام‌ها — هر گام ۵ دقیقه
1. report.schema.json را بخوانید و یک گزارش مصنوعی با شاهد فایل بسازید.
2. با حساب مجاز CLI رسمی را read-only اجرا کنید، یا fixture را بازبینی کنید. stdout و stderr باید جدا باشند.
3. runner را دو بار اجرا کنید؛ بار دوم skipped است. سپس آزمون شکست و timeout را بخوانید.
4. state ناتمام را unknown بدانید. اثر خارجی را پیش از retry بررسی کنید.
5. fixture هر دو میزبان را normalize کنید؛ head SHA باید ثابت و مسیر فایل نسبی امن باشد.
```sh
python3 labs/session-6/runner.py
python3 labs/session-6/runner.py
python3 -m unittest discover -s labs/session-6 -p 'test_*.py'
python3 labs/session-6/review_plan.py labs/session-6/github.json
python3 labs/session-6/review_plan.py labs/session-6/gitlab.json
```
## اجرای رسمی Codex و Claude
```sh
codex login status
codex exec --sandbox read-only --output-schema labs/session-6/report.schema.json -o report.json "Review this repository without editing; cite file evidence and state which tests were run"
claude -p "Explain this repository without editing files" --allowedTools Read --output-format json
```
CLI محلی می‌تواند از ورود رسمی واجد شرایط استفاده کند. codex exec از credential ذخیره‌شده بهره می‌برد. API و اشتراک صورت‌حساب و سیاست جدا دارند. توکن مرورگر استخراج نشود و به gateway شخص ثالث داده نشود. برای CI مسیر رسمی مستند همان محصول و نوع حساب را انتخاب کنید؛ مثال سایت، اجرای پولی عامل را خودکار زمان‌بندی نمی‌کند.
## خواندن PR و MR واقعی — اختیاری و فقط مخزن مجاز
```sh
gh pr view 123 --repo OWNER/REPO --json headRefOid,files,title
gh pr diff 123 --repo OWNER/REPO
glab mr view 123 --repo OWNER/REPO --output json
glab mr diff 123 --repo OWNER/REPO
```
OWNER/REPO و شماره‌ها پارامتر آموزشی‌اند و باید با مقصد مجاز جایگزین شوند. schema خروجی دو CLI را مستقیماً یکسان فرض نکنید؛ normalize و head SHA را بررسی کنید. تمرین هیچ کامنت، merge یا push خودکار انجام نمی‌دهد.
## الگوی زمان‌بندی قابل بررسی
برای یک runner خصوصی و از پیش احراز هویت‌شده می‌توانید پس از تست از cron استفاده کنید. نمونهٔ زیر ساعت ۰۹:۰۰ UTC است، نه منطقهٔ زمانی دستگاه:
```cron
0 9 * * 1-5 cd /ABS/TRUSTED/CHECKOUT && /ABS/PYTHON /ABS/TRUSTED/CHECKOUT/job.py
```
این خط در پروژه نصب نشده است. job.py باید قرارداد مشخص، timeout، قفل و log پالایش‌شده داشته باشد. در GitHub Actions نیز concurrency و permissions را صریح کنید؛ کد fork را با secrets اجرا نکنید و از pull_request_target برای اجرای checkout نامطمئن استفاده نکنید.
## پاسخ و محدودیت‌ها
runner بار اول succeeded و بار دوم skipped می‌دهد. تست شکست failed، timeout unknown و running قدیمی unknown است. retry تنها برای failed/unknown و با retry=True مجاز است؛ بررسی اثر بیرونی مسئولیت caller است. این نمونه برای یک میزبان POSIX است؛ قفل fcntl و فایل محلی جای ledger توزیع‌شده، queue و sandbox تولیدی را نمی‌گیرند. stdout در این تمرین کوچک است؛ در محیط واقعی حجم خروجی را محدود و secret را پالایش کنید.
## Runbook
ابتدا کار تکراری را متوقف کنید؛ commit و run ID را ثبت کنید؛ در مقصد بررسی کنید آیا PR یا اثر مورد نظر ایجاد شده؛ سپس retry یا rollback را آگاهانه اجرا کنید. پایان بازیابی فقط با آزمون و مشاهدهٔ نتیجه تأیید می‌شود. پاک کردن ledger به‌عنوان راه‌حل عادی مجاز نیست.
## معیار تحویل
هفت آزمون runner و normalization، شاهد skipped، توضیح unknown و برنامهٔ review برای دو میزبان. برای پروژهٔ نهایی از rubric سیلابس استفاده کنید.
