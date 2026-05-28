"use client";

import { useActionState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function LoginForm({ locale, dict }: Props) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      <div>
        <label className="font-display text-xs font-semibold uppercase tracking-wider text-[var(--sg-green-dark)]">
          {dict.auth.username}
        </label>
        <input
          name="username"
          required
          autoComplete="username"
          className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[var(--sg-navy)] focus:ring-2 focus:ring-[var(--sg-navy)]/20"
        />
      </div>
      <div>
        <label className="font-display text-xs font-semibold uppercase tracking-wider text-[var(--sg-green-dark)]">
          {dict.auth.password}
        </label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[var(--sg-navy)] focus:ring-2 focus:ring-[var(--sg-navy)]/20"
        />
      </div>
      {state.error ? (
        <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-sm text-red-700">
          {dict.auth.invalid}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-[var(--sg-navy)] via-[var(--sg-green-dark)] to-[var(--sg-cyan)] text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-60"
      >
        {pending ? "…" : dict.auth.submit}
      </button>
    </form>
  );
}
