export function Footer() {
  return (
    <footer className="border-t border-black/10 py-10 text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-400">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-zinc-700 dark:text-zinc-300">
            © {new Date().getFullYear()} Supawat Group. All rights reserved.
          </p>
          <p>Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}

