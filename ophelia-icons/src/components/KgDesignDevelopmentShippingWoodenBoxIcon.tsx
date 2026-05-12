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

const KgDesignDevelopmentShippingWoodenBoxIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentShippingWoodenBoxIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentShippingWoodenBoxIcon)` : undefined}>
        <path d="M16 96h992v128H16zM16 816h992v128H16z" /><path d="M1008 176H16a16 16 0 0 1-16-16V32a16 16 0 0 1 16-16h992a16 16 0 0 1 16 16v128a16 16 0 0 1-16 16zM32 144h960V48H32v96zM1008 1008H16a16 16 0 0 1-16-16v-128a16 16 0 0 1 16-16h992a16 16 0 0 1 16 16v128a16 16 0 0 1-16 16zM32 976h960v-96H32v96zM976 352H784a16 16 0 1 1 0-32h192a16 16 0 1 1 0 32zM240 352H48a16 16 0 1 1 0-32h192a16 16 0 1 1 0 32zM624 352H400a16 16 0 1 1 0-32h224a16 16 0 1 1 0 32zM976 528H592a16 16 0 1 1 0-32h384a16 16 0 1 1 0 32zM432 528H48a16 16 0 1 1 0-32h384a16 16 0 1 1 0 32zM624 704H400a16 16 0 1 1 0-32h224a16 16 0 1 1 0 32zM976 704H784a16 16 0 1 1 0-32h192a16 16 0 1 1 0 32zM240 704H48a16 16 0 1 1 0-32h192a16 16 0 1 1 0 32z" /><path d="M48 880a16 16 0 0 1-16-16V160a16 16 0 1 1 32 0v704a16 16 0 0 1-16 16zM976 880a16 16 0 0 1-16-16V160a16 16 0 1 1 32 0v704a16 16 0 0 1-16 16zM816 880a15.984 15.984 0 0 1-10.816-4.208l-304-278.72a16 16 0 0 1 21.632-23.584l304 278.72A16 16 0 0 1 816 880z" /><path d="M432 528a15.984 15.984 0 0 1-10.816-4.208l-384-352a16 16 0 0 1 21.632-23.584l384 352A16 16 0 0 1 432 528zM976 880a15.984 15.984 0 0 1-10.816-4.208l-384-352a16 16 0 0 1 21.632-23.584l384 352A16 16 0 0 1 976 880zM512 454.72a15.92 15.92 0 0 1-10.816-4.208l-304-278.72a16 16 0 0 1 21.632-23.584l304 278.72A16 16 0 0 1 512 454.72z" /><path d="M208 880a15.968 15.968 0 0 1-10.816-27.792l768-704a16 16 0 0 1 21.632 23.584l-768 704A15.984 15.984 0 0 1 208 880zM48 880a15.968 15.968 0 0 1-10.816-27.792l768-704a16 16 0 0 1 21.632 23.584l-768 704A15.984 15.984 0 0 1 48 880zM80 112c-4.16 0-8.32-1.76-11.36-4.64C65.76 104.32 64 100.32 64 96c0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.32-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM144 112c-4.16 0-8.32-1.76-11.36-4.64C129.76 104.32 128 100.32 128 96c0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36C152.32 110.24 148.16 112 144 112zM880 112c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM944 112c-4.32 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.32-1.76 8.32-4.64 11.36-3.04 2.88-7.04 4.64-11.36 4.64zM880 944c-4.16 0-8.32-1.76-11.36-4.64A16.8 16.8 0 0 1 864 928c0-4.32 1.76-8.32 4.64-11.36 6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM944 944c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM80 944c-4.16 0-8.32-1.76-11.36-4.64C65.6 936.32 64 932.16 64 928s1.6-8.32 4.64-11.36c6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM144 944c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM640 800c-4.32 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM576 800h-64a16 16 0 1 1 0-32h64a16 16 0 1 1 0 32z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentShippingWoodenBoxIcon;
