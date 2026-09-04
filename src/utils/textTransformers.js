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
 * Options:
 * - removeFillerWords: strips AI filler phrases and fluff
 * - restructureText: restructures wordy sentence patterns, converts passive/clunky verb phrases, and simplifies vocabulary
 */
export const humanizeAiText = (text, options = {}) => {
  if (!text) return '';

  const {
    removeFillerWords = true,
    restructureText = true
  } = options;

  let result = text;

  // 1. Remove redundant AI filler phrases (case-insensitive)
  if (removeFillerWords) {
    const fillerPhrases = [
      /it is important to note that\s*/gi,
      /it is worth noting that\s*/gi,
      /it should be emphasized that\s*/gi,
      /it is crucial to remember that\s*/gi,
      /it is essential to understand that\s*/gi,
      /in conclusion,?\s*/gi,
      /to summarize,?\s*/gi,
      /in summary,?\s*/gi,
      /first and foremost,?\s*/gi,
      /lastly but not least,?\s*/gi,
      /last but not least,?\s*/gi,
      /a testament to\s*/gi,
      /tapestry of\s*/gi,
      /delve into\s*/gi,
      /delving into\s*/gi,
      /shed light on\s*/gi,
      /shedding light on\s*/gi,
      /pave the way for\s*/gi,
      /paving the way for\s*/gi,
      /at the end of the day,?\s*/gi,
      /in today's digital landscape,?\s*/gi,
      /in today's fast-paced world,?\s*/gi,
      /in the realm of\s*/gi,
      /beacon of\s*/gi,
      /serves as a\s*/gi,
      /serving as a\s*/gi,
      /plays a crucial role in\s*/gi,
      /plays a pivotal role in\s*/gi,
      /without further ado,?\s*/gi,
      /moving forward,?\s*/gi,
      /going forward,?\s*/gi,
      /all things considered,?\s*/gi,
      /it goes without saying that\s*/gi,
      /needless to say,?\s*/gi,
      /a plethora of\s*/gi,
      /a myriad of\s*/gi
    ];

    fillerPhrases.forEach((phrase) => {
      result = result.replace(phrase, '');
    });
  }

  // 2. Restructure sentence patterns & simplify vocabulary
  if (restructureText) {
    const restructureMap = [
      // Verb phrase restructuring & active voice conversions
      [/\bis able to\b/gi, 'can'],
      [/\bhas the ability to\b/gi, 'can'],
      [/\bwas able to\b/gi, 'could'],
      [/\bhad the ability to\b/gi, 'could'],
      [/\bis going to\b/gi, 'will'],
      [/\bis in a position to\b/gi, 'can'],
      [/\bmake a decision\b/gi, 'decide'],
      [/\bmade a decision\b/gi, 'decided'],
      [/\bcome to an agreement\b/gi, 'agree'],
      [/\bcame to an agreement\b/gi, 'agreed'],
      [/\bconduct an investigation into\b/gi, 'investigate'],
      [/\bconducted an investigation into\b/gi, 'investigated'],
      [/\bgive consideration to\b/gi, 'consider'],
      [/\bgave consideration to\b/gi, 'considered'],
      [/\bexhibit a preference for\b/gi, 'prefer'],
      [/\bexhibits a preference for\b/gi, 'prefers'],
      [/\bis reflective of\b/gi, 'reflects'],
      [/\bare reflective of\b/gi, 'reflect'],

      // Buzzword & complex vocabulary simplification
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
      [/\bgame-changer\b/gi, 'big shift'],
      [/\bcutting-edge\b/gi, 'modern'],
      [/\bstate-of-the-art\b/gi, 'modern'],
      [/\bgroundbreaking\b/gi, 'new'],
      [/\brevolutionary\b/gi, 'new'],
      [/\bseamlessly\b/gi, 'easily'],
      [/\bseamless\b/gi, 'smooth'],
      [/\bin order to\b/gi, 'to'],
      [/\bdue to the fact that\b/gi, 'because'],
      [/\bfor the purpose of\b/gi, 'for'],
      [/\bnotwithstanding the fact that\b/gi, 'although'],
      [/\bsynergy\b/gi, 'teamwork'],
      [/\bparadigm shift\b/gi, 'big change']
    ];

    restructureMap.forEach(([pattern, replacement]) => {
      result = result.replace(pattern, replacement);
    });
  }

  // Capitalize start of sentences if needed after removals
  result = result.replace(/(^\s*|[.!?]\s+|\n\s*)([a-z])/g, (match, prefix, char) => prefix + char.toUpperCase());

  // Clean up double spaces or line artifact leftovers
  return result.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n').trim();
};

