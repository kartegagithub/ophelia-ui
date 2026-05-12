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

const KgDesignDevelopmentRgbColorIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentRgbColorIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentRgbColorIcon)` : undefined}>
        <path d="M672 368m-272 0a272 272 0 1 0 544 0 272 272 0 1 0-544 0Z" /><path d="M512 1008c-158.8 0-288-129.2-288-288s129.2-288 288-288 288 129.2 288 288-129.2 288-288 288z m0-544c-141.152 0-256 114.848-256 256s114.848 256 256 256 256-114.848 256-256-114.848-256-256-256z" /><path d="M288 592C129.2 592 0 462.8 0 304S129.2 16 288 16s288 129.2 288 288-129.2 288-288 288z m0-544C146.848 48 32 162.848 32 304s114.848 256 256 256 256-114.848 256-256S429.152 48 288 48z" /><path d="M224 416a16 16 0 0 1-16-16V208a16 16 0 0 1 16-16h80c35.296 0 64 28.704 64 64s-28.704 64-64 64h-64v80a16 16 0 0 1-16 16z m16-128h64c17.648 0 32-14.352 32-32s-14.352-32-32-32h-64v64z" /><path d="M352.016 416a16 16 0 0 1-13.328-7.12l-64-96a16 16 0 0 1 26.624-17.76l64 96A16 16 0 0 1 352.016 416zM736 592c-158.8 0-288-129.2-288-288S577.2 16 736 16s288 129.2 288 288-129.2 288-288 288z m0-544c-141.152 0-256 114.848-256 256s114.848 256 256 256 256-114.848 256-256S877.152 48 736 48z" /><path d="M800 416h-128a16 16 0 0 1-16-16V208a16 16 0 0 1 16-16h128a16 16 0 0 1 0 32h-112v160h96v-64h-64a16 16 0 0 1 0-32h80a16 16 0 0 1 16 16v96a16 16 0 0 1-16 16zM528 832h-80a16 16 0 0 1-16-16V624a16 16 0 0 1 16-16h80c35.296 0 64 28.704 64 64a63.872 63.872 0 0 1-21.712 48A63.872 63.872 0 0 1 592 768c0 35.296-28.704 64-64 64z m-64-32h64c17.648 0 32-14.352 32-32s-14.352-32-32-32h-64v64z m0-96h64c17.648 0 32-14.352 32-32s-14.352-32-32-32h-64v64z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentRgbColorIcon;
