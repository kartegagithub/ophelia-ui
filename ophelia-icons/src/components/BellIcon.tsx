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

const BellIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 24 24"
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
          <linearGradient id="duotone-BellIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-BellIcon)` : undefined}>
         <g clipPath="url(#clip0_2997_624)"> <path d="M11.2399 2.20099C11.2319 1.72599 11.2289 1.25099 11.2519 0.77599C11.265 0.582011 11.3528 0.400646 11.4967 0.269948C11.6406 0.13925 11.8296 0.0693774 12.0239 0.0749903C12.2139 0.0826112 12.394 0.161412 12.5285 0.295733C12.663 0.430054 12.7421 0.610064 12.7499 0.79999C12.7569 1.26699 12.7689 1.73499 12.7649 2.20199C13.2749 2.24699 13.7799 2.33599 14.2739 2.47299C15.7569 2.88599 17.1369 3.72699 18.0949 4.94199C18.3249 5.23299 18.5279 5.54299 18.7009 5.87099C18.8969 6.24199 19.0529 6.63399 19.1619 7.03899C19.2589 7.39699 19.3189 7.76499 19.3409 8.13599C19.3569 8.40199 19.3519 8.66999 19.3349 8.93699C19.3079 9.36099 19.2369 9.77999 19.1869 10.201C19.1769 10.294 19.1689 10.386 19.1609 10.478C19.1389 10.829 19.1499 11.178 19.1999 11.527C19.2249 11.696 19.2549 11.865 19.3039 12.029C19.3859 12.304 19.5089 12.566 19.6469 12.817C19.8209 13.131 20.0229 13.43 20.2359 13.719C20.8779 14.589 21.6269 15.37 22.3379 16.182C22.4449 16.306 22.5509 16.431 22.6539 16.559C22.8679 16.831 23.0589 17.125 23.1909 17.447C23.2639 17.624 23.3139 17.811 23.3229 18.002C23.3319 18.17 23.3089 18.337 23.2669 18.499C23.2238 18.669 23.1597 18.8329 23.0759 18.987C22.9162 19.2675 22.7032 19.5141 22.4489 19.713C22.0953 19.9899 21.7049 20.2164 21.2889 20.386C21.1019 20.466 20.9109 20.538 20.7179 20.605C20.4499 20.697 20.1779 20.777 19.9039 20.849C19.532 20.9451 19.1568 21.0279 18.7789 21.097C17.7919 21.281 16.7909 21.391 15.7899 21.465C15.4349 21.491 15.0799 21.512 14.7239 21.529C14.6876 21.856 14.5917 22.1735 14.4409 22.466C14.1166 23.1046 13.5545 23.5904 12.8757 23.8189C12.1969 24.0474 11.4555 24.0004 10.8109 23.688C10.4625 23.5184 10.1535 23.2777 9.90386 22.9812C9.65426 22.6848 9.46965 22.3393 9.36195 21.967C9.32178 21.8235 9.29302 21.677 9.27595 21.529C8.92036 21.5122 8.56499 21.4908 8.20995 21.465C7.2076 21.3974 6.20974 21.2746 5.22095 21.097C4.84309 21.0279 4.46785 20.9451 4.09595 20.849C3.82171 20.7777 3.55019 20.6963 3.28195 20.605C3.08911 20.5387 2.89866 20.4656 2.71095 20.386C2.29499 20.2164 1.9046 19.9899 1.55095 19.713C1.29669 19.5141 1.0837 19.2675 0.923946 18.987C0.84021 18.8329 0.776047 18.669 0.732946 18.499C0.68887 18.3372 0.669982 18.1695 0.676946 18.002C0.685946 17.811 0.735946 17.624 0.808946 17.447C0.904946 17.211 1.03595 16.985 1.18195 16.777C1.36295 16.519 1.57395 16.281 1.78195 16.044C2.10495 15.679 2.43395 15.319 2.75595 14.953C2.90495 14.782 2.90495 14.782 3.05195 14.61C3.43795 14.151 3.81595 13.683 4.13795 13.176C4.36595 12.818 4.57395 12.438 4.69595 12.029C4.74495 11.865 4.77495 11.696 4.79995 11.527C4.86355 11.0876 4.86792 10.6416 4.81295 10.201C4.77895 9.91999 4.73695 9.63999 4.70295 9.35799C4.66145 9.00593 4.64441 8.65141 4.65195 8.29699C4.66195 7.95099 4.70495 7.60599 4.78095 7.26899C4.87295 6.85899 5.01195 6.45999 5.19295 6.08199C5.35195 5.74899 5.54295 5.43099 5.75995 5.13299C6.68395 3.86499 8.06195 2.97299 9.55495 2.52299C10.1042 2.35853 10.6688 2.25064 11.2399 2.20099ZM13.1879 21.579C12.396 21.593 11.6039 21.593 10.8119 21.579C10.8968 21.8511 11.0713 22.0866 11.3069 22.247C11.6239 22.462 12.0349 22.517 12.3979 22.394C12.5844 22.3298 12.7531 22.2225 12.8903 22.0809C13.0276 21.9393 13.1296 21.7674 13.1879 21.579ZM11.9999 3.66699C11.3674 3.66473 10.7375 3.74918 10.1279 3.91799C9.92039 3.9759 9.71581 4.04398 9.51495 4.12199C8.26595 4.60599 7.13095 5.50199 6.54595 6.72799C6.32842 7.17894 6.19748 7.66672 6.15995 8.16599C6.14511 8.39044 6.14578 8.61564 6.16195 8.83999C6.18695 9.23999 6.25595 9.63499 6.30295 10.033C6.3706 10.6011 6.36421 11.1755 6.28395 11.742C6.25115 11.9843 6.20068 12.224 6.13295 12.459C5.92195 13.163 5.54095 13.807 5.11895 14.404C4.42395 15.389 3.58695 16.261 2.79395 17.165C2.70091 17.2735 2.60923 17.3832 2.51895 17.494C2.42595 17.612 2.34295 17.734 2.27095 17.865C2.23041 17.9317 2.19849 18.0033 2.17595 18.078C2.18095 18.115 2.19295 18.15 2.20495 18.185C2.26195 18.345 2.38895 18.465 2.52095 18.568C2.78695 18.777 3.09895 18.926 3.40995 19.052C3.70837 19.1715 4.01356 19.2733 4.32395 19.357C4.53495 19.415 4.74795 19.467 4.96195 19.514C5.26495 19.581 5.56895 19.638 5.87495 19.689C6.76863 19.8315 7.66868 19.9306 8.57195 19.986C9.71295 20.063 10.8569 20.089 11.9999 20.089C13.0579 20.0918 14.1157 20.0632 15.1719 20.003C15.9561 19.9577 16.7383 19.8833 17.5169 19.78C17.8469 19.735 18.1769 19.683 18.5049 19.622C18.7399 19.579 18.9729 19.53 19.2049 19.476C19.4129 19.428 19.6189 19.374 19.8229 19.315C20.121 19.2314 20.4133 19.1285 20.6979 19.007C20.9629 18.894 21.2239 18.762 21.4539 18.588C21.5699 18.5 21.6889 18.396 21.7609 18.267C21.7847 18.2195 21.8032 18.1695 21.8159 18.118C21.8179 18.108 21.8269 18.088 21.8239 18.078C21.7969 17.972 21.7359 17.873 21.6809 17.78C21.5469 17.557 21.3759 17.361 21.2059 17.165C20.8469 16.753 20.4769 16.351 20.1159 15.942C19.9589 15.762 19.9589 15.762 19.8039 15.581C19.3469 15.037 18.9019 14.48 18.5289 13.874C18.2729 13.4708 18.0645 13.0392 17.9079 12.588C17.775 12.1688 17.6938 11.7349 17.6659 11.296C17.6406 10.9493 17.6433 10.6012 17.6739 10.255C17.7079 9.86899 17.7739 9.48699 17.8159 9.10199C17.8468 8.83016 17.8572 8.55638 17.8469 8.28299C17.8203 7.72406 17.6776 7.17679 17.4279 6.67599C17.3045 6.42717 17.1586 6.19018 16.9919 5.96799C16.1999 4.90999 14.9999 4.20399 13.7309 3.88099C13.165 3.73859 12.5836 3.66671 11.9999 3.66699Z" /> </g> <defs> <clipPath id="BellIcon-clip0_2997_624"> <rect width="24" height="24" /> </clipPath> </defs>

      </g>
    </svg>
  );
};

export default BellIcon;
