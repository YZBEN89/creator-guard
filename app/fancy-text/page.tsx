"use client";

import { useState } from "react";

type TextStyle = {
  id: string;
  name: string;
  description: string;
  transform: (text: string) => string;
};

function createUnicodeMap(normal: string, styled: string) {
  const normalChars = Array.from(normal);
  const styledChars = Array.from(styled);

  const map: Record<string, string> = {};

  normalChars.forEach((char, index) => {
    if (styledChars[index]) {
      map[char] = styledChars[index];
    }
  });

  return map;
}

function transformWithMap(text: string, map: Record<string, string>) {
  return Array.from(text)
    .map((char) => map[char] ?? char)
    .join("");
}

/* =========================
   Unicode Maps
========================= */

const boldMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"
);

const italicMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧"
);

const boldItalicMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"
);

const scriptMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏"
);

const boldScriptMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃"
);

const circledMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨"
);

const squaredMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉"
);

const parenthesizedMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  "⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵"
);

const doubleStruckMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝔠𝕕𝔢𝔣𝔤𝔥𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡"
);

const frakturMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷"
);

const boldFrakturMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟"
);

const sansMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫"
);

const sansBoldMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵"
);

const sansItalicMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻"
);

const sansBoldItalicMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝚘𝙥𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣"
);

const smallCapsMap: Record<string, string> = {
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ꜰ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "ǫ",
  r: "ʀ",
  s: "s",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ",
};

const superscriptMap: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ⁱ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  w: "ʷ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
};

const subscriptMap: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  a: "ₐ",
  e: "ₑ",
  h: "ₕ",
  i: "ᵢ",
  j: "ⱼ",
  k: "ₖ",
  l: "ₗ",
  m: "ₘ",
  n: "ₙ",
  o: "ₒ",
  p: "ₚ",
  r: "ᵣ",
  s: "ₛ",
  t: "ₜ",
  u: "ᵤ",
  v: "ᵥ",
  x: "ₓ",
};

/* =========================
   Transform Functions
========================= */

function toFullwidth(text: string) {
  return Array.from(text)
    .map((char) => {
      const code = char.charCodeAt(0);

      if (code >= 33 && code <= 126) {
        return String.fromCharCode(code + 65248);
      }

      if (char === " ") {
        return "　";
      }

      return char;
    })
    .join("");
}

function toMonospace(text: string) {
  const normal =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const mono = Array.from(
    "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿"
  );

  const normalChars = Array.from(normal);

  return Array.from(text)
    .map((char) => {
      const index = normalChars.indexOf(char);
      return index !== -1 && mono[index] ? mono[index] : char;
    })
    .join("");
}

function addStrikethrough(text: string) {
  return Array.from(text)
    .map((char) => `${char}\u0336`)
    .join("");
}

function addUnderline(text: string) {
  return Array.from(text)
    .map((char) => `${char}\u0332`)
    .join("");
}

function addDoubleUnderline(text: string) {
  return Array.from(text)
    .map((char) => `${char}\u0333`)
    .join("");
}

function addOverline(text: string) {
  return Array.from(text)
    .map((char) => `${char}\u0305`)
    .join("");
}

function addDotted(text: string) {
  return Array.from(text)
    .map((char) => `${char}\u0307`)
    .join("");
}

function addDoubleDotted(text: string) {
  return Array.from(text)
    .map((char) => `${char}\u0308`)
    .join("");
}

function addTilde(text: string) {
  return Array.from(text)
    .map((char) => `${char}\u0303`)
    .join("");
}

function reverseText(text: string) {
  return Array.from(text).reverse().join("");
}

function toSmallCaps(text: string) {
  return Array.from(text.toLowerCase())
    .map((char) => smallCapsMap[char] ?? char)
    .join("");
}

function toSuperscript(text: string) {
  return Array.from(text.toLowerCase())
    .map((char) => superscriptMap[char] ?? char)
    .join("");
}

function toSubscript(text: string) {
  return Array.from(text.toLowerCase())
    .map((char) => subscriptMap[char] ?? char)
    .join("");
}

/* =========================
   30 Pure Text Styles
========================= */

