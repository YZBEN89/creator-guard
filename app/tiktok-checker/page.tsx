"use client";

import { useState } from "react";

type RiskLevel = "High" | "Medium";

type RiskCategory = {
  name: string;
  level: RiskLevel;
  keywords: string[];
  explanation: string;
  suggestion: string;
};

type PatternCategory = {
  name: string;
  level: RiskLevel;
  patterns: string[];
  explanation: string;
  suggestion: string;
  optimizationOnly?: boolean;
};

type Match = {
  category: string;
  level: RiskLevel;
  phrase: string;
  explanation: string;
  suggestion: string;
  source: "keyword" | "pattern";
  optimizationOnly?: boolean;
  start: number;
  end: number;
};

type AnalysisResult = {
  risk: "Low" | "Medium" | "High";
  score: number;
  matches: Match[];
  reducedMatches: Match[];
  optimizationMatches: Match[];
};

const riskCategories: RiskCategory[] = [
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
      "Financial promises that imply guaranteed profits, easy money, or no investment risk may create additional review and monetization concerns.",
    suggestion:
      "Use realistic language and clearly describe uncertainty, risks, and limitations.",
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
      "Requests for money, credentials, or suspicious financial opportunities can resemble scam or fraud-related content.",
    suggestion:
      "Avoid requesting sensitive information or presenting suspicious financial offers as legitimate opportunities.",
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
      "Absolute or highly certain claims can make content appear misleading or unrealistic.",
    suggestion:
      "Use qualified language and avoid presenting uncertain outcomes as guaranteed results.",
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
      "Medical claims involving guaranteed cures, instant healing, or absolute safety may create additional content and monetization concerns.",
    suggestion:
      "Use evidence-based and qualified language when discussing health or medical subjects.",
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
      "Rapid or guaranteed weight-loss claims may be viewed as exaggerated or potentially misleading.",
    suggestion:
      "Avoid guaranteed outcomes and use realistic, responsible descriptions of weight-loss results.",
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
      "Gambling-related content can be subject to additional platform and advertising restrictions.",
    suggestion:
      "Avoid promotional or encouraging language around gambling and clearly identify educational or informational context.",
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
      "Content promoting or facilitating illegal drug activity can create serious content-safety concerns.",
    suggestion:
      "For educational or news content, keep the discussion factual and avoid promotional instructions.",
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
      "Threats, encouragement of violence, or violent language may create significant content-safety concerns.",
    suggestion:
      "Keep discussions of violence contextual and avoid threats, glorification, or encouragement.",
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
      "Explicit or strongly sexual content can create significant content-suitability and monetization concerns.",
    suggestion:
      "Use neutral, educational, or contextual language when discussing mature subjects.",
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
      "Hateful, degrading, or threatening language can create significant content-safety concerns.",
    suggestion:
      "Keep discussions respectful and avoid attacking people or groups.",
  },
];

