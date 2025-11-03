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

const TicketCheckIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-TicketCheckIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-TicketCheckIcon)` : undefined}>
         <path d="M34.6 37.6L41.65 30.55L40.25 29.15L34.6 34.8L31.75 31.95L30.35 33.35L34.6 37.6ZM36 43C34.6167 43 33.3167 42.7375 32.1 42.2125C30.8833 41.6875 29.825 40.975 28.925 40.075C28.025 39.175 27.3125 38.1167 26.7875 36.9C26.2625 35.6833 26 34.3833 26 33C26 31.6167 26.2625 30.3167 26.7875 29.1C27.3125 27.8833 28.025 26.825 28.925 25.925C29.825 25.025 30.8833 24.3125 32.1 23.7875C33.3167 23.2625 34.6167 23 36 23C37.3833 23 38.6833 23.2625 39.9 23.7875C41.1167 24.3125 42.175 25.025 43.075 25.925C43.975 26.825 44.6875 27.8833 45.2125 29.1C45.7375 30.3167 46 31.6167 46 33C46 34.3833 45.7375 35.6833 45.2125 36.9C44.6875 38.1167 43.975 39.175 43.075 40.075C42.175 40.975 41.1167 41.6875 39.9 42.2125C38.6833 42.7375 37.3833 43 36 43Z" /> <path d="M23.425 30.425C23.0417 30.8083 22.5667 31 22 31C21.4333 31 20.9583 30.8083 20.575 30.425C20.1917 30.0417 20 29.5667 20 29C20 28.4333 20.1917 27.9583 20.575 27.575C20.9583 27.1917 21.4333 27 22 27C22.5667 27 23.0417 27.1917 23.425 27.575C23.8083 27.9583 24 28.4333 24 29C24 29.5667 23.8083 30.0417 23.425 30.425Z" /> <path d="M23.425 22.425C23.0417 22.8083 22.5667 23 22 23C21.4333 23 20.9583 22.8083 20.575 22.425C20.1917 22.0417 20 21.5667 20 21C20 20.4333 20.1917 19.9583 20.575 19.575C20.9583 19.1917 21.4333 19 22 19C22.5667 19 23.0417 19.1917 23.425 19.575C23.8083 19.9583 24 20.4333 24 21C24 21.5667 23.8083 22.0417 23.425 22.425Z" /> <path d="M23.425 14.425C23.0417 14.8083 22.5667 15 22 15C21.4333 15 20.9583 14.8083 20.575 14.425C20.1917 14.0417 20 13.5667 20 13C20 12.4333 20.1917 11.9583 20.575 11.575C20.9583 11.1917 21.4333 11 22 11C22.5667 11 23.0417 11.1917 23.425 11.575C23.8083 11.9583 24 12.4333 24 13C24 13.5667 23.8083 14.0417 23.425 14.425Z" /> <path d="M35.2 37H38C39.1 37 40.0417 36.6083 40.825 35.825C41.6083 35.0417 42 34.1 42 33V25C40.9 25 39.9583 24.6083 39.175 23.825C39.0346 23.6846 38.9068 23.5391 38.7915 23.3885C37.9021 23.1295 36.9716 23 36 23C35.4146 23 34.8442 23.047 34.2887 23.141C34.4676 23.7775 34.7297 24.3888 35.075 24.975C35.7917 26.1917 36.7667 27.1667 38 27.9V31.4L40.25 29.15L41.65 30.55L35.2 37Z" /> <path d="M34 37L30.35 33.35L30.7 33H26C26 34.3833 26.2625 35.6833 26.7875 36.9C26.8019 36.9335 26.8165 36.9668 26.8312 37H34Z" /> <path d="M24.6785 37H6C4.9 37 3.95833 36.6083 3.175 35.825C2.39167 35.0417 2 34.1 2 33V25C3.1 25 4.04167 24.6083 4.825 23.825C5.60833 23.0417 6 22.1 6 21C6 19.9 5.60833 18.9583 4.825 18.175C4.04167 17.3917 3.1 17 2 17V9C2 7.9 2.39167 6.95833 3.175 6.175C3.95833 5.39167 4.9 5 6 5H38C39.1 5 40.0417 5.39167 40.825 6.175C41.6083 6.95833 42 7.9 42 9V17C40.9 17 39.9583 17.3917 39.175 18.175C38.3917 18.9583 38 19.9 38 21C38 21.0544 38.001 21.1084 38.0029 21.162C37.3487 21.0537 36.6806 21 36 21C35.3209 21 34.6543 21.0535 34.0015 21.1613C34.0005 21.1077 34 21.0539 34 21C34 19.5667 34.3583 18.2417 35.075 17.025C35.7917 15.8083 36.7667 14.8333 38 14.1V9H6V14.1C7.23333 14.8333 8.20833 15.8083 8.925 17.025C9.64167 18.2417 10 19.5667 10 21C10 22.4333 9.64167 23.7583 8.925 24.975C8.20833 26.1917 7.23333 27.1667 6 27.9V33H24C24 34.3894 24.224 35.7268 24.6785 37Z" /> <path d="M32.8 33L34.6 34.8L36.4 33H32.8Z" /> 
      </g>
    </svg>
  );
};

export default TicketCheckIcon;
