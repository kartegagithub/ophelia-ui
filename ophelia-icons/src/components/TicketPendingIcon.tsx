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

const TicketPendingIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 110 76"
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
          <linearGradient id="duotone-TicketPendingIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-TicketPendingIcon)` : undefined}>
         <path fillRule="evenodd" clipRule="evenodd" d="M7.30708 0.197758C3.85944 0.818135 0.893871 3.62251 0.219297 6.90076C-0.0816838 8.36263 -0.0690086 25.2674 0.233691 26.0673C0.564963 26.9429 1.29282 27.2925 3.20183 27.4932C6.64023 27.8544 9.12457 29.0847 11.2024 31.4552C14.5508 35.2752 14.5508 40.6987 11.2024 44.5187C9.12457 46.8892 6.64023 48.1194 3.20183 48.4807C1.29282 48.6814 0.564963 49.031 0.233691 49.9065C-0.0683641 50.7051 -0.0816838 67.6049 0.218652 69.0878C0.89516 72.4276 3.86309 75.1561 7.51332 75.7939C9.08568 76.0687 100.914 76.0687 102.487 75.7939C106.137 75.1561 109.105 72.4276 109.781 69.0878C110.082 67.6049 110.069 50.7051 109.766 49.9065C109.435 49.031 108.707 48.6814 106.798 48.4807C103.36 48.1194 100.876 46.8892 98.7977 44.5187C95.4493 40.6987 95.4493 35.2752 98.7977 31.4552C100.876 29.0847 103.36 27.8544 106.798 27.4932C108.707 27.2925 109.435 26.9429 109.766 26.0673C110.069 25.2688 110.082 8.36896 109.781 6.88612C109.105 3.5463 106.137 0.81774 102.487 0.179943C101.049 -0.0712559 8.70607 -0.0540349 7.30708 0.197758ZM31.4221 8.68648L32.0129 9.29042V12.4392V15.588L31.3519 16.1971C30.447 17.0309 29.2998 17.043 28.3105 16.2292L27.6088 15.652L27.5388 12.7431C27.4604 9.48007 27.6142 8.86859 28.6658 8.26148C29.5763 7.73592 30.6547 7.9022 31.4221 8.68648ZM31.4221 26.1061C32.0095 26.7065 32.0129 26.7263 32.0129 29.5924V32.4748L31.385 33.0534C30.2216 34.1253 28.2514 33.7738 27.7324 32.4018C27.3682 31.4393 27.4359 27.1968 27.8265 26.501C28.5554 25.2019 30.3452 25.0053 31.4221 26.1061ZM31.5295 43.0422C31.9828 43.5199 32.0129 43.7293 32.0129 46.3957C32.0129 49.1585 31.9972 49.2571 31.4629 49.842C30.4313 50.9715 28.5614 50.7825 27.8273 49.4746C27.3955 48.7054 27.3691 44.4021 27.7904 43.4737C28.4091 42.1102 30.4244 41.8777 31.5295 43.0422ZM31.3519 59.7768L32.0129 60.3858V63.3246V66.2634L31.3519 66.8725C30.4468 67.7065 29.2996 67.7183 28.3105 66.904L27.6088 66.3263V63.3246V60.3229L28.3105 59.7453C29.2996 58.9309 30.4468 58.9428 31.3519 59.7768Z" /> <path fillRule="evenodd" clipRule="evenodd" d="M66.7618 22.0517C64.5543 22.3033 62.7072 22.8373 61.0702 23.697C57.0424 25.8123 53.6217 30.2317 52.4472 34.8376C52.1092 36.163 52 37.0902 52 38.6342C52 41.1156 52.4917 43.4048 53.5706 45.9462C55.376 50.1992 58.711 53.2928 63.1264 54.8105C64.2168 55.1853 64.8383 55.3358 66.4301 55.6105C67.2192 55.7468 67.879 55.8728 67.8963 55.8906C67.9135 55.9084 68.021 56.4205 68.1351 57.0285C68.3633 58.2445 68.5258 58.6364 68.9012 58.8756C69.2086 59.0716 69.7076 59.0321 70.0564 58.7841C70.1927 58.6873 71.4637 57.5524 72.881 56.2622C74.6467 54.6546 75.4961 53.8335 75.5793 53.6536C75.8366 53.0968 75.6758 52.4765 75.1956 52.1747C75.0653 52.0927 73.814 51.615 72.4148 51.1129C71.0157 50.611 69.5001 50.0655 69.0469 49.9009C68.0498 49.5386 67.7738 49.5487 67.3437 49.9633C66.9284 50.3637 66.9148 50.5515 67.194 52.0228C67.3255 52.7152 67.4331 53.2895 67.4331 53.299C67.4331 53.3953 65.3677 53.0392 64.5416 52.8004C60.1061 51.5184 56.5228 48.0055 55.0736 43.5183C54.4871 41.7024 54.325 40.511 54.381 38.4279C54.426 36.7507 54.5899 35.7567 55.0624 34.2968C56.6664 29.3404 60.7254 25.6719 65.8431 24.5533C66.6953 24.3671 66.8819 24.3525 68.4224 24.3515C69.7354 24.3506 70.2234 24.3781 70.7542 24.4826C71.9018 24.7086 72.2341 24.7147 72.5191 24.515C73.0839 24.1192 73.2461 23.4731 72.926 22.8948C72.7154 22.5144 72.3902 22.3547 71.4768 22.1833C70.6084 22.0204 67.7392 21.9403 66.7618 22.0517ZM76.5736 24.3774C76.3185 24.4969 76.2145 24.6287 75.7701 25.3955C75.1691 26.4322 75.0954 26.7487 75.3609 27.1518C75.7371 27.7229 76.4331 27.7441 76.8313 27.1967C76.8896 27.1166 77.136 26.7062 77.3789 26.2849C77.7532 25.6356 77.8206 25.4664 77.8206 25.1751C77.8206 24.7515 77.5833 24.4228 77.1977 24.3124C76.8737 24.2196 76.9211 24.2147 76.5736 24.3774ZM80.4704 28.1869C80.2116 28.3371 78.9883 29.4305 78.8633 29.6235C78.607 30.019 78.7637 30.694 79.1608 30.9058C79.4068 31.037 79.8179 31.0497 80.0335 30.9327C80.3088 30.7832 81.4552 29.7744 81.6187 29.5376C81.7256 29.3828 81.7777 29.2025 81.7777 28.987C81.7777 28.712 81.7388 28.6265 81.5034 28.3835C81.2672 28.1399 81.186 28.1008 80.9204 28.1027C80.7506 28.1039 80.5482 28.1419 80.4704 28.1869ZM73.2275 32.0166C73.0914 32.0855 72.2488 32.8819 71.3549 33.7863C69.7893 35.3702 68.8505 36.2549 68.5842 36.3973C68.5146 36.4345 68.2306 36.481 67.9529 36.5005C66.8685 36.5769 66.106 37.2756 65.8812 38.3993C65.6811 39.3995 66.2596 40.5092 67.2125 40.9534C67.6774 41.1701 68.5451 41.1707 69.0001 40.9546C69.8211 40.5647 70.3427 39.7325 70.3427 38.8127C70.3427 38.3403 70.3636 38.2736 70.6791 37.7378C71.2422 36.7813 72.4816 35.0743 73.8237 33.4067C74.2641 32.8596 74.3217 32.5218 74.0304 32.1958C73.7742 31.9089 73.5418 31.8571 73.2275 32.0166ZM82.3077 33.3768C81.3159 33.7725 81.2332 33.8206 81.0675 34.101C80.8927 34.3969 80.8926 34.7839 81.0673 35.0573C81.3827 35.5509 81.8244 35.5813 82.8594 35.1802C83.2611 35.0245 83.6903 34.8435 83.8132 34.778C84.3873 34.4717 84.3973 33.4712 83.8293 33.1681C83.5029 32.9941 83.1441 33.0433 82.3077 33.3768ZM81.9835 38.764C81.3474 39.2062 81.4439 40.103 82.1579 40.3842C82.6067 40.5611 84.2579 40.481 84.6011 40.2657C85.0843 39.9625 85.1374 39.279 84.7117 38.8398L84.477 38.5977H83.3498C82.2935 38.5977 82.2076 38.6082 81.9835 38.764ZM81.1004 43.5855C80.751 43.7424 80.5764 44.0293 80.5764 44.4467C80.5764 45.0028 80.8153 45.2052 81.9191 45.5842C82.8757 45.9126 83.1564 45.9473 83.476 45.7769C83.8664 45.5686 84.0177 44.9535 83.7901 44.4995C83.6561 44.2322 83.3685 44.0804 82.362 43.7458C81.4833 43.4536 81.4137 43.4448 81.1004 43.5855ZM78.4476 47.9056C78.0289 48.1736 77.9102 48.7642 78.1832 49.2199C78.2876 49.3941 78.3729 49.4609 78.4606 49.4372C78.5394 49.416 78.575 49.4361 78.5548 49.4904C78.5155 49.596 79.5592 50.445 79.9188 50.6C80.2507 50.743 80.5725 50.6791 80.8028 50.4245C81.3818 49.7839 81.25 49.3735 80.1924 48.5234C79.8012 48.2089 79.4117 47.9137 79.3268 47.8672C79.107 47.747 78.6651 47.7663 78.4476 47.9056Z" /> 
      </g>
    </svg>
  );
};

export default TicketPendingIcon;
