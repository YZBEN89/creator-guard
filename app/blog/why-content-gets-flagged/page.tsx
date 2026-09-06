import Link from "next/link";

export default function WhyContentGetsFlaggedPage() {
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
            <Link
              href="/"
              className="transition hover:text-black"
            >
              Home
            </Link>

            <Link
              href="/#tools"
              className="transition hover:text-black"
            >
              Tools
            </Link>

            <Link
              href="/blog"
              className="font-medium text-black"
            >
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-14">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
            Creator Safety
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Why Content Gets Flagged: A Practical Guide for Creators
          </h1>

          <p className="mt-5 text-sm text-zinc-500">
            September 6, 2026 · CreatorGuard
          </p>
        </div>

        <div className="mt-12 space-y-10 text-base leading-8 text-zinc-700">
          <p>
            Publishing online is rarely just about what you say. The way
            something is presented, the surrounding context, and the claims
            being made can all affect how content is reviewed by a platform.
          </p>

          <p>
            Creators often focus on individual keywords, but a more useful
            approach is to review the full message before publishing. A phrase
            that looks sensitive on its own may have a very different meaning
            when it is being used to warn viewers, discuss a news story, or
            explain why a claim is misleading.
          </p>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              1. Absolute claims can create problems
            </h2>

            <p className="mt-4">
              Statements such as guaranteed profits, guaranteed results, or
              promises that something will always work can make content sound
              more certain than the available evidence supports.
            </p>

            <p className="mt-4">
              This is especially important in financial, health, business,
              and promotional content. Instead of making an absolute promise,
              creators can describe the process, expected benefits, limitations,
              or potential risks more precisely.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              2. Financial promises deserve extra attention
            </h2>

            <p className="mt-4">
              Claims involving easy money or extremely fast wealth can reduce
              credibility and may create additional review concerns.
            </p>

            <p className="mt-4">
              Phrases such as “get rich overnight” or “make money while you
              sleep” are very different from educational content discussing
              why such promises may be unrealistic.
            </p>

            <p className="mt-4">
              Context matters. A creator criticizing a misleading financial
              claim is not communicating the same message as a creator
              promoting that claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              3. Promotional language can become too aggressive
            </h2>

            <p className="mt-4">
              Words such as “the best,” “ultimate,” “secret,” or “one simple
              trick” can make promotional content feel exaggerated when they
              are used without supporting information.
            </p>

            <p className="mt-4">
              Clearer alternatives usually focus on what the product, service,
              or content actually provides rather than relying on broad
              superlatives.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              4. Urgency should be meaningful
            </h2>

            <p className="mt-4">
              Genuine deadlines can be useful, but repeated pressure such as
              “buy now,” “last chance,” or “don't miss out” can make a message
              feel more aggressive than necessary.
            </p>

            <p className="mt-4">
              When a deadline is real, explain it clearly. When there is no
              genuine deadline, a straightforward call to action is often
              easier for an audience to trust.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              5. Sensitive words do not always mean risky content
            </h2>

            <p className="mt-4">
              Keyword matching alone cannot fully understand intent. A script
              discussing scams may contain words associated with scams. A
              documentary about violence may mention violent events. A health
              article may discuss medical claims without endorsing them.
            </p>

            <p className="mt-4">
              This is why creators should review the surrounding sentences and
              overall message instead of removing every potentially sensitive
              word automatically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              6. A practical pre-publishing review
            </h2>

            <p className="mt-4">
              Before publishing, read the entire caption, script, title, or
              promotional message once from the perspective of a new viewer.
            </p>

            <ul className="mt-4 space-y-3 pl-5">
              <li className="list-disc">
                Are any outcomes presented as guaranteed?
              </li>

              <li className="list-disc">
                Does the content make unusually strong financial, health, or
                promotional claims?
              </li>

              <li className="list-disc">
                Is urgency based on a genuine reason?
              </li>

              <li className="list-disc">
                Could a sensitive phrase be misunderstood without its context?
              </li>

              <li className="list-disc">
                Are the claims specific enough for the audience to understand
                what is actually being promised?
              </li>
            </ul>
          </section>

          <section className="rounded-2xl bg-zinc-50 p-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Use content checks as a review step
            </h2>

            <p className="mt-4">
              A content checker can help identify language worth reviewing,
              but no automated assessment can guarantee how a platform will
              moderate, monetize, distribute, or advertise a particular piece
              of content.
            </p>

            <p className="mt-4">
              The most useful workflow is simple: identify potential issues,
              review the surrounding context, improve unclear wording, and
              then make the final publishing decision yourself.
            </p>
          </section>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-zinc-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/blog"
            className="text-sm font-medium text-zinc-700 underline underline-offset-4 transition hover:text-black"
          >
            ← Back to Blog
          </Link>

          <Link
            href="/tiktok-checker"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Check Your Content
          </Link>
        </div>
      </article>

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