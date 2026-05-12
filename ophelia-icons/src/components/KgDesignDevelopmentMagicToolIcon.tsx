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

const KgDesignDevelopmentMagicToolIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentMagicToolIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentMagicToolIcon)` : undefined}>
        <path d="M110.404792 126.402665l149.263557 49.359853L387.26797 80.002802l-3.503989 158.127531L512.0036 328.210066l-151.42355 48.351856L312.212193 528.001472l-90.079732-128.239619-158.127531 3.51999 95.759716-127.631621z" /><path d="M944.002318 1024a15.951953 15.951953 0 0 1-11.311967-4.687986l-575.99829-575.99829c-11.567966-11.567966-17.935947-26.95992-17.935947-43.311872s6.367981-31.743906 17.935947-43.311871c23.135931-23.135931 63.487812-23.135931 86.623743 0l575.99829 575.99829a15.999953 15.999953 0 0 1 0 22.623933l-63.99981 63.99981A15.951953 15.951953 0 0 1 944.002318 1024zM400.003933 370.753939c-7.807977 0-15.167955 3.039991-20.687939 8.559975s-8.559975 12.879962-8.559975 20.687938c0 7.807977 3.039991 15.167955 8.559975 20.687939L944.002318 985.376115 985.378195 944.000237 420.691871 379.313914A29.039914 29.039914 0 0 0 400.003933 370.753939z" /><path d="M800.002745 880.000427a15.999953 15.999953 0 0 1-11.311966-27.311918l63.99981-63.99981a15.999953 15.999953 0 1 1 22.623932 22.623932l-63.99981 63.99981A15.951953 15.951953 0 0 1 800.002745 880.000427zM264.212336 480.001615a15.999953 15.999953 0 0 1-13.087962-6.79998l-85.167747-121.24764-149.599556 3.31199C10.373089 355.681984 4.581106 352.001995 1.765115 346.562011a15.999953 15.999953 0 0 1 1.439996-16.91195l90.73573-120.927641-46.719861-141.32758A15.999953 15.999953 0 0 1 67.39692 47.2029l141.32758 46.751861L329.684141 3.20303a15.999953 15.999953 0 0 1 25.599924 13.151961l-3.32799 149.599556 121.24764 85.167747a15.983953 15.983953 0 0 1-4.319987 28.319916l-143.567574 45.855864-45.855864 143.567574a15.999953 15.999953 0 0 1-15.247954 11.135967z m-90.079733-160.239524a15.999953 15.999953 0 0 1 13.087961 6.79998l71.551788 101.871697 38.559885-120.735641c1.583995-4.927985 5.439984-8.799974 10.36797-10.36797l120.735641-38.559885-101.855698-71.551788a15.983953 15.983953 0 0 1-6.799979-13.43996l2.767991-125.215628-101.279699 75.999774a15.903953 15.903953 0 0 1-14.623956 2.399993L87.57286 87.55478l39.375883 119.071647a15.967953 15.967953 0 0 1-2.399993 14.623956l-75.999774 101.279699 125.231628-2.783991h0.351999z" /><path d="M192.00455 48.002897c-4.159988 0-8.319975-1.759995-11.359966-4.639986-2.879991-3.039991-4.639986-7.199979-4.639986-11.359966 0-4.159988 1.759995-8.319975 4.639986-11.359966 6.079982-5.919982 16.639951-5.919982 22.719932 0 2.879991 3.039991 4.639986 7.199979 4.639987 11.359966 0 4.159988-1.759995 8.319975-4.639987 11.359966-3.039991 2.879991-7.199979 4.639986-11.359966 4.639986zM144.004693 544.001425c-4.159988 0-8.319975-1.759995-11.359967-4.639986-2.879991-3.039991-4.639986-7.199979-4.639986-11.359967 0-4.159988 1.759995-8.319975 4.639986-11.359966 6.079982-5.919982 16.79995-5.919982 22.719933 0 2.879991 3.039991 4.639986 7.199979 4.639986 11.359966 0 4.159988-1.759995 8.319975-4.639986 11.359967-3.039991 2.879991-7.199979 4.639986-11.359966 4.639986zM544.003505 192.00247c-4.159988 0-8.319975-1.759995-11.359966-4.639986-2.879991-3.039991-4.639986-7.199979-4.639986-11.359967 0-4.159988 1.759995-8.319975 4.639986-11.359966 6.079982-5.919982 16.79995-5.919982 22.719932 0.16 2.879991 2.879991 4.639986 7.039979 4.639987 11.199966 0 4.159988-1.759995 8.319975-4.639987 11.359967-3.039991 2.879991-7.199979 4.639986-11.359966 4.639986zM32.005025 192.00247c-4.159988 0-8.319975-1.759995-11.359966-4.639986-2.879991-3.039991-4.639986-7.199979-4.639986-11.359967 0-4.159988 1.759995-8.319975 4.639986-11.359966 5.919982-5.919982 16.79995-5.919982 22.719932 0 2.879991 3.039991 4.639986 7.199979 4.639987 11.359966 0 4.159988-1.759995 8.319975-4.639987 11.359967-3.039991 2.879991-7.199979 4.639986-11.359966 4.639986zM576.00341 336.002042h-31.999905a15.999953 15.999953 0 0 1 0-31.999905h31.999905a15.999953 15.999953 0 0 1 0 31.999905z" /><path d="M560.003458 352.001995a15.999953 15.999953 0 0 1-15.999953-15.999953v-31.999905a15.999953 15.999953 0 0 1 31.999905 0v31.999905a15.999953 15.999953 0 0 1-15.999952 15.999953zM128.00474 432.001757H96.004835a15.999953 15.999953 0 0 1 0-31.999905h31.999905a15.999953 15.999953 0 0 1 0 31.999905z" /><path d="M112.004788 448.00171a15.999953 15.999953 0 0 1-15.999953-15.999953v-31.999905a15.999953 15.999953 0 0 1 31.999905 0v31.999905a15.999953 15.999953 0 0 1-15.999952 15.999953zM560.003458 64.00285h-31.999905a15.999953 15.999953 0 0 1 0-31.999905h31.999905a15.999953 15.999953 0 0 1 0 31.999905z" /><path d="M544.003505 80.002802a15.999953 15.999953 0 0 1-15.999952-15.999952V32.002945a15.999953 15.999953 0 0 1 31.999905 0v31.999905a15.999953 15.999953 0 0 1-15.999953 15.999952zM416.003885 144.002612c-4.319987 0-8.319975-1.759995-11.359966-4.639986-2.879991-3.039991-4.639986-7.039979-4.639986-11.359966s1.759995-8.319975 4.639986-11.359966c5.919982-5.919982 16.639951-5.919982 22.719932 0 2.879991 3.039991 4.639986 7.199979 4.639987 11.359966 0 4.159988-1.759995 8.319975-4.639987 11.359966-3.039991 2.879991-7.199979 4.639986-11.359966 4.639986zM64.00493 672.001045c-4.159988 0-8.319975-1.759995-11.359966-4.639986-2.879991-3.039991-4.639986-7.199979-4.639986-11.359967 0-4.159988 1.759995-8.319975 4.639986-11.359966 5.919982-5.919982 16.79995-5.919982 22.719932 0 2.879991 3.039991 4.639986 7.199979 4.639987 11.359966 0 4.159988-1.759995 8.319975-4.639987 11.359967-3.039991 2.879991-7.199979 4.639986-11.359966 4.639986zM272.004313 608.001235h-31.999905a15.999953 15.999953 0 0 1 0-31.999905h31.999905a15.999953 15.999953 0 0 1 0 31.999905z" /><path d="M256.00436 624.001187a15.999953 15.999953 0 0 1-15.999952-15.999952v-31.999905a15.999953 15.999953 0 0 1 31.999905 0v31.999905a15.999953 15.999953 0 0 1-15.999953 15.999952z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentMagicToolIcon;
