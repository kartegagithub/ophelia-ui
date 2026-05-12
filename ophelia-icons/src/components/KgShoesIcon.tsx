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

const KgShoesIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgShoesIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgShoesIcon)` : undefined}>
        <path d="M432.235789 408.683789c-3.597474-16.491789 2.290526-22.029474 17.77179-17.637052a8.111158 8.111158 0 0 0 6.157474-1.010526c5.888-4.257684 11.425684-8.919579 14.888421-14.362948 1.482105-5.443368 1.347368-12.934737 4.904421-15.76421 3.961263-3.098947 11.317895-1.953684 17.165473-2.640842 0.215579 0.943158 0.390737 1.886316 0.592843 2.789052 4.271158-3.503158 8.488421-7.046737 12.826947-10.469052 4.311579-3.408842 8.057263-5.888 6.130526-13.312-2.074947-7.989895 7.706947-14.861474 15.683369-11.479579 4.729263 1.994105 7.289263 0.875789 10.576842-2.048 7.397053-6.602105 14.996211-12.934737 22.662737-19.213474 8.838737-7.221895 18.849684-9.135158 29.534315-4.877474 45.675789 18.229895 93.170526 29.978947 141.406316 38.588632 59.823158 10.711579 120.064 17.475368 181.045895 15.696842 13.770105-0.390737 23.754105 7.558737 27.984842 21.827368 12.328421 41.350737 16.747789 83.604211 14.551579 126.625685-1.899789 37.349053-8.798316 73.741474-20.008421 109.379368-1.374316 4.311579-1.926737 9.094737-1.967158 13.662316-0.175158 23.538526 0 47.077053-0.107789 70.642526-0.094316 20.682105-11.722105 32.390737-32.673685 32.431158-66.829474 0.107789-133.699368 0.107789-200.569263 0-21.530947 0-32.781474-11.546947-32.848842-33.010526v-5.241264c-0.107789-9.903158-0.983579-10.671158-10.752-8.299789-43.290947 10.536421-86.366316 22.137263-129.953684 31.447579-52.924632 11.331368-106.832842 15.036632-160.916211 15.090526-87.565474 0.121263-175.130947 0.040421-262.736842 0-25.6 0-36.217263-10.549895-36.217263-35.934316 0-24.414316-0.067368-48.855579 0-73.256421 0.175158-60.321684 44.422737-106.307368 104.879158-106.522947 77.864421-0.269474 148.129684-22.514526 211.267368-67.570526 4.001684-2.856421 7.612632-4.661895 6.521264-11.358316-1.212632-7.639579 7.545263-14.336 14.686315-11.129263 6.656 3.004632 10.186105 0.134737 14.524632-3.206737 4.136421-3.206737 8.353684-6.332632 12.961684-9.862737l0.040421 0.040421z m-22.541473 47.535158c-8.407579 5.605053-14.753684 10.320842-21.557895 14.18779-5.254737 2.991158-6.359579 5.955368-4.190316 11.856842a1811.806316 1811.806316 0 0 1 24.522106 69.834105c2.519579 7.733895 6.373053 9.593263 13.97221 8.717474 30.127158-3.489684 60.240842-7.329684 90.47579-9.485474 40.690526-2.923789 81.515789-5.295158 122.314105-6.238316 37.025684-0.835368 62.315789 18.027789 76.530526 51.631158 2.209684 5.227789 5.012211 6.602105 10.374737 6.602106 60.981895-0.188632 121.990737-0.215579 182.972632 0.053894 6.332632 0 8.798316-2.196211 9.916631-7.868631 4.904421-25.034105 11.52-49.825684 14.713263-75.075369 5.780211-45.985684 1.711158-91.553684-10.90021-136.326737-1.845895-6.548211-4.446316-7.464421-10.60379-4.850526-10.967579 4.648421-22.069895 9.310316-33.549473 12.274526-45.797053 11.749053-92.442947 13.608421-138.967579 6.76379-57.856-8.542316-112.154947-25.519158-150.716632-73.83579-1.293474-1.643789-6.373053-2.586947-7.841684-1.482105-8.973474 6.804211-17.381053 14.309053-27.257263 22.676211 3.476211 2.789053 6.090105 4.675368 8.488421 6.80421 2.586947 2.330947 5.066105 4.810105 7.410526 7.383579 5.712842 6.197895 5.955368 13.662316 0.741053 18.553263-4.985263 4.594526-12.193684 4.311579-17.973895-1.333894-5.389474-5.254737-10.253474-11.075368-15.764211-17.111579-8.043789 6.588632-14.848 12.126316-22.797473 18.620631 5.928421 5.389474 10.927158 9.445053 15.306105 14.053053 5.712842 5.995789 5.712842 12.719158 0.592842 17.785263-5.173895 5.12-11.802947 5.146947-17.825684-0.714105-5.389474-5.227789-10.186105-11.075368-15.589053-17.044211-8.084211 6.494316-14.848 11.856842-23.282526 18.620632 5.173895 4.527158 9.970526 8.259368 14.255158 12.557474 6.723368 6.763789 7.033263 13.770105 1.42821 19.105684-5.187368 4.904421-12.395789 4.419368-18.566736-1.751579-5.12-5.079579-9.728-10.671158-14.69979-16.141474-5.052632 3.732211-8.555789 6.278737-12.018526 8.892632-3.395368 2.573474-6.763789 5.227789-11.668211 9.027368 3.678316 3.072 6.736842 5.308632 9.391158 7.882105 11.183158 10.981053 13.163789 17.92 7.141053 24.117895-6.332632 6.561684-12.934737 4.890947-24.131369-6.467368-3.637895-3.732211-6.871579-7.882105-10.617263-12.247579l-0.026947-0.026948z m278.177684 146.997895c-10.374737-21.423158-25.990737-33.509053-48.545684-33.549474-28.267789-0.026947-56.643368 0.552421-84.830316 2.748632-43.614316 3.422316-87.120842 8.542316-130.654316 12.692211-21.935158 2.101895-30.935579-3.866947-38.211368-24.468211-6.305684-17.785263-12.584421-35.597474-18.876632-53.382737-2.209684-6.170947-4.486737-12.341895-6.736842-18.512842-14.848 6.938947-28.645053 13.837474-42.765474 19.900632-47.386947 20.48-97.482105 26.718316-148.614736 27.661473-33.872842 0.619789-65.145263 24.023579-72.717474 56.549053-4.446316 19.132632-3.745684 39.477895-5.470316 60.254316h11.11579c89.626947 0 179.226947 0.134737 268.853894-0.080842 49.717895-0.094316 98.991158-5.052632 148.035369-13.177264 56.629895-9.377684 110.08-32.741053 169.350737-36.675368l0.067368 0.026947z m221.547789 24.468211h-11.102315c-58.677895 0-117.301895 0.673684-175.939369-0.242527-37.726316-0.592842-74.428632 4.082526-110.403368 14.996211-86.689684 26.354526-175.562105 35.974737-265.970526 35.287579-81.111579-0.633263-162.236632-0.134737-243.361685-0.134737h-10.64421v10.792421c0 9.714526 4.715789 14.578526 14.187789 14.578526h260.001684c59.688421 0 118.878316-5.402947 177.125053-18.620631 36.042105-8.192 71.558737-18.688 107.533474-27.257263 26.839579-6.426947 41.647158 5.928421 41.714526 33.185684 0 8.461474 4.446316 12.705684 13.312 12.732631h189.952c2.344421 0 5.079579 0.727579 6.898526-0.256 2.600421-1.387789 6.386526-4.001684 6.453895-6.157473 0.458105-22.568421 0.269474-45.163789 0.269474-68.904421h-0.026948zM816.559158 375.915789c-54.501053-9.754947-112.990316-20.210526-168.892632-30.234947 52.709053 28.523789 112.154947 34.600421 168.892632 30.234947z" />
      </g>
    </svg>
  );
};

export default KgShoesIcon;
