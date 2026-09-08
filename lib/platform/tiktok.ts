export type TikTokPlatformReview = {
level: "Low" | "Medium" | "High";
title: string;
summary: string;
guidance: string[];
};

export type TikTokPlatformInput = {
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

function getPlatformLevel(
input: TikTokPlatformInput
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
input: TikTokPlatformInput,
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
"Make the educational, reporting, warning, or critical context clear in the surrounding content."
);
}

if (
input.intent === "Promote" ||
input.intent === "Persuade" ||
input.intent === "Sell"
) {
guidance.push(
"Review promotional wording carefully and avoid unsupported promises or guarantees."
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
"No additional TikTok-specific guidance is currently indicated."
);
}

return guidance;
}

export function reviewTikTokContent(
input: TikTokPlatformInput
): TikTokPlatformReview {
const level = getPlatformLevel(input);

if (level === "High") {
return {
level,
title: "Additional TikTok Review Recommended",
summary:
"This content contains signals that may receive additional scrutiny on TikTok.",
guidance: buildGuidance(input, level),
};
}

if (level === "Medium") {
return {
level,
title: "Review Before Publishing",
summary:
"This content contains claims or patterns that may benefit from additional context or qualification on TikTok.",
guidance: buildGuidance(input, level),
};
}

return {
level,
title: "No Major TikTok Concerns Detected",
summary:
"No major TikTok-specific concerns are indicated by the current analysis.",
guidance: buildGuidance(input, level),
};
}
