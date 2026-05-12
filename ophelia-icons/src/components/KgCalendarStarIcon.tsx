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

const KgCalendarStarIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgCalendarStarIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgCalendarStarIcon)` : undefined}>
        <path d="M416 128a32 32 0 0 0-64 0h64z m256 0a32 32 0 0 0-64 0h64z m-256 53.333333V128h-64v53.333333h64z m256 0V128h-64v53.333333h64zM928 551.125333V458.666667c0-59.52 0-89.258667-5.888-113.792a213.333333 213.333333 0 0 0-157.653333-157.653334c-24.533333-5.888-54.314667-5.888-113.792-5.888h-277.333334c-59.52 0-89.258667 0-113.792 5.888a213.333333 213.333333 0 0 0-157.653333 157.653334c-5.888 24.533333-5.888 54.272-5.888 113.792v92.458666c0 146.432 0 219.605333 34.432 272.64a213.333333 213.333333 0 0 0 62.72 62.72c52.992 34.389333 126.208 34.389333 272.64 34.389334h92.416c146.432 0 219.648 0 272.64-34.389334a213.333333 213.333333 0 0 0 62.72-62.72c34.432-53.034667 34.432-126.208 34.432-272.64zM458.666667 428.544c10.069333-32.469333 15.061333-48.725333 20.48-55.210667a42.666667 42.666667 0 0 1 65.706666 0c5.418667 6.485333 10.453333 22.741333 20.48 55.210667 2.730667 8.832 4.096 13.226667 6.058667 16.938667a42.666667 42.666667 0 0 0 29.269333 21.546666c4.096 0.853333 8.789333 0.853333 18.176 0.853334 35.754667 0 53.632 0 62.08 3.84a42.666667 42.666667 0 0 1 19.925334 58.88c-4.352 8.192-18.346667 18.858667-46.250667 40.192l-4.522667 3.456c-8.106667 6.229333-12.202667 9.344-15.232 12.885333a42.666667 42.666667 0 0 0-9.856 30.976c0.341333 4.693333 1.877333 9.557333 4.864 19.328l2.389334 7.594667c9.429333 30.592 14.165333 45.866667 13.525333 53.973333a42.666667 42.666667 0 0 1-54.144 37.76c-7.850667-2.218667-20.565333-11.946667-45.994667-31.36-7.338667-5.632-11.050667-8.448-14.762666-10.24a42.666667 42.666667 0 0 0-37.717334 0c-3.712 1.834667-7.424 4.608-14.762666 10.24-25.429333 19.456-38.144 29.141333-45.994667 31.36a42.666667 42.666667 0 0 1-54.186667-37.76c-0.597333-8.106667 4.138667-23.381333 13.568-53.973333l2.346667-7.594667c3.029333-9.813333 4.565333-14.677333 4.949333-19.328a42.666667 42.666667 0 0 0-9.898666-30.976c-3.029333-3.541333-7.082667-6.656-15.232-12.885333l-4.522667-3.456c-27.904-21.333333-41.898667-32-46.250667-40.192a42.666667 42.666667 0 0 1 19.925334-58.88c8.448-3.84 26.325333-3.84 62.08-3.84 9.386667 0 14.08 0 18.176-0.853334a42.666667 42.666667 0 0 0 29.269333-21.546666c1.962667-3.669333 3.328-8.106667 6.058667-16.938667z" />
      </g>
    </svg>
  );
};

export default KgCalendarStarIcon;
