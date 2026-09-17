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
   Unicode Display Font
========================= */

const unicodeDisplayStyle = {
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Noto Sans Symbols 2", sans-serif',
  fontVariantLigatures: "none",
} as const;

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

const doubleStruckMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝔠𝕕𝔢𝔣𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡"
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

/*
 * Mathematical Sans-Serif Bold Italic
 * Example:
 * see you next time
 * →
 * 𝙨𝙚𝙚 𝙮𝙤𝙪 𝙣𝙚𝙭𝙩 𝙩𝙞𝙢𝙚
 */
const sansBoldItalicMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝓸𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯"
);

const monospaceMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿"
);

const circledMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨"
);

const squaredMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉"
);

const negativeSquaredMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉"
);

const negativeCircledMap = createUnicodeMap(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓿❶❷❸❹❺❻❼❽❾"
);

const regionalIndicatorMap: Record<string, string> = {
  A: "🇦",
  B: "🇧",
  C: "🇨",
  D: "🇩",
  E: "🇪",
  F: "🇫",
  G: "🇬",
  H: "🇭",
  I: "🇮",
  J: "🇯",
  K: "🇰",
  L: "🇱",
  M: "🇲",
  N: "🇳",
  O: "🇴",
  P: "🇵",
  Q: "🇶",
  R: "🇷",
  S: "🇸",
  T: "🇹",
  U: "🇺",
  V: "🇻",
  W: "🇼",
  X: "🇽",
  Y: "🇾",
  Z: "🇿",
};

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

const upsideDownMap: Record<string, string> = {
  a: "ɐ",
  b: "q",
  c: "ɔ",
  d: "p",
  e: "ǝ",
  f: "ɟ",
  g: "ƃ",
  h: "ɥ",
  i: "ᴉ",
  j: "ɾ",
  k: "ʞ",
  l: "l",
  m: "ɯ",
  n: "u",
  o: "o",
  p: "d",
  q: "b",
  r: "ɹ",
  s: "s",
  t: "ʇ",
  u: "n",
  v: "ʌ",
  w: "ʍ",
  x: "x",
  y: "ʎ",
  z: "z",
  "0": "0",
  "1": "Ɩ",
  "2": "ᄅ",
  "3": "Ɛ",
  "4": "ㄣ",
  "5": "ϛ",
  "6": "9",
  "7": "ㄥ",
  "8": "8",
  "9": "6",
  ".": "˙",
  ",": "'",
  "?": "¿",
  "!": "¡",
};

const mirrorMap: Record<string, string> = {
  A: "A",
  B: "ᗺ",
  C: "Ɔ",
  D: "ᗡ",
  E: "Ǝ",
  F: "ꟻ",
  G: "Ꭾ",
  H: "H",
  I: "I",
  J: "Ⴑ",
  K: "ꓘ",
  L: "⅃",
  M: "M",
  N: "И",
  O: "O",
  P: "ꟼ",
  Q: "Ό",
  R: "Я",
  S: "Ƨ",
  T: "T",
  U: "U",
  V: "V",
  W: "W",
  X: "X",
  Y: "Y",
  Z: "Z",
  a: "ɒ",
  b: "d",
  c: "ɔ",
  d: "b",
  e: "ɘ",
  f: "ꟻ",
  g: "Ꭾ",
  h: "ʜ",
  i: "i",
  j: "Ⴑ",
  k: "ʞ",
  l: "l",
  m: "m",
  n: "n",
  o: "o",
  p: "q",
  q: "p",
  r: "ɿ",
  s: "ƨ",
  t: "ƚ",
  u: "u",
  v: "v",
  w: "w",
  x: "x",
  y: "y",
  z: "z",
};

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

function toSmallCaps(text: string) {
  return Array.from(text)
    .map((char) => smallCapsMap[char.toLowerCase()] ?? char)
    .join("");
}

function toUpsideDown(text: string) {
  return Array.from(text.toLowerCase())
    .map((char) => upsideDownMap[char] ?? char)
    .reverse()
    .join("");
}

function toMirror(text: string) {
  return Array.from(text)
    .map((char) => mirrorMap[char] ?? char)
    .reverse()
    .join("");
}

function toRegionalIndicators(text: string) {
  return Array.from(text)
    .map((char) => regionalIndicatorMap[char.toUpperCase()] ?? char)
    .join("");
}

function toAlternatingCase(text: string) {
  let letterIndex = 0;

  return Array.from(text)
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const result =
          letterIndex % 2 === 0
            ? char.toUpperCase()
            : char.toLowerCase();

        letterIndex += 1;
        return result;
      }

      return char;
    })
    .join("");
}

function toSpacedText(text: string) {
  return Array.from(text).join(" ");
}

