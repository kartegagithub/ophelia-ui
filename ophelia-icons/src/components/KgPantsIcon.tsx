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

const KgPantsIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgPantsIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgPantsIcon)` : undefined}>
        <path d="M544.902737 764.604632l-34.196211-172.503579-62.113684 300.139789c-3.098947 13.689263-2.762105 34.074947-17.960421 37.820632-23.498105 5.793684-47.966316 7.518316-72.08421 7.545263l-28.227369-0.188632c-24.023579-1.253053-55.376842-6.413474-78.403368-12.099368l-40.205474-12.032c-8.070737-2.357895-18.000842-4.608-20.614737-13.877895l-0.444631-1.68421c-1.509053-6.885053 0.646737-15.993263 1.212631-22.932211l4.71579-90.125474 2.128842-38.170947c0.202105-3.786105 0.875789-7.504842 1.17221-11.250526l0.579369-18.189474 3.98821-75.978105c0.202105-3.462737 0.970105-6.804211 1.212632-10.253474l2.883368-64.512 3.422316-56.643368 0.363789-55.848421c-0.040421-9.579789-0.336842-19.267368 0.336843-28.833685l11.452631-96.997052c5.429895-34.479158 11.142737-69.443368 21.382737-102.858106l9.674105-28.725894c5.483789-13.972211 9.121684-18.000842 9.162106-33.414737l0.053894-22.016c0-5.564632-0.565895-11.802947 0.269474-17.246316 3.503158-22.635789 23.376842-36.446316 45.069474-37.52421L683.789474 86.096842c21.867789 0 42.792421 1.697684 52.453052 26.650947 2.506105 6.467368 3.637895 12.436211 3.69179 19.402106l-0.202105 20.938105a96.471579 96.471579 0 0 0 4.581052 24.32l13.406316 44.853895c1.145263 7.060211 3.826526 14.228211 5.497263 21.248 2.506105 10.590316 4.554105 21.342316 6.777263 32l9.040842 49.744842 16.949895 133.753263c1.616842 19.577263 0.458105 39.208421 2.236632 58.745263l31.609263 337.893053c0.970105 11.991579 3.584 24.037053 4.042105 36.042105 0.592842 14.753684-8.380632 18.135579-20.88421 22.096842l-24.387369 7.370105c-36.998737 10.186105-73.984 16.424421-112.316631 16.437895l-26.058106-0.161684c-11.466105-0.565895-23.053474-2.048-34.45221-3.408842l-20.911158-3.287579c-19.186526-3.637895-17.556211-16.815158-21.059369-33.091369l-28.901052-133.025684zM575.326316 114.593684c-7.060211 0.902737-14.241684 2.506105-21.288421 3.031579-20.843789 1.549474-42.213053 0.660211-63.137684 0.633263l-84.183579-0.14821c-1.616842 8.986947-1.333895 18.782316-1.360843 27.917473l-0.242526 40.326737 27.136 0.040421h155.109053c4.500211 0 9.889684 0.646737 14.241684-0.202105-2.789053-22.352842-3.260632-48.747789-1.751579-71.410526-5.362526-1.360842-18.903579-0.565895-24.522105-0.188632z m-268.180211 1.145263c-14.255158 1.024-13.756632 11.708632-13.797052 21.665685-0.040421 12.395789 2.236632 37.564632-2.910316 48.842105 2.519579 0.875789 5.456842 0.377263 8.08421 0.256l65.751579-0.10779 12.072421 0.579369c0.431158-25.020632-0.754526-46.376421 2.869895-71.289263l-72.08421 0.053894z m341.962106 0.026948l-21.045895 0.080842 1.616842 65.455158c0.134737 1.711158 0.040421 3.503158 0.538947 5.146947l66.910316-0.053895 19.712 0.148211c-2.317474-9.768421-4.958316-19.523368-5.335579-29.601684l-0.080842-19.590737c0.013474-7.639579 0.363789-13.648842-6.426947-18.863158l-0.741053-0.579368c-5.376-4.042105-12.975158-2.223158-19.267368-2.223158l-35.880421 0.080842z m-243.496422 99.799579c-1.374316 22.002526-6.049684 48.128-12.880842 69.443368-16.572632 51.671579-69.227789 83.469474-122.556631 80.101053a38.4 38.4 0 0 1-7.27579-0.956632l-13.797052-2.586947c-4.446316 18.566737-9.189053 66.721684-9.108211 84.749473 0.094316 19.092211 2.290526 35.301053 1.118316 55.471158l-4.890947 75.951158-0.687158 29.170527c-0.161684 4.015158-0.997053 7.949474-1.212632 11.964631l-1.28 39.370105c-0.215579 3.570526-0.970105 7.141053-1.158737 10.752l-0.512 22.999579-6.467368 103.585685c-0.107789 1.576421-0.592842 3.045053-0.673684 4.648421l-4.783158 84.789894c20.789895 6.885053 42.186105 11.776 63.690105 15.72379l12.840421 2.155789c2.250105 0.350316 4.621474 0.983579 6.898526 0.983579 7.976421 0.646737 15.925895 2.155789 23.888842 2.600421l59.068632-0.053894 32.040421-3.058527c0.485053-10.590316 3.934316-21.261474 6.103579-31.622737l59.189895-295.208421c4.890947-26.206316 7.370105-35.826526 7.370105-62.477473L490.576842 246.568421c0-9.943579-0.498526-20.156632 0.309895-30.046316L405.625263 215.578947z m118.649264 1.010526l-4.096-0.013474c-1.374316 6.440421-0.619789 14.228211-0.633264 20.830316l-0.026947 80.626526c0 7.774316-0.565895 16.020211 0.404211 23.727158l8.016842-8.421052c12.678737-18.674526 12.395789-27.526737 12.422737-48.64l0.013473-56.966737c0-3.705263 0.309895-7.68-0.215579-11.344842l-12.463158 0.040421c-0.579368 0-3.018105-0.148211-3.422315 0.161684z m66.357894 0l-22.029473-0.026947c-0.902737 7.006316-0.296421 14.726737-0.296421 21.827368v44.301474c0 12.759579 0.916211 24.387368-2.209685 36.810105-5.443368 21.584842-18.243368 40.730947-38.29221 51.092211-2.263579 1.172211-6.804211 1.832421-8.326737 3.570526l0.080842 138.347789c0 4.621474-1.212632 5.712842 2.748632 8.528842 7.087158 5.025684 6.669474 15.130947 8.582737 22.63579l72.986947 358.656c29.722947 7.141053 94.585263 7.922526 125.655579 1.010526l0.094316-0.067368c25.505684-3.503158 50.849684-9.040842 74.954105-18.229895l-48.74779-521.903158c-6.157474 0.700632-12.395789 1.886316-18.553263 2.250105-57.586526 3.503158-118.258526-30.760421-125.022315-91.782736l-7.828211-57.384421c-4.378947 0.067368-9.525895-0.404211-13.797053 0.363789z m-278.285473 0l-34.115369 0.256c-1.468632 2.654316-1.711158 5.510737-2.492631 8.380632l-13.541053 51.334736-7.976421 44.65179c-0.646737 3.637895-0.848842 7.316211-1.589895 10.940631 20.870737 4.823579 38.979368 4.271158 59.75579-2.330947 34.748632-13.743158 47.656421-33.751579 55.781052-67.274105l8.986948-45.945263-64.808421-0.013474z m320 0.026947l4.513684 29.736421c1.455158 10.051368 2.357895 21.194105 5.146947 30.908632 12.907789 44.894316 61.237895 65.509053 104.757895 56.185263l2.613895-0.781474 1.522526-0.256c0.229053-5.12-1.562947-11.371789-2.304-16.545684l-8.986947-49.987368-12.072421-49.044211-95.205053-0.215579z" />
      </g>
    </svg>
  );
};

export default KgPantsIcon;
