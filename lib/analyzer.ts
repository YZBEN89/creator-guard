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
};

export const riskCategories: RiskCategory[] = [
  {
    name: "Financial Claims",
    level: "Medium",
    keywords: [
      "guaranteed profit",
      "guaranteed profits",
      "guaranteed returns",
      "guaranteed return",
      "guaranteed income",
      "guaranteed earnings",
      "guaranteed investment",
      "guaranteed investment returns",
      "risk-free investment",
      "risk free investment",
      "risk-free returns",
      "risk free returns",
      "double your money",
      "triple your money",
      "100% guaranteed",
      "100 percent guaranteed",
      "no risk",
      "zero risk",
      "zero-risk investment",
      "instant income",
      "instant profit",
      "passive income",
      "financial freedom",
      "guaranteed wealth",
      "guaranteed success",
      "never lose money",
      "can't lose money",
      "cannot lose money",
      "always make money",
      "always profitable",
      "profit every time",
      "win every time",
      "double your investment",
      "multiply your money",
    ],
    explanation:
      "Absolute financial promises may create misleading or high-risk impressions, especially when specific outcomes are guaranteed.",
    direction:
      "Use more balanced language and avoid promising guaranteed financial results.",
  },

  {
    name: "Scam & Fraud",
    level: "High",
    keywords: [
      "send me money",
      "send money to me",
      "pay me first",
      "pay first",
      "pay upfront",
      "wire me money",
      "transfer money",
      "send bitcoin",
      "send crypto",
      "send cryptocurrency",
      "give me your bank details",
      "give me your banking information",
      "give me your credit card",
      "give me your card number",
      "give me your password",
      "give me your login",
      "verify your account",
      "verify your payment",
      "claim your prize",
      "claim your reward",
      "you have won",
      "you won a prize",
      "free money",
      "free cash",
      "cash prize",
      "investment opportunity",
      "exclusive investment",
      "limited investment opportunity",
      "guaranteed opportunity",
      "secret investment",
      "secret method",
      "secret formula",
      "money doubling",
      "quick payout",
      "instant payout",
    ],
    explanation:
      "Requests for money, financial credentials, or highly suspicious rewards may resemble scam or deceptive activity.",
    direction:
      "Clearly explain legitimate offers and avoid requests for sensitive financial information.",
  },

  {
    name: "Deceptive or Misleading Claims",
    level: "Medium",
    keywords: [
      "100% effective",
      "100% safe",
      "works every time",
      "works instantly",
      "instant results",
      "guaranteed results",
      "proven to work",
      "proven method",
      "proven strategy",
      "the only way",
      "only solution",
      "never fails",
      "can't fail",
      "cannot fail",
      "zero downside",
      "no downside",
      "no hidden fees",
      "nothing to lose",
      "everyone is doing it",
      "everyone wants this",
      "everyone needs this",
      "do this and you will",
      "this will change your life",
      "change your life instantly",
    ],
    explanation:
      "Absolute or universal claims can make content appear exaggerated or misleading.",
    direction:
      "Replace absolute claims with specific, realistic, and verifiable descriptions.",
  },

  {
    name: "Health & Medical",
    level: "Medium",
    keywords: [
      "guaranteed cure",
      "instant cure",
      "miracle cure",
      "cure cancer",
      "cure diabetes",
      "cure depression",
      "heal instantly",
      "medical miracle",
      "proven cure",
      "doctors hate this",
      "no side effects",
      "completely safe",
      "100% safe",
      "works every time",
      "instant healing",
      "heal any disease",
      "cure any disease",
      "reverse disease",
      "prevent all diseases",
    ],
    explanation:
      "Strong medical claims, guaranteed cures, or claims of universal safety may require careful context and credible support.",
    direction:
      "Use factual language and avoid guaranteed medical outcomes or unsupported health claims.",
  },

  {
    name: "Weight Loss",
    level: "Medium",
    keywords: [
      "lose weight fast",
      "lose weight quickly",
      "lose weight instantly",
      "burn fat fast",
      "burn fat instantly",
      "drop pounds fast",
      "weight loss miracle",
      "lose 10 pounds",
      "lose 20 pounds",
      "lose 30 pounds",
      "lose 50 pounds",
      "effortless weight loss",
      "melt fat",
      "flat stomach fast",
      "lose belly fat fast",
      "instant weight loss",
      "guaranteed weight loss",
      "guaranteed fat loss",
    ],
    explanation:
      "Rapid or guaranteed weight-loss claims can appear exaggerated or misleading without appropriate context.",
    direction:
      "Avoid guaranteed or unrealistic timelines and describe results more carefully.",
  },

  {
    name: "Gambling",
    level: "High",
    keywords: [
      "betting",
      "casino",
      "online casino",
      "sports betting",
      "gambling",
      "jackpot",
      "place your bet",
      "bet now",
      "win big",
      "slot machine",
      "poker betting",
      "blackjack",
      "roulette",
      "bet on this",
      "guaranteed win",
      "guaranteed winnings",
      "easy winnings",
      "free bet",
    ],
    explanation:
      "Gambling-related language can create elevated platform and advertising sensitivity.",
    direction:
      "Use careful, informational context and avoid encouraging risky gambling behavior.",
  },

  {
    name: "Drugs",
    level: "High",
    keywords: [
      "buy cocaine",
      "buy drugs",
      "sell drugs",
      "buy weed",
      "sell weed",
      "buy heroin",
      "sell heroin",
      "buy meth",
      "sell meth",
      "illegal drugs",
      "drug dealer",
      "buy pills",
      "sell pills",
      "buy fentanyl",
      "sell fentanyl",
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
      "kill yourself",
      "kill him",
      "kill her",
      "murder",
      "shoot him",
      "shoot her",
      "violent attack",
      "bomb attack",
      "attack them",
      "beat him",
      "beat her",
      "hurt them",
      "destroy them",
      "kill all",
      "you should die",
    ],
    explanation:
      "Threatening or violent language can create significant safety concerns depending on the surrounding context.",
    direction:
      "Avoid threatening language and provide clear context when discussing violence for educational or reporting purposes.",
  },

  {
    name: "Adult Content",
    level: "High",
    keywords: [
      "explicit sex",
      "explicit sexual",
      "porn",
      "pornography",
      "nude",
      "naked",
      "sexual services",
      "xxx content",
      "adult services",
      "sex video",
      "sex content",
      "explicit content",
    ],
    explanation:
      "Explicit sexual or adult-service language may create elevated content and advertising sensitivity.",
    direction:
      "Keep content non-explicit and use neutral language when discussing sensitive subjects.",
  },

  {
    name: "Hate & Harassment",
    level: "High",
    keywords: [
      "hate group",
      "racial slur",
      "go die",
      "you are worthless",
      "you are disgusting",
      "kill all",
      "destroy all",
      "stupid people",
      "nobody likes you",
      "you should die",
      "you deserve to die",
      "shut up idiot",
      "you are an idiot",
    ],
    explanation:
      "Targeted insults, hateful language, or threats can create harassment and safety concerns.",
    direction:
      "Keep criticism focused on ideas or behavior rather than attacking people or protected groups.",
  },
];

