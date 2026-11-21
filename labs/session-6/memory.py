"""Deterministic temporal-memory teaching model; this is NOT Graphiti."""
import json
from dataclasses import dataclass, asdict
from datetime import datetime
@dataclass
class Fact:
    tenant: str
    subject: str
    owner: str
    valid_from: str
    valid_to: str | None
    source: str
    recorded_at: str
class Memory:
    def __init__(self): self.facts=[]
    def add(self, fact):
        if not fact.tenant or not fact.source: raise ValueError('Tenant and source required')
        start=datetime.fromisoformat(fact.valid_from)
        if fact.valid_to and datetime.fromisoformat(fact.valid_to)<=start: raise ValueError('Invalid interval')
        self.facts.append(fact)
    def at(self,tenant,subject,when):
        if not tenant: raise ValueError('Tenant required')
        moment=datetime.fromisoformat(when)
        return [asdict(f) for f in self.facts if f.tenant==tenant and f.subject==subject and datetime.fromisoformat(f.valid_from)<=moment and (not f.valid_to or moment<datetime.fromisoformat(f.valid_to))]
def pack_context(chunks, max_chars):
    """Whole chunks only. Character budget is NOT an accurate model-token count."""
    selected=[]
    for chunk in chunks:
        if len('\n'.join(selected+[chunk]))<=max_chars: selected.append(chunk)
    return '\n'.join(selected)
def example():
    m=Memory()
    m.add(Fact('course','payments','Sara','2026-01-01T00:00:00+00:00','2026-02-01T00:00:00+00:00','episode-1','2026-01-02T00:00:00+00:00'))
    m.add(Fact('course','payments','Leila','2026-02-01T00:00:00+00:00',None,'episode-2','2026-02-05T00:00:00+00:00'))
    return m
if __name__=='__main__':
    m=example()
    print(json.dumps({'past':m.at('course','payments','2026-01-15T00:00:00+00:00'),'current':m.at('course','payments','2026-02-10T00:00:00+00:00')},indent=2))
