import asyncio, json, sys
from pathlib import Path
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
async def main():
    params=StdioServerParameters(command=sys.executable,args=[str(Path(__file__).with_name('server.py'))])
    async with stdio_client(params) as (read,write):
        async with ClientSession(read,write) as session:
            await session.initialize()
            tools=await session.list_tools()
            assert {t.name for t in tools.tools} == {'search_lessons','get_session'}
            result=await session.call_tool('search_lessons',{'query':'MCP','limit':1})
            assert not result.isError and len(result.structuredContent['result']) == 1
            empty=await session.call_tool('search_lessons',{'query':'no-match-xyz'})
            assert not empty.isError and empty.structuredContent['result']==[]
            bad=await session.call_tool('search_lessons',{'query':'MCP','limit':99})
            assert bad.isError
            resource=await session.read_resource('course://syllabus')
            assert sum(s['duration'] for s in json.loads(resource.contents[0].text))==720
            print('MCP: initialized; 2 tools; search bounded; empty result; invalid limit rejected; resource 720 minutes')
if __name__=='__main__': asyncio.run(main())
