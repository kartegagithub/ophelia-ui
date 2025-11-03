/**
* 🔤 Pendigit Icon Font Builder
* 1️⃣ SVG'leri temizler (stroke → fill)
* 2️⃣ Font & CSS üretir
* 3️⃣ Otomatik HTML önizleme (preview.html) oluşturur
*/

const webfont = require("webfont").default;
const fs = require("fs");
const path = require("path");
let optimize;
try {
  optimize = require("svgo").optimize;
} catch (e) {
  optimize = undefined;
}

const SVG_DIR = "src/icons";
const DIST_DIR = "src/components";
const FONT_NAME = "pendigit-site-icon";

/* ----------------------------- 🧩 1. SVG Fixleme ----------------------------- */
function toPascalCase(name) {
  return name
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (m) => m.toUpperCase());
}

function ensureViewBox(svg) {
  const hasViewBox = /viewBox="[^"]+"/i.test(svg);
  if (hasViewBox) return svg;
  const widthMatch = svg.match(/\bwidth="(\d+(?:\.\d+)?)"/i);
  const heightMatch = svg.match(/\bheight="(\d+(?:\.\d+)?)"/i);
  const w = widthMatch ? Number(widthMatch[1]) : 24;
  const h = heightMatch ? Number(heightMatch[1]) : 24;
  return svg.replace(/<svg([^>]*)>/i, `<svg$1 viewBox="0 0 ${w} ${h}">`);
}

function normalizeSVG(svg) {
  // CurrentColor kullan; dolmayan path'leri düzelt
  let s = svg
    // Önce boş attribute'ları temizle (name= /> veya name= > gibi)
    .replace(/\s+[a-zA-Z-]+=\s*\/>/g, ' />')
    .replace(/\s+[a-zA-Z-]+=\s*>/g, '>')
    .replace(/\s+[a-zA-Z-]+=\s+(?=\s)/g, ' ')
    // sabit fill renklerini currentColor'a dönüştür
    .replace(/fill="#?[0-9a-fA-F]{3,6}"/g, 'fill="currentColor"')
    .replace(/fill='#?[0-9a-fA-F]{3,6}'/g, 'fill="currentColor"')
    .replace(/fill="(black|white|red|blue|green|yellow|gray|grey|silver|maroon|navy|olive|teal|lime|aqua|fuchsia|purple)"/gi, 'fill="currentColor"')
    .replace(/fill="none"/g, 'fill="currentColor"')
    .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
    .replace(/\s*stroke-(linecap|linejoin|width)="[^"]*"/g, "")
    // Boş attribute'ları temizle (normalize işleminden önce)
    .replace(/\s+[a-zA-Z-]+=\s*\/>/g, ' />')
    .replace(/\s+[a-zA-Z-]+=\s*>/g, '>');
  // style="fill:#000; stroke:#000" gibi değerleri currentColor'a çevir
  s = s.replace(/style="([^"]*)"/gi, (m, css) => {
    const c = css
      .replace(/fill:\s*#[0-9a-fA-F]{3,6}/gi, 'fill:currentColor')
      .replace(/stroke:\s*#[0-9a-fA-F]{3,6}/gi, 'stroke:currentColor')
      .replace(/fill:\s*none/gi, 'fill:currentColor');
    return `style="${c}"`;
  });
  
  // Grup seviyesi fill/stroke'ları currentColor'a çevir
  s = s.replace(/\sfill="#[0-9a-fA-F]{3,6}"/gi, ' fill="currentColor"')
       .replace(/\sstroke="#[0-9a-fA-F]{3,6}"/gi, ' stroke="currentColor"');
  
  // Her path için en azından fill ya da stroke olsun
  s = s.replace(/<path(?![^>]*\b(fill|stroke)\b)/g, '<path fill="currentColor"');
  s = ensureViewBox(s);

  // Açık path'leri (Z yok) stroke ikonuna çevir (ok vs.)
  s = s.replace(/<path([^>]*)d="([^"]+)"([^>]*)>/gi, (m, pre, d, post) => {
    const closed = /[Zz]/.test(d);
    if (closed) return m;
    // fill'leri kaldır, stroke ekle
    let attrs = (pre + ' ' + post)
      .replace(/\s*fill="[^"]*"/gi, '')
      .replace(/\s*stroke="[^"]*"/gi, '')
      .replace(/\s*stroke-width="[^"]*"/gi, '')
      .replace(/\s*stroke-linecap="[^"]*"/gi, '')
      .replace(/\s*stroke-linejoin="[^"]*"/gi, '')
      // self-closing '/>' kalıntı slash'larını temizle
      .replace(/\s*\/\s*/g, ' ')
      // Boş attribute'ları kaldır (name= gibi) - sonradan temizle
      .replace(/\s+[a-zA-Z-]+=\s+(?=\s|>|\/>)/g, ' ')
      .trim();
    // Eğer attrs boşsa, sadece boşluk bırak
    const attrsPart = attrs ? ` ${attrs}` : '';
    return `<path${attrsPart} d="${d}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />`;
  });

  // Diğer şekiller: circle/ellipse/line/polyline/polygon
  s = s.replace(/<(circle|ellipse|line|polyline|polygon)([^>]*?)(?:\s*\/\s*)?>(?![^<]*<\/(circle|ellipse|line|polyline|polygon)>)/gi,
    (m, tag, rest) => {
      let r = rest
        .replace(/\sfill="[^"]*"/gi, '')
        .replace(/\sstroke="[^"]*"/gi, '')
        .replace(/\s*\/\s*/g, ' ')
        // Boş attribute'ları kaldır (name= gibi)
        .replace(/\s+[a-zA-Z-]+=\s+(?=\s|>|\/>)/g, ' ')
        .trim();
      if (!/stroke=/i.test(r)) r += ' stroke="currentColor"';
      if (!/fill=/i.test(r) && /^(line|polyline)$/i.test(tag)) r += ' fill="none"';
      return `<${tag}${r ? ' ' + r : ''} />`;
    });

  // Final temizleme: Boş attribute'ları kaldır
  s = s.replace(/\s+[a-zA-Z-]+=\s*\/>/g, ' />');
  s = s.replace(/\s+[a-zA-Z-]+=\s*>/g, '>');
  s = s.replace(/\s+[a-zA-Z-]+=\s+(?=\s|>|\/>)/g, ' ');
  // Çoklu boşlukları temizle
  s = s.replace(/\s{2,}/g, ' ');
  
  return s;
}

