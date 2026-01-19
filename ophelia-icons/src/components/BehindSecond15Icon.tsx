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

const BehindSecond15Icon: React.FC<IconProps> = ({
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
      viewBox="0 0 24 24"
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
          <linearGradient id="duotone-BehindSecond15Icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-BehindSecond15Icon)` : undefined}>
         <g clipPath="url(#clip0_3616_1005)"> <path d="M8.63997 0.0834389L3.51466 3.36L4.14653 3.76406L8.63997 6.63656V4.395L12.48 6.58688V3.86438C17.2975 4.11485 21.12 8.07934 21.12 12.96C21.12 18.0027 17.0427 22.08 12 22.08C6.95728 22.08 2.87997 18.0027 2.87997 12.96C2.88087 12.8964 2.86912 12.8332 2.8454 12.7742C2.82168 12.7152 2.78647 12.6615 2.74181 12.6162C2.69715 12.5709 2.64393 12.5349 2.58524 12.5104C2.52656 12.4858 2.46358 12.4732 2.39997 12.4732C2.33636 12.4732 2.27338 12.4858 2.2147 12.5104C2.15601 12.5349 2.10279 12.5709 2.05813 12.6162C2.01347 12.6615 1.97826 12.7152 1.95454 12.7742C1.93082 12.8332 1.91907 12.8964 1.91997 12.96C1.91997 18.5215 6.43849 23.04 12 23.04C17.5614 23.04 22.08 18.5215 22.08 12.96C22.08 7.55944 17.8191 3.14327 12.48 2.89219V0.133126L8.63997 2.325V0.0834389ZM11.52 1.78688V3.27938C11.5114 3.33121 11.5114 3.3841 11.52 3.43594V4.93313L8.76372 3.36L11.52 1.78688ZM7.67997 1.83656V2.74125V3.97875V4.88344L5.29591 3.36L7.67997 1.83656ZM9.11997 9.12C9.11997 10.2 8.15997 10.56 7.19997 10.56V11.52H9.11997V16.8H9.16778H10.08V9.12H9.11997ZM12.12 9.12L11.595 12.6488L12.4275 13.0406C12.7462 12.6849 13.2028 12.48 13.68 12.48C14.6064 12.48 15.36 13.2336 15.36 14.16C15.36 15.0864 14.6064 15.84 13.68 15.84C12.7339 15.84 12 15.0662 12 14.4H11.04C11.04 15.6782 12.2736 16.8 13.68 16.8C15.1358 16.8 16.32 15.6154 16.32 14.16C16.32 12.7046 15.1358 11.52 13.68 11.52C13.344 11.52 13.015 11.5842 12.7087 11.7056L12.9534 10.08H15.84V9.12H12.12Z"/> </g> <defs> <clipPath id="BehindSecond15Icon-clip0_3616_1005"> <rect width="24" height="24"/> </clipPath> </defs> 
      </g>
    </svg>
  );
};

export default BehindSecond15Icon;
