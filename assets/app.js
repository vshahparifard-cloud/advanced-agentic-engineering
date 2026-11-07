const $ = id => document.getElementById(id);
const root = new URL('../', import.meta.url);
const link = path => new URL(path, root).href;
const fa = value => new Intl.NumberFormat('fa-IR').format(value);
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const storage = {get(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}},set(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch{/* Browsing remains usable with storage disabled. */}}};
let course=[],session=null,index=0,opener=null;
const dialog=$('viewer');
const normalize=text=>text.toLowerCase().replace(/ي/g,'ی').replace(/ك/g,'ک');
function notify(text){$('toast').textContent=text;$('toast').style.display='block';setTimeout(()=>$('toast').style.display='none',2500);}
function progress(){const done=storage.get('aae-complete',[]);$('course-progress').value=done.length;$('progress-label').textContent=`${fa(done.length)} از ۶ جلسه مطالعه شده`;}
function cards(query=''){
 const done=storage.get('aae-complete',[]), q=normalize(query.trim());
 const visible=course.filter(s=>normalize([s.title,s.en,s.description,...s.tags,...s.slides.map(x=>x.title)].join(' ')).includes(q));
 $('session-grid').innerHTML=visible.map(s=>`<article class="session-card"><div class="card-meta"><span class="session-num" lang="en" dir="ltr">SESSION ${String(s.id).padStart(2,'0')}</span><span>◷ ۲ ساعت · ۲۴ اسلاید</span></div><h3>${esc(s.title)}</h3><div class="english" dir="ltr" lang="en">${esc(s.en)}</div><p>${esc(s.description)}</p><div class="tags">${s.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div><div class="card-actions"><a class="deck-link" href="${link(`slides/session-${s.id}.html`)}"><span>▷ مشاهده و ارائهٔ اسلایدها</span><span aria-hidden="true">←</span></a><div class="card-subactions"><a href="${link(`docs/lab-${s.id}.html`)}">⌘ آزمایشگاه و پاسخ</a><a href="${link(`docs/session-${s.id}-instructor.html`)}">▤ یادداشت مدرس</a></div></div><label class="complete-label"><input type="checkbox" data-complete="${s.id}" ${done.includes(s.id)?'checked':''}>این جلسه را مطالعه کردم</label></article>`).join('');
 $('empty').hidden=visible.length>0;$('result-count').textContent=`${fa(visible.length)} جلسه`;
}
function diagram(nodes){return `<div class="diagram" aria-label="نمودار معماری">${nodes.map((n,i)=>`${i?'<i aria-hidden="true">←</i>':''}<span>${esc(n)}</span>`).join('')}</div>`;}
function comparisonTable(table){return `<div class="comparison-wrap"><table class="slide-comparison"><caption>${esc(table.caption)}</caption><thead><tr>${table.headings.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row=>`<tr>${row.map((cell,i)=>i===0?`<th scope="row">${esc(cell)}</th>`:`<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function slideContent(s,i,print=false){const d=s.slides[i];return `<div class="slide-kicker" lang="en">SESSION ${String(s.id).padStart(2,'0')} / ${String(i+1).padStart(2,'0')}</div><h3>${esc(d.title)}</h3><ul>${d.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>${d.comparison?comparisonTable(d.comparison):''}${d.diagram?diagram(d.diagram):''}${d.code?`<pre><code>${esc(d.code)}</code></pre>${print?'':'<button class="copy-code" type="button">کپی نمونه</button>'}`:''}${d.quiz&&!print?`<section class="quiz"><h4>${esc(d.quiz.question)}</h4>${d.quiz.options.map((o,n)=>`<button data-answer="${n}">${esc(o)}</button>`).join('')}<p class="quiz-feedback" role="status"></p></section>`:''}${print&&d.quiz?`<p><b>پرسش: </b>${esc(d.quiz.question)}</p><p>پاسخ: ${esc(d.quiz.options[d.quiz.answer])} — ${esc(d.quiz.explanation)}</p>`:''}${d.sources?`<p class="slide-sources">منابع رسمی: ${d.sources.map(source=>`<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a>`).join(' · ')}</p>`:''}`;}
function showSlide(){
 const d=session.slides[index];
 $('slide').classList.toggle('comparison-slide',Boolean(d.comparison));
 $('slide').innerHTML=slideContent(session,index);
 $('deck-title').textContent=session.title;
 $('deck-meta').textContent=`جلسهٔ ${fa(session.id)} · ${session.en}`;
 $('slide-select').value=String(index);$('slide-total').textContent=`از ${fa(session.slides.length)}`;
 $('slide-progress').max=session.slides.length;$('slide-progress').value=index+1;
 $('slide-time').textContent=`دقیقهٔ ${fa(index*5)}–${fa((index+1)*5)} از ۱۲۰`;
 $('speaker-notes').innerHTML=`<strong>یادداشت مدرس · ۵ دقیقه</strong><p>${esc(d.notes)}</p>`;
 $('prev').disabled=index===0;$('next').disabled=index===session.slides.length-1;
 document.querySelectorAll('#toc button').forEach((b,i)=>b.setAttribute('aria-current',String(i===index)));
 document.querySelector('.slide-area').scrollTop=0;
 storage.set(`aae-slide-${session.id}`,index);
 history.replaceState(null,'',`${location.pathname}${location.search}#slide-${index+1}`);
 document.title=`${d.title} | جلسهٔ ${fa(session.id)}`;
}
function openDeck(id){
 session=course.find(s=>s.id===id);if(!session)return;
 const hash=location.hash.match(/^#slide-(\d+)$/);const saved=storage.get(`aae-slide-${id}`,0);
 const candidate=hash?Number(hash[1])-1:saved;
 index=Number.isInteger(candidate)?Math.max(0,Math.min(session.slides.length-1,candidate)):0;
 opener=document.activeElement;
 $('slide-select').innerHTML=session.slides.map((d,i)=>`<option value="${i}">${fa(i+1)}</option>`).join('');
 $('toc').innerHTML=session.slides.map((d,i)=>`<button data-slide="${i}">${fa(i+1)}. ${esc(d.title)}</button>`).join('');
 dialog.showModal();document.body.style.overflow='hidden';showSlide();
}
function closeDeck(){dialog.close();document.body.style.overflow='';if(document.body.dataset.session){location.href=root.href;}else{opener?.focus();}}
function navigate(delta){if(!session)return;index=Math.max(0,Math.min(session.slides.length-1,index+delta));showSlide();}
$('search').addEventListener('input',event=>cards(event.target.value));
$('session-grid').addEventListener('change',event=>{const id=Number(event.target.dataset.complete);if(!id)return;const done=storage.get('aae-complete',[]).filter(x=>x!==id);if(event.target.checked)done.push(id);storage.set('aae-complete',done);progress();});
$('next').onclick=()=>navigate(1);$('prev').onclick=()=>navigate(-1);
$('slide-select').onchange=event=>{index=Number(event.target.value);showSlide();};
$('toc').onclick=event=>{const button=event.target.closest('[data-slide]');if(button){index=Number(button.dataset.slide);showSlide();}};
$('toc-toggle').onclick=()=>{$('toc').hidden=!$('toc').hidden;$('toc-toggle').setAttribute('aria-expanded',String(!$('toc').hidden));};
$('notes-toggle').onclick=()=>{$('speaker-notes').hidden=!$('speaker-notes').hidden;$('notes-toggle').setAttribute('aria-pressed',String(!$('speaker-notes').hidden));};
$('close-deck').onclick=closeDeck;
 dialog.addEventListener('cancel',event=>{event.preventDefault();closeDeck();});
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await dialog.requestFullscreen();}catch{notify('نمایش تمام‌صفحه در این مرورگر در دسترس نیست.');}};
$('slide').onclick=async event=>{
 const answer=event.target.closest('[data-answer]');
 if(answer){const q=session.slides[index].quiz;const selected=Number(answer.dataset.answer);const feedback=$('slide').querySelector('.quiz-feedback');answer.classList.add(selected===q.answer?'correct':'wrong');feedback.textContent=(selected===q.answer?'پاسخ درست است. ':'دوباره بررسی کنید. ')+q.explanation;}
 if(event.target.closest('.copy-code')){try{await navigator.clipboard.writeText(session.slides[index].code);notify('نمونه کپی شد.');}catch{notify('امکان کپی خودکار نیست؛ متن نمونه را انتخاب کنید.');}}
};
$('print-deck').onclick=()=>{
 document.querySelector('.print-only')?.remove();const printable=document.createElement('div');printable.className='print-only';
 printable.innerHTML=session.slides.map((d,i)=>`<section class="print-slide">${slideContent(session,i,true)}<p class="notes"><b>یادداشت مدرس: </b>${esc(d.notes)}</p><small>جلسهٔ ${fa(session.id)} / اسلاید ${fa(i+1)} / دقیقهٔ ${fa(i*5)} تا ${fa((i+1)*5)}</small></section>`).join('');document.body.append(printable);window.print();
};
window.addEventListener('keydown',event=>{if(!dialog.open||/INPUT|SELECT|TEXTAREA/.test(event.target.tagName))return;if(['ArrowLeft','PageDown',' '].includes(event.key)){event.preventDefault();navigate(1);}if(['ArrowRight','PageUp'].includes(event.key)){event.preventDefault();navigate(-1);}if(event.key==='Home'){event.preventDefault();index=0;showSlide();}if(event.key==='End'){event.preventDefault();index=session.slides.length-1;showSlide();}if(event.key.toLowerCase()==='n')$('notes-toggle').click();});
window.addEventListener('hashchange',()=>{if(!session)return;const n=location.hash.match(/^#slide-(\d+)$/);if(n){index=Math.max(0,Math.min(23,Number(n[1])-1));showSlide();}});
try{const response=await fetch(link('content/course.json'));if(!response.ok)throw new Error('Course data unavailable');course=await response.json();cards();progress();if(document.body.dataset.session)openDeck(Number(document.body.dataset.session));}
catch(error){$('session-grid').textContent='بارگذاری محتوا انجام نشد. اتصال را بررسی و صفحه را تازه‌سازی کنید؛ سیلابس و یادداشت‌ها از پیوندهای ثابت در دسترس‌اند.';console.error(error);}
