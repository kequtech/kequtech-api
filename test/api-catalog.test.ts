import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { validator } from '@kequtech/json-valid';
import { API_CATALOG } from '../src/api-catalog.ts';

describe('examples', () => {
    test('valid', () => {
        for (const product of API_CATALOG) {
            for (const [i, version] of product.versions.entries()) {
                const result = validator(version.parameters)(version.example);
                assert.deepEqual(result, { ok: true }, `${product.name} v${i+1} failed example challenge.`);
            }
        }
    });
});
