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

const KgPersonalDevelopmentIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgPersonalDevelopmentIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgPersonalDevelopmentIcon)` : undefined}>
        <path d="M504.016 816.064h-240a8 8 0 0 1 0-16h240a8 8 0 0 1 0 16zM232.016 816.064h-16a8 8 0 0 1 0-16h16a8 8 0 0 1 0 16zM456.016 88.064h-240a8 8 0 0 1 0-16h240a8 8 0 0 1 0 16zM504.016 88.064h-16a8 8 0 0 1 0-16h16a8 8 0 0 1 0 16z" /><path d="M208.576 536.064h64v96h-64z" /><path d="M272.576 640.064h-64a8 8 0 0 1-8-8v-96a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v96a8 8 0 0 1-8 8z m-56-16h48v-80h-48v80z" /><path d="M332.608 456.064h64v176h-64z" /><path d="M396.624 640.064h-64a8 8 0 0 1-8-8v-176a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v176a8 8 0 0 1-8 8z m-56-16h48v-160h-48v160z" /><path d="M460.608 368.064h64v264h-64z" /><path d="M524.624 640.064h-64a8 8 0 0 1-8-8v-264a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v264a8 8 0 0 1-8 8z m-56-16h48v-248h-48v248zM171.472 480.064a8 8 0 0 1-5.296-14l136.576-120.576a8.032 8.032 0 0 1 10.96 0.336l50.912 50.912 146.336-146.336a8 8 0 0 1 11.312 11.312l-152 152a8 8 0 0 1-11.312 0l-51.264-51.264-130.928 115.6a7.888 7.888 0 0 1-5.296 2.016z" /><path d="M516.624 328.064a8 8 0 0 1-8-8v-56h-56a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8v64a8 8 0 0 1-8 8z" /><path d="M608.016 720.064h-496c-26.464 0-48-21.536-48-48v-456c0-26.464 21.536-48 48-48h496c26.464 0 48 21.536 48 48v69.424a8 8 0 0 1-16 0v-69.424c0-17.648-14.352-32-32-32h-496c-17.648 0-32 14.352-32 32v456c0 17.648 14.352 32 32 32h496c17.648 0 32-14.352 32-32v-2.08a8 8 0 0 1 16 0v2.08c0 26.48-21.536 48-48 48z" /><path d="M792 264c-57.344 0-104-46.656-104-104s46.656-104 104-104S896 102.656 896 160s-46.656 104-104 104z m0-192C743.488 72 704 111.472 704 160s39.472 88 88 88S880 208.528 880 160s-39.472-88-88-88z" /><path d="M858.576 104.496l7.152-5.952A96 96 0 0 0 696.016 160h9.056c56.08 0 110.4-19.632 153.504-55.504z" /><path d="M705.072 168H696a8 8 0 0 1-8-8c0-57.344 46.656-104 104-104 30.912 0 60.016 13.632 79.856 37.408a8 8 0 0 1-1.024 11.28l-7.152 5.952a248.368 248.368 0 0 1-158.608 57.36z m-0.704-16h0.704c54.096 0 106.8-19.056 148.384-53.664l0.72-0.592A87.792 87.792 0 0 0 792 72a88.112 88.112 0 0 0-87.632 80z m154.208-47.504h0.16-0.16z" /><path d="M791.936 351.488a8 8 0 0 1-6.64-3.536l-48.064-71.408a8.096 8.096 0 0 1-1.36-4.464l-0.016-29.12a8 8 0 0 1 12.016-6.928 88.8 88.8 0 0 0 87.984 0.176 8.032 8.032 0 0 1 12 6.928l0.016 28.768a8.08 8.08 0 0 1-1.344 4.464l-47.936 71.568a8.048 8.048 0 0 1-6.656 3.552z m-40.064-81.856l40.048 59.504 39.952-59.648-0.016-13.488a104.608 104.608 0 0 1-80-0.128l0.016 13.76z" /><path d="M936 584H647.936c-13.232 0-24-10.768-24-24V377.456a87.536 87.536 0 0 1 48.672-78.72l67.68-33.824a8 8 0 0 1 10.208 2.688l41.44 61.472 41.264-61.616a8 8 0 0 1 10.224-2.704l67.92 33.968A87.52 87.52 0 0 1 960 377.44V560c0 13.232-10.752 24-24 24zM741.168 282.368l-61.392 30.672a71.584 71.584 0 0 0-39.824 64.4V560a8 8 0 0 0 8 8H936a8 8 0 0 0 8-8V377.44a71.6 71.6 0 0 0-39.792-64.4l-61.616-30.816-43.44 64.864a7.792 7.792 0 0 1-2.672 3.024 6.896 6.896 0 0 1-4.512 1.36 7.856 7.856 0 0 1-7.152-4.352l-43.648-64.752z" /><path d="M791.936 415.488a8 8 0 0 1-8-8v-64a8 8 0 0 1 16 0v64a8 8 0 0 1-8 8zM696 584a8 8 0 0 1-8-8V416a8 8 0 0 1 16 0v160a8 8 0 0 1-8 8zM888 584a8 8 0 0 1-8-8V416a8 8 0 0 1 16 0v160a8 8 0 0 1-8 8z" /><path d="M872 968h-33.6c-12.32 0-22.576-9.232-23.872-21.488L792 732.432l-22.528 214.08A23.952 23.952 0 0 1 745.6 968h-33.6c-13.232 0-24-10.768-24-24V576a8 8 0 0 1 8-8h192a8 8 0 0 1 8 8v368c0 13.232-10.752 24-24 24z m-80-320c4.096 0 7.536 3.088 7.952 7.168l30.496 289.664a8 8 0 0 0 7.968 7.168h33.6a8 8 0 0 0 8-8V584H704V944a8 8 0 0 0 8 8h33.6a8 8 0 0 0 7.968-7.168l30.48-289.664a8 8 0 0 1 7.952-7.168z" /><path d="M663.936 648a40.048 40.048 0 0 1-40-40 8 8 0 0 1 16 0c0 13.232 10.768 24 24 24s24-10.768 24-24a8 8 0 0 1 16 0c0 22.048-17.936 40-40 40z" /><path d="M919.936 648a40.048 40.048 0 0 1-40-40 8 8 0 0 1 16 0c0 13.232 10.768 24 24 24s24-10.768 24-24a8 8 0 0 1 16 0c0 22.048-17.936 40-40 40z" />
      </g>
    </svg>
  );
};

export default KgPersonalDevelopmentIcon;
