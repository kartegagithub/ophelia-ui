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

const KgMapIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgMapIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgMapIcon)` : undefined}>
        <path d="M511.717567 127.981836c34.606169 0 68.116377 6.704702 99.598393 19.928889 30.468942 12.797467 57.817824 31.142278 81.289398 54.525847 48.328705 48.146557 74.943876 112.571868 74.943876 181.406606 0 37.119409-7.90504 79.557964-23.496134 126.136816-14.530948 43.412742-35.730783 90.39273-63.010079 139.63627-58.604746 105.791441-129.349997 194.2184-169.326477 240.706177C471.734948 843.819315 400.986627 755.37496 342.395184 649.616264c-27.282367-49.244564-48.484248-96.225575-63.017242-139.63627-15.59314-46.578852-23.499204-89.017406-23.499204-126.135792 0-68.834738 26.616194-133.26005 74.9449-181.406607 23.471574-23.38357 50.821479-41.72838 81.291444-54.525847 31.483038-13.225209 64.99427-19.929912 99.602485-19.929912m0-63.956637c-176.35966 0-319.794443 141.665487-319.794443 319.817979 0 186.559976 159.91206 420.09073 276.493242 554.182728 0.435928 0.523933 19.150152 21.444405 42.284035 21.444405h2.029216c23.134907 0 41.84299-20.924565 42.289152-21.444405 116.605741-134.093021 276.489148-367.627868 276.489149-554.182728-0.001023-178.152493-143.43683-319.817979-319.790351-319.817979zM511.706311 319.863005c35.270295 0 63.964824 28.694529 63.964824 63.964824s-28.694529 63.964824-63.964824 63.964824-63.964824-28.694529-63.964824-63.964824 28.694529-63.964824 63.964824-63.964824m0-63.956638c-70.64906 0-127.921461 57.272401-127.921461 127.921462s57.272401 127.921461 127.921461 127.921461 127.921461-57.272401 127.921461-127.921461-57.272401-127.921461-127.921461-127.921462z" />
      </g>
    </svg>
  );
};

export default KgMapIcon;
