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

const AdvertIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-AdvertIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-AdvertIcon)` : undefined}>
         <path d="M21.132 16.632H2.86803C2.54403 16.632 2.28003 16.368 2.28003 16.044V4.88401C2.28003 3.44401 3.45603 2.26801 4.89603 2.26801H19.104C20.544 2.26801 21.72 3.44401 21.72 4.88401V16.044C21.72 16.368 21.456 16.632 21.132 16.632ZM3.45603 15.468H20.556V4.88401C20.556 4.09201 19.908 3.44401 19.116 3.44401H4.89603C4.10403 3.44401 3.45603 4.09201 3.45603 4.88401V15.468ZM21.132 18.648H2.86803C2.54403 18.648 2.28003 18.384 2.28003 18.06C2.28003 17.736 2.54403 17.472 2.86803 17.472H21.132C21.456 17.472 21.72 17.736 21.72 18.06C21.72 18.384 21.456 18.648 21.132 18.648Z" /> <path d="M12 21.732C11.664 21.732 11.388 21.456 11.388 21.12V18.06C11.388 17.724 11.664 17.448 12 17.448C12.336 17.448 12.612 17.724 12.612 18.06V21.12C12.612 21.456 12.336 21.732 12 21.732ZM6.68403 11.82L8.32803 7.416C8.47203 6.996 8.76003 6.768 9.18003 6.756C9.57603 6.78 9.87603 6.996 10.068 7.416L11.652 11.82C11.676 11.964 11.688 12.072 11.724 12.144C11.7 12.468 11.508 12.624 11.148 12.624C10.824 12.624 10.632 12.492 10.548 12.24L10.32 11.484H8.08803L7.83603 12.24C7.72803 12.492 7.52403 12.624 7.23603 12.624C6.87603 12.624 6.68403 12.456 6.66003 12.12V11.88C6.67203 11.856 6.68403 11.832 6.68403 11.82ZM9.19203 8.016L8.43603 10.356H9.96003L9.19203 8.016ZM12.516 12.012V7.44C12.54 7.08 12.744 6.876 13.116 6.84H14.484C16.308 6.924 17.256 7.908 17.34 9.792C17.232 11.592 16.308 12.528 14.544 12.612H13.152C12.732 12.588 12.516 12.384 12.516 12.012ZM13.728 7.944V11.496H14.556C15.504 11.472 16.02 10.896 16.068 9.756C16.044 8.568 15.504 7.968 14.448 7.944H13.728Z" />

      </g>
    </svg>
  );
};

export default AdvertIcon;
