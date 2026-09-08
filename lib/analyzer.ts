export type RiskLevel = "High" | "Medium" | "Low";

export type Match = {
  phrase: string;
  start: number;
  end: number;
};

export type RiskCategory = {
  name: string;
  level: "High" | "Medium";
  keywords: string[];
  explanation: string;
  direction: string;
};

export type PatternCategory = {
  name: string;
  level: "High" | "Medium";
  keywords: string[];
  explanation: string;
  direction: string;
  optimizationOnly?: boolean;
};

export type ContextType =
  | "Educational"
  | "Warning"
  | "Debunking"
  | "News Reporting"
  | "Commentary"
  | "Criticism"
  | "Personal Experience"
  | "Quoting"
  | "Instructional"
  | "Promotional"
  | "Persuasive"
  | "Transactional"
  | "Satirical"
  | "Fictional"
  | "Neutral";

export type IntentType =
  | "Inform"
  | "Warn"
  | "Educate"
  | "Debunk"
  | "Report"
  | "Criticize"
  | "Share Experience"
  | "Promote"
  | "Persuade"
  | "Sell"
  | "Instruct"
  | "Entertain"
  | "Quote"
  | "Unknown";

export type ClaimType =
  | "Financial"
  | "Health"
  | "Income"
  | "Performance"
  | "Product"
  | "Scientific"
  | "Legal"
  | "Safety"
  | "General"
  | "None";

export type RiskDimension =
  | "Financial"
  | "Deception"
  | "Health"
  | "Safety"
  | "Violence"
  | "Adult"
  | "Drugs"
  | "Hate"
  | "Misinformation"
  | "Advertising"
  | "Platform";

export type AnalysisResult = {
  score: number;
  risk: RiskLevel;
  riskMatches: {
    category: RiskCategory | PatternCategory;
    matches: Match[];
  }[];
  optimizationMatches: {
    category: PatternCategory;
    matches: Match[];
  }[];
  contextualRiskMatches: Match[];
  context: {
    primary: ContextType;
    signals: string[];
  };
  intent: {
    primary: IntentType;
    signals: string[];
  };
  claims: {
    types: ClaimType[];
    signals: string[];
  };
  riskDimensions: {
    dimension: RiskDimension;
    score: number;
  }[];
  analysisVersion: "2.3";
};

/* =========================================================
   Category definitions
   ========================================================= */

const riskCategories: RiskCategory[] = [
  {
    name: "Financial Claims",
    level: "Medium",
    keywords: [
      "investment",
      "invest",
      "investing",
      "invested",
      "return",
      "returns",
      "profit",
      "profits",
      "trading",
      "trade",
      "stocks",
      "stock",
      "crypto",
      "cryptocurrency",
      "bitcoin",
      "money",
      "income",
      "earnings",
      "financial freedom",
    ],
    explanation:
      "Financial claims can create risk when they imply certainty, guaranteed returns, or unrealistic financial outcomes.",
    direction:
      "Use factual, qualified language and avoid guaranteeing financial outcomes.",
  },

  {
    name: "Scam & Fraud",
    level: "High",
    keywords: [
      "scam",
      "scams",
      "scammer",
      "scammers",
      "fraud",
      "fraudulent",
      "fraudster",
      "ponzi",
      "pyramid scheme",
      "fake investment",
      "fake investments",
      "steal",
      "stealing",
      "stolen",
      "identity theft",
      "phishing",
      "money laundering",
    ],
    explanation:
      "Content involving scams, fraud, or deceptive financial activity can create significant safety and trust concerns.",
    direction:
      "Avoid facilitating fraudulent activity or presenting deceptive schemes as legitimate.",
  },

  {
    name: "Deceptive or Misleading Claims",
    level: "Medium",
    keywords: [
      "fake claim",
      "fake claims",
      "misleading claim",
      "misleading claims",
      "false claim",
      "false claims",
      "deceptive claim",
      "deceptive claims",
      "guaranteed",
      "guarantee",
      "guarantees",
      "guaranteed results",
      "guaranteed outcome",
      "guaranteed success",
      "no risk",
      "risk free",
      "risk-free",
    ],
    explanation:
      "Absolute or misleading claims may make information appear more certain than the available evidence supports.",
    direction:
      "Use qualified language and clearly distinguish claims from verified facts.",
  },

  {
    name: "Health & Medical",
    level: "Medium",
    keywords: [
      "cure",
      "cures",
      "cured",
      "curing",
      "treat",
      "treats",
      "treated",
      "treatment",
      "heal",
      "heals",
      "healed",
      "healing",
      "diagnose",
      "diagnosis",
      "medicine",
      "medical",
      "disease",
      "diabetes",
      "cancer",
      "depression",
      "anxiety",
      "symptoms",
      "supplement",
      "supplements",
    ],
    explanation:
      "Health and medical claims can be sensitive, particularly when they promise treatment, cures, or guaranteed outcomes.",
    direction:
      "Avoid presenting medical outcomes as certain and use evidence-based, qualified wording.",
  },

  {
    name: "Weight Loss",
    level: "Medium",
    keywords: [
      "lose weight",
      "lose fat",
      "weight loss",
      "burn fat",
      "fat burning",
      "drop pounds",
      "lose pounds",
      "slim down",
      "rapid weight loss",
      "fast weight loss",
    ],
    explanation:
      "Weight-loss claims can become risky when they promise rapid, guaranteed, or unrealistic results.",
    direction:
      "Avoid guaranteed weight-loss outcomes and use realistic, qualified descriptions.",
  },

  {
    name: "Gambling",
    level: "High",
    keywords: [
      "gambling",
      "gamble",
      "casino",
      "bet",
      "bets",
      "betting",
      "sports betting",
      "jackpot",
      "slot machine",
      "roulette",
      "poker",
      "win money",
      "easy winnings",
    ],
    explanation:
      "Gambling-related content can involve financial loss, regulated activity, or encouragement of risky behavior.",
    direction:
      "Avoid encouraging gambling or presenting winnings as guaranteed or effortless.",
  },

  {
    name: "Drugs",
    level: "High",
    keywords: [
      "illegal drugs",
      "illicit drugs",
      "buy drugs",
      "sell drugs",
      "selling drugs",
      "purchase drugs",
      "drug dealer",
      "drug dealing",
      "cocaine",
      "heroin",
      "meth",
      "methamphetamine",
      "fentanyl",
      "crack cocaine",
      "ecstasy",
      "mdma",
      "lsd",
      "illegal substances",
      "illicit substances",
    ],
    explanation:
      "Content that promotes, sells, or facilitates illegal drugs can present a serious safety concern.",
    direction:
      "Avoid promotional or transactional language involving illegal drugs.",
  },

  {
    name: "Violence",
    level: "High",
    keywords: [
      "kill",
      "killing",
      "murder",
      "murdering",
      "assassinate",
      "assassination",
      "attack",
      "attacking",
      "shoot",
      "shooting",
      "stab",
      "stabbing",
      "bomb",
      "bombing",
      "weapon",
      "weapons",
      "massacre",
      "torture",
    ],
    explanation:
      "Content involving serious violence or instructions that facilitate violent activity can present significant safety concerns.",
    direction:
      "Avoid encouraging, facilitating, or glorifying serious violence.",
  },

  {
    name: "Adult Content",
    level: "High",
    keywords: [
      "porn",
      "pornography",
      "explicit sex",
      "sexual content",
      "sexually explicit",
      "nude",
      "nudity",
      "naked",
      "sexual services",
      "escort",
      "prostitution",
    ],
    explanation:
      "Explicit sexual content or sexual services can create platform safety and policy concerns.",
    direction:
      "Avoid explicit sexual content and transactional sexual language.",
  },

  {
    name: "Hate & Harassment",
    level: "High",
    keywords: [
      "hate group",
      "hate speech",
      "racial slur",
      "kill them all",
      "go die",
      "inferior race",
      "inferior people",
      "dehumanize",
      "dehumanizing",
      "threaten",
      "threatening",
      "harass",
      "harassing",
      "harassment",
      "bully",
      "bullying",
    ],
    explanation:
      "Hateful, threatening, or targeted harassment can create serious safety and platform-policy concerns.",
    direction:
      "Avoid threats, hateful generalizations, or targeted harassment.",
  },
];

