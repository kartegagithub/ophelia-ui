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

const VoiceIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-VoiceIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-VoiceIcon)` : undefined}>
         <path d="M13.6084 3.55078C13.5425 3.55068 13.4762 3.55551 13.4102 3.56445C13.1458 3.60023 12.8851 3.70928 12.6699 3.90039C12.6699 3.90072 12.6699 3.90104 12.6699 3.90137L8.05859 8H4.75C3.51625 8 2.5 9.01625 2.5 10.25V13.75C2.5 14.9838 3.51625 16 4.75 16H8.05859L12.6699 20.0986C13.1003 20.4813 13.7107 20.5376 14.1729 20.3301C14.635 20.1226 15 19.6287 15 19.0527V4.94727C15 4.37154 14.636 3.87749 14.1738 3.66992C14.0005 3.59209 13.8062 3.55109 13.6084 3.55078ZM19.3779 5.99024C19.2478 5.9897 19.1198 6.02302 19.0065 6.08693C18.8931 6.15083 18.7984 6.24312 18.7315 6.35473C18.6646 6.46634 18.6279 6.59342 18.625 6.72351C18.622 6.85359 18.653 6.98219 18.7148 7.09668C20.4445 10.4091 20.4445 13.591 18.7148 16.9033C18.6674 16.9908 18.6379 17.0869 18.6279 17.1859C18.618 17.2849 18.6278 17.385 18.6569 17.4801C18.686 17.5753 18.7338 17.6638 18.7974 17.7403C18.861 17.8168 18.9393 17.8799 19.0275 17.926C19.1158 17.972 19.2123 17.9999 19.3115 18.0083C19.4107 18.0166 19.5105 18.0051 19.6052 17.9745C19.6999 17.9438 19.7875 17.8946 19.863 17.8298C19.9385 17.7649 20.0004 17.6857 20.0449 17.5967C21.9653 13.9191 21.9653 10.081 20.0449 6.40332C19.9827 6.27961 19.8875 6.17553 19.7697 6.10262C19.652 6.02971 19.5164 5.99081 19.3779 5.99024ZM17.0859 8.49805C16.9622 8.50333 16.8417 8.53918 16.7351 8.6024C16.6286 8.66561 16.5394 8.75423 16.4755 8.86033C16.4115 8.96642 16.3749 9.0867 16.3688 9.21042C16.3626 9.33415 16.3873 9.45745 16.4404 9.56934C17.1987 11.2286 17.1977 12.7799 16.4365 14.4395C16.3948 14.5291 16.3712 14.626 16.367 14.7248C16.3629 14.8236 16.3783 14.9222 16.4124 15.0149C16.4465 15.1077 16.4986 15.1929 16.5657 15.2654C16.6328 15.338 16.7136 15.3966 16.8034 15.4379C16.8933 15.4791 16.9904 15.5022 17.0892 15.5058C17.1879 15.5094 17.2865 15.4934 17.3791 15.4588C17.4716 15.4242 17.5565 15.3716 17.6287 15.3041C17.7009 15.2366 17.7591 15.1555 17.7998 15.0654C18.7187 13.062 18.7204 10.9491 17.8047 8.94531C17.7438 8.80706 17.6427 8.6904 17.5144 8.61059C17.3862 8.53079 17.2368 8.49156 17.0859 8.49805Z"/> 
      </g>
    </svg>
  );
};

export default VoiceIcon;
