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

const KgPartlycloudyWRainIcon: React.FC<IconProps> = ({
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
    const p = "0 0 1025 1024".trim().split(/[\s,]+/).map(Number);
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
      viewBox="0 0 1025 1024"
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
          <linearGradient id="duotone-KgPartlycloudyWRainIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgPartlycloudyWRainIcon)` : undefined}>
        <path d="M963.84 454.101333a25.130667 25.130667 0 0 1-8.789333-12.8 185.344 185.344 0 0 0-177.28-133.12c-15.061333 0-30.037333 1.792-44.544 5.418667a24.832 24.832 0 0 1-26.453334-10.026667 203.989333 203.989333 0 0 0-305.536-35.114666 203.392 203.392 0 0 0-65.493333 130.944 24.789333 24.789333 0 0 1-13.994667 20.053333 127.445333 127.445333 0 0 0-7.338666 3.754667 23.125333 23.125333 0 0 1-6.613334 2.474666c-34.432 7.68-65.706667 27.050667-88.021333 54.485334a154.538667 154.538667 0 0 0-35.072 98.645333c0 86.570667 70.784 156.970667 157.866667 156.970667H867.968c87.04 0 157.866667-70.4 157.866667-156.970667 0-49.237333-22.613333-94.72-61.994667-124.672z" /><path d="M412.501333 995.285333a24.832 24.832 0 0 0 23.68-32.085333l-29.866666-97.450667a24.832 24.832 0 0 0-47.402667 14.549334l29.866667 97.450666a24.746667 24.746667 0 0 0 23.68 17.493334h0.042666zM620.202667 995.285333a24.832 24.832 0 0 0 23.68-32.085333l-29.866667-97.450667a24.832 24.832 0 0 0-47.445333 14.549334l29.866666 97.450666a24.746667 24.746667 0 0 0 23.722667 17.493334zM827.861333 995.285333a24.832 24.832 0 0 0 23.68-32.085333l-29.866666-97.450667a24.832 24.832 0 0 0-47.402667 14.549334l29.866667 97.450666a24.746667 24.746667 0 0 0 23.68 17.493334h0.042666z" /><path d="M185.642667 331.349333c0 30.976 11.434667 60.16 31.829333 82.730667a208.512 208.512 0 0 1 70.826667-34.688A252.757333 252.757333 0 0 1 373.888 226.474667a123.477333 123.477333 0 0 0-188.245333 104.917333v-0.042667zM284.16 47.189333V116.906667a24.746667 24.746667 0 1 0 49.621333 0V47.189333a24.746667 24.746667 0 1 0-49.621333 0zM201.813333 170.538667a24.832 24.832 0 0 0 21.461334-37.205334L188.288 72.832a24.832 24.832 0 0 0-42.965333 24.789333l34.944 60.416a24.746667 24.746667 0 0 0 21.504 12.458667zM135.722667 202.709333l-60.416-34.901333A24.746667 24.746667 0 1 0 50.474667 210.773333l60.416 34.901334a24.789333 24.789333 0 0 0 24.789333-42.965334zM119.381333 331.349333a24.746667 24.746667 0 0 0-24.789333-24.789333H24.789333a24.746667 24.746667 0 1 0 0 49.578667h69.802667a24.746667 24.746667 0 0 0 24.746667-24.746667zM135.722667 460.032a24.832 24.832 0 0 0-24.789334-42.965333l-60.458666 34.901333a24.832 24.832 0 0 0 24.832 42.965333l60.416-34.901333zM403.754667 167.168a24.789333 24.789333 0 0 0 33.877333-9.088l34.901333-60.416a24.746667 24.746667 0 1 0-42.965333-24.746667l-34.901333 60.373334a24.832 24.832 0 0 0 9.088 33.877333z" />
      </g>
    </svg>
  );
};

export default KgPartlycloudyWRainIcon;
