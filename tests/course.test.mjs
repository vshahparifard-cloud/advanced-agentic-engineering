import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync,existsSync} from 'node:fs';
const course=JSON.parse(readFileSync(new URL('../content/course.json',import.meta.url),'utf8'));
test('six complete 120-minute sessions and 144 unique slides',()=>{
 assert.equal(course.length,6);assert.equal(course.reduce((n,s)=>n+s.duration,0),720);const titles=new Set();
 for(const [i,s] of course.entries()){
  assert.equal(s.id,i+1);assert.equal(s.duration,120);assert.equal(s.slides.length,24);assert.equal(s.slides.reduce((n,d)=>n+d.duration,0),120);
  for(const d of s.slides){assert.ok(d.title.length>8);assert.ok(d.points.length>=3);assert.ok(d.notes.length>85);assert.ok(!titles.has(d.title),d.title);titles.add(d.title);assert.ok(!/TODO|TBD|lorem ipsum|placeholder/i.test(JSON.stringify(d)));}
 }
});
test('every deck includes architecture, runnable command, quiz and instructor notes',()=>{
 for(const s of course){assert.ok(s.slides[10].diagram.length>=4);assert.ok(s.slides[11].code.length>30);const q=s.slides[22].quiz;assert.ok(q.options[q.answer]);assert.ok(q.explanation.length>30);assert.ok(existsSync(`docs/session-${s.id}-instructor.md`));assert.ok(existsSync(`labs/session-${s.id}/README.md`));}
});
test('Persian page has RTL, accessible viewer and no remote runtime dependency',()=>{
 const html=readFileSync('index.html','utf8');assert.match(html,/lang="fa" dir="rtl"/);assert.match(html,/<dialog/);assert.match(html,/aria-labelledby/);assert.ok(!/cdn\.|fonts.googleapis/.test(html));
});
