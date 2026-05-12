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

const KgServicesIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgServicesIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgServicesIcon)` : undefined}>
        <path d="M802.048 426.666667l-46.933333-102.4-102.4-46.933334 102.4-46.933333 46.933333-102.4 46.933333 102.4 102.4 46.933333-102.4 46.933334-46.933333 102.4m85.333333 298.666666l-34.133333-72.533333-72.533333-34.133333 72.533333-34.133334 34.133333-72.533333 34.133334 72.533333 72.533333 34.133334-72.533333 34.133333-34.133334 72.533333m-554.666666 256l-12.8-100.266666a119.04 119.04 0 0 1-16-8.533334 78.250667 78.250667 0 0 1-13.866667-10.666666l-93.866667 40.533333-105.6-185.6 80-59.733333V640v-17.066667l-80-59.733333 105.6-185.6 93.866667 40.533333c3.541333-3.541333 8.192-7.125333 13.866667-10.666666 5.674667-3.541333 11.008-6.4 16-8.533334l12.8-100.266666h213.333333l12.8 100.266666c4.992 2.133333 10.325333 4.992 16 8.533334s10.325333 7.125333 13.866667 10.666666l93.866666-40.533333 105.6 185.6-80 59.733333v34.133334l80 59.733333-105.6 185.6-93.866666-40.533333a78.08 78.08 0 0 1-13.866667 10.666666c-5.674667 3.541333-11.008 6.4-16 8.533334l-12.8 100.266666h-213.333333m106.666666-213.333333c35.541333 0 65.792-12.458667 90.666667-37.333333A123.434667 123.434667 0 0 0 567.381333 640c0-35.541333-12.458667-65.792-37.333333-90.666667A123.434667 123.434667 0 0 0 439.381333 512c-35.541333 0-65.792 12.458667-90.666666 37.333333A123.434667 123.434667 0 0 0 311.381333 640c0 35.541333 12.458667 65.792 37.333334 90.666667a123.434667 123.434667 0 0 0 90.666666 37.333333m-32 128h64l8.533334-76.8a206.848 206.848 0 0 0 52.821333-21.845333c14.549333-8.917333 28.970667-20.821333 43.178667-35.754667l70.4 32 29.866666-53.333333-61.866666-46.933334c5.674667-16.341333 8.533333-34.133333 8.533333-53.333333 0-19.2-2.858667-36.992-8.533333-53.333333l61.866666-46.933334-29.866666-53.333333-70.4 32c-14.208-14.933333-28.586667-26.88-43.178667-35.754667a206.848 206.848 0 0 0-52.821333-21.845333l-8.533334-76.8h-64l-8.533333 76.8a206.933333 206.933333 0 0 0-52.778667 21.845333c-14.592 8.917333-29.013333 20.821333-43.221333 35.754667l-70.4-32-29.866667 53.333333 61.866667 46.933334A171.093333 171.093333 0 0 0 255.402667 640c-0.384 19.2 2.645333 36.992 9.045333 53.333333l-61.866667 46.933334 29.866667 53.333333 70.4-32c14.208 14.933333 28.586667 26.88 43.221333 35.712 14.549333 8.917333 32.170667 16.213333 52.778667 21.888l8.533333 76.8m32-256" />
      </g>
    </svg>
  );
};

export default KgServicesIcon;
