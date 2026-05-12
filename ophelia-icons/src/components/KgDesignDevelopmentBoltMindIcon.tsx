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

const KgDesignDevelopmentBoltMindIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentBoltMindIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentBoltMindIcon)` : undefined}>
        <path d="M831.936 400h-170.4l90.4-176h-128l-80 272h128l-16 160zM560 352H357.6L448 112H288l-80 336h160l-16 256z" /><path d="M448 624a16 16 0 0 1-15.968-17.008L446.976 368H304a16.032 16.032 0 0 1-15.568-19.696l80-336A16 16 0 0 1 384 0h160a16 16 0 0 1 14.976 21.648L476.72 240h91.76a16 16 0 1 1 0 32h-114.88a16 16 0 0 1-14.976-21.648L520.864 32H396.64l-72.384 304H464a15.968 15.968 0 0 1 15.968 17.008l-11.84 189.488 60.64-102.64c4.528-7.568 14.32-10.08 21.936-5.632 7.616 4.48 10.128 14.304 5.648 21.92l-94.56 160A16 16 0 0 1 448 624z" /><path d="M623.936 624a16 16 0 0 1-15.92-17.6l14.24-142.4h-110.32a15.968 15.968 0 0 1-15.344-20.512l80-272a16 16 0 0 1 15.36-11.488h128a16 16 0 0 1 14.224 23.312L655.744 336h144.192a16 16 0 0 1 13.184 25.056l-176 256a16 16 0 0 1-13.184 6.944z m-90.608-192h106.608a15.968 15.968 0 0 1 15.92 17.6l-9.792 97.984L769.52 368h-139.968a16 16 0 0 1-14.24-23.312L693.728 192h-89.824l-70.576 240z" /><path d="M751.84 1024H336a16 16 0 0 1-16-16v-111.84c0-23.28-10-48.16-38.08-48.16h-31.52C192.64 848 128 800.112 128 736v-144H79.52a47.088 47.088 0 0 1-40-22.16 47.968 47.968 0 0 1-2.752-46.496l125.056-265.84c18.464-38.912 38.32-70.992 60.72-98.096a458.848 458.848 0 0 1 84.272-78.96 16 16 0 0 1 18.688 25.968 426.72 426.72 0 0 0-78.336 73.408c-20.64 25.008-39.12 54.88-56.4 91.36L65.68 537.024c-3.52 7.36-0.544 13.44 0.896 15.728A15.2 15.2 0 0 0 79.52 560H144a16 16 0 0 1 16 16v160c0 45.04 48.592 80 90.4 80h31.52C323.2 816 352 848.96 352 896.16V992h384.208c4.128-93.008 44-186 110.832-257.344 83.584-89.216 123.808-211.152 110.336-334.512-12.8-116.768-78.144-226.96-174.72-294.736a403.584 403.584 0 0 0-189.872-70.928 16.016 16.016 0 0 1-14.304-17.536 16.224 16.224 0 0 1 17.552-14.304c73.28 7.504 144.16 33.984 204.976 76.56 104.032 73.008 174.368 191.68 188.176 317.456 14.48 132.672-28.832 263.84-118.8 359.872C805.216 826.112 767.84 917.76 767.84 1008a16 16 0 0 1-16 16z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentBoltMindIcon;
