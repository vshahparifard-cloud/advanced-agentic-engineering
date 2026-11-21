"""Single-host POSIX job runner with locking, atomic state and bounded process groups."""
import fcntl, json, os, signal, subprocess, sys, tempfile
from pathlib import Path
class Runner:
    def __init__(self,path):self.path=Path(path)
    def run(self,job_id,command,timeout=5,retry=False):
        self.path.parent.mkdir(parents=True,exist_ok=True)
        with self.path.with_suffix('.lock').open('w') as lock:
            fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
            state=json.loads(self.path.read_text()) if self.path.exists() else {}
            old=state.get(job_id,{})
            if old.get('status')=='succeeded':return {'status':'skipped','previous':old}
            if old.get('status')=='running':
                state[job_id]={'status':'unknown','reason':'Previous process stopped before recording a terminal result'}
                self._write(state)
                return state[job_id]
            if old.get('status') in ('failed','unknown') and not retry:
                return {'status':'blocked','reason':'Inspect external effects, then explicitly retry'}
            state[job_id]={'status':'running'};self._write(state)
            try:
                process=subprocess.Popen(command,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True,start_new_session=True)
                try:
                    out,err=process.communicate(timeout=timeout)
                    result={'status':'succeeded' if process.returncode==0 else 'failed','returncode':process.returncode,'stdout':out,'stderr':err}
                except subprocess.TimeoutExpired:
                    os.killpg(process.pid,signal.SIGKILL);process.communicate()
                    result={'status':'unknown','reason':'Timed out; reconcile external effects before retry'}
            except OSError as error:result={'status':'failed','reason':str(error)}
            state[job_id]=result;self._write(state);return result
    def _write(self,state):
        fd,name=tempfile.mkstemp(dir=self.path.parent,prefix='.runner-')
        try:
            with os.fdopen(fd,'w') as file:json.dump(state,file);file.flush();os.fsync(file.fileno())
            os.replace(name,self.path)
        finally:
            if os.path.exists(name):os.unlink(name)
if __name__=='__main__':
    runner=Runner(Path(tempfile.gettempdir())/'advanced-course-demo.state.json')
    print(json.dumps(runner.run('course-demo-v1',[sys.executable,'-c','print("bounded job complete")']),indent=2))
