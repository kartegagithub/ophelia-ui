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

const KgCalisanIliskileriIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgCalisanIliskileriIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgCalisanIliskileriIcon)` : undefined}>
        <path d="M899.84 297.813333c-36.266667-40.106667-96.853333-60.16-184.746667-60.16h-10.24v-1.706666c0-71.68 0-160.426667-160.426666-160.426667h-64.853334c-160.426667 0-160.426667 89.173333-160.426666 160.426667v2.133333h-10.24c-88.32 0-148.48 20.053333-184.746667 60.16-42.24 46.933333-40.96 110.08-36.693333 153.173333l0.426666 2.986667 3.285334 34.688c0.64 6.4 4.053333 12.16 9.429333 15.701333 10.24 6.698667 27.349333 17.706667 37.632 23.424 5.973333 3.84 12.373333 7.253333 18.773333 10.666667 72.96 40.106667 153.173333 66.986667 234.666667 80.213333 3.84 40.106667 21.333333 87.04 114.773333 87.04s111.786667-46.506667 114.773334-87.893333c87.04-14.08 171.093333-44.373333 247.04-88.746667 2.56-1.28 4.266667-2.56 6.4-3.84 16.938667-9.557333 34.474667-21.333333 50.474666-32.896a21.034667 21.034667 0 0 0 8.576-14.762666l0.682667-6.101334 2.133333-20.053333c0.426667-2.56 0.426667-4.693333 0.853334-7.68 3.413333-43.093333 2.56-101.973333-37.546667-146.346667z m-341.333333 292.266667c0 45.226667 0 52.053333-52.48 52.053333s-52.48-8.106667-52.48-51.626666v-53.76h104.96v53.333333z m-178.346667-354.133333c0-72.533333 0-99.413333 99.413333-99.413334h64.853334c99.413333 0 99.413333 27.306667 99.413333 99.413334v2.133333H380.16v-2.133333zM890.581333 585.984a21.717333 21.717333 0 0 1 30.976 21.418667l-15.317333 168.704c-8.96 85.333333-43.946667 172.373333-231.68 172.373333H349.44c-187.733333 0-222.72-87.04-231.68-171.946667l-14.506667-159.914666a21.674667 21.674667 0 0 1 30.506667-21.589334c48.64 22.016 138.325333 61.013333 193.792 75.52a24.32 24.32 0 0 1 15.744 13.44c25.898667 55.381333 82.048 84.864 163.157333 84.864 80.298667 0 137.173333-30.592 163.157334-86.144a24.405333 24.405333 0 0 1 15.786666-13.397333c58.88-15.488 154.368-59.136 205.226667-83.328z" />
      </g>
    </svg>
  );
};

export default KgCalisanIliskileriIcon;
