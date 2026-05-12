"use client";
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

const KgDesignDevelopmentRulerStylusPencilIcon: React.FC<IconProps> = ({
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

  className,
  style,
  ...rest
}) => {
  // rest içindeki className'i çıkar (eğer varsa override eder)
  const restClassName = 'className' in rest ? (rest as any).className : undefined;
  const restProps = { ...rest } as any;
  delete restProps.className;
  const finalClassName = restClassName || className;

  const w = width ?? size;
  const h = height ?? size;

  /** strokeWidth prop ≈ ekranda px kalınlığı (varsayılan ikon ~24px); viewBox büyük gliflerde user-space stroke ince kalmasın diye ölçeklenir */
  const parseIconDim = (v: IconSize): number => {
    if (typeof v === "number" && !Number.isNaN(v)) return v;
    const n = parseFloat(String(v));
    return Number.isFinite(n) ? n : 24;
  };
  const rw = parseIconDim(w as IconSize);
  const rh = parseIconDim(h as IconSize);
  const renderDim = Math.max(Math.min(rw, rh), 0.001);
  const vbMaxDim = (() => {
    const p = "0 0 1024 1024".trim().split(/[\s,]+/).map(Number);
    return Math.max(p[2] ?? 24, p[3] ?? 24, 1);
  })();

  // Transform hesaplama
  const transforms = [];
  if (rotate) transforms.push(`rotate(${rotate}deg)`);
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
    colorClasses.push(`text-[${color}]`);
  }

  // className'i birleştir (boş string'leri filtrele)
  const combinedClassName = [...animationClasses, ...colorClasses, finalClassName].filter(Boolean).join(" ") || undefined;

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

  const baseStrokeNum =
    typeof strokeWidth === "number"
      ? strokeWidth
      : parseFloat(String(strokeWidth));
  const baseStroke = Number.isFinite(baseStrokeNum) ? baseStrokeNum : 1.5;
  const scaledStrokeWidth =
    isOutlined || isLinear ? (baseStroke * vbMaxDim) / renderDim : strokeWidth;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 1024 1024"
      fill={fillValue}
      stroke={strokeValue}
      strokeWidth={scaledStrokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      xmlns="http://www.w3.org/2000/svg"
      className={combinedClassName}
      style={styles}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      {...restProps}
    >
      {title && <title>{title}</title>}
      {description && <desc>{description}</desc>}
      {isDuotone && secondaryColor && (
        <defs>
          <linearGradient id="duotone-KgDesignDevelopmentRulerStylusPencilIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentRulerStylusPencilIcon)` : undefined}>
        <path d="M160 880m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" /><path d="M928 239.52l-128-224-128 224V976a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V239.52z" /><path d="M480 1024c-52.944 0-96-43.056-96-96V176a16 16 0 0 1 1.68-7.152l80-160c5.44-10.848 23.2-10.848 28.64 0l80 160A16 16 0 0 1 576 176v752c0 52.944-43.056 96-96 96z m-64-844.224V928c0 35.296 28.704 64 64 64s64-28.704 64-64V179.776l-64-128-64 128z" /><path d="M592 880H400a16 16 0 0 1 0-32h192c8.816 0 16-7.184 16-16V576a16 16 0 0 1 32 0v256c0 26.464-21.536 48-48 48zM560 208h-64a16 16 0 0 1 0-32h64a16 16 0 0 1 0 32zM560 272h-64a16 16 0 0 1 0-32h64a16 16 0 0 1 0 32zM560 336h-64a16 16 0 0 1 0-32h64a16 16 0 0 1 0 32zM560 400h-64a16 16 0 0 1 0-32h64a16 16 0 0 1 0 32zM976 1024H784c-26.464 0-48-21.536-48-48V239.52c0-2.8 0.72-5.536 2.112-7.952l128-224c5.68-9.968 22.08-9.968 27.776 0l128 224c1.392 2.416 2.112 5.152 2.112 7.936V976c0 26.464-21.536 48-48 48zM768 243.76V976c0 8.816 7.184 16 16 16h192c8.816 0 16-7.184 16-16V243.76l-112-196-112 196z" /><path d="M944.32 144h-128.64a16 16 0 0 1 0-32h128.64a16 16 0 0 1 0 32zM1008 255.52H752a16 16 0 0 1 0-32h256a16 16 0 0 1 0 32zM1008 864H752a16 16 0 0 1 0-32h256a16 16 0 0 1 0 32z" /><path d="M928 864a16 16 0 0 1-16-16V240a16 16 0 0 1 32 0v608a16 16 0 0 1-16 16zM832 864a16 16 0 0 1-16-16V240a16 16 0 0 1 32 0v608a16 16 0 0 1-16 16zM944 928c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM880 928c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM816 928c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM480 816c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM480 752c-4.32 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM480 688c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM480 624c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.32-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM272 1024H16a16 16 0 0 1-16-16V16a16 16 0 0 1 16-16h256a16 16 0 0 1 16 16v992a16 16 0 0 1-16 16zM32 992h224V32H32v960z" /><path d="M272 112h-96a16 16 0 0 1 0-32h96a16 16 0 0 1 0 32zM272 192h-64a16 16 0 0 1 0-32h64a16 16 0 0 1 0 32zM272 272h-96a16 16 0 0 1 0-32h96a16 16 0 0 1 0 32zM272 352h-64a16 16 0 0 1 0-32h64a16 16 0 0 1 0 32zM272 432h-96a16 16 0 0 1 0-32h96a16 16 0 0 1 0 32zM272 512h-64a16 16 0 0 1 0-32h64a16 16 0 0 1 0 32zM272 592h-96a16 16 0 0 1 0-32h96a16 16 0 0 1 0 32zM272 672h-64a16 16 0 0 1 0-32h64a16 16 0 0 1 0 32zM272 752h-96a16 16 0 0 1 0-32h96a16 16 0 0 1 0 32zM272 832h-64a16 16 0 0 1 0-32h64a16 16 0 0 1 0 32zM144 960c-26.464 0-48-21.536-48-48s21.536-48 48-48 48 21.536 48 48-21.536 48-48 48z m0-64c-8.816 0-16 7.184-16 16s7.184 16 16 16 16-7.184 16-16-7.184-16-16-16z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentRulerStylusPencilIcon;
