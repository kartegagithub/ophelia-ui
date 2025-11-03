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

const EighteenPlusIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-EighteenPlusIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-EighteenPlusIcon)` : undefined}>
         <path d="M23.6001 43.5996C20.8334 43.5996 18.2334 43.0746 15.8001 42.0246C13.3668 40.9746 11.2501 39.5496 9.4501 37.7496C7.6501 35.9496 6.2251 33.8329 5.1751 31.3996C4.1251 28.9663 3.6001 26.3663 3.6001 23.5996C3.6001 20.8329 4.1251 18.2329 5.1751 15.7996C6.2251 13.3663 7.6501 11.2496 9.4501 9.44961C11.2501 7.64961 13.3668 6.22461 15.8001 5.17461C18.2334 4.12461 20.8334 3.59961 23.6001 3.59961C26.3668 3.59961 28.9668 4.12461 31.4001 5.17461C33.8334 6.22461 35.9501 7.64961 37.7501 9.44961C39.5501 11.2496 40.9751 13.3663 42.0251 15.7996C43.0751 18.2329 43.6001 20.8329 43.6001 23.5996C43.6001 26.3663 43.0751 28.9663 42.0251 31.3996C40.9751 33.8329 39.5501 35.9496 37.7501 37.7496C35.9501 39.5496 33.8334 40.9746 31.4001 42.0246C28.9668 43.0746 26.3668 43.5996 23.6001 43.5996ZM23.6001 39.5996C28.0334 39.5996 31.8084 38.0413 34.9251 34.9246C38.0418 31.8079 39.6001 28.0329 39.6001 23.5996C39.6001 19.1663 38.0418 15.3913 34.9251 12.2746C31.8084 9.15794 28.0334 7.59961 23.6001 7.59961C19.1668 7.59961 15.3918 9.15794 12.2751 12.2746C9.15843 15.3913 7.6001 19.1663 7.6001 23.5996C7.6001 28.0329 9.15843 31.8079 12.2751 34.9246C15.3918 38.0413 19.1668 39.5996 23.6001 39.5996Z" /> <path d="M20.3999 30H17.3999V21H14.3999V18H20.3999V30Z" /> <path fillRule="evenodd" clipRule="evenodd" d="M30.3999 30H25.3999C24.8332 30 24.3582 29.8083 23.9749 29.425C23.5916 29.0417 23.3999 28.5667 23.3999 28V20C23.3999 19.4333 23.5916 18.9583 23.9749 18.575C24.3582 18.1917 24.8332 18 25.3999 18H30.3999C30.9666 18 31.4416 18.1917 31.8249 18.575C32.2082 18.9583 32.3999 19.4333 32.3999 20V28C32.3999 28.5667 32.2082 29.0417 31.8249 29.425C31.4416 29.8083 30.9666 30 30.3999 30ZM26.3999 23V20H29.3999V23H26.3999ZM26.3999 25V28H29.3999V25H26.3999Z" /> 
      </g>
    </svg>
  );
};

export default EighteenPlusIcon;
