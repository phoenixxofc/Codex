/**
 * Pure functions for text transformation and string formatting operations.
 */

export const toUppercase = (text) => (text ? text.toUpperCase() : '');

export const toLowercase = (text) => (text ? text.toLowerCase() : '');

export const toTitleCase = (text) => {
  if (!text) return '';
  return text.toLowerCase().replace(/(?:^|\s|-|_)\S/g, (match) => match.toUpperCase());
};

export const toCamelCase = (text) => {
  if (!text) return '';
  return text
    .trim()
    .replace(/[-_ ]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
};

export const toKebabCase = (text) => {
  if (!text) return '';
  return text
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export const toSnakeCase = (text) => {
  if (!text) return '';
  return text
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
};

export const stripExtraSpaces = (text) => {
  if (!text) return '';
  return text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n').trim();
};

export const removeLineBreaks = (text) => {
  if (!text) return '';
  return text.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
};

export const generateSlug = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export const reverseString = (text) => {
  if (!text) return '';
  return text.split('').reverse().join('');
};

/**
 * AI Prose Humanizer & Polisher
 * Identifies and strips common AI filler phrases, buzzwords, and overly complex/vague vocabulary,
 * replacing them with clean, direct, natural human phrasing.
 */
export const humanizeAiText = (text) => {
  if (!text) return '';

  let result = text;

  // 1. Remove redundant AI filler phrases (case-insensitive)
  const fillerPhrases = [
    /it is important to note that\s*/gi,
    /it is worth noting that\s*/gi,
    /it should be emphasized that\s*/gi,
    /in conclusion,?\s*/gi,
    /to summarize,?\s*/gi,
    /in summary,?\ conceived as\s*/gi,
    /a testament to\s*/gi,
    /tapestry of\s*/gi,
    /delve into\s*/gi,
    /delving into\s*/gi,
    /at the end of the day,?\s*/gi,
    /in today's digital landscape,?\s*/gi,
    /in the realm of\s*/gi,
    /beacon of\s*/gi,
    /serves as a\s*/gi,
    /plays a crucial role in\s*/gi,
    /plays a pivotal role in\s*/gi,
    /without further ado,?\s*/gi
  ];

  fillerPhrases.forEach((phrase) => {
    result = result.replace(phrase, '');
  });

  // 2. Replace complex/vague AI vocabulary with natural human words
  const vocabMap = [
    [/\butilize\b/gi, 'use'],
    [/\butilized\b/gi, 'used'],
    [/\butilizing\b/gi, 'using'],
    [/\butilization\b/gi, 'use'],
    [/\bleverage\b/gi, 'use'],
    [/\bleveraged\b/gi, 'used'],
    [/\bleveraging\b/gi, 'using'],
    [/\bparamount\b/gi, 'vital'],
    [/\bspearhead\b/gi, 'lead'],
    [/\bspearheaded\b/gi, 'led'],
    [/\bmultifaceted\b/gi, 'varied'],
    [/\bmeticulously\b/gi, 'carefully'],
    [/\bmeticulous\b/gi, 'careful'],
    [/\brobust\b/gi, 'strong'],
    [/\bin order to\b/gi, 'to'],
    [/\bdue to the fact that\b/gi, 'because'],
    [/\bfor the purpose of\b/gi, 'for'],
    [/\bnotwithstanding the fact that\b/gi, 'although'],
    [/\bsynergy\b/gi, 'teamwork'],
    [/\bparadigm shift\b/gi, 'big change']
  ];

  vocabMap.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });

  // Clean up any double spaces or line artifact leftovers
  return result.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n').trim();
};

/**
 * Smart Sentence & Proper Noun Capitalizer
 * Capitalizes words at the start of sentences and preserves/formats essential proper nouns,
 * brand names (ChatGPT, GPT-4, TextFlow), technical terms (API, JSON, HTTP, URL), days, months, and personal pronoun 'I'.
 */
export const capitalizeNecessaryWords = (text) => {
  if (!text) return '';

  // 1. Capitalize first letter of sentences (. ? ! or start of text/line)
  let result = text.replace(/(^\s*|[.!?]\s+|\n\s*)([a-z])/g, (match, prefix, char) => {
    return prefix + char.toUpperCase();
  });

  // 2. Capitalize standalone pronoun "i" -> "I"
  result = result.replace(/\b(i)\b/g, 'I');

  // 3. Map common tech brands, acronyms, and proper nouns to exact proper casing
  const properNouns = [
    [/\bchatgpt\b/gi, 'ChatGPT'],
    [/\bgpt\b/gi, 'GPT'],
    [/\bgpt-3\b/gi, 'GPT-3'],
    [/\bgpt-4\b/gi, 'GPT-4'],
    [/\btextflow\b/gi, 'TextFlow'],
    [/\bopenai\b/gi, 'OpenAI'],
    [/\bapi\b/gi, 'API'],
    [/\bapis\b/gi, 'APIs'],
    [/\bjson\b/gi, 'JSON'],
    [/\bhtml\b/gi, 'HTML'],
    [/\bcss\b/gi, 'CSS'],
    [/\burl\b/gi, 'URL'],
    [/\burls\b/gi, 'URLs'],
    [/\bhttp\b/gi, 'HTTP'],
    [/\bhttps\b/gi, 'HTTPS'],
    [/\bip\b/gi, 'IP'],
    [/\bsql\b/gi, 'SQL'],
    [/\bjavascript\b/gi, 'JavaScript'],
    [/\btypescript\b/gi, 'TypeScript'],
    [/\breact\b/gi, 'React'],
    [/\bmonday\b/gi, 'Monday'],
    [/\btuesday\b/gi, 'Tuesday'],
    [/\bwednesday\b/gi, 'Wednesday'],
    [/\bthursday\b/gi, 'Thursday'],
    [/\bfriday\b/gi, 'Friday'],
    [/\bsaturday\b/gi, 'Saturday'],
    [/\bsunday\b/gi, 'Sunday']
  ];

  properNouns.forEach(([regex, replacement]) => {
    result = result.replace(regex, replacement);
  });

  return result;
};

export const calculateMetrics = (text) => {
  if (!text) {
    return { characters: 0, words: 0, lines: 0, readingTimeMinutes: 0 };
  }
  const characters = text.length;
  const wordsArray = text.trim().split(/\s+/).filter(Boolean);
  const words = wordsArray.length;
  const lines = text.split(/\r\n|\r|\n/).length;
  const readingTimeMinutes = Math.ceil(words / 200);

  return { characters, words, lines, readingTimeMinutes };
};
