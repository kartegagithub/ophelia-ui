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

const KgDesignDevelopmentCommunitySolutionIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentCommunitySolutionIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentCommunitySolutionIcon)` : undefined}>
        <path d="M512 160m-96 0a96 96 0 1 0 192 0 96 96 0 1 0-192 0Z" /><path d="M512 864m-96 0a96 96 0 1 0 192 0 96 96 0 1 0-192 0Z" /><path d="M864 512m-96 0a96 96 0 1 0 192 0 96 96 0 1 0-192 0Z" /><path d="M160 512m-96 0a96 96 0 1 0 192 0 96 96 0 1 0-192 0Z" /><path d="M512 224c-61.76 0-112-50.24-112-112s50.24-112 112-112 112 50.24 112 112-50.24 112-112 112z m0-192c-44.112 0-80 35.888-80 80s35.888 80 80 80 80-35.888 80-80-35.888-80-80-80zM512 1024c-61.76 0-112-50.24-112-112s50.24-112 112-112 112 50.24 112 112-50.24 112-112 112z m0-192c-44.112 0-80 35.888-80 80s35.888 80 80 80 80-35.888 80-80-35.888-80-80-80zM912 624c-61.76 0-112-50.24-112-112s50.24-112 112-112 112 50.24 112 112-50.24 112-112 112z m0-192c-44.112 0-80 35.888-80 80s35.888 80 80 80 80-35.888 80-80-35.888-80-80-80zM112 624c-61.76 0-112-50.24-112-112s50.24-112 112-112 112 50.24 112 112-50.24 112-112 112z m0-192c-44.112 0-80 35.888-80 80s35.888 80 80 80 80-35.888 80-80-35.888-80-80-80z" /><path d="M123.536 432.8a16 16 0 0 1-15.568-19.776A413.632 413.632 0 0 1 413.024 107.952a16 16 0 1 1 7.584 31.088A381.728 381.728 0 0 0 139.072 420.576a16 16 0 0 1-15.52 12.224zM607.2 916.48a16 16 0 0 1-3.792-31.536 381.728 381.728 0 0 0 281.52-281.52 16 16 0 1 1 31.088 7.568 413.632 413.632 0 0 1-305.024 305.04 15.92 15.92 0 0 1-3.808 0.448zM416.8 916.48a15.92 15.92 0 0 1-3.792-0.448A413.632 413.632 0 0 1 107.984 610.992a16 16 0 1 1 31.088-7.568 381.728 381.728 0 0 0 281.52 281.52 16 16 0 0 1-3.776 31.536zM900.464 432.8a16 16 0 0 1-15.52-12.224A381.728 381.728 0 0 0 603.392 139.056a16 16 0 1 1 7.584-31.088 413.632 413.632 0 0 1 305.024 305.04 16 16 0 0 1-15.552 19.792zM512 336c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM704 528c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM320 528c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM647.84 392.32a15.68 15.68 0 0 1-11.36-4.8c-3.04-3.04-4.8-7.2-4.8-11.2a16 16 0 0 1 4.8-11.36c5.92-6.08 16.64-6.08 22.56 0 3.04 2.88 4.8 7.04 4.8 11.36 0 4.16-1.76 8.16-4.8 11.2-3.04 3.04-7.04 4.8-11.2 4.8zM376.32 663.84a15.68 15.68 0 0 1-11.36-4.8 15.408 15.408 0 0 1-4.64-11.2c0-4.32 1.6-8.48 4.64-11.36 5.76-5.92 16.64-6.08 22.56 0 3.04 2.88 4.64 7.04 4.64 11.36 0 4.16-1.6 8.32-4.64 11.2-3.04 3.04-7.04 4.8-11.2 4.8zM647.84 663.84c-4.32 0-8.32-1.76-11.36-4.8a15.44 15.44 0 0 1-4.64-11.2c0-4.32 1.6-8.48 4.64-11.36 5.92-5.92 16.64-6.08 22.56 0a15.68 15.68 0 0 1 0 22.56c-3.04 3.04-7.04 4.8-11.2 4.8zM376.32 392.32a15.68 15.68 0 0 1-11.36-4.8 15.584 15.584 0 0 1-4.8-11.2c0-4.32 1.76-8.48 4.8-11.36 5.92-5.92 16.64-6.08 22.56 0 3.04 2.88 4.8 7.04 4.8 11.36 0 4.16-1.76 8.16-4.8 11.2-3.04 3.04-7.04 4.8-11.2 4.8zM585.44 350.56c-4.16 0-8.32-1.6-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36 0-4.16 1.76-8.32 4.64-11.2 5.92-6.08 16.8-6.08 22.72 0 3.04 2.88 4.64 7.04 4.64 11.2a15.856 15.856 0 0 1-16 16zM609.92 291.52c-4.16 0-8.32-1.76-11.2-4.8a15.632 15.632 0 0 1 0-22.56c5.76-5.92 16.48-5.92 22.56 0 3.04 3.04 4.64 7.04 4.64 11.36 0 4.16-1.6 8.32-4.64 11.2-3.04 3.04-7.2 4.8-11.36 4.8zM689.44 601.44c-4.32 0-8.32-1.76-11.36-4.64-3.04-3.04-4.64-7.2-4.64-11.36s1.6-8.32 4.64-11.2c5.92-6.08 16.8-6.08 22.56-0.16 3.04 3.04 4.8 7.2 4.8 11.36s-1.76 8.32-4.8 11.36c-2.88 2.88-7.04 4.64-11.2 4.64zM748.48 625.92a15.52 15.52 0 0 1-11.2-4.64 15.744 15.744 0 0 1-4.8-11.36c0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.8-5.92 22.72 0 3.04 3.04 4.64 7.2 4.64 11.36 0 4.32-1.6 8.48-4.64 11.36-3.04 3.04-7.2 4.64-11.36 4.64zM275.52 430.08c-4.16 0-8.32-1.76-11.36-4.8a15.52 15.52 0 0 1-4.64-11.2c0-4.32 1.6-8.48 4.64-11.36 5.92-5.92 16.64-6.08 22.56 0 3.04 2.88 4.8 7.04 4.8 11.36a16.16 16.16 0 0 1-16 16zM334.56 454.56c-4.16 0-8.32-1.76-11.2-4.8a15.6 15.6 0 0 1-4.8-11.2c0-4.16 1.76-8.32 4.8-11.36 5.92-5.92 16.64-5.92 22.56 0a15.568 15.568 0 0 1 0 22.56c-3.04 3.04-7.04 4.8-11.36 4.8zM689.44 454.56c-4.32 0-8.32-1.76-11.36-4.8a16.08 16.08 0 0 1 0-22.56c5.92-5.92 16.64-5.92 22.56 0 3.04 3.04 4.8 7.2 4.8 11.36 0 4.16-1.76 8.32-4.8 11.2-2.88 3.04-7.04 4.8-11.2 4.8zM748.48 430.08c-4.16 0-8.32-1.76-11.36-4.8-2.88-3.04-4.64-7.04-4.64-11.2s1.76-8.32 4.64-11.36c6.08-6.08 16.8-5.92 22.72 0 2.88 2.88 4.64 7.04 4.64 11.36a16.16 16.16 0 0 1-16 16zM275.52 625.92c-4.16 0-8.32-1.6-11.36-4.64-2.88-2.88-4.64-7.04-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.76 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.32-1.76 8.32-4.64 11.36-3.04 3.04-7.2 4.64-11.36 4.64zM334.56 601.44a16.16 16.16 0 0 1-16-16c0-4.16 1.76-8.32 4.8-11.36 5.76-5.92 16.64-5.92 22.56 0 3.04 3.04 4.64 7.2 4.64 11.36s-1.6 8.32-4.64 11.36c-3.04 2.88-7.04 4.64-11.36 4.64zM414.08 291.52c-4.32 0-8.32-1.76-11.36-4.8a15.488 15.488 0 0 1-4.64-11.2c0-4.32 1.6-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.56 0a15.6 15.6 0 0 1 0 22.56c-2.88 3.04-7.04 4.8-11.2 4.8zM438.56 350.56a15.872 15.872 0 0 1-16-16c0-4.16 1.6-8.32 4.64-11.2 5.92-5.92 16.64-6.08 22.56 0a15.6 15.6 0 0 1 0 22.56 15.52 15.52 0 0 1-11.2 4.64zM560 688h-96a16 16 0 0 1-16-16v-31.04A143.36 143.36 0 0 1 368 512c0-79.408 64.608-144 144-144s144 64.592 144 144a143.36 143.36 0 0 1-80 128.96V672a16 16 0 0 1-16 16z m-80-32h64v-25.392a16 16 0 0 1 10-14.832A111.552 111.552 0 0 0 624 512c0-61.76-50.24-112-112-112s-112 50.24-112 112a111.552 111.552 0 0 0 70 103.776 16 16 0 0 1 10 14.832V656zM560 752h-96a16 16 0 1 1 0-32h96a16 16 0 1 1 0 32z" /><path d="M512 688a16 16 0 0 1-16-16v-112a16 16 0 1 1 32 0v112a16 16 0 0 1-16 16z" /><path d="M512 576a15.936 15.936 0 0 1-8.88-2.688l-48-32a16 16 0 0 1 17.76-26.624L512 540.768l39.12-26.08a16 16 0 1 1 17.76 26.624l-48 32A15.936 15.936 0 0 1 512 576z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentCommunitySolutionIcon;
