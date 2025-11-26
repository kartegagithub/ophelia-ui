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

const NotVisibleIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 48 48"
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
          <linearGradient id="duotone-NotVisibleIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-NotVisibleIcon)` : undefined}>
         <path d="M32.2 25.5996L29.3 22.6996C29.6 21.1329 29.15 19.6663 27.95 18.2996C26.75 16.9329 25.2 16.3996 23.3 16.6996L20.4 13.7996C20.9667 13.5329 21.5417 13.3329 22.125 13.1996C22.7083 13.0663 23.3333 12.9996 24 12.9996C26.5 12.9996 28.625 13.8746 30.375 15.6246C32.125 17.3746 33 19.4996 33 21.9996C33 22.6663 32.9333 23.2913 32.8 23.8746C32.6667 24.4579 32.4667 25.0329 32.2 25.5996ZM38.6 31.8996L35.7 29.0996C36.9667 28.1329 38.0917 27.0746 39.075 25.9246C40.0583 24.7746 40.9 23.4663 41.6 21.9996C39.9333 18.6329 37.5417 15.9579 34.425 13.9746C31.3083 11.9913 27.8333 10.9996 24 10.9996C23.0333 10.9996 22.0833 11.0663 21.15 11.1996C20.2167 11.3329 19.3 11.5329 18.4 11.7996L15.3 8.69961C16.6667 8.13294 18.0667 7.70794 19.5 7.42461C20.9333 7.14128 22.4333 6.99961 24 6.99961C29.0333 6.99961 33.5167 8.39128 37.45 11.1746C41.3833 13.9579 44.2333 17.5663 46 21.9996C45.2333 23.9663 44.225 25.7913 42.975 27.4746C41.725 29.1579 40.2667 30.6329 38.6 31.8996ZM39.6 44.1996L31.2 35.8996C30.0333 36.2663 28.8583 36.5413 27.675 36.7246C26.4917 36.9079 25.2667 36.9996 24 36.9996C18.9667 36.9996 14.4833 35.6079 10.55 32.8246C6.61667 30.0413 3.76667 26.4329 2 21.9996C2.7 20.2329 3.58333 18.5913 4.65 17.0746C5.71667 15.5579 6.93333 14.1996 8.3 12.9996L2.8 7.39961L5.6 4.59961L42.4 41.3996L39.6 44.1996ZM11.1 15.7996C10.1333 16.6663 9.25 17.6163 8.45 18.6496C7.65 19.6829 6.96667 20.7996 6.4 21.9996C8.06667 25.3663 10.4583 28.0413 13.575 30.0246C16.6917 32.0079 20.1667 32.9996 24 32.9996C24.6667 32.9996 25.3167 32.9579 25.95 32.8746C26.5833 32.7913 27.2333 32.6996 27.9 32.5996L26.1 30.6996C25.7333 30.7996 25.3833 30.8746 25.05 30.9246C24.7167 30.9746 24.3667 30.9996 24 30.9996C21.5 30.9996 19.375 30.1246 17.625 28.3746C15.875 26.6246 15 24.4996 15 21.9996C15 21.6329 15.025 21.2829 15.075 20.9496C15.125 20.6163 15.2 20.2663 15.3 19.8996L11.1 15.7996Z" /> 
      </g>
    </svg>
  );
};

export default NotVisibleIcon;
