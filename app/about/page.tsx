import profile from "@/content/company-profile.th.json";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <header className="mb-10">
        <p className="text-sm text-zinc-500">About</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          เกี่ยวกับ {profile.company.name_th}
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-600 dark:text-zinc-400">
          {profile.about.summary}
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold">วิสัยทัศน์</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            {profile.about.vision}
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold">พันธกิจ</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
            {profile.about.mission.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold">ไทม์ไลน์</h2>
        <ol className="mt-4 space-y-4">
          {profile.about.history_timeline.map((item) => (
            <li
              key={`${item.year}-${item.detail}`}
              className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-950"
            >
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {item.year}
              </p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

