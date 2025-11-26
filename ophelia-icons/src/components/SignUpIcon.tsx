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

const SignUpIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 24 16"
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
          <linearGradient id="duotone-SignUpIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-SignUpIcon)` : undefined}>
         <g clipPath="url(#clip0_231_1239)"> <path d="M7.97422 6.09017H4.59116V2.45899H3.19396V6.09017H0V7.65678H3.19396V11.288H4.59116V7.65678H7.96994V6.09017H7.97422ZM18.588 7.26234C18.9936 7.23421 19.3896 7.12605 19.7532 6.9441C20.1168 6.76216 20.4408 6.51003 20.7064 6.20225C21.0743 5.82997 21.3579 5.383 21.538 4.8916C21.7181 4.40019 21.7905 3.87582 21.7504 3.354C21.7102 2.83217 21.5584 2.32506 21.3052 1.867C21.0521 1.40894 20.7034 1.01062 20.2829 0.699016C19.712 0.367676 19.0797 0.155926 18.4245 0.076645C17.7692 -0.00263581 17.1046 0.05221 16.4712 0.237846C16.9831 0.631746 17.3834 1.15226 17.6328 1.74806C17.8821 2.34387 17.9719 2.99438 17.8932 3.63544C17.9091 4.29721 17.7604 4.95256 17.4604 5.54261C17.1603 6.13267 16.7184 6.63894 16.1743 7.01593C16.9442 7.30436 17.7752 7.39067 18.588 7.26662V7.26234ZM13.3123 7.26234C14.1513 7.26172 14.9642 6.97023 15.6124 6.43753C16.2606 5.90482 16.7041 5.16386 16.8673 4.34087C17.0304 3.51787 16.9033 2.66376 16.5073 1.92402C16.1114 1.18429 15.4713 0.604695 14.696 0.283979C13.9207 -0.0367363 13.0582 -0.078735 12.2554 0.165138C11.4526 0.409011 10.7592 0.92367 10.2933 1.62144C9.8274 2.31921 9.61783 3.15693 9.70028 3.99188C9.78274 4.82684 10.1521 5.60738 10.7455 6.20054C11.0822 6.538 11.4824 6.80554 11.9229 6.98776C12.3634 7.16999 12.8356 7.26331 13.3123 7.26234ZM19.2819 10.4803C20.5713 11.2734 21.7717 11.8817 21.7717 13.3115V15.7337H24.0091V13.3132C24.0091 11.4514 21.1325 9.71963 19.2836 10.482L19.2819 10.4803ZM13.3115 9.67856C10.8901 9.67856 6.04911 10.891 6.04911 13.3115V15.7337H20.5755V13.314C20.5755 10.8927 15.732 9.68284 13.3123 9.68284L13.3115 9.67856Z" /> </g> <defs> <clipPath id="SignUpIcon-clip0_231_1239"> <rect width="24" height="15.7337" /> </clipPath> </defs> 
      </g>
    </svg>
  );
};

export default SignUpIcon;
