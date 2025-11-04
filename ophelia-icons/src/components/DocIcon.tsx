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

const DocIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 52 52"
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
          <linearGradient id="duotone-DocIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-DocIcon)` : undefined}>
         <rect width="52" height="52" rx="8.66667" /> <path d="M11.7687 32.5C11.3527 32.5 11.0167 32.3773 10.7607 32.132C10.5154 31.8867 10.3927 31.5613 10.3927 31.156V21.3H15.4967C16.3287 21.3 17.0594 21.46 17.6887 21.78C18.3287 22.0893 18.8194 22.532 19.1607 23.108C19.5127 23.684 19.6887 24.3507 19.6887 25.108V28.372C19.6887 29.7267 19.3367 30.756 18.6327 31.46C17.9394 32.1533 16.9154 32.5 15.5607 32.5H11.7687ZM15.5127 30.852C16.27 30.852 16.8407 30.6387 17.2247 30.212C17.6194 29.7747 17.8167 29.14 17.8167 28.308V25.172C17.8167 24.5107 17.598 23.9773 17.1607 23.572C16.7234 23.156 16.1527 22.948 15.4487 22.948H12.2647V30.852H15.5127ZM25.2624 32.628C24.4518 32.628 23.7371 32.4573 23.1184 32.116C22.4998 31.764 22.0198 31.2733 21.6784 30.644C21.3371 30.004 21.1664 29.268 21.1664 28.436V25.364C21.1664 24.532 21.3371 23.8013 21.6784 23.172C22.0198 22.532 22.4998 22.0413 23.1184 21.7C23.7371 21.348 24.4518 21.172 25.2624 21.172H26.9584C27.7691 21.172 28.4838 21.348 29.1024 21.7C29.7318 22.0413 30.2171 22.532 30.5584 23.172C30.8998 23.8013 31.0704 24.532 31.0704 25.364V28.436C31.0704 29.268 30.8998 30.004 30.5584 30.644C30.2171 31.2733 29.7318 31.764 29.1024 32.116C28.4838 32.4573 27.7691 32.628 26.9584 32.628H25.2624ZM26.9584 30.98C27.6198 30.98 28.1584 30.74 28.5744 30.26C28.9904 29.78 29.1984 29.1507 29.1984 28.372V25.428C29.1984 24.6493 28.9904 24.02 28.5744 23.54C28.1691 23.06 27.6304 22.82 26.9584 22.82H25.2784C24.6064 22.82 24.0624 23.06 23.6464 23.54C23.2411 24.02 23.0384 24.6493 23.0384 25.428V28.372C23.0384 29.1507 23.2411 29.78 23.6464 30.26C24.0624 30.74 24.6064 30.98 25.2784 30.98H26.9584ZM36.5719 32.628C35.7826 32.628 35.0893 32.4573 34.4919 32.116C33.8946 31.764 33.4306 31.2733 33.0999 30.644C32.7693 30.004 32.6039 29.268 32.6039 28.436V25.364C32.6039 24.532 32.7693 23.8013 33.0999 23.172C33.4413 22.532 33.9159 22.0413 34.5239 21.7C35.1319 21.348 35.8359 21.172 36.6359 21.172H38.3319C39.0893 21.172 39.7613 21.3373 40.3479 21.668C40.9346 21.988 41.3879 22.4467 41.7079 23.044C42.0279 23.6307 42.1879 24.3133 42.1879 25.092H40.3479C40.3479 24.4093 40.1613 23.86 39.7879 23.444C39.4146 23.028 38.9293 22.82 38.3319 22.82H36.6359C35.9853 22.82 35.4626 23.06 35.0679 23.54C34.6733 24.02 34.4759 24.6493 34.4759 25.428V28.372C34.4759 29.1613 34.6679 29.796 35.0519 30.276C35.4359 30.7453 35.9426 30.98 36.5719 30.98H38.2999C38.9186 30.98 39.4199 30.7453 39.8039 30.276C40.1879 29.8067 40.3799 29.1987 40.3799 28.452H42.2199C42.2199 29.284 42.0546 30.0147 41.7239 30.644C41.4039 31.2733 40.9453 31.764 40.3479 32.116C39.7613 32.4573 39.0786 32.628 38.2999 32.628H36.5719Z" /> 
      </g>
    </svg>
  );
};

export default DocIcon;
