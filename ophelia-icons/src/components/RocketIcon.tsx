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

const RocketIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 21 21"
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
          <linearGradient id="duotone-RocketIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-RocketIcon)` : undefined}>
         <path d="M3.6 7.99556L5.55 8.82056C5.78333 8.3539 6.025 7.9039 6.275 7.47056C6.525 7.03723 6.8 6.6039 7.1 6.17056L5.7 5.89556L3.6 7.99556ZM7.15 10.0706L10 12.8956C10.7 12.6289 11.45 12.2206 12.25 11.6706C13.05 11.1206 13.8 10.4956 14.5 9.79556C15.6667 8.6289 16.5792 7.33306 17.2375 5.90806C17.8958 4.48306 18.1833 3.17056 18.1 1.97056C16.9 1.88723 15.5833 2.17473 14.15 2.83306C12.7167 3.4914 11.4167 4.4039 10.25 5.57056C9.55 6.27056 8.925 7.02056 8.375 7.82056C7.825 8.62056 7.41667 9.37056 7.15 10.0706ZM11.6 8.44556C11.2167 8.06223 11.025 7.5914 11.025 7.03306C11.025 6.47473 11.2167 6.0039 11.6 5.62056C11.9833 5.23723 12.4583 5.04556 13.025 5.04556C13.5917 5.04556 14.0667 5.23723 14.45 5.62056C14.8333 6.0039 15.025 6.47473 15.025 7.03306C15.025 7.5914 14.8333 8.06223 14.45 8.44556C14.0667 8.8289 13.5917 9.02056 13.025 9.02056C12.4583 9.02056 11.9833 8.8289 11.6 8.44556ZM12.075 16.4706L14.175 14.3706L13.9 12.9706C13.4667 13.2706 13.0333 13.5414 12.6 13.7831C12.1667 14.0247 11.7167 14.2622 11.25 14.4956L12.075 16.4706ZM19.9 0.145565C20.2167 2.16223 20.0208 4.12473 19.3125 6.03306C18.6042 7.9414 17.3833 9.76223 15.65 11.4956L16.15 13.9706C16.2167 14.3039 16.2 14.6289 16.1 14.9456C16 15.2622 15.8333 15.5372 15.6 15.7706L11.4 19.9706L9.3 15.0456L5.025 10.7706L0.1 8.67056L4.275 4.47056C4.50833 4.23723 4.7875 4.07056 5.1125 3.97056C5.4375 3.87056 5.76667 3.8539 6.1 3.92056L8.575 4.42056C10.3083 2.68723 12.125 1.46223 14.025 0.745565C15.925 0.0288979 17.8833 -0.171102 19.9 0.145565ZM1.875 13.9456C2.45833 13.3622 3.17083 13.0664 4.0125 13.0581C4.85417 13.0497 5.56667 13.3372 6.15 13.9206C6.73333 14.5039 7.02083 15.2164 7.0125 16.0581C7.00417 16.8997 6.70833 17.6122 6.125 18.1956C5.70833 18.6122 5.0125 18.9706 4.0375 19.2706C3.0625 19.5706 1.71667 19.8372 0 20.0706C0.233333 18.3539 0.5 17.0081 0.8 16.0331C1.1 15.0581 1.45833 14.3622 1.875 13.9456ZM3.3 15.3456C3.13333 15.5122 2.96667 15.8164 2.8 16.2581C2.63333 16.6997 2.51667 17.1456 2.45 17.5956C2.9 17.5289 3.34583 17.4164 3.7875 17.2581C4.22917 17.0997 4.53333 16.9372 4.7 16.7706C4.9 16.5706 5.00833 16.3289 5.025 16.0456C5.04167 15.7622 4.95 15.5206 4.75 15.3206C4.55 15.1206 4.30833 15.0247 4.025 15.0331C3.74167 15.0414 3.5 15.1456 3.3 15.3456Z"/> 
      </g>
    </svg>
  );
};

export default RocketIcon;
