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

const KgDesignDevelopmentBrainIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentBrainIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentBrainIcon)` : undefined}>
        <path d="M240 384H128a16 16 0 1 1 0-32h112a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16h-64a16 16 0 1 1 0-32h64c26.464 0 48 21.536 48 48v64c0 26.464-21.536 48-48 48zM320 768h-144a16 16 0 1 1 0-32h144c26.464 0 48-21.536 48-48a16 16 0 1 1 32 0c0 44.112-35.888 80-80 80zM320 640H128a16 16 0 1 1 0-32h192c26.464 0 48-21.536 48-48a16 16 0 1 1 32 0c0 44.112-35.888 80-80 80zM320 512H80a16 16 0 1 1 0-32h240c26.464 0 48-21.536 48-48a16 16 0 1 1 32 0c0 44.112-35.888 80-80 80zM512 48h80a48 48 0 0 1 48 48v848a48 48 0 0 1-48 48h-80a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48z" /><path d="M928 592h-64a16 16 0 1 1 0-32h64c26.464 0 48-21.536 48-48s-21.536-48-48-48h-64a16 16 0 1 1 0-32h64c44.112 0 80 35.888 80 80s-35.888 80-80 80zM336 208a16 16 0 0 1-16-16V136C320 78.656 366.656 32 424 32S528 78.656 528 136a16 16 0 1 1-32 0C496 96.304 463.696 64 424 64S352 96.304 352 136V192a16 16 0 0 1-16 16zM832 848h-144a16 16 0 1 1 0-32h144c26.464 0 48-21.536 48-48s-21.536-48-48-48a16 16 0 1 1 0-32c44.112 0 80 35.888 80 80s-35.888 80-80 80zM336 848h-144c-44.112 0-80-35.888-80-80s35.888-80 80-80a16 16 0 1 1 0 32c-26.464 0-48 21.536-48 48s21.536 48 48 48h144a16 16 0 1 1 0 32z" /><path d="M880 720h-64a16 16 0 1 1 0-32h64c26.464 0 48-21.536 48-48s-21.536-48-48-48a16 16 0 1 1 0-32c44.112 0 80 35.888 80 80s-35.888 80-80 80zM208 720H144c-44.112 0-80-35.888-80-80s35.888-80 80-80a16 16 0 1 1 0 32c-26.464 0-48 21.536-48 48s21.536 48 48 48h64a16 16 0 1 1 0 32z" /><path d="M160 592H96c-44.112 0-80-35.888-80-80s35.888-80 80-80h64a16 16 0 1 1 0 32H96c-26.464 0-48 21.536-48 48s21.536 48 48 48h64a16 16 0 1 1 0 32zM880 464a16 16 0 1 1 0-32c26.464 0 48-21.536 48-48s-21.536-48-48-48h-64a16 16 0 1 1 0-32h64c44.112 0 80 35.888 80 80s-35.888 80-80 80z" /><path d="M144 464c-44.112 0-80-35.888-80-80s35.888-80 80-80h64a16 16 0 1 1 0 32H144c-26.464 0-48 21.536-48 48s21.536 48 48 48a16 16 0 1 1 0 32z" /><path d="M192 336a80.176 80.176 0 0 1-59.216-26.208 80.352 80.352 0 0 1-20.416-61.6C116.24 207.728 152.4 176 194.752 176H352c44.112 0 80 35.888 80 80a16 16 0 1 1-32 0c0-26.464-21.536-48-48-48h-157.248c-26.016 0-48.224 18.992-50.528 43.232-1.312 13.76 3.04 26.928 12.24 37.056A48.128 48.128 0 0 0 192 304a16 16 0 1 1 0 32zM832 336a16 16 0 1 1 0-32c13.504 0 26.448-5.728 35.52-15.712a47.696 47.696 0 0 0 12.256-37.056C877.472 226.992 855.264 208 829.248 208H672c-26.464 0-48 21.536-48 48a16 16 0 1 1-32 0c0-44.112 35.888-80 80-80h157.248c42.352 0 78.512 31.712 82.384 72.208a80.352 80.352 0 0 1-20.416 61.6A80.176 80.176 0 0 1 832 336z" /><path d="M416 992h-64c-61.76 0-112-50.24-112-112v-48a16 16 0 1 1 32 0v48c0 44.112 35.888 80 80 80h64c44.112 0 80-35.888 80-80V136C496 78.656 542.656 32 600 32S704 78.656 704 136V192a16 16 0 1 1-32 0V136C672 96.304 639.696 64 600 64S528 96.304 528 136V880c0 61.76-50.24 112-112 112z" /><path d="M672 992h-64c-61.76 0-112-50.24-112-112a16 16 0 1 1 32 0c0 44.112 35.888 80 80 80h64c44.112 0 80-35.888 80-80v-48a16 16 0 1 1 32 0v48c0 61.76-50.24 112-112 112zM272 400h-112a16 16 0 1 1 0-32h112a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16h-64a16 16 0 1 1 0-32h64c26.464 0 48 21.536 48 48v64c0 26.464-21.536 48-48 48zM352 912a16 16 0 1 1 0-32c26.464 0 48-21.536 48-48V448a16 16 0 1 1 32 0v384c0 44.112-35.888 80-80 80z" /><path d="M352 784h-144a16 16 0 1 1 0-32h144c26.464 0 48-21.536 48-48a16 16 0 1 1 32 0c0 44.112-35.888 80-80 80zM352 656H160a16 16 0 1 1 0-32h192c26.464 0 48-21.536 48-48a16 16 0 1 1 32 0c0 44.112-35.888 80-80 80zM352 528H112a16 16 0 1 1 0-32h240c26.464 0 48-21.536 48-48a16 16 0 1 1 32 0c0 44.112-35.888 80-80 80zM368 384a16 16 0 0 1-16-16c0-17.648-14.352-32-32-32h-16a16 16 0 1 1 0-32h16c35.296 0 64 28.704 64 64a16 16 0 0 1-16 16z" /><path d="M352 784a16 16 0 0 1-16-16v-16c0-17.648-14.352-32-32-32h-16a16 16 0 1 1 0-32h16c35.296 0 64 28.704 64 64v16a16 16 0 0 1-16 16zM304 656a16 16 0 0 1-16-16v-16c0-17.648-14.352-32-32-32h-16a16 16 0 1 1 0-32h16c35.296 0 64 28.704 64 64v16a16 16 0 0 1-16 16zM304 528a16 16 0 0 1-16-16v-16c0-17.648-14.352-32-32-32h-16a16 16 0 1 1 0-32h16c35.296 0 64 28.704 64 64v16a16 16 0 0 1-16 16zM864 400h-112c-26.464 0-48-21.536-48-48v-64c0-26.464 21.536-48 48-48h64a16 16 0 1 1 0 32h-64a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h112a16 16 0 1 1 0 32zM672 912c-44.112 0-80-35.888-80-80V448a16 16 0 1 1 32 0v384c0 26.464 21.536 48 48 48a16 16 0 1 1 0 32z" /><path d="M816 784h-144c-44.112 0-80-35.888-80-80a16 16 0 1 1 32 0c0 26.464 21.536 48 48 48h144a16 16 0 1 1 0 32zM864 656H672c-44.112 0-80-35.888-80-80a16 16 0 1 1 32 0c0 26.464 21.536 48 48 48h192a16 16 0 1 1 0 32zM912 528H672c-44.112 0-80-35.888-80-80a16 16 0 1 1 32 0c0 26.464 21.536 48 48 48h240a16 16 0 1 1 0 32zM656 384a16 16 0 0 1-16-16c0-35.296 28.704-64 64-64h16a16 16 0 1 1 0 32h-16c-17.648 0-32 14.352-32 32a16 16 0 0 1-16 16z" /><path d="M672 784a16 16 0 0 1-16-16v-16c0-35.296 28.704-64 64-64h16a16 16 0 1 1 0 32h-16c-17.648 0-32 14.352-32 32v16a16 16 0 0 1-16 16zM720 656a16 16 0 0 1-16-16v-16c0-35.296 28.704-64 64-64h16a16 16 0 1 1 0 32h-16c-17.648 0-32 14.352-32 32v16a16 16 0 0 1-16 16zM720 528a16 16 0 0 1-16-16v-16c0-35.296 28.704-64 64-64h16a16 16 0 1 1 0 32h-16c-17.648 0-32 14.352-32 32v16a16 16 0 0 1-16 16z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentBrainIcon;
