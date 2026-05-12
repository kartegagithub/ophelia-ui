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

const KgDesignDevelopmentPuzzlePiecesIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentPuzzlePiecesIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentPuzzlePiecesIcon)` : undefined}>
        <path d="M960.01376 560V80H768.01376c10.08 13.28 16 29.92 16 48 0 44.16-35.84 80-80 80s-80-35.84-80-80c0-18.08 5.92-34.72 16-48H448.01376v176c-13.28-10.08-29.92-16-48-16-44.16 0-80 35.84-80 80s35.84 80 80 80c18.08 0 34.72-5.92 48-16v176h192c-10.08-13.28-16-29.92-16-48 0-44.16 35.84-80 80-80s80 35.84 80 80c0 18.08-5.92 34.72-16 48h192z" /><path d="M1008.01376 1008H496.01376a16 16 0 0 1-16-16V815.68a16 16 0 0 1 25.6-12.8c11.424 8.592 24.72 13.12 38.4 13.12 35.296 0 64-28.704 64-64s-28.704-64-64-64c-13.68 0-26.976 4.528-38.4 13.12a15.952 15.952 0 0 1-25.6-12.8V512a16 16 0 0 1 16-16h192a16 16 0 1 1 0 32H512.01376v133.6a93.856 93.856 0 0 1 32-5.6c52.944 0 96 43.056 96 96s-43.056 96-96 96c-10.992 0-21.76-1.92-32-5.6V976h480v-133.6c-10.24 3.68-21.008 5.6-32 5.6-52.944 0-96-43.056-96-96s43.056-96 96-96c10.992 0 21.76 1.92 32 5.6V528H816.01376a16 16 0 1 1 0-32h192a16 16 0 0 1 16 16v176.32a16 16 0 0 1-25.6 12.8A63.712 63.712 0 0 0 960.01376 688c-35.296 0-64 28.704-64 64s28.704 64 64 64c13.68 0 26.976-4.528 38.4-13.12a16 16 0 0 1 25.6 12.8V992a16 16 0 0 1-16 16z" /><path d="M1008.01376 528H816.01376a15.984 15.984 0 0 1-12.752-25.664A62.816 62.816 0 0 0 816.01376 464c0-35.296-28.704-64-64-64s-64 28.704-64 64c0 13.28 3.904 25.792 11.344 36.384a16 16 0 0 1-11.04 27.616H496.01376a16 16 0 0 1-16-16v-149.408A96.112 96.112 0 0 1 352.01376 272a96.112 96.112 0 0 1 128-90.592V32a16 16 0 0 1 16-16h192a15.984 15.984 0 0 1 12.752 25.664A62.816 62.816 0 0 0 688.01376 80c0 35.296 28.704 64 64 64s64-28.704 64-64c0-14.08-4.4-27.344-12.752-38.336A16 16 0 0 1 816.01376 16h192a16 16 0 0 1 16 16v480a16 16 0 0 1-16 16z m-165.408-32H992.01376V48h-149.408A96.112 96.112 0 0 1 752.01376 176a96.112 96.112 0 0 1-90.592-128H512.01376v160a15.984 15.984 0 0 1-25.664 12.752A62.816 62.816 0 0 0 448.01376 208c-35.296 0-64 28.704-64 64s28.704 64 64 64c14.08 0 27.344-4.4 38.336-12.752A16 16 0 0 1 512.01376 336v160h149.408A96.112 96.112 0 0 1 752.01376 368a96.112 96.112 0 0 1 90.592 128z" /><path d="M496.01376 1008H336.01376a15.984 15.984 0 0 1-12.752-25.664A62.816 62.816 0 0 0 336.01376 944c0-35.296-28.704-64-64-64s-64 28.704-64 64c0 14.08 4.4 27.344 12.752 38.336A16 16 0 0 1 208.01376 1008H16.01376a16 16 0 0 1-16-16V512a16 16 0 0 1 16-16h192a15.984 15.984 0 0 1 12.752 25.664A62.816 62.816 0 0 0 208.01376 560c0 35.296 28.704 64 64 64s64-28.704 64-64c0-14.08-4.4-27.344-12.752-38.336A16 16 0 0 1 336.01376 496h160a16 16 0 1 1 0 32h-133.408A96.112 96.112 0 0 1 272.01376 656a96.112 96.112 0 0 1-90.592-128H32.01376v448h149.408A96.112 96.112 0 0 1 272.01376 848a96.112 96.112 0 0 1 90.592 128H496.01376a16 16 0 1 1 0 32zM400.01376 48c-4.32 0-8.32-1.76-11.36-4.64a16.16 16.16 0 0 1 0-22.72c5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM16.01376 48c-4.16 0-8.32-1.76-11.36-4.64A16.8 16.8 0 0 1 0.01376 32c0-4.32 1.76-8.32 4.64-11.36 6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.04 4.64-11.36 4.64zM16.01376 112c-4.16 0-8.32-1.76-11.36-4.64C1.77376 104.32 0.01376 100.16 0.01376 96s1.6-8.32 4.64-11.36c5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36C24.33376 110.24 20.17376 112 16.01376 112zM16.01376 176c-4.16 0-8.32-1.76-11.36-4.64a16.192 16.192 0 0 1 0-22.72c5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM16.01376 240c-4.16 0-8.32-1.76-11.36-4.64C1.77376 232.32 0.01376 228.32 0.01376 224c0-4.32 1.76-8.32 4.64-11.36 6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM16.01376 304c-4.32 0-8.32-1.76-11.36-4.64C1.77376 296.32 0.01376 292.32 0.01376 288c0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM16.01376 368c-4.16 0-8.32-1.76-11.36-4.64C1.77376 360.32 0.01376 356.16 0.01376 352s1.6-8.32 4.64-11.36c5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.32-1.76 8.32-4.8 11.36-2.88 2.88-6.88 4.64-11.2 4.64zM16.01376 432c-4.16 0-8.32-1.76-11.36-4.64C1.77376 424.32 0.01376 420.32 0.01376 416c0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM336.01376 48c-4.32 0-8.32-1.76-11.36-4.64A16.8 16.8 0 0 1 320.01376 32c0-4.32 1.76-8.32 4.64-11.36 5.76-5.76 16.64-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM272.01376 48c-4.16 0-8.32-1.76-11.36-4.64A16.8 16.8 0 0 1 256.01376 32c0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0a16.16 16.16 0 0 1 0 22.72c-3.04 2.88-7.2 4.64-11.36 4.64zM208.01376 48c-4.16 0-8.32-1.76-11.36-4.64a16.16 16.16 0 0 1 0-22.72c5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM144.01376 48c-4.16 0-8.32-1.76-11.36-4.64a16.16 16.16 0 0 1 0-22.72c5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM80.01376 48c-4.16 0-8.32-1.76-11.36-4.64a16.16 16.16 0 0 1 0-22.72c6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentPuzzlePiecesIcon;
