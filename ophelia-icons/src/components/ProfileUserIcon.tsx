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

const ProfileUserIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 20 20"
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
          <linearGradient id="duotone-ProfileUserIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-ProfileUserIcon)` : undefined}>
         <path d="M7.49996 1.66699C5.31663 1.66699 3.54163 3.44199 3.54163 5.62533C3.54163 7.76699 5.21663 9.50033 7.39996 9.57533C7.46663 9.56699 7.53329 9.56699 7.58329 9.57533C7.59996 9.57533 7.60829 9.57533 7.62496 9.57533C7.63329 9.57533 7.63329 9.57533 7.64163 9.57533C9.77496 9.50033 11.45 7.76699 11.4583 5.62533C11.4583 3.44199 9.68329 1.66699 7.49996 1.66699Z" fillOpacity="0.6" /> <path d="M11.7333 11.7914C9.4083 10.2414 5.61663 10.2414 3.27497 11.7914C2.21663 12.4997 1.6333 13.4581 1.6333 14.4831C1.6333 15.5081 2.21663 16.4581 3.26663 17.1581C4.4333 17.9414 5.96663 18.3331 7.49997 18.3331C9.0333 18.3331 10.5666 17.9414 11.7333 17.1581C12.7833 16.4497 13.3666 15.4997 13.3666 14.4664C13.3583 13.4414 12.7833 12.4914 11.7333 11.7914Z" fillOpacity="0.6" /> <path d="M16.6584 6.11708C16.7918 7.73374 15.6418 9.15041 14.0501 9.34208C14.0418 9.34208 14.0418 9.34208 14.0334 9.34208H14.0084C13.9584 9.34208 13.9084 9.34207 13.8668 9.35874C13.0584 9.40041 12.3168 9.14207 11.7584 8.66707C12.6168 7.90041 13.1084 6.75041 13.0084 5.50041C12.9501 4.82541 12.7168 4.20874 12.3668 3.68374C12.6834 3.52541 13.0501 3.42541 13.4251 3.39208C15.0584 3.25041 16.5168 4.46708 16.6584 6.11708Z" fillOpacity="0.6" /> <path d="M18.325 13.8247C18.2583 14.633 17.7417 15.333 16.875 15.808C16.0417 16.2663 14.9917 16.483 13.95 16.458C14.55 15.9163 14.9 15.2413 14.9667 14.5247C15.05 13.4913 14.5583 12.4997 13.575 11.708C13.0167 11.2663 12.3667 10.9163 11.6583 10.658C13.5 10.1247 15.8167 10.483 17.2417 11.633C18.0083 12.2497 18.4 13.0247 18.325 13.8247Z" fillOpacity="0.6" />

      </g>
    </svg>
  );
};

export default ProfileUserIcon;
