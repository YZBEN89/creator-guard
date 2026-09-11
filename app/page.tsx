"use client";

import { useState } from "react";
import { analyzeContent, AnalysisResult, RiskLevel } from "@/lib/analyzer";

import { reviewTikTokContent } from "@/lib/platform/tiktok";
import { reviewYouTubeContent } from "@/lib/platform/youtube";
import { reviewInstagramContent } from "@/lib/platform/instagram";
import { reviewFacebookContent } from "@/lib/platform/facebook";
import { reviewXContent } from "@/lib/platform/x";

const platforms = [
  {
    name: "TikTok",
    placeholder:
      "Paste your TikTok caption, script, or promotional content here...",
  },
  {
    name: "YouTube",
    placeholder:
      "Paste your YouTube title, description, script, or promotional content here...",
  },
  {
    name: "Instagram",
    placeholder:
      "Paste your Instagram caption, script, or promotional content here...",
  },
  {
    name: "Facebook",
    placeholder:
      "Paste your Facebook post, caption, script, or promotional content here...",
  },
  {
    name: "X",
    placeholder:
      "Paste your X post, thread, or promotional content here...",
  },
];

const tools = [
  {
    name: "Script Analyzer",
    description:
      "Analyze longer scripts for claims, context, intent, and content-related risks.",
    details: "Long-form content · Scripts · Context · Claims",
    href: "/script-analyzer",
    action: "Analyze",
  },
  {
    name: "Creator Tools",
    description:
      "Explore practical tools designed to help creators publish with more confidence.",
    details: "Optimization · Publishing · More tools coming",
    href: "#",
    action: "Explore",
  },
];

type PlatformReview = {
  level?: string;
  title?: string;
  summary?: string;
  guidance?: string[];
  recommendations?: string[];
  issues?: string[];
  [key: string]: unknown;
};

function AdPlaceholder() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="flex min-h-[110px] items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/70">
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400">
            Advertisement
          </p>

          <p className="mt-2 text-xs text-zinc-300">
            Google AdSense
          </p>
        </div>
      </div>
    </div>
  );
}

function getRiskBadgeClass(risk: RiskLevel) {
  if (risk === "High") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (risk === "Medium") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-700";
}

function getPlatformReview(
  platform: string,
  result: AnalysisResult,
  content: string
): PlatformReview | null {
  try {
    const input = {
      risk: result.risk,
      score: result.score,
      context: result.context.primary,
      intent: result.intent.primary,
      claimTypes: result.claims.types,
      riskCategories: result.riskMatches.map(
        (item) => item.category.name
      ),
    };

    switch (platform) {
      case "TikTok":
        return reviewTikTokContent(input);

      case "YouTube":
        return reviewYouTubeContent(input as never) as PlatformReview;

      case "Instagram":
        return reviewInstagramContent(input as never) as PlatformReview;

      case "Facebook":
        return reviewFacebookContent(input as never) as PlatformReview;

      case "X":
        return reviewXContent(input as never) as PlatformReview;

      default:
        return null;
    }
  } catch {
    return null;
  }
}

function ResultSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
        {title}
      </h3>

      <div className="mt-5">{children}</div>
    </section>
  );
}

