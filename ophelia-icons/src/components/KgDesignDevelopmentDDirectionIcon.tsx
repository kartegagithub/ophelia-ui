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

const KgDesignDevelopmentDDirectionIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentDDirectionIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentDDirectionIcon)` : undefined}>
        <path d="M560.02112 544m-176 0a176 176 0 1 0 352 0 176 176 0 1 0-352 0Z" /><path d="M512.02112 976a15.952 15.952 0 0 1-7.968-2.128l-320-184A16 16 0 0 1 176.02112 776v-368a16 16 0 0 1 8.032-13.872l320-184a15.952 15.952 0 0 1 15.936 0l320 184A16 16 0 0 1 848.02112 408v368a16 16 0 0 1-8.032 13.872l-320 184A15.952 15.952 0 0 1 512.02112 976zM208.02112 766.736l304 174.816L816.02112 766.72V417.28L512.02112 242.448 208.02112 417.28V766.72z" /><path d="M512.00512 608a15.872 15.872 0 0 1-7.952-2.128l-320-184a16 16 0 1 1 15.936-27.744l320 184A16 16 0 0 1 512.00512 608z" /><path d="M512.03712 608a16 16 0 0 1-7.984-29.872l320-184a16 16 0 0 1 15.936 27.744l-320 184a15.872 15.872 0 0 1-7.952 2.128z" /><path d="M512.02112 976a16 16 0 0 1-16-16V592a16 16 0 1 1 32 0v368a16 16 0 0 1-16 16z" /><path d="M512.02112 976a15.888 15.888 0 0 1-7.984-2.144l-319.12-184a15.968 15.968 0 0 1-8.016-13.856v-368c0-5.712 3.04-11.008 8-13.856l319.136-184a15.936 15.936 0 0 1 15.968 0l319.12 184c4.96 2.848 8.016 8.144 8.016 13.856v368c0 5.712-3.04 11.008-8 13.856l-319.136 184A15.904 15.904 0 0 1 512.02112 976zM208.90112 766.752L512.02112 941.536l303.12-174.784V417.248L512.02112 242.464 208.90112 417.248v349.504z" /><path d="M16.03712 896.32a15.984 15.984 0 0 1-8.064-29.84l399.2-232a16 16 0 0 1 16.096 27.68l-399.2 232A15.952 15.952 0 0 1 16.02112 896.32zM1008.00512 896.32a15.952 15.952 0 0 1-8.032-2.16l-399.2-232a16 16 0 0 1 16.096-27.68l399.2 232a16 16 0 0 1-8.064 29.84zM512.02112 496a16 16 0 0 1-16-16V16a16 16 0 1 1 32 0v464a16 16 0 0 1-16 16z" /><path d="M144.02112 912H16.02112a16 16 0 0 1-16-16v-128a16 16 0 1 1 32 0v112h112a16 16 0 1 1 0 32zM1008.02112 912h-128a16 16 0 1 1 0-32h112v-112a16 16 0 1 1 32 0v128a16 16 0 0 1-16 16zM608.02112 128a15.952 15.952 0 0 1-11.312-4.688L512.02112 38.624l-84.688 84.688a16 16 0 1 1-22.624-22.624l96-96a16 16 0 0 1 22.624 0l96 96A16 16 0 0 1 608.02112 128zM512.02112 784c-105.872 0-192-86.128-192-192s86.128-192 192-192 192 86.128 192 192-86.128 192-192 192z m0-352c-88.224 0-160 71.776-160 160s71.776 160 160 160 160-71.776 160-160-71.776-160-160-160zM144.02112 400c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM880.02112 400c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 3.04-7.2 4.64-11.36 4.64zM512.02112 1024c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentDDirectionIcon;
