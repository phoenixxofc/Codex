const transformers = require('../src/utils/textTransformers.js');

describe('textTransformers Unit Tests', () => {
  test('toUppercase transforms string to uppercase', () => {
    expect(transformers.toUppercase('hello world')).toBe('HELLO WORLD');
  });

  test('toLowercase transforms string to lowercase', () => {
    expect(transformers.toLowercase('HELLO WORLD')).toBe('hello world');
  });

  test('toTitleCase capitalizes words correctly', () => {
    expect(transformers.toTitleCase('hello world textflow')).toBe('Hello World Textflow');
  });

  test('toCamelCase formats string into camelCase', () => {
    expect(transformers.toCamelCase('hello world test')).toBe('helloWorldTest');
  });

  test('toKebabCase formats string into kebab-case', () => {
    expect(transformers.toKebabCase('Hello World TextFlow')).toBe('hello-world-text-flow');
  });

  test('stripExtraSpaces removes unnecessary spaces', () => {
    expect(transformers.stripExtraSpaces('  hello   world  ')).toBe('hello world');
  });

  test('generateSlug produces clean URL slugs', () => {
    expect(transformers.generateSlug('TextFlow.io Enterprise Utility!')).toBe('textflowio-enterprise-utility');
  });

  test('humanizeAiText supports removeFillerWords and restructureText options separately and together', () => {
    const rawAiText = 'It is important to note that the team is able to utilize cutting-edge solutions.';

    // Default (both true)
    expect(transformers.humanizeAiText(rawAiText)).toBe('The team can use modern solutions.');

    // Only filler removal
    expect(transformers.humanizeAiText(rawAiText, { removeFillerWords: true, restructureText: false }))
      .toBe('The team is able to utilize cutting-edge solutions.');

    // Only text restructuring
    expect(transformers.humanizeAiText(rawAiText, { removeFillerWords: false, restructureText: true }))
      .toBe('It is important to note that the team can use modern solutions.');
  });

  test('capitalizeNecessaryWords capitalizes sentence starts, tech acronyms, languages, and proper nouns', () => {
    const rawInput = 'hello textflow team. i deployed docker and kubernetes on aws with python, rust, and react on january 15.';
    const output = transformers.capitalizeNecessaryWords(rawInput);
    expect(output).toBe('Hello TextFlow team. I deployed Docker and Kubernetes on AWS with Python, Rust, and React on January 15.');
  });

  test('formatOfficialReport formats standalone title lines and ignores inline section referrals inside sentences', () => {
    const reportText = `1.0 Executive Summary\nBackground: As described in section 1.1 below, the project was completed on Monday.\n\n1.1 Key Objectives\nGoal: Achieve zero-server processing. Refer to section 1.1.1 for full details.`;

    const res = transformers.formatOfficialReport(reportText, {
      titleIndicator: 'xxx',
      titleFontSize: 14,
      boldTitles: true,
      boldColonPrefix: true,
      generateToc: true
    });

    // TOC should only contain 1.0 Executive Summary and 1.1 Key Objectives, NOT 1.1.1 from the sentence body
    expect(res.tocText).toContain('1.0 Executive Summary');
    expect(res.tocText).toContain('1.1 Key Objectives');
    expect(res.tocText).not.toContain('1.1.1');

    expect(res.htmlText).toContain('font-family: \'Times New Roman\'');
    expect(res.htmlText).toContain('<b>Background:</b>');
    expect(res.htmlText).toContain('<b>Goal:</b>');
  });

  test('calculateMetrics returns accurate counts', () => {
    const metrics = transformers.calculateMetrics('Hello world textflow');
    expect(metrics.characters).toBe(20);
    expect(metrics.words).toBe(3);
    expect(metrics.lines).toBe(1);
  });
});
