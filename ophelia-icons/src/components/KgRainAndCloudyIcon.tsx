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

const KgRainAndCloudyIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgRainAndCloudyIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgRainAndCloudyIcon)` : undefined}>
        <path d="M378.92352 473.6c0-101.418667 91.818667-183.936 204.544-183.936 24.405333 0 48 3.754667 70.485333 11.221333a188.970667 188.970667 0 0 1 87.04-49.92 180.437333 180.437333 0 0 0-160.981333-100.138666c-14.634667 0-29.226667 1.706667-43.306667 5.248a25.856 25.856 0 0 1-27.477333-10.410667 198.656 198.656 0 0 0-163.541333-86.101333 197.717333 197.717333 0 0 0-133.802667 51.968 197.76 197.76 0 0 0-63.701333 127.36 25.813333 25.813333 0 0 1-14.592 20.821333 130.133333 130.133333 0 0 0-7.168 3.669333 24.106667 24.106667 0 0 1-6.826667 2.602667A154.154667 154.154667 0 0 0 34.09152 318.848 150.186667 150.186667 0 0 0 0.000853 414.677333c0 84.053333 68.736 152.362667 153.258667 152.362667h184.021333c5.12-31.36 19.413333-60.885333 41.813334-85.546667a150.016 150.016 0 0 1-0.213334-7.893333h0.042667z" /><path d="M225.83552 958.08a25.813333 25.813333 0 0 0 24.661333-33.408l-31.146666-101.376a25.813333 25.813333 0 0 0-49.322667 15.146667l31.104 101.376c3.413333 11.093333 13.610667 18.261333 24.618667 18.261333h0.085333zM441.89952 958.08a25.813333 25.813333 0 0 0 24.661333-33.408l-31.104-101.376a25.813333 25.813333 0 0 0-49.322666 15.146667l31.061333 101.376c3.413333 11.093333 13.653333 18.261333 24.661333 18.261333zM657.96352 958.08a25.813333 25.813333 0 0 0 24.661333-33.408l-31.104-101.376a25.813333 25.813333 0 0 0-49.322666 15.146667l31.061333 101.376c3.413333 11.093333 13.653333 18.261333 24.661333 18.261333h0.042667z" /><path d="M935.680853 477.994667a25.813333 25.813333 0 0 1-15.488-33.024c3.968-11.050667 5.973333-22.485333 5.973334-34.133334 0-48.938667-35.754667-90.837333-85.845334-107.349333a151.765333 151.765333 0 0 0-73.301333-5.376c-34.432 5.802667-65.152 23.253333-85.12 49.066667a25.728 25.728 0 0 1-30.592 7.850666A170.752 170.752 0 0 0 583.46752 341.333333c-84.352 0-152.96 59.392-152.96 132.352 0 4.693333 0.298667 9.514667 0.853333 14.208a25.728 25.728 0 0 1-7.68 21.76c-17.066667 16.426667-28.586667 36.266667-33.792 57.472a107.605333 107.605333 0 0 0 0.085334 51.626667c13.909333 56.064 71.637333 98.218667 140.544 98.218667h349.696c79.232 0 143.786667-55.722667 143.786666-124.245334 0-50.261333-34.688-95.274667-88.405333-114.688h0.042667z" />
      </g>
    </svg>
  );
};

export default KgRainAndCloudyIcon;
