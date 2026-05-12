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

const KgPhoneIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgPhoneIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgPhoneIcon)` : undefined}>
        <path d="M230.980213 117.679978c4.461606 3.407603 12.678738 10.611664 24.958388 24.948155 13.988568 16.321701 29.67582 37.688292 45.434704 61.817804 31.89639 48.883239 50.858216 88.526042 55.258424 101.777831-1.023304 7.285926-5.351881 14.868609-12.75037 27.332454-11.604269 19.524643-27.48595 46.273814-27.48595 83.542551 0 13.702043 0 55.391454 111.274094 168.487029 27.414318 27.864572 55.667746 53.52904 79.551665 72.275972 36.286365 28.468322 60.303314 40.082824 82.887636 40.082824 32.008954 0 58.532998-14.172763 79.817724-25.582604 15.093736-8.07387 28.243195-15.103969 39.530239-15.891913 10.713994 2.998281 47.358516 20.732142 104.448655 61.613143 23.188072 16.597993 45.537035 34.137427 62.912739 49.364192 13.487149 11.819163 21.325659 19.893033 25.674701 24.804893-3.448535 25.510973-17.825958 51.840588-40.625175 73.800696-24.303474 23.402966-55.51425 38.527401-79.510733 38.527401-55.821242 0-125.989207-24.262541-202.910981-70.157733-74.210017-44.278371-151.561578-106.628293-223.684055-180.306192C284.918575 581.697246 224.574329 504.089859 181.247632 429.644482c-21.683815-37.258504-38.384139-72.654595-49.650718-105.093337-11.020986-31.722429-16.608226-60.016789-16.608226-84.003038 0-9.711156 4.093217-21.827078 11.80893-35.048167 8.524124-14.592317 21.120998-29.849782 36.419395-44.124875a239.2 239.2 0 0 1 45.751929-33.850901A113.66 113.66 0 0 1 230.980213 117.679978m4.942559-53.600672c-50.60239 0-172.027661 92.148539-172.027661 176.509733 0 246.616301 442.722309 716.425471 718.482312 716.425471 75.898469 0 172.037894-81.762002 172.037894-176.509733 0-32.438742-197.333973-176.509733-242.871008-176.509733-46.795699 0-80.953592 41.525683-121.425271 41.525683S367.468521 462.472079 367.468521 417.047608s40.471679-67.486909 40.471679-114.210977c0-33.769037-121.425271-238.80849-172.027661-238.80849l0 0Z" />
      </g>
    </svg>
  );
};

export default KgPhoneIcon;
