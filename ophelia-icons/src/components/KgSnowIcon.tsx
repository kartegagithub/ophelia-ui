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

const KgSnowIcon: React.FC<IconProps> = ({
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
    const p = "0 0 1030 1024".trim().split(/[\s,]+/).map(Number);
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
      viewBox="0 0 1030 1024"
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
          <linearGradient id="duotone-KgSnowIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgSnowIcon)` : undefined}>
        <path d="M954.45504 300.373333a30.72 30.72 0 0 1-10.794667-15.744 227.072 227.072 0 0 0-217.173333-163.072c-18.432 0-36.821333 2.218667-54.613333 6.656a30.421333 30.421333 0 0 1-32.341334-12.288 249.941333 249.941333 0 0 0-374.357333-43.008 249.173333 249.173333 0 0 0-80.213333 160.426667 30.378667 30.378667 0 0 1-17.152 24.533333c-2.986667 1.408-6.058667 2.986667-9.002667 4.608a28.330667 28.330667 0 0 1-8.106667 3.072A194.218667 194.218667 0 0 0 42.924373 332.245333a189.312 189.312 0 0 0-42.965333 120.917334c0 106.026667 86.698667 192.256 193.365333 192.256h643.754667c106.666667 0 193.365333-86.229333 193.365333-192.256 0-60.330667-27.648-116.053333-75.946666-152.746667v-0.085333zM172.88704 772.053333a27.093333 27.093333 0 0 0-27.093333 27.093334v41.813333l-44.416-12.074667a27.136 27.136 0 0 0-14.208 52.352l42.752 11.562667-25.898667 39.850667a27.178667 27.178667 0 0 0 22.698667 41.856 27.178667 27.178667 0 0 0 22.826666-12.373334l23.722667-36.522666 25.685333 38.229333a27.050667 27.050667 0 1 0 45.013334-30.293333l-27.477334-40.96 42.112-11.392a27.136 27.136 0 0 0-14.208-52.352l-44.373333 12.032v-41.813334a27.093333 27.093333 0 0 0-27.136-27.093333v0.085333zM515.201707 772.053333a27.093333 27.093333 0 0 0-27.136 27.093334v41.813333l-44.373334-12.074667a27.136 27.136 0 0 0-14.208 52.352l42.709334 11.562667-25.856 39.850667a27.178667 27.178667 0 0 0 22.698666 41.856 27.178667 27.178667 0 0 0 22.784-12.373334l23.722667-36.522666 25.728 38.229333a27.050667 27.050667 0 1 0 44.970667-30.293333l-27.477334-40.96 42.112-11.392a27.136 27.136 0 0 0-14.165333-52.352l-44.416 12.032v-41.813334a27.093333 27.093333 0 0 0-27.136-27.093333v0.085333zM857.473707 772.053333a27.093333 27.093333 0 0 0-27.136 27.093334v41.813333l-44.373334-12.074667a27.136 27.136 0 0 0-14.208 52.352l42.752 11.562667-25.898666 39.850667a27.178667 27.178667 0 0 0 22.698666 41.856 27.178667 27.178667 0 0 0 22.826667-12.373334l23.722667-36.522666 25.685333 38.229333a27.050667 27.050667 0 0 0 37.632 7.338667 27.050667 27.050667 0 0 0 7.381333-37.632l-27.52-40.96 42.154667-11.392a27.136 27.136 0 0 0-14.208-52.352l-44.373333 12.032v-41.813334a27.093333 27.093333 0 0 0-27.136-27.093333v0.085333z" />
      </g>
    </svg>
  );
};

export default KgSnowIcon;