const styles: TextStyle[] = [
  {
    id: "bold",
    name: "Bold",
    description: "Strong and clear",
    transform: (text) => transformWithMap(text, boldMap),
  },
  {
    id: "italic",
    name: "Italic",
    description: "Simple and elegant",
    transform: (text) => transformWithMap(text, italicMap),
  },
  {
    id: "bold-italic",
    name: "Bold Italic",
    description: "Bold and slanted",
    transform: (text) => transformWithMap(text, boldItalicMap),
  },
  {
    id: "script",
    name: "Script",
    description: "Elegant handwritten style",
    transform: (text) => transformWithMap(text, scriptMap),
  },
  {
    id: "bold-script",
    name: "Bold Script",
    description: "Strong handwritten style",
    transform: (text) => transformWithMap(text, boldScriptMap),
  },
  {
    id: "circled",
    name: "Circled",
    description: "Circular characters",
    transform: (text) => transformWithMap(text, circledMap),
  },
  {
    id: "squared",
    name: "Squared",
    description: "Square characters",
    transform: (text) => transformWithMap(text, squaredMap),
  },
  {
    id: "parenthesized",
    name: "Parenthesized",
    description: "Parenthesized characters",
    transform: (text) => transformWithMap(text, parenthesizedMap),
  },
  {
    id: "fullwidth",
    name: "Fullwidth",
    description: "Wide character style",
    transform: toFullwidth,
  },
  {
    id: "small-caps",
    name: "Small Caps",
    description: "Compact uppercase style",
    transform: toSmallCaps,
  },
  {
    id: "monospace",
    name: "Monospace",
    description: "Clean technical style",
    transform: toMonospace,
  },
  {
    id: "double-struck",
    name: "Double-Struck",
    description: "Mathematical style",
    transform: (text) => transformWithMap(text, doubleStruckMap),
  },
  {
    id: "fraktur",
    name: "Fraktur",
    description: "Gothic lettering style",
    transform: (text) => transformWithMap(text, frakturMap),
  },
  {
    id: "bold-fraktur",
    name: "Bold Fraktur",
    description: "Heavy Gothic lettering",
    transform: (text) => transformWithMap(text, boldFrakturMap),
  },
  {
    id: "sans",
    name: "Sans",
    description: "Modern clean lettering",
    transform: (text) => transformWithMap(text, sansMap),
  },
  {
    id: "sans-bold",
    name: "Sans Bold",
    description: "Modern bold lettering",
    transform: (text) => transformWithMap(text, sansBoldMap),
  },
  {
    id: "sans-italic",
    name: "Sans Italic",
    description: "Modern slanted lettering",
    transform: (text) => transformWithMap(text, sansItalicMap),
  },
  {
    id: "sans-bold-italic",
    name: "Sans Bold Italic",
    description: "Modern bold slanted lettering",
    transform: (text) => transformWithMap(text, sansBoldItalicMap),
  },
  {
    id: "superscript",
    name: "Superscript",
    description: "Raised characters",
    transform: toSuperscript,
  },
  {
    id: "subscript",
    name: "Subscript",
    description: "Lowered characters",
    transform: toSubscript,
  },
  {
    id: "strikethrough",
    name: "Strikethrough",
    description: "Crossed-out text",
    transform: addStrikethrough,
  },
  {
    id: "underline",
    name: "Underline",
    description: "Underlined text",
    transform: addUnderline,
  },
  {
    id: "double-underline",
    name: "Double Underline",
    description: "Double underlined text",
    transform: addDoubleUnderline,
  },
  {
    id: "overline",
    name: "Overline",
    description: "Line above the text",
    transform: addOverline,
  },
  {
    id: "dotted",
    name: "Dotted",
    description: "Dotted text effect",
    transform: addDotted,
  },
  {
    id: "double-dotted",
    name: "Double Dotted",
    description: "Double dotted effect",
    transform: addDoubleDotted,
  },
  {
    id: "tilde",
    name: "Tilde",
    description: "Tilde text effect",
    transform: addTilde,
  },
  {
    id: "reverse",
    name: "Reverse",
    description: "Reverse character order",
    transform: reverseText,
  },
  {
    id: "bold-caps",
    name: "Bold Caps",
    description: "Bold uppercase lettering",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), boldMap),
  },
  {
    id: "italic-caps",
    name: "Italic Caps",
    description: "Italic uppercase lettering",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), italicMap),
  },
];

