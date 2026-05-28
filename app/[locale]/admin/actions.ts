"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isLocale, locales, defaultLocale, type Locale } from "@/i18n/config";
import { clearSession, getSession } from "@/lib/auth";
import { readProfile, writeProfile } from "@/lib/content";

export type SaveState =
  | { status: "idle" }
  | { status: "ok"; locale: Locale }
  | { status: "error"; message: string };

export async function saveProfileAction(
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const session = await getSession();
  if (!session) {
    return { status: "error", message: "Unauthorized" };
  }

  const targetRaw = String(formData.get("targetLocale") ?? defaultLocale);
  if (!isLocale(targetRaw)) {
    return { status: "error", message: "Invalid locale" };
  }
  const target = targetRaw;

  try {
    const profile = await readProfile(target);
    profile.company.name_th = String(
      formData.get("company.name_th") ?? profile.company.name_th,
    );
    profile.company.name_en = String(
      formData.get("company.name_en") ?? profile.company.name_en,
    );
    profile.company.tagline_th = String(
      formData.get("company.tagline_th") ?? profile.company.tagline_th,
    );
    profile.company.tagline_en = String(
      formData.get("company.tagline_en") ?? profile.company.tagline_en,
    );
    profile.vision = String(formData.get("vision") ?? profile.vision);
    profile.mission = String(formData.get("mission") ?? profile.mission);
    profile.about.summary = String(
      formData.get("about.summary") ?? profile.about.summary,
    );
    profile.about.detail = String(
      formData.get("about.detail") ?? profile.about.detail,
    );
    profile.about.symbol = String(
      formData.get("about.symbol") ?? profile.about.symbol,
    );
    profile.contact.address_th = String(
      formData.get("contact.address_th") ?? profile.contact.address_th,
    );
    profile.contact.phone = String(
      formData.get("contact.phone") ?? profile.contact.phone,
    );
    profile.contact.email = String(
      formData.get("contact.email") ?? profile.contact.email,
    );
    profile.contact.map_embed_url = String(
      formData.get("contact.map_embed_url") ?? profile.contact.map_embed_url,
    );

    await writeProfile(target, profile);

    for (const loc of locales) {
      revalidatePath(`/${loc}`);
      revalidatePath(`/${loc}/about`);
      revalidatePath(`/${loc}/services`);
      revalidatePath(`/${loc}/contact`);
    }

    return { status: "ok", locale: target };
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function logoutAction(formData: FormData): Promise<void> {
  const localeRaw = String(formData.get("locale") ?? defaultLocale);
  const locale = isLocale(localeRaw) ? localeRaw : defaultLocale;
  await clearSession();
  redirect(`/${locale}`);
}