export const patternCategories: PatternCategory[] = [
  {
    name: "Exaggerated Promise",
    level: "Medium",
    optimizationOnly: true,
    keywords: [
      "change your life overnight",
      "change your life in days",
      "instant transformation",
      "instant success",
      "overnight success",
      "results overnight",
      "results in minutes",
      "results in hours",
      "results in one day",
      "life-changing results",
      "life changing results",
    ],
    explanation:
      "Highly exaggerated promises can make content feel less credible.",
    direction:
      "Use more specific and realistic wording around outcomes and timelines.",
  },

  {
    name: "Clickbait",
    level: "Medium",
    optimizationOnly: true,
    keywords: [
      "you won't believe",
      "you wont believe",
      "you will not believe",
      "what they don't want you to know",
      "what they dont want you to know",
      "what they will not tell you",
      "this one trick",
      "this simple trick",
      "this secret trick",
      "nobody is talking about",
      "no one is talking about",
      "what happens next",
      "you need to see this",
      "watch before it gets deleted",
      "they don't want you to see",
      "they dont want you to see",
    ],
    explanation:
      "Clickbait phrasing can reduce clarity and make promotional content feel exaggerated.",
    direction:
      "Use a clear description of what the audience will actually learn or see.",
  },

  {
    name: "Promotional Language",
    level: "Medium",
    optimizationOnly: true,
    keywords: [
      "secret trick",
      "secret hack",
      "one simple trick",
      "one weird trick",
      "the best",
      "number one",
      "best in the world",
      "ultimate solution",
      "ultimate guide",
    ],
    explanation:
      "Strong promotional wording can make content feel overly sales-focused.",
    direction:
      "Prefer specific benefits and evidence over broad superlatives.",
  },

  {
    name: "Urgency / Pressure",
    level: "Medium",
    optimizationOnly: true,
    keywords: [
      "act now",
      "buy now",
      "sign up now",
      "don't wait",
      "dont wait",
      "do not wait",
      "before it's too late",
      "before its too late",
      "limited time",
      "limited time only",
      "last chance",
      "final chance",
      "only today",
      "ends tonight",
      "don't miss out",
      "dont miss out",
      "you must act now",
      "take action now",
    ],
    explanation:
      "Urgency and pressure language can make promotional content feel aggressive.",
    direction:
      "Use urgency only when it reflects a genuine deadline or availability limit.",
  },

  {
    name: "Quick Wealth / Easy Money",
    level: "High",
    optimizationOnly: false,
    keywords: [
      "make money while you sleep",
      "make money in your sleep",
      "make thousands overnight",
      "make millions overnight",
      "make money overnight",
      "make you rich overnight",
      "make you rich in days",
      "get rich overnight",
      "get rich in days",
      "get rich in a week",
      "become rich overnight",
      "become rich in a week",
      "become wealthy overnight",
      "make thousands in a day",
      "make thousands in one day",
      "make money with no effort",
      "make money without working",
      "earn money without working",
      "easy way to get rich",
      "fastest way to get rich",
    ],
    explanation:
      "Claims of easy or extremely fast wealth can appear unrealistic or misleading.",
    direction:
      "Avoid unrealistic income promises and describe the actual process or risks clearly.",
  },

  {
    name: "Extreme Certainty",
    level: "Medium",
    optimizationOnly: false,
    keywords: [
      "always works",
      "will always work",
      "never fails",
      "will never fail",
      "works for everyone",
      "works for anybody",
      "guaranteed to work",
      "guaranteed to succeed",
      "guaranteed success",
      "you cannot lose",
      "you can't lose",
      "you will definitely win",
      "you will definitely succeed",
      "there is no way to fail",
      "impossible to fail",
    ],
    explanation:
      "Absolute certainty can make claims sound stronger than the available evidence supports.",
    direction:
      "Use qualified language and avoid presenting uncertain outcomes as guaranteed.",
  },
];

