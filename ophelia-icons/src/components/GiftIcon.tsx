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

const GiftIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 48 48"
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
          <linearGradient id="duotone-GiftIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-GiftIcon)` : undefined}>
         <path d="M8 45V23H4V11H14.4C14.2333 10.7 14.125 10.3833 14.075 10.05C14.025 9.71667 14 9.36667 14 9C14 7.33333 14.5833 5.91667 15.75 4.75C16.9167 3.58333 18.3333 3 20 3C20.7667 3 21.4833 3.14167 22.15 3.425C22.8167 3.70833 23.4333 4.1 24 4.6C24.5667 4.06667 25.1833 3.66667 25.85 3.4C26.5167 3.13333 27.2333 3 28 3C29.6667 3 31.0833 3.58333 32.25 4.75C33.4167 5.91667 34 7.33333 34 9C34 9.36667 33.9667 9.70833 33.9 10.025C33.8333 10.3417 33.7333 10.6667 33.6 11H44V23H40V45H8ZM28 7C27.4333 7 26.9583 7.19167 26.575 7.575C26.1917 7.95833 26 8.43333 26 9C26 9.56667 26.1917 10.0417 26.575 10.425C26.9583 10.8083 27.4333 11 28 11C28.5667 11 29.0417 10.8083 29.425 10.425C29.8083 10.0417 30 9.56667 30 9C30 8.43333 29.8083 7.95833 29.425 7.575C29.0417 7.19167 28.5667 7 28 7ZM18 9C18 9.56667 18.1917 10.0417 18.575 10.425C18.9583 10.8083 19.4333 11 20 11C20.5667 11 21.0417 10.8083 21.425 10.425C21.8083 10.0417 22 9.56667 22 9C22 8.43333 21.8083 7.95833 21.425 7.575C21.0417 7.19167 20.5667 7 20 7C19.4333 7 18.9583 7.19167 18.575 7.575C18.1917 7.95833 18 8.43333 18 9ZM8 15V19H22V15H8ZM22 41V23H12V41H22ZM26 41H36V23H26V41ZM40 19V15H26V19H40Z" /> 
      </g>
    </svg>
  );
};

export default GiftIcon;
