import Link from "next/link";
import profile from "@/content/company-profile.th.json";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <section className="overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-white to-zinc-50 p-8 dark:border-white/10 dark:from-zinc-950 dark:to-black sm:p-12">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {profile.company.tagline_th}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {profile.company.name_th}
        </h1>
        <p className="mt-5 max-w-2xl text-zinc-600 dark:text-zinc-400">
          {profile.about.summary}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/services"
            className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            ดูบริการ
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-black/5 dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/5"
          >
            ติดต่อเรา
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-3">
        {profile.highlights.map((h) => (
          <div
            key={h.title}
            className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-950"
          >
            <h2 className="text-base font-semibold">{h.title}</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {h.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm text-zinc-500">Featured services</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              บริการหลัก
            </h2>
          </div>
          <Link
            href="/services"
            className="text-sm font-medium text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
          >
            ดูทั้งหมด
          </Link>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.services.slice(0, 3).map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-950"
            >
              <h3 className="text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
