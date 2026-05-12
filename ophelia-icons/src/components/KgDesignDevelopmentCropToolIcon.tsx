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

const KgDesignDevelopmentCropToolIcon: React.FC<IconProps> = ({
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
  
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 1024 1024"
      fill={fillValue}
      stroke={strokeValue}
      strokeWidth={strokeWidth}
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
          <linearGradient id="duotone-KgDesignDevelopmentCropToolIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentCropToolIcon)` : undefined}>
        <path d="M800 864H160V32h96v736h544z" /><path d="M208 832a16 16 0 0 1-11.312-27.312l704-704a16 16 0 1 1 22.624 22.624l-704 704A15.952 15.952 0 0 1 208 832zM1008 32c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM960 80c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM112 288H16a16 16 0 0 1-16-16v-96a16 16 0 0 1 16-16h96a16 16 0 0 1 0 32H32v64h80a16 16 0 0 1 0 32z" /><path d="M848 1024h-96a16 16 0 0 1-16-16V288H208a16 16 0 0 1 0-32h544a16 16 0 0 1 16 16v720h64V192H208a16 16 0 0 1 0-32h640a16 16 0 0 1 16 16v832a16 16 0 0 1-16 16z" /><path d="M944 928h-96a16 16 0 0 1 0-32h80v-64h-80a16 16 0 0 1 0-32h96a16 16 0 0 1 16 16v96a16 16 0 0 1-16 16zM752 928H112a16 16 0 0 1-16-16V80a16 16 0 0 1 16-16h96a16 16 0 0 1 16 16v720h528a16 16 0 0 1 0 32H208a16 16 0 0 1-16-16V96H128v800h624a16 16 0 0 1 0 32z" /><path d="M688 768c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM624 768c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.92 16.8-5.92 22.72 0.16 2.88 2.88 4.64 7.04 4.64 11.2 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM560 768c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM688 704c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM624 704c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.92 16.8-5.92 22.72 0.16 2.88 2.88 4.64 7.04 4.64 11.2 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM688 640c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentCropToolIcon;
