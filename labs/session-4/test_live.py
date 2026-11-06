"""Verify the HTTP contract without a paid service or real credentials."""
import json,os,threading,unittest
from http.server import BaseHTTPRequestHandler,HTTPServer
from unittest.mock import patch
from live import request_answer
class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        data=json.loads(self.rfile.read(int(self.headers['Content-Length'])))
        assert self.path=='/v1/chat/completions' and data['max_tokens']==120
        assert self.headers['Authorization']=='Bearer synthetic-test-only'
        self.send_response(200);self.send_header('Content-Type','application/json');self.end_headers()
        self.wfile.write(json.dumps({'model':'fixture','usage':{'prompt_tokens':20,'completion_tokens':9,'cost':.001},'choices':[{'message':{'content':'MCP exposes tools.'}}]}).encode())
    def log_message(self,*args):pass
class LiveContract(unittest.TestCase):
    def test_usage_preserved(self):
        server=HTTPServer(('127.0.0.1',0),Handler);thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start()
        try:
            with patch.dict(os.environ,{'BASE_URL':f'http://127.0.0.1:{server.server_port}/v1','GATEWAY_API_KEY':'synthetic-test-only','MODEL':'fixture'}):
                result=request_answer()
                self.assertEqual(result['usage']['cost'],.001);self.assertEqual(result['text'],'MCP exposes tools.')
        finally:server.shutdown();thread.join();server.server_close()
    def test_remote_http_rejected_before_sending_credentials(self):
        with patch.dict(os.environ,{'BASE_URL':'http://remote.invalid/v1'}):
            with self.assertRaises(ValueError):request_answer()
