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

const KgDesignDevelopmentDevelopmentAreaPlanIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentDevelopmentAreaPlanIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentDevelopmentAreaPlanIcon)` : undefined}>
        <path d="M158.784 768H352.256v176H158.784zM448.256 463.056h192V656H448.256zM64.256 288h192v176H64.256zM704.256 64l96 48-96 48H64.256a16 16 0 0 1-16-16V80a16 16 0 0 1 16-16h640z" /><path d="M896.256 1008H16.256a16 16 0 0 1-16-16V256a16 16 0 0 1 16-16h752.992c7.904-63.04 61.856-112 127.008-112 70.576 0 128 57.424 128 128v624c0 70.576-57.424 128-128 128zM32.256 976h864c52.944 0 96-43.056 96-96s-43.056-96-96-96-96 43.056-96 96a16 16 0 1 1-32 0V272H32.256v704z m864-224a127.728 127.728 0 0 1 96 43.424V256c0-52.944-43.056-96-96-96s-96 43.056-96 96v539.424A127.728 127.728 0 0 1 896.256 752z" /><path d="M784.512 448H16a16 16 0 1 1 0-32h768.512a16 16 0 1 1 0 32zM784.512 640H16a16 16 0 1 1 0-32h768.512a16 16 0 1 1 0 32zM784.512 832H16a16 16 0 1 1 0-32h768.512a16 16 0 1 1 0 32z" /><path d="M208.256 1008a16 16 0 0 1-16-16V256a16 16 0 1 1 32 0v736a16 16 0 0 1-16 16zM400.256 1008a16 16 0 0 1-16-16V256a16 16 0 1 1 32 0v736a16 16 0 0 1-16 16zM592.256 1008a16 16 0 0 1-16-16V256a16 16 0 1 1 32 0v736a16 16 0 0 1-16 16zM944.256 528c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM944.256 464a16 16 0 0 1-16-16V256a16 16 0 1 1 32 0v192a16 16 0 0 1-16 16zM704.256 144H64.256c-17.648 0-32-14.352-32-32V48c0-17.648 14.352-32 32-32h640a16 16 0 0 1 7.152 1.68l96 48a16 16 0 0 1 0 28.64l-96 48A16 16 0 0 1 704.256 144zM64.256 48v64h636.224l64-32-64-32H64.256z" /><path d="M688.256 144a16 16 0 0 1-16-16V32a16 16 0 1 1 32 0v96a16 16 0 0 1-16 16zM304.256 208h-128c-26.464 0-48-21.536-48-48V32a16 16 0 1 1 32 0v128c0 8.832 7.184 16 16 16h128a16 16 0 1 1 0 32z" /><path d="M208.256 96c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36s1.76-8.32 4.64-11.36c6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.32-1.76 8.32-4.64 11.36-3.04 2.88-7.04 4.64-11.36 4.64zM272.256 96c-4.32 0-8.32-1.76-11.36-4.8A15.888 15.888 0 0 1 256.256 80c0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0a16.016 16.016 0 0 1-0.16 22.72 15.84 15.84 0 0 1-11.2 4.64zM336.256 96c-4.32 0-8.32-1.76-11.36-4.8A15.888 15.888 0 0 1 320.256 80c0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentDevelopmentAreaPlanIcon;
