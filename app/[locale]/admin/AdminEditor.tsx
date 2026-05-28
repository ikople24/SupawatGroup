"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  locales,
  localeLongNames,
  localeFlags,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CompanyProfile } from "@/lib/content";
import { saveProfileAction, type SaveState } from "./actions";

const initialState: SaveState = { status: "idle" };

type Props = {
  uiLocale: Locale;
  dict: Dictionary;
  initialProfiles: Record<Locale, CompanyProfile>;
};

type FieldGroup = {
  title: string;
  fields: Array<{
    name: string;
    label: string;
    type: "text" | "textarea";
    rows?: number;
  }>;
};

export function AdminEditor({ uiLocale, dict, initialProfiles }: Props) {
  const router = useRouter();
  const [targetLocale, setTargetLocale] = useState<Locale>(uiLocale);
  const [profile, setProfile] = useState<CompanyProfile>(
    initialProfiles[uiLocale],
  );
  const [state, formAction, pending] = useActionState(
    saveProfileAction,
    initialState,
  );
  const [, startTransition] = useTransition();

  useEffect(() => {
    setProfile(initialProfiles[targetLocale]);
  }, [targetLocale, initialProfiles]);

  useEffect(() => {
    if (state.status === "ok") {
      startTransition(() => {
        router.refresh();
      });
    }
  }, [state, router]);

  const groups: FieldGroup[] = [
    {
      title: "Company",
      fields: [
        { name: "company.name_th", label: dict.admin.name_th, type: "text" },
        { name: "company.name_en", label: dict.admin.name_en, type: "text" },
        {
          name: "company.tagline_th",
          label: dict.admin.tagline_th,
          type: "text",
        },
        {
          name: "company.tagline_en",
          label: dict.admin.tagline_en,
          type: "text",
        },
      ],
    },
    {
      title: "Vision & Mission",
      fields: [
        { name: "vision", label: dict.admin.vision, type: "textarea", rows: 3 },
        {
          name: "mission",
          label: dict.admin.mission,
          type: "textarea",
          rows: 3,
        },
      ],
    },
    {
      title: "About",
      fields: [
        {
          name: "about.summary",
          label: dict.admin.about_summary,
          type: "textarea",
          rows: 4,
        },
        {
          name: "about.detail",
          label: dict.admin.about_detail,
          type: "textarea",
          rows: 5,
        },
        {
          name: "about.symbol",
          label: dict.admin.about_symbol,
          type: "textarea",
          rows: 2,
        },
      ],
    },
    {
      title: "Contact",
      fields: [
        {
          name: "contact.address_th",
          label: dict.admin.contact_address,
          type: "text",
        },
        {
          name: "contact.phone",
          label: dict.admin.contact_phone,
          type: "text",
        },
        {
          name: "contact.email",
          label: dict.admin.contact_email,
          type: "text",
        },
        {
          name: "contact.map_embed_url",
          label: dict.admin.contact_map,
          type: "text",
        },
      ],
    },
  ];

  function valueOf(path: string): string {
    const parts = path.split(".");
    let cur: unknown = profile;
    for (const p of parts) {
      if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
        cur = (cur as Record<string, unknown>)[p];
      } else {
        return "";
      }
    }
    return typeof cur === "string" ? cur : "";
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 text-sm">
          <span className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {dict.admin.lang_label}
          </span>
          {locales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => setTargetLocale(loc)}
              className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 font-medium transition ${
                targetLocale === loc
                  ? "bg-[var(--sg-navy)] text-white"
                  : "text-slate-600 hover:text-[var(--sg-navy)]"
              }`}
            >
              <span aria-hidden>{localeFlags[loc]}</span>
              <span>{localeLongNames[loc]}</span>
            </button>
          ))}
        </div>
        {state.status === "ok" ? (
          <p className="rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
            ✓ {dict.common.saved}
          </p>
        ) : null}
        {state.status === "error" ? (
          <p className="rounded-full bg-red-50 px-4 py-1.5 text-sm font-medium text-red-700">
            {dict.common.error}: {state.message}
          </p>
        ) : null}
      </div>

      <form
        action={formAction}
        key={targetLocale}
        className="mt-6 space-y-8"
      >
        <input type="hidden" name="targetLocale" value={targetLocale} />

        {groups.map((group) => (
          <fieldset
            key={group.title}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <legend className="px-2 font-display text-xs font-semibold uppercase tracking-[0.25em] text-[var(--sg-green-dark)]">
              {group.title}
            </legend>
            <div className="grid gap-4 md:grid-cols-2">
              {group.fields.map((f) => (
                <div
                  key={f.name}
                  className={f.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <label className="text-xs font-semibold text-slate-600">
                    {f.label}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      name={f.name}
                      defaultValue={valueOf(f.name)}
                      rows={f.rows ?? 3}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm leading-relaxed text-slate-800 outline-none transition focus:border-[var(--sg-navy)] focus:ring-2 focus:ring-[var(--sg-navy)]/20"
                    />
                  ) : (
                    <input
                      name={f.name}
                      defaultValue={valueOf(f.name)}
                      className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[var(--sg-navy)] focus:ring-2 focus:ring-[var(--sg-navy)]/20"
                    />
                  )}
                </div>
              ))}
            </div>
          </fieldset>
        ))}

        <div className="sticky bottom-4 z-10 flex justify-end">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[var(--sg-navy)] via-[var(--sg-green-dark)] to-[var(--sg-cyan)] px-6 text-sm font-semibold text-white shadow-lg transition hover:opacity-95 disabled:opacity-60"
          >
            {pending ? "…" : dict.admin.save}
          </button>
        </div>
      </form>
    </div>
  );
}