/**
 * Smart Sentence & Proper Noun Capitalizer
 * Capitalizes words at the start of sentences and preserves/formats essential proper nouns,
 * brand names (ChatGPT, GPT-4, TextFlow, Claude, Gemini, OpenAI), technical terms (API, JSON, HTTP, URL, REST, GraphQL, CI/CD, SaaS), days, months, and personal pronoun 'I'.
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
    // Tech Products & Organizations
    [/\bchatgpt\b/gi, 'ChatGPT'],
    [/\bgpt\b/gi, 'GPT'],
    [/\bgpt-3\b/gi, 'GPT-3'],
    [/\bgpt-4\b/gi, 'GPT-4'],
    [/\btextflow\b/gi, 'TextFlow'],
    [/\bopenai\b/gi, 'OpenAI'],
    [/\bclaude\b/gi, 'Claude'],
    [/\bgemini\b/gi, 'Gemini'],
    [/\bgoogle\b/gi, 'Google'],
    [/\bmicrosoft\b/gi, 'Microsoft'],
    [/\bapple\b/gi, 'Apple'],
    [/\bamazon\b/gi, 'Amazon'],
    [/\baws\b/gi, 'AWS'],
    [/\bazure\b/gi, 'Azure'],
    [/\bvercel\b/gi, 'Vercel'],
    [/\bgithub\b/gi, 'GitHub'],
    [/\bgitlab\b/gi, 'GitLab'],

    // Technical Acronyms & Standards
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
    [/\brest\b/gi, 'REST'],
    [/\bgraphql\b/gi, 'GraphQL'],
    [/\bsaas\b/gi, 'SaaS'],
    [/\bci\/cd\b/gi, 'CI/CD'],
    [/\bsdk\b/gi, 'SDK'],
    [/\bcli\b/gi, 'CLI'],
    [/\bui\/ux\b/gi, 'UI/UX'],
    [/\bui\b/gi, 'UI'],
    [/\bux\b/gi, 'UX'],

    // Operating Systems & Languages
    [/\bjavascript\b/gi, 'JavaScript'],
    [/\btypescript\b/gi, 'TypeScript'],
    [/\breact\b/gi, 'React'],
    [/\bnode\.?js\b/gi, 'Node.js'],
    [/\bpython\b/gi, 'Python'],
    [/\brust\b/gi, 'Rust'],
    [/\bdocker\b/gi, 'Docker'],
    [/\bkubernetes\b/gi, 'Kubernetes'],
    [/\blinux\b/gi, 'Linux'],
    [/\bmacos\b/gi, 'macOS'],
    [/\bwindows\b/gi, 'Windows'],
    [/\bandroid\b/gi, 'Android'],
    [/\bios\b/gi, 'iOS'],

    // Days of the Week
    [/\bmonday\b/gi, 'Monday'],
    [/\btuesday\b/gi, 'Tuesday'],
    [/\bwednesday\b/gi, 'Wednesday'],
    [/\bthursday\b/gi, 'Thursday'],
    [/\bfriday\b/gi, 'Friday'],
    [/\bsaturday\b/gi, 'Saturday'],
    [/\bsunday\b/gi, 'Sunday'],

    // Months of the Year
    [/\bjanuary\b/gi, 'January'],
    [/\bfebruary\b/gi, 'February'],
    [/\bmarch\b/gi, 'March'],
    [/\bapril\b/gi, 'April'],
    [/\bmay\b/gi, 'May'],
    [/\bjune\b/gi, 'June'],
    [/\bjuly\b/gi, 'July'],
    [/\baugust\b/gi, 'August'],
    [/\bseptember\b/gi, 'September'],
    [/\boctober\b/gi, 'October'],
    [/\bnovember\b/gi, 'November'],
    [/\bdecember\b/gi, 'December']
  ];

  properNouns.forEach(([regex, replacement]) => {
    result = result.replace(regex, replacement);
  });

  return result;
};

/**
 * Official Report Formatter & Table of Contents Generator
 * Formats report text for MS Word compatibility:
 * - Font: Times New Roman (12pt body, 13pt or 14pt title)
 * - Line spacing: 1.5 line height
 * - Justification: block format (justified, zero paragraph indent)
 * - Title indicators: x.x.x, x.x, x, or first line after blank line spacer
 *   (Strictly standalone title lines on a new line; does NOT match inline sub-heading referrals within paragraphs)
 * - Title bolding & title capitalization
 * - Bold text before colon (e.g. "Objective:")
 * - Automatic Table of Contents generator from section numbering
 */