/* =========================================================
   Optimization patterns
   ========================================================= */

const patternCategories: PatternCategory[] = [
  {
    name: "Exaggerated Promise",
    level: "Medium",
    optimizationOnly: true,
    keywords: [
      "best ever",
      "best in the world",
      "works instantly",
      "instant results",
      "instant success",
      "guaranteed results",
      "guaranteed success",
      "works for everyone",
      "perfect results",
      "100% effective",
      "completely effective",
      "zero risk",
      "no risk",
    ],
    explanation:
      "Strong promises can make a claim sound more certain than the available evidence supports.",
    direction:
      "Use qualified language and avoid presenting uncertain outcomes as guaranteed.",
  },

  {
    name: "Clickbait",
    level: "Medium",
    optimizationOnly: true,
    keywords: [
      "you won't believe",
      "you will not believe",
      "shocking",
      "shocking truth",
      "secret",
      "the truth they don't want you to know",
      "what happens next",
      "this changes everything",
      "must see",
      "watch before it's deleted",
      "they don't want you to know",
    ],
    explanation:
      "Clickbait wording can create exaggerated expectations or unnecessary sensationalism.",
    direction:
      "Use specific and informative wording instead of sensational claims.",
  },

  {
    name: "Promotional Language",
    level: "Medium",
    optimizationOnly: true,
    keywords: [
      "buy now",
      "purchase now",
      "order now",
      "limited offer",
      "special offer",
      "exclusive offer",
      "get yours",
      "shop now",
      "sign up now",
      "join now",
      "don't miss",
      "dont miss",
    ],
    explanation:
      "Strong promotional language can increase pressure and may require additional context.",
    direction:
      "Keep promotional language clear, specific, and proportionate.",
  },

  {
    name: "Urgency / Pressure",
    level: "Medium",
    optimizationOnly: true,
    keywords: [
      "act now",
      "act immediately",
      "hurry",
      "last chance",
      "limited time",
      "expires today",
      "only today",
      "don't wait",
      "dont wait",
      "before it's too late",
      "before its too late",
    ],
    explanation:
      "Urgency and pressure can make content feel manipulative or overly promotional.",
    direction:
      "Avoid unnecessary pressure and explain genuine deadlines clearly.",
  },

  {
    name: "Quick Wealth / Easy Money",
    level: "High",
    optimizationOnly: false,
    keywords: [
      "get rich quick",
      "get rich fast",
      "easy money",
      "make money fast",
      "make money quickly",
      "quick money",
      "instant money",
      "passive income guaranteed",
      "guaranteed income",
      "guaranteed profit",
      "easy profits",
      "easy profit",
      "financial freedom fast",
    ],
    explanation:
      "Promises of effortless or guaranteed financial gains can be misleading and financially risky.",
    direction:
      "Avoid guaranteed income or profit claims and describe realistic conditions and risks.",
  },

  {
    name: "Extreme Certainty",
    level: "Medium",
    optimizationOnly: false,
    keywords: [
      "always works",
      "never fails",
      "will definitely",
      "definitely works",
      "certainly works",
      "guaranteed",
      "guarantees",
      "guaranteed outcome",
      "guaranteed success",
      "works for everyone",
      "everyone will",
      "no one can fail",
      "100% effective",
      "100 percent effective",
    ],
    explanation:
      "Absolute certainty can make claims sound stronger than the available evidence supports.",
    direction:
      "Use qualified language and avoid presenting uncertain outcomes as guaranteed.",
  },
];

/* =========================================================
   Context signals
   ========================================================= */

const contextSignals: Record<ContextType, string[]> = {
  Warning: [
    "warning",
    "beware",
    "be careful",
    "watch out",
    "don't fall for",
    "dont fall for",
    "do not fall for",
    "avoid",
    "never trust",
    "don't trust",
    "dont trust",
    "do not trust",
    "don't believe",
    "dont believe",
    "do not believe",
    "be skeptical",
    "stay away from",
    "watch for",
    "protect yourself",
    "warning signs",
    "red flags",
  ],

  Debunking: [
    "debunk",
    "debunking",
    "myth",
    "myths",
    "myth is false",
    "false claim",
    "false claims",
    "misleading claim",
    "misleading claims",
    "unsupported claim",
    "unsupported claims",
    "not true",
    "fact check",
    "fact-check",
    "fact checking",
    "fact-checking",
    "false information",
    "misinformation",
    "not supported by evidence",
    "no evidence supports",
    "evidence does not support",
    "there is no evidence",
    "there's no evidence",
    "there is not enough evidence",
    "not proven",
    "unproven",
    "disproven",
  ],

  Educational: [
    "this article explains",
    "this article discusses",
    "this article examines",
    "this article explores",
    "this video explains",
    "this video discusses",
    "this video examines",
    "this guide explains",
    "this guide discusses",
    "this lesson explains",
    "in this lesson",
    "educational",
    "for educational purposes",
    "educational purposes",
    "learn about",
    "learn how",
    "explains how",
    "explaining",
    "education",
    "educational content",
    "educational discussion",
    "this article",
    "this video",
    "this guide",
  ],

  "News Reporting": [
    "according to reports",
    "according to the report",
    "according to officials",
    "officials said",
    "police said",
    "reported by",
    "news report",
    "news reports",
    "breaking news",
    "journalists reported",
    "the report said",
    "the report states",
    "reported that",
  ],

  Commentary: [
    "in my opinion",
    "my opinion",
    "i think",
    "i believe",
    "we believe",
    "in our view",
    "commentary",
    "commentary on",
    "my analysis",
    "our analysis",
    "from my perspective",
    "from our perspective",
  ],

  Criticism: [
    "i criticize",
    "i criticise",
    "we criticize",
    "we criticise",
    "criticism",
    "criticizing",
    "criticising",
    "critique",
    "criticize",
    "criticise",
    "i disagree",
    "we disagree",
    "this is wrong",
    "this claim is wrong",
    "this claim is misleading",
    "this claim is false",
  ],

  "Personal Experience": [
    "my experience",
    "my personal experience",
    "in my experience",
    "i experienced",
    "i tried",
    "i used",
    "i tested",
    "when i tried",
    "what happened to me",
    "personally",
  ],

  Quoting: [
    "quote",
    "quoted",
    "quoting",
    "according to",
    "he said",
    "she said",
    "they said",
    "the speaker said",
    "the author said",
    "someone said",
    "the claim was",
  ],

  Instructional: [
    "how to",
    "how do i",
    "step by step",
    "step-by-step",
    "tutorial",
    "guide",
    "instructions",
    "follow these steps",
    "here's how",
    "heres how",
    "here is how",
    "steps to",
  ],

  Promotional: [
    "buy now",
    "purchase now",
    "order now",
    "shop now",
    "get yours",
    "sign up",
    "join now",
    "limited offer",
    "special offer",
    "exclusive offer",
    "available now",
    "for sale",
    "sale",
    "discount",
    "deal",
  ],

  Persuasive: [
    "you should",
    "you need to",
    "you must",
    "you have to",
    "everyone should",
    "don't miss",
    "dont miss",
    "you deserve",
    "take advantage",
    "consider this",
    "the best choice",
  ],

  Transactional: [
    "buy now",
    "purchase now",
    "order now",
    "checkout",
    "for sale",
    "how to buy",
    "how do i buy",
    "where to buy",
    "how to sell",
    "how do i sell",
    "where to sell",
    "how to purchase",
    "how do i purchase",
    "where to purchase",
  ],

  Satirical: [
    "satire",
    "satirical",
    "parody",
    "parodying",
    "sarcasm",
    "sarcastic",
    "joke",
    "just kidding",
    "kidding",
  ],

  Fictional: [
    "fictional",
    "fiction",
    "in this story",
    "in this fictional story",
    "fictional character",
    "imaginary",
    "pretend",
    "roleplay",
    "role-play",
  ],

  Neutral: [],
};

