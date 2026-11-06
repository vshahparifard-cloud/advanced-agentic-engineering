import {pathToFileURL} from 'node:url';
export class ProviderError extends Error { constructor(status){super(`Provider HTTP ${status}`);this.status=status;} }
export async function route(providers,{budget=0.02,reserve=0.01}={}) {
  if (!(budget>=reserve && reserve>0)) throw new Error('Budget exceeded before provider call');
  const trace=[];
  for(const provider of providers){
    try {
      const result=await provider.call();
      if(typeof result.text!=='string' || !Number.isFinite(result.cost) || result.cost<0) throw new Error('Invalid response');
      trace.push({provider:provider.name,status:'ok',cost:result.cost});
      return {text:result.text,trace,cost:trace.reduce((n,x)=>n+x.cost,0)};
    } catch(error) {
      trace.push({provider:provider.name,status:'failed',cost:0});
      if(!(error instanceof ProviderError) || ![429,500,502,503,504].includes(error.status)) throw error;
    }
  }
  throw new Error('All providers unavailable');
}
export const demoProviders=[{name:'primary',call:async()=>{throw new ProviderError(503);}},{name:'fallback',call:async()=>({text:'MCP connects agents to bounded tools and resources.',cost:0.003})}];
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) console.log(JSON.stringify(await route(demoProviders),null,2));
