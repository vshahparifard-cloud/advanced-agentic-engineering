"""Normalize untrusted GitHub/GitLab fixture data without executing code or posting."""
import json,re,sys
from pathlib import PurePosixPath
def plan(data):
    host=data.get('host');sha=data.get('head_sha');files=data.get('files')
    if host not in ('github','gitlab') or not isinstance(sha,str) or not re.fullmatch(r'[a-f0-9]{40}',sha):raise ValueError('Invalid host or immutable head SHA')
    if not isinstance(files,list) or any(not isinstance(p,str) or not p or PurePosixPath(p).is_absolute() or '..' in PurePosixPath(p).parts for p in files):raise ValueError('Unsafe file path')
    return {'host':host,'head_sha':sha,'files':files,'action':'read-only-review','post':False}
if __name__=='__main__':print(json.dumps(plan(json.load(open(sys.argv[1]))),indent=2))
