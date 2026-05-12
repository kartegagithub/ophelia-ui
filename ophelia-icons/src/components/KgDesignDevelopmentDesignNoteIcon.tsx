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

const KgDesignDevelopmentDesignNoteIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentDesignNoteIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentDesignNoteIcon)` : undefined}>
        <path d="M112 256h224v224H112z" /><path d="M464 624m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" /><path d="M720 1024H16a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h704a16 16 0 0 1 16 16v960a16 16 0 0 1-16 16zM32 992h672V64H32v928z" /><path d="M80 96a16 16 0 0 1-16-16V16a16 16 0 1 1 32 0v64a16 16 0 0 1-16 16zM144 96a16 16 0 0 1-16-16V16a16 16 0 1 1 32 0v64a16 16 0 0 1-16 16zM208 96a16 16 0 0 1-16-16V16a16 16 0 1 1 32 0v64a16 16 0 0 1-16 16zM272 96a16 16 0 0 1-16-16V16a16 16 0 1 1 32 0v64a16 16 0 0 1-16 16zM336 96a16 16 0 0 1-16-16V16a16 16 0 1 1 32 0v64a16 16 0 0 1-16 16zM400 96a16 16 0 0 1-16-16V16a16 16 0 1 1 32 0v64a16 16 0 0 1-16 16zM464 96a16 16 0 0 1-16-16V16a16 16 0 1 1 32 0v64a16 16 0 0 1-16 16zM528 96a16 16 0 0 1-16-16V16a16 16 0 1 1 32 0v64a16 16 0 0 1-16 16zM592 96a16 16 0 0 1-16-16V16a16 16 0 1 1 32 0v64a16 16 0 0 1-16 16zM656 96a16 16 0 0 1-16-16V16a16 16 0 1 1 32 0v64a16 16 0 0 1-16 16zM720 192H16a16 16 0 1 1 0-32h704a16 16 0 1 1 0 32zM400 544H176a16 16 0 0 1-16-16V304a16 16 0 0 1 16-16h224a16 16 0 0 1 16 16v224a16 16 0 0 1-16 16z m-208-32h192V320H192v192z" /><path d="M432 704c-79.392 0-144-64.592-144-144s64.608-144 144-144 144 64.592 144 144-64.608 144-144 144z m0-256c-61.76 0-112 50.24-112 112s50.24 112 112 112 112-50.24 112-112-50.24-112-112-112zM112 960c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM112 896c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM112 832c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM176 960c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM176 896c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM240 960c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM240 896c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.76 16.64-5.92 22.72 0 3.04 3.04 4.64 7.2 4.64 11.36s-1.6 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM240 832c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM304 960c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM304 896c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM368 960c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM368 896c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM368 832c-4.32 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c5.76-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM432 960c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM432 896c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM496 960c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM496 896c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM496 832c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM560 960c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM560 896c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM624 960c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM624 896c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM624 832c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM1008 1024H816a16 16 0 0 1-16-16V176a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16v832a16 16 0 0 1-16 16z m-176-32h160V192H832v800z" /><path d="M1008 288h-48a16 16 0 1 1 0-32h48a16 16 0 1 1 0 32zM1008 368h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM1008 448h-48a16 16 0 1 1 0-32h48a16 16 0 1 1 0 32zM1008 528h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM1008 608h-48a16 16 0 1 1 0-32h48a16 16 0 1 1 0 32zM1008 688h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM1008 768h-48a16 16 0 1 1 0-32h48a16 16 0 1 1 0 32zM1008 848h-32a16 16 0 1 1 0-32h32a16 16 0 1 1 0 32zM1008 928h-48a16 16 0 1 1 0-32h48a16 16 0 1 1 0 32z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentDesignNoteIcon;
