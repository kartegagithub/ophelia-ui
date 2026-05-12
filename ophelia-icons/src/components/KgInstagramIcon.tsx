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

const KgInstagramIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgInstagramIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgInstagramIcon)` : undefined}>
        <path d="M751.177143 316.708571a44.251429 44.251429 0 0 1-43.885714 42.422858 43.154286 43.154286 0 1 1 43.885714-42.422858zM512 633.782857A121.782857 121.782857 0 1 1 633.782857 512 121.782857 121.782857 0 0 1 512 633.782857z m0-309.76A187.977143 187.977143 0 1 0 699.977143 512 187.977143 187.977143 0 0 0 512 324.022857z m0-111.908571c97.645714 0 109.714286 0 146.285714 2.194285a215.405714 215.405714 0 0 1 68.022857 12.434286 121.782857 121.782857 0 0 1 69.485715 69.485714 205.165714 205.165714 0 0 1 13.897143 69.485715c1.828571 36.571429 2.194286 50.102857 2.194285 146.285714s0 109.714286-2.194285 146.285714a212.48 212.48 0 0 1-12.8 68.022857 123.245714 123.245714 0 0 1-28.891429 43.52 118.125714 118.125714 0 0 1-42.057143 27.428572 208.091429 208.091429 0 0 1-68.388571 12.434286c-38.765714 1.828571-50.102857 2.194286-146.285715 2.194285s-109.714286 0-148.114285-2.194285a215.405714 215.405714 0 0 1-68.388572-12.8A118.125714 118.125714 0 0 1 252.708571 768a114.834286 114.834286 0 0 1-27.428571-42.057143A215.405714 215.405714 0 0 1 212.48 658.285714v-146.285714-148.114286a219.428571 219.428571 0 0 1 12.8-68.388571 119.954286 119.954286 0 0 1 69.485714-69.12 201.874286 201.874286 0 0 1 67.657143-12.8c39.131429 0 50.468571-2.194286 148.114286-2.194286zM512 146.285714c-99.474286 0-111.908571 0-150.674286 2.194286a277.577143 277.577143 0 0 0-88.868571 16.822857 177.371429 177.371429 0 0 0-64.731429 42.422857 177.371429 177.371429 0 0 0-42.422857 64.731429 277.577143 277.577143 0 0 0-16.822857 88.868571C146.285714 400.091429 146.285714 412.525714 146.285714 512s0 111.908571 2.194286 150.674286a277.577143 277.577143 0 0 0 16.822857 88.868571 189.805714 189.805714 0 0 0 107.154286 107.154286 277.577143 277.577143 0 0 0 88.868571 16.822857c38.765714 0 51.2 2.194286 150.674286 2.194286s111.908571 0 150.674286-2.194286a277.577143 277.577143 0 0 0 88.868571-16.822857 189.805714 189.805714 0 0 0 107.154286-107.154286 277.577143 277.577143 0 0 0 16.822857-88.868571c0-38.765714 2.194286-51.2 2.194286-150.674286s0-111.908571-2.194286-150.674286a277.577143 277.577143 0 0 0-16.822857-88.868571 189.805714 189.805714 0 0 0-107.154286-107.154286 277.577143 277.577143 0 0 0-88.868571-16.822857C623.908571 146.285714 611.474286 146.285714 512 146.285714z" />
      </g>
    </svg>
  );
};

export default KgInstagramIcon;