const reducingContextWords = [
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
  "no one can",
  "nobody can",
  "shouldn't",
  "shouldnt",
  "against",
  "debunk",
  "debunking",
  "myth",
  "myths",
  "fake",
  "fake claim",
  "false claim",
  "criticism",
  "criticize",
  "criticising",
  "criticizing",
];

function findMatches(text: string, phrase: string): Match[] {
  const matches: Match[] = [];

  const lowerText = text.toLowerCase();
  const lowerPhrase = phrase.toLowerCase();

  if (!lowerPhrase) {
    return matches;
  }

  let startIndex = 0;

  while (true) {
    const index = lowerText.indexOf(lowerPhrase, startIndex);

    if (index === -1) {
      break;
    }

    matches.push({
      phrase,
      start: index,
      end: index + lowerPhrase.length,
    });

    startIndex = index + lowerPhrase.length;
  }

  return matches;
}

function removeOverlappingMatches(
  matches: Match[],
): Match[] {
  const sorted = [...matches].sort((a, b) => {
    if (a.start !== b.start) {
      return a.start - b.start;
    }

    return b.phrase.length - a.phrase.length;
  });

  const result: Match[] = [];

  for (const match of sorted) {
    const overlaps = result.some(
      (existing) =>
        match.start < existing.end &&
        match.end > existing.start,
    );

    if (!overlaps) {
      result.push(match);
    }
  }

  return result.sort((a, b) => a.start - b.start);
}

