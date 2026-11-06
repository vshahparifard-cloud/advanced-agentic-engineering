import unittest
from memory import example,pack_context
class MemoryTest(unittest.TestCase):
    def test_boundary(self):
        m=example()
        self.assertEqual(m.at('course','payments','2026-01-31T00:00:00+00:00')[0]['owner'],'Sara')
        self.assertEqual([x['owner'] for x in m.at('course','payments','2026-02-01T00:00:00+00:00')],['Leila'])
    def test_tenant(self):
        self.assertEqual(example().at('other','payments','2026-03-01T00:00:00+00:00'),[])
        with self.assertRaises(ValueError):example().at('','payments','2026-03-01T00:00:00+00:00')
    def test_budget(self):
        self.assertEqual(pack_context(['decision','too long'*20,'next'],14),'decision\nnext')
        self.assertEqual(pack_context(['abc'],2),'')
