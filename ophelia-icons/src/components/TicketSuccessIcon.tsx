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

const TicketSuccessIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-TicketSuccessIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-TicketSuccessIcon)` : undefined}>
         <path fillRule="evenodd" clipRule="evenodd" d="M7.30708 0.197758C3.85944 0.818135 0.893871 3.62251 0.219297 6.90076C-0.0816838 8.36263 -0.0690086 25.2674 0.233691 26.0673C0.564963 26.9429 1.29282 27.2925 3.20183 27.4932C6.64023 27.8544 9.12457 29.0847 11.2024 31.4552C14.5508 35.2752 14.5508 40.6987 11.2024 44.5187C9.12457 46.8892 6.64023 48.1194 3.20183 48.4807C1.29282 48.6814 0.564963 49.031 0.233691 49.9065C-0.0683641 50.7051 -0.0816838 67.6049 0.218652 69.0878C0.89516 72.4276 3.86309 75.1561 7.51332 75.7939C9.08568 76.0687 100.914 76.0687 102.487 75.7939C106.137 75.1561 109.105 72.4276 109.781 69.0878C110.082 67.6049 110.069 50.7051 109.766 49.9065C109.435 49.031 108.707 48.6814 106.798 48.4807C103.36 48.1194 100.876 46.8892 98.7977 44.5187C95.4493 40.6987 95.4493 35.2752 98.7977 31.4552C100.876 29.0847 103.36 27.8544 106.798 27.4932C108.707 27.2925 109.435 26.9429 109.766 26.0673C110.069 25.2688 110.082 8.36896 109.781 6.88612C109.105 3.5463 106.137 0.81774 102.487 0.179943C101.049 -0.0712559 8.70607 -0.0540349 7.30708 0.197758ZM31.4221 8.68648L32.0129 9.29042V12.4392V15.588L31.3519 16.1971C30.447 17.0309 29.2998 17.043 28.3105 16.2292L27.6088 15.652L27.5388 12.7431C27.4604 9.48007 27.6142 8.86859 28.6658 8.26148C29.5763 7.73592 30.6547 7.9022 31.4221 8.68648ZM31.4221 26.1061C32.0095 26.7065 32.0129 26.7263 32.0129 29.5924V32.4748L31.385 33.0534C30.2216 34.1253 28.2514 33.7738 27.7324 32.4018C27.3682 31.4393 27.4359 27.1968 27.8265 26.501C28.5554 25.2019 30.3452 25.0053 31.4221 26.1061ZM31.5295 43.0422C31.9828 43.5199 32.0129 43.7293 32.0129 46.3957C32.0129 49.1585 31.9972 49.2571 31.4629 49.842C30.4313 50.9715 28.5614 50.7825 27.8273 49.4746C27.3955 48.7054 27.3691 44.4021 27.7904 43.4737C28.4091 42.1102 30.4244 41.8777 31.5295 43.0422ZM31.3519 59.7768L32.0129 60.3858V63.3246V66.2634L31.3519 66.8725C30.4468 67.7065 29.2996 67.7183 28.3105 66.904L27.6088 66.3263V63.3246V60.3229L28.3105 59.7453C29.2996 58.9309 30.4468 58.9428 31.3519 59.7768Z" /> <path fillRule="evenodd" clipRule="evenodd" d="M89.2986 21.2425C85.6664 21.7974 81.9646 23.1518 78.3381 25.2528C77.4458 25.7697 76.398 26.4184 76.0094 26.6945C75.6209 26.9705 74.9481 27.4439 74.5145 27.7464C73.0271 28.7837 70.1537 31.4264 68.2818 33.4789C65.3508 36.6923 62.5316 40.9622 60.9182 44.6318L60.7312 45.0571L60.6539 44.7381C60.288 43.2265 59.6163 41.7588 58.8292 40.7514C56.9146 38.3008 54.3163 36.9574 51.9344 37.1867C50.938 37.2826 50.194 37.6279 49.344 38.389C48.737 38.9324 48 40.002 48 40.3393C48 40.3906 48.2701 40.4324 48.6002 40.4324C49.7064 40.4324 51.0968 40.8904 52.0846 41.58C52.6112 41.9476 53.7003 43.2478 54.2161 44.1247C54.5567 44.7036 55.4 46.6429 56.2029 48.6937C56.9007 50.476 57.8238 52.2959 58.3219 52.8711C58.9401 53.585 59.7465 54.2532 59.99 54.2532C60.3856 54.2532 62.0279 52.8043 63.0027 51.5954C64.3266 49.9535 65.0919 48.7692 67.8116 44.1534C69.1937 41.8078 71.1538 38.696 71.6275 38.0955C71.7881 37.8919 71.9196 37.6889 71.9196 37.6445C71.9196 37.6 72.3367 37.0012 72.8464 36.3136C76.4655 31.4328 80.0206 27.9029 84.3495 24.8917C85.9785 23.7588 89.073 21.9536 90.4668 21.3233C91.3947 20.9037 91.4785 20.9096 89.2986 21.2425Z" /> 
      </g>
    </svg>
  );
};

export default TicketSuccessIcon;
