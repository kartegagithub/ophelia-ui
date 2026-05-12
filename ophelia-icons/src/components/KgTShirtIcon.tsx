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

const KgTShirtIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgTShirtIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgTShirtIcon)` : undefined}>
        <path d="M660.614737 872.299789c-20.385684 2.937263-40.825263 3.381895-61.345684 3.961264l-152.037053 0.983579c-3.826526-0.107789-7.585684-0.808421-11.398737-0.943158l-27.02821-0.794948c-4.621474-0.336842-9.189053-1.266526-13.810527-1.536l-45.743158-3.678315c-35.691789-3.961263-62.315789-13.298526-72.609684-53.61179-3.435789-13.446737-2.088421-28.106105-2.088421-41.943579V527.791158c0-4.985263 0.727579-11.883789-0.673684-16.666947l-3.624421-16.720843c-13.918316 12.045474-19.806316 13.231158-37.591579 9.633685-49.259789-9.997474-115.671579-48.747789-135.370105-96.336842-10.778947-26.044632-4.338526-41.121684 11.749052-61.413053l57.734737-66.465684c22.905263-25.451789 39.666526-46.457263 71.976421-60.281263 18.458947-7.909053 37.632-13.056 55.808-21.800422l56.373895-28.294736c24.239158-12.611368 32.970105-19.577263 60.645053-22.757053 2.411789-0.485053 6.602105-0.538947 8.838736 0.431158l0.579369 0.269474c9.472 3.947789 11.506526 14.834526 17.152 22.528 33.091368 45.123368 125.035789 42.792421 151.632842-6.426948 3.503158-6.467368 4.554105-12.880842 12.288-15.912421l0.741053-0.269474c19.267368-7.424 52.197053 14.645895 68.203789 22.474106l69.402947 33.387789 34.128843 12.719158c37.699368 14.012632 55.147789 32.498526 80.774736 62.154105l60.362106 72.569264c3.543579 4.163368 8.218947 8.986947 10.482526 13.985684l0.202105 0.471579c8.757895 17.664-0.916211 41.337263-10.603789 56.441263-23.659789 36.877474-61.534316 62.369684-102.265263 76.867368-23.767579 8.461474-38.507789 14.403368-58.354527-2.277052l-3.570526 10.64421c-4.581053 11.964632-2.155789 29.426526-2.15579 42.105263v239.009685c0 23.942737 0.579368 38.885053-16.464842 58.987789-18.202947 21.463579-46.295579 23.363368-72.353684 25.465263z m-46.726737-697.370947c-34.883368 71.599158-158.221474 72.218947-200.272842 8.515369l-4.661895-8.124632c-3.610947 0.309895-6.912 0.565895-10.307368 1.926737-1.913263 3.705263 2.330947 18.822737 4.176842 23.44421l3.799579 11.223579c3.772632 9.889684 7.356632 20.143158 12.934737 29.197474 14.484211 26.408421 36.769684 48.909474 66.182736 57.626947 67.233684 19.941053 117.827368-37.322105 134.925474-96.66021l5.982316-24.858948-12.759579-2.290526z m-241.569684 15.238737l-74.819369 36.850526c-41.768421 18.593684-73.539368 20.156632-101.874526 61.80379 73.458526 21.099789 120.144842 86.069895 102.938947 161.872842-1.845895 8.057263-4.136421 17.408-7.31621 25.061052l0.336842 0.350316c12.746105 15.872 10.401684 65.428211 10.401684 84.682106l-0.053895 213.935157 37.22779 5.173895 105.835789 6.521263c3.786105 0.134737 7.504842 0.848842 11.304421 0.943158l117.962106 0.013474c3.584-0.094316 7.087158-0.848842 10.64421-0.943158l27.189895-0.282947 110.376421-7.639579v-58.260211l0.080842-204.759579c0.498526-11.722105 3.880421-24.037053 8.488421-34.856421 1.832421-4.271158 3.004632-4.163368 1.374316-8.461474l-3.179789-8.488421c-5.672421-16.357053-6.790737-26.677895-6.790737-43.52 0-67.193263 45.123368-109.136842 102.858105-133.982315-26.516211-37.160421-59.365053-41.498947-98.128842-58.610527l-75.843369-37.093052c-1.657263 11.452632-4.810105 21.800421-8.663579 32.66021-24.791579 69.928421-90.314105 125.938526-166.211368 101.874527-57.505684-18.229895-94.073263-78.012632-104.138105-134.844632z m474.327579 122.071579c-14.201263 1.077895-26.031158 7.006316-38.197895 13.97221-30.194526 17.313684-51.065263 39.936-57.667368 75.183158-3.678316 19.550316-1.859368 55.376842 14.888421 69.605053l0.107789-0.579368c1.172211-6.224842 4.217263-12.301474 7.464421-17.704422 21.409684-34.425263 75.385263-75.129263 113.152-94.396631l-31.770947-39.78779c-1.576421-2.101895-3.004632-4.486737-4.958316-6.251789l-3.018105-0.040421z m-673.522527 1.131789l-37.995789 44.436211c32.309895 19.415579 99.759158 61.749895 118.029474 95.986526 2.613895 4.931368 4.715789 10.320842 7.801263 14.969263l0.202105-0.417684c2.721684-5.632 6.359579-10.442105 8.623158-16.384 11.560421-30.154105 1.967158-71.235368-16.963368-95.932631-17.704421-23.093895-50.445474-40.933053-79.696843-42.657685z m-54.595368 67.880421c-0.148211 3.139368 0.606316 5.766737 1.482105 8.757895l1.010527 2.991158c15.036632 38.359579 71.248842 73.377684 111.858526 82.809263-8.704-23.525053-41.148632-47.952842-60.874105-61.305263l-45.702737-29.359158c-1.778526-1.050947-5.605053-4.527158-7.774316-3.907368z m782.214737 0c-7.653053 4.149895-14.874947 10.118737-22.231579 14.874948-27.971368 18.054737-73.229474 45.514105-85.167158 78.874947l1.401263 0.067369c35.759158-9.876211 80.437895-37.982316 99.328-71.410527 1.711158-3.018105 11.129263-22.312421 6.669474-22.406737zM302.753684 802.250105c-0.889263 1.374316-0.700632 2.371368-0.431158 4.001684l2.92379 9.256422c7.275789 21.099789 23.417263 25.074526 43.021473 27.014736l91.041685 6.898527h144.060631l37.982316-1.482106c8.030316-0.485053 16.114526-1.495579 24.198737-2.034526l11.681684-1.347368c18.054737-1.549474 40.690526-0.350316 54.029474-14.592a47.130947 47.130947 0 0 0 10.967579-23.875369c-11.843368-0.094316-23.498105 2.182737-35.287579 3.085474l-71.424 4.527158c-16.357053 0.943158-32.929684-0.107789-49.313684 0.350316-4.742737 0.134737-9.364211 1.226105-14.160843 1.320421l-80.774736-0.080842-88.980211-3.853474c-3.193263-0.188632-6.292211-0.794947-9.458526-1.037474l-46.713263-4.648421c-7.720421-1.050947-15.750737-1.886316-23.363369-3.503158z" />
      </g>
    </svg>
  );
};

export default KgTShirtIcon;
