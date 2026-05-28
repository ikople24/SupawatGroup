import profile from "@/content/company-profile.th.json";

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <header className="mb-10">
        <p className="text-sm text-zinc-500">Contact</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          ติดต่อเรา
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-600 dark:text-zinc-400">
          หากต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อได้ตามช่องทางด้านล่าง
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold">ข้อมูลติดต่อ</h2>

          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-zinc-500">ที่อยู่</dt>
              <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
                {profile.contact.address_th}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500">โทร</dt>
              <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
                {profile.contact.phone}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500">อีเมล</dt>
              <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
                {profile.contact.email}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <a
              className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
              href={
                profile.contact.email
                  ? `mailto:${profile.contact.email}`
                  : "/contact"
              }
            >
              ส่งอีเมล
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-zinc-950">
          {profile.contact.map_embed_url ? (
            <iframe
              title="map"
              src={profile.contact.map_embed_url}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-[420px] w-full items-center justify-center p-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
              ยังไม่ได้ตั้งค่าแผนที่ (เพิ่มได้ที่{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 dark:bg-white/10">
                content/company-profile.th.json
              </code>
              )
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

