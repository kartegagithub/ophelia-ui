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

const KgSoftwareIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgSoftwareIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgSoftwareIcon)` : undefined}>
        <path d="M414.592 681.728a33.408 33.408 0 0 1-12.416-44.288 33.664 33.664 0 0 1 45.568-12.608 33.664 33.664 0 0 1 12.16 45.568 33.216 33.216 0 0 1-28.8 16.64 34.56 34.56 0 0 1-16.512-5.312z m104.96-12.416a33.216 33.216 0 1 1 45.312 11.968 33.216 33.216 0 0 1-45.44-11.968h0.064z m-180.736-117.12a32.96 32.96 0 0 1 33.024-33.216 33.216 33.216 0 0 1 33.408 32.128 33.216 33.216 0 0 1-66.432 1.088z m234.496-1.088v-1.152c0-18.304 14.656-33.28 32.96-33.6a32.96 32.96 0 0 1 33.472 32.96 33.216 33.216 0 0 1-66.432 1.792zM400.832 466.752a32.96 32.96 0 0 1 11.968-45.44 33.216 33.216 0 0 1 45.376 11.776 32.576 32.576 0 0 1-28.8 48.704 32.96 32.96 0 0 1-28.544-15.04z m129.28 10.88a32.768 32.768 0 0 1-12.352-44.352 33.216 33.216 0 0 1 44.224-12.608c15.552 8.96 21.12 28.544 12.672 44.288a33.216 33.216 0 0 1-29.056 17.024 34.752 34.752 0 0 1-15.04-4.416h-0.448z m351.168 150.08a27.2 27.2 0 0 0 3.52-9.6 402.496 402.496 0 0 0-194.816-415.296 27.648 27.648 0 0 0-27.712 47.808 346.496 346.496 0 0 1 168.32 354.24 122.624 122.624 0 1 0 50.688 21.888v0.96z m-13.952 131.008a66.432 66.432 0 0 1-114.944-66.368 66.432 66.432 0 0 1 90.816-24.32 66.432 66.432 0 0 1 24.576 90.688h-0.448zM124.288 578.56c15.232 0 27.52-12.288 27.712-27.52a347.136 347.136 0 0 1 223.168-323.392 121.6 121.6 0 1 0-6.848-54.72 34.112 34.112 0 0 0-9.344 1.536A402.496 402.496 0 0 0 96.64 551.104a27.648 27.648 0 0 0 27.648 27.456z m365.12-459.2a66.432 66.432 0 1 1 0 132.864 66.432 66.432 0 0 1 0-132.864z m180.864 739.008a346.88 346.88 0 0 1-391.872-31.872 120.896 120.896 0 1 0-43.584 33.408 24.96 24.96 0 0 0 5.952 7.552 402.688 402.688 0 0 0 457.152 39.168 27.712 27.712 0 0 0-27.648-48v-0.256zM218.624 806.4l0 0z" fillOpacity=".45" />
      </g>
    </svg>
  );
};

export default KgSoftwareIcon;
