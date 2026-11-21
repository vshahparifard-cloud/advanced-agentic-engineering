import unittest
from review_plan import plan
class PlanTest(unittest.TestCase):
    def test_both_hosts(self):
        for host in ['github','gitlab']:self.assertFalse(plan({'host':host,'head_sha':'a'*40,'files':['src/a.py']})['post'])
    def test_unsafe(self):
        for path in ['../secret','/etc/passwd']:
            with self.assertRaises(ValueError):plan({'host':'github','head_sha':'a'*40,'files':[path]})
    def test_mutable_head(self):
        with self.assertRaises(ValueError):plan({'host':'gitlab','head_sha':'main','files':[]})
