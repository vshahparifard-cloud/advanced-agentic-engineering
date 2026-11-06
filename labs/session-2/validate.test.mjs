import {test} from 'node:test'; import assert from 'node:assert/strict';
import {validate} from './validate.mjs';
test('report requires test evidence',()=>assert.throws(()=>validate({summary:'ok',risks:'none'})));
test('empty evidence rejected',()=>assert.throws(()=>validate({summary:'ok',tests:' ',risks:'none'})));
test('complete report accepted',()=>assert.ok(validate({summary:'ok',tests:'4 passed',risks:'not live-tested'})));
