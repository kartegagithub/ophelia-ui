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

const DoubleImageIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 24 22"
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
          <linearGradient id="duotone-DoubleImageIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-DoubleImageIcon)` : undefined}>
         <g clipPath="url(#clip0_4033_1225)"> <path d="M20 17.3333V18C20 19.1046 19.1046 20 18 20H2C0.895417 20 0 19.1046 0 18V7.33333C0 6.22874 0.895417 5.33333 2 5.33333H2.66667V7.33333H2.25C2.1837 7.33333 2.12011 7.35967 2.07322 7.40655C2.02634 7.45344 2 7.51702 2 7.58333V17.75C2 17.8163 2.02634 17.8799 2.07322 17.9268C2.12011 17.9737 2.1837 18 2.25 18H17.75C17.8163 18 17.8799 17.9737 17.9268 17.9268C17.9737 17.8799 18 17.8163 18 17.75V17.3333H20ZM21.75 3.33333H6.25C6.1837 3.33333 6.12011 3.35967 6.07322 3.40655C6.02634 3.45344 6 3.51702 6 3.58333V13.75C6 13.8163 6.02634 13.8799 6.07322 13.9268C6.12011 13.9737 6.1837 14 6.25 14H21.75C21.8163 14 21.8799 13.9737 21.9268 13.9268C21.9737 13.8799 22 13.8163 22 13.75V3.58333C22 3.51702 21.9737 3.45344 21.9268 3.40655C21.8799 3.35967 21.8163 3.33333 21.75 3.33333ZM22 1.33333C23.1046 1.33333 24 2.22874 24 3.33333V14C24 15.1046 23.1046 16 22 16H6C4.89542 16 4 15.1046 4 14V3.33333C4 2.22874 4.89542 1.33333 6 1.33333H22ZM11 6C11 6.92045 10.2538 7.66666 9.33333 7.66666C8.41288 7.66666 7.66667 6.92045 7.66667 6C7.66667 5.07954 8.41288 4.33333 9.33333 4.33333C10.2538 4.33333 11 5.07954 11 6ZM8 10L9.64646 8.35354C9.84171 8.15829 10.1583 8.15829 10.3536 8.35354L12 10L16.3131 5.68687C16.5084 5.49162 16.825 5.49162 17.0203 5.68687L20 8.66666V12H8V10Z"/> </g> <defs> <clipPath id="DoubleImageIcon-clip0_4033_1225"> <rect width="24" height="21.3333"/> </clipPath> </defs> 
      </g>
    </svg>
  );
};

export default DoubleImageIcon;
