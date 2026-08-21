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
