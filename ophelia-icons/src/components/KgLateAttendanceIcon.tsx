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

const KgLateAttendanceIcon: React.FC<IconProps> = ({
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
    const p = "0 0 1027 1024".trim().split(/[\s,]+/).map(Number);
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
      viewBox="0 0 1027 1024"
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
          <linearGradient id="duotone-KgLateAttendanceIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgLateAttendanceIcon)` : undefined}>
        <path d="M768.797508 513.595016c-140.361371 0-255.202492 114.841121-255.202492 255.202492s114.841121 255.202492 255.202492 255.202492 255.202492-114.841121 255.202492-255.202492-114.841121-255.202492-255.202492-255.202492z m0 446.604361c-105.271028 0-191.401869-86.130841-191.401869-191.401869s86.130841-191.401869 191.401869-191.401869 191.401869 86.130841 191.401869 191.401869-86.130841 191.401869-191.401869 191.401869z" /><path d="M736.897196 641.196262h63.800623v191.401869h-63.800623zM478.504673 500.834891l-213.732087 213.732087 44.660436 44.660436 232.872274-232.872274V322.193146h-63.800623z" /><path d="M510.404984 1024v-63.800623c-66.990654 0-133.981308-15.950156-194.5919-44.660436l28.71028-47.850467-54.230529-31.900312-28.71028 47.850467c-47.850467-31.900312-86.130841-73.370717-118.031153-118.031152l44.660436-28.710281-31.900312-54.230529-47.850467 28.71028c-25.520249-51.040498-38.280374-105.271028-44.660436-162.691589h127.601246v-63.800623H66.990654c3.190031-57.420561 19.140187-111.65109 44.660436-162.691589l47.850468 28.710281 31.900311-54.23053-51.040498-31.900311c31.900312-47.850467 73.370717-86.130841 118.031152-118.031153L287.102804 191.401869l54.230529-31.900311-25.520249-47.850468c51.040498-25.520249 105.271028-38.280374 162.691589-44.660436v127.601246h63.800623V70.180685c57.420561 3.190031 111.65109 19.140187 162.691589 44.660436L676.286604 162.691589l54.23053 31.900311 28.71028-47.850467c47.850467 31.900312 86.130841 73.370717 118.031153 118.031153l-44.660436 25.520249 31.900311 54.230529 47.850468-28.71028c28.71028 60.610592 44.660436 127.601246 44.660436 194.5919h63.800623c0-280.722741-229.682243-510.404984-510.404985-510.404984S0 232.872274 0 513.595016s229.682243 510.404984 510.404984 510.404984z" />
      </g>
    </svg>
  );
};

export default KgLateAttendanceIcon;
