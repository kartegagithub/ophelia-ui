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

const KgBadgeIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 1024 1024"
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
          <linearGradient id="duotone-KgBadgeIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgBadgeIcon)` : undefined}>
        <path d="M730.837333 658.090667A317.653333 317.653333 0 0 0 830.805333 426.666667c0-175.786667-143.018667-318.805333-318.805333-318.805334-175.786667 0-318.805333 143.018667-318.805333 318.805334 0 89.429333 36.864 170.325333 96.597333 228.352v0.085333l-80.597333 147.669333a34.261333 34.261333 0 0 0 3.072 37.546667c8.533333 10.581333 22.528 15.36 35.84 11.946667l52.565333-14.336 14.336 52.906666a34.389333 34.389333 0 0 0 33.109333 25.258667 33.706667 33.706667 0 0 0 29.354667-17.066667l90.112-156.586666h0.042667c49.237333 6.826667 85.333333 0.085333 88.746666 0l90.112 156.629333c6.144 10.581333 17.408 17.066667 29.696 17.066667 1.365333 0 2.730667 0 4.437334-0.341334a33.578667 33.578667 0 0 0 28.330666-24.917333l14.336-52.906667 52.906667 14.336a34.304 34.304 0 0 0 42.922667-30.848 33.450667 33.450667 0 0 0-4.693334-19.328l-83.626666-144.042666z m-283.306666-77.482667a34.56 34.56 0 0 1-36.224-2.389333 34.218667 34.218667 0 0 1-13.653334-33.450667l12.629334-72.021333-52.224-51.2a34.048 34.048 0 0 1 19.114666-58.026667l72.021334-10.24 32.085333-65.536a34.56 34.56 0 0 1 30.72-19.114667 34.56 34.56 0 0 1 30.72 19.114667l32.085333 65.194667 72.362667 10.581333a34.005333 34.005333 0 0 1 19.114667 58.026667l-52.224 51.2 12.288 72.362666a34.005333 34.005333 0 0 1-49.834667 35.498667L512 546.816l-64.512 33.792z" />
      </g>
    </svg>
  );
};

export default KgBadgeIcon;
