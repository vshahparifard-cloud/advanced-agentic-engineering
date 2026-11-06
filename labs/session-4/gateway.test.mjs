import {test} from 'node:test'; import assert from 'node:assert/strict';
import {route,ProviderError,demoProviders} from './gateway.mjs';
test('503 falls back and records both attempts',async()=>{const r=await route(demoProviders);assert.equal(r.trace.length,2);assert.equal(r.cost,0.003);});
test('400 fails without retry',async()=>{let called=false;await assert.rejects(route([{name:'bad',call:async()=>{throw new ProviderError(400);}},{name:'second',call:async()=>{called=true;}}]));assert.equal(called,false);});
test('insufficient reservation prevents call',async()=>{let called=false;await assert.rejects(route([{name:'x',call:async()=>{called=true;}}],{budget:0}));assert.equal(called,false);});
test('outage terminates',async()=>assert.rejects(route([demoProviders[0]]),/unavailable/));
