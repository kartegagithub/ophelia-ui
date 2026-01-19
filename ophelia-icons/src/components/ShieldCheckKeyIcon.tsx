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

const ShieldCheckKeyIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-ShieldCheckKeyIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-ShieldCheckKeyIcon)` : undefined}>
         <g clipPath="url(#clip0_5194_1747)"> <path d="M13.2268 16.5648H14.7403C14.8033 16.5648 14.8657 16.5524 14.924 16.5283C14.9822 16.5041 15.0351 16.4688 15.0797 16.4242C15.1243 16.3796 15.1596 16.3267 15.1837 16.2685C15.2079 16.2103 15.2203 16.1478 15.2203 16.0848V14.8445C15.2203 14.7172 15.1697 14.5951 15.0797 14.5051C14.9897 14.4151 14.8676 14.3645 14.7403 14.3645H13.2268V13.3018C15.1718 12.7848 16.5998 11.0683 16.5998 9.03072C16.5998 6.58368 14.5406 4.60032 12 4.60032C9.45932 4.60032 7.40012 6.58368 7.40012 9.03072C7.40012 11.0683 8.82812 12.7848 10.7731 13.3018V20.1192C10.7731 20.772 11.3227 21.301 12 21.301C12.6772 21.301 13.2268 20.772 13.2268 20.1192V19.8725H14.7369C14.8642 19.8725 14.9863 19.8219 15.0763 19.7319C15.1663 19.6419 15.2169 19.5198 15.2169 19.3925V18.1469C15.2169 18.0196 15.1663 17.8975 15.0763 17.8075C14.9863 17.7175 14.8642 17.6669 14.7369 17.6669H13.2268V16.5648ZM0.959961 6.00336V5.23344C5.20412 3.60528 8.72876 1.95984 11.5344 0.29904L12 0L12.4656 0.29904C15.3648 1.99728 18.8894 3.64224 23.04 5.23344V5.97552C23.04 16.3176 21.2654 21.0298 12.012 23.9198C2.71772 20.9798 0.959961 16.4558 0.959961 6.00336ZM12 10.1198C11.512 10.1198 11.044 9.926 10.699 9.58096C10.354 9.23593 10.1601 8.76796 10.1601 8.28C10.1601 7.79204 10.354 7.32407 10.699 6.97904C11.044 6.634 11.512 6.44016 12 6.44016C12.4879 6.44016 12.9559 6.634 13.3009 6.97904C13.646 7.32407 13.8398 7.79204 13.8398 8.28C13.8398 8.76796 13.646 9.23593 13.3009 9.58096C12.9559 9.926 12.4879 10.1198 12 10.1198Z"/> </g> <defs> <clipPath id="ShieldCheckKeyIcon-clip0_5194_1747"> <rect width="24" height="24"/> </clipPath> </defs> 
      </g>
    </svg>
  );
};

export default ShieldCheckKeyIcon;
