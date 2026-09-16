"use client";

import { useState } from "react";

type Section = "engagement" | "video" | "earnings" | "growth" | null;

type EngagementMode = "views" | "followers" | "reach";
type EarningsMode = "rpm" | "revenue" | "cpm" | "cost" | "impressions";
type GrowthMode = "rate" | "projection";

function formatNumber(value: number, decimals = 0) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatCurrency(value: number, decimals = 2) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function NumberInput({
  label,
  value,
  onChange,
  placeholder = "0",
  step = "1",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-700">
        {label}
      </span>
      <input
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
      />
    </label>
  );
}

function ResultBox({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center">
      <div className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
        {value}
      </div>
      {note && (
        <div className="mt-2 text-sm leading-6 text-zinc-500">{note}</div>
      )}
    </div>
  );
}

export default function CreatorCalculatorPage() {
  const [openSection, setOpenSection] = useState<Section>("engagement");

  const [engagementMode, setEngagementMode] =
    useState<EngagementMode>("views");
  const [engagementBase, setEngagementBase] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");
  const [saves, setSaves] = useState("");
  const [engagementResult, setEngagementResult] = useState<number | null>(null);

  const [ctrImpressions, setCtrImpressions] = useState("");
  const [ctrClicks, setCtrClicks] = useState("");
  const [ctrResult, setCtrResult] = useState<number | null>(null);

  const [watchViews, setWatchViews] = useState("");
  const [watchDuration, setWatchDuration] = useState("");
  const [watchResult, setWatchResult] = useState<number | null>(null);

  const [videoLength, setVideoLength] = useState("");
  const [averageDuration, setAverageDuration] = useState("");
  const [percentageResult, setPercentageResult] = useState<number | null>(null);

  const [earningsMode, setEarningsMode] = useState<EarningsMode>("rpm");
  const [earningsRevenue, setEarningsRevenue] = useState("");
  const [earningsViews, setEarningsViews] = useState("");
  const [earningsRpm, setEarningsRpm] = useState("");
  const [earningsCost, setEarningsCost] = useState("");
  const [earningsImpressions, setEarningsImpressions] = useState("");
  const [earningsResult, setEarningsResult] = useState<number | null>(null);

  const [startFollowers, setStartFollowers] = useState("");
  const [endFollowers, setEndFollowers] = useState("");
  const [growthDays, setGrowthDays] = useState("");
  const [growthResult, setGrowthResult] = useState<number | null>(null);
  const [netGrowthResult, setNetGrowthResult] = useState<number | null>(null);
  const [dailyGrowthResult, setDailyGrowthResult] = useState<number | null>(
    null
  );

  const [currentFollowers, setCurrentFollowers] = useState("");
  const [dailyFollowerGrowth, setDailyFollowerGrowth] = useState("");
  const [projectionDays, setProjectionDays] = useState("30");
  const [projectionResult, setProjectionResult] = useState<number | null>(
    null
  );

  function toggleSection(section: Section) {
    setOpenSection((current) => (current === section ? null : section));
  }

  function calculateEngagement() {
    const base = Number(engagementBase);
    const totalInteractions =
      Number(likes || 0) +
      Number(comments || 0) +
      Number(shares || 0) +
      Number(saves || 0);

    if (!base || base <= 0) {
      setEngagementResult(null);
      return;
    }

    setEngagementResult((totalInteractions / base) * 100);
  }

  function calculateCtr() {
    const impressions = Number(ctrImpressions);
    const clicks = Number(ctrClicks);

    if (!impressions || impressions <= 0) {
      setCtrResult(null);
      return;
    }

    setCtrResult((clicks / impressions) * 100);
  }

  function calculateWatchTime() {
    const views = Number(watchViews);
    const duration = Number(watchDuration);

    if (!views || views <= 0 || duration < 0) {
      setWatchResult(null);
      return;
    }

    const totalHours = (views * duration) / 3600;
    setWatchResult(totalHours);
  }

  function calculateAveragePercentageViewed() {
    const length = Number(videoLength);
    const average = Number(averageDuration);

    if (!length || length <= 0 || average < 0) {
      setPercentageResult(null);
      return;
    }

    const result = Math.min((average / length) * 100, 100);
    setPercentageResult(result);
  }

  function calculateEarnings() {
    const revenue = Number(earningsRevenue);
    const views = Number(earningsViews);
    const rpm = Number(earningsRpm);
    const cost = Number(earningsCost);
    const impressions = Number(earningsImpressions);

    if (earningsMode === "rpm") {
      if (!views || views <= 0 || revenue < 0) {
        setEarningsResult(null);
        return;
      }

      setEarningsResult((revenue / views) * 1000);
      return;
    }

    if (earningsMode === "revenue") {
      if (!views || views <= 0 || rpm < 0) {
        setEarningsResult(null);
        return;
      }

      setEarningsResult((rpm * views) / 1000);
      return;
    }

    if (earningsMode === "cpm") {
      if (!impressions || impressions <= 0 || cost < 0) {
        setEarningsResult(null);
        return;
      }

      setEarningsResult((cost / impressions) * 1000);
      return;
    }

    if (earningsMode === "cost") {
      if (!impressions || impressions <= 0 || rpm < 0) {
        setEarningsResult(null);
        return;
      }

      setEarningsResult((rpm * impressions) / 1000);
      return;
    }

    if (earningsMode === "impressions") {
      if (!cost || cost <= 0 || rpm <= 0) {
        setEarningsResult(null);
        return;
      }

      setEarningsResult((cost / rpm) * 1000);
    }
  }

  function calculateGrowthRate() {
    const start = Number(startFollowers);
    const end = Number(endFollowers);
    const days = Number(growthDays);

    if (!start || start <= 0 || end < 0 || !days || days <= 0) {
      setGrowthResult(null);
      setNetGrowthResult(null);
      setDailyGrowthResult(null);
      return;
    }

    const netGrowth = end - start;
    const growthRate = (netGrowth / start) * 100;
    const dailyGrowth = netGrowth / days;

    setGrowthResult(growthRate);
    setNetGrowthResult(netGrowth);
    setDailyGrowthResult(dailyGrowth);
  }

  function calculateProjection() {
    const current = Number(currentFollowers);
    const daily = Number(dailyFollowerGrowth);
    const days = Number(projectionDays);

    if (current < 0 || daily < 0 || !days || days <= 0) {
      setProjectionResult(null);
      return;
    }

    setProjectionResult(current + daily * days);
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:py-5">
          <a
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Creatoriva home"
          >
            <img
              src="/creatoriva-logo.png"
              alt="Creatoriva"
              className="h-6 w-auto"
            />
            <span className="text-xl font-semibold tracking-tight text-zinc-900">
              Creatoriva
            </span>
          </a>

          <nav className="flex items-center gap-6 text-sm text-zinc-600">
            <a href="/" className="transition hover:text-zinc-900">
              Home
            </a>
          </nav>
        </div>
      </header>

      <section className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center sm:py-16">
          <div className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-400">
            Creator Tools
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:mt-5 sm:text-5xl">
            Creator Calculator
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-600 sm:mt-5 sm:text-base sm:leading-7">
            Calculate the numbers that matter to your content, from engagement
            and video performance to earnings and audience growth.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-8 sm:py-12">
        <div className="space-y-4">
          {/* Engagement & Reach */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <button
              type="button"
              onClick={() => toggleSection("engagement")}
              className="flex w-full items-center justify-between px-5 py-5 text-left transition hover:bg-zinc-50 sm:px-6"
            >
              <div>
                <h2 className="text-base font-semibold text-zinc-900 sm:text-lg">
                  Engagement &amp; Reach
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Measure how people interact with your content.
                </p>
              </div>

              <span className="ml-4 text-xl text-zinc-400">
                {openSection === "engagement" ? "−" : "+"}
              </span>
            </button>

            {openSection === "engagement" && (
              <div className="border-t border-zinc-100 px-5 py-6 sm:px-6">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-zinc-700">
                    What do you want to calculate?
                  </span>
                  <select
                    value={engagementMode}
                    onChange={(event) => {
                      setEngagementMode(
                        event.target.value as EngagementMode
                      );
                      setEngagementResult(null);
                    }}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
                  >
                    <option value="views">Engagement Rate by Views</option>
                    <option value="followers">
                      Engagement Rate by Followers
                    </option>
                    <option value="reach">Engagement Rate by Reach</option>
                  </select>
                </label>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <NumberInput
                    label={
                      engagementMode === "views"
                        ? "Views"
                        : engagementMode === "followers"
                          ? "Followers"
                          : "Reach"
                    }
                    value={engagementBase}
                    onChange={setEngagementBase}
                    placeholder="100000"
                  />

                  <NumberInput
                    label="Likes"
                    value={likes}
                    onChange={setLikes}
                    placeholder="5000"
                  />

                  <NumberInput
                    label="Comments"
                    value={comments}
                    onChange={setComments}
                    placeholder="300"
                  />

                  <NumberInput
                    label="Shares"
                    value={shares}
                    onChange={setShares}
                    placeholder="800"
                  />

                  <NumberInput
                    label="Saves"
                    value={saves}
                    onChange={setSaves}
                    placeholder="Optional"
                  />
                </div>

                <button
                  type="button"
                  onClick={calculateEngagement}
                  className="mt-5 w-full rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
                >
                  Calculate
                </button>

                {engagementResult !== null && (
                  <ResultBox
                    label="Engagement Rate"
                    value={`${formatNumber(engagementResult, 2)}%`}
                    note="Based on the interactions and audience metric you entered."
                  />
                )}
              </div>
            )}
          </div>

          {/* Video Performance */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <button
              type="button"
              onClick={() => toggleSection("video")}
              className="flex w-full items-center justify-between px-5 py-5 text-left transition hover:bg-zinc-50 sm:px-6"
            >
              <div>
                <h2 className="text-base font-semibold text-zinc-900 sm:text-lg">
                  Video Performance
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Understand watch time and viewing behavior.
                </p>
              </div>

              <span className="ml-4 text-xl text-zinc-400">
                {openSection === "video" ? "−" : "+"}
              </span>
            </button>

            {openSection === "video" && (
              <div className="border-t border-zinc-100 px-5 py-6 sm:px-6">
                <div className="rounded-xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">
                  <strong className="font-medium text-zinc-800">
                    Choose a calculation
                  </strong>
                  <div className="mt-1">
                    Calculate total watch time or estimate the percentage of
                    your video that viewers watch on average.
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-zinc-700">
                      What do you want to calculate?
                    </span>
                    <select
                      value={
                        watchResult !== null || percentageResult === null
                          ? "watch"
                          : "percentage"
                      }
                      onChange={(event) => {
                        setWatchResult(null);
                        setPercentageResult(null);

                        if (event.target.value === "watch") {
                          setVideoLength("");
                          setAverageDuration("");
                        } else {
                          setWatchViews("");
                          setWatchDuration("");
                        }
                      }}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
                    >
                      <option value="watch">Total Watch Time</option>
                      <option value="percentage">
                        Average Percentage Viewed
                      </option>
                    </select>
                  </label>
                </div>

                {percentageResult === null &&
                watchResult === null &&
                videoLength === "" &&
                averageDuration === "" ? (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <NumberInput
                      label="Views"
                      value={watchViews}
                      onChange={setWatchViews}
                      placeholder="100000"
                    />

                    <NumberInput
                      label="Average View Duration (seconds)"
                      value={watchDuration}
                      onChange={setWatchDuration}
                      placeholder="45"
                    />
                  </div>
                ) : (
                  <div className="mt-5">
                    {videoLength !== "" || averageDuration !== "" ? (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <NumberInput
                          label="Video Length (seconds)"
                          value={videoLength}
                          onChange={setVideoLength}
                          placeholder="60"
                        />

                        <NumberInput
                          label="Average View Duration (seconds)"
                          value={averageDuration}
                          onChange={setAverageDuration}
                          placeholder="45"
                        />
                      </div>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <NumberInput
                          label="Views"
                          value={watchViews}
                          onChange={setWatchViews}
                          placeholder="100000"
                        />

                        <NumberInput
                          label="Average View Duration (seconds)"
                          value={watchDuration}
                          onChange={setWatchDuration}
                          placeholder="45"
                        />
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const mode =
                      videoLength !== "" || averageDuration !== ""
                        ? "percentage"
                        : "watch";

                    if (mode === "percentage") {
                      calculateAveragePercentageViewed();
                    } else {
                      calculateWatchTime();
                    }
                  }}
                  className="mt-5 w-full rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
                >
                  Calculate
                </button>

                {watchResult !== null && (
                  <ResultBox
                    label="Total Watch Time"
                    value={`${formatNumber(watchResult, 2)} hours`}
                    note="Calculated from total views and average view duration."
                  />
                )}

                {percentageResult !== null && (
                  <ResultBox
                    label="Average Percentage Viewed"
                    value={`${formatNumber(percentageResult, 2)}%`}
                    note="Calculated from video length and average view duration."
                  />
                )}

                <div className="mt-5 text-xs leading-5 text-zinc-400">
                  Tip: To switch between calculations, select another option
                  above.
                </div>
              </div>
            )}
          </div>

          {/* Earnings */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <button
              type="button"
              onClick={() => toggleSection("earnings")}
              className="flex w-full items-center justify-between px-5 py-5 text-left transition hover:bg-zinc-50 sm:px-6"
            >
              <div>
                <h2 className="text-base font-semibold text-zinc-900 sm:text-lg">
                  Earnings
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Calculate RPM, revenue, CPM, and advertising metrics.
                </p>
              </div>

              <span className="ml-4 text-xl text-zinc-400">
                {openSection === "earnings" ? "−" : "+"}
              </span>
            </button>

            {openSection === "earnings" && (
              <div className="border-t border-zinc-100 px-5 py-6 sm:px-6">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-zinc-700">
                    What do you want to calculate?
                  </span>

                  <select
                    value={earningsMode}
                    onChange={(event) => {
                      setEarningsMode(event.target.value as EarningsMode);
                      setEarningsResult(null);
                    }}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
                  >
                    <option value="rpm">RPM</option>
                    <option value="revenue">Estimated Revenue</option>
                    <option value="cpm">CPM</option>
                    <option value="cost">Advertising Cost</option>
                    <option value="impressions">Impressions</option>
                  </select>
                </label>

                {earningsMode === "rpm" && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <NumberInput
                      label="Revenue (USD)"
                      value={earningsRevenue}
                      onChange={setEarningsRevenue}
                      placeholder="500"
                      step="0.01"
                    />

                    <NumberInput
                      label="Views"
                      value={earningsViews}
                      onChange={setEarningsViews}
                      placeholder="100000"
                    />
                  </div>
                )}

                {earningsMode === "revenue" && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <NumberInput
                      label="RPM (USD)"
                      value={earningsRpm}
                      onChange={setEarningsRpm}
                      placeholder="5"
                      step="0.01"
                    />

                    <NumberInput
                      label="Views"
                      value={earningsViews}
                      onChange={setEarningsViews}
                      placeholder="100000"
                    />
                  </div>
                )}

                {earningsMode === "cpm" && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <NumberInput
                      label="Advertising Cost (USD)"
                      value={earningsCost}
                      onChange={setEarningsCost}
                      placeholder="500"
                      step="0.01"
                    />

                    <NumberInput
                      label="Impressions"
                      value={earningsImpressions}
                      onChange={setEarningsImpressions}
                      placeholder="100000"
                    />
                  </div>
                )}

                {earningsMode === "cost" && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <NumberInput
                      label="CPM (USD)"
                      value={earningsRpm}
                      onChange={setEarningsRpm}
                      placeholder="5"
                      step="0.01"
                    />

                    <NumberInput
                      label="Impressions"
                      value={earningsImpressions}
                      onChange={setEarningsImpressions}
                      placeholder="100000"
                    />
                  </div>
                )}

                {earningsMode === "impressions" && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <NumberInput
                      label="Advertising Cost (USD)"
                      value={earningsCost}
                      onChange={setEarningsCost}
                      placeholder="500"
                      step="0.01"
                    />

                    <NumberInput
                      label="CPM (USD)"
                      value={earningsRpm}
                      onChange={setEarningsRpm}
                      placeholder="5"
                      step="0.01"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={calculateEarnings}
                  className="mt-5 w-full rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
                >
                  Calculate
                </button>

                {earningsResult !== null && (
                  <ResultBox
                    label={
                      earningsMode === "rpm"
                        ? "RPM"
                        : earningsMode === "revenue"
                          ? "Estimated Revenue"
                          : earningsMode === "cpm"
                            ? "CPM"
                            : earningsMode === "cost"
                              ? "Advertising Cost"
                              : "Impressions"
                    }
                    value={
                      earningsMode === "rpm" || earningsMode === "cpm"
                        ? formatCurrency(earningsResult)
                        : earningsMode === "revenue" ||
                            earningsMode === "cost"
                          ? formatCurrency(earningsResult)
                          : formatNumber(earningsResult)
                    }
                    note={
                      earningsMode === "rpm"
                        ? "Revenue earned per 1,000 views based on the numbers entered."
                        : earningsMode === "revenue"
                          ? "Estimated revenue based on RPM and total views."
                          : earningsMode === "cpm"
                            ? "Advertising cost per 1,000 impressions."
                            : earningsMode === "cost"
                              ? "Estimated advertising cost based on CPM and impressions."
                              : "Estimated impressions based on advertising cost and CPM."
                    }
                  />
                )}

                <div className="mt-5 text-xs leading-5 text-zinc-400">
                  RPM and CPM are different metrics. RPM is generally used to
                  describe revenue per 1,000 views, while CPM describes cost
                  per 1,000 advertising impressions.
                </div>
              </div>
            )}
          </div>

          {/* Growth */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <button
              type="button"
              onClick={() => toggleSection("growth")}
              className="flex w-full items-center justify-between px-5 py-5 text-left transition hover:bg-zinc-50 sm:px-6"
            >
              <div>
                <h2 className="text-base font-semibold text-zinc-900 sm:text-lg">
                  Growth
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Measure audience growth and project future followers.
                </p>
              </div>

              <span className="ml-4 text-xl text-zinc-400">
                {openSection === "growth" ? "−" : "+"}
              </span>
            </button>

            {openSection === "growth" && (
              <div className="border-t border-zinc-100 px-5 py-6 sm:px-6">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-zinc-700">
                    What do you want to calculate?
                  </span>

                  <select
                    value={
                      growthResult !== null || dailyGrowthResult !== null
                        ? "rate"
                        : "projection"
                    }
                    onChange={(event) => {
                      setGrowthResult(null);
                      setNetGrowthResult(null);
                      setDailyGrowthResult(null);
                      setProjectionResult(null);

                      if (event.target.value === "rate") {
                        setCurrentFollowers("");
                        setDailyFollowerGrowth("");
                      } else {
                        setStartFollowers("");
                        setEndFollowers("");
                        setGrowthDays("");
                      }
                    }}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
                  >
                    <option value="rate">Follower Growth Rate</option>
                    <option value="projection">
                      Follower Growth Projection
                    </option>
                  </select>
                </label>

                {growthResult !== null ||
                netGrowthResult !== null ||
                dailyGrowthResult !== null ? (
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <NumberInput
                      label="Starting Followers"
                      value={startFollowers}
                      onChange={setStartFollowers}
                      placeholder="10000"
                    />

                    <NumberInput
                      label="Ending Followers"
                      value={endFollowers}
                      onChange={setEndFollowers}
                      placeholder="12000"
                    />

                    <NumberInput
                      label="Time Period (days)"
                      value={growthDays}
                      onChange={setGrowthDays}
                      placeholder="30"
                    />
                  </div>
                ) : projectionResult !== null ||
                  currentFollowers !== "" ||
                  dailyFollowerGrowth !== "" ? (
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <NumberInput
                      label="Current Followers"
                      value={currentFollowers}
                      onChange={setCurrentFollowers}
                      placeholder="10000"
                    />

                    <NumberInput
                      label="Average Daily Growth"
                      value={dailyFollowerGrowth}
                      onChange={setDailyFollowerGrowth}
                      placeholder="100"
                    />

                    <NumberInput
                      label="Projection Period (days)"
                      value={projectionDays}
                      onChange={setProjectionDays}
                      placeholder="30"
                    />
                  </div>
                ) : (
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <NumberInput
                      label="Starting Followers"
                      value={startFollowers}
                      onChange={setStartFollowers}
                      placeholder="10000"
                    />

                    <NumberInput
                      label="Ending Followers"
                      value={endFollowers}
                      onChange={setEndFollowers}
                      placeholder="12000"
                    />

                    <NumberInput
                      label="Time Period (days)"
                      value={growthDays}
                      onChange={setGrowthDays}
                      placeholder="30"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (
                      growthResult !== null ||
                      netGrowthResult !== null ||
                      dailyGrowthResult !== null ||
                      (startFollowers !== "" && endFollowers !== "")
                    ) {
                      calculateGrowthRate();
                    } else {
                      calculateProjection();
                    }
                  }}
                  className="mt-5 w-full rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
                >
                  Calculate
                </button>

                {growthResult !== null && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <ResultBox
                      label="Growth Rate"
                      value={`${formatNumber(growthResult, 2)}%`}
                    />

                    <ResultBox
                      label="Net Growth"
                      value={formatNumber(netGrowthResult ?? 0)}
                    />

                    <ResultBox
                      label="Average Daily Growth"
                      value={formatNumber(dailyGrowthResult ?? 0, 1)}
                    />
                  </div>
                )}

                {projectionResult !== null && (
                  <ResultBox
                    label="Projected Followers"
                    value={formatNumber(projectionResult)}
                    note={`Based on your current followers and average daily growth over ${projectionDays} days.`}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Ad Placeholder */}
        <div className="my-8 flex min-h-[120px] items-center justify-center rounded-xl border border-zinc-100 bg-zinc-50">
          <span className="text-xs text-zinc-400">
            Advertisement
          </span>
        </div>

        {/* SEO Content */}
        <div className="mt-14 border-t border-zinc-100 pt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Creator Calculator
          </h2>

          <div className="mt-5 space-y-5 text-sm leading-7 text-zinc-600">
            <p>
              Creatoriva&apos;s Creator Calculator brings common creator
              metrics into one simple tool. Use it to calculate engagement
              rate, click-through rate, watch time, average percentage viewed,
              RPM, CPM, follower growth, and audience growth projections.
            </p>

            <p>
              Enter the numbers from your platform analytics and choose the
              calculation you need. The calculator performs the underlying
              mathematical calculation without requiring an account or
              additional software.
            </p>

            <h3 className="pt-3 text-lg font-semibold text-zinc-900">
              What can creators calculate?
            </h3>

            <p>
              Engagement Rate helps you understand interactions relative to
              views, followers, or reach. Watch Time and Average Percentage
              Viewed can help you understand how much of your video content is
              being watched. RPM and CPM can be used to work with common
              advertising and creator revenue metrics.
            </p>

            <p>
              The growth tools can calculate changes in follower counts and
              provide a simple projection based on an average daily growth
              rate. Projections are mathematical estimates and do not account
              for changes in future performance.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 Creatoriva. All rights reserved.</div>

          <div className="flex items-center gap-5">
            <a href="/privacy" className="transition hover:text-zinc-900">
              Privacy
            </a>
            <a href="/terms" className="transition hover:text-zinc-900">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}