export const formatOfficialReport = (text, options = {}) => {
  if (!text) return { plainText: '', htmlText: '', tocText: '' };

  const {
    titleIndicator = 'xxx', // 'xxx' (x.x.x, x.x, x), 'xx' (x.x, x), 'x' (x), 'blankline'
    titleFontSize = 14,     // 13 or 14
    boldTitles = true,      // true/false
    boldColonPrefix = true, // true/false
    generateToc = true      // true/false
  } = options;

  const lines = text.split(/\r?\n/);
  const formattedLines = [];
  const tocEntries = [];
  let isPreviousLineBlank = true;

  const isTitleLine = (line, isPrevBlank) => {
    const trimmed = line.trim();
    if (!trimmed) return false;

    // Must be a standalone line (cannot end with typical sentence punctuation like period unless it's a chapter number like 1.0)
    // To ensure inline sub-heading referrals inside sentences are never matched as titles.
    if (trimmed.length > 120) return false;

    if (titleIndicator === 'xxx') {
      // Standalone heading line matching x, x.x, or x.x.x at the very beginning of the line
      // E.g. "1.2.3 Architectural Specifications"
      return /^\d+(\.\d+){0,2}\s+[A-Za-z0-9]/.test(trimmed) && !/[.!?]$/.test(trimmed);
    } else if (titleIndicator === 'xx') {
      // Matches x or x.x (up to 2 levels)
      return /^\d+(\.\d+){0,1}\s+[A-Za-z0-9]/.test(trimmed) && !/[.!?]$/.test(trimmed);
    } else if (titleIndicator === 'x') {
      // Matches chapter level (x or x.0)
      return /^\d+(\.0)?\s+[A-Za-z0-9]/.test(trimmed) && !/[.!?]$/.test(trimmed);
    } else if (titleIndicator === 'blankline') {
      return isPrevBlank && trimmed.length > 0 && trimmed.length < 80 && !/[.!?]$/.test(trimmed);
    }
    // Generic auto fallback check for standalone numbered headings
    return /^\d+(\.\d+)*\s+[A-Za-z0-9]/.test(trimmed) && !/[.!?]$/.test(trimmed);
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      formattedLines.push({ type: 'blank', content: '' });
      isPreviousLineBlank = true;
      return;
    }

    const titleMatch = isTitleLine(trimmed, isPreviousLineBlank);

    if (titleMatch) {
      // It's a standalone title/heading line
      let titleContent = capitalizeNecessaryWords(trimmed);
      formattedLines.push({
        type: 'title',
        content: titleContent,
        bold: boldTitles,
        fontSize: titleFontSize
      });

      // Collect for Table of Contents if numbered
      const numMatch = trimmed.match(/^(\d+(\.\d+)*)\s+(.*)/);
      if (numMatch) {
        tocEntries.push({
          number: numMatch[1],
          title: capitalizeNecessaryWords(numMatch[3]),
          full: `${numMatch[1]} ${capitalizeNecessaryWords(numMatch[3])}`
        });
      } else {
        tocEntries.push({
          number: '',
          title: titleContent,
          full: titleContent
        });
      }

      isPreviousLineBlank = false;
    } else {
      // Body text paragraph
      let bodyContent = capitalizeNecessaryWords(trimmed);

      // Handle bolding text before colon (e.g. "Background:" -> "<b>Background:</b>")
      if (boldColonPrefix && /^[A-Za-z0-9\s_-]+:/.test(bodyContent)) {
        bodyContent = bodyContent.replace(/^([A-Za-z0-9\s_-]+:)/, (match) => `__BOLD_COLON__${match}__END_COLON__`);
      }

      formattedLines.push({
        type: 'body',
        content: bodyContent
      });
      isPreviousLineBlank = false;
    }
  });

  // Construct Plaintext Result
  let plainTextOutput = '';
  let tocTextOutput = '';

  if (generateToc && tocEntries.length > 0) {
    tocTextOutput = 'TABLE OF CONTENTS\n=================\n';
    tocEntries.forEach((entry) => {
      const indent = entry.number ? '  '.repeat((entry.number.split('.').length - 1)) : '';
      tocTextOutput += `${indent}${entry.full}\n`;
    });
    tocTextOutput += '\n';
  }

  formattedLines.forEach((item) => {
    if (item.type === 'blank') {
      plainTextOutput += '\n';
    } else if (item.type === 'title') {
      plainTextOutput += `${item.content}\n`;
    } else {
      let cleanContent = item.content.replace(/__BOLD_COLON__(.*?)__END_COLON__/g, '$1');
      plainTextOutput += `${cleanContent}\n`;
    }
  });

  const finalPlainText = (tocTextOutput + plainTextOutput).trim();

  // Construct MS Word Compatible Rich HTML
  let htmlOutput = `<div style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; text-align: justify; margin: 0; padding: 0;">`;

  if (generateToc && tocEntries.length > 0) {
    htmlOutput += `<div style="margin-bottom: 24pt;">`;
    htmlOutput += `<p style="font-size: ${titleFontSize}pt; font-weight: bold; margin-bottom: 12pt; text-align: left;">TABLE OF CONTENTS</p>`;
    tocEntries.forEach((entry) => {
      const level = entry.number ? entry.number.split('.').length - 1 : 0;
      const paddingLeft = level * 18;
      htmlOutput += `<p style="font-size: 12pt; margin: 4pt 0 4pt ${paddingLeft}pt; text-align: left;">${entry.full}</p>`;
    });
    htmlOutput += `</div><hr style="border: 0; border-top: 1px solid #ccc; margin: 18pt 0;" />`;
  }

  formattedLines.forEach((item) => {
    if (item.type === 'blank') {
      htmlOutput += `<p style="margin: 0; min-height: 12pt;">&nbsp;</p>`;
    } else if (item.type === 'title') {
      const weight = item.bold ? 'font-weight: bold;' : 'font-weight: normal;';
      htmlOutput += `<p style="font-size: ${item.fontSize}pt; ${weight} margin-top: 14pt; margin-bottom: 6pt; text-align: left;">${item.content}</p>`;
    } else {
      let htmlBody = item.content.replace(/__BOLD_COLON__(.*?)__END_COLON__/g, '<b>$1</b>');
      htmlOutput += `<p style="font-size: 12pt; margin-top: 0; margin-bottom: 8pt; text-indent: 0; text-align: justify;">${htmlBody}</p>`;
    }
  });

  htmlOutput += `</div>`;

  return {
    plainText: finalPlainText,
    htmlText: htmlOutput,
    tocText: tocTextOutput.trim()
  };
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
