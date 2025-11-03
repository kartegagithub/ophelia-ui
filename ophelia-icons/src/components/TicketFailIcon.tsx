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

const TicketFailIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-TicketFailIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-TicketFailIcon)` : undefined}>
         <path fillRule="evenodd" clipRule="evenodd" d="M7.30708 0.197758C3.85944 0.818135 0.893871 3.62251 0.219297 6.90076C-0.0816838 8.36263 -0.0690086 25.2674 0.233691 26.0673C0.564963 26.9429 1.29282 27.2925 3.20183 27.4932C6.64023 27.8544 9.12457 29.0847 11.2024 31.4552C14.5508 35.2752 14.5508 40.6987 11.2024 44.5187C9.12457 46.8892 6.64023 48.1194 3.20183 48.4807C1.29282 48.6814 0.564963 49.031 0.233691 49.9065C-0.0683641 50.7051 -0.0816838 67.6049 0.218652 69.0878C0.89516 72.4276 3.86309 75.1561 7.51332 75.7939C9.08568 76.0687 100.914 76.0687 102.487 75.7939C106.137 75.1561 109.105 72.4276 109.781 69.0878C110.082 67.6049 110.069 50.7051 109.766 49.9065C109.435 49.031 108.707 48.6814 106.798 48.4807C103.36 48.1194 100.876 46.8892 98.7977 44.5187C95.4493 40.6987 95.4493 35.2752 98.7977 31.4552C100.876 29.0847 103.36 27.8544 106.798 27.4932C108.707 27.2925 109.435 26.9429 109.766 26.0673C110.069 25.2688 110.082 8.36896 109.781 6.88612C109.105 3.5463 106.137 0.81774 102.487 0.179943C101.049 -0.0712559 8.70607 -0.0540349 7.30708 0.197758ZM31.4221 8.68648L32.0129 9.29042V12.4392V15.588L31.3519 16.1971C30.447 17.0309 29.2998 17.043 28.3105 16.2292L27.6088 15.652L27.5388 12.7431C27.4604 9.48007 27.6142 8.86859 28.6658 8.26148C29.5763 7.73592 30.6547 7.9022 31.4221 8.68648ZM31.4221 26.1061C32.0095 26.7065 32.0129 26.7263 32.0129 29.5924V32.4748L31.385 33.0534C30.2216 34.1253 28.2514 33.7738 27.7324 32.4018C27.3682 31.4393 27.4359 27.1968 27.8265 26.501C28.5554 25.2019 30.3452 25.0053 31.4221 26.1061ZM31.5295 43.0422C31.9828 43.5199 32.0129 43.7293 32.0129 46.3957C32.0129 49.1585 31.9972 49.2571 31.4629 49.842C30.4313 50.9715 28.5614 50.7825 27.8273 49.4746C27.3955 48.7054 27.3691 44.4021 27.7904 43.4737C28.4091 42.1102 30.4244 41.8777 31.5295 43.0422ZM31.3519 59.7768L32.0129 60.3858V63.3246V66.2634L31.3519 66.8725C30.4468 67.7065 29.2996 67.7183 28.3105 66.904L27.6088 66.3263V63.3246V60.3229L28.3105 59.7453C29.2996 58.9309 30.4468 58.9428 31.3519 59.7768Z" /> <path fillRule="evenodd" clipRule="evenodd" d="M82.4532 22.1613C80.3736 22.5773 78.033 23.7667 75.331 25.7806C72.0611 28.2176 68.5128 31.5464 66.1448 34.3985C65.5238 35.1463 64.9753 35.7582 64.9256 35.7582C64.7891 35.7582 62.553 31.8088 60.9847 28.7981C60.2199 27.3299 59.3076 25.7171 58.9572 25.2143C58.1529 24.0599 57.0644 22.9484 56.304 22.5049C55.7884 22.2042 55.5931 22.1616 54.7308 22.1616C53.8446 22.1616 53.6959 22.1962 53.2396 22.5098C52.9609 22.7012 52.5679 23.1049 52.3664 23.4067C52.067 23.855 52 24.081 52 24.642C52 25.5138 52.0093 25.5309 54.9418 30.0174C56.2452 32.0116 57.6644 34.2142 58.0955 34.9122C58.5266 35.6102 59.4988 37.0398 60.2558 38.0891C61.0128 39.1385 61.5969 40.0535 61.554 40.1226C61.511 40.1916 60.9556 40.9646 60.3198 41.8403C59.6841 42.7162 58.7218 44.1398 58.1814 45.0039C57.641 45.8681 56.0972 48.2611 54.7505 50.3217C53.404 52.3824 52.2342 54.2205 52.1512 54.4064C52.068 54.5923 52 55.06 52 55.4458C52 56.0251 52.0604 56.2299 52.3473 56.6228C53.1175 57.6777 53.9756 58.088 55.1014 57.9398C55.9763 57.8247 56.771 57.3468 57.6838 56.3868C58.7685 55.246 59.6634 53.8557 61.0103 51.2184C61.9854 49.3089 63.5955 46.3811 64.5473 44.7865C64.6981 44.534 64.8904 44.3437 64.9745 44.3635C65.0587 44.3834 65.5313 44.8938 66.0248 45.498C69.9059 50.2487 76.3863 55.6177 80.0818 57.1441C82.5953 58.1823 84.842 58.2851 85.7315 57.4026C86.4151 56.7244 85.8225 56.0482 83.6198 54.9934C82.7853 54.5939 81.6744 53.9829 81.1511 53.6359C77.9681 51.5249 73.3398 47.2358 70.2028 43.4901C69.0843 42.1544 67.7139 40.2405 67.7139 40.0139C67.7139 39.8014 69.1446 37.7902 70.1159 36.6371C73.318 32.836 77.5939 28.8462 80.9306 26.546C81.4666 26.1765 82.6451 25.5108 83.5496 25.0669C84.454 24.6229 85.3721 24.0895 85.5899 23.8817C86.3053 23.1991 85.9974 22.5046 84.8238 22.1541C84.1287 21.9466 83.518 21.9484 82.4532 22.1613Z" /> 
      </g>
    </svg>
  );
};

export default TicketFailIcon;
