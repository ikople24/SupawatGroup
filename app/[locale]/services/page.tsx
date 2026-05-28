import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { readProfile } from "@/lib/content";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const profile = await readProfile(l);
  const t = dict.services;
  const prefix = `/${l}`;

  return (
    <main>
      <section className="sg-gradient-hero">
        <div className="mx-auto w-full max-w-5xl px-4 py-20 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sg-green-dark)]">
            {t.kicker}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-[var(--sg-navy-deep)] sm:text-5xl">
            {t.title_line1}
            <br />
            <span className="sg-gradient-text">{t.title_line2}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-700">
            {t.intro}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.services.map((service) => (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="sg-gradient-card h-20 px-6 py-5 text-white">
                <p className="font-display text-lg font-bold leading-tight">
                  {service.title}
                </p>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-slate-500">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-[var(--sg-green)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[var(--sg-navy-deep)] via-[var(--sg-green-dark)] to-[var(--sg-cyan)] text-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-4 py-16 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            Get in touch
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            {t.cta_title}
          </h2>
          <p className="max-w-2xl text-sm text-white/85">{t.cta_text}</p>
          <Link
            href={`${prefix}/contact`}
            className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[var(--sg-navy-deep)] transition hover:bg-white/90"
          >
            {t.cta_button}
          </Link>
        </div>
      </section>
    </main>
  );
}
