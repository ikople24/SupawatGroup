import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Locale } from "@/i18n/config";

export type BrandDna = { title: string; subtitle: string; color: string };
export type BrandValue = { index: string; title: string; description: string };
export type Service = { title: string; description: string; bullets: string[] };
export type Highlight = { title: string; description: string };
export type StatItem = { value: string; label: string };

export type CompanyProfile = {
  company: {
    name_th: string;
    name_en: string;
    abbr: string;
    tagline_th: string;
    tagline_en: string;
  };
  vision: string;
  mission: string;
  brand_dna: BrandDna[];
  brand_values: BrandValue[];
  about: {
    summary: string;
    detail: string;
    symbol: string;
  };
  services: Service[];
  highlights: Highlight[];
  stats: StatItem[];
  contact: {
    address_th: string;
    phone: string;
    email: string;
    map_embed_url: string;
  };
  social: {
    facebook: string;
    line: string;
    website: string;
  };
};

const contentDir = path.join(process.cwd(), "content");

function fileFor(locale: Locale): string {
  return path.join(contentDir, `company-profile.${locale}.json`);
}

export async function readProfile(locale: Locale): Promise<CompanyProfile> {
  const raw = await fs.readFile(fileFor(locale), "utf-8");
  return JSON.parse(raw) as CompanyProfile;
}

export async function writeProfile(
  locale: Locale,
  data: CompanyProfile,
): Promise<void> {
  const target = fileFor(locale);
  const json = JSON.stringify(data, null, 2) + "\n";
  await fs.writeFile(target, json, "utf-8");
}
