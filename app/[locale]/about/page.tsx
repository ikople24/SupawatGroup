import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { readProfile } from "@/lib/content";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const profile = await readProfile(l);
  const t = dict.about;

  return (
    <main>
      <section className="sg-gradient-hero">
        <div className="mx-auto w-full max-w-5xl px-4 py-20 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sg-green-dark)]">
            {t.kicker}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-[var(--sg-navy-deep)] sm:text-5xl">
            <span className="sg-gradient-text">{t.title}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-700">
            {profile.about.summary}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sg-green-dark)]">
              Vision
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-[var(--sg-navy)]">
              {t.vision_label}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              {profile.vision}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sg-green-dark)]">
              Mission
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-[var(--sg-navy)]">
              {t.mission_label}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              {profile.mission}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[var(--sg-navy)] via-[var(--sg-green-dark)] to-[var(--sg-cyan)] text-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-16">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            Brand DNA
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Quality · Sustainability · Co-Creation
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {profile.brand_dna.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur"
              >
                <h3 className="font-display text-xl font-bold uppercase">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm text-white/85">{d.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sg-green-dark)]">
              {t.story_kicker}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[var(--sg-navy-deep)] sm:text-4xl">
              {t.story_title_line1}
              <br />
              {t.story_title_line2}
            </h2>
            <div className="sg-divider mt-6 w-24" />
          </div>
          <div className="space-y-5 text-sm leading-relaxed text-slate-700">
            <p>{profile.about.detail}</p>
            <p className="rounded-2xl border-l-4 border-[var(--sg-green)] bg-slate-50 p-5 font-medium text-slate-800">
              {profile.about.symbol}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-20">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sg-green-dark)]">
          Brand Values
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-[var(--sg-navy-deep)] sm:text-4xl">
          {t.values_title}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {profile.brand_values.map((v) => (
            <div
              key={v.index}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <p className="font-display text-5xl font-extrabold text-[var(--sg-green)] opacity-70">
                {v.index}
              </p>
              <h3 className="mt-2 font-display text-base font-bold uppercase tracking-wide text-[var(--sg-navy)]">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{v.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
