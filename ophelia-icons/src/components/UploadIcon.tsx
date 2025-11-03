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

const UploadIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-UploadIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-UploadIcon)` : undefined}>
         <rect width="24" height="24" /> <path fillRule="evenodd" clipRule="evenodd" d="M11.9895 3.5C12.1905 3.5 12.3915 3.561 12.5645 3.68199L16.5645 6.49586C17.0165 6.81385 17.1255 7.43782 16.8075 7.8888C16.4895 8.34078 15.8665 8.44978 15.4145 8.13179L13.0008 6.43389C13.0022 6.45568 13.0029 6.47766 13.0029 6.49981V14.4995C13.0029 15.0514 12.5559 15.4994 12.0029 15.4994C11.4499 15.4994 11.0029 15.0514 11.0029 14.4995V6.49981C11.0029 6.49653 11.0029 6.49324 11.003 6.48996L8.58953 8.29978C8.14753 8.63277 7.52053 8.54177 7.18953 8.09979C6.85753 7.65781 6.94753 7.03084 7.38953 6.69986L11.3895 3.69999C11.5665 3.567 11.7785 3.5 11.9895 3.5ZM6 17.5001V18.5H18V17.5001C18 16.9501 18.45 16.5002 19 16.5002C19.55 16.5002 20 16.9501 20 17.5001V19.5V19.5C20 19.5688 19.993 19.6359 19.9796 19.7009C19.9653 19.7703 19.9437 19.8371 19.9158 19.9005L19.9112 19.9109L19.9064 19.9212C19.7467 20.2623 19.3998 20.5 19 20.5L18.9915 20.5H5.00855L5 20.5C4.45 20.5 4 20.05 4 19.5V19.5V17.5001C4 16.9501 4.45 16.5002 5 16.5002C5.55 16.5002 6 16.9501 6 17.5001Z" /> 
      </g>
    </svg>
  );
};

export default UploadIcon;