function fixSVGs() {
  const files = fs.readdirSync(SVG_DIR).filter((f) => f.endsWith(".svg"));
  files.forEach((file) => {
    const filePath = path.join(SVG_DIR, file);
    let svg = fs.readFileSync(filePath, "utf8");
    // SVGO optimize (opsiyonel)
    if (optimize) {
      try {
        const optimized = optimize(svg, {
          multipass: true,
          plugins: [
            { name: 'removeDimensions', active: false },
            { name: 'removeXMLNS', active: true },
            { name: 'removeDoctype', active: true },
            { name: 'removeComments', active: true },
            { name: 'removeEmptyAttrs', active: true },
            { name: 'convertShapeToPath', active: true },
            { name: 'convertStyleToAttrs', active: true },
          ],
        });
        svg = optimized.data;
      } catch (_) {
        // svgo başarısız olursa, mevcut svg ile devam et
      }
    }
    svg = normalizeSVG(svg);
    fs.writeFileSync(filePath, svg, "utf8");
  });
  console.log("🎨 SVG icons cleaned and ready.");
}

/* ----------------------------- ⚙️ 2. Font Üretimi ---------------------------- */
async function generateFont() {
  try {
    const result = await webfont({
      files: `${SVG_DIR}/*.svg`,
      fontName: FONT_NAME,
      formats: ["woff2", "woff", "ttf", "eot"],
      normalize: false, // normalizeSVG zaten yapıldı
      fontHeight: 1000,
      descent: 200,
      prependUnicode: true,
    });

  if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

  for (const format of ["woff2", "woff", "ttf", "eot"]) {
    fs.writeFileSync(path.join(DIST_DIR, `${FONT_NAME}.${format}`), result[format]);
  }

  console.log("💾 Font files generated successfully.");
  return result;
  } catch (error) {
    console.error("❌ Font generation error:", error.message);
    if (error.message && error.message.includes("Attribute without value")) {
      console.error("   Bu hata genellikle boş attribute'lardan kaynaklanır.");
      console.error("   Lütfen SVG dosyalarını kontrol edin.");
    }
    throw error;
  }
}

