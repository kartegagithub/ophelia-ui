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

const WhatsappIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 60 60"
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
          <linearGradient id="duotone-WhatsappIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-WhatsappIcon)` : undefined}>
         <ellipse cx="30" cy="30" rx="30" ry="30" /> <path d="M13.8462 46.1534L16.1661 37.5422C14.2951 34.1876 13.7007 30.2732 14.4919 26.5172C15.2831 22.7611 17.4068 19.4154 20.4733 17.0939C23.5398 14.7725 27.3434 13.6311 31.1862 13.8791C35.029 14.1271 38.6531 15.7479 41.3936 18.4441C44.1341 21.1403 45.8072 24.731 46.1057 28.5574C46.4042 32.3838 45.3083 36.1891 43.0189 39.2751C40.7295 42.3612 37.4003 44.5209 33.6422 45.3579C29.8841 46.195 25.9491 45.6533 22.5594 43.8322L13.8462 46.1534ZM22.9796 40.6098L23.5184 40.9284C25.9737 42.3788 28.8413 42.979 31.6746 42.6355C34.5078 42.2919 37.1475 41.024 39.1821 39.0291C41.2168 37.0343 42.5323 34.4247 42.9235 31.607C43.3147 28.7893 42.7597 25.9217 41.345 23.4512C39.9302 20.9807 37.7353 19.046 35.1021 17.9486C32.4689 16.8512 29.5455 16.6527 26.7873 17.3841C24.0291 18.1155 21.5912 19.7357 19.8534 21.9923C18.1156 24.2488 17.1756 27.0148 17.1799 29.8594C17.1776 32.218 17.832 34.531 19.0705 36.5409L19.4084 37.0961L18.1115 41.9024L22.9796 40.6098Z"/> <path fillRule="evenodd" clipRule="evenodd" d="M36.1684 32.2457C35.8389 32.0001 35.4531 31.8273 35.0403 31.7403C34.6276 31.6534 34.1988 31.6546 33.7867 31.7439C33.1674 31.9816 32.7673 32.8795 32.3671 33.3285C32.2828 33.4361 32.1588 33.5116 32.0185 33.5408C31.8781 33.57 31.7311 33.5508 31.605 33.487C29.3379 32.6665 27.4376 31.1618 26.2128 29.2174C26.1083 29.096 26.0588 28.942 26.0748 28.7876C26.0908 28.6333 26.171 28.4907 26.2985 28.3899C26.7448 27.9816 27.0724 27.476 27.2512 26.9197C27.2909 26.3061 27.1388 25.6949 26.8129 25.159C26.5611 24.4077 26.0817 23.7387 25.4315 23.2311C25.0962 23.0917 24.7244 23.045 24.3609 23.0966C23.9975 23.1481 23.6579 23.2957 23.3833 23.5216C22.9064 23.9018 22.5279 24.3759 22.2756 24.9092C22.0234 25.4424 21.9038 26.0212 21.9256 26.6028C21.9271 26.9294 21.9719 27.2546 22.059 27.5711C22.2802 28.3317 22.6204 29.0583 23.0689 29.728C23.3924 30.2409 23.7454 30.7376 24.1264 31.2157C25.3644 32.7862 26.9207 34.1196 28.7088 35.142C29.6061 35.6615 30.5651 36.0839 31.5669 36.4009C32.6075 36.8368 33.7565 37.0041 34.8918 36.8851C35.5386 36.7946 36.1515 36.5586 36.6764 36.1978C37.2014 35.8371 37.6224 35.3627 37.9023 34.8163C38.0668 34.4862 38.1167 34.1172 38.0452 33.7599C37.8737 33.0292 36.8162 32.5978 36.1684 32.2457Z"/> 
      </g>
    </svg>
  );
};

export default WhatsappIcon;
