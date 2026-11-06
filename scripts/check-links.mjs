import {readFileSync,readdirSync,existsSync} from 'node:fs';import {resolve,dirname,join} from 'node:path';
function walk(path){return readdirSync(path,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(path,e.name)):[join(path,e.name)]);}
let count=0;const failures=[];
for(const path of walk('dist').filter(p=>p.endsWith('.html'))){const html=readFileSync(path,'utf8');const base=html.includes('<base href="../">')?resolve(dirname(path),'..'):dirname(path);
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){const url=match[1];if(/^(https?:|#|mailto:|data:)/.test(url))continue;const local=resolve(base,url.split('#')[0].split('?')[0]);count++;if(!existsSync(local))failures.push(`${path} -> ${url}`);}
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}console.log(`Verified ${count} local page and asset links.`);
