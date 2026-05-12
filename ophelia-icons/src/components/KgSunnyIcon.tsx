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

const KgSunnyIcon: React.FC<IconProps> = ({
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
    const p = "0 0 1025 1024".trim().split(/[\s,]+/).map(Number);
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
      viewBox="0 0 1025 1024"
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
          <linearGradient id="duotone-KgSunnyIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgSunnyIcon)` : undefined}>
        <path d="M510.065243 765.492687a254.136621 254.136621 0 0 0 253.839584-253.839584 254.136621 254.136621 0 0 0-253.839584-253.839584 254.136621 254.136621 0 0 0-253.839584 253.839584 254.136621 254.136621 0 0 0 253.839584 253.839584zM483.034849 142.944954a26.98796 26.98796 0 1 0 54.060788 0V28.543162a26.98796 26.98796 0 1 0-54.060788 0v114.401792zM483.034849 880.318818v114.401792a26.98796 26.98796 0 1 0 54.060788 0v-114.401792a26.98796 26.98796 0 1 0-54.060788 0zM325.732385 219.325972a27.030394 27.030394 0 0 0 23.338645-40.524373L291.912568 79.718444a27.030394 27.030394 0 0 0-46.804591 27.030394l57.24333 99.083154a26.945526 26.945526 0 0 0 23.423512 13.49398zM680.90412 807.502247a27.030394 27.030394 0 0 0-9.887098 36.917492l57.24333 99.083155a26.945526 26.945526 0 0 0 36.917492 9.887098 27.030394 27.030394 0 0 0 9.887098-36.917492l-57.243329-99.040721a27.030394 27.030394 0 0 0-36.917493-9.929532zM68.28592 256.582936a27.030394 27.030394 0 0 0 9.929532 36.917492l99.040721 57.200896a27.030394 27.030394 0 0 0 27.030393-46.804591L105.203412 246.738271a26.98796 26.98796 0 0 0-36.917492 9.887099zM941.999901 729.805778l-99.083154-57.200896a26.98796 26.98796 0 1 0-27.030394 46.804591l99.083155 57.200896a27.030394 27.030394 0 0 0 27.030393-46.804591zM168.387488 511.653103a26.98796 26.98796 0 0 0-26.98796-27.030394H26.997736a26.98796 26.98796 0 1 0 0 54.018354H141.399528a26.98796 26.98796 0 0 0 26.98796-26.98796zM993.175183 484.665143h-114.401791a26.98796 26.98796 0 1 0 0 53.97592h114.401791a26.98796 26.98796 0 1 0 0-54.018354zM177.256173 672.604882l-99.040721 57.24333a27.030394 27.030394 0 0 0 26.98796 46.762157l99.083154-57.200896a27.030394 27.030394 0 0 0-27.030393-46.804591zM914.969508 246.695837l-99.083155 57.24333a27.030394 27.030394 0 0 0 27.030394 46.804591l99.083154-57.24333a27.030394 27.030394 0 0 0-27.030393-46.804591zM302.351307 817.431779l-57.24333 99.083155a27.030394 27.030394 0 0 0 46.804591 26.98796l57.24333-99.083155a26.98796 26.98796 0 1 0-46.804591-26.98796zM680.90412 215.719091a27.030394 27.030394 0 0 0 36.917493-9.887099l57.243329-99.083154a26.98796 26.98796 0 1 0-46.80459-27.030394L670.974588 178.801599a26.98796 26.98796 0 0 0 9.887098 36.917492z" />
      </g>
    </svg>
  );
};

export default KgSunnyIcon;
