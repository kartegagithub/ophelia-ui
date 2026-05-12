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

const KgMobileShoppingIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgMobileShoppingIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgMobileShoppingIcon)` : undefined}>
        <path d="M733.866667 1024h-512c-58.026667 0-102.4-47.786667-102.4-102.4V102.4c0-58.026667 44.373333-102.4 102.4-102.4h512c58.026667 0 102.4 47.786667 102.4 102.4v129.706667c0 10.24-6.826667 17.066667-17.066667 17.066666s-17.066667-6.826667-17.066667-17.066666V102.4c0-37.546667-30.72-68.266667-68.266666-68.266667h-512c-37.546667 0-68.266667 30.72-68.266667 68.266667v819.2c0 37.546667 30.72 68.266667 68.266667 68.266667h512c37.546667 0 68.266667-30.72 68.266666-68.266667v-119.466667c0-10.24 6.826667-17.066667 17.066667-17.066666s17.066667 6.826667 17.066667 17.066666V921.6c0 54.613333-44.373333 102.4-102.4 102.4z" /><path d="M819.2 853.333333H136.533333c-10.24 0-17.066667-6.826667-17.066666-17.066666s6.826667-17.066667 17.066666-17.066667h682.666667c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066666zM512 921.6h-102.4c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066666h102.4c10.24 0 17.066667 6.826667 17.066667 17.066666s-6.826667 17.066667-17.066667 17.066667zM512 648.533333c-6.826667 0-13.653333-3.413333-17.066667-13.653333L395.946667 273.066667H341.333333c-10.24 0-17.066667-6.826667-17.066666-17.066667s6.826667-17.066667 17.066666-17.066667h68.266667c6.826667 0 13.653333 6.826667 17.066667 13.653334l102.4 375.466666c3.413333 10.24-3.413333 17.066667-13.653334 20.48H512z" /><path d="M488.106667 542.72c-10.24 0-17.066667-6.826667-17.066667-13.653333 0-10.24 6.826667-17.066667 13.653333-17.066667l361.813334-37.546667 20.48-129.706666H443.733333c-10.24 0-17.066667-6.826667-17.066666-17.066667s6.826667-20.48 17.066666-20.48h443.733334c3.413333 0 10.24 3.413333 13.653333 6.826667 3.413333 3.413333 3.413333 10.24 3.413333 13.653333l-23.893333 163.84c0 6.826667-6.826667 13.653333-13.653333 13.653333l-378.88 37.546667c3.413333 0 3.413333 0 0 0zM580.266667 716.8c-27.306667 0-51.2-23.893333-51.2-51.2S552.96 614.4 580.266667 614.4s51.2 23.893333 51.2 51.2S607.573333 716.8 580.266667 716.8z m0-68.266667c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066667 17.066667-6.826667 17.066666-17.066667-6.826667-17.066667-17.066666-17.066667zM750.933333 716.8c-27.306667 0-51.2-23.893333-51.2-51.2S723.626667 614.4 750.933333 614.4s51.2 23.893333 51.2 51.2S778.24 716.8 750.933333 716.8z m0-68.266667c-10.24 0-17.066667 6.826667-17.066666 17.066667s6.826667 17.066667 17.066666 17.066667 17.066667-6.826667 17.066667-17.066667-6.826667-17.066667-17.066667-17.066667z" /><path d="M238.933333 119.466667m-17.066666 0a17.066667 17.066667 0 1 0 34.133333 0 17.066667 17.066667 0 1 0-34.133333 0Z" />
      </g>
    </svg>
  );
};

export default KgMobileShoppingIcon;
