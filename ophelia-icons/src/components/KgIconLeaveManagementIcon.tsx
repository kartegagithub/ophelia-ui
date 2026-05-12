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

const KgIconLeaveManagementIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgIconLeaveManagementIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgIconLeaveManagementIcon)` : undefined}>
        <path d="M214.186667 298.666667a213.333333 213.333333 0 1 0 426.666666 0 213.333333 213.333333 0 0 0-426.666666 0zM612.693333 938.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667 341.333333 341.333333 0 0 1 341.333334-341.333333 333.226667 333.226667 0 0 1 147.2 33.706666 234.282667 234.282667 0 0 0 38.826666 350.293334zM746.666667 554.666667c106.325333 0 192 85.674667 192 192S852.992 938.666667 746.666667 938.666667a191.616 191.616 0 0 1-192-192c0-106.325333 85.674667-192 192-192zM836.736 763.648c27.306667-25.088 8.106667-54.613333 0-65.706667 5.930667 2.218667 13.312 8.832 28.074667 23.594667 0-59.050667-55.381333-47.232-55.381334-47.232-1.493333-34.730667-54.613333-55.381333-79.018666-19.2 37.674667-2.218667 36.949333 4.437333 42.112 14.037333-44.330667-4.437333-44.330667 36.906667-42.112 56.832 17.749333-35.413333 34.730667-34.688 55.381333-33.237333-36.181333 25.856-44.288 84.224-45.781333 118.912-5.12 0-10.325333 0-14.762667 0.725333-5.162667-66.432-28.8-83.413333-40.618667-90.794666 21.418667-0.768 25.856 5.888 36.949334 19.2 0-35.456-15.530667-36.949333-28.074667-37.674667 3.669333-6.656 16.981333-6.656 28.032-4.437333 0-19.925333-50.176-24.362667-55.381333 9.6-28.032-7.381333-45.781333 25.856-32.469334 37.674666 3.669333-17.749333 8.874667-18.474667 18.474667-19.2-21.418667 17.706667-16.256 43.52 0 51.669334-2.218667-27.306667 2.176-33.962667 9.6-37.674667-0.768 20.693333 2.218667 33.28 28.032 37.674667-16.981333-26.581333-14.037333-40.618667-9.6-47.232 16.256 25.088 26.581333 53.162667 31.018667 83.413333-34.688 5.205333-62.72 17.749333-74.581334 34.005333 0 11.093333 48 6.613333 74.581334-2.218666 8.874667-2.986667 17.749333 11.776 27.306666 11.776 11.093333 0 17.024-8.106667 27.349334-8.832 16.981333-1.493333 31.744 8.832 45.781333 8.832 11.818667 0 38.4-3.669333 38.4-9.557334-14.037333-18.474667-48-32.512-88.618667-36.224 1.493333-58.325333 5.162667-95.232 38.4-109.994666 8.106667 31.018667-7.381333 57.6-18.432 70.869333 40.576-0.725333 41.344-39.850667 42.069334-56.874667 5.162667 7.424 12.544 13.312 13.269333 47.274667z" />
      </g>
    </svg>
  );
};

export default KgIconLeaveManagementIcon;
