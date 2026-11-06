import {readFileSync,writeFileSync,mkdirSync,cpSync,rmSync,readdirSync,existsSync} from 'node:fs';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const out=join(root,'dist');rmSync(out,{recursive:true,force:true});mkdirSync(out,{recursive:true});
for(const p of ['assets','content'])cpSync(join(root,p),join(out,p),{recursive:true});
writeFileSync(join(out,'assets/vazirmatn.woff2'),Buffer.from(readFileSync(join(root,'assets/vazirmatn.woff2.b64'),'utf8').trim(),'base64'));
rmSync(join(out,'assets/vazirmatn.woff2.b64'));
const index=readFileSync(join(root,'index.html'),'utf8');writeFileSync(join(out,'index.html'),index);writeFileSync(join(out,'.nojekyll'),'');
const course=JSON.parse(readFileSync(join(root,'content/course.json'),'utf8'));
mkdirSync(join(out,'slides'),{recursive:true});
for(const s of course){const html=index.replace('<head>','<head>\n<base href="../">').replace('<body>',`<body data-session="${s.id}">`).replace('<title>مهندسی پیشرفتهٔ ایجنت‌های هوش مصنوعی</title>',`<title>${s.title} | ارائهٔ جلسهٔ ${s.id}</title>`);writeFileSync(join(out,`slides/session-${s.id}.html`),html);}
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function inline(s){return esc(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g,(_,label,url)=>{
 let href=url.replace(/\.md(?=#|$)/,'.html').replace(/\.\.\/labs\/session-(\d)\/README\.html/,'lab-$1.html');
 if(!/^(https?:\/\/|[.\w/-])/.test(href))return label;
 return `<a href="${href}">${label}</a>`;
});}
function markdown(source){
 const lines=source.split('\n');let html='',paragraph=[],list=null;
 const flush=()=>{if(paragraph.length){html+=`<p>${inline(paragraph.join(' '))}</p>\n`;paragraph=[];}};
 const endList=()=>{if(list){html+=`</${list}>`;list=null;}};
 for(let i=0;i<lines.length;i++){
  const line=lines[i];
  if(line.startsWith('```')){flush();endList();let code=[];while(++i<lines.length&&!lines[i].startsWith('```'))code.push(lines[i]);html+=`<pre><code>${esc(code.join('\n'))}</code></pre>`;continue;}
  if(/^\|/.test(line)&&/^\|\s*:?-/.test(lines[i+1]??'')){flush();endList();const cells=l=>l.split('|').slice(1,-1).map(x=>x.trim());html+='<table><thead><tr>'+cells(line).map(c=>`<th>${inline(c)}</th>`).join('')+'</tr></thead><tbody>';i++;while(/^\|/.test(lines[i+1]??'')){html+='<tr>'+cells(lines[++i]).map(c=>`<td>${inline(c)}</td>`).join('')+'</tr>';}html+='</tbody></table>';continue;}
  const heading=line.match(/^(#{1,6})\s+(.+)/);if(heading){flush();endList();html+=`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`;continue;}
  const item=line.match(/^(?:([-*])|\d+\.)\s+(.+)/);if(item){flush();const type=item[1]?'ul':'ol';if(list!==type){endList();html+=`<${type}>`;list=type;}html+=`<li>${inline(item[2])}</li>`;continue;}
  if(!line.trim()){flush();endList();continue;}
  if(line.startsWith('> ')){flush();endList();html+=`<blockquote>${inline(line.slice(2))}</blockquote>`;continue;}
  endList();paragraph.push(line);
 }
 flush();endList();return html;
}
mkdirSync(join(out,'docs'),{recursive:true});
const docs=readdirSync(join(root,'docs')).filter(p=>p.endsWith('.md')).map(p=>({name:p.replace('.md','.html'),text:readFileSync(join(root,'docs',p),'utf8')}));
for(let i=1;i<=6;i++)docs.push({name:`lab-${i}.html`,text:readFileSync(join(root,`labs/session-${i}/README.md`),'utf8')});
for(const doc of docs){const title=doc.text.split('\n')[0].replace(/^#\s*/,'');let body=markdown(doc.text);
 if(doc.name==='architecture.html')body+=course.map(s=>`<h2>جلسهٔ ${s.id}: ${esc(s.title)}</h2><div class="diagram">${s.slides[10].diagram.map(n=>`<span>${esc(n)}</span>`).join('<i>←</i>')}</div>`).join('');
 writeFileSync(join(out,'docs',doc.name),`<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><link rel="icon" href="../assets/icon.svg"><link rel="stylesheet" href="../assets/style.css"></head><body class="doc-body"><header class="header"><div class="container nav"><a class="brand" href="../index.html">⌘ مهندسی ایجنتیک</a><nav><a href="syllabus.html">سیلابس</a><a href="instructor.html">مدرس</a><a href="sources.html">منابع رسمی</a><a href="architecture.html">معماری</a></nav></div></header><main class="doc container">${body}</main><footer class="container footer"><a href="../index.html">بازگشت به دوره ←</a><span>۶ جلسه · ۱۲ ساعت</span></footer></body></html>`);
}
mkdirSync(join(out,'downloads'),{recursive:true});
execFileSync('python3',['-c',`from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
root=Path(${JSON.stringify(root)})
with ZipFile(root/'dist/downloads/course-labs.zip','w',ZIP_DEFLATED) as z:
 for folder in ['labs','docs','content','scripts','tests','assets','.github']:
  for p in (root/folder).rglob('*'):
   if p.is_file() and '__pycache__' not in p.parts and p.suffix not in ['.pyc','.woff2']:
    z.write(p,p.relative_to(root))
 for name in ['requirements.txt','requirements-live.txt','README.md','LICENSE','package.json','index.html','.gitignore']:
  z.write(root/name,name)
`]);
console.log(`Built ${course.length} decks, ${course.reduce((n,s)=>n+s.slides.length,0)} slides, ${docs.length} documents and lab ZIP.`);
