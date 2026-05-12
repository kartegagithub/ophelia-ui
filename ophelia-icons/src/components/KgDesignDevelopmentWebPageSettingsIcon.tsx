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

const KgDesignDevelopmentWebPageSettingsIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentWebPageSettingsIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentWebPageSettingsIcon)` : undefined}>
        <path d="M512 528m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" /><path d="M352 768m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" /><path d="M672 608m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" /><path d="M16 96h992v128H16z" /><path d="M1008 832H757.76a16 16 0 1 1 0-32H992V64H32v736h202.24a16 16 0 1 1 0 32H16a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h992a16 16 0 0 1 16 16v768a16 16 0 0 1-16 16z" /><path d="M1008 192H16a16 16 0 1 1 0-32h992a16 16 0 1 1 0 32zM816 128c-4.16 0-8.32-1.6-11.36-4.64A16.8 16.8 0 0 1 800 112c0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM880 128c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0.16 2.88 2.88 4.64 7.04 4.64 11.2 0 4.32-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM944 128c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64z" /><path d="M752 192a16 16 0 0 1-16-16V48a16 16 0 1 1 32 0v128a16 16 0 0 1-16 16zM512 560c-44.112 0-80-35.888-80-80s35.888-80 80-80 80 35.888 80 80-35.888 80-80 80z m0-128c-26.464 0-48 21.536-48 48s21.536 48 48 48 48-21.536 48-48-21.536-48-48-48z" /><path d="M544 440.64a16 16 0 0 1-16-16V368a15.36 15.36 0 0 0-4.592-11.088A15.632 15.632 0 0 0 512 352a16 16 0 0 0-16 16v56.64a16 16 0 1 1-32 0V368c0-26.464 21.536-48 48-48a47.04 47.04 0 0 1 34.032 14.288c8.912 8.64 13.968 20.72 13.968 33.712v56.64a16 16 0 0 1-16 16zM512 992c-26.464 0-48-21.536-48-48V535.36a16 16 0 1 1 32 0V944a16 16 0 0 0 32 0V535.36a16 16 0 1 1 32 0V944c0 26.464-21.536 48-48 48zM352 992c-26.464 0-48-21.536-48-48v-72.64a16 16 0 1 1 32 0V944a16 16 0 0 0 32 0v-72.64a16 16 0 1 1 32 0V944c0 26.464-21.536 48-48 48zM384 776.64a16 16 0 0 1-16-16V368a15.36 15.36 0 0 0-4.592-11.088A15.632 15.632 0 0 0 352 352a16 16 0 0 0-16 16v392.64a16 16 0 1 1-32 0V368c0-26.464 21.536-48 48-48a47.04 47.04 0 0 1 34.032 14.288c8.912 8.64 13.968 20.72 13.968 33.712v392.64a16 16 0 0 1-16 16zM704 616.64a16 16 0 0 1-16-16V368a15.36 15.36 0 0 0-4.592-11.088A15.632 15.632 0 0 0 672 352a16 16 0 0 0-16 16v232.64a16 16 0 1 1-32 0V368c0-26.464 21.536-48 48-48a47.04 47.04 0 0 1 34.032 14.288c8.912 8.64 13.968 20.72 13.968 33.712v232.64a16 16 0 0 1-16 16zM672 992c-26.464 0-48-21.536-48-48V711.36a16 16 0 1 1 32 0V944a16 16 0 0 0 32 0V711.36a16 16 0 1 1 32 0V944c0 26.464-21.536 48-48 48z" /><path d="M352 896c-44.112 0-80-35.888-80-80s35.888-80 80-80 80 35.888 80 80-35.888 80-80 80z m0-128c-26.464 0-48 21.536-48 48s21.536 48 48 48 48-21.536 48-48-21.536-48-48-48zM672 736c-44.112 0-80-35.888-80-80s35.888-80 80-80 80 35.888 80 80-35.888 80-80 80z m0-128c-26.464 0-48 21.536-48 48s21.536 48 48 48 48-21.536 48-48-21.536-48-48-48z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentWebPageSettingsIcon;
