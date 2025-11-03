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

const BoxRightUpIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-BoxRightUpIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-BoxRightUpIcon)` : undefined}>
         <path d="M11.1145 1.73071C11.5235 1.73071 11.8547 2.05905 11.8547 2.46411C11.8547 2.82421 11.5928 3.12368 11.2473 3.18579L11.1145 3.19751H5.43384C4.27899 3.19751 3.32958 4.07085 3.22192 5.18677L3.21216 5.39868V18.6018C3.21216 19.7457 4.09333 20.6856 5.21997 20.7922L5.43384 20.802H18.5667C19.7215 20.8019 20.6709 19.9296 20.7786 18.8137L20.7883 18.6018V12.7336C20.7883 12.3286 21.1197 12.0004 21.5286 12.0002C21.8921 12.0002 22.1944 12.2596 22.2571 12.6018L22.2698 12.7336V18.6018C22.2698 20.5464 20.7414 22.1378 18.8098 22.262L18.5667 22.2698H5.43384C3.47061 22.2698 1.86393 20.7562 1.73853 18.843L1.73071 18.6018V5.39868C1.73071 3.45428 3.25835 1.86292 5.1897 1.73853L5.43384 1.73071H11.1145ZM18.5305 1.73071C20.5128 1.7309 22.1344 3.14249 22.261 4.927L22.2688 5.15161V8.57349C22.2686 8.95113 21.9345 9.25691 21.5217 9.25708C21.1547 9.25708 20.8489 9.01557 20.7854 8.69653L20.7737 8.57349V5.15161C20.7736 4.85777 20.7058 4.57816 20.5842 4.32544L11.9885 13.0872C11.694 13.3519 11.2204 13.3486 10.9309 13.0793C10.6736 12.8397 10.6483 12.4704 10.8528 12.2053L10.9397 12.1116L19.5588 3.32739C19.3114 3.21045 19.0367 3.13405 18.7463 3.10864L18.5305 3.09888H14.7913C14.3784 3.09888 14.0434 2.79303 14.0432 2.41528C14.0432 2.07941 14.3077 1.79943 14.6565 1.74146L14.7913 1.73071H18.5305Z" /> 
      </g>
    </svg>
  );
};

export default BoxRightUpIcon;
