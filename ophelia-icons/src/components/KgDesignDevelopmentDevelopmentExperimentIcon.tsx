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

const KgDesignDevelopmentDevelopmentExperimentIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentDevelopmentExperimentIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentDevelopmentExperimentIcon)` : undefined}>
        <path d="M240 480H112a32 32 0 1 0 0 64v272c0 35.36 28.64 64 64 64s64-28.64 64-64V544a32 32 0 1 0 0-64zM752 272v73.328c-46.88 18.848-80 64.416-80 117.728 0 70.176 57.312 127.056 128 127.056s128-56.88 128-127.04c0-53.328-33.12-98.88-80-117.76V272h-96z" /><path d="M952 1024h-880C41.12 1024 16 998.88 16 968S41.12 912 72 912h880c30.88 0 56 25.12 56 56S982.88 1024 952 1024z m-880-80c-13.232 0-24 10.768-24 24S58.768 992 72 992h880c13.232 0 24-10.768 24-24s-10.768-24-24-24h-880zM544 272a16 16 0 0 1-16-16V48a15.36 15.36 0 0 0-4.608-11.104A15.616 15.616 0 0 0 512 32c-8.816 0-16 7.168-16 16v208a16 16 0 1 1-32 0V48c0-26.464 21.536-48 48-48 12.976 0 25.056 5.056 34.016 14.288C554.928 22.96 560 35.024 560 48v208a16 16 0 0 1-16 16z" /><path d="M544 944h-64a16 16 0 0 1-16-16V688a16 16 0 1 1 32 0v224h32V688a16 16 0 1 1 32 0v240a16 16 0 0 1-16 16zM480 640a16 16 0 0 1-16-16V352a16 16 0 1 1 32 0v272a16 16 0 0 1-16 16zM544 640a16 16 0 0 1-16-16V352a16 16 0 1 1 32 0v272a16 16 0 0 1-16 16z" /><path d="M576 368h-128a16 16 0 0 1-16-16v-96a16 16 0 0 1 16-16h128a16 16 0 0 1 16 16v96a16 16 0 0 1-16 16z m-112-32h96v-64h-96v64zM864 526.112c-44.112 0-80-35.456-80-79.04a16 16 0 1 1 32 0c0 25.92 21.536 47.04 48 47.04a16 16 0 1 1 0 32z" /><path d="M864 590.112c-79.392 0-144-64.16-144-143.04 0-54.896 31.04-104.08 80-128.112V256a16 16 0 1 1 32 0v73.328a16 16 0 0 1-10.032 14.848C779.456 361.248 752 401.648 752 447.04c0 61.248 50.24 111.04 112 111.04s112-49.792 112-111.04c0-45.408-27.456-85.808-69.968-102.88a16 16 0 0 1-10.032-14.848V256a16 16 0 1 1 32 0v62.96a142.288 142.288 0 0 1 80 128.096c0 78.88-64.608 143.04-144 143.04z" /><path d="M944 272H784a16 16 0 0 1-16-16v-48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v48a16 16 0 0 1-16 16z m-144-32h128v-16h-128v16zM816 320H576a16 16 0 1 1 0-32h240a16 16 0 1 1 0 32zM960 128c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.04 4.64-11.36 4.64zM752 80c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.32-1.76 8.32-4.64 11.36-3.04 2.88-7.04 4.64-11.36 4.64zM832 176c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM864 80a16 16 0 0 1-16-16V32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16z" /><path d="M880 64h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM576 704h-128a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h128a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16z m-112-32h96v-32h-96v32z" /><path d="M448 672H64a16 16 0 1 1 0-32h384a16 16 0 1 1 0 32z" /><path d="M128 880c-44.112 0-80-35.888-80-80V541.28A48.096 48.096 0 0 1 16 496c0-26.464 21.536-48 48-48h128c26.464 0 48 21.536 48 48a48.096 48.096 0 0 1-32 45.28V800c0 44.112-35.888 80-80 80zM64 480a16.016 16.016 0 0 0 0 32 16 16 0 0 1 16 16v272c0 26.464 21.536 48 48 48s48-21.536 48-48V528a16 16 0 0 1 16-16 16.016 16.016 0 0 0 0-32H64z" /><path d="M192 736H64a16 16 0 1 1 0-32h128a16 16 0 1 1 0 32zM128 416c-26.464 0-48-21.536-48-48s21.536-48 48-48 48 21.536 48 48-21.536 48-48 48z m0-64a16.016 16.016 0 0 0 0 32 16.016 16.016 0 0 0 0-32zM80 288c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM160 240c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentDevelopmentExperimentIcon;
