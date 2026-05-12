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

const KgPhone1Icon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgPhone1Icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgPhone1Icon)` : undefined}>
        <path d="M512 11.377778c276.48 0 500.622222 224.142222 500.622222 500.622222s-224.142222 500.622222-500.622222 500.622222-500.622222-224.142222-500.622222-500.622222 224.142222-500.622222 500.622222-500.622222z m0 22.755555c-263.918933 0-477.866667 213.947733-477.866667 477.866667s213.947733 477.866667 477.866667 477.866667 477.866667-213.947733 477.866667-477.866667-213.947733-477.866667-477.866667-477.866667z m-120.832 307.677867l2.048 1.706667 1.365333 1.2288 3.2768 3.2768c1.2288 1.297067 2.616889 2.821689 4.141511 4.596622 6.075733 7.076978 12.9024 16.338489 19.729067 26.783289l2.707911 4.187022 4.937956 7.964444 2.230044 3.800178 4.027734 7.054222 3.367822 6.326045 1.456355 2.8672 2.412089 5.006222 1.774934 4.004978 1.092266 2.889955a21.208178 21.208178 0 0 1-2.776178 7.054223l-5.916444 10.24c-4.369067 7.805156-8.783644 17.8176-8.783644 30.72l0.045511 2.025244 0.273066 2.730667 0.455111 2.275555 0.705423 2.6624 1.069511 3.094756c0.432356 1.115022 0.910222 2.275556 1.501866 3.549867l2.002489 4.027733 1.206045 2.184533 2.8672 4.778667 3.549866 5.347555 4.278045 5.916445 2.434844 3.185778 5.552356 6.803911c1.979733 2.366578 4.141511 4.869689 6.439822 7.463822l7.463822 8.123733c2.639644 2.821689 5.461333 5.757156 8.487823 8.829156 11.923911 12.060444 24.189156 23.210667 34.588444 31.311644 15.746844 12.333511 26.168889 17.362489 35.976533 17.362489 12.174222 0 22.528-4.7104 31.106845-9.193244l9.853155-5.142756c4.004978-1.979733 7.623111-3.413333 10.899911-3.640889l2.275556 0.796445 3.2768 1.4336 4.323556 2.116266 5.233777 2.844445 3.003734 1.729422 6.667377 4.004978c1.206044 0.728178 2.434844 1.501867 3.6864 2.321067l8.009956 5.279288 8.874667 6.166756c10.080711 7.190756 19.797333 14.791111 27.352177 21.390222l4.437334 4.004978 3.367822 3.231289 2.434844 2.503111 0.910223 1.001244c-1.501867 11.0592-7.736889 22.459733-17.658311 31.971556-10.558578 10.148978-24.120889 16.702578-34.542934 16.702578-24.234667 0-54.727111-10.513067-88.132266-30.401422-32.244622-19.182933-65.831822-46.193778-97.166223-78.097067-30.788267-31.379911-57.002667-64.989867-75.821511-97.257245a264.465067 264.465067 0 0 1-21.572266-45.511111c-4.778667-13.744356-7.213511-26.0096-7.213512-36.408889 0-4.187022 1.797689-9.443556 5.142756-15.177955 3.709156-6.326044 9.170489-12.925156 15.815111-19.114667 6.007467-5.643378 12.6976-10.581333 19.8656-14.654578 3.026489-1.752178 6.235022-3.185778 9.557333-4.278044z" />
      </g>
    </svg>
  );
};

export default KgPhone1Icon;
