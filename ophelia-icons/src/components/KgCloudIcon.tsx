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

const KgCloudIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgCloudIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgCloudIcon)` : undefined}>
        <path d="M883.84 515.52c-11.232-2.88-30.4-7.04-51.84-11.52A153.184 153.184 0 0 0 679.04 352c-15.04 0-29.12 2.56-42.88 6.72C616.64 246.08 518.08 160 400 160 267.52 160 160 267.52 160 400c0 18.24 2.24 36.16 6.08 53.12C89.28 472 32 541.44 32 624 32 720.96 111.04 800 208 800h639.36c79.68 0 144.64-64.96 144.64-144.64 0-65.92-44.48-123.52-108.16-139.84zM847.36 768H208C128.64 768 64 703.36 64 624S128.64 480 208 480A208 208 0 1 1 608 400l-0.32 7.68c19.84-14.72 44.48-23.68 71.36-23.68a120.864 120.864 0 0 1 118.4 145.6c31.68 6.4 63.04 12.8 78.4 16.96a112.64 112.64 0 0 1 84.16 108.8c0 62.08-50.56 112.64-112.64 112.64z" /><path d="M960 655.36c0 62.08-50.56 112.64-112.64 112.64H208c-8.64 0-16.96-0.64-24.96-2.24-14.72-22.4-23.04-48.96-23.04-77.76C160 608.64 224.64 544 304 544a208 208 0 0 1 192-288c21.76 0 42.88 3.2 62.72 9.6 30.72 36.16 49.28 83.2 49.28 134.4l-0.32 7.68a119.392 119.392 0 0 1 80.64-23.36c42.56 3.2 78.72 28.48 97.6 64.32a119.456 119.456 0 0 1 11.52 80.96c31.68 6.4 63.04 12.8 78.4 16.96 6.72 1.92 13.12 4.16 19.2 7.04 23.072 10.56 41.6 28.8 52.8 51.52 8 15.04 12.16 32 12.16 50.24zM864 848a16 16 0 0 1 16-16h96a16 16 0 0 1 0 32h-96a16 16 0 0 1-16-16zM32 848a16 16 0 0 1 16-16h736a16 16 0 0 1 0 32h-736a16 16 0 0 1-16-16zM384 912a16 16 0 0 1 16-16h576a16 16 0 0 1 0 32h-576a16 16 0 0 1-16-16zM160 912a16 16 0 0 1 16-16h128a16 16 0 0 1 0 32h-128a16 16 0 0 1-16-16z" /><path d="M240 416a16 16 0 0 1-16-16C224 226.016 366.56 224 368 224a16 16 0 0 1 0.032 32C363.072 256.032 256 258.848 256 400a16 16 0 0 1-16 16z" /><path d="M432 240m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" /><path d="M864 720a16 16 0 0 0-16-16h-224a16 16 0 0 0 0 32h224a16 16 0 0 0 16-16z" /><path d="M512 720a16 16 0 0 1 16-16h32a16 16 0 0 1 0 32h-32a16 16 0 0 1-16-16z" />
      </g>
    </svg>
  );
};

export default KgCloudIcon;
