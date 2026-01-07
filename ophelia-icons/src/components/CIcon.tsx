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

const CIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 11 11"
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
          <linearGradient id="duotone-CIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-CIcon)` : undefined}>
         <g clipPath="url(#clip0_4939_1947)"> <path d="M5.5 0.6875C2.84238 0.6875 0.6875 2.84238 0.6875 5.5C0.6875 8.15762 2.84238 10.3125 5.5 10.3125C8.15762 10.3125 10.3125 8.15762 10.3125 5.5C10.3125 2.84238 8.15762 0.6875 5.5 0.6875ZM5.5 9.49609C3.29355 9.49609 1.50391 7.70645 1.50391 5.5C1.50391 3.29355 3.29355 1.50391 5.5 1.50391C7.70645 1.50391 9.49609 3.29355 9.49609 5.5C9.49609 7.70645 7.70645 9.49609 5.5 9.49609Z" /> <path d="M5.56016 3.77373C6.12949 3.77373 6.51621 4.13682 6.55918 4.66963C6.5624 4.71475 6.6 4.74912 6.64512 4.74912H7.2542C7.28213 4.74912 7.30469 4.72656 7.30469 4.69863C7.30469 3.76729 6.56992 3.11523 5.55693 3.11523C4.37637 3.11523 3.69531 3.9123 3.69531 5.2293V5.79111C3.69531 7.09844 4.37637 7.88477 5.55693 7.88477C6.5667 7.88477 7.30469 7.25312 7.30469 6.36582C7.30469 6.33789 7.28213 6.31533 7.2542 6.31533H6.64404C6.59893 6.31533 6.5624 6.34971 6.55811 6.39375C6.51299 6.88896 6.12734 7.22949 5.55908 7.22949C4.85762 7.22949 4.4623 6.71494 4.4623 5.79434V5.2293C4.46338 4.29473 4.85977 3.77373 5.56016 3.77373Z" /> </g> <defs> <clipPath id="CIcon-clip0_4939_1947"> <rect width="11" height="11" /> </clipPath> </defs>

      </g>
    </svg>
  );
};

export default CIcon;
