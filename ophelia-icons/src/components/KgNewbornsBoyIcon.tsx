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

const KgNewbornsBoyIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgNewbornsBoyIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgNewbornsBoyIcon)` : undefined}>
        <path d="M433.288533 606.754133a22.903467 22.903467 0 0 1-23.688533-22.869333 23.210667 23.210667 0 0 1 23.415467-24.337067c13.073067-0.068267 24.439467 11.332267 24.132266 24.098134a24.064 24.064 0 0 1-23.893333 23.108266h0.034133zM607.163733 583.441067a23.074133 23.074133 0 0 1-23.313066 23.313066c-13.243733 0.136533-24.4736-10.888533-24.302934-23.7568a24.439467 24.439467 0 0 1 23.7568-23.415466 23.3472 23.3472 0 0 1 23.893334 23.893333z" /><path d="M507.8016 236.1344c4.027733-7.133867 12.219733-7.031467 19.2512-2.8672 20.0704 11.946667 39.970133 24.1664 61.371733 37.205333a119.671467 119.671467 0 0 1 61.166934-20.992c6.0416-0.3072 14.7456 1.8432 17.783466 6.075734 3.003733 4.164267 1.536 12.629333 0 18.7392-1.774933 7.099733-5.7344 13.7216-8.9088 20.923733 11.1616 1.706667 21.162667 2.730667 30.890667 4.9152 6.212267 1.4336 12.356267 4.096 17.851733 7.3728 13.0048 7.645867 12.765867 19.217067 0.955734 28.5696-10.820267 8.567467-20.650667 18.363733-31.1296 27.8528 109.226667 96.4608 113.493333 242.8928 47.7184 340.002133-64.887467 95.812267-187.904 137.284267-296.174934 99.1232-110.114133-38.843733-179.882667-144.725333-171.997866-259.754666 8.738133-126.805333 116.974933-240.401067 259.822933-239.650134a96.4608 96.4608 0 0 0-9.898667-48.9472c-2.4576-4.949333-1.536-13.550933 1.297067-18.568533z m-221.525333 312.0128c-0.750933 88.849067 33.109333 159.3344 108.612266 204.8 81.681067 49.152 165.751467 46.865067 244.872534-6.621867 69.632-47.138133 100.078933-115.882667 98.133333-199.8848-67.9936-16.7936-123.050667-49.7664-156.228267-113.902933-38.741333 47.342933-90.7264 70.382933-146.158933 87.620267-48.059733 14.9504-97.4848 22.869333-149.265067 27.989333z" />
      </g>
    </svg>
  );
};

export default KgNewbornsBoyIcon;
