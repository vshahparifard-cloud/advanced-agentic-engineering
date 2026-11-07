import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync,existsSync} from 'node:fs';
const course=JSON.parse(readFileSync(new URL('../content/course.json',import.meta.url),'utf8'));
test('six complete 120-minute sessions and 147 unique slides',()=>{
 assert.equal(course.length,6);assert.equal(course.reduce((n,s)=>n+s.duration,0),720);const titles=new Set();
 for(const [i,s] of course.entries()){
  assert.equal(s.id,i+1);assert.equal(s.duration,120);assert.equal(s.slides.length,i===0?27:24);assert.equal(s.slides.reduce((n,d)=>n+d.duration,0),120);
  for(const d of s.slides){assert.ok(d.title.length>8);assert.ok(d.points.length>=3);assert.ok(d.notes.length>85);assert.ok(!titles.has(d.title),d.title);titles.add(d.title);assert.ok(!/TODO|TBD|lorem ipsum|placeholder/i.test(JSON.stringify(d)));}
 }
});
test('every deck includes architecture, runnable command, quiz and instructor notes',()=>{
 for(const s of course){assert.ok(s.slides.some(d=>d.diagram?.length>=4));assert.ok(s.slides.some(d=>d.code?.length>30));const q=s.slides.findLast(d=>d.quiz).quiz;assert.ok(q.options[q.answer]);assert.ok(q.explanation.length>30);assert.ok(existsSync(`docs/session-${s.id}-instructor.md`));assert.ok(existsSync(`labs/session-${s.id}/README.md`));}
});
test('Persian page has RTL, accessible viewer and no remote runtime dependency',()=>{
 const html=readFileSync('index.html','utf8');assert.match(html,/lang="fa" dir="rtl"/);assert.match(html,/<dialog/);assert.match(html,/aria-labelledby/);assert.ok(!/cdn\.|fonts.googleapis/.test(html));
});

import {slideWindow} from '../assets/lesson-timing.mjs';
test('handoff preserves 120-minute boundary and existing lab time',()=>{
 const slides=course[0].slides;
 assert.deepEqual(slideWindow(slides,10),{start:40,end:44});
 assert.deepEqual(slideWindow(slides,12),{start:48,end:52});
 assert.deepEqual(slideWindow(slides,26),{start:115,end:120});
 assert.deepEqual(slideWindow(slides,15),{start:60,end:65});
 assert.throws(()=>slideWindow(slides,27),RangeError);
});
