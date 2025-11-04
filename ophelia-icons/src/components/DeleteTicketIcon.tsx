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

const DeleteTicketIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 21 21"
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
          <linearGradient id="duotone-DeleteTicketIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-DeleteTicketIcon)` : undefined}>
         <path fillRule="evenodd" clipRule="evenodd" d="M8.43766 14.7618C8.43766 15.3118 7.98766 15.7618 7.43766 15.7618C6.88766 15.7618 6.43766 15.3118 6.43766 14.7618V10.7618C6.43766 10.2118 6.88766 9.76176 7.43766 9.76176C7.98766 9.76176 8.43766 10.2118 8.43766 10.7618V14.7618ZM14.4373 14.7618C14.4373 15.3118 13.9873 15.7618 13.4373 15.7618C12.8873 15.7618 12.4373 15.3118 12.4373 14.7618V10.7618C12.4373 10.2118 12.8873 9.7618 13.4373 9.7618C13.9873 9.7618 14.4373 10.2118 14.4373 10.7618V14.7618ZM16.4373 17.7617C16.4373 18.3127 15.9893 18.7617 15.4373 18.7617H5.43734C4.88534 18.7617 4.43734 18.3127 4.43734 17.7617V6.76168H16.4373V17.7617ZM8.43758 3.08964C8.43758 2.93464 8.65158 2.76164 8.93758 2.76164H11.9376C12.2236 2.76164 12.4376 2.93464 12.4376 3.08964V4.76164H8.43758V3.08964ZM19.4375 4.76172H18.4375H14.4375V3.08972C14.4375 1.80572 13.3165 0.761719 11.9375 0.761719H8.9375C7.5585 0.761719 6.4375 1.80572 6.4375 3.08972V4.76172H2.4375H1.4375C0.8875 4.76172 0.4375 5.21172 0.4375 5.76172C0.4375 6.31172 0.8875 6.76172 1.4375 6.76172H2.4375V17.7617C2.4375 19.4157 3.7835 20.7617 5.4375 20.7617H15.4375C17.0915 20.7617 18.4375 19.4157 18.4375 17.7617V6.76172H19.4375C19.9875 6.76172 20.4375 6.31172 20.4375 5.76172C20.4375 5.21172 19.9875 4.76172 19.4375 4.76172Z" /> 
      </g>
    </svg>
  );
};

export default DeleteTicketIcon;
