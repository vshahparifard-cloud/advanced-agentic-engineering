// Feed the hooks the same JSON events Claude Code and Codex send, without any model or API key.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {cpSync, mkdtempSync, readFileSync, writeFileSync, existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const starter = new URL('./starter/', import.meta.url).pathname;
function project() {
  const dir = mkdtempSync(join(tmpdir(), 'hooks-lab-'));
  cpSync(starter, dir, {recursive: true});
  return dir;
}
function run(dir, hook, event) {
  return spawnSync(process.execPath, [join(dir, 'hooks', hook)], {input: JSON.stringify(event), encoding: 'utf8'});
}

test('guard blocks protected files from Claude Edit/Write and Codex apply_patch', () => {
  const dir = project();
  const claudeWrite = run(dir, 'guard.mjs', {hook_event_name: 'PreToolUse', tool_name: 'Write', tool_input: {file_path: join(dir, 'dist/app.js'), content: 'x'}});
  assert.equal(claudeWrite.status, 2);
  assert.match(claudeWrite.stderr, /dist\/app\.js/);
  const codexPatch = run(dir, 'guard.mjs', {hook_event_name: 'PreToolUse', tool_name: 'apply_patch', tool_input: {command: '*** Begin Patch\n*** Update File: .env\n@@\n-A=1\n+A=2\n*** End Patch'}});
  assert.equal(codexPatch.status, 2);
  assert.match(codexPatch.stderr, /\.env/);
  const normalEdit = run(dir, 'guard.mjs', {hook_event_name: 'PreToolUse', tool_name: 'Edit', tool_input: {file_path: join(dir, 'app.js'), old_string: 'a', new_string: 'b'}});
  assert.equal(normalEdit.status, 0);
  assert.equal(normalEdit.stderr, '');
});

test('guard blocks dangerous shell commands but allows ordinary ones', () => {
  const dir = project();
  for (const command of ['git push --force origin main', 'git reset --hard HEAD~1', 'rm -rf dist', 'npm publish']) {
    assert.equal(run(dir, 'guard.mjs', {tool_name: 'Bash', tool_input: {command}}).status, 2, command);
  }
  for (const command of ['npm test', 'git push origin feature', 'ls -la']) {
    assert.equal(run(dir, 'guard.mjs', {tool_name: 'Bash', tool_input: {command}}).status, 0, command);
  }
});

test('feedback loop reports only the edited file and stays silent when it is clean', () => {
  const dir = project();
  const event = {hook_event_name: 'PostToolUse', tool_name: 'Edit', tool_input: {file_path: join(dir, 'app.js')}};
  assert.equal(run(dir, 'feedback.mjs', event).status, 0);
  writeFileSync(join(dir, 'app.js'), readFileSync(join(dir, 'app.js'), 'utf8') + '\nvar total = 0;\nif (total == 0) console.log(total);\n');
  const result = run(dir, 'feedback.mjs', event);
  assert.equal(result.status, 2);
  for (const rule of ['no-var', 'eqeqeq', 'no-console']) assert.match(result.stderr, new RegExp(rule));
  const css = run(dir, 'feedback.mjs', {tool_name: 'apply_patch', tool_input: {command: '*** Begin Patch\n*** Update File: style.css\n*** End Patch'}});
  assert.equal(css.status, 0, 'the starter CSS already uses logical properties');
});

test('stop gate blocks a broken site, allows a clean one and never loops', () => {
  const dir = project();
  const clean = run(dir, 'stop-gate.mjs', {hook_event_name: 'Stop', stop_hook_active: false});
  assert.equal(clean.status, 0);
  assert.deepEqual(JSON.parse(clean.stdout), {});
  writeFileSync(join(dir, 'style.css'), readFileSync(join(dir, 'style.css'), 'utf8') + '\n.x { margin-left: 1rem; }\n');
  const broken = run(dir, 'stop-gate.mjs', {hook_event_name: 'Stop', stop_hook_active: false});
  assert.equal(broken.status, 2);
  assert.match(broken.stderr, /logical-properties/);
  assert.equal(run(dir, 'stop-gate.mjs', {hook_event_name: 'Stop', stop_hook_active: true}).status, 0);
});

test('session context works with and without Git', () => {
  const dir = project();
  const result = run(dir, 'context.mjs', {hook_event_name: 'SessionStart', source: 'startup'});
  assert.equal(result.status, 0);
  assert.match(result.stdout, /RTL/);
});

test('Claude and Codex configs register the same four hooks and point at real scripts', () => {
  const claude = JSON.parse(readFileSync(join(starter, '.claude/settings.json'), 'utf8')).hooks;
  const codex = JSON.parse(readFileSync(join(starter, '.codex/hooks.json'), 'utf8')).hooks;
  assert.deepEqual(Object.keys(claude), Object.keys(codex));
  for (const config of [claude, codex]) {
    for (const groups of Object.values(config)) for (const group of groups) for (const handler of group.hooks) {
      assert.equal(handler.type, 'command');
      const script = handler.command.match(/hooks\/(\w[\w-]*\.mjs)/)[1];
      assert.ok(existsSync(join(starter, 'hooks', script)), script);
    }
  }
  assert.equal(claude.PreToolUse[0].matcher, codex.PreToolUse[0].matcher);
});
