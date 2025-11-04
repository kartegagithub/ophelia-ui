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

const Png2Icon: React.FC<IconProps> = ({
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
      viewBox="0 0 52 52"
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
          <linearGradient id="duotone-Png2Icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-Png2Icon)` : undefined}>
         <rect width="52" height="52" rx="8.66667" /> <path d="M10.6505 21.3H16.3945C17.3332 21.3 18.0905 21.5667 18.6665 22.1C19.2425 22.6227 19.5305 23.316 19.5305 24.18V25.716C19.5305 26.6227 19.2265 27.3533 18.6185 27.908C18.0212 28.452 17.2318 28.724 16.2505 28.724H12.5225V32.5H10.6505V21.3ZM16.2185 27.092C16.6558 27.092 17.0025 26.9587 17.2585 26.692C17.5252 26.4253 17.6585 26.0787 17.6585 25.652V24.228C17.6585 23.8333 17.5412 23.5187 17.3065 23.284C17.0718 23.0493 16.7572 22.932 16.3625 22.932H12.5225V27.092H16.2185ZM20.9318 21.3H22.6118L28.2758 29.492V21.3H30.0998V32.5H28.4038L22.7558 24.34V32.5H20.9318V21.3ZM35.9555 32.628C35.1555 32.628 34.4515 32.4573 33.8435 32.116C33.2462 31.764 32.7822 31.2733 32.4515 30.644C32.1208 30.004 31.9555 29.268 31.9555 28.436V25.364C31.9555 24.532 32.1208 23.8013 32.4515 23.172C32.7928 22.532 33.2675 22.0413 33.8755 21.7C34.4942 21.348 35.2035 21.172 36.0035 21.172H37.7635C38.5315 21.172 39.2088 21.332 39.7955 21.652C40.3822 21.9613 40.8355 22.404 41.1555 22.98C41.4755 23.5453 41.6355 24.2013 41.6355 24.948H39.7955C39.7955 24.308 39.6088 23.796 39.2355 23.412C38.8622 23.0173 38.3715 22.82 37.7635 22.82H36.0035C35.3528 22.82 34.8248 23.06 34.4195 23.54C34.0248 24.0093 33.8275 24.6387 33.8275 25.428V28.372C33.8275 29.1613 34.0195 29.796 34.4035 30.276C34.7982 30.7453 35.3155 30.98 35.9555 30.98H37.7795C38.3982 30.98 38.9048 30.7613 39.2995 30.324C39.6942 29.8867 39.8915 29.3267 39.8915 28.644V28.1H36.7875V26.468H41.7315V28.644C41.7315 29.4227 41.5662 30.116 41.2355 30.724C40.9048 31.3213 40.4408 31.7907 39.8435 32.132C39.2462 32.4627 38.5582 32.628 37.7795 32.628H35.9555Z" /> 
      </g>
    </svg>
  );
};

export default Png2Icon;
