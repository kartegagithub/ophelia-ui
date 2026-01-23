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

const WebinarIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-WebinarIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-WebinarIcon)` : undefined}>
         <path d="M8.70005 18.5996H15.3C15.9 18.5996 16.2 18.8996 16.2 19.4996C16.2 20.0996 15.9 20.3996 15.3 20.3996H8.70005C8.10005 20.3996 7.80005 20.0996 7.80005 19.4996C7.80005 18.8996 8.10005 18.5996 8.70005 18.5996Z"/> <path d="M20.3999 3.59961C20.7182 3.59961 21.0234 3.72604 21.2484 3.95108C21.4735 4.17612 21.5999 4.48135 21.5999 4.79961V16.7996C21.5999 17.1179 21.4735 17.4231 21.2484 17.6481C21.0234 17.8732 20.7182 17.9996 20.3999 17.9996H3.5999C3.28164 17.9996 2.97642 17.8732 2.75137 17.6481C2.52633 17.4231 2.3999 17.1179 2.3999 16.7996V4.79961C2.3999 4.48135 2.52633 4.17612 2.75137 3.95108C2.97642 3.72604 3.28164 3.59961 3.5999 3.59961H20.3999ZM19.7999 5.39961H4.1999V16.1996H19.7999V5.39961Z"/> <path d="M11.9999 7.2002C12.4773 7.2002 12.9351 7.38984 13.2727 7.7274C13.6103 8.06497 13.7999 8.52281 13.7999 9.0002C13.7999 9.47758 13.6103 9.93542 13.2727 10.273C12.9351 10.6106 12.4773 10.8002 11.9999 10.8002C11.5225 10.8002 11.0647 10.6106 10.7271 10.273C10.3895 9.93542 10.1999 9.47758 10.1999 9.0002C10.1999 8.52281 10.3895 8.06497 10.7271 7.7274C11.0647 7.38984 11.5225 7.2002 11.9999 7.2002ZM12.4403 11.4002C13.6679 11.4002 13.9559 11.4206 14.3663 11.5994C14.7803 11.7794 15.1223 12.0734 15.3407 12.443C15.5747 12.8354 15.5999 13.1006 15.5999 14.195V14.4002C15.5999 14.5593 15.5367 14.7119 15.4242 14.8245C15.3116 14.937 15.159 15.0002 14.9999 15.0002H8.9999C8.84077 15.0002 8.68816 14.937 8.57564 14.8245C8.46312 14.7119 8.3999 14.5593 8.3999 14.4002V14.195C8.3999 13.1006 8.4251 12.8354 8.6591 12.443C8.8775 12.0734 9.2195 11.7806 9.6335 11.5994C10.0439 11.4194 10.3319 11.4002 11.5595 11.4002H12.4403Z"/> 
      </g>
    </svg>
  );
};

export default WebinarIcon;
