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
    reason: string;
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
    name: "Harassment",
    level: "Medium",
    keywords: [
      "idiot",
      "stupid",
      "moron",
      "loser",
      "pathetic",
      "worthless",
      "shut up",
      "nobody likes you",
      "you're an idiot",
      "you are an idiot",
      "you're stupid",
      "you are stupid",
      "you're pathetic",
      "you are pathetic",
    ],
    explanation:
      "Targeted insults or degrading language directed at another person can create harassment and safety concerns.",
    direction:
      "Avoid targeted insults, degrading language, or abusive attacks toward individuals.",
  },

  {
name: "Threat",
level: "High",
keywords: [
"i will hurt you",
"i'll hurt you",
"i will fucking hurt you",
"i'll fucking hurt you",

"i will kill you",
"i'll kill you",
"i will fucking kill you",
"i'll fucking kill you",

"i am going to hurt you",
"i'm going to hurt you",
"i am fucking going to hurt you",
"i'm fucking going to hurt you",

"i am going to kill you",
"i'm going to kill you",
"i am fucking going to kill you",
"i'm fucking going to kill you",

"you will die",
"you are going to die",

"i will attack you",
"i'll attack you",
"i will fucking attack you",
"i'll fucking attack you",
],
explanation:
"Direct threats of physical harm or violence can create serious safety concerns.",
direction:
"Avoid threatening individuals with physical harm, violence, or death.",
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
    "tutorial",
    "guide",
    "instructions",
    "step by step",
    "step-by-step",
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
   * Implicit personal-experience signals.
   *
   * Some first-person experiences do not explicitly use phrases
   * such as "I tried" or "in my experience".
   *
   * Expressions such as "it helped me feel better" can still
   * indicate that the author is describing a personal outcome.
   */
  const implicitPersonalExperienceSignals = [
    "helped me",
    "helped me feel",
    "worked for me",
    "worked well for me",
    "made me feel",
    "made me feel better",
    "i felt better",
    "i felt worse",
    "i feel better",
    "i feel worse",
    "my symptoms improved",
    "my symptoms got better",
    "my symptoms got worse",
    "personally helped",
    "personally worked",
  ];

  let implicitPersonalExperienceCount = 0;

  for (const signal of implicitPersonalExperienceSignals) {
    if (findMatches(text, signal).length > 0) {
      implicitPersonalExperienceCount += 1;

      if (
        !matchedSignals["Personal Experience"].includes(signal)
      ) {
        matchedSignals["Personal Experience"].push(signal);
      }
    }
  }

  if (implicitPersonalExperienceCount > 0) {
    scores["Personal Experience"] +=
      4 + implicitPersonalExperienceCount;
  }

  /*
   * Explicit instructional phrases are strong signals.
   *
   * A clear tutorial / step-by-step / instruction format
   * should take precedence over generic educational wording
   * such as "explains" or "explains how".
   */
  const explicitInstructionalSignals = [
    "tutorial",
    "step by step",
    "step-by-step",
    "instructions",
  ];

  const explicitHowToSignals = [
    "how to",
    "how do i",
    "here's how",
    "heres how",
    "here is how",
    "steps to",
  ];

  for (const signal of explicitInstructionalSignals) {
    if (findMatches(text, signal).length > 0) {
      if (!matchedSignals.Instructional.includes(signal)) {
        matchedSignals.Instructional.push(signal);
      }
    }
  }

  for (const signal of explicitHowToSignals) {
    if (findMatches(text, signal).length > 0) {
      if (!matchedSignals.Instructional.includes(signal)) {
        matchedSignals.Instructional.push(signal);
      }
    }
  }

  const hasExplicitInstructional =
    explicitInstructionalSignals.some(
      (signal) => findMatches(text, signal).length > 0
    );

  const hasExplicitHowTo =
    explicitHowToSignals.some(
      (signal) => findMatches(text, signal).length > 0
    );

  if (hasExplicitInstructional) {
    scores.Instructional += 5;
  } else if (hasExplicitHowTo) {
    scores.Instructional += 3;
  }

  /*
   * Transactional language.
   *
   * Strong direct calls to action remain the strongest signals.
   * Natural purchase expressions such as "buy this program" are
   * also recognized, but negative / cautionary wording should not
   * automatically become transactional.
   */
  const transactionalSignals = [
    "buy now",
    "purchase now",
    "order now",
    "shop now",
    "get yours",
    "get started now",
    "sign up now",
    "subscribe now",
    "book now",
    "checkout",
    "check out now",
    "for sale",
    "limited offer",
    "special offer",
  ];

  let transactionalSignalCount = 0;

  for (const signal of transactionalSignals) {
    if (findMatches(text, signal).length > 0) {
      transactionalSignalCount += 1;

      if (!matchedSignals.Transactional.includes(signal)) {
        matchedSignals.Transactional.push(signal);
      }
    }
  }

  /*
   * Natural purchase expressions.
   *
   * These cover sentences such as:
   * "Buy this investment program today."
   *
   * They are treated as transactional only when the surrounding
   * sentence does not clearly negate or discourage the action.
   */
  const naturalTransactionalSignals = [
  "buy this",
  "buy the",
  "buy our",
  "buy my",
  "purchase this",
  "purchase the",
  "purchase our",
  "purchase my",
  "order this",
  "order the",
  "order our",
  "order my",
];

  let naturalTransactionalCount = 0;

  for (const signal of naturalTransactionalSignals) {
    const matches = findMatches(text, signal);

    for (const match of matches) {
      const sentence = getSentenceAtPosition(
        text,
        match.start
      );

      const negativeAction = /\b(don't|dont|do not|never|avoid|shouldn't|shouldnt|cannot|can't|cant)\b/i.test(sentence);
      if (negativeAction) {
        continue;
      }

      naturalTransactionalCount += 1;

      if (!matchedSignals.Transactional.includes(signal)) {
        matchedSignals.Transactional.push(signal);
      }
    }
  }

  if (transactionalSignalCount > 0) {
    scores.Transactional +=
      4 + transactionalSignalCount;
  }

  if (naturalTransactionalCount > 0) {
    scores.Transactional +=
      4 + naturalTransactionalCount;
  }

  /*
   * Promotional language.
   *
   * These phrases indicate an attempt to promote an offer,
   * opportunity, product, service, or financial action.
   */
  const promotionalSignals = [
    "invest now",
    "join now",
    "act now",
    "don't miss",
    "dont miss",
    "limited time",
    "limited opportunity",
    "special opportunity",
    "exclusive offer",
    "exclusive opportunity",
    "get yours",
    "try it today",
    "start today",
    "start now",
    "sign up today",
    "subscribe today",
  ];

  let promotionalSignalCount = 0;

  for (const signal of promotionalSignals) {
    if (findMatches(text, signal).length > 0) {
      promotionalSignalCount += 1;

      if (!matchedSignals.Promotional.includes(signal)) {
        matchedSignals.Promotional.push(signal);
      }
    }
  }

  if (promotionalSignalCount > 0) {
    scores.Promotional += 4 + promotionalSignalCount;
  }

  /*
   * Persuasive language.
   *
   * These phrases attempt to convince the reader to take an action,
   * but are not necessarily direct transactions.
   */
  const persuasiveSignals = [
    "you should buy",
    "you should invest",
    "you need this",
    "you need to buy",
    "you need to invest",
    "don't wait",
    "dont wait",
    "you won't regret",
    "you wont regret",
    "this is your chance",
    "don't miss out",
    "dont miss out",
    "take advantage",
    "now is the time",
    "best opportunity",
  ];

  let persuasiveSignalCount = 0;

  for (const signal of persuasiveSignals) {
    if (findMatches(text, signal).length > 0) {
      persuasiveSignalCount += 1;

      if (!matchedSignals.Persuasive.includes(signal)) {
        matchedSignals.Persuasive.push(signal);
      }
    }
  }

  if (persuasiveSignalCount > 0) {
    scores.Persuasive += 4 + persuasiveSignalCount;
  }

  /*
   * Strong financial action patterns.
   *
   * "Invest now" is promotional even when no other promotional
   * keyword is present.
   */
  if (findMatches(text, "invest now").length > 0) {
    scores.Promotional += 3;
  }

  /*
   * Guaranteed financial outcomes are normally persuasive,
   * but they should not automatically override clear reporting
   * context.
   */
  const guaranteedOutcomeSignals = [
    "guaranteed to double",
    "guaranteed return",
    "guaranteed returns",
  ];

  const hasGuaranteedOutcome =
    guaranteedOutcomeSignals.some(
      (signal) => findMatches(text, signal).length > 0
    );

  if (hasGuaranteedOutcome) {
    scores.Persuasive += 2;

    if (!matchedSignals.Persuasive.includes("guaranteed outcome")) {
      matchedSignals.Persuasive.push("guaranteed outcome");
    }
  }

  /*
   * Explicit news-reporting framing.
   *
   * These phrases indicate that the author is reporting,
   * attributing, or describing a claim made by another source.
   */
  const explicitNewsSignals = [
    "the company claims",
    "the company claimed",
    "the company says",
    "the company said",
    "the company stated",
    "according to",
    "reports say",
    "reports suggest",
    "the report says",
    "the report states",
    "the report found",
    "officials said",
    "officials stated",
    "investigators found",
    "investigators said",
    "analysts said",
    "analysts expect",
    "experts said",
    "experts warned",
    "was reported",
    "were reported",
    "reportedly",
    "news reports",
    "news report",
  ];

  let explicitNewsSignalCount = 0;

  for (const signal of explicitNewsSignals) {
    if (findMatches(text, signal).length > 0) {
      explicitNewsSignalCount += 1;

      if (!matchedSignals["News Reporting"].includes(signal)) {
        matchedSignals["News Reporting"].push(signal);
      }
    }
  }

  if (explicitNewsSignalCount > 0) {
    scores["News Reporting"] +=
      5 + explicitNewsSignalCount;
  }

/*

Explicit fictional / entertainment framing.


These signals indicate that potentially risky language is being
described as part of a movie, film, scene, character, or fictional
story rather than presented as a real-world action.
*/
const explicitFictionalSignals = [
"movie",
"film",
"scene",
"character",
"fictional character",
"fictional story",
"in this movie",
"in this film",
"in the movie",
"in the film",
"this scene",
"this character",
];

let explicitFictionalSignalCount = 0;

for (const signal of explicitFictionalSignals) {
if (findMatches(text, signal).length > 0) {
explicitFictionalSignalCount += 1;

if (!matchedSignals.Fictional.includes(signal)) {
  matchedSignals.Fictional.push(signal);
}

}
}

if (explicitFictionalSignalCount > 0) {
scores.Fictional +=
5 + explicitFictionalSignalCount;
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

  /*
   * When explicit instructional language exists, it should remain
   * stronger than generic promotional language.
   */
  if (hasExplicitInstructional) {
    scores.Instructional += 2;
  }

  /*
   * A normal explanatory "how to buy..." sentence should not become
   * promotional merely because it contains the word "buy".
   *
   * Explicit instructional framing therefore suppresses weak
   * promotional / transactional interpretations.
   */
  if (hasExplicitHowTo || hasExplicitInstructional) {
    scores.Promotional = Math.max(
      0,
      scores.Promotional - 2
    );

    scores.Persuasive = Math.max(
      0,
      scores.Persuasive - 2
    );

    /*
     * Transactional phrases such as "buy now" are still strong enough
     * to remain transactional, because they contain a direct call to action.
     */
    if (transactionalSignalCount === 0) {
      scores.Transactional = Math.max(
        0,
        scores.Transactional - 2
      );
    }
  }

  /*
   * Warning / debunking / reporting contexts should take precedence
   * over promotional interpretations when the content clearly warns,
   * debunks, or reports the behavior.
   */
  if (
    scores.Warning > 0 ||
    scores.Debunking > 0 ||
    scores["News Reporting"] > 0
  ) {
    scores.Promotional = Math.max(
      0,
      scores.Promotional - 3
    );

    scores.Persuasive = Math.max(
      0,
      scores.Persuasive - 3
    );

    if (transactionalSignalCount === 0) {
      scores.Transactional = Math.max(
        0,
        scores.Transactional - 2
      );
    }
  }

  /*
   * Clear news-reporting attribution should not be classified
   * as persuasive merely because the reported statement contains
   * a guaranteed financial outcome.
   */
  if (
    scores["News Reporting"] > 0 &&
    explicitNewsSignalCount > 0
  ) {
    scores.Persuasive = Math.max(
      0,
      scores.Persuasive - 3
    );

    /*
     * Remove the generic guaranteed-outcome signal from the
     * persuasive display when it is clearly being reported.
     */
    if (hasGuaranteedOutcome) {
      matchedSignals.Persuasive =
        matchedSignals.Persuasive.filter(
          (signal) => signal !== "guaranteed outcome"
        );
    }
  }

  /*
   * Recalculate the best context after all contextual adjustments.
   */
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
   *
   * Example:
   * "how to buy illegal drugs"
   * should remain Instruct, not Sell.
   */
  const explicitInstructionSignals = [
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
  ];

  let instructionSignalCount = 0;

  for (const signal of explicitInstructionSignals) {
    if (findMatches(text, signal).length > 0) {
      instructionSignalCount += 1;

      if (!matchedSignals.Instruct.includes(signal)) {
        matchedSignals.Instruct.push(signal);
      }
    }
  }

  if (instructionSignalCount > 0) {
    scores.Instruct += 5;
  }

  /*
 * Transactional intent.
 *
 * Strong action-oriented phrases should produce Sell intent.
 * Natural purchase expressions such as "buy this" are also
 * recognized, but negative instructions such as "don't buy this"
 * must not be treated as transactional.
 */
const transactionalIntentSignals = [
  "buy now",
  "purchase now",
  "order now",
  "shop now",
  "get yours",
  "checkout",
  "check out now",
  "for sale",
  "sign up now",
  "subscribe now",
  "book now",
  "limited offer",
  "special offer",
];

let transactionalIntentCount = 0;

for (const signal of transactionalIntentSignals) {
  if (findMatches(text, signal).length > 0) {
    transactionalIntentCount += 1;

    if (!matchedSignals.Sell.includes(signal)) {
      matchedSignals.Sell.push(signal);
    }
  }
}

/*
 * Natural purchase expressions.
 *
 * "buy this", "buy the", "purchase this", etc. are transactional
 * when they are used as a direct purchase action.
 *
 * Do not classify negative statements such as
 * "don't buy this" as Sell intent.
 */
const naturalTransactionalIntentSignals = [
  "buy this",
  "buy the",
  "purchase this",
  "purchase the",
  "order this",
  "order the",
];

for (const signal of naturalTransactionalIntentSignals) {
  const matches = findMatches(text, signal);

  for (const match of matches) {
    const sentence = getSentenceAtPosition(
      text,
      match.start
    );

    const negativeAction =
      /\b(don't|dont|do not|never|avoid|shouldn't|shouldnt|cannot|can't|cant)\b/i.test(
        sentence
      );

    if (negativeAction) {
      continue;
    }

    transactionalIntentCount += 1;

    if (!matchedSignals.Sell.includes(signal)) {
      matchedSignals.Sell.push(signal);
    }
  }
}

/*
 * Recommendation-based purchase intent.
 *
 * Expressions such as "recommend buying it" indicate that
 * the author is encouraging a purchase even when there is
 * no direct command such as "buy this".
 *
 * Negative recommendations remain protected.
 */
const recommendationIntentSignals = [
  "recommend buying",
  "recommend purchasing",
  "recommend ordering",
  "recommend this",
  "recommend the",
  "highly recommend buying",
  "highly recommend purchasing",
  "highly recommend ordering",
  "highly recommend this",
];

for (const signal of recommendationIntentSignals) {
  const matches = findMatches(text, signal);

  for (const match of matches) {
    const sentence = getSentenceAtPosition(
      text,
      match.start
    );

    const negativeAction =
      /\b(don't|dont|do not|never|avoid|shouldn't|shouldnt|cannot|can't|cant)\b/i.test(
        sentence
      );

    if (negativeAction) {
      continue;
    }

    transactionalIntentCount += 1;

    if (!matchedSignals.Sell.includes(signal)) {
      matchedSignals.Sell.push(signal);
    }
  }
}

if (transactionalIntentCount > 0) {
  scores.Sell += 4 + transactionalIntentCount;
}

  /*
   * Promotional intent.
   *
   * These patterns indicate an attempt to promote an offer,
   * opportunity, service, or action.
   */
  const promotionalIntentSignals = [
  "invest now",
  "join now",
  "act now",
  "don't miss",
  "dont miss",
  "limited time",
  "limited opportunity",
  "special opportunity",
  "exclusive offer",
  "exclusive opportunity",
  "get yours",
  "try it today",
  "start today",
  "start now",
  "sign up today",
  "subscribe today",

  /*
   * Soft recommendation signals.
   *
   * These indicate that the author is encouraging the reader
   * to consider or try something, even without an explicit
   * purchase action.
   */
  "highly recommend",
  "strongly recommend",
  "recommend giving it a try",
  "recommend giving this a try",
  "recommend trying it",
  "recommend trying this",
  "give it a try",
];

  let promotionalIntentCount = 0;

  for (const signal of promotionalIntentSignals) {
    if (findMatches(text, signal).length > 0) {
      promotionalIntentCount += 1;

      if (!matchedSignals.Promote.includes(signal)) {
        matchedSignals.Promote.push(signal);
      }
    }
  }

  if (promotionalIntentCount > 0) {
    scores.Promote += 4 + promotionalIntentCount;
  }

  /*
   * Persuasive intent.
   */
  const persuasiveIntentSignals = [
    "you should buy",
    "you should invest",
    "you need this",
    "you need to buy",
    "you need to invest",
    "don't wait",
    "dont wait",
    "you won't regret",
    "you wont regret",
    "this is your chance",
    "don't miss out",
    "dont miss out",
    "take advantage",
    "now is the time",
    "best opportunity",
  ];

  let persuasiveIntentCount = 0;

  for (const signal of persuasiveIntentSignals) {
    if (findMatches(text, signal).length > 0) {
      persuasiveIntentCount += 1;

      if (!matchedSignals.Persuade.includes(signal)) {
        matchedSignals.Persuade.push(signal);
      }
    }
  }

  if (persuasiveIntentCount > 0) {
    scores.Persuade += 4 + persuasiveIntentCount;
  }

  /*
   * Guaranteed financial outcomes are usually persuasive
   * when combined with an investment action.
   */
  const hasInvestmentAction =
    findMatches(text, "invest now").length > 0 ||
    findMatches(text, "you should invest").length > 0 ||
    findMatches(text, "you need to invest").length > 0;

  const hasGuaranteedFinancialOutcome =
    findMatches(text, "guaranteed to double").length > 0 ||
    findMatches(text, "guaranteed return").length > 0 ||
    findMatches(text, "guaranteed returns").length > 0 ||
    findMatches(text, "guaranteed profit").length > 0 ||
    findMatches(text, "guaranteed profits").length > 0;

  if (hasInvestmentAction && hasGuaranteedFinancialOutcome) {
    scores.Persuade += 5;

    if (
      !matchedSignals.Persuade.includes(
        "guaranteed financial outcome"
      )
    ) {
      matchedSignals.Persuade.push(
        "guaranteed financial outcome"
      );
    }
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
    scores.Promote += 5;
  }

  if (context === "Transactional") {
    scores.Sell += 5;
  }

  if (context === "Persuasive") {
    scores.Persuade += 5;
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

/*
   * Explicit illegal-drug acquisition questions.
   *
   * These questions ask how or where to obtain illegal drugs.
   * They should be classified as Instruct because the user is
   * explicitly asking for a method or source of acquisition.
   *
   * This rule is intentionally limited to illegal-drug phrases
   * so ordinary purchase questions such as "How can I buy this
   * camera?" are not incorrectly classified as Instruct.
   */
  const illegalDrugInstructionSignals = [
    "how can i buy illegal drugs",
    "how can i purchase illegal drugs",
    "how can i get illegal drugs",
    "how do i buy illegal drugs",
    "how do i purchase illegal drugs",
    "where can i buy illegal drugs",
    "where can i purchase illegal drugs",
    "where can i get illegal drugs",
    "where to buy illegal drugs",
    "where to purchase illegal drugs",
    "how to obtain illegal drugs",
    "how can i obtain illegal drugs",
  ];

  let illegalDrugInstructionCount = 0;

  for (const signal of illegalDrugInstructionSignals) {
    if (findMatches(text, signal).length > 0) {
      illegalDrugInstructionCount += 1;

      if (!matchedSignals.Instruct.includes(signal)) {
        matchedSignals.Instruct.push(signal);
      }
    }
  }

  if (illegalDrugInstructionCount > 0) {
    scores.Instruct += 8;
  }

  /*
   * Explicit instructional intent overrides generic transaction
   * signals when the content is clearly teaching something.
   *
   * "This article explains how to buy a house."
   * should be Educate/Instruct rather than Sell.
   */
  if (instructionSignalCount > 0) {
  /*
   * "How to" does not automatically mean the content is
   * instructional in intent.
   *
   * Educational articles often explain "how to..." something
   * without actually instructing the reader to perform it.
   *
   * Strong instructional formats such as tutorials,
   * step-by-step instructions, and explicit instructions
   * remain Instruct.
   */

  const strongInstructionFormat =
    findMatches(text, "tutorial").length > 0 ||
    findMatches(text, "step by step").length > 0 ||
    findMatches(text, "step-by-step").length > 0 ||
    findMatches(text, "instructions").length > 0 ||
    findMatches(text, "follow these steps").length > 0;

  if (context === "Educational" && !strongInstructionFormat) {
    scores.Educate += 5;
    scores.Instruct = Math.max(0, scores.Instruct - 2);
  } else {
    scores.Instruct += 3;
  }

  if (transactionalIntentCount === 0) {
    scores.Sell = Math.max(0, scores.Sell - 3);
  }

  scores.Promote = Math.max(0, scores.Promote - 2);
  scores.Persuade = Math.max(0, scores.Persuade - 2);
}

  /*
   * Warning / debunking / criticism should not be interpreted
   * as an attempt to sell or persuade unless there is a very
   * explicit transactional call to action.
   */
  if (
    context === "Warning" ||
    context === "Debunking" ||
    context === "Criticism"
  ) {
    scores.Promote = Math.max(0, scores.Promote - 3);
    scores.Persuade = Math.max(0, scores.Persuade - 3);

    if (transactionalIntentCount === 0) {
      scores.Sell = Math.max(0, scores.Sell - 2);
    }
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
    "Fictional",
  ];

  const contextualIntents: IntentType[] = [
    "Warn",
    "Debunk",
    "Report",
    "Criticize",
    "Educate",
    "Quote",
    "Entertain",
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
   * Explicit drug facilitation.
   *
   * A drug reference alone should not be treated as operational
   * facilitation when the surrounding content is educational,
   * reporting, warning, debunking, critical, quoted, or fictional.
   *
   * Genuine instructional or transactional requests remain
   * protected as high-risk behavior.
   */
  const explicitDrugFacilitation =
    category.name === "Drugs" &&
    (
      findMatches(text, "how to buy illegal drugs").length > 0 ||
      findMatches(text, "where to purchase drugs").length > 0 ||
      findMatches(text, "how to sell drugs").length > 0 ||
      findMatches(text, "how can i buy illegal drugs").length > 0 ||
      findMatches(text, "how can i purchase illegal drugs").length > 0 ||
      findMatches(text, "how can i get illegal drugs").length > 0 ||
      findMatches(text, "how do i buy illegal drugs").length > 0 ||
      findMatches(text, "how do i purchase illegal drugs").length > 0 ||
      findMatches(text, "where can i buy illegal drugs").length > 0 ||
      findMatches(text, "where can i purchase illegal drugs").length > 0 ||
      findMatches(text, "where can i get illegal drugs").length > 0 ||
      findMatches(text, "where to buy illegal drugs").length > 0 ||
      findMatches(text, "where to purchase illegal drugs").length > 0 ||
      findMatches(text, "how to obtain illegal drugs").length > 0 ||
      findMatches(text, "how can i obtain illegal drugs").length > 0
    ) &&
    !(
      context === "Educational" ||
      context === "Warning" ||
      context === "News Reporting" ||
      context === "Debunking" ||
      context === "Criticism" ||
      context === "Quoting" ||
      context === "Fictional" ||
      intent === "Educate" ||
      intent === "Warn" ||
      intent === "Report" ||
      intent === "Debunk" ||
      intent === "Criticize" ||
      intent === "Quote" ||
      intent === "Entertain"
    );

  /*
   * Explicit direct-threat signals.
   *
   * A phrase such as:
   * "I will fucking hurt you if you don't do what I say."
   *
   * contains the negative word "don't", but that negative clause
   * does NOT negate the threat. It is part of the condition
   * attached to the threat.
   *
   * Therefore Threat / Violence should not be reduced merely
   * because a negative word appears nearby.
   */

  const explicitDirectThreat =
    category.name === "Threat" &&
    (
      findMatches(text, "i will hurt you").length > 0 ||
      findMatches(text, "i'll hurt you").length > 0 ||
      findMatches(text, "i will fucking hurt you").length > 0 ||
      findMatches(text, "i'll fucking hurt you").length > 0 ||
      findMatches(text, "i will kill you").length > 0 ||
      findMatches(text, "i'll kill you").length > 0 ||
      findMatches(text, "i will fucking kill you").length > 0 ||
      findMatches(text, "i'll fucking kill you").length > 0 ||
      findMatches(text, "i am going to hurt you").length > 0 ||
      findMatches(text, "i'm going to hurt you").length > 0 ||
      findMatches(text, "i am fucking going to hurt you").length > 0 ||
      findMatches(text, "i'm fucking going to hurt you").length > 0 ||
      findMatches(text, "i am going to kill you").length > 0 ||
      findMatches(text, "i'm going to kill you").length > 0 ||
      findMatches(text, "i am fucking going to kill you").length > 0 ||
      findMatches(text, "i'm fucking going to kill you").length > 0 ||
      findMatches(text, "you will die").length > 0 ||
      findMatches(text, "you are going to die").length > 0 ||
      findMatches(text, "i will attack you").length > 0 ||
      findMatches(text, "i'll attack you").length > 0 ||
      findMatches(text, "i will fucking attack you").length > 0 ||
      findMatches(text, "i'll fucking attack you").length > 0
    );

  /*
   * Contexts that legitimately describe or quote threatening
   * language rather than expressing a real-world threat.
   *
   * These must continue to receive contextual protection.
   */

  const threatContextProtected =
    context === "News Reporting" ||
    context === "Educational" ||
    context === "Warning" ||
    context === "Debunking" ||
    context === "Criticism" ||
    context === "Quoting" ||
    context === "Fictional" ||
    intent === "Report" ||
    intent === "Educate" ||
    intent === "Warn" ||
    intent === "Debunk" ||
    intent === "Criticize" ||
    intent === "Quote" ||
    intent === "Entertain";

  /*
   * Explicit violence phrases that should remain meaningful
   * even when a nearby negative clause exists.
   *
   * We only use this protection for direct violence expressions.
   */

  const explicitDirectViolence =
    category.name === "Violence" &&
    (
      findMatches(text, "i will hurt you").length > 0 ||
      findMatches(text, "i'll hurt you").length > 0 ||
      findMatches(text, "i will fucking hurt you").length > 0 ||
      findMatches(text, "i'll fucking hurt you").length > 0 ||
      findMatches(text, "i will kill you").length > 0 ||
      findMatches(text, "i'll kill you").length > 0 ||
      findMatches(text, "i will fucking kill you").length > 0 ||
      findMatches(text, "i'll fucking kill you").length > 0 ||
      findMatches(text, "i am going to hurt you").length > 0 ||
      findMatches(text, "i'm going to hurt you").length > 0 ||
      findMatches(text, "i am going to kill you").length > 0 ||
      findMatches(text, "i'm going to kill you").length > 0 ||
      findMatches(text, "you will die").length > 0 ||
      findMatches(text, "you are going to die").length > 0 ||
      findMatches(text, "i will attack you").length > 0 ||
      findMatches(text, "i'll attack you").length > 0
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

    /*
     * Direct Threat / Violence expressions are not reduced by
     * nearby negative words such as "don't".
     *
     * However, genuine contextual protection still applies to
     * fictional, quoted, educational, reporting, warning, etc.
     */
    if (
      (
        explicitDirectThreat ||
        explicitDirectViolence
      ) &&
      !threatContextProtected
    ) {
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
    !explicitDrugFacilitation &&
    !(
      (
        explicitDirectThreat ||
        explicitDirectViolence
      ) &&
      !threatContextProtected
    )
  ) {
    score *= multiplier;
  }

  /*
   * Explicit direct threat scoring.
   *
   * A clear first-person threat such as:
   * "I will kill you."
   *
   * should be materially higher than a generic mention of
   * violence. This does not override contextual protection.
   */

  if (
    explicitDirectThreat &&
    !threatContextProtected
  ) {
    score = Math.max(score, 75);
  }

  /*
   * Explicit direct violence scoring.
   *
   * When the violence category is also triggered by a direct
   * threat, keep it in the high-risk range.
   */

  if (
    explicitDirectViolence &&
    !threatContextProtected
  ) {
    score = Math.max(score, 70);
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
    findMatches(text, "how can i buy illegal drugs").length > 0 ||
    findMatches(text, "how can i purchase illegal drugs").length > 0 ||
    findMatches(text, "how can i get illegal drugs").length > 0 ||
    findMatches(text, "how do i buy illegal drugs").length > 0 ||
    findMatches(text, "how do i purchase illegal drugs").length > 0 ||
    findMatches(text, "where can i buy illegal drugs").length > 0 ||
    findMatches(text, "where can i purchase illegal drugs").length > 0 ||
    findMatches(text, "where can i get illegal drugs").length > 0 ||
    findMatches(text, "where to buy illegal drugs").length > 0 ||
    findMatches(text, "where to purchase illegal drugs").length > 0 ||
    findMatches(text, "how to obtain illegal drugs").length > 0 ||
    findMatches(text, "how can i obtain illegal drugs").length > 0 ||
    findMatches(text, "how to sell drugs").length > 0;

  const explicitDrugTransaction =
    findMatches(text, "buy illegal drugs").length > 0 ||
    findMatches(text, "purchase illegal drugs").length > 0 ||
    findMatches(text, "sell illegal drugs").length > 0 ||
    findMatches(text, "buy drugs").length > 0 ||
    findMatches(text, "sell drugs").length > 0 ||
    findMatches(text, "purchase drugs").length > 0;

  /*
   * Educational, warning, reporting, debunking, criticism,
   * quoting, and fictional contexts may reduce the apparent
   * risk of a drug reference when the content is discussing
   * the topic rather than facilitating the activity.
   *
   * However, explicit instructional or transactional requests
   * for obtaining or selling illegal drugs remain high risk.
   */
  const drugContextProtected =
    context === "Educational" ||
    context === "Warning" ||
    context === "News Reporting" ||
    context === "Debunking" ||
    context === "Criticism" ||
    context === "Quoting" ||
    context === "Fictional" ||
    intent === "Educate" ||
    intent === "Warn" ||
    intent === "Report" ||
    intent === "Debunk" ||
    intent === "Criticize" ||
    intent === "Quote" ||
    intent === "Entertain";

  /*
   * Operational drug behavior requires both a drug-acquisition
   * pattern and an action-oriented intent.
   *
   * Merely discussing "buy illegal drugs" inside an educational
   * or reporting context is not sufficient.
   */
  const operationalDrugInstruction =
    (
      explicitDrugInstruction ||
      explicitDrugTransaction
    ) &&
    (
      intent === "Instruct" ||
      intent === "Sell" ||
      detectTransactionalIntent(text)
    );

  /*
   * Keep genuine acquisition/selling instructions high risk,
   * even when the surrounding content is described as educational.
   */
  if (operationalDrugInstruction) {
    score = 70;
  } else if (
    explicitDrugFacilitation
  ) {
    score = Math.max(score, 70);
  } else if (
    drugContextProtected
  ) {
    /*
     * Non-operational drug discussion in a protected context
     * should not inherit the full Drugs baseline.
     *
     * Keep the underlying signal visible, but allow context
     * reduction to lower the final category score.
     */
    score = Math.min(score, 20);
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

  /*
   * First calculate the existing category-based risk score.
   *
   * This keeps the original scoring model stable and applies
   * contextual adjustments only after a real risk signal exists.
   */
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
   * Context × Intent × Claim adjustments.
   *
   * The purpose is not to replace the original risk model,
   * but to make the dimension score sensitive to what the
   * content is doing.
   */

  const hasFinancialClaim =
    riskMatches.some(
      (item) =>
        dimensionMap[item.category.name] ===
        "Financial"
    ) ||
    (
      findMatches(text, "investment").length > 0 ||
      findMatches(text, "invest").length > 0 ||
      findMatches(text, "investing").length > 0 ||
      findMatches(text, "invested").length > 0 ||
      findMatches(text, "money").length > 0 ||
      findMatches(text, "profit").length > 0 ||
      findMatches(text, "profits").length > 0 ||
      findMatches(text, "return").length > 0 ||
      findMatches(text, "returns").length > 0
    );

  /*
   * Financial content is more concerning when it is being
   * actively promoted, persuaded, or sold.
   */
  if (
    dimensionScores.Financial !== undefined &&
    hasFinancialClaim
  ) {
    let adjustment = 0;

    if (context === "Educational") {
      adjustment -= 8;
    }

    if (
      context === "Warning" ||
      context === "Debunking"
    ) {
      adjustment -= 12;
    }

    if (context === "News Reporting") {
      adjustment -= 8;
    }

    if (context === "Criticism") {
      adjustment -= 8;
    }

    if (context === "Promotional") {
      adjustment += 10;
    }

    if (context === "Persuasive") {
      adjustment += 12;
    }

    if (context === "Transactional") {
      adjustment += 8;
    }

    if (intent === "Promote") {
      adjustment += 4;
    }

    if (intent === "Persuade") {
      adjustment += 5;
    }

    if (intent === "Sell") {
      adjustment += 4;
    }

    if (
      context === "Educational" &&
      (
        intent === "Educate" ||
        intent === "Inform"
      )
    ) {
      adjustment -= 3;
    }

    /*
     * Guaranteed financial outcomes are particularly important
     * when combined with promotional or persuasive intent.
     */
    const hasGuaranteedFinancialOutcome =
      findMatches(
        text,
        "guaranteed to double"
      ).length > 0 ||
      findMatches(
        text,
        "guaranteed return"
      ).length > 0 ||
      findMatches(
        text,
        "guaranteed returns"
      ).length > 0 ||
      findMatches(
        text,
        "guaranteed profit"
      ).length > 0 ||
      findMatches(
        text,
        "guaranteed profits"
      ).length > 0;

    if (
      hasGuaranteedFinancialOutcome &&
      (
        context === "Promotional" ||
        context === "Persuasive" ||
        intent === "Promote" ||
        intent === "Persuade" ||
        intent === "Sell"
      )
    ) {
      adjustment += 10;
    }

    /*
     * A warning or debunking context should not receive the
     * promotional certainty penalty.
     */
    if (
      hasGuaranteedFinancialOutcome &&
      (
        context === "Warning" ||
        context === "Debunking"
      )
    ) {
      adjustment -= 4;
    }

    dimensionScores.Financial = Math.min(
      100,
      Math.max(
        0,
        dimensionScores.Financial + adjustment
      )
    );
  }

  /*
   * Health claims receive similar contextual treatment.
   *
   * Educational, warning, debunking, and reporting contexts
   * reduce the interpretation of the claim as a direct harmful
   * or promotional medical assertion.
   */
  const hasHealthClaim =
    riskMatches.some(
      (item) =>
        dimensionMap[item.category.name] ===
        "Health"
    ) ||
    (
      findMatches(text, "cure").length > 0 ||
      findMatches(text, "cures").length > 0 ||
      findMatches(text, "treatment").length > 0 ||
      findMatches(text, "treat").length > 0 ||
      findMatches(text, "heal").length > 0 ||
      findMatches(text, "healing").length > 0 ||
      findMatches(text, "disease").length > 0 ||
      findMatches(text, "medical").length > 0
    );

  if (
    dimensionScores.Health !== undefined &&
    hasHealthClaim
  ) {
    let adjustment = 0;

    if (context === "Educational") {
      adjustment -= 8;
    }

    if (
      context === "Warning" ||
      context === "Debunking"
    ) {
      adjustment -= 12;
    }

    if (context === "News Reporting") {
      adjustment -= 8;
    }

    if (context === "Criticism") {
      adjustment -= 8;
    }

    if (context === "Promotional") {
      adjustment += 8;
    }

    if (context === "Persuasive") {
      adjustment += 10;
    }

    if (context === "Transactional") {
      adjustment += 6;
    }

    if (intent === "Promote") {
      adjustment += 3;
    }

    if (intent === "Persuade") {
      adjustment += 4;
    }

    if (intent === "Sell") {
      adjustment += 3;
    }

    if (
      context === "Educational" &&
      (
        intent === "Educate" ||
        intent === "Inform"
      )
    ) {
      adjustment -= 3;
    }

    dimensionScores.Health = Math.min(
      100,
      Math.max(
        0,
        dimensionScores.Health + adjustment
      )
    );
  }

  /*
   * Deception is more significant when misleading language
   * is combined with active promotion or persuasion.
   */
  if (dimensionScores.Deception !== undefined) {
    let adjustment = 0;

    if (context === "Warning") {
      adjustment -= 6;
    }

    if (context === "Debunking") {
      adjustment -= 8;
    }

    if (context === "News Reporting") {
      adjustment -= 5;
    }

    if (context === "Criticism") {
      adjustment -= 5;
    }

    if (context === "Promotional") {
      adjustment += 6;
    }

    if (context === "Persuasive") {
      adjustment += 8;
    }

    if (context === "Transactional") {
      adjustment += 5;
    }

    if (intent === "Promote") {
      adjustment += 3;
    }

    if (intent === "Persuade") {
      adjustment += 4;
    }

    if (intent === "Sell") {
      adjustment += 3;
    }

    dimensionScores.Deception = Math.min(
      100,
      Math.max(
        0,
        dimensionScores.Deception + adjustment
      )
    );
  }

  /*
   * Special drug facilitation boost.
   *
   * This preserves the existing high-risk behavior.
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
      Math.max(
        dimensionScores.Drugs,
        70
      )
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

  const threatContextProtected =
    context === "News Reporting" ||
    context === "Educational" ||
    context === "Warning" ||
    context === "Debunking" ||
    context === "Criticism" ||
    context === "Quoting" ||
    context === "Fictional" ||
    intent === "Report" ||
    intent === "Educate" ||
    intent === "Warn" ||
    intent === "Debunk" ||
    intent === "Criticize" ||
    intent === "Quote" ||
    intent === "Entertain";

  const explicitDirectThreat =
    findMatches(text, "i will hurt you").length > 0 ||
    findMatches(text, "i'll hurt you").length > 0 ||
    findMatches(text, "i will fucking hurt you").length > 0 ||
    findMatches(text, "i'll fucking hurt you").length > 0 ||
    findMatches(text, "i will kill you").length > 0 ||
    findMatches(text, "i'll kill you").length > 0 ||
    findMatches(text, "i will fucking kill you").length > 0 ||
    findMatches(text, "i'll fucking kill you").length > 0 ||
    findMatches(text, "i am going to hurt you").length > 0 ||
    findMatches(text, "i'm going to hurt you").length > 0 ||
    findMatches(text, "i am fucking going to hurt you").length > 0 ||
    findMatches(text, "i'm fucking going to hurt you").length > 0 ||
    findMatches(text, "i am going to kill you").length > 0 ||
    findMatches(text, "i'm going to kill you").length > 0 ||
    findMatches(text, "i am fucking going to kill you").length > 0 ||
    findMatches(text, "i'm fucking going to kill you").length > 0 ||
    findMatches(text, "you will die").length > 0 ||
    findMatches(text, "you are going to die").length > 0 ||
    findMatches(text, "i will attack you").length > 0 ||
    findMatches(text, "i'll attack you").length > 0 ||
    findMatches(text, "i will fucking attack you").length > 0 ||
    findMatches(text, "i'll fucking attack you").length > 0;

  const explicitDirectViolence =
    findMatches(text, "i will hurt you").length > 0 ||
    findMatches(text, "i'll hurt you").length > 0 ||
    findMatches(text, "i will fucking hurt you").length > 0 ||
    findMatches(text, "i'll fucking hurt you").length > 0 ||
    findMatches(text, "i will kill you").length > 0 ||
    findMatches(text, "i'll kill you").length > 0 ||
    findMatches(text, "i will fucking kill you").length > 0 ||
    findMatches(text, "i'll fucking kill you").length > 0 ||
    findMatches(text, "i am going to hurt you").length > 0 ||
    findMatches(text, "i'm going to hurt you").length > 0 ||
    findMatches(text, "i am going to kill you").length > 0 ||
    findMatches(text, "i'm going to kill you").length > 0 ||
    findMatches(text, "you will die").length > 0 ||
    findMatches(text, "you are going to die").length > 0 ||
    findMatches(text, "i will attack you").length > 0 ||
    findMatches(text, "i'll attack you").length > 0;

  for (const item of riskMatches) {
    for (const match of item.matches) {
      /*
       * A direct real-world Threat / Violence signal has already
       * been preserved in the risk score.
       *
       * Do not also display the same phrase as a contextual
       * signal unless the surrounding content is genuinely
       * contextual, such as a movie, news report, warning,
       * educational discussion, or quotation.
       */
      if (
        (
          item.category.name === "Threat" ||
          item.category.name === "Violence"
        ) &&
        (
          explicitDirectThreat ||
          explicitDirectViolence
        ) &&
        !threatContextProtected
      ) {
        continue;
      }

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
   Risk explainability
   ========================================================= */

function getRiskReason(
  category: RiskCategory | PatternCategory,
  text: string,
  context: ContextType,
  intent: IntentType
): string {
  /* -------------------------------------------------------
     Drugs
     ------------------------------------------------------- */

  if (category.name === "Drugs") {
    const explicitDrugFacilitation =
      findMatches(
        text,
        "how to buy illegal drugs"
      ).length > 0 ||
      findMatches(
        text,
        "where to purchase drugs"
      ).length > 0 ||
      findMatches(
        text,
        "how to sell drugs"
      ).length > 0 ||
      findMatches(
        text,
        "buy illegal drugs"
      ).length > 0 ||
      findMatches(
        text,
        "purchase illegal drugs"
      ).length > 0 ||
      findMatches(
        text,
        "sell illegal drugs"
      ).length > 0;

    if (
      explicitDrugFacilitation &&
      intent === "Instruct"
    ) {
      return (
        "The content contains an instructional pattern " +
        "associated with obtaining or selling illegal " +
        "substances. Because the wording can facilitate " +
        "harmful or illegal activity, the risk remains high " +
        "even when the surrounding content is instructional."
      );
    }

    if (explicitDrugFacilitation) {
      return (
        "The content contains explicit language associated " +
        "with obtaining or selling illegal substances. " +
        "This type of facilitation can present a serious " +
        "safety concern."
      );
    }

    if (
      context === "Warning" ||
      context === "Debunking" ||
      context === "News Reporting" ||
      context === "Educational" ||
      intent === "Warn" ||
      intent === "Debunk" ||
      intent === "Report" ||
      intent === "Educate"
    ) {
      return (
        "The content references illegal drugs or related " +
        "activity, but the surrounding context appears " +
        "educational, cautionary, critical, or informational " +
        "rather than directly promotional."
      );
    }

    return (
      "The content references illegal drugs or related " +
      "activity. The risk depends on whether the content " +
      "is discussing, promoting, facilitating, or warning " +
      "about the activity."
    );
  }

  /* -------------------------------------------------------
     Financial Claims
     ------------------------------------------------------- */

  if (category.name === "Financial Claims") {
    if (
      context === "Warning" ||
      context === "Debunking" ||
      context === "News Reporting" ||
      context === "Criticism" ||
      intent === "Warn" ||
      intent === "Debunk" ||
      intent === "Report" ||
      intent === "Criticize"
    ) {
      return (
        "Financial language is present, but the surrounding " +
        "content appears to warn against, question, report on, " +
        "or criticize the financial claim rather than directly " +
        "promote it."
      );
    }

    if (
      context === "Promotional" ||
      context === "Persuasive" ||
      context === "Transactional" ||
      intent === "Promote" ||
      intent === "Persuade" ||
      intent === "Sell"
    ) {
      return (
        "The content uses financial language in a promotional " +
        "or persuasive context. Claims about profits, returns, " +
        "or financial outcomes may require additional scrutiny " +
        "when presented as expected or certain results."
      );
    }

    return (
      "The content contains financial language that may be " +
      "interpreted as a claim about investments, returns, " +
      "profits, or other financial outcomes."
    );
  }

  /* -------------------------------------------------------
     Health & Medical
     ------------------------------------------------------- */

  if (category.name === "Health & Medical") {
    if (
      context === "Educational" ||
      context === "Warning" ||
      context === "Debunking" ||
      context === "News Reporting" ||
      context === "Criticism" ||
      intent === "Educate" ||
      intent === "Warn" ||
      intent === "Debunk" ||
      intent === "Report" ||
      intent === "Criticize"
    ) {
      return (
        "The content contains health-related claims, but " +
        "the surrounding context appears educational, " +
        "critical, cautionary, or informational rather than " +
        "directly promotional."
      );
    }

    if (
      context === "Promotional" ||
      context === "Persuasive" ||
      context === "Transactional" ||
      intent === "Promote" ||
      intent === "Persuade" ||
      intent === "Sell"
    ) {
      return (
        "The content presents health or medical claims in a " +
        "promotional or persuasive context. Claims involving " +
        "treatment, cures, or health outcomes can require " +
        "additional scrutiny, especially when expressed with " +
        "strong certainty."
      );
    }

    return (
      "The content contains health or medical claims that " +
      "may be sensitive, particularly when treatment, cure, " +
      "or health outcomes are presented with strong certainty."
    );
  }

  /* -------------------------------------------------------
     Scam & Fraud
     ------------------------------------------------------- */

  if (category.name === "Scam & Fraud") {
    if (
      context === "Warning" ||
      context === "Debunking" ||
      context === "News Reporting" ||
      context === "Criticism" ||
      intent === "Warn" ||
      intent === "Debunk" ||
      intent === "Report" ||
      intent === "Criticize"
    ) {
      return (
        "The content references scams or fraudulent activity, " +
        "but the surrounding context appears to warn against, " +
        "report on, or criticize the behavior rather than " +
        "promote it."
      );
    }

    return (
      "The content contains language associated with scams, " +
      "fraud, or deceptive activity. This can create serious " +
      "trust and safety concerns, particularly when the content " +
      "appears to encourage or facilitate the behavior."
    );
  }

  /* -------------------------------------------------------
     Deceptive or Misleading Claims
     ------------------------------------------------------- */

  if (
    category.name ===
    "Deceptive or Misleading Claims"
  ) {
    if (
      context === "Warning" ||
      context === "Debunking" ||
      context === "Criticism" ||
      intent === "Warn" ||
      intent === "Debunk" ||
      intent === "Criticize"
    ) {
      return (
        "The content contains potentially misleading language, " +
        "but the surrounding context appears to question, " +
        "criticize, or warn against the claim rather than " +
        "present it as established fact."
      );
    }

    return (
      "The content contains language that may present a claim " +
      "with more certainty than the available evidence supports."
    );
  }

  /* -------------------------------------------------------
     Gambling
     ------------------------------------------------------- */

  if (category.name === "Gambling") {
    if (
      context === "Warning" ||
      context === "Debunking" ||
      context === "News Reporting" ||
      context === "Educational" ||
      context === "Criticism" ||
      intent === "Warn" ||
      intent === "Debunk" ||
      intent === "Report" ||
      intent === "Educate" ||
      intent === "Criticize"
    ) {
      return (
        "The content references gambling-related activity, " +
        "but the surrounding context appears educational, " +
        "cautionary, critical, or informational rather than " +
        "directly encouraging participation."
      );
    }

    if (
      context === "Promotional" ||
      context === "Persuasive" ||
      context === "Transactional" ||
      intent === "Promote" ||
      intent === "Persuade" ||
      intent === "Sell"
    ) {
      return (
        "The content uses gambling-related language in a " +
        "promotional, persuasive, or transactional context, " +
        "which may encourage financially risky activity."
      );
    }

    return (
      "The content contains gambling-related language that " +
      "may encourage or promote financially risky activity."
    );
  }

  /* -------------------------------------------------------
     Violence
     ------------------------------------------------------- */

  if (category.name === "Violence") {
    if (
      context === "News Reporting" ||
      context === "Educational" ||
      context === "Warning" ||
      context === "Debunking" ||
      context === "Criticism" ||
      context === "Fictional" ||
      intent === "Report" ||
      intent === "Educate" ||
      intent === "Warn" ||
      intent === "Debunk" ||
      intent === "Criticize" ||
      intent === "Entertain"
    ) {
      return (
        "The content contains references to violence or harm, " +
        "but the surrounding context appears informational, " +
        "educational, cautionary, critical, or fictional rather " +
        "than directly encouraging real-world violence."
      );
    }

    return (
      "The content contains language associated with serious " +
      "violence or violent activity, which can create significant " +
      "safety concerns."
    );
  }

  /* -------------------------------------------------------
     Adult Content
     ------------------------------------------------------- */

  if (category.name === "Adult Content") {
    if (
      context === "News Reporting" ||
      context === "Educational" ||
      context === "Criticism" ||
      context === "Warning" ||
      context === "Fictional" ||
      intent === "Report" ||
      intent === "Educate" ||
      intent === "Criticize" ||
      intent === "Warn" ||
      intent === "Entertain"
    ) {
      return (
        "The content contains sexual or adult-related language, " +
        "but the surrounding context appears informational, " +
        "educational, critical, cautionary, or fictional rather " +
        "than directly promotional."
      );
    }

    return (
      "The content contains sexual or adult-related language " +
      "that may raise platform safety or policy concerns."
    );
  }

/* -------------------------------------------------------
   Harassment
   ------------------------------------------------------- */

if (category.name === "Harassment") {
  if (
    context === "News Reporting" ||
    context === "Educational" ||
    context === "Warning" ||
    context === "Debunking" ||
    context === "Criticism" ||
    context === "Quoting" ||
    context === "Fictional" ||
    intent === "Report" ||
    intent === "Educate" ||
    intent === "Warn" ||
    intent === "Debunk" ||
    intent === "Criticize" ||
    intent === "Quote" ||
    intent === "Entertain"
  ) {
    return (
      "The content contains language that may be insulting " +
      "or degrading, but the surrounding context appears " +
      "informational, educational, cautionary, critical, " +
      "quoted, or fictional rather than directly targeting " +
      "another person."
    );
  }

  return (
    "The content contains language that may target or " +
    "degrade another person through insults or abusive " +
    "language. This can create harassment and safety concerns."
  );
}

/* -------------------------------------------------------
Threat
------------------------------------------------------- */

if (category.name === "Threat") {
if (
context === "News Reporting" ||
context === "Educational" ||
context === "Warning" ||
context === "Debunking" ||
context === "Criticism" ||
context === "Quoting" ||
context === "Fictional" ||
intent === "Report" ||
intent === "Educate" ||
intent === "Warn" ||
intent === "Debunk" ||
intent === "Criticize" ||
intent === "Quote" ||
intent === "Entertain"
) {
return (
"The content contains language describing a threat or " +
"threatening behavior, but the surrounding context appears " +
"informational, educational, cautionary, critical, quoted, " +
"or fictional rather than a direct real-world threat."
);
}

return (
"The content contains language that may express a direct " +
"threat of physical harm, violence, or death toward another " +
"person. This can create a serious safety concern."
);
}

  /* -------------------------------------------------------
     Hate & Harassment
     ------------------------------------------------------- */

  if (
    category.name ===
    "Hate & Harassment"
  ) {
    if (
      context === "News Reporting" ||
      context === "Educational" ||
      context === "Warning" ||
      context === "Debunking" ||
      context === "Criticism" ||
      context === "Quoting" ||
      intent === "Report" ||
      intent === "Educate" ||
      intent === "Warn" ||
      intent === "Debunk" ||
      intent === "Criticize" ||
      intent === "Quote"
    ) {
      return (
        "The content contains potentially hateful, abusive, " +
        "or threatening language, but the surrounding context " +
        "appears to be reporting, discussing, criticizing, " +
        "quoting, or warning about the language rather than " +
        "directly targeting or encouraging harm."
      );
    }

    return (
      "The content contains language associated with threats, " +
      "hateful expression, or targeted harassment."
    );
  }

  /* -------------------------------------------------------
     Weight Loss
     ------------------------------------------------------- */

  if (category.name === "Weight Loss") {
    if (
      context === "Educational" ||
      context === "Warning" ||
      context === "Debunking" ||
      context === "News Reporting" ||
      context === "Criticism" ||
      intent === "Educate" ||
      intent === "Warn" ||
      intent === "Debunk" ||
      intent === "Report" ||
      intent === "Criticize"
    ) {
      return (
        "The content discusses weight-loss claims, but the " +
        "surrounding context appears educational, critical, " +
        "cautionary, or informational rather than directly " +
        "promotional."
      );
    }

    if (
      context === "Promotional" ||
      context === "Persuasive" ||
      context === "Transactional" ||
      intent === "Promote" ||
      intent === "Persuade" ||
      intent === "Sell"
    ) {
      return (
        "The content presents weight-loss claims in a " +
        "promotional or persuasive context. Claims involving " +
        "rapid, guaranteed, or unrealistic results may be " +
        "misleading or require additional scrutiny."
      );
    }

    return (
      "The content contains weight-loss language that may " +
      "become risky when results are presented as rapid, " +
      "guaranteed, or unrealistic."
    );
  }

  /* -------------------------------------------------------
     Quick Wealth / Easy Money
     ------------------------------------------------------- */

  if (
    category.name ===
    "Quick Wealth / Easy Money"
  ) {
    if (
      context === "Warning" ||
      context === "Debunking" ||
      context === "News Reporting" ||
      context === "Criticism" ||
      intent === "Warn" ||
      intent === "Debunk" ||
      intent === "Report" ||
      intent === "Criticize"
    ) {
      return (
        "The content references promises of quick or easy " +
        "financial gains, but the surrounding context appears " +
        "to question, report on, or warn against those claims."
      );
    }

    return (
      "The content contains promises of easy, rapid, or " +
      "guaranteed financial gains, which can be misleading " +
      "or financially risky."
    );
  }

  /* -------------------------------------------------------
     Extreme Certainty
     ------------------------------------------------------- */

  if (
    category.name === "Extreme Certainty"
  ) {
    if (
      context === "Warning" ||
      context === "Debunking" ||
      context === "Criticism" ||
      intent === "Warn" ||
      intent === "Debunk" ||
      intent === "Criticize"
    ) {
      return (
        "The content uses unusually certain language, but the " +
        "surrounding context appears to question or criticize " +
        "the certainty of the claim rather than present the " +
        "outcome as guaranteed."
      );
    }

    if (
      context === "Promotional" ||
      context === "Persuasive" ||
      context === "Transactional" ||
      intent === "Promote" ||
      intent === "Persuade" ||
      intent === "Sell"
    ) {
      return (
        "The content uses unusually certain language in a " +
        "promotional or persuasive context. This can make an " +
        "outcome appear guaranteed or more reliable than the " +
        "available evidence supports."
      );
    }

    return (
      "The content uses unusually certain language that may " +
      "make an outcome appear guaranteed or more reliable " +
      "than the available evidence supports."
    );
  }

  /* -------------------------------------------------------
     Fallback
     ------------------------------------------------------- */

  return (
    category.explanation
  );
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
   * Context × Intent × Claim adjustment.
   *
   * The same claim can carry very different levels of risk
   * depending on why and how it is presented.
   *
   * Educational, warning, debunking, and reporting contexts
   * should remain relatively low-risk.
   *
   * Promotional, persuasive, and transactional financial claims
   * receive a stronger overall signal.
   */

  const hasFinancialClaim =
    claimsResult.types.includes("Financial");

  const hasGuaranteedFinancialOutcome =
    /guaranteed\s+(?:returns?|profit|profits?|gains?|income|money|double|triple)/i.test(
      cleanText
    ) ||
    /guaranteed\s+to\s+(?:make|earn|double|triple)/i.test(
      cleanText
    ) ||
    /(?:double|triple)\s+(?:your|my|the)\s+(?:money|investment|returns?)/i.test(
      cleanText
    );

  if (hasFinancialClaim) {
    if (
      contextResult.primary === "Promotional" ||
      contextResult.primary === "Persuasive" ||
      contextResult.primary === "Transactional"
    ) {
      score += 6;
    }

    if (
      intentResult.primary === "Promote" ||
      intentResult.primary === "Persuade" ||
      intentResult.primary === "Sell"
    ) {
      score += 5;
    }

    if (hasGuaranteedFinancialOutcome) {
      if (
        contextResult.primary === "Promotional" ||
        contextResult.primary === "Persuasive" ||
        contextResult.primary === "Transactional"
      ) {
        score += 10;
      }
    }
  }

  /*
   * Strong commercial action detection.
   *
   * Context / intent detection can sometimes remain Neutral or
   * Unknown even when the sentence clearly attempts to sell,
   * promote, or obtain a transaction.
   *
   * This local signal is intentionally narrower than a general
   * promotional classifier.
   */

  const hasStrongCommercialAction =
    /\b(?:buy|purchase|order|shop|join|invest|subscribe|book|sign\s+up|checkout)\b[\s\S]{0,60}\b(?:today|now|immediately)\b/i.test(
      cleanText
    ) ||
    /\b(?:buy|purchase|order|shop|invest)\s+(?:this|the|our|my)\b/i.test(
      cleanText
    ) ||
    /\b(?:for sale|limited offer|special offer|exclusive offer)\b/i.test(
      cleanText
    ) ||
    /\b(?:get yours|start today|start now|act now)\b/i.test(
      cleanText
    );

  const hasCommercialIntent =
    hasStrongCommercialAction ||
    contextResult.primary === "Promotional" ||
    contextResult.primary === "Persuasive" ||
    contextResult.primary === "Transactional" ||
    intentResult.primary === "Promote" ||
    intentResult.primary === "Persuade" ||
    intentResult.primary === "Sell";

  /*
   * Strong financial promotion combination.
   *
   * Examples:
   * "Invest now and we guarantee that you will double your money."
   * "Join our investment program today and make guaranteed profits."
   *
   * These combinations should not remain around the Medium
   * range simply because individual category scores are moderate.
   */

  const protectedContext =
    contextResult.primary === "Educational" ||
    contextResult.primary === "Warning" ||
    contextResult.primary === "Debunking" ||
    contextResult.primary === "News Reporting" ||
    contextResult.primary === "Criticism" ||
    contextResult.primary === "Fictional" ||
    intentResult.primary === "Educate" ||
    intentResult.primary === "Warn" ||
    intentResult.primary === "Debunk" ||
    intentResult.primary === "Report" ||
    intentResult.primary === "Criticize" ||
    intentResult.primary === "Entertain";

  if (
    hasFinancialClaim &&
    hasCommercialIntent &&
    hasGuaranteedFinancialOutcome &&
    !protectedContext
  ) {
    /*
     * Strong financial guarantee + commercial action is a
     * high-priority combination.
     *
     * Use a floor instead of repeatedly stacking points so
     * related signals do not inflate the score excessively.
     */
    score = Math.max(score, 68);
  } else if (
    hasFinancialClaim &&
    hasCommercialIntent &&
    !protectedContext
  ) {
    /*
     * Commercial financial claims without an explicit guarantee
     * should receive a meaningful but lower increase.
     */
    score = Math.max(score, 30);
  }

  /*
   * Strong health / medical commercial combination.
   *
   * Examples:
   * "Buy our treatment today and we guarantee that it will cure
   * your disease completely."
   *
   * This is materially stronger than a normal product review or
   * personal experience.
   */

  const hasHealthClaim =
    claimsResult.types.includes("Health");

  const hasCureOrTreatmentClaim =
    /\b(?:cure|cures|cured|curing|treat|treats|treated|treatment|heal|heals|healed|healing)\b/i.test(
      cleanText
    );

  const hasGuaranteedHealthOutcome =
    /\bguarantee(?:d|s)?\b[\s\S]{0,80}\b(?:cure|cures|cured|curing|treat|treats|treated|treatment|heal|heals|healed|healing|completely|completely\s+recover)\b/i.test(
      cleanText
    ) ||
    /\b(?:cure|cures|cured|curing|treat|treats|treated|treatment|heal|heals|healed|healing)\b[\s\S]{0,60}\bguarantee(?:d|s)?\b/i.test(
      cleanText
    ) ||
    /\bguaranteed\s+to\s+(?:cure|treat|heal|completely\s+recover)\b/i.test(
      cleanText
    ) ||
    /*
     * Strong certainty health outcomes.
     *
     * These patterns capture highly certain medical outcomes
     * even when the word "guarantee" is not used.
     */
    /\b(?:will|can)\b[\s\S]{0,50}\b(?:completely|fully|totally)\b[\s\S]{0,30}\b(?:cure|treat|heal|recover)\b/i.test(
      cleanText
    ) ||
    /\b(?:completely|fully|totally)\s+(?:cure|cures|cured|treat|treats|treated|heal|heals|healed)\b/i.test(
      cleanText
    ) ||
    /\b(?:will|can)\b[\s\S]{0,40}\b(?:cure|cures|treat|treats|heal|heals)\b[\s\S]{0,50}\b(?:within|in)\b[\s\S]{0,20}\b(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(?:day|days|week|weeks|month|months)\b/i.test(
      cleanText
    );

  /*
   * Strong certainty health outcomes should increase risk
   * even when there is no commercial intent.
   *
   * This distinguishes ordinary health discussion from
   * highly certain treatment or cure claims.
   */
  if (
    hasHealthClaim &&
    hasCureOrTreatmentClaim &&
    hasGuaranteedHealthOutcome &&
    !protectedContext
  ) {
    /*
     * Commercial health claims with strong certainty remain
     * the strongest case and should reach High Risk.
     */
    if (hasCommercialIntent) {
      score = Math.max(score, 65);
    } else {
      /*
       * Strong medical outcome claims without commercial intent
       * are still meaningful risks, but should remain below High
       * Risk unless other factors increase the score.
       */
      score = Math.max(score, 45);
    }
  } else if (
    hasHealthClaim &&
    hasCureOrTreatmentClaim &&
    hasCommercialIntent &&
    !protectedContext
  ) {
    /*
     * Commercial health claims without a strong outcome guarantee
     * remain meaningful, but should not automatically become High Risk.
     */
    score = Math.max(score, 30);
  }

  /*
   * Strong contextual protection.
   *
   * Educational, warning, debunking, reporting, and critical
   * content should not be treated like promotional content
   * simply because it contains a risky claim phrase.
   */

  if (
    contextResult.primary === "Educational" ||
    contextResult.primary === "Warning" ||
    contextResult.primary === "Debunking" ||
    contextResult.primary === "News Reporting" ||
    contextResult.primary === "Criticism"
  ) {
    if (
      intentResult.primary === "Educate" ||
      intentResult.primary === "Warn" ||
      intentResult.primary === "Debunk" ||
      intentResult.primary === "Report" ||
      intentResult.primary === "Criticize"
    ) {
      score = Math.max(
        0,
        score - 8
      );
    }
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
        reason: getRiskReason(
          item.category,
          cleanText,
          contextResult.primary,
          intentResult.primary
        ),
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