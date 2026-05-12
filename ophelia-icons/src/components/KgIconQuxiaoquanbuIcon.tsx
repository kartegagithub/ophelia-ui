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

const KgIconQuxiaoquanbuIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgIconQuxiaoquanbuIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgIconQuxiaoquanbuIcon)` : undefined}>
        <path d="M372.224 704c14.08 0 26.496-4.672 37.312-13.952L608 510.72l198.4 179.328a55.424 55.424 0 0 0 37.376 13.504c7.552 0 14.08-1.088 19.84-3.328a50.368 50.368 0 0 0 23.616-17.344 43.008 43.008 0 0 0 8.768-26.24V111.36a43.008 43.008 0 0 0-8.768-26.24 50.368 50.368 0 0 0-23.68-17.28 52.48 52.48 0 0 0-19.776-3.84H372.224a52.48 52.48 0 0 0-19.84 3.84 50.368 50.368 0 0 0-23.616 17.28 43.008 43.008 0 0 0-8.768 26.24v545.28c0 9.6 2.944 18.304 8.768 26.24a50.368 50.368 0 0 0 23.68 17.28 52.48 52.48 0 0 0 19.776 3.84z" /><path d="M185.984 896a62.08 62.08 0 0 0 41.536-15.36L448 683.328l220.48 197.312a61.952 61.952 0 0 0 41.536 14.912c8.32 0 15.68-1.28 22.016-3.712a55.936 55.936 0 0 0 26.24-19.136 47.04 47.04 0 0 0 9.728-28.8V244.096a47.04 47.04 0 0 0-9.728-28.8 55.936 55.936 0 0 0-26.24-19.136 58.88 58.88 0 0 0-22.016-4.16H185.984a58.88 58.88 0 0 0-22.016 4.16 55.936 55.936 0 0 0-26.24 19.136 47.04 47.04 0 0 0-9.728 28.8v599.808c0 10.56 3.2 20.16 9.728 28.8a55.936 55.936 0 0 0 26.24 19.136 58.88 58.88 0 0 0 22.016 4.16z" /><path d="M768 987.456c29.696 0 58.112-5.76 85.312-17.408a219.264 219.264 0 0 0 69.952-46.72c19.52-19.52 35.136-42.88 46.72-70.016 11.648-27.136 17.472-55.68 17.472-85.44 0-29.824-5.824-58.24-17.472-85.12a220.992 220.992 0 0 0-46.72-70.08 219.264 219.264 0 0 0-69.952-46.72A215.104 215.104 0 0 0 768 548.48c-29.696 0-58.112 5.76-85.312 17.408a219.264 219.264 0 0 0-69.952 46.72 221.44 221.44 0 0 0-46.72 69.888 213.888 213.888 0 0 0-17.472 85.312c0 29.824 5.824 58.24 17.472 85.44 11.584 27.136 27.2 50.496 46.72 70.016 19.52 19.584 42.88 35.2 69.952 46.72 27.2 11.584 55.616 17.408 85.312 17.408z m-129.984-134.4a152.832 152.832 0 0 1-25.472-85.184c0-28.16 7.04-54.144 20.864-78.08 13.952-23.872 32.768-42.752 56.576-56.64A152.32 152.32 0 0 1 768 612.352c31.424 0 60.032 8.64 85.76 25.92l-215.744 214.72zM768 923.584c-30.464 0-58.752-8.448-84.864-25.344l215.424-214.4c16.64 25.408 24.896 53.376 24.896 83.968 0 21.12-4.096 41.216-12.288 60.48-8.192 19.264-19.264 35.84-33.152 49.728a158.08 158.08 0 0 1-110.016 45.568z" />
      </g>
    </svg>
  );
};

export default KgIconQuxiaoquanbuIcon;
