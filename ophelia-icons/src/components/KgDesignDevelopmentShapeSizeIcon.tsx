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

const KgDesignDevelopmentShapeSizeIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentShapeSizeIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentShapeSizeIcon)` : undefined}>
        <path d="M64 64h128v128H64zM832 64h128v128h-128zM64 832h128v128H64zM832 832h128v128h-128z" /><path d="M144 160H16a16 16 0 0 1-16-16V16a16 16 0 0 1 16-16h128a16 16 0 0 1 16 16v128a16 16 0 0 1-16 16zM32 128h96V32H32v96zM1008 160h-128a16 16 0 0 1-16-16V16a16 16 0 0 1 16-16h128a16 16 0 0 1 16 16v128a16 16 0 0 1-16 16z m-112-32h96V32h-96v96zM144 1024H16a16 16 0 0 1-16-16v-128a16 16 0 0 1 16-16h128a16 16 0 0 1 16 16v128a16 16 0 0 1-16 16z m-112-32h96v-96H32v96zM1008 1024h-128a16 16 0 0 1-16-16v-128a16 16 0 0 1 16-16h128a16 16 0 0 1 16 16v128a16 16 0 0 1-16 16z m-112-32h96v-96h-96v96zM80 256a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM80 352a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM80 448a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM80 544a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM80 640a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM80 736a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM80 832a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM944 256a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM944 352a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM944 448a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM944 544a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM944 640a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM944 736a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM944 832a16 16 0 0 1-16-16v-32a16 16 0 1 1 32 0v32a16 16 0 0 1-16 16zM816 96h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM720 96h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM624 96h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM528 96h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM432 96h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM336 96h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM240 96h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM816 960h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM720 960h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM624 960h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM528 960h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM432 960h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM336 960h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM240 960h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM336 704a16 16 0 0 1-11.312-27.312l352-352a16 16 0 1 1 22.624 22.624l-352 352A15.952 15.952 0 0 1 336 704z" /><path d="M689.328 448a16 16 0 0 1-16-16v-80h-80a16 16 0 1 1 0-32h96a16 16 0 0 1 16 16v96a16 16 0 0 1-16 16zM432 704h-96a16 16 0 0 1-16-16v-96a16 16 0 1 1 32 0v80h80a16 16 0 1 1 0 32zM688.672 704.656a15.952 15.952 0 0 1-11.312-4.672l-352-352a16 16 0 1 1 22.624-22.64l352 352a16 16 0 0 1-11.312 27.312z" /><path d="M336.672 447.344a16 16 0 0 1-16-16v-96a16 16 0 0 1 16-16h96a16 16 0 1 1 0 32h-80v80a16 16 0 0 1-16 16zM688.672 704.656h-96a16 16 0 1 1 0-32h80v-80a16 16 0 1 1 32 0v96a16 16 0 0 1-16 16zM512 608c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM512 672c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM512 736c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM512 800c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM512 256c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM512 320c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM512 384c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM512 448c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM432 528c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM368 528c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.64-5.92 22.56 0 3.04 3.04 4.8 7.2 4.8 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM304 528c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM240 528c-4.32 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM784 528c-4.16 0-8.32-1.6-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 3.04-7.2 4.64-11.36 4.64zM720 528c-4.32 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.04 4.64-11.36 4.64zM656 528c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.56 0 3.04 3.04 4.8 7.2 4.8 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM592 528c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentShapeSizeIcon;
