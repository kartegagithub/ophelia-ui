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

const KgDesignDevelopmentPrintingPaperIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentPrintingPaperIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentPrintingPaperIcon)` : undefined}>
        <path d="M544 576m-112 0a112 112 0 1 0 224 0 112 112 0 1 0-224 0Z" /><path d="M864 1024H160a16 16 0 0 1-16-16V16a16 16 0 0 1 16-16h512a16 16 0 1 1 0 32H176v960h672V208a16 16 0 1 1 32 0v800a16 16 0 0 1-16 16z" /><path d="M864.32 224H672a16 16 0 0 1-16-16V16a16 16 0 0 1 27.312-11.312l190.272 190.256a16 16 0 0 1-9.28 29.056zM688 192h137.376L688 54.624V192zM512 736a16 16 0 0 1-16-16V304a16 16 0 1 1 32 0v416a16 16 0 0 1-16 16z" /><path d="M720 528H304a16 16 0 1 1 0-32h416a16 16 0 1 1 0 32z" /><path d="M512 640c-70.576 0-128-57.424-128-128s57.424-128 128-128 128 57.424 128 128-57.424 128-128 128z m0-224c-52.944 0-96 43.056-96 96s43.056 96 96 96 96-43.056 96-96-43.056-96-96-96zM224 96c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM224 160c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM288 96c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM224 960c-4.16 0-8.32-1.76-11.36-4.64A16.48 16.48 0 0 1 208 944c0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM224 896c-4.16 0-8.32-1.76-11.36-4.64A16.48 16.48 0 0 1 208 880c0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM288 960c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.32-1.76 8.32-4.8 11.36-2.88 2.88-7.04 4.64-11.2 4.64zM800 960c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM736 960c-4.32 0-8.32-1.76-11.36-4.64-2.88-2.88-4.64-7.04-4.64-11.36s1.76-8.32 4.8-11.36c5.76-5.92 16.64-5.92 22.56 0 2.88 3.04 4.64 7.04 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.04 4.64-11.36 4.64zM800 896c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM636.48 403.52c-4.16 0-8.32-1.6-11.36-4.64-3.04-3.04-4.64-7.2-4.64-11.36 0-4.16 1.6-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0.16 2.88 2.88 4.64 7.04 4.64 11.2 0 4.16-1.76 8.32-4.8 11.36-2.88 3.04-7.04 4.64-11.2 4.64zM387.52 652.48a16.16 16.16 0 0 1-16-16c0-4.32 1.76-8.32 4.64-11.36 6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-2.88 2.88-7.04 4.64-11.36 4.64zM636.48 652.48c-4.32 0-8.32-1.76-11.36-4.64-3.04-3.04-4.64-7.2-4.64-11.36 0-4.16 1.6-8.32 4.64-11.36 6.08-5.92 16.64-5.92 22.56 0 3.04 3.04 4.8 7.2 4.8 11.36a16.096 16.096 0 0 1-16 16zM387.52 403.52a15.52 15.52 0 0 1-11.2-4.64c-3.04-3.04-4.8-7.04-4.8-11.36 0-4.16 1.76-8.32 4.8-11.36 5.76-5.92 16.64-5.76 22.56 0.16 2.88 2.88 4.64 7.04 4.64 11.2 0 4.16-1.76 8.32-4.64 11.36-3.04 3.04-7.04 4.64-11.36 4.64z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentPrintingPaperIcon;
