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

const StoreIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 48 48"
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
          <linearGradient id="duotone-StoreIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-StoreIcon)` : undefined}>
         <path d="M42.0939 22.1V38C42.0939 39.1 41.7022 40.0417 40.9189 40.825C40.1355 41.6083 39.1939 42 38.0939 42H10.0939C8.99388 42 8.05221 41.6083 7.26888 40.825C6.48554 40.0417 6.09388 39.1 6.09388 38V22.1C5.32721 21.4 4.73554 20.5 4.31888 19.4C3.90221 18.3 3.89388 17.1 4.29388 15.8L6.39388 9C6.66054 8.13333 7.13554 7.41667 7.81888 6.85C8.50221 6.28333 9.29388 6 10.1939 6H37.9939C38.8939 6 39.6772 6.275 40.3439 6.825C41.0105 7.375 41.4939 8.1 41.7939 9L43.8939 15.8C44.2939 17.1 44.2855 18.2833 43.8689 19.35C43.4522 20.4167 42.8605 21.3333 42.0939 22.1ZM28.4939 20C29.3939 20 30.0772 19.6917 30.5439 19.075C31.0105 18.4583 31.1939 17.7667 31.0939 17L29.9939 10H26.0939V17.4C26.0939 18.1 26.3272 18.7083 26.7939 19.225C27.2605 19.7417 27.8272 20 28.4939 20ZM19.4939 20C20.2605 20 20.8855 19.7417 21.3689 19.225C21.8522 18.7083 22.0939 18.1 22.0939 17.4V10H18.1939L17.0939 17C16.9605 17.8 17.1355 18.5 17.6189 19.1C18.1022 19.7 18.7272 20 19.4939 20ZM10.5939 20C11.1939 20 11.7189 19.7833 12.1689 19.35C12.6189 18.9167 12.8939 18.3667 12.9939 17.7L14.0939 10H10.1939L8.19388 16.7C7.99388 17.3667 8.10221 18.0833 8.51888 18.85C8.93554 19.6167 9.62721 20 10.5939 20ZM37.5939 20C38.5605 20 39.2605 19.6167 39.6939 18.85C40.1272 18.0833 40.2272 17.3667 39.9939 16.7L37.8939 10H34.0939L35.1939 17.7C35.2939 18.3667 35.5689 18.9167 36.0189 19.35C36.4689 19.7833 36.9939 20 37.5939 20ZM10.0939 38H38.0939V23.9C37.9272 23.9667 37.8189 24 37.7689 24H37.5939C36.6939 24 35.9022 23.85 35.2189 23.55C34.5355 23.25 33.8605 22.7667 33.1939 22.1C32.5939 22.7 31.9105 23.1667 31.1439 23.5C30.3772 23.8333 29.5605 24 28.6939 24C27.7939 24 26.9522 23.8333 26.1689 23.5C25.3855 23.1667 24.6939 22.7 24.0939 22.1C23.5272 22.7 22.8689 23.1667 22.1189 23.5C21.3689 23.8333 20.5605 24 19.6939 24C18.7272 24 17.8522 23.8333 17.0689 23.5C16.2855 23.1667 15.5939 22.7 14.9939 22.1C14.2939 22.8 13.6022 23.2917 12.9189 23.575C12.2355 23.8583 11.4605 24 10.5939 24H10.3689C10.2855 24 10.1939 23.9667 10.0939 23.9V38Z" /> 
      </g>
    </svg>
  );
};

export default StoreIcon;
