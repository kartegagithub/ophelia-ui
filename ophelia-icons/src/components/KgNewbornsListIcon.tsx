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

const KgNewbornsListIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgNewbornsListIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgNewbornsListIcon)` : undefined}>
        <path d="M428.834595 661.725405a22.694054 22.694054 0 0 1-23.441298-22.611027 22.970811 22.970811 0 0 1 23.164541-24.050162c12.841514-0.055351 24.160865 11.208649 23.856432 23.856433a23.773405 23.773405 0 0 1-23.635027 22.804756h0.055352zM600.783568 638.062703a22.694054 22.694054 0 0 1-22.334271 23.635027 23.801081 23.801081 0 0 1-24.686702-22.832433c-0.276757-12.592432 11.07027-23.939459 23.856432-23.828756a22.970811 22.970811 0 0 1 23.164541 23.026162z" /><path d="M500.265514 199.68c43.312432-57.15027 130.601514-64.152216 178.037621-14.225297 13.948541 14.695784 22.33427 32.380541 25.683027 52.03027 4.151351 24.160865 15.387676 39.797622 41.513514 42.758919 12.038919 1.383784 16.162595 9.243676 13.699459 20.978162-3.929946 19.096216-10.378378 37.113081-24.271567 51.559784-28.118486 29.253189-70.84973 25.904432-96.477406-8.081297-5.922595-7.859892-9.880216-17.269622-14.585081-26.015136-3.404108-6.282378-5.977946-13.035243-9.907892-18.930162-11.347027-16.909838-29.197838-16.882162-41.15373-0.359784-8.800865 12.204973-8.579459 15.36 1.771244 26.568649 11.900541 12.896865 19.926486 27.869405 22.500324 45.305081 1.079351 7.195676 4.649514 10.572108 11.264 13.478054a253.619892 253.619892 0 0 1 151.413622 245.95373c-6.282378 120.499892-101.597405 222.623135-220.879568 236.460973-10.627459 1.245405-21.31027 1.909622-31.993081 2.822919v0.083027c-125.481514-0.691892-232.420324-92.824216-250.796973-216.783568-16.633081-112.086486 44.640865-222.678486 149.061189-268.398702 7.112649-3.127351 10.323027-6.97427 11.568433-14.474379 3.459459-21.31027 14.889514-38.08173 30.52627-52.639135 4.704865-4.428108 8.441081-11.264 9.963243-17.60173 8.413405-36.089081 20.369297-70.545297 43.063352-100.490378z m-78.598919 332.883027c-2.048 7.527784-4.400432 15.000216-6.088649 22.666378-2.186378 9.907892-7.804541 14.419027-17.989189 16.660757-34.373189 7.638486-68.441946 16.743784-102.78746 24.797406-9.216 2.131027-11.983568 7.029622-11.208648 15.775135 1.107027 12.841514 0.636541 25.876757 2.712216 38.469189a223.896216 223.896216 0 0 0 250.271135 186.589405c111.975784-14.751135 198.794378-116.708324 193.34227-229.209946-0.304432-6.088649-2.380108-9.049946-8.053621-10.461405-32.103784-8.136649-63.847784-17.989189-96.311352-24.188541-58.506378-11.180973-117.76-13.145946-177.152-8.136648-10.018595 0.83027-16.439351-3.016649-18.985513-13.062919-1.660541-6.752865-3.736216-13.422703-5.645838-20.147892l-2.103351 0.276757z" />
      </g>
    </svg>
  );
};

export default KgNewbornsListIcon;
