import os
from langfuse import get_client
from importlib.util import spec_from_file_location, module_from_spec
from pathlib import Path
client=get_client()
with client.start_as_current_observation(as_type='span',name='course-routing'):
    with client.start_as_current_observation(as_type='generation',name='course-answer',model=os.environ['MODEL']) as generation:
        spec=spec_from_file_location('live',Path(__file__).with_name('live.py'))
        module=module_from_spec(spec)
        spec.loader.exec_module(module)
        generation.update(output='Synthetic request completed; content printed locally')
client.flush()
print('Trace flushed; verify the course-routing trace in your Langfuse project.')
