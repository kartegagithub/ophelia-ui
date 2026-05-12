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

const KgDevelopmentIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDevelopmentIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDevelopmentIcon)` : undefined}>
        <path d="M114.3808 182.71573299m-18.2044448 0a18.2044448 18.2044448 0 1 0 36.4088896 0 18.2044448 18.2044448 0 1 0-36.4088896 0Z" /><path d="M235.8044448 182.71573299m-18.2044448 0a18.2044448 18.2044448 0 1 0 36.40888854 0 18.2044448 18.2044448 0 1 0-36.40888854 0Z" /><path d="M175.1836448 182.71573299m-18.2044448 0a18.2044448 18.2044448 0 1 0 36.40888854 0 18.2044448 18.2044448 0 1 0-36.40888854 0Z" /><path d="M308.62222187 446.86222259l54.61333333-54.61333333a18.2044448 18.2044448 0 1 0-25.8503104-25.85031147l-67.72053333 67.90257813a18.2044448 18.2044448 0 0 0 0 25.66826667l67.72053333 67.90257707a18.2044448 18.2044448 0 0 0 25.8503104 0 18.2044448 18.2044448 0 0 0 0-25.66826667zM569.30986667 527.50791112a18.2044448 18.2044448 0 0 0 25.66826667 0L662.88071147 460.51555592a18.2044448 18.2044448 0 0 0 0-25.66826666l-67.90257813-67.90257814a18.2044448 18.2044448 0 0 0-25.66826667 25.85031147l54.61333333 54.61333333-54.61333333 54.61333334a18.2044448 18.2044448 0 0 0 0 25.48622186zM508.87111147 372.22399966a18.2044448 18.2044448 0 0 0-24.9400896 6.7356448L416.75662187 496.92444446a18.2044448 18.2044448 0 1 0 31.4936896 18.2044448l67.90257707-117.41866667a18.2044448 18.2044448 0 0 0-7.28177707-25.48622293z" /><path d="M961.4336 624.35555592a5.27928853 5.27928853 0 0 1-4.9152-3.4588448 189.8723552 189.8723552 0 0 0-30.40142186-52.6108448 5.27928853 5.27928853 0 0 1 0-6.00746666 41.87022187 41.87022187 0 0 0-15.29173334-57.1619552l-13.65333333-8.192V164.51128926a54.61333333 54.61333333 0 0 0-54.61333333-54.61333334H90.16888854a54.61333333 54.61333333 0 0 0-54.61333334 54.61333334v461.30062186a42.5984 42.5984 0 0 0 42.41635627 42.4163552H326.82666667l-18.2044448 67.3564448h-24.2119104a78.8252448 78.8252448 0 0 0-76.64071147 60.6208H162.98666667a18.2044448 18.2044448 0 0 0 0 36.40888854h463.6672a38.59342187 38.59342187 0 0 0 1.27431147 12.92515626 40.96 40.96 0 0 0 19.4787552 25.48622187l38.41137813 22.20942187a41.87022187 41.87022187 0 0 0 57.1619552-15.47377707 5.64337813 5.64337813 0 0 1 5.64337813-2.54862293 177.31128853 177.31128853 0 0 0 60.4387552 0 5.46133333 5.46133333 0 0 1 5.64337814 2.73066666 41.87022187 41.87022187 0 0 0 36.40888853 20.75306667 41.32408853 41.32408853 0 0 0 20.93511147-5.46133333l38.41137706-22.20942187a41.68817813 41.68817813 0 0 0 19.47875627-25.48622187 41.1420448 41.1420448 0 0 0-4.18702293-31.67573333 5.46133333 5.46133333 0 0 1 0-6.18951147 191.5107552 191.5107552 0 0 0 30.40142293-52.4288 5.0972448 5.0972448 0 0 1 4.9152-3.4588448 42.05226667 42.05226667 0 0 0 41.87022187-41.87022186v-44.4188448A41.87022187 41.87022187 0 0 0 961.4336 624.35555592zM71.9644448 164.51128926a18.2044448 18.2044448 0 0 1 18.20444374-18.2044448h752.3896896a18.2044448 18.2044448 0 0 1 18.20444373 18.2044448v54.61333333H71.9644448z m6.00746667 467.30808853a6.00746667 6.00746667 0 0 1-6.00746667-6.00746667V255.53351112h788.79857707V478.71999966a41.68817813 41.68817813 0 0 0-46.05724373 18.2044448 5.27928853 5.27928853 0 0 1-5.46133334 2.36657813 186.9596448 186.9596448 0 0 0-60.43875626 0 5.0972448 5.0972448 0 0 1-5.46133334-2.36657813 41.68817813 41.68817813 0 0 0-57.1619552-15.29173334l-38.41137813 22.20942187a40.7779552 40.7779552 0 0 0-19.4787552 25.30417813 42.23431147 42.23431147 0 0 0 4.00497813 31.85777814 4.9152 4.9152 0 0 1 0 6.00746666 189.8723552 189.8723552 0 0 0-30.40142293 52.61084374 5.27928853 5.27928853 0 0 1-4.9152 3.4588448 41.68817813 41.68817813 0 0 0-24.75804373 8.192zM563.4844448 735.58471112H345.03111147l18.20444373-67.3564448h191.14666667v41.68817814a42.23431147 42.23431147 0 0 0 9.10222293 25.66826666z m-278.8920896 36.40888854h324.03911147a200.24888853 200.24888853 0 0 0 14.19946667 24.21191146H246.18097814a42.4163552 42.4163552 0 0 1 38.22933333-24.21191146z m682.30257814-62.0771552a5.46133333 5.46133333 0 0 1-5.46133334 5.46133333 42.05226667 42.05226667 0 0 0-39.1395552 26.94257813 154.0096 154.0096 0 0 1-24.39395626 42.4163552 42.05226667 42.05226667 0 0 0-3.82293334 47.3315552 4.7331552 4.7331552 0 0 1 0 4.00497814 5.27928853 5.27928853 0 0 1-2.54862186 3.4588448L853.66328854 861.01333299a5.46133333 5.46133333 0 0 1-7.46382187-2.18453333 42.05226667 42.05226667 0 0 0-43.14453333-20.20693334 144.1792 144.1792 0 0 1-48.42382187 0 42.05226667 42.05226667 0 0 0-43.14453333 20.38897814 5.64337813 5.64337813 0 0 1-7.46382294 2.00248853l-38.41137706-22.20942187a5.27928853 5.27928853 0 0 1-2.54862294-3.4588448 4.7331552 4.7331552 0 0 1 0-4.00497706 42.4163552 42.4163552 0 0 0-3.82293333-47.33155627 152.00711147 152.00711147 0 0 1-24.576-42.4163552A41.50613333 41.50613333 0 0 0 596.2524448 715.37777779a5.46133333 5.46133333 0 0 1-5.46133333-5.46133333v-44.4188448a5.27928853 5.27928853 0 0 1 5.46133333-5.46133334 41.87022187 41.87022187 0 0 0 38.9575104-26.94257706 149.45848853 149.45848853 0 0 1 24.576-42.41635627 42.4163552 42.4163552 0 0 0 3.82293334-47.3315552 5.0972448 5.0972448 0 0 1 0-4.18702187 4.7331552 4.7331552 0 0 1 2.54862293-3.2768l38.41137707-22.20942293a5.0972448 5.0972448 0 0 1 2.73066666 0 5.46133333 5.46133333 0 0 1 4.55111147 2.54862293 42.23431147 42.23431147 0 0 0 43.14453333 20.38897707 144.1792 144.1792 0 0 1 48.42382187 0A42.4163552 42.4163552 0 0 0 846.19946667 515.12888926a5.27928853 5.27928853 0 0 1 7.28177813-1.8204448l38.41137707 22.20942186a4.7331552 4.7331552 0 0 1 2.54862293 3.2768 5.0972448 5.0972448 0 0 1 0 4.18702294 41.87022187 41.87022187 0 0 0 3.82293334 47.1495104 154.91982187 154.91982187 0 0 1 24.3939552 42.5984A42.23431147 42.23431147 0 0 0 961.4336 660.76444446a5.27928853 5.27928853 0 0 1 5.46133334 5.46133333z" /><path d="M778.84302187 605.05884446a82.64817813 82.64817813 0 1 0 82.64817813 82.64817813 82.64817813 82.64817813 0 0 0-82.64817813-82.64817813z m0 128.88746666a46.23928853 46.23928853 0 1 1 46.2392896-46.23928853A46.23928853 46.23928853 0 0 1 778.84302187 733.58222259z" />
      </g>
    </svg>
  );
};

export default KgDevelopmentIcon;