/* =========================================================
   Intent signals
   ========================================================= */

const intentSignals: Record<IntentType, string[]> = {
  Warn: [
    "warning",
    "beware",
    "be careful",
    "don't believe",
    "dont believe",
    "do not believe",
    "don't trust",
    "dont trust",
    "do not trust",
    "avoid",
    "never trust",
    "watch out",
    "protect yourself",
  ],

  Debunk: [
    "debunk",
    "debunking",
    "myth",
    "false claim",
    "false claims",
    "misleading claim",
    "misleading claims",
    "unsupported claim",
    "unsupported claims",
    "fact check",
    "fact-check",
    "fact checking",
    "fact-checking",
    "not true",
    "misinformation",
    "no evidence",
    "not supported by evidence",
    "disproven",
  ],

  Educate: [
    "this article explains",
    "this video explains",
    "this guide explains",
    "this article discusses",
    "this video discusses",
    "educational",
    "for educational purposes",
    "learn about",
    "learn how",
    "explains",
    "explaining",
    "education",
    "lesson",
    "guide",
  ],

  Report: [
    "according to reports",
    "according to officials",
    "officials said",
    "police said",
    "reported by",
    "news report",
    "news reports",
    "breaking news",
    "journalists reported",
    "reported that",
  ],

  Criticize: [
    "criticize",
    "criticise",
    "criticism",
    "criticizing",
    "criticising",
    "critique",
    "i disagree",
    "we disagree",
    "this is wrong",
    "this claim is false",
    "this claim is misleading",
  ],

  "Share Experience": [
    "my experience",
    "my personal experience",
    "in my experience",
    "i experienced",
    "i tried",
    "i used",
    "i tested",
    "personally",
  ],

  Promote: [
    "buy now",
    "purchase now",
    "shop now",
    "get yours",
    "sign up",
    "join now",
    "limited offer",
    "special offer",
    "exclusive offer",
    "available now",
    "discount",
  ],

  Persuade: [
    "you should",
    "you need to",
    "you must",
    "you have to",
    "everyone should",
    "don't miss",
    "dont miss",
    "take advantage",
    "consider this",
    "best choice",
  ],

  Sell: [
    "for sale",
    "selling",
    "sell",
    "order",
    "checkout",
    "purchase",
  ],

  Instruct: [
    "how to",
    "how do i",
    "step by step",
    "step-by-step",
    "tutorial",
    "instructions",
    "follow these steps",
    "here's how",
    "heres how",
    "here is how",
    "steps to",
  ],

  Entertain: [
    "satire",
    "satirical",
    "parody",
    "sarcasm",
    "sarcastic",
    "joke",
    "just kidding",
    "kidding",
    "fictional",
    "fiction",
    "story",
  ],

  Quote: [
    "quoted",
    "quoting",
    "according to",
    "he said",
    "she said",
    "they said",
    "someone said",
  ],

  Inform: [
    "information",
    "inform",
    "explains",
    "explaining",
    "discusses",
    "examines",
    "overview",
    "facts",
  ],

  Unknown: [],
};

/* =========================================================
   Claim signals
   ========================================================= */

const claimSignals: Record<ClaimType, string[]> = {
  Financial: [
    "investment",
    "invest",
    "investing",
    "invested",
    "return",
    "returns",
    "profit",
    "profits",
    "trading",
    "trade",
    "stocks",
    "stock",
    "crypto",
    "cryptocurrency",
    "bitcoin",
    "financial",
    "money",
  ],

  Health: [
    "cure",
    "cures",
    "cured",
    "curing",
    "treat",
    "treats",
    "treated",
    "treatment",
    "heal",
    "heals",
    "healed",
    "healing",
    "medical",
    "medicine",
    "disease",
    "diabetes",
    "cancer",
    "symptoms",
    "supplement",
    "supplements",
  ],

  Income: [
    "income",
    "earnings",
    "earn",
    "earn money",
    "make money",
    "make money fast",
    "passive income",
    "guaranteed income",
    "financial freedom",
  ],

  Performance: [
    "works",
    "work",
    "working",
    "effective",
    "effectiveness",
    "results",
    "result",
    "success",
    "successful",
    "performance",
    "improve",
    "improves",
    "improved",
    "improving",
    "faster",
    "better",
    "stronger",
    "more effective",
  ],

  Product: [
    "product",
    "products",
    "supplement",
    "supplements",
    "service",
    "services",
    "course",
    "courses",
    "program",
    "programs",
    "tool",
    "tools",
    "app",
    "apps",
    "software",
  ],

  Scientific: [
    "study",
    "studies",
    "research",
    "scientific",
    "evidence",
    "experiment",
    "experiments",
    "data",
    "scientists",
    "scientist",
  ],

  Legal: [
    "legal",
    "illegal",
    "law",
    "laws",
    "legalized",
    "criminal",
    "crime",
    "regulation",
    "regulated",
  ],

  Safety: [
    "safe",
    "safety",
    "danger",
    "dangerous",
    "risk",
    "risks",
    "harm",
    "harmful",
    "protect",
    "protection",
  ],

  General: [
    "claim",
    "claims",
    "promise",
    "promises",
    "guarantee",
    "guarantees",
  ],

  None: [],
};

