import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          Supawat Group
        </Link>
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="inline-flex h-10 items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}