/* ----------------------------- 💅 3. CSS Oluşturma --------------------------- */
function generateCSS() {
  let css = `@font-face {
  font-family: '${FONT_NAME}';
  src: url('${FONT_NAME}.woff2') format('woff2'),
       url('${FONT_NAME}.woff') format('woff'),
       url('${FONT_NAME}.ttf') format('truetype'),
       url('${FONT_NAME}.eot') format('embedded-opentype');
  font-weight: normal;
  font-style: normal;
}

.pe-icon {
  font-family: '${FONT_NAME}';
  display: inline-block;
  line-height: 1;
  font-style: normal;
  font-weight: normal;
  flex-shrink: 0;
  color: inherit;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}\n`;

  const svgFiles = fs.readdirSync(SVG_DIR).filter((f) => f.endsWith(".svg")).sort();

  svgFiles.forEach((file) => {
    const baseName = path.basename(file, ".svg");
    const [unicodePart, ...iconParts] = baseName.split("-");
    const iconName = iconParts.join("-");
    if (!unicodePart || !iconName) return;
    const unicode = unicodePart.replace(/^u/, "");
    css += `.pe-icon-${iconName}::before { content: "\\${unicode}"; }\n`;
  });

  fs.writeFileSync(path.join(DIST_DIR, `${FONT_NAME}.css`), css, "utf8");
  console.log("🎯 CSS generated successfully.");
}

