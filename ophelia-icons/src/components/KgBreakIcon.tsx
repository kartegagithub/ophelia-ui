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

const KgBreakIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgBreakIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgBreakIcon)` : undefined}>
        <path d="M943.530667 504.704c-29.226667-29.269333-65.834667-43.904-109.696-43.904h-21.930667v-14.634667c0-14.634667-14.634667-29.269333-29.269333-29.269333H146.304c-14.634667 0-29.269333 14.634667-29.269333 29.269333v226.730667c0 80.469333 29.269333 160.938667 87.765333 212.138667 7.296 7.296 21.930667 14.634667 29.269333 21.930666H146.304c-14.634667 0-29.269333 14.634667-29.269333 29.269334s14.634667 29.269333 29.269333 29.269333H775.253333c14.634667 0 29.269333-14.634667 29.269334-29.269333s-14.634667-29.269333-29.269334-29.269334h-80.426666c7.296-7.296 21.930667-14.634667 29.226666-21.930666 29.269333-29.269333 58.538667-73.130667 73.173334-117.034667h43.861333c43.904 0 80.469333-14.634667 109.738667-43.904 29.226667-29.226667 43.861333-65.792 43.861333-109.653333-7.296-36.608-21.930667-80.512-51.2-109.738667z m-270.634667 336.426667c-43.861333 43.904-102.4 73.173333-168.192 73.173333H416.853333c-65.792 0-124.330667-21.973333-168.192-73.173333-43.904-43.861333-73.173333-102.4-73.173333-168.192v-197.546667h570.538667V665.6c0 73.130667-29.269333 131.669333-73.173334 175.530667z m256-226.730667c0 21.930667-7.296 51.2-29.226667 65.834667-14.634667 14.634667-43.904 29.269333-65.834666 29.269333h-29.269334v-182.869333h21.930667c21.973333 0 51.2 7.296 65.834667 29.269333 21.973333 14.592 36.565333 36.565333 36.565333 58.496zM285.269333 343.765333c14.634667-7.296 21.930667-29.269333 14.634667-43.861333C292.565333 285.269333 292.565333 256 307.2 241.365333c29.269333-36.565333 29.269333-87.765333 14.634667-131.669333-14.634667-14.592-29.269333-21.930667-43.904-14.592C256 102.4 256 124.330667 263.296 138.965333c7.338667 21.930667 7.338667 43.904-7.296 58.538667-29.269333 43.861333-36.565333 87.765333-14.634667 131.626667 7.338667 14.634667 29.269333 21.973333 43.904 14.634666z m365.696 0c14.634667-7.296 21.930667-29.269333 7.338667-43.861333-7.338667-14.634667-7.338667-43.904 7.296-58.538667 29.269333-36.565333 29.269333-87.765333 14.634667-131.669333-7.338667-14.592-29.269333-21.930667-43.904-14.592-14.634667 7.296-21.930667 29.226667-14.634667 43.861333 7.338667 21.930667 7.338667 43.904-7.296 58.538667-29.269333 43.861333-29.269333 87.765333-7.296 131.626667 7.296 14.634667 21.930667 21.973333 43.861333 14.634666zM468.096 299.946667c14.634667-7.338667 21.973333-29.269333 14.634667-43.904-14.634667-21.930667-7.296-43.904 7.338666-58.496 21.930667-36.608 29.226667-87.808 7.296-131.669334-7.296-14.634667-29.269333-21.930667-43.861333-14.634666-14.634667 7.296-21.973333 29.269333-14.634667 43.904 14.634667 21.930667 7.296 43.861333 0 58.496-29.269333 43.904-36.565333 87.765333-14.634666 131.669333 7.296 14.634667 29.269333 21.930667 43.861333 14.634667z" />
      </g>
    </svg>
  );
};

export default KgBreakIcon;
