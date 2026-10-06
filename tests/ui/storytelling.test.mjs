import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';
import { toBoolean } from '../../src/lib/services/utils/toBoolean.ts';
import { replaceEscapedNewlines } from '../../src/lib/services/utils/replaceEscapedNewlines.ts';

const require = createRequire(import.meta.url);
function loadTs(path, dependencies) {
  const exports = {};
  const compiled = ts.transpileModule(readFileSync(new URL(path, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  runInNewContext(compiled, {
    exports,
    process: { env: dependencies.env ?? {} },
    require: (name) => dependencies[name] ?? require(name),
  });
  return exports;
}
const href = loadTs('../../src/lib/services/utils/getHrefGuard.ts', {});
function parser(urls = {}, fetchCsv = async () => []) {
  return loadTs('../../src/lib/services/parsers/parseStorytellingSection.ts', {
    '../utils/fetchCsv': { default: fetchCsv },
    env: { STORYTELLING_SECTION_CSV_URL: urls.StorytellingSection, STORYTELLING_ITEMS_CSV_URL: urls.StorytellingItems },
    '@/config/content': {
      contentUrls: {
        storytelling: 'combined-storytelling',
        storytellingSection: urls.StorytellingSection,
        storytellingItems: urls.StorytellingItems,
      },
    },
    '../utils/getHrefGuard': href,
    '../utils/toBoolean': { toBoolean },
    '../utils/replaceEscapedNewlines': { replaceEscapedNewlines },
  });
}
const section = {
  id: 'stories',
  heading: 'Experience, Ownership & Impact',
  introduction: 'Intro\\nMore',
  ownershipClosing: 'Closing',
};
const item = (id, order) => ({
  id,
  storytellingSectionId: 'stories',
  projectName: id,
  heading: 'Heading',
  challenge: 'Challenge',
  ownership: 'Ownership',
  outcome: 'Outcome',
  displayOrder: String(order),
});

test('stories are scoped, numerically ordered, and have no fixed item limit', () => {
  const items = Array.from({ length: 6 }, (_, i) => item(`project${i}`, 10 - i));
  items.push({ ...item('other', 0), storytellingSectionId: 'other' });
  const result = parser().buildStorytellingSection([section], items);
  assert.equal(result.stories.length, 6);
  assert.equal(result.stories[0].id, 'project5');
  assert.equal(result.introduction, 'Intro\nMore');
  assert.equal(result.isMain, true);
  assert.equal(result.href.internal, '#storytelling');
  assert.equal(result.ownershipClosingHeading, 'Ownership beyond implementation');
});

test('empty optional links are omitted and link text falls back to the project name', () => {
  const result = parser().buildStorytellingSection(
    [section],
    [
      { ...item('Varsity', 1), linkHrefValue: ' ', linkText: '' },
      { ...item('Subaru', 2), linkHrefType: 'internal', linkHrefValue: '/projects/subaru', linkText: '' },
    ],
  );
  assert.equal(result.stories[0].link, undefined);
  assert.equal(result.stories[1].link.text, 'View Subaru project');
  assert.equal(result.stories[1].link.href.internal, '/projects/subaru');
});

test('missing content, invalid orders, and duplicate identifiers fail clearly', () => {
  const build = parser().buildStorytellingSection;
  assert.throws(() => build([], []), /No StorytellingSection/);
  assert.throws(() => build([section], []), /No StorytellingItems/);
  assert.throws(() => build([section], [{ ...item('x', 1), outcome: '' }]), /x.outcome/);
  for (const displayOrder of ['', 'oops', 'Infinity']) {
    assert.throws(() => build([section], [{ ...item('x', 1), displayOrder }]), /displayOrder/);
  }
  assert.throws(() => build([section], [item('x', 1), item('x', 2)]), /Duplicate/);
});

test('an empty configured combined source fails clearly', async () => {
  await assert.rejects(parser().default(), /exactly one storytelling section/);
});

test('storytelling renders every narrative and shared closing before hydration', async () => {
  const { renderToStaticMarkup } = require('react-dom/server');
  const { createElement } = require('react');
  const Storytelling = loadTs('../../src/components/organisms/Storytelling/Storytelling.tsx', {
    '@/components/atoms/CmsText/CmsText': { default: ({ text }) => text },
    '@/components/molecules/AnimatedDisclosure/AnimatedDisclosure': {
      default: ({ summary, children }) =>
        createElement('details', null, createElement('summary', null, summary), createElement('div', null, children)),
    },
    '@/components/atoms/Heading/Heading': { default: ({ as = 'h2', children }) => createElement(as, null, children) },
    '@/components/atoms/Button/Button': {
      default: ({ text, href }) => createElement('a', { href: href.internal }, text),
    },
    '@/lib/ui/getHref': { getId: () => 'storytelling' },
    './storytelling.module.scss': { default: {} },
  }).default;
  const props = parser().buildStorytellingSection(
    [section],
    [{ ...item('Varsity', 1), linkHrefValue: '/projects/varsity' }, item('CAA Quebec', 2)],
  );
  const html = renderToStaticMarkup(createElement(Storytelling, props));
  assert.equal((html.match(/<details/g) ?? []).length, 2);
  assert.equal((html.match(/<summary/g) ?? []).length, 2);
  for (const text of ['Challenge', 'Ownership', 'Outcome', 'Closing', 'Varsity', 'CAA Quebec'])
    assert.ok(html.includes(text));
  assert.equal((html.match(/<a /g) ?? []).length, 1);
  assert.ok(html.includes('href="/projects/varsity"'));
  assert.ok(!html.includes('<details open'));
});

test('published combined CSV maps shared content, flags, story order, and optional links', () => {
  const Papa = require('papaparse');
  const rows = Papa.parse(readFileSync(new URL('../fixtures/storytelling.csv', import.meta.url), 'utf8'), {
    header: true,
    skipEmptyLines: true,
  }).data;
  const build = parser().buildCombinedStorytellingSection;
  const result = build(rows);
  assert.equal(result.heading, 'Experience, Ownership & Impact');
  assert.equal(result.title, 'Experience & Impact');
  assert.equal(result.href.internal, '#experience-impact');
  assert.equal(result.isNav, true);
  assert.equal(result.isFooter, false);
  assert.deepEqual(
    Array.from(result.stories, (story) => story.projectName),
    ['Varsity', 'CAA Quebec', 'Subaru Canada', 'Metagenics'],
  );
  assert.equal(result.stories[0].link.href.internal, '/projects/bsn-sports');
  assert.equal(result.stories[2].link, undefined);
  assert.ok(result.ownershipClosing.includes('handoff'));
  assert.throws(() => build(rows.filter((row) => row.recordType !== 'section')), /exactly one/);
  assert.throws(() => build([rows[0], ...rows]), /exactly one/);
});

test('section composition puts storytelling before projects in the homepage and navigation', async () => {
  const dependencies = {};
  const sectionParsers = [
    ['parseIntroducttionSection', 'Introduction'],
    ['parseProjectsSection', 'Projects'],
    ['parseAboutMeSection', 'AboutMe'],
    ['parseTechnologiesSection', 'Technologies'],
    ['parseExperienceSection', 'Experience'],
    ['parseStorytellingSection', 'Storytelling'],
    ['parseContactSection', 'Contact'],
    ['parseSocialSection', 'Social'],
  ];
  for (const [parser, type] of sectionParsers) {
    dependencies[`./parsers/${parser}`] = { default: async () => ({ type, isMain: true, isNav: true }) };
  }
  const sections = await loadTs('../../src/lib/services/loadAllSections.ts', dependencies).loadAllSections();
  for (const list of [sections.filter((section) => section.isMain), sections.filter((section) => section.isNav)]) {
    assert.ok(
      list.findIndex((section) => section.type === 'Storytelling') <
        list.findIndex((section) => section.type === 'Projects'),
    );
  }
});
