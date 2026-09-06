"use client";

import { useMemo, useState } from "react";
import { analyzeContent } from "@/lib/analyzer";

type RiskLevel = "High" | "Medium" | "Low";

function getRiskBarClass(risk: RiskLevel) {
  if (risk === "High") {
    return "bg-red-500";
  }

  if (risk === "Medium") {
    return "bg-amber-500";
  }

  return "bg-emerald-500";
}

function getRiskBadgeClass(level: "High" | "Medium") {
  if (level === "High") {
    return "bg-red-50 text-red-700";
  }

  return "bg-amber-50 text-amber-700";
}

export default function InstagramCheckerPage() {
  const [text, setText] = useState("");

  const [result, setResult] = useState<ReturnType<
    typeof analyzeContent
  > | null>(null);

  const characterCount = useMemo(
    () => text.length,
    [text],
  );

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

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-xl font-bold tracking-tight"
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

      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="inline-flex rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-xs font-medium text-zinc-700">
            Instagram Content Checker
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Review your content before you publish.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-600">
            Check Instagram captions, bios, promotional content, and
            other posts for potentially sensitive language and
            content-related risks.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
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
            onChange={(event) => setText(event.target.value)}
            maxLength={10000}
            placeholder="Paste your Instagram caption, bio, promotional content, or post text here..."
            className="mt-4 min-h-[260px] w-full resize-y rounded-xl border border-zinc-300 bg-zinc-50 p-4 text-sm leading-6 outline-none transition focus:border-black focus:bg-white"
          />

          <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
            <span>
              {characterCount.toLocaleString()} / 10,000 characters
            </span>

            <span>Long-form content supported</span>
          </div>

          <button
            onClick={handleCheck}
            disabled={!text.trim()}
            className="mt-6 w-full rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            Check Content
          </button>
        </div>

        {result && (
          <div className="mt-10 space-y-6">
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-500">
                    Overall Assessment
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-zinc-900">
                    {result.risk} Risk
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    Based on detected risk patterns.
                  </p>
                </div>

                <div className="sm:w-64">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                      Risk Score
                    </span>

                    <span className="font-semibold">
                      {result.score}/100
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200">
                    <div
                      className={`h-full rounded-full transition-all ${getRiskBarClass(
                        result.risk,
                      )}`}
                      style={{
                        width: `${result.score}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {result.riskMatches.length > 0 && (
              <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">
                  Detected Issues
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  These detected patterns contribute to the current
                  risk score.
                </p>

                <div className="mt-6 space-y-6">
                  {result.riskMatches.map((item) => (
                    <div
                      key={item.category.name}
                      className="rounded-xl border border-zinc-200 p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-semibold">
                          {item.category.name}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getRiskBadgeClass(
                            item.category.level,
                          )}`}
                        >
                          {item.category.level} Risk
                        </span>
                      </div>

                      <div className="mt-5">
                        <p className="text-sm font-medium text-zinc-700">
                          Why this may be risky
                        </p>

                        <p className="mt-2 text-sm leading-6 text-zinc-600">
                          {item.category.explanation}
                        </p>
                      </div>

                      <div className="mt-5">
                        <p className="text-sm font-medium text-zinc-700">
                          Detected phrase
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.matches.map((match) => (
                            <span
                              key={`${item.category.name}-${match.start}-${match.phrase}`}
                              className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs text-zinc-700"
                            >
                              {match.phrase}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5">
                        <p className="text-sm font-medium text-zinc-700">
                          Suggested direction
                        </p>

                        <p className="mt-2 text-sm leading-6 text-zinc-600">
                          {item.category.direction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {result.optimizationMatches.length > 0 && (
              <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold">
                    Content Optimization
                  </h2>

                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                    Does not affect score
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  These expressions are not treated as direct safety
                  risks, but improving them may make your content
                  clearer and more credible.
                </p>

                <div className="mt-6 space-y-5">
                  {result.optimizationMatches.map((item) => (
                    <div
                      key={item.category.name}
                      className="rounded-xl border border-zinc-200 p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-semibold">
                          {item.category.name}
                        </h3>

                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                          {item.category.level}
                        </span>
                      </div>

                      <div className="mt-5">
                        <p className="text-sm font-medium text-zinc-700">
                          Detected phrase
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.matches.map((match) => (
                            <span
                              key={`${item.category.name}-${match.start}-${match.phrase}`}
                              className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs text-zinc-700"
                            >
                              {match.phrase}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5">
                        <p className="text-sm font-medium text-zinc-700">
                          General guidance
                        </p>

                        <p className="mt-2 text-sm leading-6 text-zinc-600">
                          {item.category.direction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {result.contextualRiskMatches.length > 0 && (
              <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold">
                    Context Review
                  </h2>

                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                    Not included in score
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  These phrases were detected, but nearby wording
                  suggests they may be used in a warning, educational,
                  critical, or contextual way. Review the surrounding
                  text carefully.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {result.contextualRiskMatches.map((match) => (
                    <span
                      key={`${match.start}-${match.phrase}`}
                      className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs text-zinc-700"
                    >
                      {match.phrase}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {result.riskMatches.length === 0 &&
              result.optimizationMatches.length === 0 &&
              result.contextualRiskMatches.length === 0 && (
                <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold">
                    No Significant Issues Detected
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    No significant patterns from the current checks
                    were found in this content.
                  </p>
                </section>
              )}

            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">
                General Suggestions
              </h2>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600">
                <li>
                  • Avoid absolute promises or claims that guarantee a
                  specific outcome.
                </li>

                <li>
                  • Use specific and realistic descriptions whenever
                  possible.
                </li>

                <li>
                  • Avoid unnecessary urgency or pressure in
                  promotional content.
                </li>

                <li>
                  • For sensitive subjects, keep surrounding context
                  factual and clear.
                </li>

                <li>
                  • Review the full context of your content rather than
                  relying only on individual keywords.
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <h2 className="text-lg font-semibold">
                Important Note
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-600">
                This assessment is based on predefined content patterns
                and basic context signals. It is intended as general
                guidance and does not represent or guarantee the
                moderation, advertising, or other platform decisions of
                Instagram or any other platform.
              </p>
            </section>
          </div>
        )}
      </section>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CreatorGuard. All rights reserved.</p>

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