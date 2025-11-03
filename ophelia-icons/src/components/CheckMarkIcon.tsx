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

const CheckMarkIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 20 20"
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
          <linearGradient id="duotone-CheckMarkIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-CheckMarkIcon)` : undefined}>
         <path d="M8.83342 13.8327L14.7084 7.95768L13.5417 6.79102L8.83342 11.4993L6.45841 9.12435L5.29175 10.291L8.83342 13.8327ZM10.0001 18.3327C8.8473 18.3327 7.76397 18.1139 6.75008 17.6764C5.73619 17.2389 4.85425 16.6452 4.10425 15.8952C3.35425 15.1452 2.7605 14.2632 2.323 13.2493C1.8855 12.2355 1.66675 11.1521 1.66675 9.99935C1.66675 8.84657 1.8855 7.76324 2.323 6.74935C2.7605 5.73546 3.35425 4.85352 4.10425 4.10352C4.85425 3.35352 5.73619 2.75977 6.75008 2.32227C7.76397 1.88477 8.8473 1.66602 10.0001 1.66602C11.1529 1.66602 12.2362 1.88477 13.2501 2.32227C14.264 2.75977 15.1459 3.35352 15.8959 4.10352C16.6459 4.85352 17.2397 5.73546 17.6772 6.74935C18.1147 7.76324 18.3334 8.84657 18.3334 9.99935C18.3334 11.1521 18.1147 12.2355 17.6772 13.2493C17.2397 14.2632 16.6459 15.1452 15.8959 15.8952C15.1459 16.6452 14.264 17.2389 13.2501 17.6764C12.2362 18.1139 11.1529 18.3327 10.0001 18.3327ZM10.0001 16.666C11.8612 16.666 13.4376 16.0202 14.7292 14.7285C16.0209 13.4368 16.6667 11.8605 16.6667 9.99935C16.6667 8.13824 16.0209 6.56185 14.7292 5.27018C13.4376 3.97852 11.8612 3.33268 10.0001 3.33268C8.13897 3.33268 6.56258 3.97852 5.27091 5.27018C3.97925 6.56185 3.33341 8.13824 3.33341 9.99935C3.33341 11.8605 3.97925 13.4368 5.27091 14.7285C6.56258 16.0202 8.13897 16.666 10.0001 16.666Z" /> 
      </g>
    </svg>
  );
};

export default CheckMarkIcon;
