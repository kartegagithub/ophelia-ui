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

const JpgIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-JpgIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-JpgIcon)` : undefined}>
         <rect width="52" height="52" rx="8.66667" /> <path d="M14.2768 32.628C13.5941 32.628 12.9914 32.468 12.4688 32.148C11.9461 31.8173 11.5408 31.3587 11.2528 30.772C10.9648 30.1747 10.8208 29.492 10.8208 28.724H12.6608C12.6608 29.4067 12.8101 29.956 13.1088 30.372C13.4074 30.7773 13.7968 30.98 14.2768 30.98H15.5568C16.0474 30.98 16.4368 30.7667 16.7248 30.34C17.0234 29.9027 17.1728 29.3213 17.1728 28.596V21.3H19.0448V28.66C19.0448 29.46 18.9008 30.1587 18.6128 30.756C18.3354 31.3533 17.9354 31.8173 17.4128 32.148C16.9008 32.468 16.3034 32.628 15.6208 32.628H14.2768ZM21.088 21.3H26.832C27.7707 21.3 28.528 21.5667 29.104 22.1C29.68 22.6227 29.968 23.316 29.968 24.18V25.716C29.968 26.6227 29.664 27.3533 29.056 27.908C28.4587 28.452 27.6693 28.724 26.688 28.724H22.96V32.5H21.088V21.3ZM26.656 27.092C27.0933 27.092 27.44 26.9587 27.696 26.692C27.9627 26.4253 28.096 26.0787 28.096 25.652V24.228C28.096 23.8333 27.9787 23.5187 27.744 23.284C27.5093 23.0493 27.1947 22.932 26.8 22.932H22.96V27.092H26.656ZM35.0493 32.628C34.2493 32.628 33.5453 32.4573 32.9373 32.116C32.3399 31.764 31.8759 31.2733 31.5453 30.644C31.2146 30.004 31.0493 29.268 31.0493 28.436V25.364C31.0493 24.532 31.2146 23.8013 31.5453 23.172C31.8866 22.532 32.3613 22.0413 32.9693 21.7C33.5879 21.348 34.2973 21.172 35.0973 21.172H36.8573C37.6253 21.172 38.3026 21.332 38.8893 21.652C39.4759 21.9613 39.9293 22.404 40.2493 22.98C40.5693 23.5453 40.7293 24.2013 40.7293 24.948H38.8893C38.8893 24.308 38.7026 23.796 38.3293 23.412C37.9559 23.0173 37.4653 22.82 36.8573 22.82H35.0973C34.4466 22.82 33.9186 23.06 33.5133 23.54C33.1186 24.0093 32.9213 24.6387 32.9213 25.428V28.372C32.9213 29.1613 33.1133 29.796 33.4973 30.276C33.8919 30.7453 34.4093 30.98 35.0493 30.98H36.8733C37.4919 30.98 37.9986 30.7613 38.3933 30.324C38.7879 29.8867 38.9853 29.3267 38.9853 28.644V28.1H35.8813V26.468H40.8253V28.644C40.8253 29.4227 40.6599 30.116 40.3293 30.724C39.9986 31.3213 39.5346 31.7907 38.9373 32.132C38.3399 32.4627 37.6519 32.628 36.8733 32.628H35.0493Z" /> 
      </g>
    </svg>
  );
};

export default JpgIcon;
