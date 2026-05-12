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

const KgMyPaymentsIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgMyPaymentsIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgMyPaymentsIcon)` : undefined}>
        <path d="M852.053333 74.666667h-125.44c-54.186667 0-86.613333 32.426667-86.613333 86.613333v125.44c0 54.186667 32.426667 86.613333 86.613333 86.613333h125.44c54.186667 0 86.613333-32.426667 86.613334-86.613333V161.28c0-54.186667-32.426667-86.613333-86.613334-86.613333z m9.386667 141.226666a26.453333 26.453333 0 0 1-18.773333 7.68 26.453333 26.453333 0 0 1-18.773334-7.68l-7.68-7.68v95.573334c0 14.933333-11.946667 26.88-26.88 26.88s-26.88-11.946667-26.88-26.88V208.213333l-7.68 7.68c-10.24 10.24-27.306667 10.24-37.546666 0a26.794667 26.794667 0 0 1 0-37.546666l53.333333-53.333334c2.133333-2.133333 5.12-3.84 8.106667-5.12 0.853333-0.426667 1.706667-0.426667 2.56-0.853333 2.133333-0.853333 4.266667-1.28 6.826666-1.28h2.56c2.986667 0 5.546667 0.426667 8.533334 1.706667h0.853333c2.986667 1.28 5.546667 2.986667 7.68 5.12 0.426667 0.426667 0.426667 0.426667 0.853333 0.426666l53.333334 53.333334c10.24 10.24 10.24 27.306667-0.426667 37.546666zM85.333333 488.96v213.333333c0 97.706667 78.933333 176.64 176.64 176.64h499.626667c97.706667 0 177.066667-79.36 177.066667-177.066666v-212.906667c0-28.586667-23.04-51.626667-51.626667-51.626667H136.96c-28.586667 0-51.626667 23.04-51.626667 51.626667z m256 247.04H256c-17.493333 0-32-14.506667-32-32s14.506667-32 32-32h85.333333c17.493333 0 32 14.506667 32 32s-14.506667 32-32 32z m277.333334 0h-170.666667c-17.493333 0-32-14.506667-32-32s14.506667-32 32-32h170.666667c17.493333 0 32 14.506667 32 32s-14.506667 32-32 32zM576 196.693333v125.013334c0 28.586667-23.04 51.626667-51.626667 51.626666H136.96C107.946667 373.333333 85.333333 349.44 85.333333 320.853333c0.426667-48.213333 19.626667-92.16 51.626667-124.16S213.333333 145.066667 261.973333 145.066667h262.4c28.586667 0 51.626667 23.04 51.626667 51.626666z" />
      </g>
    </svg>
  );
};

export default KgMyPaymentsIcon;
