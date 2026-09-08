"use client";

import { useState } from "react";
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
  };

  const riskBadgeClass = (
    level: RiskLevel
  ) => {
    if (level === "High") {
      return "bg-red-100 text-red-700";
    }

    if (level === "Medium") {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-zinc-100 text-zinc-600";
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

  const riskDimensionLabel = (
    dimension: string
  ) => {
    return dimension;
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
                    Based on detected content patterns,
                    context, and risk signals.
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

            {/* TikTok Platform Review */}
            {platformReview && (
              <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-500">
                      TikTok Platform Review
                    </p>

                    <h2 className="mt-2 text-xl font-semibold">
                      {platformReview.title}
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
                      {platformReview.summary}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                      platformReview.level === "High"
                        ? "bg-red-100 text-red-700"
                        : platformReview.level === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-zinc-100 text-zinc-600"
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

            {/* Analysis Summary */}
            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  Analysis Summary
                </h2>

                <p className="mt-1 text-sm leading-6 text-zinc-500">
                  Signals detected from the broader context
                  of your content.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Primary Context
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {result.context.primary}
                  </p>

                  {result.context.signals.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.context.signals
                        .slice(0, 4)
                        .map((signal) => (
                          <span
                            key={signal}
                            className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600"
                          >
                            {signal}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-zinc-200 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Primary Intent
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {result.intent.primary}
                  </p>

                  {result.intent.signals.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.intent.signals
                        .slice(0, 4)
                        .map((signal) => (
                          <span
                            key={signal}
                            className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600"
                          >
                            {signal}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-zinc-200 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Claim Types
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.claims.types.map(
                      (claim) => (
                        <span
                          key={claim}
                          className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600"
                        >
                          {claim}
                        </span>
                      )
                    )}
                  </div>

                  {result.claims.signals.length > 0 && (
                    <p className="mt-3 text-xs leading-5 text-zinc-500">
                      Signals:{" "}
                      {result.claims.signals
                        .slice(0, 4)
                        .join(", ")}
                    </p>
                  )}
                </div>

                <div className="rounded-2xl border border-zinc-200 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Analysis Version
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {result.analysisVersion}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    Context, intent, claims, and risk
                    dimensions are included in this
                    analysis.
                  </p>
                </div>
              </div>
            </section>

            {/* Detected Issues */}
            {result.riskMatches.length > 0 && (
              <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    Detected Issues
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
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
                            Why this may be risky
                          </p>

                          <p className="mt-2 text-sm leading-6 text-zinc-600">
                            {item.category.explanation}
                          </p>
                        </div>

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
                            Suggested direction
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
                  <h2 className="text-xl font-semibold">
                    Risk Dimensions
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-zinc-500">
                    The main risk areas detected across
                    the content.
                  </p>
                </div>

                <div className="space-y-4">
                  {result.riskDimensions.map(
                    (item) => (
                      <div
                        key={item.dimension}
                        className="rounded-2xl border border-zinc-200 p-4"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-medium">
                            {riskDimensionLabel(
                              item.dimension
                            )}
                          </span>

                          <span className="text-sm font-semibold">
                            {item.score}/100
                          </span>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-100">
                          <div
                            className="h-full rounded-full bg-zinc-700 transition-all"
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
                  <h2 className="text-xl font-semibold">
                    Context Review
                  </h2>

                  <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
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
                  - Avoid absolute promises or claims that
                  guarantee a specific outcome.
                </li>

                <li>
                  - Use specific and realistic descriptions
                  whenever possible.
                </li>

                <li>
                  - Avoid unnecessary urgency or pressure
                  in promotional content.
                </li>

                <li>
                  - For sensitive subjects, keep surrounding
                  context factual and clear.
                </li>

                <li>
                  - Review the full context of your content
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