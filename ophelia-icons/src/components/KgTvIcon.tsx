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

const KgTvIcon: React.FC<IconProps> = ({
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
    const p = "0 0 1109 1024".trim().split(/[\s,]+/).map(Number);
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
      viewBox="0 0 1109 1024"
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
          <linearGradient id="duotone-KgTvIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgTvIcon)` : undefined}>
        <path d="M1087.598532 697.372965h-39.48586v-44.355783h17.189511V44.355809H44.355783v608.661373H748.915148v44.355783H22.16473A22.191053 22.191053 0 0 1 0 675.181911V22.164756A22.16473 22.16473 0 0 1 22.16473 0.000026h1065.433802a22.16473 22.16473 0 0 1 22.191054 22.16473v653.017155a22.191053 22.191053 0 0 1-22.191054 22.191054zM726.724094 834.836406H383.039168a22.191053 22.191053 0 0 1 0-44.355783h343.684926a22.191053 22.191053 0 1 1 0 44.355783z" /><path d="M446.79567 721.748902h44.355783v95.897993h-44.355783zM618.638133 721.748902h44.355783v95.897993h-44.355783zM417.41819 473.961968a22.16473 22.16473 0 0 1-22.16473-22.16473V245.575753a22.16473 22.16473 0 1 1 44.329459 0v206.221485a22.16473 22.16473 0 0 1-22.164729 22.16473z" /><path d="M503.339422 267.740482h-171.842464a22.191053 22.191053 0 1 1 0-44.355783h171.842464a22.191053 22.191053 0 0 1 0 44.355783zM692.318748 473.961968a22.191053 22.191053 0 0 1-20.479999-13.635784L585.970165 254.104698a22.16473 22.16473 0 1 1 40.933675-17.057891L692.318748 394.121559l65.441233-157.074752a22.191053 22.191053 0 1 1 40.959998 17.057891l-85.947555 206.221486a22.112082 22.112082 0 0 1-20.453676 13.635784zM1001.677301 1024h-206.195162a22.16473 22.16473 0 0 1-22.191053-22.191053V520.528959a22.191053 22.191053 0 0 1 22.191053-22.191053h206.195162a22.217377 22.217377 0 0 1 22.191053 22.191053v481.148368a22.191053 22.191053 0 0 1-22.191053 22.322673z m-184.030433-44.487402h161.865703V542.693688h-161.865703z" /><path d="M847.024348 721.748902h34.379023v44.355783h-34.379023zM915.756069 721.748902h34.379022v44.355783h-34.379022zM847.024348 790.480623h34.379023v44.355783h-34.379023zM915.756069 790.480623h34.379022v44.355783h-34.379022zM847.024348 859.212344h34.379023v44.355782h-34.379023zM915.756069 859.212344h34.379022v44.355782h-34.379022z" />
      </g>
    </svg>
  );
};

export default KgTvIcon;
