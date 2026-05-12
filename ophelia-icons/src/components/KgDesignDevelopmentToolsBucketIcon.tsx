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

const KgDesignDevelopmentToolsBucketIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentToolsBucketIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentToolsBucketIcon)` : undefined}>
        <path d="M464 304c0 70.752-41.248 128-112 128l208 320 208-320c-70.752 0-112-57.248-112-128" /><path d="M560 704a16 16 0 0 1-13.424-7.28l-208-320a16 16 0 0 1 26.848-17.44L560 658.64l194.576-299.36a16 16 0 1 1 26.848 17.44l-208 320A16 16 0 0 1 560 704z" /><path d="M768 384c-75.36 0-128-59.216-128-144a16 16 0 1 1 32 0c0 55.744 29.68 112 96 112a16 16 0 1 1 0 32zM352 384a16 16 0 1 1 0-32c66.32 0 96-56.256 96-112a16 16 0 1 1 32 0c0 84.784-52.64 144-128 144z" /><path d="M656 256H464a16 16 0 0 1-16-16v-80a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16v80a16 16 0 0 1-16 16z m-176-32h160v-48H480v48zM560 528c-26.464 0-48-21.536-48-48s21.536-48 48-48 48 21.536 48 48-21.536 48-48 48z m0-64a16.016 16.016 0 0 0 0 32 16.016 16.016 0 0 0 0-32z" /><path d="M560 704a16 16 0 0 1-16-16V512a16 16 0 1 1 32 0v176a16 16 0 0 1-16 16zM688 176H432a16 16 0 0 1-16-16V32a16 16 0 0 1 16-16h256a16 16 0 0 1 16 16v128a16 16 0 0 1-16 16zM448 144h224V48H448v96z" /><path d="M751.84 1024H336a16 16 0 0 1-16-16v-111.84c0-23.28-10-48.16-38.08-48.16h-31.52C192.64 848 128 800.096 128 736v-144H79.52a47.136 47.136 0 0 1-40.016-22.16 47.984 47.984 0 0 1-2.736-46.496l125.056-265.84c18.448-38.88 38.304-70.976 60.72-98.096 42.128-51.12 95.632-92.672 154.72-120.16a16 16 0 1 1 13.504 29.008c-54.8 25.488-104.432 64.048-143.552 111.52-20.72 25.072-39.184 54.96-56.448 91.392L65.68 537.056c-3.52 7.36-0.544 13.44 0.896 15.696A15.152 15.152 0 0 0 79.52 560H144a16 16 0 0 1 16 16v160c0 45.056 48.592 80 90.4 80h31.52C323.2 816 352 848.96 352 896.16V992h384.208c4.128-93.024 44-186 110.832-257.344 83.584-89.232 123.808-211.168 110.336-334.528-12.8-116.768-78.144-226.944-174.72-294.72a411.776 411.776 0 0 0-53.76-31.872 16 16 0 0 1 14.208-28.672 445.728 445.728 0 0 1 57.936 34.368c104 72.96 174.336 191.632 188.16 317.424 14.464 132.656-28.848 263.84-118.816 359.888C805.216 826.08 767.84 917.744 767.84 1008a16 16 0 0 1-16 16z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentToolsBucketIcon;
