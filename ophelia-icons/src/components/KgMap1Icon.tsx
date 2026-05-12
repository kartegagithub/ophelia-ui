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

const KgMap1Icon: React.FC<IconProps> = ({
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

  /** strokeWidth prop ≈ ekranda px kalınlığı (varsayılan ikon ~24px); viewBox büyük gliflerde user-space stroke ince kalmasın diye ölçeklenir */
  const parseIconDim = (v: IconSize): number => {
    if (typeof v === "number" && !Number.isNaN(v)) return v;
    const n = parseFloat(String(v));
    return Number.isFinite(n) ? n : 24;
  };
  const rw = parseIconDim(w as IconSize);
  const rh = parseIconDim(h as IconSize);
  const renderDim = Math.max(Math.min(rw, rh), 0.001);
  const vbMaxDim = (() => {
    const p = "0 0 1024 1024".trim().split(/[\s,]+/).map(Number);
    return Math.max(p[2] ?? 24, p[3] ?? 24, 1);
  })();
  
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

  const baseStrokeNum =
    typeof strokeWidth === "number"
      ? strokeWidth
      : parseFloat(String(strokeWidth));
  const baseStroke = Number.isFinite(baseStrokeNum) ? baseStrokeNum : 1.5;
  const scaledStrokeWidth =
    isOutlined || isLinear ? (baseStroke * vbMaxDim) / renderDim : strokeWidth;
  
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 1024 1024"
      fill={fillValue}
      stroke={strokeValue}
      strokeWidth={scaledStrokeWidth}
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
          <linearGradient id="duotone-KgMap1Icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgMap1Icon)` : undefined}>
        <path d="M830.4128 99.4816c33.4336 26.2144 56.4736 68.5568 65.8944 112.896a24.2688 24.2688 0 0 1 3.328 1.3312l104.704 48.4352a33.7408 33.7408 0 0 1 19.6608 30.5664v633.1904a34.048 34.048 0 0 1-43.52 32.4608l-290.2528-81.92-345.088 95.1296a34.5088 34.5088 0 0 1-18.9952-0.2048L24.2688 881.5104a33.792 33.792 0 0 1-24.2688-32.256V204.6976c0-22.528 21.9136-38.7072 43.776-32.3584l291.9424 85.0432 148.3776-45.4144c2.048-0.6144 4.1472-1.024 6.2464-1.28 5.7344-33.5872 21.76-65.8432 48.64-97.28 31.8976-37.376 87.8592-59.2896 142.3872-61.9008 56.576-2.7136 99.7888 9.3696 148.992 47.9232zM68.2496 249.9072v574.208l249.344 74.1888V322.4576l-249.344-72.5504z m420.3008 31.4368l-102.7072 31.3856v577.4848l259.328-71.3728v-168.704c0-18.6368 15.3088-33.7408 34.1504-33.7408 18.8416 0 34.0992 15.104 34.0992 33.792v162.6624l242.3296 68.352V314.1632l-57.344-26.624c-0.9728 5.632-2.2016 11.1616-3.7376 16.5376A314.0608 314.0608 0 0 1 839.68 412.16l-126.8224 158.3616a34.304 34.304 0 0 1-54.9376-1.8944l-118.528-171.6736c-19.5584-27.3408-33.28-51.712-41.0112-73.5232a191.6928 191.6928 0 0 1-9.8304-42.0864z m196.096-162.3552c-37.1712 1.792-75.3664 16.7424-93.5424 37.9904-21.8624 25.6-32.6144 49.5616-34.7648 73.8304-2.56 29.2352-0.8192 49.8688 6.4512 70.2976 5.376 15.104 16.0768 34.2528 32.6144 57.344l92.7232 134.2464 97.792-122.112a246.3744 246.3744 0 0 0 43.0592-84.8384c12.288-43.008-6.2464-106.1888-40.96-133.3248-35.584-27.904-62.464-35.4304-103.3216-33.4336z m7.0656 35.6864c56.5248 0 102.4 45.312 102.4 101.2224a101.7856 101.7856 0 0 1-102.4 101.2224c-56.5248 0-102.4-45.312-102.4-101.2224s45.8752-101.2224 102.4-101.2224z m0 67.4816a33.9456 33.9456 0 0 0-34.1504 33.7408c0 18.6368 15.3088 33.7408 34.1504 33.7408a33.9456 33.9456 0 0 0 34.0992-33.792 33.9456 33.9456 0 0 0-34.0992-33.6896z" />
      </g>
    </svg>
  );
};

export default KgMap1Icon;
