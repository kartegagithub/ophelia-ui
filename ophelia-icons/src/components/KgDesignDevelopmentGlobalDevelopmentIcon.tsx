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

const KgDesignDevelopmentGlobalDevelopmentIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentGlobalDevelopmentIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentGlobalDevelopmentIcon)` : undefined}>
        <path d="M528 560m-336 0a336 336 0 1 0 672 0 336 336 0 1 0-672 0Z" /><path d="M560 1024h-96a16 16 0 0 1-16-16v-68.832a428.512 428.512 0 0 1-40.352-8l-26.336 63.568c-3.392 8.16-12.72 12-20.912 8.64l-88.688-36.72a16 16 0 0 1-8.64-20.912l26.32-63.552c-11.712-7.04-23.136-14.72-34.176-22.88l-48.688 48.672a16.48 16.48 0 0 1-22.624 0l-67.888-67.888a16 16 0 0 1 0-22.624l48.688-48.688a434.88 434.88 0 0 1-22.88-34.176L78.24 760.96a16 16 0 0 1-20.912-8.656l-36.736-88.688a16 16 0 0 1 8.656-20.912l63.552-26.336a433.104 433.104 0 0 1-8-40.352H16a16 16 0 0 1-16-16v-96a16 16 0 0 1 16-16h68.816c2.016-13.536 4.704-27.04 8-40.352L29.28 381.312a16 16 0 0 1-8.64-20.912l36.72-88.688a16 16 0 0 1 20.912-8.64l63.552 26.32c7.04-11.68 14.72-23.12 22.896-34.176l-48.688-48.688a16 16 0 0 1 0-22.624l67.888-67.888a16.48 16.48 0 0 1 22.624 0l48.688 48.688c11.04-8.16 22.464-15.84 34.176-22.88L263.04 78.24a16 16 0 0 1 8.656-20.912l88.688-36.736a16 16 0 0 1 20.912 8.656l26.336 63.568a428.512 428.512 0 0 1 40.352-8V16a16 16 0 0 1 16-16h96a16 16 0 0 1 16 16v68.832c13.552 2.016 27.04 4.688 40.352 8l26.336-63.568a16 16 0 0 1 20.912-8.64l88.688 36.72a16 16 0 0 1 8.64 20.912l-26.32 63.552c11.712 7.04 23.136 14.72 34.176 22.88l48.688-48.672a16.48 16.48 0 0 1 22.624 0l67.888 67.888a16 16 0 0 1 0 22.624l-48.688 48.688c8.176 11.04 15.84 22.48 22.88 34.176l63.568-26.336a16 16 0 0 1 20.912 8.656l36.736 88.688a16 16 0 0 1-8.656 20.912l-63.552 26.336c3.296 13.328 5.984 26.816 8 40.352H1008a16 16 0 0 1 16 16v96a16 16 0 0 1-16 16h-68.816c-2.016 13.536-4.704 27.04-8 40.352l63.552 26.336a16 16 0 0 1 8.64 20.912l-36.72 88.688a16 16 0 0 1-20.912 8.64l-63.552-26.32c-7.056 11.68-14.72 23.12-22.896 34.176l48.688 48.688a16 16 0 0 1 0 22.624l-67.888 67.888a16.48 16.48 0 0 1-22.624 0l-48.688-48.688c-11.04 8.16-22.464 15.84-34.176 22.88l26.336 63.568a16 16 0 0 1-8.656 20.912l-88.688 36.736a16.016 16.016 0 0 1-20.912-8.656l-26.336-63.568c-13.312 3.312-26.8 5.984-40.352 8V1008a16 16 0 0 1-16 16z m-80-32h64v-66.848a16 16 0 0 1 14.176-15.888c21.28-2.448 42.56-6.672 63.232-12.544a16.032 16.032 0 0 1 19.152 9.264l25.568 61.712 59.12-24.48-25.552-61.696a16 16 0 0 1 6.976-20.096 400.912 400.912 0 0 0 53.568-35.888 15.984 15.984 0 0 1 21.248 1.216l47.296 47.296 45.248-45.28-47.28-47.28a16 16 0 0 1-1.232-21.248 401.152 401.152 0 0 0 35.888-53.568c3.952-7.072 12.592-10.08 20.096-6.992l61.712 25.568 24.48-59.12-61.696-25.568a16 16 0 0 1-9.28-19.152c5.888-20.72 10.096-41.984 12.544-63.232a16 16 0 0 1 15.888-14.176H992v-64h-66.848a16 16 0 0 1-15.888-14.176 399.248 399.248 0 0 0-12.544-63.232 16 16 0 0 1 9.28-19.152l61.696-25.568-24.48-59.12-61.712 25.568a16 16 0 0 1-20.096-6.992 402.832 402.832 0 0 0-35.888-53.584 16 16 0 0 1 1.232-21.248l47.28-47.28L828.8 149.952l-47.296 47.296a15.952 15.952 0 0 1-21.248 1.216 400.896 400.896 0 0 0-53.568-35.888 16 16 0 0 1-6.976-20.096l25.552-61.696-59.12-24.48-25.568 61.712a15.904 15.904 0 0 1-19.152 9.28 399.12 399.12 0 0 0-63.232-12.56A16 16 0 0 1 544 98.848V32h-64v66.848a16 16 0 0 1-14.176 15.888c-21.28 2.448-42.56 6.672-63.232 12.544a16 16 0 0 1-19.152-9.264l-25.568-61.712-59.12 24.48 25.552 61.696a16 16 0 0 1-6.976 20.096 400.912 400.912 0 0 0-53.568 35.888 15.968 15.968 0 0 1-21.248-1.216L195.2 149.952l-45.248 45.28 47.28 47.264a16 16 0 0 1 1.232 21.248 402.832 402.832 0 0 0-35.888 53.584 15.984 15.984 0 0 1-20.096 6.992l-61.712-25.568-24.48 59.12 61.696 25.568a16 16 0 0 1 9.28 19.152 399.232 399.232 0 0 0-12.544 63.232 16 16 0 0 1-15.888 14.176H32v64h66.848a16 16 0 0 1 15.888 14.176c2.448 21.248 6.656 42.512 12.544 63.232a16 16 0 0 1-9.28 19.152L56.32 666.128l24.48 59.12 61.712-25.568a16 16 0 0 1 20.096 6.992 401.168 401.168 0 0 0 35.888 53.568 16 16 0 0 1-1.232 21.248l-47.28 47.296 45.248 45.264 47.296-47.296a15.984 15.984 0 0 1 21.248-1.216 400.896 400.896 0 0 0 53.568 35.888 16 16 0 0 1 6.976 20.096l-25.552 61.696 59.12 24.48 25.568-61.712a15.968 15.968 0 0 1 19.152-9.28c20.672 5.888 41.952 10.112 63.232 12.56a16 16 0 0 1 14.176 15.888V992z" /><path d="M512 864c-194.08 0-352-157.92-352-352s157.92-352 352-352 352 157.92 352 352-157.92 352-352 352z m0-672c-176.448 0-320 143.552-320 320s143.552 320 320 320 320-143.552 320-320-143.552-320-320-320z" /><path d="M512 864c-98.688 0-176-154.608-176-352s77.312-352 176-352 176 154.608 176 352-77.312 352-176 352z m0-672c-78.048 0-144 146.56-144 320s65.952 320 144 320 144-146.56 144-320-65.952-320-144-320z" /><path d="M512 864a16 16 0 0 1-16-16V176a16 16 0 1 1 32 0v672a16 16 0 0 1-16 16z" /><path d="M822.72 400H201.28a16 16 0 1 1 0-32h621.44a16 16 0 1 1 0 32zM822.72 656H201.28a16 16 0 1 1 0-32h621.44a16 16 0 1 1 0 32z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentGlobalDevelopmentIcon;
