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

const SignUpIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 25 17"
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
          <linearGradient id="duotone-SignUpIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-SignUpIcon)` : undefined}>
        <g clipPath="url(#clip0_231_1239)"><path d="M8.72177 6.49018H5.33872V2.859H3.94152V6.49018H0.747559V8.05679H3.94152V11.688H5.33872V8.05679H8.7175V6.49018H8.72177ZM19.3355 7.66235C19.7411 7.63422 20.1371 7.52605 20.5007 7.34411C20.8643 7.16216 21.1883 6.91003 21.454 6.60226C21.8219 6.22998 22.1055 5.78301 22.2856 5.29161C22.4657 4.8002 22.5381 4.27583 22.4979 3.754C22.4578 3.23218 22.306 2.72507 22.0528 2.26701C21.7996 1.80895 21.451 1.41063 21.0305 1.09903C20.4596 0.767685 19.8273 0.555935 19.172 0.476654C18.5167 0.397373 17.8522 0.452219 17.2188 0.637855C17.7306 1.03176 18.131 1.55227 18.3803 2.14807C18.6297 2.74387 18.7195 3.39438 18.6408 4.03545C18.6567 4.69721 18.508 5.35257 18.2079 5.94262C17.9079 6.53267 17.466 7.03894 16.9219 7.41594C17.6918 7.70437 18.5228 7.79068 19.3355 7.66663V7.66235ZM14.0599 7.66235C14.8989 7.66173 15.7117 7.37024 16.36 6.83753C17.0082 6.30483 17.4516 5.56387 17.6148 4.74088C17.778 3.91788 17.6508 3.06377 17.2549 2.32403C16.859 1.5843 16.2189 1.0047 15.4436 0.683989C14.6683 0.363273 13.8058 0.321274 13.003 0.565147C12.2002 0.80902 11.5068 1.32368 11.0409 2.02145C10.575 2.71922 10.3654 3.55694 10.4478 4.39189C10.5303 5.22685 10.8997 6.00739 11.4931 6.60055C11.8298 6.93801 12.2299 7.20554 12.6704 7.38777C13.111 7.57 13.5832 7.66331 14.0599 7.66235ZM20.0294 10.8803C21.3188 11.6734 22.5192 12.2817 22.5192 13.7115V16.1337H24.7566V13.7132C24.7566 11.8514 21.8801 10.1196 20.0311 10.882L20.0294 10.8803ZM14.059 10.0786C11.6377 10.0786 6.79667 11.291 6.79667 13.7115V16.1337H21.3231V13.714C21.3231 11.2927 16.4795 10.0829 14.0599 10.0829L14.059 10.0786Z" fill="currentColor"/></g><defs><clipPath id="SignUpIcon-clip0_231_1239"><path fill="currentColor" transform="translate(0.747559 0.399994)" d="M0 0H24V15.7337H0z"/></clipPath></defs>
      </g>
    </svg>
  );
};

export default SignUpIcon;
