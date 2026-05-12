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

const KgMedalIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgMedalIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgMedalIcon)` : undefined}>
        <path d="M512 962.56c-169.65632 0-307.2-137.54368-307.2-307.2 0-169.65632 137.54368-307.2 307.2-307.2 169.65632 0 307.2 137.54368 307.2 307.2 0 169.65632-137.54368 307.2-307.2 307.2z m0-209.16224l67.72736 60.06784a21.95456 21.95456 0 0 0 36.33152-19.51744l-14.37696-103.2192 65.41312-49.43872a22.016 22.016 0 0 0-8.9088-39.13728l-86.20032-17.34656-40.30464-81.1008a21.99552 21.99552 0 0 0-39.36256 0l-40.30464 81.1008-86.2208 17.34656a22.03648 22.03648 0 0 0-8.9088 39.13728l65.4336 49.43872-19.12832 102.4a21.95456 21.95456 0 0 0 35.6352 20.992L512 753.41824z m-75.65312-462.29504c-21.34016 3.29728-39.5264 7.43424-54.4768 12.3904-25.14944 8.33536-52.51072 19.7632-82.1248 34.304a40.96 40.96 0 0 1-56.9344-23.9616L187.55584 146.20672a65.06496 65.06496 0 0 1 6.41024-54.4768A63.42656 63.42656 0 0 1 245.76 61.46048L430.08 61.44a40.96 40.96 0 0 1 40.96 40.96v148.19328a40.96 40.96 0 0 1-34.69312 40.48896z m151.30624-0.02048A40.96 40.96 0 0 1 552.96 250.59328V102.4a40.96 40.96 0 0 1 40.96-40.96l184.32 0.02048c20.41856 0.73728 40.1408 11.38688 51.77344 30.22848 10.05568 16.30208 12.41088 36.27008 6.41024 54.49728l-55.21408 167.6288a40.96 40.96 0 0 1-56.95488 23.9616c-29.61408-14.5408-56.97536-25.96864-82.1248-34.304-14.9504-4.95616-33.11616-9.09312-54.4768-12.3904z" />
      </g>
    </svg>
  );
};

export default KgMedalIcon;
