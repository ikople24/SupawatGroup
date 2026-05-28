"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  locales,
  localeFlags,
  localeNames,
  localeLongNames,
  type Locale,
} from "@/i18n/config";

type Props = {
  current: Locale;
};

export function LocaleSwitcher({ current }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname() || `/${current}`;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: Locale) {
    if (next === current) {
      setOpen(false);
      return;
    }
    const parts = pathname.split("/");
    parts[1] = next;
    const nextPath = parts.join("/") || `/${next}`;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setOpen(false);
    startTransition(() => {
      router.replace(nextPath);
      router.refresh();
    });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-[var(--sg-navy)]/40 hover:text-[var(--sg-navy)] disabled:opacity-60"
        disabled={isPending}
      >
        <span aria-hidden>{localeFlags[current]}</span>
        <span className="font-display">{localeNames[current]}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden
          className={`transition ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2.5 4.5L6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg ring-1 ring-black/5"
        >
          {locales.map((loc) => (
            <button
              key={loc}
              role="menuitemradio"
              aria-checked={loc === current}
              onClick={() => switchTo(loc)}
              className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition hover:bg-slate-50 ${
                loc === current
                  ? "bg-slate-50 font-semibold text-[var(--sg-navy)]"
                  : "text-slate-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <span aria-hidden>{localeFlags[loc]}</span>
                <span>{localeLongNames[loc]}</span>
              </span>
              {loc === current ? (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <path
                    d="M2 7l3.5 3.5L12 3.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
