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

const KgNointernetIcon: React.FC<IconProps> = ({
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
    const p = "0 0 1280 1024".trim().split(/[\s,]+/).map(Number);
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
      viewBox="0 0 1280 1024"
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
          <linearGradient id="duotone-KgNointernetIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgNointernetIcon)` : undefined}>
        <path d="M1093.143273 1013.248L611.141818 528.360727c-59.019636 2.466909-115.432727 15.476364-169.239273 39.051637-53.829818 23.575273-99.607273 55.458909-137.332363 95.650909l-59.531637-60.183273c37.748364-37.748364 81.826909-70.120727 132.25891-97.117091a472.901818 472.901818 0 0 1 159.092363-52.130909l-213.713454-213.713455c-44.218182 17.384727-90.065455 41.588364-137.541819 72.657455a797.509818 797.509818 0 0 0-127.83709 103.214545L0 355.607273a942.685091 942.685091 0 0 1 125.812364-105.448728C171.194182 218.298182 215.04 193.117091 257.349818 174.545455L123.973818 41.192727 165.166545 0l972.055273 972.101818-44.078545 41.146182m-459.869091-55.04c-25.041455 0-46.242909-8.704-63.534546-26.135273-17.314909-17.408-25.972364-38.539636-25.972363-63.371636 0-25.064727 8.657455-46.242909 25.972363-63.534546 17.291636-17.314909 38.493091-25.972364 63.534546-25.972363 25.088 0 46.266182 8.657455 63.557818 25.949091 17.314909 17.314909 25.972364 38.493091 25.972364 63.534545 0 24.855273-8.657455 45.986909-25.972364 63.394909-17.291636 17.431273-38.493091 26.135273-63.534545 26.135273m343.272727-312.622545l-24.855273-24.832-24.832-24.832-121.064727-121.064728c33.047273 7.749818 68.840727 22.225455 107.357091 43.403637 38.539636 21.178182 74.658909 48.64 108.357818 82.362181l-44.962909 44.96291m232.727273-229.818182c-74.682182-74.658909-161.233455-133.073455-259.653819-175.243637-98.420364-42.193455-203.869091-63.301818-316.346181-63.301818-20.363636 0-40.564364 0.744727-60.602182 2.187637-20.014545 1.466182-38.632727 3.630545-55.761455 6.539636L442.414545 111.429818a603.089455 603.089455 0 0 1 84.852364-14.429091c31.069091-3.211636 66.420364-4.794182 106.030546-4.794182 124.997818 0 241.570909 23.272727 349.649454 69.818182 108.078545 46.545455 203.357091 111.057455 285.858909 193.559273l-59.508363 60.183273" />
      </g>
    </svg>
  );
};

export default KgNointernetIcon;
