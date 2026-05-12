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

const KgContactInformationIcon: React.FC<IconProps> = ({
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
    const p = "0 0 1365 1024".trim().split(/[\s,]+/).map(Number);
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
      viewBox="0 0 1365 1024"
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
          <linearGradient id="duotone-KgContactInformationIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgContactInformationIcon)` : undefined}>
        <path d="M151.7568 0C111.479467 0 73.045333 15.428267 44.509867 42.871467A143.7696 143.7696 0 0 0 0 146.295467v731.409066c0 38.775467 16.042667 75.9808 44.509867 103.424 28.4672 27.4432 67.037867 42.8032 107.246933 42.871467h1062.365867c40.277333 0 78.848-15.428267 107.3152-42.871467 28.4672-27.4432 44.4416-64.648533 44.509866-103.424V146.295467c0-38.775467-16.042667-75.9808-44.509866-103.424A154.8288 154.8288 0 0 0 1214.122667 0H151.7568z m189.781333 585.1136h151.7568c24.917333 0 49.5616 4.778667 72.567467 13.9264 23.074133 9.216 43.963733 22.664533 61.576533 39.662933 17.6128 16.9984 31.607467 37.137067 41.096534 59.392 9.557333 22.1184 14.472533 45.943467 14.404266 69.905067 0 20.138667-17.066667 36.590933-37.956266 36.590933h-455.338667a38.775467 38.775467 0 0 1-26.760533-10.786133 36.0448 36.0448 0 0 1-11.127467-25.873067c0-23.9616 4.9152-47.786667 14.472533-69.973333 9.557333-22.186667 23.483733-42.325333 41.096534-59.323733 17.6128-16.930133 38.570667-30.378667 61.576533-39.594667a195.925333 195.925333 0 0 1 72.635733-13.9264zM265.557333 365.704533c0-38.775467 15.9744-75.9808 44.4416-103.424a154.692267 154.692267 0 0 1 107.3152-42.871466c40.277333 0 78.848 15.428267 107.3152 42.871466 28.4672 27.4432 44.4416 64.648533 44.4416 103.424s-15.9744 76.049067-44.373333 103.424a154.692267 154.692267 0 0 1-107.383467 42.871467c-40.277333 0-78.848-15.428267-107.3152-42.871467a143.633067 143.633067 0 0 1-44.373333-103.424z m607.095467-73.1136h303.5136c20.821333 0 37.888 16.384 37.888 36.590934 0 20.0704-17.066667 36.522667-37.956267 36.522666h-303.5136a38.775467 38.775467 0 0 1-26.8288-10.786133 35.976533 35.976533 0 0 1-11.127466-25.8048c0-20.0704 17.066667-36.522667 38.024533-36.522667z m0 146.295467h303.5136c20.821333 0 37.888 16.384 37.888 36.590933 0 20.0704-17.066667 36.522667-37.956267 36.522667h-303.5136a38.775467 38.775467 0 0 1-26.8288-10.786133 36.0448 36.0448 0 0 1-11.127466-25.8048c0-20.0704 17.066667-36.522667 38.024533-36.522667z m0 146.2272h303.5136c20.821333 0 37.888 16.452267 37.888 36.6592 0 20.0704-17.066667 36.522667-37.956267 36.522667h-303.5136a38.775467 38.775467 0 0 1-26.8288-10.786134 36.0448 36.0448 0 0 1-11.127466-25.8048c0-20.138667 17.066667-36.590933 38.024533-36.590933z" />
      </g>
    </svg>
  );
};

export default KgContactInformationIcon;