/* =========================================================
   Risk dimension mapping
   ========================================================= */

const dimensionMap: Record<string, RiskDimension> = {
  "Financial Claims": "Financial",
  "Scam & Fraud": "Deception",
  "Deceptive or Misleading Claims": "Deception",
  "Health & Medical": "Health",
  "Weight Loss": "Health",
  Gambling: "Financial",
  Drugs: "Drugs",
  Violence: "Violence",
  "Adult Content": "Adult",
  "Hate & Harassment": "Hate",
  "Quick Wealth / Easy Money": "Financial",
  "Extreme Certainty": "Deception",
};

/* =========================================================
   Text normalization
   ========================================================= */

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeWord(word: string): string {
  let value = word.toLowerCase().replace(/[^a-z0-9'-]/g, "");

  if (!value) return "";

  /*
   * Keep common irregular forms stable.
   */
  const irregular: Record<string, string> = {
    are: "be",
    is: "be",
    was: "be",
    were: "be",
    been: "be",
    being: "be",
    has: "have",
    had: "have",
    having: "have",
    does: "do",
    did: "do",
    doing: "do",
    goes: "go",
    went: "go",
    going: "go",
    better: "good",
    best: "good",
    worse: "bad",
    worst: "bad",
  };

  if (irregular[value]) {
    return irregular[value];
  }

  /*
   * Plural handling.
   */
  if (value.endsWith("ies") && value.length > 4) {
    return `${value.slice(0, -3)}y`;
  }

  if (
    value.endsWith("sses") ||
    value.endsWith("shes") ||
    value.endsWith("ches") ||
    value.endsWith("xes") ||
    value.endsWith("zes")
  ) {
    return value.slice(0, -2);
  }

  if (value.endsWith("s") && !value.endsWith("ss") && value.length > 3) {
    value = value.slice(0, -1);
  }

  /*
   * Common -ing forms.
   */
  if (value.endsWith("ing") && value.length > 5) {
    const base = value.slice(0, -3);

    if (base.endsWith("y")) {
      return base;
    }

    if (
      base.length >= 3 &&
      base[base.length - 1] === base[base.length - 2]
    ) {
      return base.slice(0, -1);
    }

    if (base.endsWith("e")) {
      return base;
    }

    return base;
  }

  /*
   * Common -ed forms.
   */
  if (value.endsWith("ed") && value.length > 4) {
    const base = value.slice(0, -2);

    if (base.endsWith("i")) {
      return `${base.slice(0, -1)}y`;
    }

    if (
      base.length >= 3 &&
      base[base.length - 1] === base[base.length - 2]
    ) {
      return base.slice(0, -1);
    }

    return base;
  }

  return value;
}

function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(/[^a-z0-9'-]+/)
    .map((word) => normalizeWord(word))
    .filter(Boolean);
}

function getWordTokensWithPositions(text: string): {
  word: string;
  normalized: string;
  start: number;
  end: number;
}[] {
  const result: {
    word: string;
    normalized: string;
    start: number;
    end: number;
  }[] = [];

  const regex = /[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g;

  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    result.push({
      word: match[0],
      normalized: normalizeWord(match[0]),
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return result;
}

/* =========================================================
   Matching
   ========================================================= */

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findMatches(text: string, keyword: string): Match[] {
  const matches: Match[] = [];

  if (!text || !keyword) return matches;

  /*
   * Use normalized text only for matching.
   *
   * Important:
   * normalizeText() can change character positions when it
   * collapses whitespace or trims the text.
   *
   * Therefore, we must NOT use indexes from normalizedText
   * to slice the original text.
   *
   * Instead, exact phrase matching is performed against a
   * position-preserving normalized version of the text.
   */

  const normalizedText = text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"');

  const normalizedKeyword = normalizeText(keyword);

  /*
   * First pass:
   * exact phrase matching with word boundaries where possible.
   *
   * The normalized text keeps the original character positions.
   */

  const escaped = escapeRegExp(normalizedKeyword);

  const exactRegex = new RegExp(
    `(^|[^a-z0-9])(${escaped})(?=$|[^a-z0-9])`,
    "gi"
  );

  let exactMatch: RegExpExecArray | null;

  while ((exactMatch = exactRegex.exec(normalizedText)) !== null) {
    const prefixLength = exactMatch[1]?.length ?? 0;
    const start = exactMatch.index + prefixLength;
    const end = start + normalizedKeyword.length;

    matches.push({
      phrase: text.slice(start, end),
      start,
      end,
    });

    if (exactRegex.lastIndex === exactMatch.index) {
      exactRegex.lastIndex++;
    }
  }

  if (matches.length > 0) {
    return dedupeMatches(matches);
  }

  /*
   * Second pass:
   * normalized token matching allows:
   * cure / cures / cured / curing
   * claim / claims
   * explain / explains / explaining
   *
   * This pass already uses original-text positions.
   */

  const textTokens = getWordTokensWithPositions(text);
  const keywordTokens = tokenize(keyword);

  if (keywordTokens.length === 0) return [];

  for (
    let i = 0;
    i <= textTokens.length - keywordTokens.length;
    i++
  ) {
    let matched = true;

    for (let j = 0; j < keywordTokens.length; j++) {
      if (textTokens[i + j].normalized !== keywordTokens[j]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      const start = textTokens[i].start;
      const end =
        textTokens[i + keywordTokens.length - 1].end;

      matches.push({
        phrase: text.slice(start, end),
        start,
        end,
      });
    }
  }

  return dedupeMatches(matches);
}

function dedupeMatches(matches: Match[]): Match[] {
  const seen = new Set<string>();

  return matches.filter((match) => {
    const key = `${match.start}:${match.end}:${match.phrase.toLowerCase()}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function mergeMatches(matches: Match[]): Match[] {
  if (matches.length === 0) return [];

  const sorted = [...matches].sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return b.end - a.end;
  });

  const merged: Match[] = [];

  for (const current of sorted) {
    const previous = merged[merged.length - 1];

    if (!previous) {
      merged.push(current);
      continue;
    }

    if (current.start <= previous.end) {
      if (current.end > previous.end) {
        previous.end = current.end;
        previous.phrase =
          previous.phrase.length >= current.phrase.length
            ? previous.phrase
            : current.phrase;
      }

      continue;
    }

    merged.push(current);
  }

  return merged;
}

function getCategoryMatches(
  text: string,
  category: RiskCategory | PatternCategory
): Match[] {
  const matches: Match[] = [];

  for (const keyword of category.keywords) {
    matches.push(...findMatches(text, keyword));
  }

  return mergeMatches(matches);
}

/* =========================================================
   Signal helpers
   ========================================================= */

function countSignalMatches(
  text: string,
  signals: string[]
): number {
  let count = 0;

  for (const signal of signals) {
    if (findMatches(text, signal).length > 0) {
      count++;
    }
  }

  return count;
}

function getMatchedSignals(
  text: string,
  signals: string[]
): string[] {
  const matched: string[] = [];

  for (const signal of signals) {
    if (findMatches(text, signal).length > 0) {
      matched.push(signal);
    }
  }

  return matched;
}

/* =========================================================
   Context detection
   ========================================================= */

function detectContext(text: string): {
  primary: ContextType;
  signals: string[];
} {
  const scores: Record<ContextType, number> = {
    Warning: 0,
    Debunking: 0,
    Educational: 0,
    "News Reporting": 0,
    Commentary: 0,
    Criticism: 0,
    "Personal Experience": 0,
    Quoting: 0,
    Instructional: 0,
    Promotional: 0,
    Persuasive: 0,
    Transactional: 0,
    Satirical: 0,
    Fictional: 0,
    Neutral: 0,
  };

  const matchedSignals: Record<ContextType, string[]> = {
    Warning: [],
    Debunking: [],
    Educational: [],
    "News Reporting": [],
    Commentary: [],
    Criticism: [],
    "Personal Experience": [],
    Quoting: [],
    Instructional: [],
    Promotional: [],
    Persuasive: [],
    Transactional: [],
    Satirical: [],
    Fictional: [],
    Neutral: [],
  };

  const priority: ContextType[] = [
    "Warning",
    "Debunking",
    "News Reporting",
    "Educational",
    "Criticism",
    "Instructional",
    "Transactional",
    "Promotional",
    "Persuasive",
    "Commentary",
    "Personal Experience",
    "Quoting",
    "Satirical",
    "Fictional",
  ];

  for (const context of priority) {
    for (const signal of contextSignals[context]) {
      const matches = findMatches(text, signal);

      if (matches.length > 0) {
        scores[context] += 1;
        matchedSignals[context].push(signal);
      }
    }
  }

  /*
   * Explicit instructional phrases are strong signals.
   */
  if (
    findMatches(text, "how to").length > 0 ||
    findMatches(text, "step by step").length > 0 ||
    findMatches(text, "tutorial").length > 0
  ) {
    scores.Instructional += 3;
  }

  /*
   * Explicit transaction phrases are stronger than generic promotion.
   */
  if (
    findMatches(text, "buy now").length > 0 ||
    findMatches(text, "purchase now").length > 0 ||
    findMatches(text, "order now").length > 0 ||
    findMatches(text, "checkout").length > 0 ||
    findMatches(text, "for sale").length > 0
  ) {
    scores.Transactional += 4;
  }

  /*
   * Warning/debunking language gets a strong priority because
   * the content may be discussing risky material rather than promoting it.
   */
  if (scores.Warning > 0) {
    scores.Warning += 4;
  }

  if (scores.Debunking > 0) {
    scores.Debunking += 4;
  }

  /*
   * Educational framing receives a moderate boost.
   */
  if (scores.Educational > 0) {
    scores.Educational += 2;
  }

  let bestContext: ContextType = "Neutral";
  let bestScore = 0;

  for (const context of priority) {
    if (scores[context] > bestScore) {
      bestContext = context;
      bestScore = scores[context];
    }
  }

  return {
    primary: bestContext,
    signals: matchedSignals[bestContext],
  };
}

/* =========================================================
   Intent detection
   ========================================================= */

function detectTransactionalIntent(text: string): boolean {
  const transactionalSignals = [
    "how to buy",
    "how do i buy",
    "where to buy",
    "how to sell",
    "how do i sell",
    "where to sell",
    "how to purchase",
    "how do i purchase",
    "where to purchase",
    "buy now",
    "purchase now",
    "order now",
    "for sale",
    "sell this",
    "checkout",
    "purchase",
  ];

  return transactionalSignals.some(
    (signal) => findMatches(text, signal).length > 0
  );
}

function detectIntent(
  text: string,
  context: ContextType
): {
  primary: IntentType;
  signals: string[];
} {
  const scores: Record<IntentType, number> = {
    Inform: 0,
    Warn: 0,
    Educate: 0,
    Debunk: 0,
    Report: 0,
    Criticize: 0,
    "Share Experience": 0,
    Promote: 0,
    Persuade: 0,
    Sell: 0,
    Instruct: 0,
    Entertain: 0,
    Quote: 0,
    Unknown: 0,
  };

  const matchedSignals: Record<IntentType, string[]> = {
    Inform: [],
    Warn: [],
    Educate: [],
    Debunk: [],
    Report: [],
    Criticize: [],
    "Share Experience": [],
    Promote: [],
    Persuade: [],
    Sell: [],
    Instruct: [],
    Entertain: [],
    Quote: [],
    Unknown: [],
  };

  for (const intent of Object.keys(intentSignals) as IntentType[]) {
    for (const signal of intentSignals[intent]) {
      if (findMatches(text, signal).length > 0) {
        scores[intent] += 1;
        matchedSignals[intent].push(signal);
      }
    }
  }

  /*
   * Explicit instructional patterns must beat generic selling.
   * Example:
   * "how to buy illegal drugs"
   * should be Instruct, not Sell.
   */
  const explicitInstruction =
    findMatches(text, "how to").length > 0 ||
    findMatches(text, "how do i").length > 0 ||
    findMatches(text, "step by step").length > 0 ||
    findMatches(text, "step-by-step").length > 0 ||
    findMatches(text, "tutorial").length > 0 ||
    findMatches(text, "instructions").length > 0 ||
    findMatches(text, "follow these steps").length > 0;

  if (explicitInstruction) {
    scores.Instruct += 5;
  }

  if (detectTransactionalIntent(text)) {
    scores.Sell += 4;
  }

  /*
   * Context strongly influences intent.
   */
  if (context === "Warning") {
    scores.Warn += 5;
  }

  if (context === "Debunking") {
    scores.Debunk += 5;
  }

  if (context === "Educational") {
    scores.Educate += 4;
  }

  if (context === "News Reporting") {
    scores.Report += 5;
  }

  if (context === "Criticism") {
    scores.Criticize += 4;
  }

  if (context === "Instructional") {
    scores.Instruct += 4;
  }

  if (context === "Promotional") {
    scores.Promote += 3;
  }

  if (context === "Transactional") {
    scores.Sell += 5;
  }

  if (context === "Persuasive") {
    scores.Persuade += 3;
  }

  if (context === "Personal Experience") {
    scores["Share Experience"] += 4;
  }

  if (context === "Quoting") {
    scores.Quote += 4;
  }

  if (context === "Satirical" || context === "Fictional") {
    scores.Entertain += 4;
  }

  const priority: IntentType[] = [
    "Warn",
    "Debunk",
    "Instruct",
    "Report",
    "Educate",
    "Criticize",
    "Share Experience",
    "Sell",
    "Promote",
    "Persuade",
    "Quote",
    "Entertain",
    "Inform",
  ];

  let bestIntent: IntentType = "Unknown";
  let bestScore = 0;

  for (const intent of priority) {
    if (scores[intent] > bestScore) {
      bestIntent = intent;
      bestScore = scores[intent];
    }
  }

  return {
    primary: bestIntent,
    signals: matchedSignals[bestIntent],
  };
}

/* =========================================================
   Claim detection
   ========================================================= */

function detectClaims(text: string): {
  types: ClaimType[];
  signals: string[];
} {
  const orderedTypes: ClaimType[] = [
    "Financial",
    "Health",
    "Income",
    "Performance",
    "Product",
    "Scientific",
    "Legal",
    "Safety",
    "General",
  ];

  const types: ClaimType[] = [];
  const signals: string[] = [];

  for (const type of orderedTypes) {
    const matched = getMatchedSignals(
      text,
      claimSignals[type]
    );

    if (matched.length > 0) {
      types.push(type);
      signals.push(...matched);
    }
  }

  /*
   * A product/performance relationship:
   * "This supplement works for everyone."
   *
   * Product + Performance is intentionally recognized as two
   * separate claim types.
   */

  return {
    types: types.length > 0 ? types : ["None"],
    signals: [...new Set(signals)],
  };
}

/* =========================================================
   Local context analysis
   ========================================================= */

function getSentenceAtPosition(
  text: string,
  position: number
): string {
  const left = text.slice(0, position);
  const right = text.slice(position);

  const leftBoundary = Math.max(
    left.lastIndexOf("."),
    left.lastIndexOf("!"),
    left.lastIndexOf("?"),
    left.lastIndexOf("\n")
  );

  const rightCandidates = [
    right.indexOf("."),
    right.indexOf("!"),
    right.indexOf("?"),
    right.indexOf("\n"),
  ].filter((value) => value >= 0);

  const rightBoundary =
    rightCandidates.length > 0
      ? Math.min(...rightCandidates)
      : right.length;

  return text
    .slice(
      leftBoundary >= 0 ? leftBoundary + 1 : 0,
      position + rightBoundary
    )
    .trim();
}

function getContextWindow(
  text: string,
  start: number,
  end: number,
  radius = 100
): string {
  const windowStart = Math.max(0, start - radius);
  const windowEnd = Math.min(text.length, end + radius);

  return text.slice(windowStart, windowEnd);
}

function hasNegativeSignal(text: string): boolean {
  const normalized = normalizeText(text);

  const negativeSignals = [
    "don't",
    "dont",
    "do not",
    "doesn't",
    "doesnt",
    "cannot",
    "can't",
    "cant",
    "never",
    "avoid",
    "beware",
    "warning",
    "warn",
    "scam",
    "scams",
    "scammer",
    "scammers",
    "fraud",
    "fraudulent",
    "misleading",
    "mislead",
    "false",
    "not true",
    "unsupported",
    "debunk",
    "debunking",
    "myth",
    "myths",
    "fake claim",
    "false claim",
    "false claims",
    "criticize",
    "criticise",
    "criticism",
    "criticizing",
    "criticising",
    "i disagree",
    "we disagree",
    "no evidence",
    "does not support",
    "not supported",
    "not proven",
    "unproven",
    "disproven",
  ];

  return negativeSignals.some((signal) =>
    normalized.includes(signal)
  );
}

function isNearNegativeContext(
  text: string,
  match: Match
): boolean {
  const sentence = getSentenceAtPosition(
    text,
    match.start
  );

  if (hasNegativeSignal(sentence)) {
    return true;
  }

  const window = getContextWindow(
    text,
    match.start,
    match.end,
    90
  );

  return hasNegativeSignal(window);
}

function shouldReduceRiskForContext(
  context: ContextType,
  intent: IntentType,
  text: string,
  match: Match
): boolean {
  const contextualContexts: ContextType[] = [
    "Warning",
    "Debunking",
    "News Reporting",
    "Criticism",
    "Educational",
    "Commentary",
    "Quoting",
  ];

  const contextualIntents: IntentType[] = [
    "Warn",
    "Debunk",
    "Report",
    "Criticize",
    "Educate",
    "Quote",
  ];

  if (
    contextualContexts.includes(context) ||
    contextualIntents.includes(intent)
  ) {
    return true;
  }

  return isNearNegativeContext(text, match);
}

/* =========================================================
   High-risk preservation
   ========================================================= */

function shouldPreserveHighRisk(
  categoryName: string,
  context: ContextType,
  intent: IntentType,
  text: string
): boolean {
  const highRiskCategories = [
    "Scam & Fraud",
    "Drugs",
    "Violence",
    "Adult Content",
    "Hate & Harassment",
  ];

  if (!highRiskCategories.includes(categoryName)) {
    return false;
  }

  /*
   * Warning / debunking / reporting should not automatically
   * turn high-risk material into active risk.
   */

  const contextualContexts: ContextType[] = [
    "Warning",
    "Debunking",
    "News Reporting",
    "Criticism",
  ];

  const contextualIntents: IntentType[] = [
    "Warn",
    "Debunk",
    "Report",
    "Criticize",
  ];

  if (
    contextualContexts.includes(context) ||
    contextualIntents.includes(intent)
  ) {
    return false;
  }

  /*
   * Promotion / persuasion / transaction should remain active.
   */

  if (
    context === "Transactional" ||
    context === "Promotional" ||
    context === "Persuasive" ||
    intent === "Sell" ||
    intent === "Promote" ||
    intent === "Persuade"
  ) {
    return true;
  }

  /*
   * Instructional drug facilitation remains active because
   * a tutorial can facilitate harmful activity even when
   * the wording sounds educational.
   */

  if (
    categoryName === "Drugs" &&
    intent === "Instruct"
  ) {
    if (detectTransactionalIntent(text)) {
      return true;
    }

    if (
      findMatches(text, "buy drugs").length > 0 ||
      findMatches(text, "sell drugs").length > 0 ||
      findMatches(text, "purchase drugs").length > 0 ||
      findMatches(text, "illegal drugs").length > 0 ||
      findMatches(text, "illicit drugs").length > 0
    ) {
      return true;
    }
  }

  return false;
}

/* =========================================================
   Risk scoring helpers
   ========================================================= */

function categoryBaseScore(
  category: RiskCategory | PatternCategory,
  matchCount: number
): number {
  if (matchCount <= 0) return 0;

  if (category.level === "High") {
    return Math.min(
      40,
      30 + Math.max(0, matchCount - 1) * 5
    );
  }

  return Math.min(
    20,
    15 + Math.max(0, matchCount - 1) * 3
  );
}

function getContextMultiplier(
  context: ContextType,
  intent: IntentType
): number {
  const reducingContexts: ContextType[] = [
    "Warning",
    "Debunking",
    "News Reporting",
    "Criticism",
    "Educational",
    "Commentary",
    "Quoting",
  ];

  const reducingIntents: IntentType[] = [
    "Warn",
    "Debunk",
    "Report",
    "Criticize",
    "Educate",
    "Quote",
  ];

  if (
    reducingContexts.includes(context) ||
    reducingIntents.includes(intent)
  ) {
    return 0.45;
  }

  return 1;
}

function calculateCategoryRisk(
  category: RiskCategory | PatternCategory,
  matches: Match[],
  text: string,
  context: ContextType,
  intent: IntentType
): number {
  if (matches.length === 0) return 0;

  /*
   * Explicit drug facilitation must be preserved even when
   * the broader document is classified as Warning, Education,
   * Reporting, or another contextual category.
   *
   * This prevents a long mixed-context document from hiding
   * explicit instructions for obtaining or selling illegal drugs.
   */

  const explicitDrugFacilitation =
    category.name === "Drugs" &&
    (
      findMatches(text, "how to buy illegal drugs").length > 0 ||
      findMatches(text, "where to purchase drugs").length > 0 ||
      findMatches(text, "how to sell drugs").length > 0 ||
      findMatches(text, "buy illegal drugs").length > 0 ||
      findMatches(text, "purchase illegal drugs").length > 0 ||
      findMatches(text, "sell illegal drugs").length > 0
    );

  const activeMatches = matches.filter((match) => {
    /*
     * Explicit drug facilitation is a hard preservation signal.
     *
     * Do not let broad document-level context such as Warning
     * suppress the specific high-risk facilitation signal.
     */
    if (explicitDrugFacilitation) {
      return true;
    }

    if (
      shouldPreserveHighRisk(
        category.name,
        context,
        intent,
        text
      )
    ) {
      return true;
    }

    return !shouldReduceRiskForContext(
      context,
      intent,
      text,
      match
    );
  });

  if (activeMatches.length === 0) {
    return 0;
  }

  let score = categoryBaseScore(
    category,
    activeMatches.length
  );

  /*
   * Contextual reduction.
   */

  const multiplier = getContextMultiplier(
    context,
    intent
  );

  if (
    !shouldPreserveHighRisk(
      category.name,
      context,
      intent,
      text
    ) &&
    !explicitDrugFacilitation
  ) {
    score *= multiplier;
  }

  /*
   * Extreme certainty + performance/health/product relationship.
   *
   * "This supplement works for everyone."
   *
   * We want a modest risk signal rather than treating this
   * as outright deception.
   */

  if (
    category.name === "Extreme Certainty" &&
    findMatches(text, "works for everyone").length > 0
  ) {
    const hasPerformance =
      findMatches(text, "works").length > 0 ||
      findMatches(text, "effective").length > 0 ||
      findMatches(text, "results").length > 0;

    const hasHealth =
      findMatches(text, "supplement").length > 0 ||
      findMatches(text, "cure").length > 0 ||
      findMatches(text, "treat").length > 0 ||
      findMatches(text, "disease").length > 0;

    const hasProduct =
      findMatches(text, "product").length > 0 ||
      findMatches(text, "supplement").length > 0 ||
      findMatches(text, "course").length > 0 ||
      findMatches(text, "service").length > 0 ||
      findMatches(text, "tool").length > 0;

    if (hasPerformance && (hasHealth || hasProduct)) {
      score += 3;
    }
  }

  /*
   * Financial certainty.
   */

  if (
    category.name === "Extreme Certainty" &&
    (
      findMatches(
        text,
        "guaranteed investment returns"
      ).length > 0 ||
      findMatches(text, "guaranteed returns").length > 0 ||
      findMatches(text, "guaranteed profit").length > 0 ||
      findMatches(text, "guaranteed income").length > 0
    )
  ) {
    score += 5;
  }

  /*
   * Drug instructional facilitation.
   *
   * Explicit facilitation such as:
   * "how to buy illegal drugs"
   * is treated as a stable high-risk signal.
   *
   * We use a fixed score rather than stacking multiple boosts,
   * because the same behavior may match both instructional
   * and transactional signals.
   */

  if (category.name === "Drugs") {
    const explicitDrugInstruction =
      findMatches(text, "how to buy illegal drugs").length > 0 ||
      findMatches(text, "where to purchase drugs").length > 0 ||
      findMatches(text, "how to sell drugs").length > 0;

    const explicitDrugTransaction =
      findMatches(text, "buy illegal drugs").length > 0 ||
      findMatches(text, "purchase illegal drugs").length > 0 ||
      findMatches(text, "sell illegal drugs").length > 0 ||
      findMatches(text, "buy drugs").length > 0 ||
      findMatches(text, "sell drugs").length > 0 ||
      findMatches(text, "purchase drugs").length > 0;

    if (
      intent === "Instruct" &&
      (
        explicitDrugInstruction ||
        explicitDrugTransaction
      )
    ) {
      score = 70;
    } else if (
      detectTransactionalIntent(text) &&
      (
        explicitDrugInstruction ||
        explicitDrugTransaction
      )
    ) {
      score = 70;
    } else if (
      explicitDrugFacilitation
    ) {
      /*
       * Preserve explicit facilitation even when the overall
       * document intent is Warning, Reporting, or Educational.
       *
       * This is especially important for mixed long-form content.
       */
      score = Math.max(score, 70);
    }
  }

  return Math.round(Math.min(100, score));
}

/* =========================================================
   Risk dimensions
   ========================================================= */

function calculateRiskDimensions(
  riskMatches: {
    category: RiskCategory | PatternCategory;
    matches: Match[];
  }[],
  text: string,
  context: ContextType,
  intent: IntentType
): {
  dimension: RiskDimension;
  score: number;
}[] {
  const dimensionScores: Partial<
    Record<RiskDimension, number>
  > = {};

  for (const item of riskMatches) {
    const dimension =
      dimensionMap[item.category.name];

    if (!dimension) continue;

    const categoryScore = calculateCategoryRisk(
      item.category,
      item.matches,
      text,
      context,
      intent
    );

    if (categoryScore <= 0) continue;

    const existing = dimensionScores[dimension] ?? 0;

    const base =
      item.category.level === "High"
        ? 45
        : 25;

    const extra =
      Math.max(0, item.matches.length - 1) * 7;

    dimensionScores[dimension] = Math.max(
      existing,
      Math.min(100, base + extra)
    );
  }

  /*
   * Special drug facilitation boost.
   */

  if (
    dimensionScores.Drugs !== undefined &&
    intent === "Instruct" &&
    (
      findMatches(text, "illegal drugs").length > 0 ||
      findMatches(text, "illicit drugs").length > 0 ||
      findMatches(text, "buy drugs").length > 0 ||
      findMatches(text, "sell drugs").length > 0
    )
  ) {
    dimensionScores.Drugs = Math.min(
      100,
      Math.max(dimensionScores.Drugs, 70)
    );
  }

  return Object.entries(dimensionScores)
    .map(([dimension, score]) => ({
      dimension: dimension as RiskDimension,
      score: score ?? 0,
    }))
    .sort((a, b) => b.score - a.score);
}

/* =========================================================
   Contextual review
   ========================================================= */

function collectContextualRiskMatches(
  text: string,
  riskMatches: {
    category: RiskCategory | PatternCategory;
    matches: Match[];
  }[],
  context: ContextType,
  intent: IntentType
): Match[] {
  const contextual: Match[] = [];

  for (const item of riskMatches) {
    for (const match of item.matches) {
      const reduced =
        shouldReduceRiskForContext(
          context,
          intent,
          text,
          match
        );

      if (
        reduced &&
        !shouldPreserveHighRisk(
          item.category.name,
          context,
          intent,
          text
        )
      ) {
        contextual.push(match);
      }
    }
  }

  return mergeMatches(contextual);
}

/* =========================================================
   Main analysis
   ========================================================= */

export function analyzeContent(
  text: string
): AnalysisResult {
  const cleanText = text ?? "";

  if (!cleanText.trim()) {
    return {
      score: 0,
      risk: "Low",
      riskMatches: [],
      optimizationMatches: [],
      contextualRiskMatches: [],
      context: {
        primary: "Neutral",
        signals: [],
      },
      intent: {
        primary: "Unknown",
        signals: [],
      },
      claims: {
        types: ["None"],
        signals: [],
      },
      riskDimensions: [],
      analysisVersion: "2.3",
    };
  }

  const contextResult = detectContext(cleanText);

  const intentResult = detectIntent(
    cleanText,
    contextResult.primary
  );

  const claimsResult = detectClaims(cleanText);

  const riskMatches: {
    category: RiskCategory | PatternCategory;
    matches: Match[];
  }[] = [];

  const optimizationMatches: {
    category: PatternCategory;
    matches: Match[];
  }[] = [];

  /*
   * Risk categories.
   */

  for (const category of riskCategories) {
    const matches = getCategoryMatches(
      cleanText,
      category
    );

    if (matches.length > 0) {
      riskMatches.push({
        category,
        matches,
      });
    }
  }

  /*
   * Optimization patterns.
   *
   * Important:
   * optimizationOnly patterns are still shown as optimization
   * signals rather than automatically becoming policy risk.
   */

  for (const category of patternCategories) {
    const matches = getCategoryMatches(
      cleanText,
      category
    );

    if (matches.length === 0) continue;

    if (category.optimizationOnly) {
      optimizationMatches.push({
        category,
        matches,
      });
    } else {
      riskMatches.push({
        category,
        matches,
      });
    }
  }

  /*
   * Determine active category scores.
   */

  const categoryScores = riskMatches.map((item) => ({
    ...item,
    score: calculateCategoryRisk(
      item.category,
      item.matches,
      cleanText,
      contextResult.primary,
      intentResult.primary
    ),
  }));

  /*
   * Contextually reduced matches are kept separately so the UI
   * can explain that the phrase was detected but not included
   * in the score.
   */

  const contextualRiskMatches =
    collectContextualRiskMatches(
      cleanText,
      riskMatches,
      contextResult.primary,
      intentResult.primary
    );

  /*
   * Overall score:
   *
   * We don't simply add every category together because that
   * would make multiple related signals inflate the score.
   *
   * Instead:
   * - strongest active category has the largest weight
   * - secondary categories add smaller amounts
   */

  const activeScores = categoryScores
    .map((item) => item.score)
    .filter((score) => score > 0)
    .sort((a, b) => b - a);

  let score = 0;

  if (activeScores.length > 0) {
    score = activeScores[0];

    for (let i = 1; i < activeScores.length; i++) {
      const secondaryWeight =
        i === 1
          ? 0.35
          : i === 2
            ? 0.2
            : 0.1;

      score += activeScores[i] * secondaryWeight;
    }
  }

  /*
   * Performance certainty adjustment.
   *
   * Example:
   * "This supplement works for everyone."
   *
   * Extreme certainty is meaningful, but it should remain a
   * moderate signal rather than jumping to High Risk.
   */

  const extremeCertainty =
    categoryScores.find(
      (item) =>
        item.category.name === "Extreme Certainty"
    );

  const performanceClaim =
    claimsResult.types.includes("Performance");

  const healthClaim =
    claimsResult.types.includes("Health");

  const productClaim =
    claimsResult.types.includes("Product");

  if (
    extremeCertainty &&
    extremeCertainty.score > 0 &&
    performanceClaim &&
    (healthClaim || productClaim)
  ) {
    score += 3;
  }

  /*
   * Quick wealth claims should receive a stronger overall signal.
   */

  const quickWealth =
    categoryScores.find(
      (item) =>
        item.category.name ===
        "Quick Wealth / Easy Money"
    );

  if (
    quickWealth &&
    quickWealth.score > 0
  ) {
    score += 8;
  }

  /*
   * Drug instructional facilitation remains significant.
   */

  const drugCategory =
    categoryScores.find(
      (item) => item.category.name === "Drugs"
    );

  const explicitDrugFacilitation =
    findMatches(
      cleanText,
      "how to buy illegal drugs"
    ).length > 0 ||
    findMatches(
      cleanText,
      "where to purchase drugs"
    ).length > 0 ||
    findMatches(
      cleanText,
      "how to sell drugs"
    ).length > 0 ||
    findMatches(
      cleanText,
      "buy illegal drugs"
    ).length > 0 ||
    findMatches(
      cleanText,
      "purchase illegal drugs"
    ).length > 0 ||
    findMatches(
      cleanText,
      "sell illegal drugs"
    ).length > 0;

  if (
    drugCategory &&
    drugCategory.score > 0 &&
    (
      intentResult.primary === "Instruct" ||
      explicitDrugFacilitation
    )
  ) {
    score = Math.max(
      score,
      drugCategory.score
    );
  }

  score = Math.round(
    Math.min(100, score)
  );

  let risk: RiskLevel = "Low";

  if (score >= 60) {
    risk = "High";
  } else if (score >= 20) {
    risk = "Medium";
  }

  /*
   * Contextual educational/warning/debunking content can reach
   * zero after contextual reduction.
   */

  if (
    contextualRiskMatches.length > 0 &&
    activeScores.length === 0
  ) {
    score = 0;
    risk = "Low";
  }

  /*
   * Build dimensions from the actual active categories.
   */

  const riskDimensions =
    calculateRiskDimensions(
      riskMatches,
      cleanText,
      contextResult.primary,
      intentResult.primary
    );

  /*
   * Remove duplicate signals from UI output.
   */

  contextResult.signals = [
    ...new Set(contextResult.signals),
  ];

  intentResult.signals = [
    ...new Set(intentResult.signals),
  ];

  return {
    score,
    risk,

    riskMatches: categoryScores
      .filter((item) => item.score > 0)
      .map((item) => ({
        category: item.category,
        matches: item.matches,
      })),

    optimizationMatches,

    contextualRiskMatches,

    context: {
      primary: contextResult.primary,
      signals: contextResult.signals,
    },

    intent: {
      primary: intentResult.primary,
      signals: intentResult.signals,
    },

    claims: {
      types: claimsResult.types,
      signals: [
        ...new Set(claimsResult.signals),
      ],
    },

    riskDimensions,

    analysisVersion: "2.3",
  };
}

/*
 * Backward-compatible aliases.
 *
 * If an older page imports analyzeText instead of analyzeContent,
 * both will continue to work.
 */

export const analyzeText = analyzeContent;
export const analyze = analyzeContent;