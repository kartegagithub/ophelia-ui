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

const KgAnnouncementIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgAnnouncementIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgAnnouncementIcon)` : undefined}>
        <path d="M535.04 193.877333a108.416 108.416 0 0 0-114.858667 11.52L340.48 266.965333a24.405333 24.405333 0 0 1-12.8 3.712H237.397333a123.434667 123.434667 0 0 0-123.392 123.306667v236.288a123.52 123.52 0 0 0 123.392 123.434667h89.898667c4.821333 0 9.386667 1.28 13.482667 3.84l79.530666 61.226666a108.586667 108.586667 0 0 0 114.688 11.52 108.373333 108.373333 0 0 0 60.885334-97.92V291.882667c0-41.898667-23.296-79.488-60.885334-98.005334z m-7.125333 538.197334a40.405333 40.405333 0 0 1-23.04 36.906666 40.192 40.192 0 0 1-43.178667-4.266666l-81.408-62.72-0.853333-0.597334a93.098667 93.098667 0 0 0-52.138667-15.786666H237.397333a55.466667 55.466667 0 0 1-55.381333-55.424V393.984a55.466667 55.466667 0 0 1 55.381333-55.381333H327.68c18.432 0 36.224-5.418667 51.498667-15.701334l0.938666-0.597333 81.664-63.018667a40.192 40.192 0 0 1 43.221334-4.266666c14.378667 7.082667 22.997333 20.906667 22.997333 36.864v440.192h-0.085333zM875.946667 477.866667h-153.770667a33.962667 33.962667 0 1 0 0 68.010666h153.770667a33.962667 33.962667 0 1 0 0-68.010666z m-153.770667-70.101334a33.536 33.536 0 0 0 23.978667-9.984l108.8-108.714666a33.962667 33.962667 0 1 0-48.085334-48.085334l-108.8 108.8a33.962667 33.962667 0 0 0 24.106667 58.026667z m23.978667 218.24a33.962667 33.962667 0 1 0-48.085334 48.085334l108.8 108.8a33.962667 33.962667 0 1 0 48-48.128l-108.714666-108.8z" />
      </g>
    </svg>
  );
};

export default KgAnnouncementIcon;
