"""Real Langfuse instrumentation around the same actual model call."""
import os, json
from langfuse import get_client
from live import request_answer

def main():
    client=get_client()
    try:
        with client.start_as_current_observation(as_type='span',name='course-routing'):
            with client.start_as_current_observation(as_type='generation',name='course-answer',model=os.environ['MODEL']) as generation:
                result=request_answer()
                usage=result['usage']
                counts={key:usage[field] for key,field in [('input','prompt_tokens'),('output','completion_tokens')] if isinstance(usage.get(field),int)}
                update={'input':'Explain MCP in one sentence.','output':result['text'],'model':result['model'],'usage_details':counts}
                if isinstance(usage.get('cost'),(int,float)):
                    update['cost_details']={'total':usage['cost']}
                generation.update(**update)
                print(json.dumps(result,ensure_ascii=False,indent=2))
    finally:
        client.flush()
    print('Trace flushed; verify course-routing in the Langfuse project.')

if __name__=='__main__': main()
