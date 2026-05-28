import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { readProfile } from "@/lib/content";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const profile = await readProfile(l);
  const t = dict.contact;
  const prefix = `/${l}`;

  const hasEmail = profile.contact.email && profile.contact.email !== "—";

  return (
    <main>
      <section className="sg-gradient-hero">
        <div className="mx-auto w-full max-w-5xl px-4 py-20 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sg-green-dark)]">
            {t.kicker}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-[var(--sg-navy-deep)] sm:text-5xl">
            <span className="sg-gradient-text">{t.title_line1}</span>{" "}
            {t.title_line2}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-700">
            {t.intro}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-[var(--sg-navy)]">
              {t.info_title}
            </h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="font-display text-xs uppercase tracking-wider text-[var(--sg-green-dark)]">
                  {t.address_label}
                </dt>
                <dd className="mt-1 text-slate-700">
                  {profile.contact.address_th}
                </dd>
              </div>
              <div>
                <dt className="font-display text-xs uppercase tracking-wider text-[var(--sg-green-dark)]">
                  {t.phone_label}
                </dt>
                <dd className="mt-1 text-slate-700">{profile.contact.phone}</dd>
              </div>
              <div>
                <dt className="font-display text-xs uppercase tracking-wider text-[var(--sg-green-dark)]">
                  {t.email_label}
                </dt>
                <dd className="mt-1 text-slate-700">{profile.contact.email}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {hasEmail ? (
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[var(--sg-navy)] via-[var(--sg-green-dark)] to-[var(--sg-cyan)] px-5 text-sm font-semibold text-white"
                >
                  {t.send_email}
                </a>
              ) : null}
              <Link
                href={`${prefix}/about`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--sg-navy)] px-5 text-sm font-semibold text-[var(--sg-navy)] transition hover:bg-[var(--sg-navy)] hover:text-white"
              >
                {dict.common.learn_more}
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            {profile.contact.map_embed_url ? (
              <iframe
                title="map"
                src={profile.contact.map_embed_url}
                className="h-full min-h-[360px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex h-full min-h-[360px] items-center justify-center bg-gradient-to-br from-[var(--sg-green-soft)]/60 via-white to-[var(--sg-cyan)]/30 p-8 text-center">
                <div>
                  <p className="font-display text-lg font-bold text-[var(--sg-navy)]">
                    {profile.company.tagline_en}
                  </p>
                  <p className="mt-3 max-w-sm text-sm text-slate-600">
                    {t.fallback_text}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