const patternCategories: PatternCategory[] = [
  {
    name: "Exaggerated Promise",
    level: "Medium",
    patterns: [
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
      "The wording may overstate the speed or certainty of a result and make content appear less credible.",
    suggestion:
      "Describe realistic outcomes and timeframes instead of promising dramatic results.",
    optimizationOnly: true,
  },

  {
    name: "Clickbait",
    level: "Medium",
    patterns: [
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
      "The wording creates curiosity or pressure to click, but it does not necessarily indicate a direct safety issue.",
    suggestion:
      "Consider using a more specific title or description that clearly communicates what viewers will learn.",
    optimizationOnly: true,
  },

  {
    name: "Promotional Language",
    level: "Medium",
    patterns: [
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
      "Strong promotional wording can make content feel overly sales-driven or exaggerated.",
    suggestion:
      "Use specific benefits and factual descriptions instead of broad superlatives.",
    optimizationOnly: true,
  },

  {
    name: "Urgency / Pressure",
    level: "Medium",
    patterns: [
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
      "Urgency-based language can create unnecessary pressure, particularly in promotional content.",
    suggestion:
      "Give viewers enough information to make a decision without relying heavily on pressure.",
    optimizationOnly: true,
  },

  {
    name: "Quick Wealth / Easy Money",
    level: "High",
    patterns: [
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
      "Claims suggesting unusually easy or rapid wealth can be misleading and may create financial-content concerns.",
    suggestion:
      "Use realistic expectations and avoid implying that substantial income is effortless or guaranteed.",
  },

  {
    name: "Extreme Certainty",
    level: "Medium",
    patterns: [
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
      "Absolute statements can overstate certainty and make claims appear misleading or unrealistic.",
    suggestion:
      "Use qualified language and acknowledge that results can vary depending on circumstances.",
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

function hasReducingContext(text: string, index: number) {
  const before = text
    .slice(Math.max(0, index - 100), index)
    .toLowerCase();

  return reducingContextWords.some((word) =>
    before.includes(word)
  );
}

function findMatches(
  text: string,
  category: RiskCategory | PatternCategory,
  source: "keyword" | "pattern"
): Match[] {
  const phrases =
    "keywords" in category ? category.keywords : category.patterns;

  const lowerText = text.toLowerCase();
  const matches: Match[] = [];

  for (const phrase of phrases) {
    const lowerPhrase = phrase.toLowerCase();
    let startIndex = 0;

    while (startIndex < lowerText.length) {
      const index = lowerText.indexOf(
        lowerPhrase,
        startIndex
      );

      if (index === -1) {
        break;
      }

      matches.push({
        category: category.name,
        level: category.level,
        phrase: text.slice(
          index,
          index + phrase.length
        ),
        explanation: category.explanation,
        suggestion: category.suggestion,
        source,
        optimizationOnly:
          "optimizationOnly" in category
            ? category.optimizationOnly
            : false,
        start: index,
        end: index + phrase.length,
      });

      startIndex = index + lowerPhrase.length;
    }
  }

  return matches;
}

function removeOverlappingMatches(matches: Match[]) {
  const sorted = [...matches].sort((a, b) => {
    if (a.start !== b.start) {
      return a.start - b.start;
    }

    return b.phrase.length - a.phrase.length;
  });

  const selected: Match[] = [];

  for (const match of sorted) {
    const overlaps = selected.some(
      (existing) =>
        match.start < existing.end &&
        match.end > existing.start
    );

    if (!overlaps) {
      selected.push(match);
    }
  }

  return selected.sort((a, b) => a.start - b.start);
}

function analyzeContent(text: string): AnalysisResult {
  /*
   * STEP 1
   * Detect all real safety/content risks first.
   *
   * Optimization-only patterns never hide a real risk.
   */
  const keywordMatches = riskCategories.flatMap(
    (category) =>
      findMatches(text, category, "keyword")
  );

  const scoringPatternMatches = patternCategories
    .filter(
      (category) => !category.optimizationOnly
    )
    .flatMap((category) =>
      findMatches(text, category, "pattern")
    );

  const realRiskMatches = removeOverlappingMatches([
    ...keywordMatches,
    ...scoringPatternMatches,
  ]);

  /*
   * STEP 2
   * Separate matches affected by contextual warning language.
   */
  const activeRiskMatches: Match[] = [];
  const reducedMatches: Match[] = [];

  for (const match of realRiskMatches) {
    if (
      hasReducingContext(text, match.start)
    ) {
      reducedMatches.push(match);
    } else {
      activeRiskMatches.push(match);
    }
  }

  /*
   * STEP 3
   * Detect optimization-only patterns.
   *
   * They do NOT affect the score.
   *
   * If an optimization phrase overlaps with
   * a real risk phrase, the real risk takes priority.
   */
  const optimizationRawMatches = patternCategories
    .filter(
      (category) => category.optimizationOnly
    )
    .flatMap((category) =>
      findMatches(text, category, "pattern")
    )
    .filter(
      (match) =>
        !hasReducingContext(
          text,
          match.start
        )
    );

  const optimizationMatches =
    removeOverlappingMatches(
      optimizationRawMatches.filter(
        (optimizationMatch) =>
          !realRiskMatches.some(
            (riskMatch) =>
              optimizationMatch.start <
                riskMatch.end &&
              optimizationMatch.end >
                riskMatch.start
          )
      )
    );

  /*
   * STEP 4
   * Calculate score.
   *
   * High risk:
   * first = 30
   * each additional = +5
   * maximum contribution = 40
   *
   * Medium risk:
   * first = 15
   * each additional = +3
   * maximum contribution = 20
   */
  const highMatches =
    activeRiskMatches.filter(
      (match) => match.level === "High"
    );

  const mediumMatches =
    activeRiskMatches.filter(
      (match) => match.level === "Medium"
    );

  let score = 0;

  if (highMatches.length > 0) {
    score += 30;

    score += Math.min(
      10,
      (highMatches.length - 1) * 5
    );
  }

  if (mediumMatches.length > 0) {
    score += 15;

    score += Math.min(
      5,
      (mediumMatches.length - 1) * 3
    );
  }

  score = Math.min(100, score);

  let risk: "Low" | "Medium" | "High" =
    "Low";

  if (score >= 60) {
    risk = "High";
  } else if (score >= 20) {
    risk = "Medium";
  }

  return {
    risk,
    score,
    matches: activeRiskMatches,
    reducedMatches,
    optimizationMatches,
  };
}

export default function TikTokCheckerPage() {
  const [text, setText] = useState("");
  const [result, setResult] =
    useState<AnalysisResult | null>(null);

  const handleCheck = () => {
    if (!text.trim()) {
      setResult(null);
      return;
    }

    setResult(analyzeContent(text));
  };

  const handleClear = () => {
    setText("");
    setResult(null);
  };

  const riskBadgeClass = (
    level: RiskLevel
  ) => {
    if (level === "High") {
      return "bg-red-100 text-red-700";
    }

    return "bg-amber-100 text-amber-700";
  };

  const scoreBarClass = () => {
    if (!result) {
      return "bg-zinc-300";
    }

    if (result.risk === "High") {
      return "bg-red-500";
    }

    if (result.risk === "Medium") {
      return "bg-amber-500";
    }

    return "bg-emerald-500";
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-xl font-semibold tracking-tight"
          >
            CreatorGuard
          </a>

          <nav className="flex items-center gap-6 text-sm text-zinc-600">
            <a
              href="/"
              className="transition hover:text-black"
            >
              Home
            </a>

            <a
              href="/#tools"
              className="transition hover:text-black"
            >
              Tools
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-10 pt-16 text-center">
        <div className="mb-4 inline-flex rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700">
          TikTok Content Checker
        </div>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Review your content before you publish.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-600">
          Check captions, scripts, and promotional
          content for potentially sensitive language
          and content-related risks.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Your Content
            </h2>

            <button
              onClick={handleClear}
              className="text-sm text-zinc-500 transition hover:text-black"
            >
              Clear
            </button>
          </div>

          <textarea
            value={text}
            onChange={(event) =>
              setText(event.target.value)
            }
            maxLength={10000}
            rows={12}
            placeholder="Paste your TikTok caption, script, or promotional content here..."
            className="w-full resize-y rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-7 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
          />

          <div className="mt-3 flex flex-col justify-between gap-2 text-xs text-zinc-500 sm:flex-row sm:items-center">
            <span>
              {text.length.toLocaleString()} / 10,000
              characters
            </span>

            <span>
              Long-form content supported
            </span>
          </div>

          <button
            onClick={handleCheck}
            disabled={!text.trim()}
            className="mt-6 w-full rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            Check Content
          </button>
        </div>

        {result && (
          <div className="mt-8 space-y-6">
            {/* Overall Assessment */}
            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-500">
                    Overall Assessment
                  </p>

                  <h2 className="mt-2 text-3xl font-semibold">
                    {result.risk} Risk
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    Based on detected risk patterns.
                  </p>
                </div>

                <div className="min-w-[180px]">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                      Risk Score
                    </span>

                    <span className="font-semibold">
                      {result.score}/100
                    </span>
                  </div>

                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className={`h-full rounded-full transition-all ${scoreBarClass()}`}
                      style={{
                        width: `${result.score}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Detected Issues */}
            {result.matches.length > 0 && (
              <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    Detected Issues
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    These detected patterns contribute
                    to the current risk score.
                  </p>
                </div>

                <div className="space-y-5">
                  {result.matches.map(
                    (match, index) => (
                      <div
                        key={`${match.category}-${match.start}-${index}`}
                        className="rounded-2xl border border-zinc-200 p-5"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="font-semibold">
                            {match.category}
                          </h3>

                          <span
                            className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${riskBadgeClass(
                              match.level
                            )}`}
                          >
                            {match.level} Risk
                          </span>
                        </div>

                        <div className="mt-5">
                          <p className="text-sm font-medium">
                            Why this may be risky
                          </p>

                          <p className="mt-2 text-sm leading-6 text-zinc-600">
                            {match.explanation}
                          </p>
                        </div>

                        <div className="mt-5">
                          <p className="text-sm font-medium">
                            Detected phrase
                          </p>

                          <div className="mt-2">
                            <span className="inline-block rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-700">
                              {match.phrase}
                            </span>
                          </div>
                        </div>

                        <div className="mt-5">
                          <p className="text-sm font-medium">
                            Suggested direction
                          </p>

                          <p className="mt-2 text-sm leading-6 text-zinc-600">
                            {match.suggestion}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* Content Optimization */}
            {result.optimizationMatches.length >
              0 && (
              <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-semibold">
                      Content Optimization
                    </h2>

                    <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                      Does not affect score
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    These expressions are not treated as
                    direct safety risks, but improving them
                    may make your content clearer and more
                    credible.
                  </p>
                </div>

                <div className="space-y-5">
                  {result.optimizationMatches.map(
                    (match, index) => (
                      <div
                        key={`${match.category}-${match.start}-${index}`}
                        className="rounded-2xl border border-zinc-200 p-5"
                      >
                        <h3 className="font-semibold">
                          {match.category}
                        </h3>

                        <div className="mt-5">
                          <p className="text-sm font-medium">
                            Detected phrase
                          </p>

                          <div className="mt-2">
                            <span className="inline-block rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-700">
                              {match.phrase}
                            </span>
                          </div>
                        </div>

                        <div className="mt-5">
                          <p className="text-sm font-medium">
                            General guidance
                          </p>

                          <p className="mt-2 text-sm leading-6 text-zinc-600">
                            {match.suggestion}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* Context Review */}
            {result.reducedMatches.length > 0 && (
              <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold">
                    Context Review
                  </h2>

                  <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                    Not included in score
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Some phrases appeared in a context that
                  may reduce their apparent risk, such as
                  warnings, criticism, or educational
                  discussion. This is a basic context signal
                  and should not be treated as a final
                  moderation decision.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {result.reducedMatches.map(
                    (match, index) => (
                      <span
                        key={`${match.category}-${match.start}-${index}`}
                        className="rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-700"
                      >
                        {match.phrase}
                      </span>
                    )
                  )}
                </div>
              </section>
            )}

            {/* No Issues */}
            {result.matches.length === 0 &&
              result.optimizationMatches.length ===
                0 &&
              result.reducedMatches.length ===
                0 && (
                <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-emerald-900">
                    No Significant Issues Detected
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-emerald-800">
                    No significant patterns from the
                    current checks were found in this
                    content.
                  </p>
                </section>
              )}

            {/* General Suggestions */}
            <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <h2 className="text-xl font-semibold">
                General Suggestions
              </h2>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600">
                <li>
                  • Avoid absolute promises or claims that
                  guarantee a specific outcome.
                </li>

                <li>
                  • Use specific and realistic descriptions
                  whenever possible.
                </li>

                <li>
                  • Avoid unnecessary urgency or pressure
                  in promotional content.
                </li>

                <li>
                  • For sensitive subjects, keep surrounding
                  context factual and clear.
                </li>

                <li>
                  • Review the full context of your content
                  rather than relying only on individual
                  keywords.
                </li>
              </ul>
            </section>

            {/* Important Note */}
            <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-amber-900">
                Important Note
              </h2>

              <p className="mt-3 text-sm leading-6 text-amber-800">
                This assessment is based on predefined
                content patterns and basic context signals.
                It is intended as general guidance and does
                not represent or guarantee the moderation,
                monetization, or advertising decisions of
                TikTok or any other platform.
              </p>
            </section>
          </div>
        )}
      </section>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 CreatorGuard. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="transition hover:text-black"
            >
              Privacy
            </a>

            <a
              href="#"
              className="transition hover:text-black"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}