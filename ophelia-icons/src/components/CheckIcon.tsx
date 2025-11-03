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

const CheckIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-CheckIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-CheckIcon)` : undefined}>
         <path d="M18.1632 6.28829L8.16325 16.2883C8.07615 16.3757 7.97266 16.445 7.8587 16.4924C7.74475 16.5397 7.62257 16.564 7.49918 16.564C7.3758 16.564 7.25362 16.5397 7.13967 16.4924C7.02571 16.445 6.92222 16.3757 6.83512 16.2883L2.46012 11.9133C2.37292 11.8261 2.30374 11.7226 2.25655 11.6086C2.20935 11.4947 2.18506 11.3726 2.18506 11.2492C2.18506 11.1259 2.20935 11.0038 2.25655 10.8898C2.30374 10.7759 2.37292 10.6724 2.46012 10.5852C2.54733 10.498 2.65086 10.4288 2.7648 10.3816C2.87874 10.3344 3.00086 10.3101 3.12418 10.3101C3.24751 10.3101 3.36963 10.3344 3.48357 10.3816C3.59751 10.4288 3.70104 10.498 3.78825 10.5852L7.49997 14.2969L16.8367 4.96172C17.0128 4.7856 17.2517 4.68666 17.5007 4.68666C17.7498 4.68666 17.9887 4.7856 18.1648 4.96172C18.3409 5.13784 18.4399 5.37672 18.4399 5.62579C18.4399 5.87486 18.3409 6.11373 18.1648 6.28985L18.1632 6.28829Z" /> 
      </g>
    </svg>
  );
};

export default CheckIcon;
