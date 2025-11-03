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

const MicrophoneIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-MicrophoneIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-MicrophoneIcon)` : undefined}>
         <g clipPath="url(#clip0_2997_1239)"> <path d="M11.9999 3C11.2042 3 10.4412 3.31607 9.87857 3.87868C9.31596 4.44129 8.99989 5.20435 8.99989 6V12C8.99989 12.7956 9.31596 13.5587 9.87857 14.1213C10.4412 14.6839 11.2042 15 11.9999 15C12.7955 15 13.5586 14.6839 14.1212 14.1213C14.6838 13.5587 14.9999 12.7956 14.9999 12V6C14.9999 5.20435 14.6838 4.44129 14.1212 3.87868C13.5586 3.31607 12.7955 3 11.9999 3ZM11.9999 1C12.6565 1 13.3067 1.12933 13.9133 1.3806C14.5199 1.63188 15.0711 2.00017 15.5354 2.46447C15.9997 2.92876 16.368 3.47995 16.6193 4.08658C16.8706 4.69321 16.9999 5.34339 16.9999 6V12C16.9999 13.3261 16.4731 14.5979 15.5354 15.5355C14.5977 16.4732 13.326 17 11.9999 17C10.6738 17 9.40204 16.4732 8.46436 15.5355C7.52668 14.5979 6.99989 13.3261 6.99989 12V6C6.99989 4.67392 7.52668 3.40215 8.46436 2.46447C9.40204 1.52678 10.6738 1 11.9999 1ZM2.19189 13.962L4.15389 13.569C4.51829 15.3814 5.49892 17.0118 6.9292 18.1832C8.35948 19.3545 10.1512 19.9946 11.9999 19.9946C13.8486 19.9946 15.6403 19.3545 17.0706 18.1832C18.5009 17.0118 19.4815 15.3814 19.8459 13.569L21.8079 13.962C20.8959 18.545 16.8499 22 11.9999 22C7.1499 22 3.10389 18.545 2.19189 13.962Z" /> </g> <defs> <clipPath id="MicrophoneIcon-clip0_2997_1239"> <rect width="24" height="24" /> </clipPath> </defs> 
      </g>
    </svg>
  );
};

export default MicrophoneIcon;
