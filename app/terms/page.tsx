import Link from "next/link";

export default function TermsPage() {
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

            <Link
              href="/#tools"
              className="transition hover:text-black"
            >
              Tools
            </Link>

            <Link
              href="/blog"
              className="transition hover:text-black"
            >
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-14">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
            Legal
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>

          <p className="mt-5 text-sm text-zinc-500">
            Last updated: September 6, 2026
          </p>
        </div>

        <div className="mt-12 space-y-10 text-base leading-8 text-zinc-700">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              1. Acceptance of These Terms
            </h2>

            <p className="mt-4">
              By accessing or using the Creatoriva website, tools, and related
              services, you agree to be bound by these Terms of Service
              (“Terms”).
            </p>

            <p className="mt-4">
              If you do not agree with these Terms, please do not use
              Creatoriva.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              2. Description of the Service
            </h2>

            <p className="mt-4">
              Creatoriva provides tools that help creators review written
              content for potentially sensitive language, claims, patterns,
              contextual concerns, and platform-related considerations before
              publishing.
            </p>

            <p className="mt-4">
              The tools may include platform-specific content checkers, script
              analysis, educational articles, content guidance, and related
              features.
            </p>

            <p className="mt-4">
              Features may change, be added, modified, suspended, or removed
              from time to time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              3. General Guidance Only
            </h2>

            <p className="mt-4">
              Creatoriva provides general information and content review
              guidance. Results may be based on predefined content patterns,
              contextual signals, claims, risk dimensions, platform-related
              considerations, and other techniques used by the service.
            </p>

            <p className="mt-4">
              Creatoriva does not guarantee that content will be approved,
              monetized, recommended, distributed, advertised, or otherwise
              treated in a particular way by TikTok, YouTube, Instagram,
              Facebook, X, or any other platform.
            </p>

            <p className="mt-4">
              A low-risk result does not mean that content is guaranteed to
              comply with the policies, terms, or guidelines of a particular
              platform.
            </p>

            <p className="mt-4">
              Platform policies and enforcement practices may change without
              notice. Users are responsible for reviewing the current rules of
              the platforms on which they publish content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              4. No Legal, Financial, Medical, or Professional Advice
            </h2>

            <p className="mt-4">
              Creatoriva content and tools are not intended to provide legal,
              financial, medical, investment, tax, accounting, or other
              professional advice.
            </p>

            <p className="mt-4">
              Any information relating to financial, health, legal, commercial,
              or other sensitive topics is provided for general informational
              and content-review purposes only.
            </p>

            <p className="mt-4">
              You are responsible for obtaining appropriate professional advice
              when needed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              5. Your Responsibility
            </h2>

            <p className="mt-4">
              You are solely responsible for the content you create, submit,
              publish, distribute, or otherwise use in connection with
              Creatoriva.
            </p>

            <p className="mt-4">
              You are also responsible for determining whether your content
              complies with applicable laws, regulations, platform rules,
              advertising requirements, intellectual property rights, and other
              obligations.
            </p>

            <p className="mt-4">
              Creatoriva results should be treated as one source of information
              rather than a substitute for your own judgment, platform review,
              or professional advice where appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              6. Acceptable Use
            </h2>

            <p className="mt-4">
              You agree not to use Creatoriva in a way that:
            </p>

            <ul className="mt-5 space-y-3 pl-5">
              <li className="list-disc">
                violates applicable laws or regulations;
              </li>

              <li className="list-disc">
                infringes another person’s rights;
              </li>

              <li className="list-disc">
                attempts to gain unauthorized access to the website or its
                systems;
              </li>

              <li className="list-disc">
                interferes with or disrupts the operation of the service;
              </li>

              <li className="list-disc">
                introduces malicious code, harmful software, or abusive
                automated traffic; or
              </li>

              <li className="list-disc">
                attempts to misuse, overload, reverse engineer, scrape,
                circumvent, or otherwise interfere with reasonable restrictions
                of the service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              7. User Content
            </h2>

            <p className="mt-4">
              You retain responsibility for content that you submit to
              Creatoriva.
            </p>

            <p className="mt-4">
              By submitting content to the service, you represent that you have
              the necessary rights or permission to use that content for the
              purpose for which you submit it.
            </p>

            <p className="mt-4">
              You should not submit passwords, payment information,
              authentication credentials, government identification numbers, or
              other highly sensitive information through content input fields.
            </p>

            <p className="mt-4">
              Creatoriva does not claim ownership of content you submit solely
              because you use the service to analyze it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              8. Intellectual Property
            </h2>

            <p className="mt-4">
              Creatoriva and its original website design, branding, text,
              graphics, software, interfaces, and other materials are owned by
              or licensed to Creatoriva unless otherwise stated.
            </p>

            <p className="mt-4">
              You may use the website and its tools for their intended purposes,
              but you may not copy, reproduce, distribute, sell, modify, or
              commercially exploit Creatoriva materials without appropriate
              authorization.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              9. Third-Party Services and Links
            </h2>

            <p className="mt-4">
              Creatoriva may rely on third-party services for hosting,
              analytics, advertising, security, consent management, or other
              technical functions.
            </p>

            <p className="mt-4">
              The website may also contain links to third-party websites or
              services.
            </p>

            <p className="mt-4">
              Creatoriva is not responsible for the availability, content,
              policies, security, or practices of third-party services.
            </p>

            <p className="mt-4">
              Your use of third-party services may be subject to their own
              terms, policies, and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              10. Advertising
            </h2>

            <p className="mt-4">
              Creatoriva may display advertisements from third-party
              providers, including Google or other advertising partners.
            </p>

            <p className="mt-4">
              Advertising providers may apply their own terms, privacy
              policies, cookies, and technologies when delivering or measuring
              advertisements.
            </p>

            <p className="mt-4">
              Creatoriva does not guarantee the availability, accuracy,
              completeness, or suitability of third-party advertisements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              11. Availability of the Service
            </h2>

            <p className="mt-4">
              We may modify, suspend, restrict, or discontinue all or part of
              Creatoriva at any time, with or without notice where permitted by
              applicable law.
            </p>

            <p className="mt-4">
              We do not guarantee that the website or any particular feature
              will always be available, uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              12. Accuracy of Results
            </h2>

            <p className="mt-4">
              Although we aim to provide useful and reasonably accurate
              information, Creatoriva does not guarantee that its results,
              classifications, suggestions, or other outputs are complete,
              current, accurate, or error-free.
            </p>

            <p className="mt-4">
              Content may contain phrases, meanings, context, or risks that our
              tools do not detect, and detected content may require additional
              human review.
            </p>

            <p className="mt-4">
              Creatoriva should not be relied upon as the sole basis for
              publishing, business, financial, legal, medical, or other
              significant decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              13. Disclaimer of Warranties
            </h2>

            <p className="mt-4">
              To the maximum extent permitted by applicable law, Creatoriva is
              provided on an “as is” and “as available” basis, without
              warranties of any kind, express or implied.
            </p>

            <p className="mt-4">
              This includes, where legally permitted, warranties of
              merchantability, fitness for a particular purpose,
              non-infringement, availability, reliability, and accuracy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              14. Limitation of Liability
            </h2>

            <p className="mt-4">
              To the maximum extent permitted by applicable law, Creatoriva and
              its operators will not be liable for indirect, incidental,
              special, consequential, exemplary, or similar damages arising
              from or related to your use of the service.
            </p>

            <p className="mt-4">
              This includes losses related to content moderation, monetization,
              advertising, distribution, account restrictions, business
              decisions, financial losses, or reliance on Creatoriva results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              15. Indemnification
            </h2>

            <p className="mt-4">
              To the extent permitted by applicable law, you agree to
              indemnify and hold harmless Creatoriva and its operators from
              claims, liabilities, damages, losses, and reasonable expenses
              arising from your misuse of the service, violation of these Terms,
              or violation of another person’s rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              16. Termination
            </h2>

            <p className="mt-4">
              We may suspend or restrict access to Creatoriva when reasonably
              necessary to protect the service, users, systems, or third-party
              rights, or when these Terms are violated.
            </p>

            <p className="mt-4">
              Sections that by their nature should survive termination will
              continue to apply.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              17. Changes to These Terms
            </h2>

            <p className="mt-4">
              We may update these Terms from time to time to reflect changes to
              the service, technology, business practices, or applicable legal
              requirements.
            </p>

            <p className="mt-4">
              The “Last updated” date at the top of this page indicates when
              these Terms were most recently revised.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              18. Governing Law
            </h2>

            <p className="mt-4">
              These Terms will be governed by the laws applicable to the
              operation of Creatoriva, without regard to conflict-of-law
              principles, except where applicable law requires otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              19. Severability
            </h2>

            <p className="mt-4">
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions will remain in effect to
              the extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              20. Contact
            </h2>

            <p className="mt-4">
              If you have questions about these Terms of Service, please use
              the contact method made available on the Creatoriva website.
            </p>
          </section>

          <section className="rounded-2xl bg-zinc-50 p-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Important Note
            </h2>

            <p className="mt-4">
              These Terms are general website terms and are not legal advice.
              Before operating Creatoriva commercially, you should consider
              having the final Terms reviewed by a qualified lawyer based on
              your business location, target users, services, payment
              arrangements, and applicable laws.
            </p>

            <p className="mt-4">
              As Creatoriva evolves, these Terms should be reviewed and updated
              to reflect new features, services, payment methods, data
              practices, or other material changes to the website.
            </p>
          </section>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-zinc-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-700 underline underline-offset-4 transition hover:text-black"
          >
            ← Back to Home
          </Link>

          <Link
            href="/privacy"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Privacy Policy
          </Link>
        </div>
      </article>

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
              className="font-medium text-black"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}