import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CompanyProfile } from "@/lib/content";

type Props = {
  locale: Locale;
  dict: Dictionary;
  profile: CompanyProfile;
};

export function Footer({ locale, dict, profile }: Props) {
  const prefix = `/${locale}`;
  return (
    <footer className="mt-20 text-white">
      <div className="bg-gradient-to-br from-[var(--sg-navy)] via-[var(--sg-green-dark)] to-[var(--sg-cyan)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Image
                src="/brand/logos/logo-04-white.png"
                alt="Supawat Group"
                width={120}
                height={130}
                className="h-16 w-auto"
              />
              <p className="mt-4 text-sm text-white/85">
                {profile.company.tagline_en}
              </p>
              <p className="mt-2 text-sm text-white/75">
                {dict.footer.tagline}
              </p>
            </div>

            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-wider">
                {dict.footer.menu}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                <li>
                  <Link href={prefix} className="hover:text-white">
                    {dict.nav.home}
                  </Link>
                </li>
                <li>
                  <Link href={`${prefix}/about`} className="hover:text-white">
                    {dict.nav.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${prefix}/services`}
                    className="hover:text-white"
                  >
                    {dict.nav.services}
                  </Link>
                </li>
                <li>
                  <Link href={`${prefix}/contact`} className="hover:text-white">
                    {dict.nav.contact}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-wider">
                {dict.footer.brand_dna}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                {profile.brand_dna.map((d) => (
                  <li key={d.title}>
                    <span className="font-semibold">{d.title}</span>{" "}
                    <span className="text-white/75">— {d.subtitle}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-wider">
                {dict.footer.contact}
              </p>
              <p className="mt-4 text-sm text-white/85">
                {profile.company.name_en} ({profile.company.abbr})
              </p>
              <p className="mt-1 text-sm text-white/85">
                {profile.contact.address_th}
              </p>
              {profile.contact.email && profile.contact.email !== "—" ? (
                <p className="mt-1 text-sm text-white/85">
                  {profile.contact.email}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-10 border-t border-white/20 pt-6 text-xs text-white/70 sm:flex sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Supawat Group. All rights reserved.
            </p>
            <p>Built with Next.js · Tailwind</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
