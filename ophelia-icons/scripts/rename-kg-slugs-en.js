#!/usr/bin/env node
/**
 * uXXX-kg-{slug}.svg dosyalarında Türkçe/müşteri slug'larını İngilizce kebab-case'e çevirir.
 * Unicode önek sabit kalır (font kod noktası).
 *
 * Çıktı: kg-rename-report.md (paket kökü)
 * Kullanım: node scripts/rename-kg-slugs-en.js
 */

const fs = require("fs");
const path = require("path");

const ICONS = path.join(__dirname, "..", "src", "icons");
const REPORT = path.join(__dirname, "..", "kg-rename-report.md");

/** Eski slug (kg- sonrası, .svg öncesi) → yeni İngilizce slug */
const SLUG_MAP = {
  anasayfa: "home",
  anket: "survey",
  anlik_duyurular: "instant-announcements",
  aramiza_yeni_katilanlar: "new-members",
  bugun_doganlar: "birthdays-today",
  calisan_iliskileri: "employee-relations",
  ceket: "jacket",
  duyurular: "announcements",
  guvenlik_gorevlisi: "security-guard",
  idari_isler: "administrative-affairs",
  ik: "hr",
  kartega_icon: "kartega-symbol",
  odemelerim: "my-payments",
  organizasyon: "organizational-structure",
  profil: "profile",
  profil_outline: "profile-outline",
  sikayet_ve_oneriler: "complaints-and-suggestions",
  talepvegorevlerim: "requests-and-tasks",
  vardiya: "shift",
  yelek: "vest",
  yemek_menusu: "meal-menu",
  yeni_doganlar: "newborns-list",
  yonetimsayfasi: "management-dashboard",
  "zimmet-dusurme": "inventory-write-off",
  "zimmet-form": "inventory-handover-form",
  zimmetyonetimi: "inventory-management",
  // yaygın yazım / tutarlılık (İngilizce hedef)
  humanresources: "human-resources",
  instragram: "instagram",
};

function main() {
  const files = fs
    .readdirSync(ICONS)
    .filter((f) => f.endsWith(".svg") && /-kg-/.test(f))
    .sort();

  const rows = [];
  const usedNew = new Map();

  for (const file of files) {
    const m = file.match(/^(u[0-9A-F]+)-kg-(.+)\.svg$/i);
    if (!m) continue;
    const [, unicode, slug] = m;
    const mapped = SLUG_MAP[slug];
    const newSlug = mapped !== undefined ? mapped : slug;
    const newFile = `${unicode}-kg-${newSlug}.svg`;

    if (mapped !== undefined && newSlug !== slug) {
      const targetPath = path.join(ICONS, newFile);
      if (fs.existsSync(targetPath) && targetPath !== path.join(ICONS, file)) {
        console.error(`Çakışma: ${newFile} zaten var (${file})`);
        process.exit(1);
      }
      if (usedNew.has(newSlug) && usedNew.get(newSlug) !== file) {
        console.error(`Aynı hedef slug iki kaynak için: ${newSlug}`);
        process.exit(1);
      }
      usedNew.set(newSlug, file);
    }

    rows.push({
      file,
      unicode,
      oldSlug: slug,
      newSlug,
      renamed: mapped !== undefined && newSlug !== slug,
    });
  }

  // İkinci geçiş: rename (hedef boş)
  let count = 0;
  for (const r of rows) {
    if (!r.renamed) continue;
    const from = path.join(ICONS, r.file);
    const to = path.join(ICONS, `${r.unicode}-kg-${r.newSlug}.svg`);
    fs.renameSync(from, to);
    count++;
  }

  const md = [
    "# KG ikon slug yeniden adlandırma (→ İngilizce)",
    "",
    `- İşlenen: **${files.length}** dosya`,
    `- Yeniden adlandırılan: **${count}**`,
    "",
    "| Unicode | Eski slug | Yeni slug (İngilizce) | Dosya |",
    "|---------|-----------|------------------------|-------|",
    ...rows.map((r) => {
      const fn = `${r.unicode}-kg-${r.newSlug}.svg`;
      return `| ${r.unicode} | \`${r.oldSlug}\` | \`${r.newSlug}\` | \`${fn}\` |`;
    }),
    "",
  ];

  fs.writeFileSync(REPORT, md.join("\n"), "utf8");

  console.log(`Tamam: ${count} dosya yeniden adlandırıldı.`);
  console.log(`Rapor: ${REPORT}`);
  console.log("\nSonra: npm run build:icons:components");
}

main();
