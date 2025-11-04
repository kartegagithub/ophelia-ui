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

const PersonXIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 22 22"
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
          <linearGradient id="duotone-PersonXIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-PersonXIcon)` : undefined}>
         <path d="M12.1761 3.84088C11.8135 3.84088 11.4544 3.9123 11.1194 4.05107C10.7844 4.18984 10.48 4.39324 10.2236 4.64965C9.96714 4.90606 9.76374 5.21047 9.62497 5.54549C9.4862 5.88051 9.41477 6.23958 9.41477 6.6022C9.41477 6.96482 9.4862 7.32389 9.62497 7.65891C9.76374 7.99393 9.96714 8.29834 10.2236 8.55475C10.48 8.81116 10.7844 9.01456 11.1194 9.15333C11.4544 9.2921 11.8135 9.36352 12.1761 9.36352C12.9085 9.36352 13.6108 9.0726 14.1287 8.55475C14.6465 8.0369 14.9375 7.33455 14.9375 6.6022C14.9375 5.86985 14.6465 5.1675 14.1287 4.64965C13.6108 4.1318 12.9085 3.84088 12.1761 3.84088ZM7.57387 6.6022C7.57387 5.38162 8.05875 4.21103 8.92184 3.34795C9.78493 2.48487 10.9555 2 12.1761 2C13.3967 2 14.5673 2.48487 15.4304 3.34795C16.2935 4.21103 16.7784 5.38162 16.7784 6.6022C16.7784 7.82278 16.2935 8.99337 15.4304 9.85645C14.5673 10.7195 13.3967 11.2044 12.1761 11.2044C10.9555 11.2044 9.78493 10.7195 8.92184 9.85645C8.05875 8.99337 7.57387 7.82278 7.57387 6.6022ZM4.35229 17.6475C4.35229 16.4269 4.83717 15.2563 5.70026 14.3932C6.56335 13.5302 7.73395 13.0453 8.95455 13.0453H15.3977C16.0021 13.0453 16.6005 13.1643 17.1589 13.3956C17.7173 13.6269 18.2246 13.9659 18.652 14.3932C19.0793 14.8206 19.4183 15.3279 19.6496 15.8863C19.8809 16.4447 20 17.0431 20 17.6475V19.4884H18.1591V17.6475C18.1591 16.9151 17.8681 16.2128 17.3503 15.6949C16.8324 15.1771 16.1301 14.8862 15.3977 14.8862H8.95455C8.22219 14.8862 7.51983 15.1771 7.00198 15.6949C6.48412 16.2128 6.1932 16.9151 6.1932 17.6475V19.4884H4.35229V17.6475Z" /> <ellipse cx="4.91191" cy="16.9705" rx="3.91191" ry="3.91187" /> <path d="M4.91191 13.0586C2.74863 13.0586 1 14.8072 1 16.9705C1 19.1337 2.74863 20.8823 4.91191 20.8823C7.0752 20.8823 8.82383 19.1337 8.82383 16.9705C8.82383 14.8072 7.0752 13.0586 4.91191 13.0586ZM6.86787 18.3748L6.31629 18.9264L4.91191 17.522L3.50754 18.9264L2.95596 18.3748L4.36033 16.9705L2.95596 15.5661L3.50754 15.0145L4.91191 16.4189L6.31629 15.0145L6.86787 15.5661L5.46349 16.9705L6.86787 18.3748Z" /> 
      </g>
    </svg>
  );
};

export default PersonXIcon;
