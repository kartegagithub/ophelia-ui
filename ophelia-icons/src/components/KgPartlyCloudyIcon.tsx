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

const KgPartlyCloudyIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 1025 1024"
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
          <linearGradient id="duotone-KgPartlyCloudyIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgPartlyCloudyIcon)` : undefined}>
        <path d="M963.861333 604.672a25.130667 25.130667 0 0 1-8.789333-12.8 185.344 185.344 0 0 0-177.28-133.12c-15.061333 0-30.037333 1.792-44.544 5.376a24.832 24.832 0 0 1-26.453333-9.984 203.989333 203.989333 0 0 0-305.536-35.114667 203.392 203.392 0 0 0-65.493334 130.901334 24.789333 24.789333 0 0 1-13.994666 20.053333 126.890667 126.890667 0 0 0-7.338667 3.797333 23.210667 23.210667 0 0 1-6.613333 2.474667c-34.432 7.68-65.706667 27.050667-88.021334 54.442667a154.538667 154.538667 0 0 0-35.072 98.688c0 86.570667 70.784 156.970667 157.866667 156.970666H867.989333c87.04 0 157.866667-70.4 157.866667-156.970666 0-49.237333-22.613333-94.72-61.994667-124.672v-0.042667z" /><path d="M185.664 481.92c0 30.976 11.434667 60.16 31.829333 82.730667a208.512 208.512 0 0 1 70.826667-34.688A252.757333 252.757333 0 0 1 373.909333 377.045333a123.52 123.52 0 0 0-188.245333 104.917334v-0.042667zM308.970667 292.309333a24.746667 24.746667 0 0 0 24.832-24.789333V197.76a24.746667 24.746667 0 1 0-49.621334 0V267.52c0 13.696 11.093333 24.789333 24.789334 24.789333zM180.330667 308.650667a24.746667 24.746667 0 0 0 33.877333 9.088 24.832 24.832 0 0 0 9.088-33.877334L188.309333 223.445333a24.832 24.832 0 0 0-42.965333 24.746667l34.944 60.458667zM50.496 361.301333l60.416 34.901334a24.789333 24.789333 0 0 0 24.789333-42.965334L75.242667 318.293333a24.746667 24.746667 0 1 0-24.789334 42.965334zM24.810667 506.709333h69.802666a24.746667 24.746667 0 1 0 0-49.621333H24.810667a24.746667 24.746667 0 1 0 0 49.621333zM144.789333 576.682667a24.832 24.832 0 0 0-33.92-9.088l-60.416 34.944a24.832 24.832 0 0 0 24.832 42.965333l60.416-34.944a24.832 24.832 0 0 0 9.088-33.877333zM403.776 317.738667a24.789333 24.789333 0 0 0 33.877333-9.088l34.901334-60.416a24.746667 24.746667 0 1 0-42.965334-24.789334l-34.901333 60.416a24.832 24.832 0 0 0 9.088 33.877334z" />
      </g>
    </svg>
  );
};

export default KgPartlyCloudyIcon;
