// A local stand-in for an Anthropic-compatible model API. No real model, no key, no cost.
// Point a harness at it (ANTHROPIC_BASE_URL=http://127.0.0.1:8787) and see exactly what the
// harness sends: model name, system prompt size, how many tools, which headers.
import {createServer} from 'node:http';
import {appendFileSync} from 'node:fs';

export const REPLY = 'پاسخ از مدل آموزشی محلی: هارنس درخواست را به آدرسی غیر از Anthropic فرستاد.';

export function summarize(req, body) {
  const auth = req.headers['x-api-key'] ? 'x-api-key' : req.headers.authorization?.startsWith('Bearer ') ? 'bearer' : 'none';
  const system = Array.isArray(body.system) ? body.system.map(b => b.text ?? '').join('') : body.system ?? '';
  return {
    time: new Date().toISOString(),
    path: req.url,
    model: body.model,
    stream: Boolean(body.stream),
    max_tokens: body.max_tokens,
    system_chars: system.length,
    messages: body.messages?.length ?? 0,
    tools: body.tools?.length ?? 0,
    tool_names: (body.tools ?? []).slice(0, 8).map(t => t.name),
    thinking: body.thinking?.type ?? null,
    anthropic_version: req.headers['anthropic-version'] ?? null,
    anthropic_beta: req.headers['anthropic-beta'] ?? null,
    auth, // the key itself is never logged
  };
}

function message(model, inputTokens) {
  return {id: 'msg_local_mock', type: 'message', role: 'assistant', model, content: [{type: 'text', text: REPLY}],
    stop_reason: 'end_turn', stop_sequence: null, usage: {input_tokens: inputTokens, output_tokens: 24}};
}

function stream(res, model, inputTokens) {
  res.writeHead(200, {'content-type': 'text/event-stream', 'cache-control': 'no-cache'});
  const send = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify({type: event, ...data})}\n\n`);
  send('message_start', {message: {...message(model, inputTokens), content: [], stop_reason: null, usage: {input_tokens: inputTokens, output_tokens: 1}}});
  send('content_block_start', {index: 0, content_block: {type: 'text', text: ''}});
  send('content_block_delta', {index: 0, delta: {type: 'text_delta', text: REPLY}});
  send('content_block_stop', {index: 0});
  send('message_delta', {delta: {stop_reason: 'end_turn', stop_sequence: null}, usage: {output_tokens: 24}});
  send('message_stop', {});
  res.end();
}

export function createMock({log = null, quiet = false} = {}) {
  return createServer((req, res) => {
    const path = req.url.split('?')[0];
    if (req.method === 'GET' && path === '/v1/models') {
      res.writeHead(200, {'content-type': 'application/json'});
      return res.end(JSON.stringify({data: [{type: 'model', id: 'claude-local-mock', display_name: 'Local mock'}], has_more: false}));
    }
    if (req.method !== 'POST' || !['/v1/messages', '/v1/messages/count_tokens'].includes(path)) {
      res.writeHead(404, {'content-type': 'application/json'});
      return res.end(JSON.stringify({type: 'error', error: {type: 'not_found_error', message: `${req.method} ${path}`}}));
    }
    let raw = '';
    req.on('data', chunk => { raw += chunk; });
    req.on('end', () => {
      let body;
      try { body = JSON.parse(raw); }
      catch {
        res.writeHead(400, {'content-type': 'application/json'});
        return res.end(JSON.stringify({type: 'error', error: {type: 'invalid_request_error', message: 'body is not JSON'}}));
      }
      const inputTokens = Math.ceil(raw.length / 4);
      if (path.endsWith('count_tokens')) {
        res.writeHead(200, {'content-type': 'application/json'});
        return res.end(JSON.stringify({input_tokens: inputTokens}));
      }
      const summary = summarize(req, body);
      if (!quiet) console.log(JSON.stringify(summary));
      if (log) appendFileSync(log, JSON.stringify(summary) + '\n');
      if (body.stream) return stream(res, body.model, inputTokens);
      res.writeHead(200, {'content-type': 'application/json'});
      res.end(JSON.stringify(message(body.model, inputTokens)));
    });
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 8787);
  createMock({log: 'requests.jsonl'}).listen(port, '127.0.0.1', () => {
    console.error(`Mock Anthropic API on http://127.0.0.1:${port} — every request is summarized here and in requests.jsonl`);
  });
}
