import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { NavBar } from "@/components/site/NavBar";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { readProfile } from "@/lib/content";
import { getSession } from "@/lib/auth";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const profile = await readProfile(locale);
  return {
    title: `${profile.company.name_en} | ${profile.company.tagline_en}`,
    description: profile.about.summary,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const profile = await readProfile(typedLocale);
  const session = await getSession();

  return (
    <>
      <NavBar locale={typedLocale} dict={dict} authenticated={!!session} />
      <div className="flex-1">{children}</div>
      <Footer locale={typedLocale} dict={dict} profile={profile} />
    </>
  );
}