function toWideText(text: string) {
  return Array.from(text).join("  ");
}

function toUppercase(text: string) {
  return text.toUpperCase();
}

function toLowercase(text: string) {
  return text.toLowerCase();
}

/* =========================
   50 Pure Text Styles
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
    id: "double-struck",
    name: "Double-Struck",
    description: "Mathematical lettering style",
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
    id: "monospace",
    name: "Monospace",
    description: "Clean technical lettering",
    transform: (text) => transformWithMap(text, monospaceMap),
  },
  {
    id: "circled",
    name: "Circled",
    description: "Characters inside circles",
    transform: (text) => transformWithMap(text, circledMap),
  },
  {
    id: "negative-circled",
    name: "Negative Circled",
    description: "Filled circular characters",
    transform: (text) => transformWithMap(text, negativeCircledMap),
  },
  {
    id: "squared",
    name: "Squared",
    description: "Characters inside squares",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), squaredMap),
  },
  {
    id: "negative-squared",
    name: "Negative Squared",
    description: "Filled square characters",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), negativeSquaredMap),
  },
  {
    id: "fullwidth",
    name: "Fullwidth",
    description: "Wide Unicode characters",
    transform: toFullwidth,
  },
  {
    id: "small-caps",
    name: "Small Caps",
    description: "Compact uppercase lettering",
    transform: toSmallCaps,
  },
  {
    id: "regional",
    name: "Regional Letters",
    description: "Flag-style letter characters",
    transform: toRegionalIndicators,
  },
  {
    id: "upside-down",
    name: "Upside Down",
    description: "Reversed upside-down lettering",
    transform: toUpsideDown,
  },
  {
    id: "mirror",
    name: "Mirror",
    description: "Mirrored character effect",
    transform: toMirror,
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
  {
    id: "sans-bold-caps",
    name: "Sans Bold Caps",
    description: "Modern bold uppercase lettering",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), sansBoldMap),
  },
  {
    id: "fraktur-caps",
    name: "Fraktur Caps",
    description: "Gothic uppercase lettering",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), frakturMap),
  },
  {
    id: "alternating",
    name: "Alternating Case",
    description: "Alternating uppercase and lowercase",
    transform: toAlternatingCase,
  },
  {
    id: "spaced",
    name: "Spaced",
    description: "Letters separated by spaces",
    transform: toSpacedText,
  },
  {
    id: "wide-spacing",
    name: "Wide Spacing",
    description: "Extra space between characters",
    transform: toWideText,
  },
  {
    id: "uppercase",
    name: "Uppercase",
    description: "Clean uppercase lettering",
    transform: toUppercase,
  },
  {
    id: "lowercase",
    name: "Lowercase",
    description: "Clean lowercase lettering",
    transform: toLowercase,
  },
  {
    id: "bold-lowercase",
    name: "Bold Lowercase",
    description: "Bold lowercase lettering",
    transform: (text) =>
      transformWithMap(text.toLowerCase(), boldMap),
  },
  {
    id: "italic-lowercase",
    name: "Italic Lowercase",
    description: "Italic lowercase lettering",
    transform: (text) =>
      transformWithMap(text.toLowerCase(), italicMap),
  },
  {
    id: "sans-uppercase",
    name: "Sans Uppercase",
    description: "Modern clean uppercase lettering",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), sansMap),
  },
  {
    id: "sans-lowercase",
    name: "Sans Lowercase",
    description: "Modern clean lowercase lettering",
    transform: (text) =>
      transformWithMap(text.toLowerCase(), sansMap),
  },
  {
    id: "sans-bold-lowercase",
    name: "Sans Bold Lowercase",
    description: "Modern bold lowercase lettering",
    transform: (text) =>
      transformWithMap(text.toLowerCase(), sansBoldMap),
  },
  {
    id: "sans-italic-uppercase",
    name: "Sans Italic Uppercase",
    description: "Modern italic uppercase lettering",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), sansItalicMap),
  },
  {
    id: "sans-italic-lowercase",
    name: "Sans Italic Lowercase",
    description: "Modern italic lowercase lettering",
    transform: (text) =>
      transformWithMap(text.toLowerCase(), sansItalicMap),
  },
  {
    id: "sans-bold-italic-uppercase",
    name: "Sans Bold Italic Uppercase",
    description: "Modern bold italic uppercase lettering",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), sansBoldItalicMap),
  },
  {
    id: "sans-bold-italic-lowercase",
    name: "Sans Bold Italic Lowercase",
    description: "Modern bold italic lowercase lettering",
    transform: (text) =>
      transformWithMap(text.toLowerCase(), sansBoldItalicMap),
  },
  {
    id: "monospace-uppercase",
    name: "Monospace Uppercase",
    description: "Technical uppercase lettering",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), monospaceMap),
  },
  {
    id: "monospace-lowercase",
    name: "Monospace Lowercase",
    description: "Technical lowercase lettering",
    transform: (text) =>
      transformWithMap(text.toLowerCase(), monospaceMap),
  },
  {
    id: "double-struck-uppercase",
    name: "Double-Struck Uppercase",
    description: "Mathematical uppercase lettering",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), doubleStruckMap),
  },
  {
    id: "double-struck-lowercase",
    name: "Double-Struck Lowercase",
    description: "Mathematical lowercase lettering",
    transform: (text) =>
      transformWithMap(text.toLowerCase(), doubleStruckMap),
  },
  {
    id: "fraktur-lowercase",
    name: "Fraktur Lowercase",
    description: "Gothic lowercase lettering",
    transform: (text) =>
      transformWithMap(text.toLowerCase(), frakturMap),
  },
  {
    id: "bold-fraktur-uppercase",
    name: "Bold Fraktur Uppercase",
    description: "Heavy Gothic uppercase lettering",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), boldFrakturMap),
  },
  {
    id: "bold-fraktur-lowercase",
    name: "Bold Fraktur Lowercase",
    description: "Heavy Gothic lowercase lettering",
    transform: (text) =>
      transformWithMap(text.toLowerCase(), boldFrakturMap),
  },
  {
    id: "script-uppercase",
    name: "Script Uppercase",
    description: "Elegant uppercase script lettering",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), scriptMap),
  },
  {
    id: "script-lowercase",
    name: "Script Lowercase",
    description: "Elegant lowercase script lettering",
    transform: (text) =>
      transformWithMap(text.toLowerCase(), scriptMap),
  },
  {
    id: "bold-script-uppercase",
    name: "Bold Script Uppercase",
    description: "Strong uppercase script lettering",
    transform: (text) =>
      transformWithMap(text.toUpperCase(), boldScriptMap),
  },
  {
    id: "bold-script-lowercase",
    name: "Bold Script Lowercase",
    description: "Strong lowercase script lettering",
    transform: (text) =>
      transformWithMap(text.toLowerCase(), boldScriptMap),
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
    "➦",
    "➧",
    "➨",
    "➩",
    "➪",
    "➫",
    "➬",
    "➭",
    "⟶",
    "⟵",
    "⟷",
    "⟹",
    "⟸",
    "⤴",
    "⤵",
    "↩",
    "↪",
    "↺",
    "↻",
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
    "❉",
    "❊",
    "✵",
    "✹",
    "✴",
    "✳",
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
    "💔",
    "❤️",
    "🩷",
    "🧡",
    "💯",
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
    "☐",
    "☒",
    "☓",
    "✔︎",
    "✓︎",
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
    "✧",
    "✦",
    "❥",
    "❦",
    "❧",
    "☙",
    "⚜",
    "ꕤ",
    "ꕥ",
  ],

  Separators: [
    "•",
    "◦",
    "∙",
    "·",
    "⋅",
    "‧",
    "⁝",
    "⁞",
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
    "⋯",
    "…",
    "⁕",
    "※",
    "⁑",
    "⁙",
    "⁘",
    "∶",
    "∷",
    "⁚",
    "⁝",
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
    "☮",
    "☢",
    "☣",
    "☠",
    "⚡",
    "☘",
    "🍀",
    "🌙",
    "⭐",
    "🌟",
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
    "🎼",
    "♮",
    "𝅘𝅥𝅮",
    "𝅘𝅥𝅯",
    "𝅘𝅥𝅰",
    "𝅘𝅥𝅱",
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
    "◆",
    "◇",
    "⬢",
    "⬡",
    "⬟",
    "⬣",
    "⬤",
    "◐",
    "◑",
    "◒",
    "◓",
    "◩",
    "◪",
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
    "┏",
    "┓",
    "┗",
    "┛",
    "┣",
    "┫",
    "┳",
    "┻",
    "╋",
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
    "₿",
    "¢",
    "฿",
    "₮",
    "₭",
    "₥",
    "₠",
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
    "∝",
    "∅",
    "∈",
    "∉",
    "⊂",
    "⊃",
    "⊆",
    "⊇",
    "∧",
    "∨",
    "¬",
    "∀",
    "∃",
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
    "⟨",
    "⟩",
    "⟪",
    "⟫",
    "⟮",
    "⟯",
    "⦃",
    "⦄",
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
    "☑",
    "☀",
    "☾",
    "♠",
    "♣",
    "♥",
    "♦",
    "♤",
    "♧",
    "♡",
    "♢",
    "⚜",
    "⚡",
    "☮",
    "☯",
    "☢",
    "☣",
    "☠",
    "⚠",
    "✓",
    "✦",
    "❖",
  ],
};

export default function FancyTextPage() {
  const [inputText, setInputText] = useState("Create something amazing");
  const [selectedStyle, setSelectedStyle] = useState("bold");
  const [styleOpen, setStyleOpen] = useState(false);
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

  function selectStyle(styleId: string) {
    setSelectedStyle(styleId);
    setStyleOpen(false);
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <nav className="relative left-1/2 w-screen -translate-x-1/2 border-b border-slate-200">
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

            <a
              href="/"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Home
            </a>
          </div>
        </nav>

        <div className="py-8 sm:py-12">
          {/* Header */}
          <section className="mb-7 text-center sm:mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Fancy Text &amp; Symbols Generator
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-lg sm:leading-7">
              Create stylish text and copy special symbols for captions, bios,
              posts, usernames, and profiles.
            </p>
          </section>

          {/* Fancy Text */}
          <section className="mb-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Fancy Text Generator
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose a style, enter your text, and copy the result.
                </p>
              </div>

              {/* Mobile Editor */}
              <div className="lg:hidden">
                <label
                  htmlFor="fancy-text-input-mobile"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Your Text
                </label>

                <textarea
                  id="fancy-text-input-mobile"
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                  placeholder="Type or paste your text here..."
                  rows={4}
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

                  <div className="min-h-28 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div
                      className="whitespace-pre-wrap break-words text-lg leading-8 text-slate-900"
                      style={unicodeDisplayStyle}
                    >
                      {outputText || "Your styled text will appear here..."}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyText(outputText)}
                  className="mt-4 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {copied ? "Copied!" : "Copy Text"}
                </button>

                {/* Mobile Style Selector */}
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => setStyleOpen(!styleOpen)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left transition hover:bg-slate-100"
                  >
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Style
                      </div>

                      <div className="mt-1 text-sm font-semibold text-slate-900">
                        {currentStyle.name}
                      </div>
                    </div>

                    <span
                      className={`text-lg text-slate-500 transition-transform ${
                        styleOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {styleOpen && (
                    <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <div className="max-h-80 overflow-y-auto">
                        {styles.map((style) => {
                          const isSelected = style.id === selectedStyle;

                          return (
                            <button
                              key={style.id}
                              type="button"
                              onClick={() => selectStyle(style.id)}
                              className={`w-full border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 ${
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

                                  <div
                                    className="mt-1 truncate text-xs text-slate-400"
                                    style={unicodeDisplayStyle}
                                  >
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
                  )}
                </div>
              </div>

              {/* Desktop Editor */}
              <div className="hidden gap-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
                {/* Style List */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="text-sm font-semibold">
                      Choose a Style
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      50 text styles
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
                          className={`w-full border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 ${
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

                              <div
                                className="mt-1 truncate text-xs text-slate-400"
                                style={unicodeDisplayStyle}
                              >
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

                {/* Desktop Editor Area */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
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
                    onChange={(event) => setInputText(event.target.value)}
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
                      <div
                        className="whitespace-pre-wrap break-words text-xl leading-9 text-slate-900"
                        style={unicodeDisplayStyle}
                      >
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
              </div>
            </div>
          </section>

          {/* Ad Placeholder 1 */}
          <div className="my-8 flex min-h-[120px] items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-xs text-slate-400">Advertisement</span>
          </div>

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
                                <span style={unicodeDisplayStyle}>
                                  {isCopied ? "✓" : symbol}
                                </span>
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

          {/* Ad Placeholder 2 */}
          <div className="my-8 flex min-h-[120px] items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-xs text-slate-400">Advertisement</span>
          </div>

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
                  Choose from 50 different text styles, including bold,
                  italic, script, circled, monospace, Fraktur, Sans,
                  Double-Struck, fullwidth, mirrored text, uppercase styles,
                  lowercase styles, and more. Your text is generated directly
                  in your browser, making it quick and easy to copy and use.
                </p>

                <p>
                  You can also open the Special Symbols collection to find
                  arrows, stars, hearts, checkmarks, decorations, shapes,
                  separators, music symbols, currency signs, math symbols,
                  brackets, and other characters for creative posts and
                  profiles.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="relative left-1/2 w-screen -translate-x-1/2 border-t border-slate-200">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Creatoriva. All rights reserved.</p>

            <div className="flex gap-5">
              <a
                href="/privacy"
                className="transition hover:text-black"
              >
                Privacy
              </a>

              <a
                href="/terms"
                className="transition hover:text-black"
              >
                Terms
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}