/**
 * Regular expressions and data extractors for structured information harvesting.
 */

export const REGEX_PATTERNS = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi,
  url: /(https?:\/\/[^\s<>"{}|\^~\[\]`]+)/gi,
  ipv4: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
  phone: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
  numbers: /-?\d+(?:\.\d+)?/g
};

export const extractEmails = (text) => {
  if (!text) return 'No emails found.';
  const matches = text.match(REGEX_PATTERNS.email);
  if (!matches) return 'No emails found.';
  const unique = Array.from(new Set(matches));
  return unique.join('\n');
};

export const extractUrls = (text) => {
  if (!text) return 'No URLs found.';
  const matches = text.match(REGEX_PATTERNS.url);
  if (!matches) return 'No URLs found.';
  const unique = Array.from(new Set(matches));
  return unique.join('\n');
};

export const extractIPs = (text) => {
  if (!text) return 'No IP addresses found.';
  const matches = text.match(REGEX_PATTERNS.ipv4);
  if (!matches) return 'No IP addresses found.';
  const unique = Array.from(new Set(matches));
  return unique.join('\n');
};

export const extractPhones = (text) => {
  if (!text) return 'No phone numbers found.';
  const matches = text.match(REGEX_PATTERNS.phone);
  if (!matches) return 'No phone numbers found.';
  const unique = Array.from(new Set(matches));
  return unique.join('\n');
};

export const extractNumbers = (text) => {
  if (!text) return 'No numbers found.';
  const matches = text.match(REGEX_PATTERNS.numbers);
  if (!matches) return 'No numbers found.';
  return matches.join('\n');
};
