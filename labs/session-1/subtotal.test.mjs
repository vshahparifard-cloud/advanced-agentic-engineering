import {test} from 'node:test';
import assert from 'node:assert/strict';
import {subtotal} from './subtotal.mjs';
test('empty input is zero',()=>assert.equal(subtotal([]),0));
test('decimal inputs remain numeric',()=>assert.equal(subtotal([1.5,2.25]),3.75));
test('negative input is rejected',()=>assert.throws(()=>subtotal([-1]),TypeError));
test('non-finite and string values are rejected',()=>{
  for (const value of [NaN,Infinity,'2']) assert.throws(()=>subtotal([value]),TypeError);
});
