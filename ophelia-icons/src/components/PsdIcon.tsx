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

const PsdIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 52 52"
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
          <linearGradient id="duotone-PsdIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-PsdIcon)` : undefined}>
         <rect width="52" height="52" rx="8.66667" /> <path d="M11.2286 21.3H16.9726C17.9113 21.3 18.6686 21.5667 19.2446 22.1C19.8206 22.6227 20.1086 23.316 20.1086 24.18V25.716C20.1086 26.6227 19.8046 27.3533 19.1966 27.908C18.5993 28.452 17.81 28.724 16.8286 28.724H13.1006V32.5H11.2286V21.3ZM16.7966 27.092C17.234 27.092 17.5806 26.9587 17.8366 26.692C18.1033 26.4253 18.2366 26.0787 18.2366 25.652V24.228C18.2366 23.8333 18.1193 23.5187 17.8846 23.284C17.65 23.0493 17.3353 22.932 16.9406 22.932H13.1006V27.092H16.7966ZM24.7099 32.628C23.6005 32.628 22.7259 32.308 22.0859 31.668C21.4459 31.028 21.1259 30.1533 21.1259 29.044H22.9659C22.9659 29.6413 23.1205 30.116 23.4299 30.468C23.7499 30.8093 24.1872 30.98 24.7419 30.98H26.5179C27.0405 30.98 27.4619 30.868 27.7819 30.644C28.1019 30.4093 28.2619 30.1053 28.2619 29.732V29.028C28.2619 28.74 28.1499 28.5 27.9259 28.308C27.7019 28.116 27.3819 27.9827 26.9659 27.908L24.0539 27.412C23.1472 27.2627 22.4485 26.964 21.9579 26.516C21.4779 26.068 21.2379 25.4973 21.2379 24.804V23.924C21.2379 23.38 21.3819 22.9 21.6699 22.484C21.9685 22.068 22.3845 21.748 22.9179 21.524C23.4512 21.2893 24.0699 21.172 24.7739 21.172H26.5819C27.2432 21.172 27.8245 21.3107 28.3259 21.588C28.8379 21.8547 29.2325 22.2387 29.5099 22.74C29.7872 23.2413 29.9259 23.8173 29.9259 24.468H28.1019C28.1019 23.9773 27.9579 23.5827 27.6699 23.284C27.3925 22.9747 27.0299 22.82 26.5819 22.82H24.7739C24.2725 22.82 23.8672 22.932 23.5579 23.156C23.2592 23.3693 23.1099 23.6627 23.1099 24.036V24.612C23.1099 24.9107 23.2165 25.1613 23.4299 25.364C23.6432 25.556 23.9525 25.684 24.3579 25.748L27.2699 26.26C28.1872 26.42 28.8912 26.7187 29.3819 27.156C29.8832 27.5827 30.1339 28.132 30.1339 28.804V29.844C30.1339 30.388 29.9845 30.8733 29.6859 31.3C29.3872 31.716 28.9659 32.0413 28.4219 32.276C27.8779 32.5107 27.2539 32.628 26.5499 32.628H24.7099ZM33.2296 32.5C32.8136 32.5 32.4776 32.3773 32.2216 32.132C31.9763 31.8867 31.8536 31.5613 31.8536 31.156V21.3H36.9576C37.7896 21.3 38.5203 21.46 39.1496 21.78C39.7896 22.0893 40.2803 22.532 40.6216 23.108C40.9736 23.684 41.1496 24.3507 41.1496 25.108V28.372C41.1496 29.7267 40.7976 30.756 40.0936 31.46C39.4003 32.1533 38.3763 32.5 37.0216 32.5H33.2296ZM36.9736 30.852C37.731 30.852 38.3016 30.6387 38.6856 30.212C39.0803 29.7747 39.2776 29.14 39.2776 28.308V25.172C39.2776 24.5107 39.059 23.9773 38.6216 23.572C38.1843 23.156 37.6136 22.948 36.9096 22.948H33.7256V30.852H36.9736Z" /> 
      </g>
    </svg>
  );
};

export default PsdIcon;
