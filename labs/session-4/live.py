"""OpenRouter directly, or LiteLLM via BASE_URL. Sends only synthetic course text."""
import json, os, urllib.request
base=os.environ.get('BASE_URL','https://openrouter.ai/api/v1').rstrip('/')
key=os.environ.get('GATEWAY_API_KEY') or os.environ['OPENROUTER_API_KEY']
body={'model':os.environ['MODEL'],'messages':[{'role':'user','content':'Explain MCP in one sentence.'}],'max_tokens':120}
request=urllib.request.Request(base+'/chat/completions',data=json.dumps(body).encode(),headers={'Authorization':'Bearer '+key,'Content-Type':'application/json'})
with urllib.request.urlopen(request, timeout=30) as response:
    result=json.load(response)
print(json.dumps({'model':result['model'],'usage':result.get('usage'),'text':result['choices'][0]['message']['content']},ensure_ascii=False,indent=2))
