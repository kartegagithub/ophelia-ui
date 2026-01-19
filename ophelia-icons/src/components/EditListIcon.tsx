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

const EditListIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-EditListIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-EditListIcon)` : undefined}>
         <g clipPath="url(#clip0_5203_2260)"> <path d="M22.4976 7.7328L14.8356 18.6348L12.2868 16.872L19.9488 5.97L22.4976 7.7328ZM23.1216 6.8544L22.116 8.2716C21.8767 8.60432 21.5167 8.83017 21.113 8.90081C20.7093 8.97146 20.294 8.88129 19.956 8.6496C19.7891 8.53517 19.6466 8.38869 19.5368 8.21868C19.427 8.04868 19.3521 7.85853 19.3165 7.65932C19.2809 7.46011 19.2852 7.2558 19.3293 7.05828C19.3734 6.86077 19.4563 6.67398 19.5732 6.5088L20.5788 5.0916C20.8181 4.75882 21.1782 4.53301 21.5819 4.46257C21.9857 4.39214 22.401 4.48268 22.7388 4.7148C22.9058 4.82901 23.0484 4.97533 23.1583 5.14523C23.2681 5.31513 23.343 5.5052 23.3787 5.70436C23.4143 5.90352 23.4099 6.10778 23.3658 6.30523C23.3217 6.50268 23.2386 6.68937 23.1216 6.8544ZM14.8212 18.6456L12.1044 19.782C12.0576 19.8168 12.0228 19.7928 12.0408 19.7376L12.2808 16.89C12.2988 16.8348 12.3552 16.7904 12.384 16.8108L14.8596 18.522C14.8698 18.5437 14.8715 18.5684 14.8644 18.5912C14.8573 18.6141 14.8419 18.6335 14.8212 18.6456ZM14.3184 6.1656H1.59239C1.46254 6.16639 1.33381 6.1416 1.21354 6.09263C1.09327 6.04367 0.98382 5.9715 0.891444 5.88024C0.799068 5.78897 0.725572 5.68041 0.675153 5.56074C0.624734 5.44108 0.59838 5.31265 0.597594 5.1828C0.59838 5.05295 0.624734 4.92452 0.675153 4.80486C0.725572 4.68519 0.799068 4.57663 0.891444 4.48536C0.98382 4.3941 1.09327 4.32193 1.21354 4.27297C1.33381 4.224 1.46254 4.19921 1.59239 4.2H14.3184C14.4482 4.19921 14.577 4.224 14.6973 4.27297C14.8175 4.32193 14.927 4.3941 15.0193 4.48536C15.1117 4.57663 15.1852 4.68519 15.2356 4.80486C15.2861 4.92452 15.3124 5.05295 15.3132 5.1828C15.311 5.44463 15.205 5.69489 15.0185 5.87868C14.832 6.06248 14.5802 6.1648 14.3184 6.1632V6.1656ZM9.40559 12.828H1.59239C1.46254 12.8288 1.33381 12.804 1.21354 12.755C1.09327 12.7061 0.98382 12.6339 0.891444 12.5426C0.799068 12.4514 0.725572 12.3428 0.675153 12.2231C0.624734 12.1035 0.59838 11.9751 0.597594 11.8452C0.59838 11.7153 0.624734 11.5869 0.675153 11.4673C0.725572 11.3476 0.799068 11.239 0.891444 11.1478C0.98382 11.0565 1.09327 10.9843 1.21354 10.9354C1.33381 10.8864 1.46254 10.8616 1.59239 10.8624H9.40559C9.53545 10.8616 9.66418 10.8864 9.78445 10.9354C9.90472 10.9843 10.0142 11.0565 10.1065 11.1478C10.1989 11.239 10.2724 11.3476 10.3228 11.4673C10.3733 11.5869 10.3996 11.7153 10.4004 11.8452C10.3982 12.107 10.2922 12.3573 10.1057 12.5411C9.91921 12.7249 9.66743 12.8272 9.40559 12.8256V12.828ZM6.35999 19.488H1.58879C1.45894 19.4888 1.33021 19.464 1.20994 19.415C1.08967 19.3661 0.98022 19.2939 0.887844 19.2026C0.795468 19.1114 0.721972 19.0028 0.671553 18.8831C0.621134 18.7635 0.59478 18.6351 0.593994 18.5052C0.59478 18.3753 0.621134 18.2469 0.671553 18.1273C0.721972 18.0076 0.795468 17.899 0.887844 17.8078C0.98022 17.7165 1.08967 17.6443 1.20994 17.5954C1.33021 17.5464 1.45894 17.5216 1.58879 17.5224H6.35999C6.48985 17.5216 6.61858 17.5464 6.73885 17.5954C6.85912 17.6443 6.96857 17.7165 7.06094 17.8078C7.15332 17.899 7.22682 18.0076 7.27724 18.1273C7.32765 18.2469 7.35401 18.3753 7.35479 18.5052C7.35401 18.6351 7.32765 18.7635 7.27724 18.8831C7.22682 19.0028 7.15332 19.1114 7.06094 19.2026C6.96857 19.2939 6.85912 19.3661 6.73885 19.415C6.61858 19.464 6.48985 19.4888 6.35999 19.488Z"/> </g> <defs> <clipPath id="EditListIcon-clip0_5203_2260"> <rect width="24" height="24"/> </clipPath> </defs> 
      </g>
    </svg>
  );
};

export default EditListIcon;
