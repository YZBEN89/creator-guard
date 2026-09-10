"use client";

import { useEffect, useState } from "react";
import {
  analyzeContent,
  type AnalysisResult,
  type RiskLevel,
} from "@/lib/analyzer";
import {
  reviewTikTokContent,
  type TikTokPlatformReview,
} from "@/lib/platform/tiktok";

export default function TikTokCheckerPage() {
  const [text, setText] = useState("");
  const [result, setResult] =
    useState<AnalysisResult | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const content = params.get("content");

    if (content && content.trim()) {
      setText(content);
      setResult(analyzeContent(content));
    }
  }, []);

  const platformReview: TikTokPlatformReview | null =
    result
      ? reviewTikTokContent({
          risk: result.risk,
          score: result.score,
          context: result.context.primary,
          intent: result.intent.primary,
          claimTypes: result.claims.types,
          riskCategories: result.riskMatches.map(
            (item) => item.category.name
          ),
        })
      : null;

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

    window.history.replaceState(
      {},
      "",
      window.location.pathname
    );
  };

  const riskBadgeClass = (level: RiskLevel) => {
    if (level === "High") {
      return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200";
    }

    if (level === "Medium") {
      return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";
    }

    return "bg-zinc-100 text-zinc-600 ring-1 ring-inset ring-zinc-200";
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

  const scoreLabel = () => {
    if (!result) return "";

    if (result.risk === "High") {
      return "Higher level of review recommended";
    }

    if (result.risk === "Medium") {
      return "Some content areas may need review";
    }

    return "No significant risk signals detected";
  };

  const riskDimensionDescription = (
    dimension: string
  ) => {
    const descriptions: Record<string, string> = {
      Financial:
        "Financial claims, investment language, and monetary outcomes.",
      Deception:
        "Potentially misleading, exaggerated, or deceptive claims.",
      Health:
        "Health, medical, treatment, disease, or wellness-related claims.",
      Safety:
        "Content involving potentially dangerous behavior or safety concerns.",
      Violence:
        "References to violence, threats, or physical harm.",
      Adult:
        "Sexual or adult-oriented content signals.",
      Drugs:
        "References to illegal substances or drug-related activity.",
      Hate:
        "Potentially hateful, abusive, or targeted language.",
      Misinformation:
        "Claims that may require additional factual verification.",
      Advertising:
        "Promotional or advertising-related risk signals.",
      Platform:
        "Patterns that may receive additional platform-level scrutiny.",
    };

    return (
      descriptions[dimension] ??
      "A detected risk area within the current analysis."
    );
  };

  const publishSuggestions: string[] = [];

  if (result) {
    if (result.risk === "High") {
      publishSuggestions.push(
        "Review or remove the high-risk portion before publishing."
      );
    }

    if (
      result.riskMatches.some(
        (item) => item.category.name === "Drugs"
      )
    ) {
      publishSuggestions.push(
        "Avoid providing instructions or details that could facilitate illegal activity."
      );
    }

    if (
      result.claims.types.includes("Financial")
    ) {
      publishSuggestions.push(
        "Avoid guaranteed returns, guaranteed profit, or other statements that present financial outcomes as certain."
      );
    }

    if (
      result.claims.types.includes("Health")
    ) {
      publishSuggestions.push(
        "Use evidence-based language and avoid presenting treatment, cure, or health outcomes as certain."
      );
    }

    if (
      result.optimizationMatches.length > 0
    ) {
      publishSuggestions.push(
        "Consider replacing exaggerated, promotional, or high-pressure language with more specific and realistic wording."
      );
    }

    if (
      result.contextualRiskMatches.length > 0
    ) {
      publishSuggestions.push(
        "Keep the educational, reporting, warning, or critical context clear so the purpose of the content is easy to understand."
      );
    }

    if (publishSuggestions.length === 0) {
      publishSuggestions.push(
        "Use specific and realistic descriptions whenever possible."
      );

      publishSuggestions.push(
        "Review the full context of your content rather than relying only on individual keywords."
      );
    }
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-xl font-semibold tracking-tight"
          >
            Creatoriva
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
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-500">
                    Overall Assessment
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl font-semibold tracking-tight">
                      {result.risk} Risk
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${riskBadgeClass(
                        result.risk
                      )}`}
                    >
                      {result.score}/100
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    {scoreLabel()}
                  </p>
                </div>

                <div className="w-full lg:max-w-sm">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-zinc-700">
                      Risk Score
                    </span>

                    <span className="font-semibold text-zinc-900">
                      {result.score}/100
                    </span>
                  </div>

                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className={`h-full rounded-full transition-all ${scoreBarClass()}`}
                      style={{
                        width: `${result.score}%`,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex justify-between text-[11px] text-zinc-400">
                    <span>Lower</span>
                    <span>Higher</span>
                  </div>
                </div>
              </div>
            </section>

            {/* TikTok Platform Review */}
            {platformReview && (
              <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-500">
                      TikTok Platform Review
                    </p>

                    <h2 className="mt-2 text-xl font-semibold tracking-tight">
                      {platformReview.title}
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
                      {platformReview.summary}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                      platformReview.level === "High"
                        ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200"
                        : platformReview.level === "Medium"
                          ? "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200"
                          : "bg-zinc-100 text-zinc-600 ring-1 ring-inset ring-zinc-200"
                    }`}
                  >
                    {platformReview.level} Review
                  </span>
                </div>

                {platformReview.guidance.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                    <p className="text-sm font-medium">
                      Platform Guidance
                    </p>

                    <ul className="mt-3 space-y-3 text-sm leading-6 text-zinc-600">
                      {platformReview.guidance.map(
                        (item) => (
                          <li
                            key={item}
                            className="flex gap-3"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />

                            <span>{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* Analysis Overview */}
            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6">
                <p className="text-sm font-medium text-zinc-500">
                  Analysis Overview
                </p>

                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  Context, intent, and claims
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                  The analysis looks beyond individual
                  keywords to identify the broader meaning
                  and characteristics of your content.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {/* Context */}
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Context
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {result.context.primary}
                  </p>

                  {result.context.signals.length > 0 ? (
                    <div className="mt-4">
                      <p className="mb-2 text-xs text-zinc-400">
                        Supporting signals
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {result.context.signals
                          .slice(0, 4)
                          .map((signal) => (
                            <span
                              key={signal}
                              className="rounded-lg bg-white px-2.5 py-1.5 text-xs text-zinc-600 ring-1 ring-inset ring-zinc-200"
                            >
                              {signal}
                            </span>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <p className="mt-4 text-xs text-zinc-400">
                      No additional context signals detected.
                    </p>
                  )}
                </div>

                {/* Intent */}
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Intent
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {result.intent.primary}
                  </p>

                  {result.intent.signals.length > 0 ? (
                    <div className="mt-4">
                      <p className="mb-2 text-xs text-zinc-400">
                        Supporting signals
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {result.intent.signals
                          .slice(0, 4)
                          .map((signal) => (
                            <span
                              key={signal}
                              className="rounded-lg bg-white px-2.5 py-1.5 text-xs text-zinc-600 ring-1 ring-inset ring-zinc-200"
                            >
                              {signal}
                            </span>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <p className="mt-4 text-xs text-zinc-400">
                      No additional intent signals detected.
                    </p>
                  )}
                </div>

                {/* Claims */}
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Claims
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {result.claims.types.includes("None")
                      ? "No claims detected"
                      : `${result.claims.types.length} ${
                          result.claims.types.length === 1
                            ? "type"
                            : "types"
                        } detected`}
                  </p>

                  {result.claims.types.length > 0 ? (
                    <div className="mt-4">
                      <p className="mb-2 text-xs text-zinc-400">
                        Supporting signals
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {result.claims.types.map((claim) => (
                          <span
                            key={claim}
                            className="rounded-lg bg-white px-2.5 py-1.5 text-xs text-zinc-600 ring-1 ring-inset ring-zinc-200"
                          >
                            {claim}
                          </span>
                        ))}

                        {result.claims.signals
                          .slice(0, 4)
                          .map((signal) => (
                            <span
                              key={signal}
                              className="rounded-lg bg-white px-2.5 py-1.5 text-xs text-zinc-600 ring-1 ring-inset ring-zinc-200"
                            >
                              {signal}
                            </span>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <p className="mt-4 text-xs text-zinc-400">
                      No additional claim signals detected.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Detected Issues */}
            {result.riskMatches.length > 0 && (
              <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                  <p className="text-sm font-medium text-zinc-500">
                    Risk Signals
                  </p>

                  <h2 className="mt-1 text-xl font-semibold tracking-tight">
                    Detected Issues
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    These detected categories contribute
                    to the current risk score.
                  </p>
                </div>

                <div className="space-y-5">
                  {result.riskMatches.map(
                    (item) => (
                      <div
                        key={item.category.name}
                        className="rounded-2xl border border-zinc-200 p-5"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="font-semibold">
                            {item.category.name}
                          </h3>

                          <span
                            className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${riskBadgeClass(
                              item.category.level
                            )}`}
                          >
                            {item.category.level} Risk
                          </span>
                        </div>

                        <div className="mt-5">
                          <p className="text-sm font-medium">
                            Why this matters
                          </p>

                          <p className="mt-2 text-sm leading-6 text-zinc-600">
                            {item.reason}
                          </p>
                        </div>

                        <div className="mt-5">
                          <p className="text-sm font-medium">
                            Detected phrase
                            {item.matches.length !== 1
                              ? "s"
                              : ""}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {item.matches.map(
                              (match) => (
                                <span
                                  key={`${match.start}-${match.end}-${match.phrase}`}
                                  className="rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-700"
                                >
                                  {match.phrase}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        <div className="mt-5">
                          <p className="text-sm font-medium">
                            What to do
                          </p>

                          <p className="mt-2 text-sm leading-6 text-zinc-600">
                            {item.category.direction}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* Risk Dimensions */}
            {result.riskDimensions.length > 0 && (
              <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                  <p className="text-sm font-medium text-zinc-500">
                    Risk Profile
                  </p>

                  <h2 className="mt-1 text-xl font-semibold tracking-tight">
                    Risk Dimensions
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                    A breakdown of the main risk areas
                    identified across your content.
                  </p>
                </div>

                <div className="grid gap-3">
                  {result.riskDimensions.map(
                    (item) => (
                      <div
                        key={item.dimension}
                        className="rounded-2xl border border-zinc-200 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-semibold">
                                {item.dimension}
                              </span>

                              {item.score >= 60 && (
                                <>
                                  <span
                                    className="text-xs text-zinc-300"
                                    aria-hidden="true"
                                  >
                                    •
                                  </span>

                                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-700 ring-1 ring-inset ring-red-200">
                                    Elevated
                                  </span>
                                </>
                              )}

                              {item.score >= 20 &&
                                item.score < 60 && (
                                  <>
                                    <span
                                      className="text-xs text-zinc-300"
                                      aria-hidden="true"
                                    >
                                      •
                                    </span>

                                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 ring-1 ring-inset ring-amber-200">
                                      Moderate
                                    </span>
                                  </>
                                )}
                            </div>

                            <p className="mt-1 text-xs leading-5 text-zinc-400">
                              {riskDimensionDescription(
                                item.dimension
                              )}
                            </p>
                          </div>

                          <span className="shrink-0 text-sm font-semibold text-zinc-900">
                            {item.score}/100
                          </span>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-100">
                          <div
                            className={`h-full rounded-full transition-all ${
                              item.score >= 60
                                ? "bg-red-500"
                                : item.score >= 20
                                  ? "bg-amber-500"
                                  : "bg-zinc-400"
                            }`}
                            style={{
                              width: `${item.score}%`,
                            }}
                          />
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
                    <div>
                      <p className="text-sm font-medium text-zinc-500">
                        Content Quality
                      </p>

                      <h2 className="mt-1 text-xl font-semibold tracking-tight">
                        Content Optimization
                      </h2>
                    </div>

                    <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-200">
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
                    (item) => (
                      <div
                        key={item.category.name}
                        className="rounded-2xl border border-zinc-200 p-5"
                      >
                        <h3 className="font-semibold">
                          {item.category.name}
                        </h3>

                        <div className="mt-5">
                          <p className="text-sm font-medium">
                            Detected phrases
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {item.matches.map(
                              (match) => (
                                <span
                                  key={`${match.start}-${match.end}-${match.phrase}`}
                                  className="rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-700"
                                >
                                  {match.phrase}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        <div className="mt-5">
                          <p className="text-sm font-medium">
                            General guidance
                          </p>

                          <p className="mt-2 text-sm leading-6 text-zinc-600">
                            {item.category.direction}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* Context Review */}
            {result.contextualRiskMatches.length >
              0 && (
              <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-500">
                      Contextual Signals
                    </p>

                    <h2 className="mt-1 text-xl font-semibold tracking-tight">
                      Context Review
                    </h2>
                  </div>

                  <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-200">
                    Not included in score
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Some detected phrases appeared in a
                  context that may reduce their apparent
                  risk, such as warnings, criticism,
                  debunking, news reporting, or educational
                  discussion.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {result.contextualRiskMatches.map(
                    (match) => (
                      <span
                        key={`${match.start}-${match.end}-${match.phrase}`}
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
            {result.riskMatches.length === 0 &&
              result.optimizationMatches.length ===
                0 &&
              result.contextualRiskMatches.length ===
                0 && (
                <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
                  <p className="text-sm font-medium text-emerald-700">
                    Content Review
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-emerald-900">
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
              <p className="text-sm font-medium text-zinc-500">
                Before You Publish
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                General Suggestions
              </h2>

              <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-600">
                {publishSuggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="flex gap-3"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />

                    <span>{suggestion}</span>
                  </li>
                ))}
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
            © 2026 Creatoriva. All rights reserved.
          </p>

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
    </main>
  );
}