/**
 * Developer utilities for JSON formatting, syntax validation, Base64 encoding/decoding, and HTML escaping.
 */

export const beautifyJson = (text, indent = 2) => {
  if (!text || !text.trim()) return '';
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, indent);
  } catch (error) {
    return `[JSON Syntax Error]: ${error.message}`;
  }
};

export const minifyJson = (text) => {
  if (!text || !text.trim()) return '';
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed);
  } catch (error) {
    return `[JSON Syntax Error]: ${error.message}`;
  }
};

export const encodeBase64 = (text) => {
  if (!text) return '';
  try {
    return btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  } catch (error) {
    return `[Base64 Encoding Error]: ${error.message}`;
  }
};

export const decodeBase64 = (text) => {
  if (!text) return '';
  try {
    return decodeURIComponent(atob(text).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (error) {
    return `[Base64 Decoding Error]: Invalid Base64 payload - ${error.message}`;
  }
};

export const escapeHtml = (text) => {
  if (!text) return '';
  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, (tag) => htmlEntities[tag] || tag);
};

export const unescapeHtml = (text) => {
  if (!text) return '';
  const doc = new DOMParser().parseFromString(text, 'text/html');
  return doc.documentElement.textContent;
};
