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

const PostIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-PostIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-PostIcon)` : undefined}>
         <g clipPath="url(#clip0_4962_4291)"> <path d="M8.1749 21.3977C7.1024 21.0752 4.6499 19.3802 2.4899 10.8977L0.937401 19.7252C0.920122 19.8222 0.922131 19.9217 0.943315 20.0179C0.964499 20.1141 1.00444 20.2053 1.06086 20.2861C1.11728 20.3669 1.18907 20.4357 1.27212 20.4888C1.35518 20.5418 1.44787 20.578 1.5449 20.5952L15.5924 23.0702C15.783 23.1061 15.98 23.0667 16.1423 22.9605C16.3045 22.8542 16.4192 22.6892 16.4624 22.5002L16.8899 20.0552L8.5124 21.5552L8.1749 21.3977ZM22.9124 16.3052C20.6024 13.5002 18.8924 5.43766 18.4199 3.00016C18.3817 2.80696 18.2691 2.63652 18.1063 2.52566C17.9435 2.4148 17.7437 2.37242 17.5499 2.40767L13.9199 3.00016C14.0451 3.49881 14.0664 4.01786 13.9825 4.52509C13.8986 5.03232 13.7113 5.51687 13.4323 5.94866C13.1532 6.38046 12.7884 6.75025 12.3604 7.03509C11.9324 7.31992 11.4504 7.51371 10.9443 7.6044C10.4383 7.6951 9.91896 7.68077 9.41868 7.56231C8.9184 7.44385 8.44782 7.22378 8.03618 6.91579C7.62454 6.60779 7.28062 6.21843 7.0258 5.77191C6.77098 5.32539 6.61069 4.83124 6.5549 4.32017L3.5099 4.86017C3.41135 4.87725 3.31721 4.91389 3.23303 4.9679C3.14884 5.02191 3.07632 5.09222 3.01971 5.17468C2.9631 5.25715 2.92356 5.3501 2.90342 5.44807C2.88327 5.54604 2.88293 5.64706 2.9024 5.74516C3.4499 8.57266 5.5649 18.4952 8.3474 19.8677C8.49117 19.9394 8.65417 19.9631 8.8124 19.9352L22.4699 17.5277C22.599 17.5051 22.7199 17.449 22.8206 17.3651C22.9213 17.2812 22.9983 17.1723 23.0438 17.0494C23.0893 16.9265 23.1019 16.7938 23.0801 16.6645C23.0584 16.5352 23.0031 16.4139 22.9199 16.3127L22.9124 16.3052ZM10.2449 6.00016C10.6608 5.99775 11.068 5.88008 11.4211 5.66023C11.7742 5.44037 12.0594 5.12694 12.2451 4.75475C12.4308 4.38256 12.5097 3.96617 12.4731 3.55184C12.4364 3.13751 12.2856 2.74146 12.0374 2.40767C12.0402 2.3552 12.0402 2.30263 12.0374 2.25017C12.0314 1.89561 11.9001 1.55463 11.6666 1.28774C11.4331 1.02085 11.1126 0.845311 10.762 0.792269C10.4114 0.739228 10.0533 0.812116 9.75132 0.997999C9.44933 1.18388 9.22297 1.47074 9.1124 1.80767C8.6859 2.05696 8.35329 2.4397 8.16593 2.89681C7.97856 3.35392 7.94685 3.85999 8.07568 4.33692C8.20451 4.81384 8.48672 5.23511 8.87876 5.53571C9.2708 5.83631 9.75088 5.99952 10.2449 6.00016Z"/> </g> <defs> <clipPath id="PostIcon-clip0_4962_4291"> <rect width="24" height="24"/> </clipPath> </defs> 
      </g>
    </svg>
  );
};

export default PostIcon;