function AnalysisResults({
  result,
  platform,
  content,
}: {
  result: AnalysisResult;
  platform: string;
  content: string;
}) {
  const platformReview = getPlatformReview(platform, result, content);

  const activeIssues = result.riskMatches.filter(
    (item) => item.matches.length > 0
  );

  const optimizationIssues = result.optimizationMatches.filter(
    (item) => item.matches.length > 0
  );

  const contextualIssues = result.contextualRiskMatches;

  const activeDimensions = result.riskDimensions.filter(
    (item) => item.score > 0
  );

  return (
    <section
      id="analysis-results"
      className="mx-auto max-w-5xl px-6 pb-20"
    >
      <div className="mb-8">
        <p className="text-sm font-medium text-zinc-500">
          Analysis Results
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Your content review
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Review the overall assessment, platform-specific guidance,
          detected issues, and content context below.
        </p>
      </div>

      <div className="grid gap-5">
        <ResultSection title="Overall Assessment">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-zinc-500">
                Overall Risk Score
              </p>

              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-5xl font-semibold tracking-tight">
                  {result.score}
                </span>

                <span className="text-sm text-zinc-400">
                  / 100
                </span>
              </div>
            </div>

            <div
              className={`inline-flex w-fit rounded-full border px-4 py-2 text-sm font-medium ${getRiskBadgeClass(
                result.risk
              )}`}
            >
              {result.risk} Risk
            </div>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-zinc-900 transition-all"
              style={{
                width: `${Math.min(100, Math.max(0, result.score))}%`,
              }}
            />
          </div>
        </ResultSection>

        {platformReview && (
          <ResultSection title={`${platform} Platform Review`}>
            <div className="space-y-5">
              {platformReview.title && (
                <div>
                  <p className="text-base font-semibold text-zinc-900">
                    {platformReview.title}
                  </p>
                </div>
              )}

              {platformReview.level && (
                <div>
                  <span className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700">
                    {platformReview.level}
                  </span>
                </div>
              )}

              {platformReview.summary && (
                <p className="text-sm leading-7 text-zinc-600">
                  {platformReview.summary}
                </p>
              )}

              {Array.isArray(platformReview.guidance) &&
                platformReview.guidance.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-zinc-900">
                      Guidance
                    </p>

                    <ul className="mt-3 space-y-2">
                      {platformReview.guidance.map(
                        (item, index) => (
                          <li
                            key={index}
                            className="flex gap-3 text-sm leading-6 text-zinc-600"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                            <span>{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {Array.isArray(
                platformReview.recommendations
              ) &&
                platformReview.recommendations.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-zinc-900">
                      Recommendations
                    </p>

                    <ul className="mt-3 space-y-2">
                      {platformReview.recommendations.map(
                        (item, index) => (
                          <li
                            key={index}
                            className="flex gap-3 text-sm leading-6 text-zinc-600"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                            <span>{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </ResultSection>
        )}

        <ResultSection title="Analysis Overview">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Context
              </p>

              <p className="mt-2 text-sm font-medium text-zinc-900">
                {result.context.primary}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Intent
              </p>

              <p className="mt-2 text-sm font-medium text-zinc-900">
                {result.intent.primary}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Claims
              </p>

              <p className="mt-2 text-sm font-medium text-zinc-900">
                {result.claims.types.length > 0
                  ? result.claims.types.join(", ")
                  : "None detected"}
              </p>
            </div>
          </div>
        </ResultSection>

        {activeIssues.length > 0 ? (
          <ResultSection title="Detected Issues">
            <div className="space-y-4">
              {activeIssues.map((item, index) => (
                <div
                  key={`${item.category.name}-${index}`}
                  className="rounded-2xl border border-zinc-200 p-5"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-medium text-zinc-900">
                        {item.category.name}
                      </h4>

                      <p className="mt-1 text-xs text-zinc-400">
                        {item.category.level} severity
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-medium ${getRiskBadgeClass(
                        item.category.level
                      )}`}
                    >
                      {item.category.level}
                    </span>
                  </div>

                  {item.reason && (
                    <p className="mt-4 text-sm leading-6 text-zinc-600">
                      {item.reason}
                    </p>
                  )}

                  {item.matches.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.matches.map(
                        (match, matchIndex) => (
                          <span
                            key={`${match.phrase}-${matchIndex}`}
                            className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs text-zinc-700"
                          >
                            “{match.phrase}”
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ResultSection>
        ) : (
          <ResultSection title="Detected Issues">
            <div className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm font-medium text-emerald-800">
                No significant risk issues detected.
              </p>

              <p className="mt-2 text-sm leading-6 text-emerald-700">
                The analyzer did not identify any major risk
                patterns in the submitted content.
              </p>
            </div>
          </ResultSection>
        )}

        {activeDimensions.length > 0 && (
          <ResultSection title="Risk Dimensions">
            <div className="space-y-4">
              {activeDimensions.map((dimension) => (
                <div key={dimension.dimension}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-800">
                      {dimension.dimension}
                    </span>

                    <span className="text-sm text-zinc-500">
                      {dimension.score}/100
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-zinc-800"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, dimension.score)
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ResultSection>
        )}

        {optimizationIssues.length > 0 && (
          <ResultSection title="Content Optimization">
            <p className="mb-5 text-sm leading-6 text-zinc-600">
              These patterns are presented as optimization
              considerations and do not directly increase the
              overall safety risk score.
            </p>

            <div className="space-y-3">
              {optimizationIssues.map((item, index) => (
                <div
                  key={`${item.category.name}-${index}`}
                  className="rounded-2xl border border-zinc-200 p-4"
                >
                  <p className="text-sm font-medium text-zinc-900">
                    {item.category.name}
                  </p>

                  {item.matches.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.matches.map(
                        (match, matchIndex) => (
                          <span
                            key={`${match.phrase}-${matchIndex}`}
                            className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs text-zinc-600"
                          >
                            “{match.phrase}”
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ResultSection>
        )}

        <ResultSection title="Context Review">
          <div className="space-y-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Detected Context
              </p>

              <p className="mt-2 text-base font-medium text-zinc-900">
                {result.context.primary}
              </p>
            </div>

            {result.context.signals.length > 0 && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                  Context Signals
                </p>

                <ul className="mt-3 space-y-2">
                  {result.context.signals.map(
                    (signal, index) => (
                      <li
                        key={index}
                        className="text-sm leading-6 text-zinc-600"
                      >
                        {signal}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Intent
              </p>

              <p className="mt-2 text-base font-medium text-zinc-900">
                {result.intent.primary}
              </p>
            </div>

            {result.intent.signals.length > 0 && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                  Intent Signals
                </p>

                <ul className="mt-3 space-y-2">
                  {result.intent.signals.map(
                    (signal, index) => (
                      <li
                        key={index}
                        className="text-sm leading-6 text-zinc-600"
                      >
                        {signal}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </ResultSection>

        {contextualIssues.length > 0 && (
          <ResultSection title="Contextual Signals">
            <div className="space-y-2">
              {contextualIssues.map((match, index) => (
                <div
                  key={`${match.phrase}-${index}`}
                  className="rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-600"
                >
                  “{match.phrase}”
                </div>
              ))}
            </div>
          </ResultSection>
        )}

        <ResultSection title="General Suggestions">
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm leading-6 text-zinc-600">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
              <span>
                Review any strong claims carefully before
                publishing.
              </span>
            </li>

            <li className="flex gap-3 text-sm leading-6 text-zinc-600">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
              <span>
                Consider whether the surrounding context
                clearly communicates your intended meaning.
              </span>
            </li>

            <li className="flex gap-3 text-sm leading-6 text-zinc-600">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
              <span>
                Platform policies can change, so treat this
                analysis as guidance rather than a guarantee.
              </span>
            </li>
          </ul>
        </ResultSection>

        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
            Important Note
          </p>

          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Creatoriva provides a practical content review
            based on detected language, context, intent, claims,
            and platform-specific signals. Results are
            informational and do not guarantee platform approval,
            reach, monetization, or account safety.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] =
    useState(platforms[0]);

  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [result, setResult] =
    useState<AnalysisResult | null>(null);

  function handleCheck() {
    if (!content.trim()) {
      return;
    }

    const analysis = analyzeContent(content);

    setResult(analysis);

    setTimeout(() => {
      document
        .getElementById("analysis-results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }

  function handleClear() {
    setContent("");
    setResult(null);
  }

  function handlePlatformChange(
    platform: (typeof platforms)[number]
  ) {
    setSelectedPlatform(platform);
    setOpen(false);
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
  href="/"
  className="flex items-center gap-2"
>
  <img
    src="/creatoriva-logo.png"
    alt="Creatoriva"
    className="h-6 w-auto"
  />

  <span className="text-xl font-semibold tracking-tight">
    Creatoriva
  </span>
</a>

          <nav className="flex items-center gap-6 text-sm text-zinc-600">
  <a
    href="/blog"
    className="transition hover:text-black"
  >
    Blog
  </a>

  <a
    href="#about"
    className="transition hover:text-black"
  >
    About
  </a>
</nav>
        </div>
      </header>

      <section
  id="checker"
  className="mx-auto max-w-5xl px-6 pb-10 pt-10 sm:pb-16 sm:pt-28"
>
  <div className="text-center">
    <div className="mb-4 hidden rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 sm:mb-5 sm:inline-flex">
      Creator Content Review Tools
    </div>

    <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-6xl">
      <span className="block">
        Create with confidence.
      </span>

      <span className="block">
        Check your content before you post.
      </span>
    </h1>

    <p className="mx-auto mt-6 hidden max-w-2xl text-base leading-7 text-zinc-600 sm:block sm:text-lg">
      Creatoriva helps creators identify potentially
      risky words, phrases, claims, and patterns before
      publishing content on social platforms.
    </p>
  </div>

  <div className="mx-auto mt-7 max-w-4xl sm:mt-10">
    <div className="overflow-visible rounded-3xl border border-zinc-300 bg-white shadow-sm transition focus-within:border-zinc-500 focus-within:shadow-md">
      <div className="relative">
        <textarea
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          placeholder={selectedPlatform.placeholder}
          className="min-h-[250px] w-full resize-none rounded-t-3xl border-0 bg-transparent px-6 pb-6 pt-6 text-sm leading-7 text-zinc-900 outline-none placeholder:text-zinc-400"
          maxLength={10000}
        />
      </div>

      <div className="relative flex items-center justify-between border-t border-zinc-100 px-5 py-4">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-sm transition hover:border-zinc-400 hover:text-black"
          >
            {selectedPlatform.name}
          </button>

          {open && (
            <div className="absolute bottom-full left-0 z-20 mb-2 w-48 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-1 shadow-lg">
              {platforms.map((platform) => (
                <button
                  key={platform.name}
                  type="button"
                  onClick={() =>
                    handlePlatformChange(platform)
                  }
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-zinc-50 ${
                    selectedPlatform.name ===
                    platform.name
                      ? "font-medium text-black"
                      : "text-zinc-600"
                  }`}
                >
                  {platform.name}

                  {selectedPlatform.name ===
                    platform.name && (
                    <span className="text-zinc-900">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleClear}
            className="text-sm font-medium text-zinc-500 transition hover:text-black"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={handleCheck}
            disabled={!content.trim()}
            className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            Check
          </button>
        </div>
      </div>
    </div>

    <p className="mt-3 text-center text-xs text-zinc-400">
      Long-form content supported ·{" "}
      {content.length.toLocaleString()} / 10,000 characters
    </p>
  </div>
</section>

      {result && (
        <AnalysisResults
          result={result}
          platform={selectedPlatform.name}
          content={content}
        />
      )}

      <section className="pb-16">
        <AdPlaceholder />
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-zinc-500">
              More Tools
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              More ways to improve your content.
            </h2>

            <p className="mt-4 text-sm leading-6 text-zinc-600">
              Explore additional tools designed to help
              creators review and prepare content before
              publishing.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="group flex min-h-[270px] flex-col rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {tool.name}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-zinc-600">
                    {tool.description}
                  </p>

                  <p className="mt-5 text-xs leading-5 text-zinc-400">
                    {tool.details}
                  </p>
                </div>

                <a
                  href={tool.href}
                  className="mt-7 inline-flex w-fit items-center text-sm font-medium text-zinc-900 transition"
                >
                  {tool.action}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <AdPlaceholder />
      </section>

      <section
        id="about"
        className="border-y border-zinc-200 bg-zinc-50"
      >
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-sm font-medium text-zinc-500">
            About Creatoriva
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Built for creators who want to publish with
            more confidence.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-600">
            Creatoriva is a practical content review
            toolkit designed to help creators understand
            potentially sensitive language, claims, and
            patterns before publishing across social
            platforms.
          </p>
        </div>
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