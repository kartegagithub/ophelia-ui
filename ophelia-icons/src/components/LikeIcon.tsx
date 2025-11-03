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

const LikeIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 24 25"
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
          <linearGradient id="duotone-LikeIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-LikeIcon)` : undefined}>
         <g opacity="0.6"> <path d="M14.0596 0C14.8898 0 15.5714 0.6576 15.6006 1.4873L15.8145 7.58887H20.918C22.6203 7.58903 23.9998 8.96855 24 10.6709C24 10.8697 23.9815 11.0686 23.9434 11.2637L21.8076 22.1719C21.5243 23.6186 20.2564 24.6621 18.7822 24.6621H7.70703C6.78607 24.6621 5.95942 24.2584 5.39453 23.6182C4.83095 24.2585 4.00401 24.662 3.08301 24.6621C1.38043 24.6621 0 23.2817 0 21.5791V10.79C0 9.08746 1.38043 7.70703 3.08301 7.70703C3.97582 7.70709 4.77983 8.08677 5.34277 8.69336C5.90701 8.018 6.75705 7.58887 7.70703 7.58887H8.92871L11.5225 0.978516C11.754 0.388442 12.3232 0.000172006 12.957 0H14.0596ZM3.08301 9.24805C2.29253 9.24805 1.6408 9.84376 1.55176 10.6104L1.54102 10.79V21.5791C1.54102 22.4304 2.23172 23.1211 3.08301 23.1211C3.87325 23.121 4.52504 22.5261 4.61426 21.7598L4.62402 21.5791V10.79C4.62402 9.93882 3.9342 9.24817 3.08301 9.24805ZM10.3643 8.15137C10.1559 8.68253 9.67367 9.04994 9.11719 9.11816L8.92871 9.12988H7.70703C6.91662 9.12988 6.26491 9.72471 6.17578 10.4912L6.16602 10.6709V21.5791C6.16602 22.3696 6.76075 23.0213 7.52734 23.1104L7.70703 23.1211H18.7822C19.4579 23.1211 20.0475 22.6821 20.25 22.0518L20.2949 21.876L22.4307 10.9668C22.4497 10.8694 22.459 10.7701 22.459 10.6709C22.4588 9.88064 21.864 9.22978 21.0977 9.14062L20.918 9.12988H15.8145C15.0436 9.12981 14.4012 8.56264 14.29 7.81738L14.2744 7.64258L14.0586 1.54102H12.957L10.3643 8.15137Z" /> </g> 
      </g>
    </svg>
  );
};

export default LikeIcon;
