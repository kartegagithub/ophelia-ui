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

const PeopleIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-PeopleIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-PeopleIcon)` : undefined}>
         <path d="M0 36V32.85C0 31.4167 0.733333 30.25 2.2 29.35C3.66667 28.45 5.6 28 8 28C8.43333 28 8.85 28.0083 9.25 28.025C9.65 28.0417 10.0333 28.0833 10.4 28.15C9.93333 28.85 9.58333 29.5833 9.35 30.35C9.11667 31.1167 9 31.9167 9 32.75V36H0ZM12 36V32.75C12 31.6833 12.2917 30.7083 12.875 29.825C13.4583 28.9417 14.2833 28.1667 15.35 27.5C16.4167 26.8333 17.6917 26.3333 19.175 26C20.6583 25.6667 22.2667 25.5 24 25.5C25.7667 25.5 27.3917 25.6667 28.875 26C30.3583 26.3333 31.6333 26.8333 32.7 27.5C33.7667 28.1667 34.5833 28.9417 35.15 29.825C35.7167 30.7083 36 31.6833 36 32.75V36H12ZM39 36V32.75C39 31.8833 38.8917 31.0667 38.675 30.3C38.4583 29.5333 38.1333 28.8167 37.7 28.15C38.0667 28.0833 38.4417 28.0417 38.825 28.025C39.2083 28.0083 39.6 28 40 28C42.4 28 44.3333 28.4417 45.8 29.325C47.2667 30.2083 48 31.3833 48 32.85V36H39ZM16.25 32H31.8C31.4667 31.3333 30.5417 30.75 29.025 30.25C27.5083 29.75 25.8333 29.5 24 29.5C22.1667 29.5 20.4917 29.75 18.975 30.25C17.4583 30.75 16.55 31.3333 16.25 32ZM8 26C6.9 26 5.95833 25.6083 5.175 24.825C4.39167 24.0417 4 23.1 4 22C4 20.8667 4.39167 19.9167 5.175 19.15C5.95833 18.3833 6.9 18 8 18C9.13333 18 10.0833 18.3833 10.85 19.15C11.6167 19.9167 12 20.8667 12 22C12 23.1 11.6167 24.0417 10.85 24.825C10.0833 25.6083 9.13333 26 8 26ZM40 26C38.9 26 37.9583 25.6083 37.175 24.825C36.3917 24.0417 36 23.1 36 22C36 20.8667 36.3917 19.9167 37.175 19.15C37.9583 18.3833 38.9 18 40 18C41.1333 18 42.0833 18.3833 42.85 19.15C43.6167 19.9167 44 20.8667 44 22C44 23.1 43.6167 24.0417 42.85 24.825C42.0833 25.6083 41.1333 26 40 26ZM24 24C22.3333 24 20.9167 23.4167 19.75 22.25C18.5833 21.0833 18 19.6667 18 18C18 16.3 18.5833 14.875 19.75 13.725C20.9167 12.575 22.3333 12 24 12C25.7 12 27.125 12.575 28.275 13.725C29.425 14.875 30 16.3 30 18C30 19.6667 29.425 21.0833 28.275 22.25C27.125 23.4167 25.7 24 24 24ZM24 20C24.5667 20 25.0417 19.8083 25.425 19.425C25.8083 19.0417 26 18.5667 26 18C26 17.4333 25.8083 16.9583 25.425 16.575C25.0417 16.1917 24.5667 16 24 16C23.4333 16 22.9583 16.1917 22.575 16.575C22.1917 16.9583 22 17.4333 22 18C22 18.5667 22.1917 19.0417 22.575 19.425C22.9583 19.8083 23.4333 20 24 20Z" /> 
      </g>
    </svg>
  );
};

export default PeopleIcon;
