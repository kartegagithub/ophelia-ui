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

const KgEnglishFlagIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgEnglishFlagIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgEnglishFlagIcon)` : undefined}>
        <path d="M682.666667 716.8l228.352 116.053333a513.024 513.024 0 0 1-228.317867 161.9968L682.666667 716.8zM331.6736 716.8v274.5344a513.262933 513.262933 0 0 1-221.525333-161.9968L331.707733 716.8zM914.773333 195.857067L682.666667 317.8496l0.034133-288.699733A513.092267 513.092267 0 0 1 914.773333 195.857067zM338.773333 30.037333v287.812267L108.475733 196.8128A513.160533 513.160533 0 0 1 338.773333 30.037333z" /><path d="M512 0c35.089067 0 69.290667 3.515733 102.4 10.24V409.6h399.36c6.724267 33.109333 10.24 67.345067 10.24 102.4 0 35.089067-3.515733 69.290667-10.24 102.4H614.4v399.36c-33.109333 6.724267-67.310933 10.24-102.4 10.24-35.054933 0-69.290667-3.515733-102.4-10.24V614.4H10.24C3.515733 581.290667 0 547.054933 0 512c0-35.089067 3.515733-69.290667 10.24-102.4l399.36-0.034133V10.205867C442.709333 3.549867 476.9792 0 512 0zM307.473067 682.666667l-219.2384 116.804266a511.556267 511.556267 0 0 1-35.498667-60.928L156.091733 682.666667h151.381334z m560.4352 0l103.355733 55.9104c-10.4448 21.162667-22.357333 41.506133-35.498667 60.893866L716.526933 682.666667h151.381334z m68.608-457.0112c13.1072 19.421867 24.917333 39.765333 35.328 60.962133l-103.936 56.2176h-151.381334l219.989334-117.179733z m-849.032534 0l219.989334 117.179733H156.091733L52.1216 286.651733c10.410667-21.1968 22.254933-41.5744 35.362133-60.996266z" />
      </g>
    </svg>
  );
};

export default KgEnglishFlagIcon;
