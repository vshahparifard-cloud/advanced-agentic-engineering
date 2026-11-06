"""Read-only website catalog via the official MCP Python SDK."""
import json
from pathlib import Path
from typing import Annotated
from pydantic import Field
from mcp.server.fastmcp import FastMCP
mcp = FastMCP('Course Catalog')
ROOT = Path(__file__).resolve().parents[2]
def catalog():
    return json.loads((ROOT / 'content/course.json').read_text())
def normalize(text):
    return text.casefold().replace('ي','ی').replace('ك','ک')
@mcp.tool()
def search_lessons(query: Annotated[str, Field(min_length=1, max_length=120)], limit: Annotated[int, Field(ge=1, le=6)] = 3) -> list[dict]:
    """Find course sessions by a literal query; returns only bounded public metadata."""
    q=normalize(query.strip())
    if not q: raise ValueError('query must not be whitespace')
    return [{'id':s['id'],'title':s['title'],'duration':s['duration']} for s in catalog()
            if q in normalize(json.dumps(s, ensure_ascii=False))][:limit]
@mcp.tool()
def get_session(session_id: Annotated[int, Field(ge=1, le=6)]) -> dict:
    """Return the title, duration and public slide headings for one session."""
    s=catalog()[session_id-1]
    return {'id':s['id'],'title':s['title'],'duration':s['duration'],'slides':[x['title'] for x in s['slides']]}
@mcp.resource('course://syllabus')
def syllabus() -> str:
    return json.dumps([{'id':s['id'],'title':s['title'],'duration':s['duration']} for s in catalog()],ensure_ascii=False)
if __name__ == '__main__':
    mcp.run(transport='stdio')
