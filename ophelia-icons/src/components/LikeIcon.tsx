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
  
  const styles: React.CSSProperties = {
    color,
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
      viewBox="0 0 16 16"
      fill={fillValue}
      stroke={strokeValue}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      xmlns="http://www.w3.org/2000/svg"
      className={[...animationClasses, className].filter(Boolean).join(" ")}
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
        <g opacity="0.6"><path d="M9.12109 0C9.6597 0 10.1022 0.426572 10.1211 0.964844L10.2598 4.92285H13.5703C14.6748 4.92285 15.5702 5.81839 15.5703 6.92285C15.5703 7.0518 15.558 7.18107 15.5332 7.30762L14.1484 14.3838C13.9647 15.3224 13.142 16 12.1855 16H5C4.40248 16 3.86648 15.7377 3.5 15.3223C3.13434 15.7377 2.59757 16 2 16C0.89543 16 0 15.1046 0 14V7C0 5.89543 0.89543 5 2 5C2.57935 5 3.10154 5.246 3.4668 5.63965C3.83285 5.20172 4.38387 4.92285 5 4.92285H5.79297L7.47559 0.634766C7.62582 0.251917 7.99498 2.68589e-05 8.40625 0H9.12109ZM2 6C1.48716 6 1.0646 6.38645 1.00684 6.88379L1 7V14C1 14.5523 1.44772 15 2 15C2.51284 15 2.9354 14.6135 2.99316 14.1162L3 14V7C3 6.44772 2.55228 6 2 6ZM6.72363 5.28809C6.58844 5.63266 6.27603 5.87173 5.91504 5.91602L5.79297 5.92285H5C4.48716 5.92285 4.0646 6.3093 4.00684 6.80664L4 6.92285V14C4 14.5128 4.38645 14.9354 4.88379 14.9932L5 15H12.1855C12.6239 15 13.0063 14.7156 13.1377 14.3066L13.167 14.1924L14.5518 7.11523C14.5641 7.05196 14.5703 6.98733 14.5703 6.92285C14.5702 6.4102 14.1846 5.98756 13.6875 5.92969L13.5703 5.92285H10.2598C9.7597 5.92277 9.34262 5.55476 9.27051 5.07129L9.26074 4.95801L9.12109 1H8.40625L6.72363 5.28809Z" fill="currentColor"/></g>
      </g>
    </svg>
  );
};

export default LikeIcon;
