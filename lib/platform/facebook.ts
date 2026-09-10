export type FacebookPlatformReview = {
  level: "Low" | "Medium" | "High";
  title: string;
  summary: string;
  guidance: string[];
};

export type FacebookPlatformInput = {
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

const COMMERCIAL_CLAIM_TYPES = new Set([
  "Financial",
  "Income",
  "Health",
  "Performance",
  "Product",
]);

function getPlatformLevel(
  input: FacebookPlatformInput
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
  input: FacebookPlatformInput,
  level: "Low" | "Medium" | "High"
): string[] {
  const guidance: string[] = [];

  if (
    input.claimTypes.includes("Financial") ||
    input.claimTypes.includes("Income")
  ) {
    guidance.push(
      "Avoid presenting financial results, income, profits, or returns as guaranteed or certain."
    );
  }

  if (
    input.claimTypes.includes("Health") ||
    input.claimTypes.includes("Performance")
  ) {
    guidance.push(
      "Use specific, supportable language for health, wellness, treatment, or performance claims."
    );
  }

  if (
    input.claimTypes.some((claim) =>
      COMMERCIAL_CLAIM_TYPES.has(claim)
    )
  ) {
    guidance.push(
      "When promoting products, services, or commercial opportunities, provide clear and realistic information about the offer and its expected outcomes."
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
      "Keep the educational, warning, reporting, or critical context clear so the purpose of the content is not easily misunderstood."
    );
  }

  if (
    input.intent === "Promote" ||
    input.intent === "Persuade" ||
    input.intent === "Sell"
  ) {
    guidance.push(
      "Review promotional language carefully and avoid unsupported promises, guarantees, or misleading outcomes."
    );
  }

  if (
    input.riskCategories.includes(
      "Quick Wealth / Easy Money"
    )
  ) {
    guidance.push(
      "Avoid framing financial success or income as unusually easy, fast, or certain."
    );
  }

  if (
    input.riskCategories.includes(
      "Extreme Certainty"
    )
  ) {
    guidance.push(
      "Replace absolute statements with more precise and supportable wording where appropriate."
    );
  }

  if (
    input.riskCategories.includes(
      "Promotional Language"
    )
  ) {
    guidance.push(
      "Keep promotional language specific and realistic, especially when describing products, services, or expected results."
    );
  }

  if (
    input.riskCategories.includes(
      "Urgency / Pressure"
    )
  ) {
    guidance.push(
      "Avoid excessive pressure or urgency that could make promotional content appear misleading or manipulative."
    );
  }

  if (
    input.riskCategories.includes(
      "Deceptive or Misleading Claims"
    )
  ) {
    guidance.push(
      "Review factual claims carefully and avoid wording that could create an inaccurate impression about a product, service, result, or opportunity."
    );
  }

  if (level === "High") {
    guidance.push(
      "Consider revising or removing the high-risk portion before publishing."
    );
  } else if (level === "Medium") {
    guidance.push(
      "Consider adding context, qualifications, or supporting information before publishing."
    );
  }

  if (guidance.length === 0) {
    guidance.push(
      "No additional Facebook-specific guidance is currently indicated."
    );
  }

  return guidance;
}

export function reviewFacebookContent(
  input: FacebookPlatformInput
): FacebookPlatformReview {
  const level = getPlatformLevel(input);

  if (level === "High") {
    return {
      level,
      title: "Additional Facebook Review Recommended",
      summary:
        "This content contains signals that may receive additional scrutiny on Facebook, including potential safety, policy, or commercial-content concerns.",
      guidance: buildGuidance(input, level),
    };
  }

  if (level === "Medium") {
    return {
      level,
      title: "Review Before Publishing",
      summary:
        "This content contains claims or patterns that may benefit from additional context, qualification, or more precise wording before publication on Facebook.",
      guidance: buildGuidance(input, level),
    };
  }

  return {
    level,
    title: "No Major Facebook Concerns Detected",
    summary:
      "No major Facebook-specific concerns are indicated by the current analysis.",
    guidance: buildGuidance(input, level),
  };
}