/* ------------------------ 🧱 4. React Component Üretimi ---------------------- */
function generateReactComponents() {
  const OUT_DIR = path.join("src", "components");
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  if (!fs.existsSync(SVG_DIR)) {
    console.log("⚠️  SVG directory not found, skipping React component generation");
    return;
  }
  const files = fs.readdirSync(SVG_DIR).filter((f) => f.endsWith(".svg")).sort();

  const toReactAttrs = (s) => {
    const map = [
      ["clip-path", "clipPath"],
      ["clip-rule", "clipRule"],
      ["fill-opacity", "fillOpacity"],
      ["fill-rule", "fillRule"],
      ["stroke-width", "strokeWidth"],
      ["stroke-linecap", "strokeLinecap"],
      ["stroke-linejoin", "strokeLinejoin"],
      ["stroke-miterlimit", "strokeMiterlimit"],
      ["stroke-dasharray", "strokeDasharray"],
      ["stroke-dashoffset", "strokeDashoffset"],
      ["stroke-opacity", "strokeOpacity"],
      ["stop-color", "stopColor"],
      ["stop-opacity", "stopOpacity"],
      ["color-interpolation-filters", "colorInterpolationFilters"],
      ["xlink:href", "xlinkHref"],
      ["xml:space", "xmlSpace"],
    ];
    let out = s.replace(/\bclass=/g, "className=");
    for (const [from, to] of map) {
      const re = new RegExp(`\\b${from}=`, "g");
      out = out.replace(re, `${to}=`);
    }
    return out;
  };

  const sanitizeInnerSvg = (s) => {
    // Remove per-element paint/line attrs so top-level props control style
    return s
      .replace(/\sfill="[^"]*"/gi, "")
      .replace(/\sstroke="[^"]*"/gi, "")
      .replace(/\sstrokeWidth="[^"]*"/gi, "")
      .replace(/\sstroke-linecap="[^"]*"/gi, "")
      .replace(/\sstroke-linejoin="[^"]*"/gi, "")
      .replace(/\sstrokeLinecap="[^"]*"/g, "")
      .replace(/\sstrokeLinejoin="[^"]*"/g, "");
  };

  const rewriteIds = (s, prefix) => {
    const ids = new Set();
    s.replace(/\bid="([^"]+)"/g, (_, id) => ids.add(id));
    let out = s;
    ids.forEach((id) => {
      const newId = `${prefix}-${id}`;
      const idRe = new RegExp(`(id=")${id}(\")`, 'g');
      const urlRe = new RegExp(`url\(#${id}\)`, 'g');
      const hrefRe = new RegExp(`([#\"]+)${id}(\")`, 'g');
      out = out.replace(idRe, `$1${newId}$2`);
      out = out.replace(urlRe, `url(#${newId})`);
      // href and xlinkHref with #id
      out = out.replace(new RegExp(`xlinkHref="#${id}"`, 'g'), `xlinkHref="#${newId}"`);
      out = out.replace(new RegExp(`href="#${id}"`, 'g'), `href="#${newId}"`);
    });
    return out;
  };

  const exports = [];
  files.forEach((file) => {
    const baseName = path.basename(file, ".svg");
    const parts = baseName.split("-");
    parts.shift(); // unicode kısmını at
    const kebab = parts.join("-");
    if (!kebab) return;
    const compName = toPascalCase(kebab) + "Icon";

    const svg = fs.readFileSync(path.join(SVG_DIR, file), "utf8");
    const vbMatch = svg.match(/viewBox="([^"]+)"/i);
    const viewBox = vbMatch ? vbMatch[1] : "0 0 24 24";
    // SVG kök <svg ...> içini al
    const svgInner = svg
      .replace(/^[\s\S]*?<svg[^>]*>/i, "")
      .replace(/<\/svg>[\s\S]*$/i, "");

    // React'e uygun attribute isimleri ve benzersiz id'ler
    let reactInner = toReactAttrs(svgInner);
    reactInner = sanitizeInnerSvg(reactInner);
    reactInner = rewriteIds(reactInner, compName);

    const tsx = `"use client";
import React from "react";

export type IconSize = number | string;

export type IconVariant = 'filled' | 'outlined' | 'duotone' | 'linear';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  // Boyut
  size?: IconSize;
  width?: IconSize;
  height?: IconSize;
  
  // Renk ve stil
  color?: string;
  secondaryColor?: string; // duotone için
  variant?: IconVariant;
  
  // Stroke ayarları
  strokeWidth?: number | string;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  
  // Transformasyon
  rotate?: number;
  mirrored?: boolean; // yatay çevirme
  flipped?: boolean; // dikey çevirme
  
  // Animasyon
  spin?: boolean;
  pulse?: boolean;
  bounce?: boolean;
  
  // Erişilebilirlik
  title?: string;
  description?: string;
  
  // Görünürlük
  visible?: boolean;
  opacity?: number;
}

const ${compName}: React.FC<IconProps> = ({
  // Boyut
  size = 24,
  width,
  height,
  
  // Renk ve stil
  color,
  secondaryColor,
  variant = 'filled',
  
  // Stroke ayarları
  strokeWidth = 1.5,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  
  // Transformasyon
  rotate = 0,
  mirrored = false,
  flipped = false,
  
  // Animasyon
  spin = false,
  pulse = false,
  bounce = false,
  
  // Erişilebilirlik
  title,
  description,
  
  // Görünürlük
  visible = true,
  opacity,
  
  className = "",
  style,
  ...rest
}) => {
  const w = width ?? size;
  const h = height ?? size;
  
  // Transform hesaplama
  const transforms = [];
  if (rotate) transforms.push(\`rotate(\${rotate}deg)\`);
  if (mirrored) transforms.push('scaleX(-1)');
  if (flipped) transforms.push('scaleY(-1)');
  
  // Animasyon sınıfları
  const animationClasses = [];
  if (spin) animationClasses.push('animate-spin');
  if (pulse) animationClasses.push('animate-pulse');
  if (bounce) animationClasses.push('animate-bounce');
  
  // Renk sınıfları: color prop'u varsa her zaman Tailwind formatında ekle
  // Böylece hover sınıfları çalışır (inline style yerine className kullanıyoruz)
  const colorClasses = [];
  if (color) {
    colorClasses.push(\`text-[\${color}]\`);
  }
  
  const styles: React.CSSProperties = {
    // color artık className ile yönetiliyor, inline style'dan kaldırıldı
    opacity: visible ? opacity : 0,
    transform: transforms.length ? transforms.join(' ') : undefined,
    ...style,
  };

  // Variant'a göre fill/stroke ayarları
  const isOutlined = variant === 'outlined';
  const isDuotone = variant === 'duotone';
  const isLinear = variant === 'linear';
  
  const fillValue = isOutlined || isLinear ? 'none' : 'currentColor';
  const strokeValue = isOutlined || isLinear ? 'currentColor' : 'none';
  
  return (
    <svg
      width={w}
      height={h}
      viewBox="${viewBox}"
      fill={fillValue}
      stroke={strokeValue}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      xmlns="http://www.w3.org/2000/svg"
      className={[...animationClasses, ...colorClasses, className].filter(Boolean).join(" ")}
      style={styles}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      {...rest}
    >
      {title && <title>{title}</title>}
      {description && <desc>{description}</desc>}
      {isDuotone && secondaryColor && (
        <defs>
          <linearGradient id="duotone-${compName}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? \`url(#duotone-${compName})\` : undefined}>
        ${reactInner}
      </g>
    </svg>
  );
};

export default ${compName};
`;

    const compFile = path.join(OUT_DIR, `${compName}.tsx`);
    fs.writeFileSync(compFile, tsx, "utf8");
    exports.push(`export { default as ${compName} } from "./${compName}";`);
  });

  const indexPath = path.join(OUT_DIR, "index.ts");
  fs.writeFileSync(indexPath, exports.join("\n") + "\n", "utf8");
  console.log("⚛️  React TSX icon components generated.");
}

