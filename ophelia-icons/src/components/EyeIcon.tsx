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

const EyeIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 24 24"
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
          <linearGradient id="duotone-EyeIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-EyeIcon)` : undefined}>
        
  <path
    d="M12 9C12.8016 9 13.5539 9.31172 14.1211 9.87891C14.6883 10.4461 15 11.1984 15 12C15 12.8016 14.6883 13.5539 14.1211 14.1211C13.5539 14.6883 12.8016 15 12 15C11.1984 15 10.4461 14.6883 9.87891 14.1211C9.31172 13.5539 9 12.8016 9 12C9 11.1984 9.31172 10.4461 9.87891 9.87891C10.4461 9.31172 11.1984 9 12 9ZM12 7.5C9.51562 7.5 7.5 9.51562 7.5 12C7.5 14.4844 9.51562 16.5 12 16.5C14.4844 16.5 16.5 14.4844 16.5 12C16.5 9.51562 14.4844 7.5 12 7.5Z"
    />
  <path
    d="M12 5.25C13.1742 5.25 14.3555 5.49375 15.5086 5.97656C16.5516 6.4125 17.5641 7.04766 18.4359 7.81406C19.2422 8.51953 19.9125 9.31875 20.3766 10.1227C20.7797 10.8211 21.0023 11.4891 21.0023 12C21.0023 12.5109 20.7797 13.1789 20.3766 13.8773C19.9125 14.6812 19.2422 15.4781 18.4359 16.1859C17.5617 16.9523 16.5516 17.5875 15.5086 18.0234C14.3555 18.5063 13.1766 18.75 12 18.75C10.8234 18.75 9.64453 18.5063 8.49141 18.0234C7.44844 17.5875 6.43594 16.9523 5.56406 16.1859C4.75781 15.4781 4.0875 14.6812 3.62344 13.8773C3.22266 13.1789 3 12.5109 3 12C3 11.4891 3.22266 10.8211 3.62578 10.1227C4.08984 9.31875 4.76016 8.52187 5.56641 7.81406C6.44063 7.04766 7.45078 6.4125 8.49375 5.97656C9.64453 5.49375 10.8258 5.25 12 5.25ZM12 3.75C6.20156 3.75 1.5 8.83125 1.5 12C1.5 15.1687 6.20156 20.25 12 20.25C17.7984 20.25 22.5 15.1687 22.5 12C22.5 8.83125 17.7984 3.75 12 3.75Z"
    />

      </g>
    </svg>
  );
};

export default EyeIcon;