/* =========================
   Special Symbols
========================= */

const symbols = {
  Arrows: [
    "→",
    "←",
    "↑",
    "↓",
    "↔",
    "↕",
    "↗",
    "↘",
    "↙",
    "↖",
    "➜",
    "➝",
    "➞",
    "➟",
    "➠",
    "➡",
    "➢",
    "➣",
    "➤",
    "➥",
    "⟶",
    "⟵",
    "⟷",
    "⟹",
    "⟸",
  ],

  Stars: [
    "★",
    "☆",
    "✦",
    "✧",
    "✩",
    "✪",
    "✫",
    "✬",
    "✭",
    "✮",
    "✯",
    "✰",
    "⋆",
    "✶",
    "✷",
    "✸",
    "✹",
    "✺",
    "✻",
    "✼",
    "✽",
    "✾",
    "❂",
    "❈",
  ],

  Hearts: [
    "♥",
    "♡",
    "❤",
    "❣",
    "ღ",
    "💕",
    "💖",
    "💗",
    "💓",
    "💞",
    "💘",
    "💝",
    "💟",
    "💙",
    "💚",
    "💛",
    "💜",
    "🖤",
    "🤍",
    "🤎",
  ],

  Checkmarks: [
    "✓",
    "✔",
    "☑",
    "✅",
    "☒",
    "✗",
    "✘",
    "✖",
    "✕",
    "✚",
    "⊙",
    "●",
    "○",
    "◉",
    "◎",
  ],

  Decorations: [
    "୨୧",
    "꧁",
    "꧂",
    "༺",
    "༻",
    "❀",
    "✿",
    "❁",
    "❃",
    "❋",
    "✾",
    "❊",
    "❉",
    "✽",
    "𓆩",
    "𓆪",
    "❖",
    "◇",
    "◆",
    "◈",
    "◊",
  ],

  Separators: [
    "•",
    "◦",
    "∙",
    "·",
    "⋅",
    "‧",
    "|",
    "｜",
    "¦",
    "‖",
    "—",
    "–",
    "―",
    "−",
    "━",
    "─",
    "═",
    "〜",
    "〰",
    "⋯",
    "…",
  ],

  Faces: [
    "ツ",
    "シ",
    "ッ",
    "ヅ",
    "☻",
    "☺",
    "☹",
    "☀",
    "☁",
    "☾",
    "☽",
    "☼",
    "☄",
    "❄",
    "☯",
  ],

  Music: [
    "♪",
    "♫",
    "♬",
    "♩",
    "♭",
    "♯",
    "𝄞",
    "𝄢",
    "𝄡",
    "𝄫",
    "𝄪",
    "🎵",
    "🎶",
  ],

  Shapes: [
    "■",
    "□",
    "▪",
    "▫",
    "●",
    "○",
    "◉",
    "◎",
    "◆",
    "◇",
    "◈",
    "◊",
    "▲",
    "△",
    "▼",
    "▽",
    "▶",
    "▷",
    "◀",
    "◁",
  ],

  Lines: [
    "─",
    "━",
    "│",
    "┃",
    "┌",
    "┐",
    "└",
    "┘",
    "├",
    "┤",
    "┬",
    "┴",
    "┼",
    "═",
    "║",
    "╔",
    "╗",
    "╚",
    "╝",
    "╠",
    "╣",
    "╦",
    "╩",
    "╬",
  ],

  Currency: [
    "$",
    "€",
    "£",
    "¥",
    "₩",
    "₹",
    "₽",
    "₺",
    "₴",
    "₦",
    "₱",
    "₫",
    "₡",
    "₲",
    "₵",
    "₸",
    "₼",
    "₾",
  ],

  Math: [
    "+",
    "−",
    "×",
    "÷",
    "=",
    "≠",
    "≈",
    "≡",
    "≤",
    "≥",
    "∞",
    "√",
    "∑",
    "∏",
    "∆",
    "∇",
    "∂",
    "∫",
    "∴",
    "∵",
    "±",
    "∓",
  ],

  Brackets: [
    "(",
    ")",
    "[",
    "]",
    "{",
    "}",
    "<",
    ">",
    "「",
    "」",
    "『",
    "』",
    "【",
    "】",
    "〖",
    "〗",
    "《",
    "》",
    "〈",
    "〉",
    "〔",
    "〕",
    "⟦",
    "⟧",
  ],

  Miscellaneous: [
    "©",
    "®",
    "™",
    "℠",
    "℗",
    "§",
    "¶",
    "†",
    "‡",
    "※",
    "№",
    "℡",
    "℮",
    "✓",
    "☑",
    "☀",
    "☾",
    "♠",
    "♣",
    "♥",
    "♦",
  ],
};

