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

const MentionIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-MentionIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-MentionIcon)` : undefined}>
         <path d="M11.8126 8.9295C11.0781 8.9295 10.5038 9.20675 10.0898 9.76125C9.67584 10.3158 9.46884 11.0852 9.46884 12.0697C9.46884 13.0543 9.67584 13.8237 10.0898 14.3783C10.5038 14.9327 11.0741 15.21 11.8006 15.21C12.5271 15.21 13.1091 14.9288 13.5466 14.3663C13.9841 13.8038 14.2028 13.038 14.2028 12.069C14.2028 11.1 13.9881 10.3343 13.5586 9.77175C13.1291 9.20925 12.5471 8.928 11.8126 8.928V8.9295ZM12.2108 1.5C14.1798 1.5 15.9298 1.89075 17.4608 2.67225C18.9918 3.45375 20.1871 4.53975 21.0466 5.93025C21.9216 7.35225 22.3591 8.985 22.3591 10.8285C22.3591 12.141 22.1638 13.2933 21.7733 14.2853C21.3828 15.2773 20.8203 16.043 20.0858 16.5825C19.3513 17.122 18.4841 17.3915 17.4841 17.391C16.7186 17.391 16.0623 17.2075 15.5153 16.8405C14.9683 16.4735 14.6401 15.9852 14.5306 15.3757C14.2651 16.0007 13.8471 16.4852 13.2766 16.8292C12.7061 17.1732 12.0458 17.3453 11.2958 17.3453C10.4208 17.3453 9.65509 17.1225 8.99859 16.677C8.34209 16.2315 7.83034 15.6065 7.46334 14.802C7.09634 13.9975 6.91284 13.064 6.91284 12.0015C6.91284 11.0015 7.09634 10.1108 7.46334 9.32925C7.83034 8.54775 8.33809 7.93825 8.98659 7.50075C9.63509 7.06325 10.3733 6.8445 11.2013 6.8445C11.8888 6.8445 12.5296 7.00475 13.1236 7.32525C13.7176 7.64575 14.1316 8.07925 14.3656 8.62575V7.29C14.3656 7.243 14.3851 7.2 14.4241 7.161C14.4631 7.122 14.5061 7.1025 14.5531 7.1025H16.4753C16.5378 7.1025 16.5848 7.122 16.6163 7.161C16.6478 7.2 16.6636 7.243 16.6636 7.29V14.0873C16.6636 14.5093 16.7731 14.849 16.9921 15.1065C17.2111 15.364 17.5313 15.493 17.9528 15.4935C18.6403 15.4935 19.1911 15.0873 19.6051 14.2748C20.0191 13.4623 20.2261 12.345 20.2261 10.923C20.2261 9.423 19.8901 8.09875 19.2181 6.95025C18.5461 5.80175 17.5928 4.915 16.3583 4.29C15.1238 3.665 13.7058 3.3525 12.1043 3.3525C10.5028 3.3525 9.06934 3.71975 7.80384 4.45425C6.53834 5.18875 5.55384 6.21225 4.85034 7.52475C4.14734 8.86875 3.79584 10.3845 3.79584 12.072C3.79584 13.8375 4.17084 15.3765 4.92084 16.689C5.63984 17.9545 6.66334 18.9233 7.99134 19.5953C9.31934 20.2673 10.8428 20.6033 12.5618 20.6033C13.4838 20.6033 14.6478 20.4548 16.0538 20.1578C16.1008 20.1423 16.1478 20.154 16.1948 20.193C16.2418 20.232 16.2653 20.2828 16.2653 20.3453V21.822C16.2653 21.916 16.2183 21.9708 16.1243 21.9862C14.5928 22.3143 13.3583 22.4783 12.4208 22.4783C10.3268 22.4783 8.46734 22.0602 6.84234 21.2243C5.21734 20.3883 3.95959 19.1968 3.06909 17.6497C2.13159 16.0403 1.66284 14.1575 1.66284 12.0015C1.66284 9.939 2.11609 8.103 3.02259 6.4935C3.89759 4.9155 5.13584 3.689 6.73734 2.814C8.33884 1.939 10.1631 1.5015 12.2101 1.5015L12.2108 1.5Z"/> 
      </g>
    </svg>
  );
};

export default MentionIcon;
