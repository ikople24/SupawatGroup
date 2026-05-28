import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { readProfile } from "@/lib/content";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const profile = await readProfile(l);
  const t = dict.home;
  const prefix = `/${l}`;

  return (
    <main className="flex flex-col">
      <section className="sg-gradient-hero relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sg-green-dark)]">
              {t.kicker}
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-[var(--sg-navy-deep)] sm:text-5xl lg:text-6xl">
              <span className="sg-gradient-text">{t.title_line1}</span>
              <br />
              <span className="text-[var(--sg-navy-deep)]">{t.title_line2}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
              {profile.company.tagline_th}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`${prefix}/services`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[var(--sg-navy)] via-[var(--sg-green-dark)] to-[var(--sg-cyan)] px-6 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
              >
                {t.cta_learn}
              </Link>
              <Link
                href={`${prefix}/about`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--sg-navy)] px-6 text-sm font-semibold text-[var(--sg-navy)] transition hover:bg-[var(--sg-navy)] hover:text-white"
              >
                {t.cta_about}
              </Link>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {profile.brand_dna.map((dna) => (
                <div key={dna.title} className="text-center">
                  <p className="font-display text-lg font-bold text-[var(--sg-navy)]">
                    {dna.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-500">
                    {dna.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute -top-10 right-10 h-40 w-40 rounded-full bg-[var(--sg-green-soft)]/60 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[var(--sg-cyan)]/40 blur-3xl" />
            <div className="relative rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl backdrop-blur">
              <Image
                src="/brand/logos/logo-01.png"
                alt="Supawat Group logo"
                width={360}
                height={400}
                className="h-auto w-[280px] sm:w-[320px]"
                priority
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sg-green-dark)]">
            {t.section_services_kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[var(--sg-navy-deep)] sm:text-4xl">
            {t.section_services_title_line1}
            <br />
            {t.section_services_title_line2}
          </h2>
          <div className="sg-divider mx-auto mt-6 w-32" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.services.slice(0, 6).map((service) => (
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
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              {t.section_stats_kicker}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              {t.section_stats_title_line1}
              <br />
              {t.section_stats_title_line2}
            </h2>
            <p className="mt-4 max-w-md text-sm text-white/85">
              {t.section_stats_text}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur"
              >
                <p className="font-display text-3xl font-extrabold">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-white/85">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sg-green-dark)]">
              {t.section_values_kicker}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[var(--sg-navy-deep)] sm:text-4xl">
              {t.section_values_title_line1}
              <br />
              {t.section_values_title_line2}
            </h2>
            <p className="mt-4 max-w-md text-sm text-slate-600">
              {t.section_values_text}
            </p>
          </div>
          <div className="space-y-4">
            {profile.brand_values.map((v) => (
              <div
                key={v.index}
                className="flex gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <span className="font-display text-4xl font-extrabold text-[var(--sg-green)] opacity-70">
                  {v.index}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--sg-navy)]">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
