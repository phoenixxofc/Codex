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

  test('humanizeAiText strips expanded AI filler words and simplifies vague buzzwords', () => {
    const rawAiText = 'First and foremost, it is crucial to remember that we must utilize cutting-edge solutions for a plethora of tasks.';
    const cleaned = transformers.humanizeAiText(rawAiText);
    expect(cleaned).toBe('we must use modern solutions for tasks.');
    expect(cleaned).not.toContain('First and foremost');
    expect(cleaned).not.toContain('it is crucial to remember that');
    expect(cleaned).not.toContain('a plethora of');
  });

  test('capitalizeNecessaryWords capitalizes sentence starts, tech acronyms, languages, and proper nouns', () => {
    const rawInput = 'hello textflow team. i deployed docker and kubernetes on aws with python, rust, and react on january 15.';
    const output = transformers.capitalizeNecessaryWords(rawInput);
    expect(output).toBe('Hello TextFlow team. I deployed Docker and Kubernetes on AWS with Python, Rust, and React on January 15.');
  });

  test('calculateMetrics returns accurate counts', () => {
    const metrics = transformers.calculateMetrics('Hello world textflow');
    expect(metrics.characters).toBe(20);
    expect(metrics.words).toBe(3);
    expect(metrics.lines).toBe(1);
  });
});