export default function FancyTextPage() {
  const [inputText, setInputText] = useState("Create something amazing");
  const [selectedStyle, setSelectedStyle] = useState("bold");

  const [symbolsOpen, setSymbolsOpen] = useState(false);

  const [copied, setCopied] = useState(false);
  const [symbolCopied, setSymbolCopied] = useState("");

  const currentStyle =
    styles.find((style) => style.id === selectedStyle) ?? styles[0];

  const outputText = currentStyle.transform(inputText);

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Clipboard may be unavailable.
    }
  }

  async function copySymbol(symbol: string) {
    try {
      await navigator.clipboard.writeText(symbol);

      setSymbolCopied(symbol);

      setTimeout(() => {
        setSymbolCopied("");
      }, 1200);
    } catch {
      // Clipboard may be unavailable.
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <nav className="border-b border-slate-200">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:py-5">
            <a href="/" className="flex items-center gap-2">
              <img
                src="/creatoriva-logo.png"
                alt="Creatoriva"
                className="h-6 w-auto"
              />

              <span className="text-xl font-semibold tracking-tight">
                Creatoriva
              </span>
            </a>

            <div className="flex items-center gap-5 text-sm">
              <a
                href="/"
                className="font-medium text-slate-600 transition hover:text-slate-950"
              >
                Home
              </a>
            </div>
          </div>
        </nav>

        <div className="py-12">
          {/* Header */}
          <section className="mb-10 text-center">
            <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
              Creatoriva Tools
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Fancy Text &amp; Symbols Generator
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Create stylish fancy text and copy special symbols for social
              media captions, bios, comments, posts, usernames, and profiles.
            </p>
          </section>

          {/* Fancy Text */}
          <section className="mb-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">
                  Fancy Text Generator
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose a style, enter your text, and copy the result.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                {/* Mobile Preview */}
                <div className="order-1 lg:hidden">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Selected Style
                        </div>

                        <div className="mt-1 text-base font-semibold text-slate-900">
                          {currentStyle.name}
                        </div>

                        <div className="mt-1 text-xs text-slate-500">
                          {currentStyle.description}
                        </div>
                      </div>

                      <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500">
                        Unicode
                      </span>
                    </div>

                    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500">
                          Preview
                        </span>

                        <span className="text-xs text-slate-400">
                          {Array.from(outputText).length} characters
                        </span>
                      </div>

                      <div className="min-h-24 whitespace-pre-wrap break-words text-lg leading-8 text-slate-900">
                        {outputText ||
                          "Your styled text will appear here..."}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyText(outputText)}
                      className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      {copied ? "Copied!" : "Copy Text"}
                    </button>
                  </div>
                </div>

                {/* Style List */}
                <div className="order-2 overflow-hidden rounded-xl border border-slate-200 bg-white lg:order-1">
                  <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="text-sm font-semibold">
                      Choose a Style
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      30 text styles
                    </div>
                  </div>

                  <div className="max-h-[560px] overflow-y-auto">
                    {styles.map((style) => {
                      const isSelected = style.id === selectedStyle;

                      return (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setSelectedStyle(style.id)}
                          className={`w-full border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 sm:py-3 ${
                            isSelected
                              ? "bg-slate-100"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <div
                                className={`text-sm font-medium ${
                                  isSelected
                                    ? "text-slate-950"
                                    : "text-slate-700"
                                }`}
                              >
                                {style.name}
                              </div>

                              <div className="mt-1 truncate text-xs text-slate-400">
                                {style.transform("Creatoriva")}
                              </div>
                            </div>

                            {isSelected && (
                              <span className="shrink-0 text-sm text-slate-900">
                                ✓
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Desktop Editor */}
                <div className="order-3 hidden rounded-xl border border-slate-200 bg-white p-5 sm:p-6 lg:order-2 lg:block">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {currentStyle.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {currentStyle.description}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                      Unicode
                    </span>
                  </div>

                  <label
                    htmlFor="fancy-text-input"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Your Text
                  </label>

                  <textarea
                    id="fancy-text-input"
                    value={inputText}
                    onChange={(event) =>
                      setInputText(event.target.value)
                    }
                    placeholder="Type or paste your text here..."
                    rows={5}
                    className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-base leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">
                        Preview
                      </label>

                      <span className="text-xs text-slate-400">
                        {Array.from(outputText).length} characters
                      </span>
                    </div>

                    <div className="min-h-32 rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <div className="whitespace-pre-wrap break-words text-xl leading-9 text-slate-900">
                        {outputText ||
                          "Your styled text will appear here..."}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyText(outputText)}
                    className="mt-5 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    {copied ? "Copied!" : "Copy Text"}
                  </button>

                  <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                    Some Unicode characters may look different depending on
                    the device or platform.
                  </p>
                </div>

                {/* Mobile Text Input */}
                <div className="order-3 lg:hidden">
                  <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <label
                      htmlFor="fancy-text-input-mobile"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Your Text
                    </label>

                    <textarea
                      id="fancy-text-input-mobile"
                      value={inputText}
                      onChange={(event) =>
                        setInputText(event.target.value)
                      }
                      placeholder="Type or paste your text here..."
                      rows={4}
                      className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-base leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />

                    <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                      Some Unicode characters may look different depending on
                      the device or platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Special Symbols */}
          <section className="mb-10">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setSymbolsOpen(!symbolsOpen)}
                className="flex w-full items-center justify-between px-5 py-5 text-left transition hover:bg-slate-50 sm:px-6"
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    Special Symbols
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Arrows, stars, hearts, decorations, shapes, math symbols,
                    and more
                  </p>
                </div>

                <span
                  className={`shrink-0 text-xl text-slate-500 transition-transform ${
                    symbolsOpen ? "rotate-180" : ""
                  }`}
                >
                  ▽
                </span>
              </button>

              {symbolsOpen && (
                <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(symbols).map(([category, items]) => (
                      <div
                        key={category}
                        className="rounded-xl border border-slate-200 bg-white p-5"
                      >
                        <h3 className="mb-4 font-semibold">
                          {category}
                        </h3>

                        <div className="flex flex-wrap gap-2">
                          {items.map((symbol, index) => {
                            const isCopied = symbolCopied === symbol;

                            return (
                              <button
                                key={`${symbol}-${index}`}
                                type="button"
                                onClick={() => copySymbol(symbol)}
                                title={`Copy ${symbol}`}
                                className={`flex h-11 min-w-11 items-center justify-center rounded-lg border px-3 text-xl transition ${
                                  isCopied
                                    ? "border-slate-900 bg-slate-900 text-white"
                                    : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-400 hover:bg-white"
                                }`}
                              >
                                {isCopied ? "✓" : symbol}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 text-center text-xs leading-5 text-slate-400">
                    Click any symbol to copy it to your clipboard.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SEO Content */}
          <section className="border-t border-slate-200 pt-10">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight">
                Free Fancy Text Generator for Social Media
              </h2>

              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  Use this free fancy text generator to turn ordinary text
                  into stylish Unicode text that you can copy and paste into
                  social media captions, bios, comments, posts, usernames, and
                  profiles.
                </p>

                <p>
                  Choose from 30 different text styles, including bold,
                  italic, script, circled, monospace, Fraktur, small caps,
                  superscript, underline, and more. Your text is generated
                  directly in your browser, making it quick and easy to copy
                  and use.
                </p>

                <p>
                  You can also open the Special Symbols collection to find
                  arrows, stars, hearts, checkmarks, decorations, shapes,
                  separators, music symbols, currency signs, math symbols, and
                  other characters for creative posts and profiles.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}