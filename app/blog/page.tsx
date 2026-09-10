import Link from "next/link";

const articles = [
  {
    title: "Why Content Gets Flagged: A Practical Guide for Creators",
    excerpt:
      "Learn why certain words, claims, and promotional patterns can create content or monetization concerns across social platforms.",
    category: "Creator Safety",
    date: "September 6, 2026",
    slug: "why-content-gets-flagged",
  },
  {
    title: "How to Write Safer Promotional Content",
    excerpt:
      "Practical ways to make promotional language clearer, more credible, and less dependent on exaggerated promises.",
    category: "Content Optimization",
    date: "September 6, 2026",
    slug: "how-to-write-safer-promotional-content",
  },
  {
    title: "Financial Claims That Can Hurt Content Credibility",
    excerpt:
      "A closer look at guaranteed profits, instant wealth claims, and other financial language creators should review carefully.",
    category: "Financial Content",
    date: "September 6, 2026",
    slug: "financial-claims-content-credibility",
  },
  {
    title: "Context Matters: Why Keywords Alone Are Not Enough",
    excerpt:
      "The same phrase can have very different meanings depending on whether you are promoting, criticizing, warning, or discussing a topic educationally.",
    category: "Content Analysis",
    date: "September 6, 2026",
    slug: "context-matters-content-analysis",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            Creatoriva
          </Link>

          <nav className="flex items-center gap-6 text-sm text-zinc-600">
            <Link
              href="/"
              className="transition hover:text-black"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="inline-flex rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-xs font-medium text-zinc-700">
            Creatoriva Blog
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Practical guidance for safer content.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-600">
            Insights on content safety, promotional language, platform
            sensitivity, and practical ways to improve your content before
            publishing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                  {article.category}
                </span>

                <span className="text-xs text-zinc-400">
                  {article.date}
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                {article.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-zinc-600">
                {article.excerpt}
              </p>

              <Link
                href={`/blog/${article.slug}`}
                className="mt-auto pt-6 text-sm font-medium text-black underline underline-offset-4"
              >
                Read article
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">
          <h2 className="text-2xl font-semibold">
            Check your content before publishing.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            Use Creatoriva tools to review captions, scripts, promotional
            language, and other content before you publish.
          </p>

          <Link
            href="/#checker"
            className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Explore Tools
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Creatoriva. All rights reserved.</p>

          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="transition hover:text-black"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-black"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}