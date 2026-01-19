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

const FullscreenIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-FullscreenIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-FullscreenIcon)` : undefined}>
         <path d="M5.74996 3C4.24007 3 2.99996 4.24011 2.99996 5.75V8.75C2.99855 8.84938 3.01691 8.94805 3.05397 9.04028C3.09103 9.13251 3.14605 9.21645 3.21584 9.28723C3.28562 9.358 3.36877 9.41421 3.46047 9.45257C3.55216 9.49093 3.65056 9.51068 3.74996 9.51068C3.84935 9.51068 3.94775 9.49093 4.03944 9.45257C4.13114 9.41421 4.21429 9.358 4.28408 9.28723C4.35386 9.21645 4.40888 9.13251 4.44594 9.04028C4.483 8.94805 4.50136 8.84938 4.49996 8.75V5.75C4.49996 5.05089 5.05084 4.5 5.74996 4.5H8.74996C8.84934 4.5014 8.94801 4.48304 9.04024 4.44598C9.13246 4.40892 9.2164 4.3539 9.28718 4.28412C9.35796 4.21434 9.41416 4.13118 9.45252 4.03949C9.49088 3.9478 9.51064 3.84939 9.51064 3.75C9.51064 3.6506 9.49088 3.5522 9.45252 3.46051C9.41416 3.36882 9.35796 3.28566 9.28718 3.21588C9.2164 3.1461 9.13246 3.09107 9.04024 3.05401C8.94801 3.01695 8.84934 2.99859 8.74996 3H5.74996ZM15.25 3C15.1506 2.99859 15.0519 3.01695 14.9597 3.05401C14.8674 3.09107 14.7835 3.1461 14.7127 3.21588C14.642 3.28566 14.5857 3.36882 14.5474 3.46051C14.509 3.5522 14.4893 3.6506 14.4893 3.75C14.4893 3.84939 14.509 3.9478 14.5474 4.03949C14.5857 4.13118 14.642 4.21434 14.7127 4.28412C14.7835 4.3539 14.8674 4.40892 14.9597 4.44598C15.0519 4.48304 15.1506 4.5014 15.25 4.5H18.25C18.9491 4.5 19.5 5.05089 19.5 5.75V8.75C19.4986 8.84938 19.5169 8.94805 19.554 9.04028C19.591 9.13251 19.6461 9.21645 19.7158 9.28723C19.7856 9.358 19.8688 9.41421 19.9605 9.45257C20.0522 9.49093 20.1506 9.51068 20.25 9.51068C20.3493 9.51068 20.4478 9.49093 20.5394 9.45257C20.6311 9.41421 20.7143 9.358 20.7841 9.28723C20.8539 9.21645 20.9089 9.13251 20.9459 9.04028C20.983 8.94805 21.0014 8.84938 21 8.75V5.75C21 4.24011 19.7598 3 18.25 3H15.25ZM3.73824 14.4893C3.53949 14.4924 3.35011 14.5742 3.21168 14.7169C3.07326 14.8595 2.9971 15.0513 2.99996 15.25V18.25C2.99996 19.7599 4.24007 21 5.74996 21H8.74996C8.84934 21.0014 8.94801 20.983 9.04024 20.946C9.13246 20.9089 9.2164 20.8539 9.28718 20.7841C9.35796 20.7143 9.41416 20.6312 9.45252 20.5395C9.49088 20.4478 9.51064 20.3494 9.51064 20.25C9.51064 20.1506 9.49088 20.0522 9.45252 19.9605C9.41416 19.8688 9.35796 19.7857 9.28718 19.7159C9.2164 19.6461 9.13246 19.5911 9.04024 19.554C8.94801 19.517 8.84934 19.4986 8.74996 19.5H5.74996C5.05084 19.5 4.49996 18.9491 4.49996 18.25V15.25C4.5014 15.1496 4.48267 15.05 4.44489 14.957C4.4071 14.8639 4.35103 14.7795 4.28 14.7085C4.20897 14.6376 4.12441 14.5816 4.03135 14.544C3.93829 14.5063 3.83862 14.4877 3.73824 14.4893ZM20.2382 14.4893C20.0395 14.4924 19.8501 14.5742 19.7117 14.7169C19.5733 14.8595 19.4971 15.0513 19.5 15.25V18.25C19.5 18.9491 18.9491 19.5 18.25 19.5H15.25C15.1506 19.4986 15.0519 19.517 14.9597 19.554C14.8674 19.5911 14.7835 19.6461 14.7127 19.7159C14.642 19.7857 14.5857 19.8688 14.5474 19.9605C14.509 20.0522 14.4893 20.1506 14.4893 20.25C14.4893 20.3494 14.509 20.4478 14.5474 20.5395C14.5857 20.6312 14.642 20.7143 14.7127 20.7841C14.7835 20.8539 14.8674 20.9089 14.9597 20.946C15.0519 20.983 15.1506 21.0014 15.25 21H18.25C19.7598 21 21 19.7599 21 18.25V15.25C21.0014 15.1496 20.9827 15.05 20.9449 14.957C20.9071 14.8639 20.851 14.7795 20.78 14.7085C20.709 14.6376 20.6244 14.5816 20.5314 14.5439C20.4383 14.5063 20.3386 14.4877 20.2382 14.4893Z"/> 
      </g>
    </svg>
  );
};

export default FullscreenIcon;
