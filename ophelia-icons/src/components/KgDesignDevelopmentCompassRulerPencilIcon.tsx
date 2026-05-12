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

const KgDesignDevelopmentCompassRulerPencilIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentCompassRulerPencilIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentCompassRulerPencilIcon)` : undefined}>
        <path d="M141.678058 212.367967L32.014075 191.99997l20.351997 109.663983 648.847898 648.847898c12.655998 12.639998 33.167995 12.639998 45.823993 0l43.487993-43.487993c12.639998-12.639998 12.639998-33.167995 0-45.823993L141.678058 212.351967z" /><path d="M820.669952 612.639904a15.983998 15.983998 0 0 1-15.455998-20.207997C812.365953 566.111912 816.013953 539.039916 816.013953 511.99992c0-167.631974-136.367979-303.999953-303.999953-303.999952-27.039996 0-54.111992 3.647999-80.431987 10.799998a15.967998 15.967998 0 0 1-19.647997-11.231998 15.983998 15.983998 0 0 1 11.231998-19.647997A338.751947 338.751947 0 0 1 512.014 175.999973c185.279971 0 335.999948 150.719976 335.999948 335.999947 0 29.871995-4.015999 59.759991-11.919999 88.847986a15.999998 15.999998 0 0 1-15.423997 11.791998z" /><path d="M862.733945 878.719863a15.951998 15.951998 0 0 1-11.311998-4.688l-701.43989-701.43989a15.999998 15.999998 0 0 1 0-22.623996C246.686041 53.263992 375.262021 0 512.014 0s265.327959 53.279992 362.031943 149.967977S1024.01392 375.247941 1024.01392 511.99992s-53.279992 265.327959-149.967977 362.031943a15.951998 15.951998 0 0 1-11.311998 4.688zM184.110051 161.471975l678.431894 678.431894C946.173932 750.671883 992.013925 634.879901 992.013925 511.99992c0-128.20798-49.935992-248.735961-140.591978-339.407947C760.749961 81.935987 640.22198 31.999995 512.014 31.999995c-122.863981 0-238.671963 45.839993-327.903949 129.47198z" /><path d="M820.653952 612.639904a15.951998 15.951998 0 0 1-11.311998-4.687999l-393.279939-393.279939a15.999998 15.999998 0 1 1 22.623996-22.623996l393.279939 393.279939a15.999998 15.999998 0 0 1-11.311998 27.311995zM512.014 79.999988a15.999998 15.999998 0 0 1-15.999997-15.999998V15.999998a15.999998 15.999998 0 1 1 31.999995 0v47.999992a15.999998 15.999998 0 0 1-15.999998 15.999998zM1008.013923 527.999918h-47.999993a15.999998 15.999998 0 1 1 0-31.999995h47.999993a15.999998 15.999998 0 1 1 0 31.999995zM828.797951 211.215967a15.999998 15.999998 0 0 1-11.311999-27.311996l33.919995-33.935994a15.999998 15.999998 0 1 1 22.639996 22.623996l-33.935994 33.935995a15.951998 15.951998 0 0 1-11.311998 4.687999zM862.733945 878.719863a15.951998 15.951998 0 0 1-11.311998-4.688l-33.935995-33.935994a15.999998 15.999998 0 1 1 22.623997-22.623997l33.919994 33.919995a15.999998 15.999998 0 0 1-11.295998 27.327996zM195.230049 211.215967a15.951998 15.951998 0 0 1-11.311998-4.687999l-33.935994-33.919995a15.999998 15.999998 0 1 1 22.623996-22.639996l33.935995 33.935994a15.999998 15.999998 0 0 1-11.311999 27.311996zM683.453973 114.111982a15.983998 15.983998 0 0 1-14.783997-22.127996l18.367997-44.351993a15.999998 15.999998 0 0 1 29.567995 12.239998L698.253971 104.239984a15.999998 15.999998 0 0 1-14.783998 9.871998zM970.253928 717.807888a15.983998 15.983998 0 0 1-6.111999-1.216l-44.367993-18.367997a15.999998 15.999998 0 0 1 12.255998-29.567995l44.351993 18.367997a15.999998 15.999998 0 0 1-6.111999 30.783995zM925.901935 356.559944a15.999998 15.999998 0 0 1-6.127999-30.783995l44.367993-18.367997c8.127999-3.359999 17.535997 0.48 20.895997 8.639999s-0.48 17.551997-8.639999 20.927996l-44.367993 18.367997a15.983998 15.983998 0 0 1-6.127999 1.216zM340.574027 114.111982a15.999998 15.999998 0 0 1-14.783998-9.871998l-18.367997-44.367993a15.999998 15.999998 0 0 1 29.567995-12.239998l18.367997 44.351993a15.999998 15.999998 0 0 1-14.783997 22.127996zM708.125969 1023.99984a48.127992 48.127992 0 0 1-34.223994-14.159998L25.054076 360.975944a16.079997 16.079997 0 0 1-4.415999-8.399999L0.28608 242.927962a15.999998 15.999998 0 0 1 18.655997-18.655997l109.647983 20.351997c3.168 0.592 6.111999 2.144 8.399999 4.415999l648.847898 648.847899a48.463992 48.463992 0 0 1 0 68.431989l-43.487993 43.519993a48.047992 48.047992 0 0 1-34.239995 14.159998zM51.198072 341.855947L696.525971 987.199846a16.799997 16.799997 0 0 0 23.199997 0l43.487993-43.503993c6.399999-6.383999 6.399999-16.799997 0-23.183997L117.854062 275.199957l-81.871988-15.199998 15.199998 81.871988z" /><path d="M68.366069 397.663938a15.999998 15.999998 0 0 1-11.311998-27.311996l89.295986-89.311986a15.999998 15.999998 0 1 1 22.639997 22.623997l-89.311986 89.311986a15.951998 15.951998 0 0 1-11.311999 4.687999zM630.701981 959.99985a15.999998 15.999998 0 0 1-11.311998-27.311996l89.311986-89.311986a15.999998 15.999998 0 1 1 22.623997 22.623997l-89.311986 89.311986a15.951998 15.951998 0 0 1-11.311999 4.687999zM624.013983 863.999865a15.951998 15.951998 0 0 1-11.311999-4.687999l-463.999927-463.999928a15.999998 15.999998 0 1 1 22.623996-22.623996l463.999928 463.999927A15.999998 15.999998 0 0 1 624.013983 863.999865zM560.013993 479.999925c-4.319999 0-8.319999-1.76-11.359999-4.639999-2.88-3.04-4.639999-7.039999-4.639999-11.359998 0-4.319999 1.76-8.479999 4.799999-11.359999 5.759999-5.919999 16.479997-5.919999 22.559997 0 2.88 3.04 4.639999 7.199999 4.639999 11.359999s-1.76 8.319999-4.639999 11.359998c-3.04 2.88-7.039999 4.639999-11.359998 4.639999zM608.013985 527.999918c-4.319999 0-8.319999-1.76-11.359998-4.64-2.88-3.04-4.639999-7.199999-4.639999-11.359998s1.76-8.319999 4.639999-11.359998c5.919999-5.919999 16.639997-5.919999 22.719996 0 2.88 3.04 4.639999 7.039999 4.64 11.359998 0 4.159999-1.76 8.319999-4.64 11.359998-3.04 2.88-7.199999 4.639999-11.359998 4.64zM512.014 431.999933c-4.319999 0-8.319999-1.76-11.359998-4.64-2.88-3.04-4.639999-7.199999-4.639999-11.359998s1.76-8.319999 4.639999-11.359998c5.919999-5.919999 16.799997-5.919999 22.719996 0 2.88 3.04 4.639999 7.199999 4.64 11.359998s-1.76 8.319999-4.64 11.359998c-3.04 2.88-7.199999 4.639999-11.359998 4.64z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentCompassRulerPencilIcon;
