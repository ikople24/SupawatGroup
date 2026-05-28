import Image from "next/image";
import Link from "next/link";
import { LocaleSwitcher } from "@/components/site/LocaleSwitcher";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  dict: Dictionary;
  authenticated: boolean;
};

export function NavBar({ locale, dict, authenticated }: Props) {
  const prefix = `/${locale}`;
  const nav = [
    { href: prefix, label: dict.nav.home },
    { href: `${prefix}/about`, label: dict.nav.about },
    { href: `${prefix}/services`, label: dict.nav.services },
    { href: `${prefix}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link href={prefix} className="flex shrink-0 items-center gap-3">
          <Image
            src="/brand/logos/logo-13.png"
            alt="Supawat Group"
            width={180}
            height={90}
            className="h-10 w-auto md:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-600 transition hover:text-[var(--sg-navy)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher current={locale} />
          {authenticated ? (
            <Link
              href={`${prefix}/admin`}
              className="hidden h-10 items-center justify-center rounded-full border border-[var(--sg-green-dark)] px-4 text-sm font-semibold text-[var(--sg-green-dark)] transition hover:bg-[var(--sg-green-dark)] hover:text-white sm:inline-flex"
            >
              {dict.nav.admin}
            </Link>
          ) : (
            <Link
              href={`${prefix}/login`}
              className="hidden h-10 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-[var(--sg-navy)] hover:text-[var(--sg-navy)] sm:inline-flex"
            >
              {dict.nav.login}
            </Link>
          )}
          <Link
            href={`${prefix}/contact`}
            className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-[var(--sg-navy)] via-[var(--sg-green-dark)] to-[var(--sg-cyan)] px-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            {dict.common.contact_us}
          </Link>
        </div>
      </div>
    </header>
  );
}
