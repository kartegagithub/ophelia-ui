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

const KgMobileappIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgMobileappIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgMobileappIcon)` : undefined}>
        <path d="M794.746269 764.179104v106.985075H122.268657v-106.985075h672.477612zM421.184955 109.277612a17.071761 17.071761 0 1 1 17.071761 29.558448 17.071761 17.071761 0 0 1-17.071761-29.558448z" /><path d="M675.992836 0c58.031761 0 102.4 47.791761 102.4 102.4v129.711761c0 10.24-6.816478 17.056478-17.056478 17.056478-10.24 0-17.071761-6.816478-17.071761-17.056478V102.4a68.470448 68.470448 0 0 0-68.256478-68.271761H163.992836A68.470448 68.470448 0 0 0 95.736358 102.4v716.8h648.528239v-17.071761c0-10.24 6.831761-17.056478 17.071761-17.056478 10.24 0 17.071761 6.816478 17.071761 17.056478V921.6c0 54.608239-44.383522 102.4-102.4 102.4H163.992836c-58.031761 0-102.4-47.791761-102.4-102.4V102.4C61.592836 44.368239 105.976358 0 163.992836 0h512z m68.271761 853.328239H95.736358V921.6a68.470448 68.470448 0 0 0 68.271761 68.271761h512a68.470448 68.470448 0 0 0 68.256478-68.271761v-68.271761z m-290.128239 34.143522c10.24 0 17.071761 6.816478 17.071761 17.056478 0 10.24-6.831761 17.071761-17.071761 17.071761h-102.4c-10.24 0-17.071761-6.831761-17.071761-17.071761 0-10.24 6.831761-17.056478 17.071761-17.056478h102.4zM855.880597 305.671642a106.985075 106.985075 0 0 1 106.92394 103.317015L962.865672 412.656716v198.686568a106.985075 106.985075 0 0 1-103.317015 106.92394L855.880597 718.328358H611.343284a106.985075 106.985075 0 0 1-106.923941-103.317015L504.358209 611.343284V412.656716a106.985075 106.985075 0 0 1 103.317015-106.92394L611.343284 305.671642h244.537313z m0 30.567164H611.343284a76.41791 76.41791 0 0 0-76.341493 73.101373L534.925373 412.656716v198.686568a76.41791 76.41791 0 0 0 73.101373 76.341492L611.343284 687.761194h244.537313a76.41791 76.41791 0 0 0 76.341493-73.101373L932.298507 611.343284V412.656716a76.41791 76.41791 0 0 0-73.101373-76.341492L855.880597 336.238806z m-64.236896 77.61003c3.117851 2.277254 4.034866 6.999881 2.063284 10.545671l-93.61194 168.119403a6.52609 6.52609 0 0 1-5.654926 3.545791c-2.445373 0-4.676776-1.528358-5.853612-3.973731a8.589373 8.589373 0 0 1 0.213971-7.76406l93.61194-168.119403c1.986866-3.561075 6.113433-4.615642 9.231283-2.353671z m-120.159522 48.372537c1.788179 3.576358 0.855881 8.207284-2.093851 10.423403l-54.577671 39.324657 54.577671 39.324657c2.445373 1.772896 3.622209 5.288119 2.85803 8.589373-0.657194 2.842746-2.598209 4.921313-4.936597 5.471522l-1.207403 0.137552a5.563224 5.563224 0 0 1-3.270686-1.100418l-63.686687-45.881313a8.069731 8.069731 0 0 1-3.087284-6.541373c0-2.68991 1.176836-5.181134 3.087284-6.57194l63.686687-45.86603c3.010866-2.078567 6.847045-0.886448 8.650507 2.68991z m148.327164-2.506507l63.549135 45.804895c1.925731 1.375522 3.087284 3.851463 3.087283 6.541373a8.054448 8.054448 0 0 1-3.087283 6.541373l-63.549135 45.804896a5.54794 5.54794 0 0 1-3.270686 1.085134c-2.85803 0.015284-5.379821-2.277254-6.144-5.578507-0.764179-3.316537 0.412657-6.831761 2.873313-8.604657l54.470687-39.248239-54.470687-39.263522a8.008597 8.008597 0 0 1-3.240119-6.724776 7.962746 7.962746 0 0 1 3.331821-6.648358 5.456239 5.456239 0 0 1 6.449671 0.290388zM422.973134 93.978746a17.071761 17.071761 0 0 1-5.593791 31.606448l-1.956298 0.229254h-1.971582a17.056478 17.056478 0 1 1 9.521671-31.820418z" />
      </g>
    </svg>
  );
};

export default KgMobileappIcon;
