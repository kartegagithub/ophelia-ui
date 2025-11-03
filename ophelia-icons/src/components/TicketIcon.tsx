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

const TicketIcon: React.FC<IconProps> = ({
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
  
  className = "",
  style,
  ...rest
}) => {
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
      className={[...animationClasses, ...colorClasses, className].filter(Boolean).join(" ")}
      style={styles}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      {...rest}
    >
      {title && <title>{title}</title>}
      {description && <desc>{description}</desc>}
      {isDuotone && secondaryColor && (
        <defs>
          <linearGradient id="duotone-TicketIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-TicketIcon)` : undefined}>
         <path d="M24 34C24.5667 34 25.0417 33.8083 25.425 33.425C25.8083 33.0417 26 32.5667 26 32C26 31.4333 25.8083 30.9583 25.425 30.575C25.0417 30.1917 24.5667 30 24 30C23.4333 30 22.9583 30.1917 22.575 30.575C22.1917 30.9583 22 31.4333 22 32C22 32.5667 22.1917 33.0417 22.575 33.425C22.9583 33.8083 23.4333 34 24 34ZM24 26C24.5667 26 25.0417 25.8083 25.425 25.425C25.8083 25.0417 26 24.5667 26 24C26 23.4333 25.8083 22.9583 25.425 22.575C25.0417 22.1917 24.5667 22 24 22C23.4333 22 22.9583 22.1917 22.575 22.575C22.1917 22.9583 22 23.4333 22 24C22 24.5667 22.1917 25.0417 22.575 25.425C22.9583 25.8083 23.4333 26 24 26ZM24 18C24.5667 18 25.0417 17.8083 25.425 17.425C25.8083 17.0417 26 16.5667 26 16C26 15.4333 25.8083 14.9583 25.425 14.575C25.0417 14.1917 24.5667 14 24 14C23.4333 14 22.9583 14.1917 22.575 14.575C22.1917 14.9583 22 15.4333 22 16C22 16.5667 22.1917 17.0417 22.575 17.425C22.9583 17.8083 23.4333 18 24 18ZM40 40H8C6.9 40 5.95833 39.6083 5.175 38.825C4.39167 38.0417 4 37.1 4 36V28C5.1 28 6.04167 27.6083 6.825 26.825C7.60833 26.0417 8 25.1 8 24C8 22.9 7.60833 21.9583 6.825 21.175C6.04167 20.3917 5.1 20 4 20V12C4 10.9 4.39167 9.95833 5.175 9.175C5.95833 8.39167 6.9 8 8 8H40C41.1 8 42.0417 8.39167 42.825 9.175C43.6083 9.95833 44 10.9 44 12V20C42.9 20 41.9583 20.3917 41.175 21.175C40.3917 21.9583 40 22.9 40 24C40 25.1 40.3917 26.0417 41.175 26.825C41.9583 27.6083 42.9 28 44 28V36C44 37.1 43.6083 38.0417 42.825 38.825C42.0417 39.6083 41.1 40 40 40ZM40 36V30.9C38.7667 30.1667 37.7917 29.1917 37.075 27.975C36.3583 26.7583 36 25.4333 36 24C36 22.5667 36.3583 21.2417 37.075 20.025C37.7917 18.8083 38.7667 17.8333 40 17.1V12H8V17.1C9.23333 17.8333 10.2083 18.8083 10.925 20.025C11.6417 21.2417 12 22.5667 12 24C12 25.4333 11.6417 26.7583 10.925 27.975C10.2083 29.1917 9.23333 30.1667 8 30.9V36H40Z" /> 
      </g>
    </svg>
  );
};

export default TicketIcon;
