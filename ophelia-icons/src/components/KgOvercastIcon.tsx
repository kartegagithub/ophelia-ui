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

const KgOvercastIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgOvercastIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgOvercastIcon)` : undefined}>
        <path d="M378.880427 618.069333c0-101.461333 91.818667-183.978667 204.586666-183.978666a222.72 222.72 0 0 1 70.442667 11.221333 188.928 188.928 0 0 1 87.04-49.92 180.394667 180.394667 0 0 0-160.981333-100.181333c-14.634667 0-29.184 1.792-43.306667 5.290666a25.813333 25.813333 0 0 1-27.477333-10.410666 198.656 198.656 0 0 0-163.541334-86.101334A197.717333 197.717333 0 0 0 211.840427 256a197.845333 197.845333 0 0 0-63.701334 127.36 25.813333 25.813333 0 0 1-14.592 20.821333 147.456 147.456 0 0 0-7.125333 3.669334 24.064 24.064 0 0 1-6.826667 2.56 154.154667 154.154667 0 0 0-85.504 52.906666A150.186667 150.186667 0 0 0 0.000427 559.061333c0 84.053333 68.736 152.362667 153.258666 152.362667h184.021334a167.253333 167.253333 0 0 1 41.813333-85.546667 150.016 150.016 0 0 1-0.213333-7.893333v0.085333z" /><path d="M935.680427 622.378667a25.813333 25.813333 0 0 1-15.488-33.066667c3.968-11.008 5.973333-22.442667 5.973333-34.090667 0-48.938667-35.754667-90.837333-85.845333-107.392a151.765333 151.765333 0 0 0-73.301334-5.376c-34.432 5.845333-65.152 23.296-85.12 49.066667a25.728 25.728 0 0 1-30.549333 7.893333 170.752 170.752 0 0 0-67.882667-13.781333c-84.309333 0-152.96 59.392-152.96 132.394667 0 4.693333 0.298667 9.472 0.896 14.208a25.728 25.728 0 0 1-7.722666 21.76c-17.066667 16.426667-28.586667 36.266667-33.792 57.472a107.605333 107.605333 0 0 0 0.085333 51.626666c13.909333 56.021333 71.637333 98.176 140.586667 98.176h349.610666c79.274667 0 143.786667-55.722667 143.786667-124.245333 0-50.218667-34.645333-95.232-88.32-114.645333z" />
      </g>
    </svg>
  );
};

export default KgOvercastIcon;
