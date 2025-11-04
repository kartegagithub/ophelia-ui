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

const OutlinedTrashIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 18 18"
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
          <linearGradient id="duotone-OutlinedTrashIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-OutlinedTrashIcon)` : undefined}>
         <path fillRule="evenodd" clipRule="evenodd" d="M7.82825 11.8203C7.82825 12.2328 7.49075 12.5703 7.07825 12.5703C6.66575 12.5703 6.32825 12.2328 6.32825 11.8203V8.82034C6.32825 8.40784 6.66575 8.07034 7.07825 8.07034C7.49075 8.07034 7.82825 8.40784 7.82825 8.82034V11.8203ZM12.328 11.8204C12.328 12.2329 11.9905 12.5704 11.578 12.5704C11.1655 12.5704 10.828 12.2329 10.828 11.8204V8.82037C10.828 8.40787 11.1655 8.07037 11.578 8.07037C11.9905 8.07037 12.328 8.40787 12.328 8.82037V11.8204ZM13.828 14.0703C13.828 14.4835 13.492 14.8203 13.078 14.8203H5.578C5.164 14.8203 4.828 14.4835 4.828 14.0703V5.82028H13.828V14.0703ZM7.82819 3.06625C7.82819 2.95 7.98869 2.82025 8.20319 2.82025H10.4532C10.6677 2.82025 10.8282 2.95 10.8282 3.06625V4.32025H7.82819V3.06625ZM16.0781 4.32031H15.3281H12.3281V3.06631C12.3281 2.10331 11.4874 1.32031 10.4531 1.32031H8.20312C7.16888 1.32031 6.32812 2.10331 6.32812 3.06631V4.32031H3.32812H2.57812C2.16562 4.32031 1.82812 4.65781 1.82812 5.07031C1.82812 5.48281 2.16562 5.82031 2.57812 5.82031H3.32812V14.0703C3.32812 15.3108 4.33763 16.3203 5.57812 16.3203H13.0781C14.3186 16.3203 15.3281 15.3108 15.3281 14.0703V5.82031H16.0781C16.4906 5.82031 16.8281 5.48281 16.8281 5.07031C16.8281 4.65781 16.4906 4.32031 16.0781 4.32031Z" /> 
      </g>
    </svg>
  );
};

export default OutlinedTrashIcon;
