"""Actual Graphiti integration; requires a private local Neo4j and model credentials."""
import asyncio, os
from datetime import datetime, timezone
from graphiti_core import Graphiti
from graphiti_core.nodes import EpisodeType
async def main():
    graph=Graphiti(os.environ.get('NEO4J_URI','bolt://localhost:7687'),os.environ.get('NEO4J_USER','neo4j'),os.environ['NEO4J_PASSWORD'])
    try:
        await graph.build_indices_and_constraints()
        for name,text,month in [('course-owner-jan','Sara owns the course payments service.',1),('course-owner-feb','Leila now owns the course payments service, replacing Sara.',2)]:
            await graph.add_episode(name=name,episode_body=text,source=EpisodeType.text,source_description='Synthetic course lab',reference_time=datetime(2026,month,1,tzinfo=timezone.utc),group_id='advanced-course-lab')
        results=await graph.search('Who owns the payments service?',group_ids=['advanced-course-lab'])
        for edge in results:print(edge.fact)
    finally: await graph.close()
if __name__=='__main__':asyncio.run(main())
