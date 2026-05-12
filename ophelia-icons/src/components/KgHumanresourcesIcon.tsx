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

const KgHumanResourcesIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgHumanResourcesIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgHumanResourcesIcon)` : undefined}>
        <path d="M173.738667 923.861333c-23.466667 0-43.52-8.362667-60.245334-25.088a82.176 82.176 0 0 1-25.088-60.245333v-469.333333c0-23.466667 8.362667-43.562667 25.088-60.288a82.176 82.176 0 0 1 60.245334-25.045334h213.333333v-128c0-23.466667 8.362667-43.562667 25.088-60.288a82.176 82.176 0 0 1 60.245333-25.045333h85.333334c23.466667 0 43.562667 8.32 60.288 25.045333 16.682667 16.725333 25.045333 36.821333 25.045333 60.288v128h213.333333c23.466667 0 43.562667 8.32 60.288 25.045334 16.682667 16.725333 25.045333 36.821333 25.045334 60.288v469.333333c0 23.466667-8.362667 43.52-25.045334 60.245333a82.176 82.176 0 0 1-60.288 25.088h-682.666666z m0-85.333333h682.666666v-469.333333h-213.333333c0 23.466667-8.362667 43.52-25.045333 60.245333a82.176 82.176 0 0 1-60.288 25.088h-85.333334c-23.466667 0-43.52-8.362667-60.245333-25.088a82.176 82.176 0 0 1-25.088-60.245333h-213.333333v469.333333z m85.333333-85.333333h256v-19.2c0-12.117333-3.370667-23.296-10.112-33.621334a66.986667 66.986667 0 0 0-28.288-23.978666 220.245333 220.245333 0 0 0-43.178667-14.421334 216.021333 216.021333 0 0 0-46.421333-4.778666c-16.341333 0-31.829333 1.578667-46.378667 4.778666-14.592 3.2-29.013333 8.021333-43.221333 14.421334a66.986667 66.986667 0 0 0-28.245333 23.978666 60.16 60.16 0 0 0-10.154667 33.621334v19.2z m341.333333-64h170.666667v-64h-170.666667v64z m-213.333333-64c17.792 0 32.896-6.229333 45.354667-18.688 12.416-12.458667 18.645333-27.562667 18.645333-45.312 0-17.792-6.229333-32.896-18.645333-45.354667a61.738667 61.738667 0 0 0-45.354667-18.645333c-17.749333 0-32.853333 6.186667-45.312 18.645333a61.738667 61.738667 0 0 0-18.688 45.354667c0 17.749333 6.229333 32.853333 18.688 45.312 12.416 12.458667 27.562667 18.688 45.312 18.688z m213.333333-64h170.666667v-64h-170.666667v64z m-128-192h85.333334v-213.333334h-85.333334v213.333334z" />
      </g>
    </svg>
  );
};

export default KgHumanResourcesIcon;