/* --------------------------- 🌐 5. Preview HTML ------------------------------ */
function generatePreviewHTML() {
  const svgFiles = fs.readdirSync(SVG_DIR).filter((f) => f.endsWith(".svg")).sort();

  const icons = svgFiles.map((file) => {
    const baseName = path.basename(file, ".svg");
    const parts = baseName.split("-");
    parts.shift(); // unicode kısmı at
    return parts.join("-");
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pendigit Icons Preview</title>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="./${FONT_NAME}.css" />
  <style>
    html, body {
      all: initial;
      font-family: Inter, Arial, sans-serif;
      background: #fafafa;
      color: #111;
    }
    .title {
      font-size: 32px;
      text-align: center;
      text-decoration: underline;
      margin-top: 20px;
    }
    .search-box {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }
    input[type="text"] {
      padding: 10px 15px;
      font-size: 16px;
      border: 1px solid #aaa;
      border-radius: 8px;
      width: 300px;
      outline: none;
    }
    .icons {
      margin: 15px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
    }
    .icon {
      width: 180px;
      height: 140px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;
      border: 1px solid transparent;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 0 5px rgba(0,0,0,0.05);
      transition: all 0.2s ease;
    }
    .icon:hover {
      border-color: #000;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .pe-icon {
      font-size: 36px;
    }
    span {
      font-size: 14px;
      text-align: center;
      user-select: all;
      color: #444;
    }
  </style>
</head>
<body>
  <h1 class="title">Pendigit Icon Preview</h1>
  <div class="search-box">
    <input type="text" id="search" placeholder="Search icons..." />
  </div>
  <div class="search-box" style="gap: 10px;">
    <input type="text" id="className" placeholder="className (örn: hover:text-red-600 hover:scale-110)" />
    <button id="applyClass">Apply</button>
  </div>
  <section class="icons">
    ${icons.map(
      (icon) => `
      <div class="icon" data-name="${icon}">
        <i class="pe-icon pe-icon-${icon}" data-base="pe-icon pe-icon-${icon}"></i>
        <span>&lt;i class="pe-icon pe-icon-${icon}"&gt;&lt;/i&gt;</span>
      </div>`
    ).join("")}
  </section>
  <script>
    $("#search").on("input", function() {
      const val = $(this).val().toLowerCase();
      $(".icon").each(function() {
        const name = $(this).data("name");
        $(this).toggle(name.includes(val));
      });
    });

    function applyClasses() {
      const cls = $("#className").val() || "";
      localStorage.setItem("previewIconClass", cls);
      $(".icon i").each(function(){
        const base = $(this).attr("data-base") || "";
        $(this).attr("class", (base + " " + cls).trim());
      });
    }

    $("#applyClass").on("click", applyClasses);
    $("#className").on("keydown", function(e){ if(e.key === "Enter"){ applyClasses(); }});

    // Restore from localStorage on load
    const saved = localStorage.getItem("previewIconClass");
    if (saved) {
      $("#className").val(saved);
      applyClasses();
    }
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(DIST_DIR, "preview.html"), html, "utf8");
  console.log("🌐 Preview HTML generated successfully.");
}

/* --------------------------- 🚀 6. Build Çalıştır ----------------------------- */
(async () => {
  console.log("🔧 Starting Pendigit Icon Font build...\n");
  fixSVGs();
  await generateFont();
  generateCSS();
  generatePreviewHTML();
  generateReactComponents();
  console.log("\n✅ All done! Font, CSS, and Preview ready in dist folder.");
})();
