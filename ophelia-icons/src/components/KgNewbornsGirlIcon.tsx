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

const KgNewbornsGirlIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgNewbornsGirlIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgNewbornsGirlIcon)` : undefined}>
        <path d="M433.2544 668.603733a22.9376 22.9376 0 0 1-23.6544-22.869333 23.210667 23.210667 0 0 1 23.415467-24.302933c12.970667 0 24.405333 11.332267 24.098133 24.098133a24.029867 24.029867 0 0 1-23.893333 23.074133h0.034133zM607.0272 644.676267a22.9376 22.9376 0 0 1-22.596267 23.893333 24.064 24.064 0 0 1-24.917333-23.074133c-0.3072-12.731733 11.1616-24.1664 24.098133-24.098134a23.210667 23.210667 0 0 1 23.415467 23.278934z" /><path d="M505.480533 201.762133c43.758933-57.719467 131.925333-64.8192 179.882667-14.336 14.062933 14.813867 22.528 32.699733 25.941333 52.565334 4.164267 24.3712 15.530667 40.174933 41.915734 43.178666 12.151467 1.365333 16.315733 9.3184 13.858133 21.162667-3.9936 19.319467-10.513067 37.546667-24.576 52.087467-28.398933 29.5936-71.543467 26.180267-97.450667-8.157867-5.973333-7.918933-9.9328-17.442133-14.711466-26.282667-3.413333-6.3488-6.0416-13.175467-10.001067-19.114666-11.4688-17.066667-29.525333-17.066667-41.608533-0.341334-8.874667 12.322133-8.669867 15.530667 1.809066 26.8288 12.014933 13.038933 20.138667 28.125867 22.7328 45.738667 1.092267 7.304533 4.676267 10.683733 11.3664 13.653333a256.273067 256.273067 0 0 1 152.9856 248.490667c-6.3488 121.719467-102.673067 224.938667-223.197866 238.933333-10.717867 1.262933-21.504 1.877333-32.290134 2.798934l-0.034133 0.1024c-126.7712-0.682667-234.8032-93.7984-253.371733-219.0336-16.7936-113.220267 45.124267-224.9728 150.596266-271.1552 7.202133-3.1744 10.4448-7.0656 11.707734-14.677334 3.515733-21.504 15.0528-38.434133 30.856533-53.1456 4.778667-4.437333 8.4992-11.3664 10.001067-17.783466 8.533333-36.488533 20.650667-71.236267 43.588266-101.512534z m-79.428266 336.349867c-2.048 7.5776-4.437333 15.121067-6.144 22.869333-2.218667 10.001067-7.918933 14.574933-18.2272 16.827734-34.7136 7.714133-69.12 16.930133-103.799467 25.053866-9.352533 2.184533-12.117333 7.133867-11.332267 15.9744 1.1264 12.936533 0.648533 26.112 2.730667 38.843734a226.2016 226.2016 0 0 0 252.859733 188.5184c113.117867-14.882133 200.840533-117.896533 195.345067-231.560534-0.341333-6.144-2.389333-9.181867-8.123733-10.581333-32.426667-8.226133-64.512-18.193067-97.28-24.439467-59.153067-11.298133-119.022933-13.243733-179.029334-8.192-10.103467 0.853333-16.622933-3.072-19.182933-13.2096-1.706667-6.826667-3.7888-13.6192-5.700267-20.3776l-2.116266 0.273067z" />
      </g>
    </svg>
  );
};

export default KgNewbornsGirlIcon;
