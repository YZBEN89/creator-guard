import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
          >
            Creatoriva
          </Link>

          <nav className="flex items-center gap-6 text-sm text-zinc-600">
            <Link
              href="/"
              className="transition hover:text-zinc-900"
            >
              Home
            </Link>
            <Link
              href="/script-analyzer"
              className="transition hover:text-zinc-900"
            >
              Tools
            </Link>
            <Link
              href="/blog"
              className="transition hover:text-zinc-900"
            >
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:py-20">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Contact Creatoriva
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
            Have a question, found an issue, or need help with your
            account? We&apos;re happy to hear from you.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-zinc-200 p-8 text-center">
          <h2 className="text-lg font-semibold tracking-tight">
            Get in touch
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Email us and we&apos;ll get back to you as soon as we can.
          </p>

          <a
            href="mailto:support@creatoriva.com"
            className="mt-5 inline-block text-sm font-medium text-zinc-900 underline underline-offset-4 transition hover:text-zinc-600"
          >
            support@creatoriva.com
          </a>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-sm text-zinc-600 transition hover:text-zinc-900"
          >
            Back to Creatoriva
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-zinc-500 sm:flex-row">
          <p>© 2026 Creatoriva. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="transition hover:text-zinc-900"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition hover:text-zinc-900"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}