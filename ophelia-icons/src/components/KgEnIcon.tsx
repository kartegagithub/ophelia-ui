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

const KgEnIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgEnIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgEnIcon)` : undefined}>
        <path d="M490.026463 511.999787H1024.29824c0-46.207981-6.143997-90.965295-17.621326-133.546611H490.026463V511.999787zM490.026463 244.906565h459.093142a514.730452 514.730452 0 0 0-118.101284-133.589278h-340.991858v133.546611zM512.298453 1023.999573c120.490616 0 231.253237-41.642649 318.719868-111.317287H193.578586A509.781121 509.781121 0 0 0 512.298453 1023.999573zM75.434635 779.093009H949.204938a508.842455 508.842455 0 0 0 57.514643-133.546611H17.919993c12.842661 47.658647 32.383987 92.543961 57.514642 133.546611z" /><path d="M237.482568 79.9573h46.634647l-43.391982 31.530654 16.597327 51.029312-43.434649-31.573321-43.391982 31.573321 14.335994-44.074649c-38.229317 31.82932-71.67997 69.119971-99.327959 110.677288h14.933328l-27.605322 20.053325c-4.266665 7.167997-8.40533 14.506661-12.373328 21.88799l13.226661 40.575983-24.661323-17.877325C42.965316 306.773206 37.333318 319.999867 32.298653 333.525194l14.506661 44.714648h53.674644l-43.391982 31.573321 16.55466 50.986645-43.391982-31.530654-26.026656 18.901326C1.706666 469.077138 0.298667 490.410462 0.298667 511.999787h511.999786V0C411.178495 0 316.885201 29.354654 237.482568 79.9573z m19.839992 380.842508l-43.434649-31.530654-43.391982 31.530654 16.597327-51.029312-43.391982-31.530654h53.631977l16.55466-50.986645 16.597326 50.986645h53.631978l-43.391982 31.573321 16.597327 50.986645z m-16.597327-200.14925l16.597327 50.986645-43.434649-31.530653-43.391982 31.57332 16.597327-51.029312-43.391982-31.57332h53.631977l16.55466-50.986646 16.597326 51.029313h53.631978l-43.391982 31.530653z m200.234583 200.14925l-43.391982-31.530654-43.391981 31.530654 16.554659-51.029312-43.391982-31.530654h53.631978l16.597326-50.986645 16.55466 50.986645h53.674645l-43.434649 31.573321 16.597326 50.986645z m-16.597326-200.14925l16.597326 50.986645-43.391982-31.530653-43.391981 31.57332 16.554659-51.029312-43.391982-31.57332h53.631978l16.597326-50.986646 16.55466 51.029313h53.674645l-43.434649 31.530653z m0-149.162604l16.597326 51.029312-43.391982-31.573321-43.391981 31.573321 16.554659-51.029312-43.391982-31.530654h53.631978L397.567834 28.927988l16.55466 51.029312h53.674645l-43.434649 31.530654z" />
      </g>
    </svg>
  );
};

export default KgEnIcon;
