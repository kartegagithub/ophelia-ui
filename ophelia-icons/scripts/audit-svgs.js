#!/usr/bin/env node
/**
 * Kaynak SVG'leri (src/icons/*.svg) sezgisel olarak tarar.
 *
 * Varsayılan: klasördeki **tüm** .svg dosyaları.
 * `--kg-only`: sadece dosya adında `-kg-` geçenler (Kartega seti).
 *
 * Kurallar:
 * - high NO_PATH: Hiç <path d=...> yok (polygon/circle/text olabilir).
 * - high M00M_BACKDROP: İlk path `M0 0` + göreli `m` — tipik iconfont tam-tuval zemin artığı
 *   (`M0 512C...` gibi kasıtlı daireler **hariç**).
 * - info MANY_PATHS: 4+ <path> — çok katmanlı vektör, göz turu.
 *
 * Çıktı (paket kökü): svg-audit-report.json + svg-audit-report.md
 *
 * Kullanım:
 *   npm run audit:svgs
 *   npm run audit:svgs -- --kg-only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ICONS_DIR = path.join(ROOT, "src", "icons");
const OUT_JSON = path.join(ROOT, "svg-audit-report.json");
const OUT_MD = path.join(ROOT, "svg-audit-report.md");

const kgOnly = process.argv.includes("--kg-only");

function extractPathDs(svg) {
  const ds = [];
  const re = /<path\b[^>]*?\bd\s*=\s*["']([^"']*)["']/gi;
  let match;
  while ((match = re.exec(svg)) !== null) {
    ds.push(match[1]);
  }
  return ds;
}

function auditSvg(fileName, svg) {
  /** @type {{ code: string, severity: string, detail: string }[]} */
  const findings = [];
  const ds = extractPathDs(svg);

  if (ds.length === 0) {
    findings.push({
      code: "NO_PATH",
      severity: "high",
      detail:
        "Hiç <path d=...> yok (polygon/circle/text). Elle veya build sonrası bileşende kontrol et.",
    });
    return findings;
  }

  const d0 = ds[0].trim();

  if (/^M\s*0\s+0\s+m/i.test(d0) || /^M\s*0\s*,\s*0\s+m/i.test(d0)) {
    findings.push({
      code: "M00M_BACKDROP",
      severity: "high",
      detail:
        "İlk path `M0 0` + göreli `m` ile başlıyor; tipik iconfont tam tuval zemin path'i. Fazla katman genelde silinir.",
    });
  }

  if (ds.length >= 4) {
    findings.push({
      code: "MANY_PATHS",
      severity: "info",
      detail: `${ds.length} adet <path>; çok katmanlı veya bileşik — gereksiz zemin var mı bak.`,
    });
  }

  return findings;
}

function main() {
  if (!fs.existsSync(ICONS_DIR)) {
    console.error("src/icons bulunamadı:", ICONS_DIR);
    process.exit(1);
  }

  let files = fs.readdirSync(ICONS_DIR).filter((f) => f.endsWith(".svg"));
  if (kgOnly) {
    files = files.filter((f) => f.includes("-kg-"));
  }
  files.sort();

  const report = {
    generatedAt: new Date().toISOString(),
    scannedDir: "src/icons",
    filter: kgOnly ? "dosya adında `-kg-`" : "tüm *.svg",
    iconCount: files.length,
    files: [],
  };

  for (const file of files) {
    const full = path.join(ICONS_DIR, file);
    const svg = fs.readFileSync(full, "utf8");
    const findings = auditSvg(file, svg);
    if (findings.length) {
      report.files.push({ file, findings });
    }
  }

  const hasHigh = (f) => f.findings.some((x) => x.severity === "high");

  report.summary = {
    withAnyFinding: report.files.length,
    withHigh: report.files.filter(hasHigh).length,
  };

  fs.writeFileSync(OUT_JSON, JSON.stringify(report, null, 2), "utf8");

  const scopeLine = kgOnly
    ? "Yalnızca `*-kg-*.svg`"
    : "`src/icons` içindeki tüm `.svg`";

  const md = [
    "# SVG kaynak denetim raporu",
    "",
    "Otomatik sezgisel kurallar; **yanlış pozitif** olabilir. `high` satırlarını öncelikle aç.",
    "",
    `- Üretim: ${report.generatedAt}`,
    `- Kapsam: ${scopeLine}`,
    `- Taranan: **${report.iconCount}** dosya`,
    `- Bulgu içeren: **${report.summary.withAnyFinding}** (high: **${report.summary.withHigh}**)`,
    "",
    "- Tüm ikonlar: `npm run audit:svgs`",
    "- Sadece Kartega (`kg`): `npm run audit:svgs -- --kg-only`",
    "",
    "---",
    "",
    ...report.files.flatMap((f) => [
      `## \`${f.file}\``,
      ...f.findings.map(
        (x) => `- **${x.severity}** \`${x.code}\`: ${x.detail}`
      ),
      "",
    ]),
  ];

  if (report.files.length === 0) {
    md.push("_Şu an raporlanan bulgu yok._");
  }

  fs.writeFileSync(OUT_MD, md.join("\n"), "utf8");

  process.stdout.write(
    [
      `Kapsam: ${kgOnly ? "kg-only" : "all icons"}`,
      `Taranan: ${report.iconCount} SVG`,
      `Bulgu içeren dosya: ${report.summary.withAnyFinding} (high: ${report.summary.withHigh})`,
      `JSON: ${OUT_JSON}`,
      `MD:   ${OUT_MD}`,
      "",
    ].join("\n")
  );
}

main();
