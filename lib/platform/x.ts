export type XPlatformReview = {
  level: "Low" | "Medium" | "High";
  title: string;
  summary: string;
  guidance: string[];
};

export type XPlatformInput = {
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
  "Financial",
  "Income",
  "Health",
  "Performance",
]);

const FINANCIAL_CLAIM_TYPES = new Set([
  "Financial",
  "Income",
]);

function getPlatformLevel(
  input: XPlatformInput
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
  input: XPlatformInput,
  level: "Low" | "Medium" | "High"
): string[] {
  const guidance: string[] = [];

  if (
    input.claimTypes.some((claim) =>
      FINANCIAL_CLAIM_TYPES.has(claim)
    )
  ) {
    guidance.push(
      "Use careful, qualified language when discussing investments, trading, crypto, income, profits, or financial outcomes."
    );
  }

  if (
    input.claimTypes.includes("Health") ||
    input.claimTypes.includes("Performance")
  ) {
    guidance.push(
      "Avoid presenting health, wellness, treatment, or performance outcomes as guaranteed or universally applicable."
    );
  }

  if (
    input.context === "News Reporting" ||
    input.context === "Educational" ||
    input.context === "Warning" ||
    input.context === "Debunking" ||
    input.context === "Criticism"
  ) {
    guidance.push(
      "Make the reporting, educational, warning, debunking, or critical context clear so readers can distinguish discussion from endorsement."
    );
  }

  if (
    input.intent === "Promote" ||
    input.intent === "Persuade" ||
    input.intent === "Sell"
  ) {
    guidance.push(
      "Review promotional and persuasive wording carefully, especially when the post involves products, services, investments, or financial opportunities."
    );
  }

  if (
    input.riskCategories.includes(
      "Quick Wealth / Easy Money"
    )
  ) {
    guidance.push(
      "Avoid framing wealth, income, trading results, or financial success as unusually easy, fast, or certain."
    );
  }

  if (
    input.riskCategories.includes(
      "Extreme Certainty"
    )
  ) {
    guidance.push(
      "Consider replacing absolute statements with precise and supportable language."
    );
  }

  if (
    input.riskCategories.includes(
      "Deceptive or Misleading Claims"
    )
  ) {
    guidance.push(
      "Check factual claims carefully and avoid wording that could create a misleading impression about products, services, opportunities, or expected results."
    );
  }

  if (
    input.riskCategories.includes(
      "Promotional Language"
    )
  ) {
    guidance.push(
      "Keep promotional language specific and realistic, particularly when describing financial or commercial outcomes."
    );
  }

  if (
    input.riskCategories.includes(
      "Urgency / Pressure"
    )
  ) {
    guidance.push(
      "Avoid excessive urgency or pressure that could make an offer or financial opportunity appear misleading or manipulative."
    );
  }

  if (level === "High") {
    guidance.push(
      "Consider revising or removing the high-risk portion before posting."
    );
  } else if (level === "Medium") {
    guidance.push(
      "Consider adding context, qualifications, or supporting information before posting."
    );
  }

  if (guidance.length === 0) {
    guidance.push(
      "No additional X-specific guidance is currently indicated."
    );
  }

  return guidance;
}

export function reviewXContent(
  input: XPlatformInput
): XPlatformReview {
  const level = getPlatformLevel(input);

  if (level === "High") {
    return {
      level,
      title: "Additional X Review Recommended",
      summary:
        "This content contains signals that may receive additional scrutiny on X, including potential safety, policy, financial, or commercial-content concerns.",
      guidance: buildGuidance(input, level),
    };
  }

  if (level === "Medium") {
    return {
      level,
      title: "Review Before Posting",
      summary:
        "This content contains claims or patterns that may benefit from additional context, qualification, or more precise wording before posting on X.",
      guidance: buildGuidance(input, level),
    };
  }

  return {
    level,
    title: "No Major X Concerns Detected",
    summary:
      "No major X-specific concerns are indicated by the current analysis.",
    guidance: buildGuidance(input, level),
  };
}