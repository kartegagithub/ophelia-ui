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

const KgMessageIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgMessageIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgMessageIcon)` : undefined}>
        <path d="M890.24 514.986667c-12.8-4.48-24.106667-11.52-36.906667-16-85.76-29.653333-180.053333 2.346667-234.666666 72.96l-437.12 2.133333c-14.506667 7.466667-6.186667 30.933333 7.04 30.933333h408.106666c-22.826667 50.986667-26.026667 106.666667-7.893333 159.786667h-173.653333s-0.64 3.626667-2.773334 5.973333c-52.053333 53.12-97.28 113.066667-148.693333 166.613334-5.546667 9.6-26.026667 2.346667-26.026667-5.973334v-166.613333H136.746667c-31.146667 0-71.04-43.306667-70.826667-74.88V268.373333a83.669333 83.669333 0 0 1 67.413333-76.16l672.213334-112.426666c39.04-1.493333 84.693333 37.12 84.693333 77.013333v358.4-0.213333z m-401.92-168.32c9.6-10.453333 1.28-26.453333-12.373333-27.306667H176.426667c-16.64 1.28-20.693333 22.613333-6.826667 30.933333l311.893333 0.426667c2.133333-1.066667 5.333333-2.346667 6.826667-4.053333zM184.96 449.493333c-17.28 5.76-14.72 30.08 3.626667 31.573334h530.986666a16 16 0 0 0 0-32l-534.613333 0.426666z" /><path d="M784.213333 519.466667c147.84-2.986667 229.973333 174.293333 136.106667 288-84.266667 101.973333-248.106667 77.013333-297.813333-45.44-46.933333-116.053333 37.973333-240 161.706666-242.346667v-0.213333z m-76.16 159.786666c-18.346667 0.213333-22.186667 28.586667-4.266666 31.36h161.706666c16.853333-1.92 18.986667-29.013333-8.106666-31.786666-46.933333-4.693333-101.546667 2.986667-149.12 0.426666h-0.213334z" /><path d="M708.053333 679.253333c47.573333 2.56 102.4-5.12 149.12-0.426666 27.093333 2.773333 24.96 29.866667 8.106667 32h-161.706667c-17.706667-2.986667-14.08-31.36 4.266667-31.573334h0.213333z" />
      </g>
    </svg>
  );
};

export default KgMessageIcon;
