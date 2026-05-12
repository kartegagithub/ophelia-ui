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

const KgOrganizationalStructureIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgOrganizationalStructureIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgOrganizationalStructureIcon)` : undefined}>
        <path d="M999.486845 952.406944H891.71327v-416.417297c0-29.439338-19.626225-58.83601-46.548286-68.606456l-205.776704-78.419569c-31.871283-12.245058-66.131845 12.245058-66.131845 46.548286V48.448617c0-34.260562-36.777839-58.793344-68.606456-44.073675L176.380031 151.358301c-26.964727 12.245058-44.116341 39.209784-44.11634 66.131845v734.916798H24.490116c-14.677003 0-24.490116 9.813113-24.490116 24.490116 0 14.719669 9.813113 24.490116 24.490116 24.490115h974.996729c14.677003 0 24.490116-9.813113 24.490116-24.490115a24.532781 24.532781 0 0 0-24.490116-24.490116z m-267.001993-369.911677c19.583559 0 36.692508 17.151614 36.692508 36.777839 0 19.583559-17.108948 36.692508-36.692508 36.692508a37.673819 37.673819 0 0 1-36.777839-36.692508c0-19.626225 17.151614-36.777839 36.735174-36.777839z m0 159.228418c19.583559 0 36.692508 17.151614 36.692508 36.735173 0 19.626225-17.108948 36.777839-36.692508 36.777839a37.673819 37.673819 0 0 1-36.777839-36.735173c0-19.626225 17.151614-36.777839 36.735174-36.777839z m-293.966719-362.53051c19.583559 0 36.692508 17.151614 36.692508 36.692508 0 19.626225-17.108948 36.777839-36.692508 36.777839a37.673819 37.673819 0 0 1-36.777839-36.735174c0-19.626225 14.719669-36.735173 36.735174-36.735173z m0 178.811977c19.583559 0 36.692508 17.151614 36.692508 36.735173 0 19.626225-17.108948 36.777839-36.692508 36.777839a37.673819 37.673819 0 0 1-36.777839-36.777839c0-19.583559 14.719669-36.692508 36.735174-36.692508z m0 183.718533c19.583559 0 36.692508 17.151614 36.692508 36.735173 0 19.626225-17.108948 36.777839-36.692508 36.777839a37.673819 37.673819 0 0 1-36.777839-36.735173c0-19.626225 14.719669-36.777839 36.735174-36.777839z m-171.516141-362.53051c19.626225 0 36.777839 17.151614 36.77784 36.692508 0 19.626225-17.151614 36.777839-36.77784 36.777839a37.673819 37.673819 0 0 1-36.692507-36.735174c0-19.626225 17.108948-36.735173 36.692507-36.735173z m0 178.811977c19.626225 0 36.777839 17.151614 36.77784 36.735173 0 19.626225-17.151614 36.777839-36.77784 36.777839a37.673819 37.673819 0 0 1-36.692507-36.777839c0-19.583559 17.108948-36.692508 36.692507-36.692508z m0 183.718533c19.626225 0 36.777839 17.151614 36.77784 36.735173 0 19.626225-17.151614 36.777839-36.77784 36.777839a37.673819 37.673819 0 0 1-36.692507-36.735173c0-19.626225 17.108948-36.777839 36.692507-36.777839z" />
      </g>
    </svg>
  );
};

export default KgOrganizationalStructureIcon;
