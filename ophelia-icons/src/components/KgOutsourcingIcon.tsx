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

const KgOutsourcingIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgOutsourcingIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgOutsourcingIcon)` : undefined}>
        <path d="M91.050667 722.474667v-55.253334c0-25.173333 12.842667-45.610667 38.570666-61.397333 25.728-15.786667 59.648-23.68 101.76-23.68 7.594667 0 14.890667 0.170667 21.888 0.426667 7.04 0.341333 13.738667 1.066667 20.181334 2.218666-8.192 12.288-14.336 25.173333-18.389334 38.570667a143.786667 143.786667 0 0 0-6.144 42.112v57.002667h-157.866666z m210.474666 0v-57.002667c0-18.688 5.12-35.84 15.36-51.285333 10.24-15.530667 24.704-29.098667 43.392-40.789334 18.730667-11.690667 41.088-20.48 67.072-26.325333A385.834667 385.834667 0 0 1 512 538.325333c30.976 0 59.477333 2.901333 85.504 8.746667 26.026667 5.845333 48.384 14.634667 67.072 26.325333 18.730667 11.690667 33.066667 25.258667 43.008 40.789334 9.941333 15.488 14.933333 32.597333 14.933333 51.285333v57.002667H301.482667z m473.6 0v-57.002667a157.44 157.44 0 0 0-5.717333-42.965333 137.429333 137.429333 0 0 0-17.109333-37.717334 145.92 145.92 0 0 1 19.712-2.176c6.741333-0.298667 13.610667-0.426667 20.608-0.426666 42.112 0 76.032 7.68 101.76 23.210666 25.728 15.488 38.570667 36.096 38.570666 61.866667v55.210667h-157.866666zM376.021333 652.373333h272.768c-5.888-11.690667-22.101333-21.930667-48.682666-30.72A280.32 280.32 0 0 0 512 608.469333a280.32 280.32 0 0 0-88.149333 13.141334c-26.581333 8.789333-42.538667 19.029333-47.786667 30.72z m-144.682666-105.258666c-19.328 0-35.84-6.826667-49.578667-20.608a67.584 67.584 0 0 1-20.608-49.536c0-19.882667 6.869333-36.565333 20.608-50.005334a68.266667 68.266667 0 0 1 49.578667-20.181333c19.84 0 36.522667 6.741333 49.962666 20.181333 13.44 13.44 20.181333 30.122667 20.181334 50.005334 0 19.285333-6.741333 35.84-20.181334 49.536a67.157333 67.157333 0 0 1-49.962666 20.608z m561.28 0c-19.328 0-35.84-6.826667-49.578667-20.608a67.584 67.584 0 0 1-20.608-49.536c0-19.882667 6.869333-36.565333 20.608-50.005334 13.738667-13.44 30.293333-20.181333 49.578667-20.181333 19.84 0 36.522667 6.741333 49.962666 20.181333 13.44 13.44 20.181333 30.122667 20.181334 50.005334a68.266667 68.266667 0 0 1-20.181334 49.536 67.157333 67.157333 0 0 1-49.962666 20.608zM512 512c-29.226667 0-54.101333-10.24-74.538667-30.72a101.504 101.504 0 0 1-30.72-74.538667c0-29.781333 10.24-54.784 30.72-74.965333A102.229333 102.229333 0 0 1 512 301.482667c29.824 0 54.826667 10.112 74.965333 30.293333 20.181333 20.181333 30.293333 45.184 30.293334 74.965333 0 29.269333-10.112 54.101333-30.293334 74.581334C566.826667 501.76 541.866667 512 512 512z m0-70.144a33.962667 33.962667 0 0 0 25.002667-10.112 33.962667 33.962667 0 0 0 10.069333-25.002667 33.962667 33.962667 0 0 0-10.069333-24.96A33.92 33.92 0 0 0 512 371.626667a33.92 33.92 0 0 0-25.002667 10.112 33.962667 33.962667 0 0 0-10.069333 24.96c0 9.941333 3.370667 18.304 10.069333 25.002666a33.962667 33.962667 0 0 0 25.002667 10.112z" />
      </g>
    </svg>
  );
};

export default KgOutsourcingIcon;
