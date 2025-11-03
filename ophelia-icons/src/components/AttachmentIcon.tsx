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

const AttachmentIcon: React.FC<IconProps> = ({
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
  
  className = "",
  style,
  ...rest
}) => {
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
      viewBox="0 0 20 20"
      fill={fillValue}
      stroke={strokeValue}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      xmlns="http://www.w3.org/2000/svg"
      className={[...animationClasses, ...colorClasses, className].filter(Boolean).join(" ")}
      style={styles}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      {...rest}
    >
      {title && <title>{title}</title>}
      {description && <desc>{description}</desc>}
      {isDuotone && secondaryColor && (
        <defs>
          <linearGradient id="duotone-AttachmentIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-AttachmentIcon)` : undefined}>
        
  <path
    d="M12.6889 1.47821C14.2332 -0.313652 16.6983 -0.478798 18.4099 0.995505L18.4467 0.957781L18.8484 1.42963L19.1666 1.77265L19.1333 1.80658C20.3241 3.55001 20.2866 5.97638 19.0286 7.69212L18.865 7.90279L18.6928 8.09961L9.23233 18.3105C7.19333 20.5112 3.92643 20.5597 1.83094 18.4694L1.638 18.2672L1.56638 18.1884C-0.433749 15.9863 -0.521457 12.4601 1.3209 10.1446L1.50522 9.92439L8.68576 1.76587C9.09312 1.30303 9.7783 1.28492 10.2067 1.72635C10.5902 2.12149 10.6356 2.74956 10.3341 3.19964L10.2432 3.31767L3.06269 11.4762C1.86163 12.8409 1.82707 15.0168 2.94797 16.4307L3.10073 16.6107L3.17234 16.6895C4.37058 18.0088 6.28396 18.0744 7.55126 16.8797L7.71278 16.7167L17.1733 6.50581C17.9954 5.61852 18.0895 4.20181 17.4451 3.19875L17.2318 2.91975L17.1811 2.8651C16.4627 2.15805 15.4579 2.08182 14.6865 2.62294L14.5355 2.73939L14.3917 2.87228L14.2615 3.01258L5.29286 13.4191C5.16519 13.5672 5.1534 13.7904 5.25248 13.9519L5.31123 14.0269L5.52841 14.246C5.65499 14.3737 5.83819 14.3858 5.97473 14.286L6.03863 14.2267L13.0142 6.13292C13.4169 5.66565 14.1018 5.63977 14.5346 6.07645C14.922 6.46735 14.9735 7.0949 14.6765 7.54828L14.5868 7.6673L7.61128 15.7611C6.71279 16.8036 5.2236 16.9074 4.2087 16.032L4.06015 15.8933L3.84296 15.6742C2.88917 14.7118 2.79263 13.1374 3.58732 12.0519L3.72021 11.8847L12.6889 1.47821Z"
    />

      </g>
    </svg>
  );
};

export default AttachmentIcon;
