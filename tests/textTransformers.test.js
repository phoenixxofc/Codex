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

  test('humanizeAiText strips AI filler words and simplifies vague buzzwords', () => {
    const rawAiText = 'It is important to note that we must utilize robust solutions in order to spearhead growth.';
    const cleaned = transformers.humanizeAiText(rawAiText);
    expect(cleaned).toBe('we must use strong solutions to lead growth.');
    expect(cleaned).not.toContain('It is important to note that');
    expect(cleaned).not.toContain('utilize');
  });

  test('calculateMetrics returns accurate counts', () => {
    const metrics = transformers.calculateMetrics('Hello world textflow');
    expect(metrics.characters).toBe(20);
    expect(metrics.words).toBe(3);
    expect(metrics.lines).toBe(1);
  });
});
