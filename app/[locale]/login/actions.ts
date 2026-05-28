"use server";

import { redirect } from "next/navigation";
import { setSession, verifyCredentials, clearSession } from "@/lib/auth";
import { isLocale, defaultLocale } from "@/i18n/config";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const localeRaw = String(formData.get("locale") ?? defaultLocale);
  const locale = isLocale(localeRaw) ? localeRaw : defaultLocale;

  if (!verifyCredentials(username, password)) {
    return { error: "invalid" };
  }

  await setSession(username);
  redirect(`/${locale}/admin`);
}

export async function logoutAction(formData: FormData): Promise<void> {
  const localeRaw = String(formData.get("locale") ?? defaultLocale);
  const locale = isLocale(localeRaw) ? localeRaw : defaultLocale;
  await clearSession();
  redirect(`/${locale}`);
}
