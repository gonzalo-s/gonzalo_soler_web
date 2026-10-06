import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { contentUrls } from '../../src/config/content.ts';

test('CI configures public content sources before building', () => {
  const workflow = readFileSync(new URL('../../.github/workflows/ci.yml', import.meta.url), 'utf8');
  const configure = workflow.indexOf('run: cp .env.example .env.local');
  const build = workflow.indexOf('run: npm run build');
  assert.ok(configure >= 0 && configure < build, 'a fresh checkout must load the public CSV endpoints before building');
  const config = readFileSync(new URL('../../src/config/content.ts', import.meta.url), 'utf8');
  const env = readFileSync(new URL('../../.env.example', import.meta.url), 'utf8');
  for (const [, name] of config.matchAll(/required\('([A-Z_]+)'\)/g)) {
    assert.match(env, new RegExp(`^${name}="https://docs.google.com/`, 'm'));
  }
});

test('required build settings trim values and identify missing or empty variables', () => {
  const name = 'PROJECT_CSV_URL';
  const previous = process.env[name];
  try {
    delete process.env[name];
    assert.throws(() => contentUrls.project, /PROJECT_CSV_URL/);
    process.env[name] = '   ';
    assert.throws(() => contentUrls.project, /Missing required environment variable/);
    process.env[name] = ' https://example.com/content.csv ';
    assert.equal(contentUrls.project, 'https://example.com/content.csv');
  } finally {
    if (previous === undefined) delete process.env[name];
    else process.env[name] = previous;
  }
});

test('documented public endpoints use distinct environment variables', () => {
  const env = readFileSync(new URL('../../.env.example', import.meta.url), 'utf8');
  const names = [...env.matchAll(/^([A-Z_]+)=/gm)].map((match) => match[1]);
  assert.equal(names.length, new Set(names).size);
  for (const name of [
    'STORYTELLING_CSV_URL',
    'PROJECT_CSV_URL',
    'PROJECT_GOALS_CSV_URL',
    'PROJECT_STACK_CSV_URL',
    'PROJECT_EXAMPLE_LINKS_CSV_URL',
  ]) {
    assert.match(env, new RegExp(`^${name}="https://docs.google.com/`, 'm'));
  }
});
