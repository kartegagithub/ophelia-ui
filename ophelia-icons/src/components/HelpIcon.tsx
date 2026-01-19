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

const HelpIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-HelpIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-HelpIcon)` : undefined}>
         <path d="M12 0.959999C5.90842 0.959999 0.959961 5.90846 0.959961 12C0.959961 18.0915 5.90842 23.04 12 23.04C18.0915 23.04 23.04 18.0915 23.04 12C23.04 5.90846 18.0915 0.959999 12 0.959999ZM12 1.92C17.5727 1.92 22.08 6.42728 22.08 12C22.08 17.5727 17.5727 22.08 12 22.08C6.42725 22.08 1.91996 17.5727 1.91996 12C1.91996 6.42728 6.42725 1.92 12 1.92ZM12.1387 6.00375C10.3483 6.00375 9.16118 7.08861 8.90246 8.74125C8.88566 8.84493 8.93659 8.91334 9.04027 8.93062L10.125 9.12094C10.2286 9.13822 10.2971 9.08632 10.3143 8.98312C10.5207 7.93288 11.1402 7.34719 12.104 7.34719C13.0856 7.34719 13.7737 7.96732 13.7737 8.94844C13.7737 9.53404 13.5675 9.92986 12.9656 10.7559L11.8115 12.3394C11.4501 12.8391 11.2959 13.2007 11.2959 13.89V14.595C11.2959 14.6982 11.3643 14.7675 11.4675 14.7656H12.6037C12.7069 14.7656 12.7753 14.6973 12.7753 14.5941V14.0437C12.7753 13.4586 12.8792 13.2175 13.2234 12.7528L14.3765 11.1684C14.9621 10.3592 15.254 9.75718 15.254 8.93062C15.254 7.22614 13.9973 6.00375 12.1387 6.00375ZM11.3821 16.0762C11.2785 16.0762 11.2096 16.1455 11.2096 16.2487V17.7291C11.2096 17.8323 11.278 17.9006 11.3821 17.9006H12.6909C12.7936 17.9006 12.8625 17.8327 12.8625 17.7291V16.2487C12.8625 16.146 12.7941 16.0762 12.6909 16.0762H11.3821Z"/> 
      </g>
    </svg>
  );
};

export default HelpIcon;
