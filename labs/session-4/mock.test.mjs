// The mock speaks enough of the Anthropic Messages API for a real harness to complete a turn.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {createMock, REPLY} from './mock-anthropic.mjs';

async function withServer(fn) {
  const server = createMock({quiet: true});
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try { await fn(`http://127.0.0.1:${server.address().port}`); }
  finally { server.close(); }
}
const request = {model: 'claude-local-mock', max_tokens: 64, system: [{type: 'text', text: 'You are a harness.'}],
  messages: [{role: 'user', content: 'سلام'}], tools: [{name: 'Bash', input_schema: {type: 'object'}}]};

test('non-streaming reply has the Messages API shape', () => withServer(async base => {
  const res = await fetch(`${base}/v1/messages?beta=true`, {method: 'POST', headers: {'x-api-key': 'k'}, body: JSON.stringify(request)});
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.type, 'message');
  assert.equal(body.content[0].text, REPLY);
  assert.equal(body.stop_reason, 'end_turn');
}));

test('streaming reply emits the Anthropic SSE event sequence', () => withServer(async base => {
  const res = await fetch(`${base}/v1/messages`, {method: 'POST', body: JSON.stringify({...request, stream: true})});
  const events = (await res.text()).match(/^event: (\w+)$/gm).map(line => line.slice(7));
  assert.deepEqual(events, ['message_start', 'content_block_start', 'content_block_delta', 'content_block_stop', 'message_delta', 'message_stop']);
}));

test('models list, token count, bad JSON and unknown routes', () => withServer(async base => {
  assert.match((await (await fetch(`${base}/v1/models`)).json()).data[0].id, /claude/);
  assert.ok((await (await fetch(`${base}/v1/messages/count_tokens`, {method: 'POST', body: JSON.stringify(request)})).json()).input_tokens > 0);
  assert.equal((await fetch(`${base}/v1/messages`, {method: 'POST', body: '{'})).status, 400);
  assert.equal((await fetch(`${base}/v1/complete`, {method: 'POST', body: '{}'})).status, 404);
}));

test('the request summary never contains the key', async () => {
  const {summarize} = await import('./mock-anthropic.mjs');
  const summary = summarize({url: '/v1/messages', headers: {authorization: 'Bearer sk-secret-123'}}, request);
  assert.equal(summary.auth, 'bearer');
  assert.equal(summary.tools, 1);
  assert.ok(!JSON.stringify(summary).includes('sk-secret'));
});

test('config examples read keys from the environment and never contain one', () => {
  const dir = new URL('./configs/', import.meta.url);
  for (const name of readdirSync(dir)) {
    const text = readFileSync(new URL(name, dir), 'utf8');
    assert.ok(!/sk-[A-Za-z0-9]{8,}/.test(text), name);
    if (name.endsWith('.json')) JSON.parse(text);
  }
  assert.match(readFileSync(new URL('claude-deepseek.sh', dir), 'utf8'), /ANTHROPIC_AUTH_TOKEN="\$DEEPSEEK_API_KEY"/);
});
