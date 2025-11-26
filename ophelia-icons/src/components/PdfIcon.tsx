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

const PdfIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 52 52"
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
          <linearGradient id="duotone-PdfIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-PdfIcon)` : undefined}>
         <rect width="52" height="52" rx="8.66667" /> <path d="M11.6427 21.3H17.3867C18.3254 21.3 19.0827 21.5667 19.6587 22.1C20.2347 22.6227 20.5227 23.316 20.5227 24.18V25.716C20.5227 26.6227 20.2187 27.3533 19.6107 27.908C19.0134 28.452 18.224 28.724 17.2427 28.724H13.5147V32.5H11.6427V21.3ZM17.2107 27.092C17.648 27.092 17.9947 26.9587 18.2507 26.692C18.5174 26.4253 18.6507 26.0787 18.6507 25.652V24.228C18.6507 23.8333 18.5334 23.5187 18.2987 23.284C18.064 23.0493 17.7494 22.932 17.3547 22.932H13.5147V27.092H17.2107ZM23.2999 32.5C22.8839 32.5 22.5479 32.3773 22.2919 32.132C22.0466 31.8867 21.9239 31.5613 21.9239 31.156V21.3H27.0279C27.8599 21.3 28.5906 21.46 29.2199 21.78C29.8599 22.0893 30.3506 22.532 30.6919 23.108C31.0439 23.684 31.2199 24.3507 31.2199 25.108V28.372C31.2199 29.7267 30.8679 30.756 30.1639 31.46C29.4706 32.1533 28.4466 32.5 27.0919 32.5H23.2999ZM27.0439 30.852C27.8013 30.852 28.3719 30.6387 28.7559 30.212C29.1506 29.7747 29.3479 29.14 29.3479 28.308V25.172C29.3479 24.5107 29.1293 23.9773 28.6919 23.572C28.2546 23.156 27.6839 22.948 26.9799 22.948H23.7959V30.852H27.0439ZM33.0177 21.3H41.0657V22.932H34.8897V26.308H40.4737V27.94H34.8897V32.5H33.0177V21.3Z" /> 
      </g>
    </svg>
  );
};

export default PdfIcon;
