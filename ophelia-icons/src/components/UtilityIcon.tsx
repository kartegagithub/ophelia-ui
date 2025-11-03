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

const UtilityIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-UtilityIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-UtilityIcon)` : undefined}>
         <path d="M11.3333 23.0476L10.7619 20.1905C10.381 20.0317 10.0238 19.8651 9.69048 19.6905C9.35714 19.5159 9.01587 19.3016 8.66667 19.0476L5.90476 19.9048L4 16.6667L6.19048 14.7619C6.12698 14.3492 6.09524 13.9365 6.09524 13.5238C6.09524 13.1111 6.12698 12.6984 6.19048 12.2857L4 10.381L5.90476 7.14286L8.66667 8C9.01587 7.74603 9.35714 7.53175 9.69048 7.35714C10.0238 7.18254 10.381 7.01587 10.7619 6.85714L11.3333 4H15.1429L15.7143 6.85714C16.0952 7.01587 16.4524 7.18254 16.7857 7.35714C17.119 7.53175 17.4603 7.74603 17.8095 8L20.5714 7.14286L22.4762 10.381L20.2857 12.2857C20.3492 12.6984 20.381 13.1111 20.381 13.5238C20.381 13.9365 20.3492 14.3492 20.2857 14.7619L22.4762 16.6667L20.5714 19.9048L17.8095 19.0476C17.4603 19.3016 17.119 19.5159 16.7857 19.6905C16.4524 19.8651 16.0952 20.0317 15.7143 20.1905L15.1429 23.0476H11.3333ZM13.2381 17.3333C14.2857 17.3333 15.1825 16.9603 15.9286 16.2143C16.6746 15.4683 17.0476 14.5714 17.0476 13.5238C17.0476 12.4762 16.6746 11.5794 15.9286 10.8333C15.1825 10.0873 14.2857 9.71429 13.2381 9.71429C12.1905 9.71429 11.2937 10.0873 10.5476 10.8333C9.80159 11.5794 9.42857 12.4762 9.42857 13.5238C9.42857 14.5714 9.80159 15.4683 10.5476 16.2143C11.2937 16.9603 12.1905 17.3333 13.2381 17.3333ZM28.381 44L27.5238 40C26.9841 39.8095 26.4841 39.5794 26.0238 39.3095C25.5635 39.0397 25.1111 38.7302 24.6667 38.381L20.8571 39.619L18.1905 35.0476L21.2381 32.381C21.1746 31.8095 21.1429 31.2381 21.1429 30.6667C21.1429 30.0952 21.1746 29.5238 21.2381 28.9524L18.1905 26.2857L20.8571 21.7143L24.6667 22.9524C25.1111 22.6032 25.5635 22.2937 26.0238 22.0238C26.4841 21.754 26.9841 21.5238 27.5238 21.3333L28.381 17.3333H33.7143L34.5714 21.3333C35.1111 21.5238 35.6111 21.754 36.0714 22.0238C36.5317 22.2937 36.9841 22.6032 37.4286 22.9524L41.2381 21.7143L43.9048 26.2857L40.8571 28.9524C40.9206 29.5238 40.9524 30.0952 40.9524 30.6667C40.9524 31.2381 40.9206 31.8095 40.8571 32.381L43.9048 35.0476L41.2381 39.619L37.4286 38.381C36.9841 38.7302 36.5317 39.0397 36.0714 39.3095C35.6111 39.5794 35.1111 39.8095 34.5714 40L33.7143 44H28.381ZM31.0476 36.381C32.6349 36.381 33.9841 35.8254 35.0952 34.7143C36.2063 33.6032 36.7619 32.254 36.7619 30.6667C36.7619 29.0794 36.2063 27.7302 35.0952 26.619C33.9841 25.5079 32.6349 24.9524 31.0476 24.9524C29.4603 24.9524 28.1111 25.5079 27 26.619C25.8889 27.7302 25.3333 29.0794 25.3333 30.6667C25.3333 32.254 25.8889 33.6032 27 34.7143C28.1111 35.8254 29.4603 36.381 31.0476 36.381Z" /> 
      </g>
    </svg>
  );
};

export default UtilityIcon;
