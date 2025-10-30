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
      viewBox="0 0 24 25"
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
          <linearGradient id="duotone-AdvertIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-AdvertIcon)` : undefined}>
        <path d="M21.132 17.232H2.86803C2.54403 17.232 2.28003 16.968 2.28003 16.644V5.48401C2.28003 4.04401 3.45603 2.86801 4.89603 2.86801H19.104C20.544 2.86801 21.72 4.04401 21.72 5.48401V16.644C21.72 16.968 21.456 17.232 21.132 17.232ZM3.45603 16.068H20.556V5.48401C20.556 4.69201 19.908 4.04401 19.116 4.04401H4.89603C4.10403 4.04401 3.45603 4.69201 3.45603 5.48401V16.068ZM21.132 19.248H2.86803C2.54403 19.248 2.28003 18.984 2.28003 18.66C2.28003 18.336 2.54403 18.072 2.86803 18.072H21.132C21.456 18.072 21.72 18.336 21.72 18.66C21.72 18.984 21.456 19.248 21.132 19.248Z" fill="currentColor"/><path d="M12 22.332C11.664 22.332 11.388 22.056 11.388 21.72V18.66C11.388 18.324 11.664 18.048 12 18.048C12.336 18.048 12.612 18.324 12.612 18.66V21.72C12.612 22.056 12.336 22.332 12 22.332ZM6.68403 12.42L8.32803 8.016C8.47203 7.596 8.76003 7.368 9.18003 7.356C9.57603 7.38 9.87603 7.596 10.068 8.016L11.652 12.42C11.676 12.564 11.688 12.672 11.724 12.744C11.7 13.068 11.508 13.224 11.148 13.224C10.824 13.224 10.632 13.092 10.548 12.84L10.32 12.084H8.08803L7.83603 12.84C7.72803 13.092 7.52403 13.224 7.23603 13.224C6.87603 13.224 6.68403 13.056 6.66003 12.72V12.48C6.67203 12.456 6.68403 12.432 6.68403 12.42ZM9.19203 8.616L8.43603 10.956H9.96003L9.19203 8.616ZM12.516 12.612V8.04C12.54 7.68 12.744 7.476 13.116 7.44H14.484C16.308 7.524 17.256 8.508 17.34 10.392C17.232 12.192 16.308 13.128 14.544 13.212H13.152C12.732 13.188 12.516 12.984 12.516 12.612ZM13.728 8.544V12.096H14.556C15.504 12.072 16.02 11.496 16.068 10.356C16.044 9.168 15.504 8.568 14.448 8.544H13.728Z" fill="currentColor"/>
      </g>
    </svg>
  );
};

export default AdvertIcon;
