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

const KgCardIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgCardIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgCardIcon)` : undefined}>
        <path d="M146.090667 188.757333C122.24 212.650667 110.933333 255.829333 110.933333 341.333333v341.333334c0 85.504 11.306667 128.725333 35.157334 152.576 23.893333 23.850667 67.072 35.157333 152.576 35.157333h426.666666c85.504 0 128.725333-11.306667 152.576-35.157333 23.850667-23.893333 35.157333-67.072 35.157334-152.576V341.333333c0-85.504-11.306667-128.725333-35.157334-152.576-23.893333-23.850667-67.072-35.157333-152.576-35.157333H298.666667c-85.504 0-128.725333 11.306667-152.576 35.157333z m-36.181334-36.181333C150.016 112.426667 213.504 102.4 298.666667 102.4h426.666666c85.162667 0 148.608 10.026667 188.757334 50.176 40.149333 40.106667 50.176 103.594667 50.176 188.757333v341.333334c0 85.162667-10.026667 148.608-50.176 188.757333-40.106667 40.149333-103.594667 50.176-188.757334 50.176H298.666667c-85.162667 0-148.608-10.026667-188.757334-50.176C69.76 831.317333 59.733333 767.829333 59.733333 682.666667V341.333333c0-85.162667 10.026667-148.608 50.176-188.757333zM571.733333 341.333333a25.6 25.6 0 0 1 25.6-25.6h213.333334a25.6 25.6 0 1 1 0 51.2h-213.333334a25.6 25.6 0 0 1-25.6-25.6zM614.4 512a25.6 25.6 0 0 1 25.6-25.6h170.666667a25.6 25.6 0 0 1 0 51.2h-170.666667a25.6 25.6 0 0 1-25.6-25.6zM699.733333 682.666667a25.6 25.6 0 0 1 25.6-25.6h85.333334a25.6 25.6 0 0 1 0 51.2h-85.333334a25.6 25.6 0 0 1-25.6-25.6zM362.666667 352.853333a51.626667 51.626667 0 1 0 0 103.253334 51.626667 51.626667 0 0 0 0-103.253334zM259.84 404.48a102.826667 102.826667 0 1 1 205.653333 0 102.826667 102.826667 0 0 1-205.653333 0zM397.525333 555.221333a154.453333 154.453333 0 0 1 139.946667 139.093334 25.6 25.6 0 1 1-50.944 4.906666 103.253333 103.253333 0 0 0-93.738667-93.013333H392.533333a303.488 303.488 0 0 0-59.776 0 103.68 103.68 0 0 0-93.952 93.013333 25.6 25.6 0 0 1-50.944-4.949333 154.88 154.88 0 0 1 139.904-139.093333 355.114667 355.114667 0 0 1 69.76 0z" />
      </g>
    </svg>
  );
};

export default KgCardIcon;
