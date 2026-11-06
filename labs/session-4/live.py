"""OpenRouter directly, or LiteLLM via BASE_URL. Only synthetic course data."""
import json, os, urllib.request
from urllib.parse import urlparse

def request_answer():
    base=os.environ.get('BASE_URL','https://openrouter.ai/api/v1').rstrip('/')
    parsed=urlparse(base)
    if parsed.scheme!='https' and not (parsed.scheme=='http' and parsed.hostname in ('localhost','127.0.0.1','::1')):
        raise ValueError('Use HTTPS for remote gateways')
    key=os.environ.get('GATEWAY_API_KEY') or os.environ['OPENROUTER_API_KEY']
    body={'model':os.environ['MODEL'],'messages':[{'role':'user','content':'Explain MCP in one sentence.'}],'max_tokens':120}
    request=urllib.request.Request(base+'/chat/completions',data=json.dumps(body).encode(),headers={'Authorization':'Bearer '+key,'Content-Type':'application/json'})
    with urllib.request.urlopen(request, timeout=30) as response:
        result=json.load(response)
    return {'model':result['model'],'usage':result.get('usage',{}),'text':result['choices'][0]['message']['content']}

if __name__=='__main__':
    print(json.dumps(request_answer(),ensure_ascii=False,indent=2))
