import json,sys,tempfile,unittest
from pathlib import Path
from runner import Runner
class RunnerTest(unittest.TestCase):
    def setUp(self):self.temp=tempfile.TemporaryDirectory();self.path=Path(self.temp.name)/'state.json';self.runner=Runner(self.path)
    def tearDown(self):self.temp.cleanup()
    def test_idempotency(self):
        self.assertEqual(self.runner.run('a',[sys.executable,'-c','print(1)'])['status'],'succeeded')
        self.assertEqual(self.runner.run('a',['missing-command'])['status'],'skipped')
    def test_failure_and_retry(self):
        self.assertEqual(self.runner.run('b',[sys.executable,'-c','raise SystemExit(3)'])['status'],'failed')
        self.assertEqual(self.runner.run('b',[sys.executable,'-c','pass'])['status'],'blocked')
        self.assertEqual(self.runner.run('b',[sys.executable,'-c','pass'],retry=True)['status'],'succeeded')
    def test_timeout_unknown(self):
        self.assertEqual(self.runner.run('c',[sys.executable,'-c','import time; time.sleep(2)'],timeout=.05)['status'],'unknown')
    def test_reconcile_stale(self):
        self.path.write_text(json.dumps({'d':{'status':'running'}}))
        self.assertEqual(self.runner.run('d',['missing'])['status'],'unknown')
