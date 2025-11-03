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

const TicketSearchingIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 110 76"
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
          <linearGradient id="duotone-TicketSearchingIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-TicketSearchingIcon)` : undefined}>
         <path fillRule="evenodd" clipRule="evenodd" d="M7.30708 0.197758C3.85944 0.818135 0.893871 3.62251 0.219297 6.90076C-0.0816838 8.36263 -0.0690086 25.2674 0.233691 26.0673C0.564963 26.9429 1.29282 27.2925 3.20183 27.4932C6.64023 27.8544 9.12457 29.0847 11.2024 31.4552C14.5508 35.2752 14.5508 40.6987 11.2024 44.5187C9.12457 46.8892 6.64023 48.1194 3.20183 48.4807C1.29282 48.6814 0.564963 49.031 0.233691 49.9065C-0.0683641 50.7051 -0.0816838 67.6049 0.218652 69.0878C0.89516 72.4276 3.86309 75.1561 7.51332 75.7939C9.08568 76.0687 100.914 76.0687 102.487 75.7939C106.137 75.1561 109.105 72.4276 109.781 69.0878C110.082 67.6049 110.069 50.7051 109.766 49.9065C109.435 49.031 108.707 48.6814 106.798 48.4807C103.36 48.1194 100.876 46.8892 98.7977 44.5187C95.4493 40.6987 95.4493 35.2752 98.7977 31.4552C100.876 29.0847 103.36 27.8544 106.798 27.4932C108.707 27.2925 109.435 26.9429 109.766 26.0673C110.069 25.2688 110.082 8.36896 109.781 6.88612C109.105 3.5463 106.137 0.81774 102.487 0.179943C101.049 -0.0712559 8.70607 -0.0540349 7.30708 0.197758ZM31.4221 8.68648L32.0129 9.29042V12.4392V15.588L31.3519 16.1971C30.447 17.0309 29.2998 17.043 28.3105 16.2292L27.6088 15.652L27.5388 12.7431C27.4604 9.48007 27.6142 8.86859 28.6658 8.26148C29.5763 7.73592 30.6547 7.9022 31.4221 8.68648ZM31.4221 26.1061C32.0095 26.7065 32.0129 26.7263 32.0129 29.5924V32.4748L31.385 33.0534C30.2216 34.1253 28.2514 33.7738 27.7324 32.4018C27.3682 31.4393 27.4359 27.1968 27.8265 26.501C28.5554 25.2019 30.3452 25.0053 31.4221 26.1061ZM31.5295 43.0422C31.9828 43.5199 32.0129 43.7293 32.0129 46.3957C32.0129 49.1585 31.9972 49.2571 31.4629 49.842C30.4313 50.9715 28.5614 50.7825 27.8273 49.4746C27.3955 48.7054 27.3691 44.4021 27.7904 43.4737C28.4091 42.1102 30.4244 41.8777 31.5295 43.0422ZM31.3519 59.7768L32.0129 60.3858V63.3246V66.2634L31.3519 66.8725C30.4468 67.7065 29.2996 67.7183 28.3105 66.904L27.6088 66.3263V63.3246V60.3229L28.3105 59.7453C29.2996 58.9309 30.4468 58.9428 31.3519 59.7768Z" /> <path d="M61.2678 45.1818V44.9773C61.2905 42.8068 61.5178 41.0795 61.9496 39.7955C62.3814 38.5114 62.995 37.4716 63.7905 36.6761C64.5859 35.8807 65.5405 35.1477 66.6541 34.4773C67.3246 34.0682 67.9268 33.5852 68.4609 33.0284C68.995 32.4602 69.4155 31.8068 69.7223 31.0682C70.0405 30.3295 70.1996 29.5114 70.1996 28.6136C70.1996 27.5 69.9382 26.5341 69.4155 25.7159C68.8928 24.8977 68.1939 24.267 67.3189 23.8239C66.4439 23.3807 65.4723 23.1591 64.4041 23.1591C63.4723 23.1591 62.5746 23.3523 61.7109 23.7386C60.8473 24.125 60.1257 24.733 59.5462 25.5625C58.9666 26.392 58.6314 27.4773 58.5405 28.8182H54.245C54.3359 26.8864 54.8359 25.233 55.745 23.858C56.6655 22.483 57.8757 21.4318 59.3757 20.7045C60.8871 19.9773 62.5632 19.6136 64.4041 19.6136C66.4041 19.6136 68.1428 20.0114 69.62 20.8068C71.1087 21.6023 72.2564 22.6932 73.0632 24.0795C73.8814 25.4659 74.2905 27.0455 74.2905 28.8182C74.2905 30.0682 74.0973 31.1989 73.7109 32.2102C73.3359 33.2216 72.7905 34.125 72.0746 34.9205C71.37 35.7159 70.5178 36.4205 69.5178 37.0341C68.5178 37.6591 67.7166 38.3182 67.1143 39.0114C66.5121 39.6932 66.0746 40.5057 65.8018 41.4489C65.5291 42.392 65.3814 43.5682 65.3587 44.9773V45.1818H61.2678ZM63.4496 55.2727C62.6087 55.2727 61.8871 54.9716 61.2848 54.3693C60.6825 53.767 60.3814 53.0455 60.3814 52.2045C60.3814 51.3636 60.6825 50.642 61.2848 50.0398C61.8871 49.4375 62.6087 49.1364 63.4496 49.1364C64.2905 49.1364 65.0121 49.4375 65.6143 50.0398C66.2166 50.642 66.5178 51.3636 66.5178 52.2045C66.5178 52.7614 66.3757 53.2727 66.0916 53.7386C65.8189 54.2045 65.4496 54.5795 64.9837 54.8636C64.5291 55.1364 64.0178 55.2727 63.4496 55.2727Z" /> 
      </g>
    </svg>
  );
};

export default TicketSearchingIcon;