function hasReducingContext(
  text: string,
  index: number,
): boolean {
  const previousText = text
    .slice(Math.max(0, index - 100), index)
    .toLowerCase();

  return reducingContextWords.some((word) =>
    previousText.includes(word),
  );
}

export function analyzeContent(
  text: string,
): AnalysisResult {
  const allRiskItems: {
    category: RiskCategory;
    match: Match;
  }[] = [];

  for (const category of riskCategories) {
    for (const keyword of category.keywords) {
      const matches = findMatches(text, keyword);

      for (const match of matches) {
        allRiskItems.push({
          category,
          match,
        });
      }
    }
  }

  const allPatternItems: {
    category: PatternCategory;
    match: Match;
  }[] = [];

  for (const category of patternCategories) {
    for (const keyword of category.keywords) {
      const matches = findMatches(text, keyword);

      for (const match of matches) {
        allPatternItems.push({
          category,
          match,
        });
      }
    }
  }

  const uniqueRiskMatches = removeOverlappingMatches(
    allRiskItems.map((item) => item.match),
  );

  const uniquePatternMatches =
    removeOverlappingMatches(
      allPatternItems.map((item) => item.match),
    );

  const activeRiskMatches =
    uniqueRiskMatches.filter(
      (match) =>
        !hasReducingContext(text, match.start),
    );

  const contextualRiskMatches =
    uniqueRiskMatches.filter(
      (match) =>
        hasReducingContext(text, match.start),
    );

  const activePatternMatches =
    uniquePatternMatches.filter(
      (match) =>
        !hasReducingContext(text, match.start),
    );

  const contextualPatternMatches =
    uniquePatternMatches.filter(
      (match) =>
        hasReducingContext(text, match.start),
    );

  const riskMatches: {
    category: RiskCategory | PatternCategory;
    matches: Match[];
  }[] = [];

  for (const category of riskCategories) {
    const matches = activeRiskMatches.filter(
      (match) =>
        allRiskItems.some(
          (item) =>
            item.category.name === category.name &&
            item.match.start === match.start &&
            item.match.end === match.end,
        ),
    );

    if (matches.length > 0) {
      riskMatches.push({
        category,
        matches,
      });
    }
  }

  const optimizationMatches: {
    category: PatternCategory;
    matches: Match[];
  }[] = [];

  for (const category of patternCategories) {
    const matches = activePatternMatches.filter(
      (match) =>
        allPatternItems.some(
          (item) =>
            item.category.name === category.name &&
            item.match.start === match.start &&
            item.match.end === match.end,
        ),
    );

    if (matches.length === 0) {
      continue;
    }

    if (category.optimizationOnly === true) {
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

  let score = 0;

  for (const item of riskMatches) {
    if (item.category.level === "High") {
      score += Math.min(
        40,
        30 + (item.matches.length - 1) * 5,
      );
    } else {
      score += Math.min(
        20,
        15 + (item.matches.length - 1) * 3,
      );
    }
  }

  score = Math.min(100, score);

  let risk: RiskLevel = "Low";

  if (score >= 60) {
    risk = "High";
  } else if (score >= 20) {
    risk = "Medium";
  }

  const contextualMatches = removeOverlappingMatches([
    ...contextualRiskMatches,
    ...contextualPatternMatches,
  ]);

  return {
    score,
    risk,
    riskMatches,
    optimizationMatches,
    contextualRiskMatches: contextualMatches,
  };
}