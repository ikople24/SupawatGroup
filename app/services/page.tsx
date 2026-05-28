import profile from "@/content/company-profile.th.json";

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <header className="mb-10">
        <p className="text-sm text-zinc-500">Services</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          บริการของเรา
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-600 dark:text-zinc-400">
          เลือกดูบริการหลักของบริษัท (คุณสามารถแก้ไขรายละเอียดได้ในไฟล์{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-sm dark:bg-white/10">
            content/company-profile.th.json
          </code>
          )
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {profile.services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-950"
          >
            <h2 className="text-base font-semibold">{service.title}</h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {service.description}
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
              {service.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}

