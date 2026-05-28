import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSession } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  const session = await getSession();
  if (session) redirect(`/${l}/admin`);

  return (
    <main className="sg-gradient-hero min-h-[calc(100vh-9rem)]">
      <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-16">
        <Image
          src="/brand/logos/logo-01.png"
          alt="Supawat Group"
          width={120}
          height={132}
          className="h-24 w-auto"
        />
        <div className="mt-8 w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-xl">
          <h1 className="font-display text-2xl font-bold text-[var(--sg-navy-deep)]">
            {dict.auth.login_title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{dict.auth.login_subtitle}</p>
          <div className="mt-6">
            <LoginForm locale={l} dict={dict} />
          </div>
        </div>
      </div>
    </main>
  );
}
