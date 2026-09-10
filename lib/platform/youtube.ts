export type YouTubePlatformReview = {
  level: "Low" | "Medium" | "High";
  title: string;
  summary: string;
  guidance: string[];
};

export type YouTubePlatformInput = {
  risk: "Low" | "Medium" | "High";
  score: number;
  context: string;
  intent: string;
  claimTypes: string[];
  riskCategories: string[];
};

const HIGH_RISK_CATEGORIES = new Set([
  "Scam & Fraud",
  "Drugs",
  "Violence",
  "Adult Content",
  "Hate & Harassment",
]);

const SENSITIVE_CLAIM_TYPES = new Set([
  "Health",
  "Financial",
  "Income",
  "Performance",
]);

const MONETIZATION_SENSITIVE_CLAIMS = new Set([
  "Health",
  "Financial",
  "Income",
  "Performance",
  "Product",
  "Scientific",
  "Legal",
  "Safety",
]);

function getPlatformLevel(
  input: YouTubePlatformInput
): "Low" | "Medium" | "High" {
  if (
    input.risk === "High" ||
    input.riskCategories.some((category) =>
      HIGH_RISK_CATEGORIES.has(category)
    )
  ) {
    return "High";
  }

  if (
    input.risk === "Medium" ||
    input.claimTypes.some((claim) =>
      SENSITIVE_CLAIM_TYPES.has(claim)
    )
  ) {
    return "Medium";
  }

  return "Low";
}

function buildGuidance(
  input: YouTubePlatformInput,
  level: "Low" | "Medium" | "High"
): string[] {
  const guidance: string[] = [];

  if (
    input.claimTypes.includes("Health") ||
    input.claimTypes.includes("Performance")
  ) {
    guidance.push(
      "Use qualified, evidence-based language for health or performance claims."
    );
  }

  if (
    input.claimTypes.includes("Financial") ||
    input.claimTypes.includes("Income")
  ) {
    guidance.push(
      "Avoid presenting financial outcomes, returns, or income as guaranteed."
    );
  }

  if (
    input.context === "Warning" ||
    input.context === "Debunking" ||
    input.context === "Educational" ||
    input.context === "News Reporting" ||
    input.context === "Criticism"
  ) {
    guidance.push(
      "Make the educational, reporting, warning, or critical context clear in the video, title, description, or surrounding content."
    );
  }

  if (
    input.intent === "Promote" ||
    input.intent === "Persuade" ||
    input.intent === "Sell"
  ) {
    guidance.push(
      "Review promotional wording carefully and avoid unsupported promises, guarantees, or misleading outcomes."
    );
  }

  if (
    input.claimTypes.some((claim) =>
      MONETIZATION_SENSITIVE_CLAIMS.has(claim)
    )
  ) {
    guidance.push(
      "Consider adding clear qualifications, supporting evidence, or appropriate context for claims that may affect monetization review."
    );
  }

  if (input.riskCategories.includes("Quick Wealth / Easy Money")) {
    guidance.push(
      "Avoid framing income or financial results as unusually easy, fast, or certain."
    );
  }

  if (input.riskCategories.includes("Extreme Certainty")) {
    guidance.push(
      "Replace absolute statements with more precise and supportable language where appropriate."
    );
  }

  if (level === "High") {
    guidance.push(
      "Consider revising or removing the high-risk portion before publishing."
    );
  } else if (level === "Medium") {
    guidance.push(
      "Consider adding context, qualifications, or supporting evidence before publishing."
    );
  }

  if (guidance.length === 0) {
    guidance.push(
      "No additional YouTube-specific guidance is currently indicated."
    );
  }

  return guidance;
}

export function reviewYouTubeContent(
  input: YouTubePlatformInput
): YouTubePlatformReview {
  const level = getPlatformLevel(input);

  if (level === "High") {
    return {
      level,
      title: "Additional YouTube Review Recommended",
      summary:
        "This content contains signals that may receive additional scrutiny on YouTube, including potential monetization or policy-related concerns.",
      guidance: buildGuidance(input, level),
    };
  }

  if (level === "Medium") {
    return {
      level,
      title: "Review Before Publishing",
      summary:
        "This content contains claims or patterns that may benefit from additional context, qualification, or evidence before publication on YouTube.",
      guidance: buildGuidance(input, level),
    };
  }

  return {
    level,
    title: "No Major YouTube Concerns Detected",
    summary:
      "No major YouTube-specific concerns are indicated by the current analysis.",
    guidance: buildGuidance(input, level),
  };
}