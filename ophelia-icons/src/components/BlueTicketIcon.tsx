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

const BlueTicketIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 82 72"
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
          <linearGradient id="duotone-BlueTicketIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-BlueTicketIcon)` : undefined}>
         <path d="M63.3256 33.2143C64.2409 33.2143 65 32.4566 65 31.5429V29.3143C65 19.4863 62.0084 16.5 52.1628 16.5H38.2093V21.5143C38.2093 22.428 37.4502 23.1857 36.5349 23.1857C35.6195 23.1857 34.8605 22.428 34.8605 21.5143V16.5H29.8372C19.9916 16.5 17 19.4863 17 29.3143V30.4286C17 31.3423 17.7591 32.1 18.6744 32.1C20.8177 32.1 22.5814 33.8606 22.5814 36C22.5814 38.1394 20.8177 39.9 18.6744 39.9C17.7591 39.9 17 40.6577 17 41.5714V42.6857C17 52.5137 19.9916 55.5 29.8372 55.5H34.8605V50.4857C34.8605 49.572 35.6195 48.8143 36.5349 48.8143C37.4502 48.8143 38.2093 49.572 38.2093 50.4857V55.5H52.1628C62.0084 55.5 65 52.5137 65 42.6857C65 41.772 64.2409 41.0143 63.3256 41.0143C61.1823 41.0143 59.4186 39.2537 59.4186 37.1143C59.4186 34.9749 61.1823 33.2143 63.3256 33.2143ZM38.2093 40.836C38.2093 41.7497 37.4502 42.5074 36.5349 42.5074C35.6195 42.5074 34.8605 41.7497 34.8605 40.836V31.164C34.8605 30.2503 35.6195 29.4926 36.5349 29.4926C37.4502 29.4926 38.2093 30.2503 38.2093 31.164V40.836Z" /> <path d="M6.83301 27V19.5C6.83301 12.03 13.7005 6 22.208 6H30.7497" /> <path d="M51.25 6H59.7917C68.2992 6 75.1667 12.03 75.1667 19.5V27" /> <path d="M75.167 48V52.5C75.167 59.97 68.2995 66 59.792 66H54.667" /> <path d="M30.7497 66H22.208C13.7005 66 6.83301 59.97 6.83301 52.5V45" /> 
      </g>
    </svg>
  );
};

export default BlueTicketIcon;
