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

const VisibleIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-VisibleIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-VisibleIcon)` : undefined}>
         <path d="M24 33C26.5 33 28.625 32.125 30.375 30.375C32.125 28.625 33 26.5 33 24C33 21.5 32.125 19.375 30.375 17.625C28.625 15.875 26.5 15 24 15C21.5 15 19.375 15.875 17.625 17.625C15.875 19.375 15 21.5 15 24C15 26.5 15.875 28.625 17.625 30.375C19.375 32.125 21.5 33 24 33ZM24 29.4C22.5 29.4 21.225 28.875 20.175 27.825C19.125 26.775 18.6 25.5 18.6 24C18.6 22.5 19.125 21.225 20.175 20.175C21.225 19.125 22.5 18.6 24 18.6C25.5 18.6 26.775 19.125 27.825 20.175C28.875 21.225 29.4 22.5 29.4 24C29.4 25.5 28.875 26.775 27.825 27.825C26.775 28.875 25.5 29.4 24 29.4ZM24 39C19.1333 39 14.7 37.6417 10.7 34.925C6.7 32.2083 3.8 28.5667 2 24C3.8 19.4333 6.7 15.7917 10.7 13.075C14.7 10.3583 19.1333 9 24 9C28.8667 9 33.3 10.3583 37.3 13.075C41.3 15.7917 44.2 19.4333 46 24C44.2 28.5667 41.3 32.2083 37.3 34.925C33.3 37.6417 28.8667 39 24 39ZM24 35C27.7667 35 31.225 34.0083 34.375 32.025C37.525 30.0417 39.9333 27.3667 41.6 24C39.9333 20.6333 37.525 17.9583 34.375 15.975C31.225 13.9917 27.7667 13 24 13C20.2333 13 16.775 13.9917 13.625 15.975C10.475 17.9583 8.06667 20.6333 6.4 24C8.06667 27.3667 10.475 30.0417 13.625 32.025C16.775 34.0083 20.2333 35 24 35Z" /> 
      </g>
    </svg>
  );
};

export default VisibleIcon;
