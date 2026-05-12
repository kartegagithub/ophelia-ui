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

const KgDesignDevelopmentWebPageStatsIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentWebPageStatsIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentWebPageStatsIcon)` : undefined}>
        <path d="M128 704m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" /><path d="M320 480m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" /><path d="M896 384m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" /><path d="M608 624m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" /><path d="M16 128h992v128H16z" /><path d="M1008 880H16a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h992a16 16 0 0 1 16 16v768a16 16 0 0 1-16 16zM32 848h960V112H32v736z" /><path d="M1008 240H16a16 16 0 1 1 0-32h992a16 16 0 1 1 0 32zM816 176c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.76 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM880 176c-4.32 0-8.32-1.76-11.36-4.64A16.8 16.8 0 0 1 864 160c0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.32-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM944 176c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.32-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM128 720c-35.296 0-64-28.704-64-64s28.704-64 64-64 64 28.704 64 64-28.704 64-64 64z m0-96c-17.648 0-32 14.352-32 32s14.352 32 32 32 32-14.352 32-32-14.352-32-32-32zM320 496c-35.296 0-64-28.704-64-64s28.704-64 64-64 64 28.704 64 64-28.704 64-64 64z m0-96c-17.648 0-32 14.352-32 32s14.352 32 32 32 32-14.352 32-32-14.352-32-32-32zM896 400c-35.296 0-64-28.704-64-64s28.704-64 64-64 64 28.704 64 64-28.704 64-64 64z m0-96c-17.648 0-32 14.352-32 32s14.352 32 32 32 32-14.352 32-32-14.352-32-32-32zM608 640c-35.296 0-64-28.704-64-64s28.704-64 64-64 64 28.704 64 64-28.704 64-64 64z m0-96c-17.648 0-32 14.352-32 32s14.352 32 32 32 32-14.352 32-32-14.352-32-32-32zM896 976a16 16 0 0 1-16-16V448a16 16 0 1 1 32 0v512a16 16 0 0 1-16 16zM800 976a16 16 0 0 1-16-16V528a16 16 0 1 1 32 0v432a16 16 0 0 1-16 16zM704 976a16 16 0 0 1-16-16V592a16 16 0 1 1 32 0v368a16 16 0 0 1-16 16zM608 976a16 16 0 0 1-16-16V688a16 16 0 1 1 32 0v272a16 16 0 0 1-16 16zM512 976a16 16 0 0 1-16-16V624a16 16 0 1 1 32 0v336a16 16 0 0 1-16 16zM416 976a16 16 0 0 1-16-16V576a16 16 0 1 1 32 0v384a16 16 0 0 1-16 16zM320 976a16 16 0 0 1-16-16V544a16 16 0 1 1 32 0v416a16 16 0 0 1-16 16zM224 976a16 16 0 0 1-16-16V672a16 16 0 1 1 32 0v288a16 16 0 0 1-16 16zM128 976a16 16 0 0 1-16-16V768a16 16 0 1 1 32 0v192a16 16 0 0 1-16 16z" /><path d="M159.2 635.68a16 16 0 0 1-12.16-26.4l129.6-151.36a16 16 0 0 1 24.32 20.8l-129.6 151.36a15.952 15.952 0 0 1-12.16 5.6zM565.12 570.56c-2.416 0-4.848-0.544-7.152-1.68l-202.24-101.12a16 16 0 1 1 14.304-28.64l202.24 101.12a16 16 0 0 1-7.168 30.32zM644.8 561.28a16 16 0 0 1-10.24-28.304l214.4-178.56a16 16 0 0 1 20.48 24.592l-214.4 178.56a15.92 15.92 0 0 1-10.24 3.712zM752 240a16 16 0 0 1-16-16V96a16 16 0 1 1 32 0v128a16 16 0 0 1-16 16z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentWebPageStatsIcon;
