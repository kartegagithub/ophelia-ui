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

const KgDesignDevelopmentBrushPaintingIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentBrushPaintingIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentBrushPaintingIcon)` : undefined}>
        <path d="M118.11296 817.408L80.00096 1008l190.592-38.112c25.552-5.12 51.424-8.16 77.2-11.888 95.28-13.792 167.84-97.488 164.064-197.44-3.568-94.64-89.776-180.848-184.4-184.416-99.968-3.776-183.664 68.8-197.456 164.064-3.744 25.776-6.768 51.664-11.888 77.2z" /><path d="M539.20096 732.64a16 16 0 0 1-15.696-12.928c-21.104-108-111.232-198.128-219.2-219.2a16 16 0 0 1 6.112-31.424c120.432 23.52 220.96 124.048 244.48 244.48a16 16 0 0 1-15.712 19.072z" /><path d="M16.00096 1024a16 16 0 0 1-15.68-19.136l38.112-190.592c3.728-18.624 6.4-38 8.96-56.72l2.784-19.648c15.072-104.064 107.36-181.92 213.888-177.76 102.56 3.888 195.904 97.248 199.776 199.808 4.048 106.672-72.368 198.624-177.76 213.888l-19.616 2.752c-18.72 2.592-38.112 5.248-56.736 8.976L19.13696 1023.68A15.856 15.856 0 0 1 16.00096 1024z m240-432c-86.88 0-161.728 64.688-174.176 150.496l-2.72 19.424c-2.64 19.2-5.376 39.056-9.28 58.624l-33.44 167.056 167.072-33.408c19.568-3.904 39.44-6.656 58.64-9.296l19.408-2.72c89.136-12.912 153.776-90.736 150.368-181.024-3.28-86.768-82.256-165.76-169.024-169.024A166.88 166.88 0 0 0 256.00096 592z" /><path d="M448.01696 785.44a16 16 0 0 1-7.04-30.384C748.80096 604.432 976.54496 204.32 991.24896 32.752c-171.568 14.72-571.68 242.464-722.304 550.272a16 16 0 0 1-28.752-14.048C403.77696 234.64 836.09696 0 1008.00096 0a16 16 0 0 1 16 16c0 171.904-234.624 604.208-568.96 767.808a16 16 0 0 1-7.024 1.632zM15.98496 1024A15.984 15.984 0 0 1 3.20096 998.4a1762.24 1762.24 0 0 0 166.032-268.672l8.448-16.896a16 16 0 1 1 28.64 14.336l-8.464 16.88A1794.4 1794.4 0 0 1 28.80096 1017.6a16 16 0 0 1-12.816 6.4z" /><path d="M16.01696 1024a15.984 15.984 0 0 1-9.6-28.8 1093.36 1093.36 0 0 1 282.48-152.912l25.632-9.328a16 16 0 1 1 10.944 30.08l-25.648 9.312A1061.6 1061.6 0 0 0 25.60096 1020.8a15.84 15.84 0 0 1-9.568 3.2zM896.00096 144c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM848.00096 192c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0a16.016 16.016 0 0 1-0.16 22.72c-2.88 2.88-7.04 4.64-11.2 4.64zM688.00096 1024H432.00096a16 16 0 1 1 0-32h256a16 16 0 1 1 0 32zM368.00096 1024c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36s1.76-8.32 4.64-11.36c5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM304.00096 1024c-4.32 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.6-8.32 4.64-11.36 6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.04 4.64-11.36 4.64zM240.00096 1024c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36s1.76-8.32 4.64-11.36c5.76-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.32-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM896.00096 240c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM848.00096 288c-4.32 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.04 4.64 11.36 0 4.16-1.76 8.32-4.8 11.36-2.88 2.88-6.88 4.64-11.2 4.64zM800.00096 240c-4.16 0-8.32-1.76-11.36-4.64A16.48 16.48 0 0 1 784.00096 224c0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.04 4.64-11.36 4.64zM800.00096 144c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.04 4.64-11.36 4.64zM752.00096 192c-4.16 0-8.32-1.76-11.36-4.64A16.48 16.48 0 0 1 736.00096 176c0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.2 4.64-11.36 4.64zM800.00096 336c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.04 4.64-11.36 4.64zM752.00096 288c-4.32 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.32 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.04 4.64-11.36 4.64zM704.00096 240c-4.32 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.2-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36 0 4.16-1.76 8.32-4.64 11.36-3.04 2.88-7.04 4.64-11.36 4.64z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentBrushPaintingIcon;
