import { notFound, redirect } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSession } from "@/lib/auth";
import { readProfile, type CompanyProfile } from "@/lib/content";
import { AdminEditor } from "./AdminEditor";
import { logoutAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  const session = await getSession();
  if (!session) redirect(`/${l}/login`);

  const profilesEntries = await Promise.all(
    locales.map(async (loc) => [loc, await readProfile(loc)] as const),
  );
  const profiles = Object.fromEntries(profilesEntries) as Record<
    Locale,
    CompanyProfile
  >;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sg-green-dark)]">
            Admin
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-[var(--sg-navy-deep)]">
            {dict.admin.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            {dict.admin.subtitle}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Signed in as <span className="font-semibold">{session.username}</span>
          </p>
        </div>
        <form action={logoutAction}>
          <input type="hidden" name="locale" value={l} />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600"
          >
            {dict.nav.logout}
          </button>
        </form>
      </div>

      <div className="mt-10">
        <AdminEditor uiLocale={l} dict={dict} initialProfiles={profiles} />
      </div>
    </main>
  );
}
