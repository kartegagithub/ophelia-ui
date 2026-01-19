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

const AheadSecond15Icon: React.FC<IconProps> = ({
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
      viewBox="0 0 24 24"
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
          <linearGradient id="duotone-AheadSecond15Icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-AheadSecond15Icon)` : undefined}>
         <g clipPath="url(#clip0_3616_1007)"> <path d="M15.36 0.0834389V2.325L11.52 0.133126V2.89219C6.18091 3.14327 1.92004 7.55944 1.92004 12.96C1.92004 18.5215 6.43857 23.04 12 23.04C17.5615 23.04 22.08 18.5215 22.08 12.96C22.0809 12.8964 22.0692 12.8332 22.0455 12.7742C22.0218 12.7152 21.9865 12.6615 21.9419 12.6162C21.8972 12.5709 21.844 12.5349 21.7853 12.5104C21.7266 12.4858 21.6637 12.4732 21.6 12.4732C21.5364 12.4732 21.4735 12.4858 21.4148 12.5104C21.3561 12.5349 21.3029 12.5709 21.2582 12.6162C21.2135 12.6615 21.1783 12.7152 21.1546 12.7742C21.1309 12.8332 21.1191 12.8964 21.12 12.96C21.12 18.0027 17.0427 22.08 12 22.08C6.95736 22.08 2.88004 18.0027 2.88004 12.96C2.88004 8.07934 6.70253 4.11485 11.52 3.86438V6.58688L15.36 4.395V6.63656L16.0988 6.16406L20.4854 3.36L15.36 0.0834389ZM12.48 1.78688L15.2363 3.36L12.48 4.93313V3.44063C12.4886 3.38879 12.4886 3.3359 12.48 3.28406V1.78688ZM16.32 1.83656L18.7041 3.36L16.32 4.88344V3.97875V2.74125V1.83656ZM9.12004 9.6C9.12004 10.68 8.16004 11.04 7.20004 11.04V12H9.12004V17.28H9.16786H10.08V9.6H9.12004ZM12.12 9.6L11.595 13.1288L12.4275 13.5206C12.7463 13.1649 13.2029 12.96 13.68 12.96C14.6064 12.96 15.36 13.7136 15.36 14.64C15.36 15.5664 14.6064 16.32 13.68 16.32C12.734 16.32 12 15.5462 12 14.88H11.04C11.04 16.1582 12.2736 17.28 13.68 17.28C15.1359 17.28 16.32 16.0954 16.32 14.64C16.32 13.1846 15.1359 12 13.68 12C13.344 12 13.015 12.0642 12.7088 12.1856L12.9535 10.56H15.84V9.6H12.12Z"/> </g> <defs> <clipPath id="AheadSecond15Icon-clip0_3616_1007"> <rect width="24" height="24"/> </clipPath> </defs> 
      </g>
    </svg>
  );
};

export default AheadSecond15Icon;
