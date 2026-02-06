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

const FollowIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 22 22"
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
          <linearGradient id="duotone-FollowIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-FollowIcon)` : undefined}>
         <path d="M11.3868 0.825195C8.10614 0.825195 5.44678 3.48456 5.44678 6.7652C5.44678 10.0458 8.10614 12.7052 11.3868 12.7052C14.6674 12.7052 17.3268 10.0458 17.3268 6.7652C17.3268 3.48456 14.6674 0.825195 11.3868 0.825195ZM11.3868 11.1652C8.96062 11.1652 6.98678 9.19136 6.98678 6.7652C6.98678 4.33904 8.96062 2.3652 11.3868 2.3652C13.8129 2.3652 15.7868 4.33904 15.7868 6.7652C15.7868 9.19136 13.8129 11.1652 11.3868 11.1652Z" /> <path d="M1.97865 19.2765C1.96105 19.341 1.94873 19.4076 1.94873 19.4774C1.94873 19.6816 2.02986 19.8774 2.17426 20.0218C2.31866 20.1662 2.51451 20.2474 2.71873 20.2474C2.92295 20.2474 3.1188 20.1662 3.2632 20.0218C3.40761 19.8774 3.48873 19.6816 3.48873 19.4774H3.50127C4.07745 15.6423 7.39395 12.6923 11.3872 12.6923V11.1523C6.60503 11.1523 2.65229 14.6814 1.97865 19.2765Z" /> <path d="M19.8387 16.4702C19.8387 16.6744 19.7575 16.8703 19.6131 17.0147C19.4687 17.1591 19.2729 17.2402 19.0687 17.2402H12.9087C12.8076 17.2402 12.7074 17.2203 12.614 17.1816C12.5206 17.1429 12.4357 17.0862 12.3642 17.0147C12.2927 16.9432 12.236 16.8583 12.1973 16.7649C12.1586 16.6714 12.1387 16.5713 12.1387 16.4702C12.1387 16.3691 12.1586 16.2689 12.1973 16.1755C12.236 16.0821 12.2927 15.9972 12.3642 15.9257C12.4357 15.8542 12.5206 15.7975 12.614 15.7588C12.7074 15.7201 12.8076 15.7002 12.9087 15.7002H19.0687C19.2729 15.7002 19.4687 15.7813 19.6131 15.9257C19.7575 16.0701 19.8387 16.266 19.8387 16.4702Z" /> <path d="M15.9888 20.3201C15.7845 20.3201 15.5887 20.239 15.4443 20.0946C15.2999 19.9502 15.2187 19.7543 15.2188 19.5501V13.3901C15.2188 13.1859 15.2999 12.99 15.4443 12.8456C15.5887 12.7012 15.7845 12.6201 15.9888 12.6201C16.193 12.6201 16.3888 12.7012 16.5332 12.8456C16.6776 12.99 16.7587 13.1859 16.7587 13.3901V19.5501C16.7587 19.7543 16.6776 19.9502 16.5332 20.0946C16.3888 20.239 16.193 20.3201 15.9888 20.3201Z" />

      </g>
    </svg>
  );
};

export default FollowIcon;
