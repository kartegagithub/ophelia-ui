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

const KgGithubIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgGithubIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgGithubIcon)` : undefined}>
        <path d="M511.45 74.5c-248.36 0-449.13 200.77-449.13 449.13 0 198.54 128.64 366.59 307.1 426.07 22.31 4.46 30.49-9.67 30.49-21.56 0-10.41-0.74-46.1-0.74-83.28-124.92 26.77-150.95-53.54-150.95-53.54-20.08-52.05-49.82-65.44-49.82-65.44-40.9-27.51 2.97-27.51 2.97-27.51 45.36 2.97 69.16 46.1 69.16 46.1 40.15 68.41 104.85 49.08 130.87 37.18 3.72-29 15.62-49.08 28.26-60.23-99.64-10.41-204.49-49.07-204.49-221.59 0-49.08 17.85-89.23 46.11-120.46-4.46-11.16-20.08-57.26 4.46-118.97 0 0 37.92-11.9 123.44 46.1 35.69-9.67 74.36-14.87 112.28-14.87s76.59 5.2 112.28 14.87c85.51-58 123.44-46.1 123.44-46.1 24.54 61.72 8.92 107.82 4.46 118.97 29 31.23 46.1 71.38 46.1 120.46 0 172.51-104.85 210.43-205.23 221.59 16.36 14.13 30.49 40.9 30.49 83.28 0 60.23-0.74 108.56-0.74 123.44 0 11.9 8.18 26.02 30.49 21.56 178.46-59.49 307.1-227.54 307.1-426.07 0.73-248.36-200.79-449.13-448.4-449.13z m0 0" /><path d="M232.6 719.19c-0.74 2.23-4.46 2.98-7.44 1.49-2.97-1.49-5.2-4.46-3.72-6.69 0.74-2.23 4.46-2.97 7.44-1.49 2.98 1.49 4.46 4.46 3.72 6.69z m17.85 20.08c-2.23 2.23-6.69 0.74-8.92-2.23-2.98-2.97-3.72-7.44-1.49-9.67 2.23-2.23 5.95-0.74 8.93 2.23 2.97 3.72 3.71 8.19 1.48 9.67z m17.84 26.03c-2.97 2.23-7.44 0-9.67-3.72-2.97-3.72-2.97-8.92 0-10.41 2.98-2.23 7.44 0 9.67 3.72 2.98 3.72 2.98 8.18 0 10.41z m24.54 25.28c-2.23 2.98-7.44 2.23-11.9-1.49-3.72-3.72-5.21-8.92-2.23-11.15 2.23-2.97 7.44-2.23 11.9 1.49 3.72 2.97 4.46 8.17 2.23 11.15z m33.46 14.13c-0.74 3.72-5.95 5.2-11.15 3.72-5.2-1.49-8.18-5.95-7.44-8.92 0.74-3.72 5.95-5.2 11.15-3.72 5.21 1.48 8.19 5.2 7.44 8.92z m36.44 2.97c0 3.72-4.47 6.69-9.67 6.69s-9.67-2.97-9.67-6.69 4.46-6.69 9.67-6.69 9.67 2.97 9.67 6.69z m34.21-5.95c0.74 3.72-2.97 7.44-8.18 8.18-5.2 0.74-9.67-1.49-10.41-5.2-0.74-3.72 2.97-7.44 8.18-8.18s9.66 1.48 10.41 5.2z m0 0" />
      </g>
    </svg>
  );
};

export default KgGithubIcon;
