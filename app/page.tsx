import Link from "next/link";

const tools = [
  {
    title: "TikTok Risk Checker",
    description:
      "Review captions, scripts, and posts for potentially sensitive language and content-related risks.",
    href: "/tiktok-checker",
  },
  {
    title: "YouTube Monetization Checker",
    description:
      "Check video titles, descriptions, scripts, and promotional content before publishing.",
    href: "/youtube-checker",
  },
  {
    title: "Instagram Content Checker",
    description:
      "Review captions, bios, promotional content, and posts for potentially sensitive language and content-related risks.",
    href: "/instagram-checker",
  },
  {
    title: "Script Analyzer",
    description:
      "Review long-form video scripts, hooks, voice-over drafts, and spoken content before recording.",
    href: "/script-analyzer",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            CreatorGuard
          </Link>

          <nav className="flex items-center gap-6 text-sm text-zinc-600">
            <a
              href="#tools"
              className="transition hover:text-black"
            >
              Tools
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-black"
            >
              How It Works
            </a>

            <a
              href="#about"
              className="transition hover:text-black"
            >
              About
            </a>

            <Link
              href="/blog"
              className="transition hover:text-black"
            >
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-24">
          <span className="inline-flex rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-xs font-medium text-zinc-700">
            Creator Safety & Optimization Toolkit
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Create with confidence.
            <br />
            Check your content before you post.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
            CreatorGuard helps creators identify potentially risky words,
            phrases, and patterns before publishing content on social
            platforms.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#tools"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Explore Tools
            </a>

            <Link
              href="/blog"
              className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition hover:border-black hover:text-black"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      <section
        id="tools"
        className="mx-auto max-w-7xl scroll-mt-8 px-6 py-16"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-zinc-500">
            Tools
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Review your content before publishing.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-600">
            Choose a tool based on the type of content you are creating.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-4">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold tracking-tight">
                {tool.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {tool.description}
              </p>

              <div className="mt-auto pt-6">
                <Link
                  href={tool.href}
                  className="inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  Check Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-y border-zinc-200 bg-zinc-50"
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-zinc-500">
              How It Works
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Three simple steps.
            </h2>

            <p className="mt-4 text-sm leading-7 text-zinc-600">
              Review your content before you publish it.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="text-sm font-semibold text-zinc-400">
                01
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                Paste your content
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Add your caption, script, title, description, or other
                content.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="text-sm font-semibold text-zinc-400">
                02
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                Run a check
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Review potentially sensitive phrases, claims, and content
                patterns.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="text-sm font-semibold text-zinc-400">
                03
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                Improve before publishing
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Review the suggestions and make any changes you think are
                appropriate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-4xl scroll-mt-8 px-6 py-16 text-center"
      >
        <p className="text-sm font-medium text-zinc-500">
          About CreatorGuard
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          A practical pre-publishing review tool.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-600">
          CreatorGuard is designed to help creators review potentially
          sensitive wording before publishing content online. The tools
          provide general guidance based on predefined content patterns and
          context signals.
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
          Results should be treated as a review aid rather than a guarantee of
          how any social platform will moderate, monetize, distribute, or
          advertise your content.
        </p>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold">
            Want more practical content guidance?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
            Explore the CreatorGuard Blog for articles about content safety,
            promotional language, financial claims, and contextual review.
          </p>

          <Link
            href="/blog"
            className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Visit the Blog
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CreatorGuard. All rights reserved.</p>

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