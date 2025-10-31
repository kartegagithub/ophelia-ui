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

const PngIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 49 48"
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
          <linearGradient id="duotone-PngIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-PngIcon)` : undefined}>
        <path d="M12.05 27H9.05005C8.65222 27 8.27069 27.158 7.98939 27.4393C7.70808 27.7206 7.55005 28.1022 7.55005 28.5V39C7.55005 39.3978 7.70808 39.7794 7.98939 40.0607C8.27069 40.342 8.65222 40.5 9.05005 40.5C9.44787 40.5 9.8294 40.342 10.1107 40.0607C10.392 39.7794 10.55 39.3978 10.55 39V37.5H12.05C13.4424 37.5 14.7778 36.9469 15.7624 35.9623C16.7469 34.9777 17.3 33.6424 17.3 32.25C17.3 30.8576 16.7469 29.5223 15.7624 28.5377C14.7778 27.5531 13.4424 27 12.05 27ZM12.05 34.5H10.55V30H12.05C12.6468 30 13.2191 30.2371 13.641 30.659C14.063 31.081 14.3 31.6533 14.3 32.25C14.3 32.8467 14.063 33.419 13.641 33.841C13.2191 34.2629 12.6468 34.5 12.05 34.5ZM42.8 37.6631C42.8 38.0495 42.6509 38.4209 42.3838 38.7C41.8615 39.2622 41.2299 39.7119 40.5277 40.0214C39.8255 40.3309 39.0674 40.4938 38.3 40.5C34.9907 40.5 32.3 37.4719 32.3 33.75C32.3 30.0281 34.9907 27 38.3 27C39.4026 27.0037 40.4788 27.3374 41.39 27.9581C41.72 28.1819 41.9475 28.5276 42.0226 28.9191C42.0977 29.3107 42.0141 29.716 41.7904 30.0459C41.5666 30.3759 41.2209 30.6034 40.8294 30.6785C40.4378 30.7536 40.0325 30.67 39.7025 30.4463C39.2911 30.1588 38.802 30.0032 38.3 30C36.6463 30 35.3 31.6875 35.3 33.75C35.3 35.8125 36.6463 37.5 38.3 37.5C38.8416 37.494 39.3671 37.3153 39.8 36.99V36C39.4022 36 39.0207 35.842 38.7394 35.5607C38.4581 35.2794 38.3 34.8978 38.3 34.5C38.3 34.1022 38.4581 33.7206 38.7394 33.4393C39.0207 33.158 39.4022 33 39.8 33H41.3C41.6979 33 42.0794 33.158 42.3607 33.4393C42.642 33.7206 42.8 34.1022 42.8 34.5V37.6631ZM30.05 28.5V39C30.0501 39.3179 29.9491 39.6276 29.7618 39.8844C29.5744 40.1412 29.3103 40.3318 29.0075 40.4287C28.8597 40.4763 28.7053 40.5003 28.55 40.5C28.3113 40.5 28.076 40.443 27.8637 40.3338C27.6514 40.2245 27.4682 40.0662 27.3294 39.8719L22.55 33.1875V39C22.55 39.3978 22.392 39.7794 22.1107 40.0607C21.8294 40.342 21.4479 40.5 21.05 40.5C20.6522 40.5 20.2707 40.342 19.9894 40.0607C19.7081 39.7794 19.55 39.3978 19.55 39V28.5C19.55 28.1822 19.651 27.8726 19.8383 27.6158C20.0256 27.3591 20.2896 27.1685 20.5923 27.0715C20.8949 26.9745 21.2206 26.9762 21.5222 27.0762C21.8239 27.1762 22.086 27.3695 22.2707 27.6281L27.05 34.3125V28.5C27.05 28.1022 27.2081 27.7206 27.4894 27.4393C27.7707 27.158 28.1522 27 28.55 27C28.9479 27 29.3294 27.158 29.6107 27.4393C29.892 27.7206 30.05 28.1022 30.05 28.5ZM9.80005 22.5C10.1979 22.5 10.5794 22.342 10.8607 22.0607C11.142 21.7794 11.3 21.3978 11.3 21V7.5H27.8V16.5C27.8 16.8978 27.9581 17.2794 28.2394 17.5607C28.5207 17.842 28.9022 18 29.3 18H38.3V21C38.3 21.3978 38.4581 21.7794 38.7394 22.0607C39.0207 22.342 39.4022 22.5 39.8 22.5C40.1979 22.5 40.5794 22.342 40.8607 22.0607C41.142 21.7794 41.3 21.3978 41.3 21V16.5C41.3002 16.303 41.2615 16.1078 41.1863 15.9257C41.111 15.7436 41.0005 15.5782 40.8613 15.4388L30.3613 4.93875C30.2219 4.7995 30.0564 4.68908 29.8743 4.6138C29.6922 4.53851 29.4971 4.49985 29.3 4.5H11.3C10.5044 4.5 9.74134 4.81607 9.17873 5.37868C8.61612 5.94129 8.30005 6.70435 8.30005 7.5V21C8.30005 21.3978 8.45808 21.7794 8.73939 22.0607C9.02069 22.342 9.40222 22.5 9.80005 22.5ZM30.8 9.62063L36.1794 15H30.8V9.62063Z"/>
      </g>
    </svg>
  );
};

export default PngIcon;
