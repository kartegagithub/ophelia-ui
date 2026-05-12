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

const KgDesignDevelopmentDigitalDesignMacIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentDigitalDesignMacIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentDigitalDesignMacIcon)` : undefined}>
        <path d="M735.99333 335.996955L511.99536 623.994345 287.99739 335.996955z" /><path d="M975.991155 863.99217H47.999565c-26.46376 0-47.999565-21.535805-47.999565-47.999565V143.998695c0-26.46376 21.535805-47.999565 47.999565-47.999565h175.998405a15.999855 15.999855 0 1 1 0 31.99971H47.999565c-8.83192 0-15.999855 7.183935-15.999855 15.999855v671.99391c0 8.81592 7.167935 15.999855 15.999855 15.999855h927.99159c8.83192 0 15.999855-7.183935 15.999855-15.999855V143.998695c0-8.81592-7.167935-15.999855-15.999855-15.999855H799.99275a15.999855 15.999855 0 1 1 0-31.99971h175.998405c26.46376 0 47.999565 21.535805 47.999565 47.999565v671.99391c0 26.46376-21.535805 47.999565-47.999565 47.999565z" /><path d="M943.991445 703.99362H79.999275a15.999855 15.999855 0 0 1-15.999855-15.999855V175.998405a15.999855 15.999855 0 0 1 15.999855-15.999855h143.998695a15.999855 15.999855 0 1 1 0 31.99971H95.99913v479.99565h831.99246V191.99826h-127.99884a15.999855 15.999855 0 1 1 0-31.99971h143.998695a15.999855 15.999855 0 0 1 15.999855 15.999855v511.99536a15.999855 15.999855 0 0 1-15.999855 15.999855zM624.314342 1023.99072a1.375988 1.375988 0 0 1-0.319997 0H399.996375a15.999855 15.999855 0 0 1-15.679858-19.135826l31.99971-159.998551A15.999855 15.999855 0 0 1 431.996085 831.99246h159.99855a15.999855 15.999855 0 0 1 15.679858 12.863883l31.391715 156.958578A15.999855 15.999855 0 0 1 624.314342 1023.99072z m-204.798144-31.99971h184.958324l-25.599768-127.99884h-133.758788l-25.599768 127.99884zM1007.990865 767.99304H15.999855a15.999855 15.999855 0 1 1 0-31.99971h991.99101a15.999855 15.999855 0 1 1 0 31.99971z" /><path d="M687.993765 1023.99072H335.996955a15.999855 15.999855 0 1 1 0-31.99971h351.99681a15.999855 15.999855 0 1 1 0 31.99971zM511.99536 815.992605c-4.159962 0-8.319925-1.759984-11.359897-4.639958-2.879974-3.039972-4.639958-7.199935-4.639958-11.359897 0-4.159962 1.759984-8.319925 4.639958-11.359897 5.919946-5.919946 16.799848-5.919946 22.719794 0 2.879974 3.039972 4.639958 7.199935 4.639958 11.359897 0 4.159962-1.759984 8.319925-4.639958 11.359897-3.039972 2.879974-7.199935 4.639958-11.359897 4.639958zM735.99333 287.99739H287.99739a15.999855 15.999855 0 0 1-15.999855-15.999855V15.999855a15.999855 15.999855 0 1 1 31.99971 0v239.997825h415.99623V15.999855a15.999855 15.999855 0 1 1 31.99971 0v255.99768a15.999855 15.999855 0 0 1-15.999855 15.999855z" /><path d="M511.99536 575.99478a15.999855 15.999855 0 0 1-12.639885-6.175944l-223.99797-287.99739a15.999855 15.999855 0 1 1 25.27977-19.647822L511.99536 533.931161l211.358085-271.757537a15.999855 15.999855 0 0 1 25.247771 19.647822l-223.98197 287.99739A15.999855 15.999855 0 0 1 511.99536 575.99478z" /><path d="M611.514458 447.99594H412.476262a15.999855 15.999855 0 1 1 0-31.99971h199.038196a15.999855 15.999855 0 1 1 0 31.99971zM367.996665 287.99739a15.999855 15.999855 0 0 1-15.999855-15.999855V15.999855a15.999855 15.999855 0 1 1 31.99971 0v255.99768a15.999855 15.999855 0 0 1-15.999855 15.999855zM463.995795 287.99739a15.999855 15.999855 0 0 1-15.999855-15.999855V15.999855a15.999855 15.999855 0 1 1 31.99971 0v255.99768a15.999855 15.999855 0 0 1-15.999855 15.999855zM559.994925 287.99739a15.999855 15.999855 0 0 1-15.999855-15.999855V15.999855a15.999855 15.999855 0 1 1 31.99971 0v255.99768a15.999855 15.999855 0 0 1-15.999855 15.999855zM655.994055 287.99739a15.999855 15.999855 0 0 1-15.999855-15.999855V15.999855a15.999855 15.999855 0 1 1 31.99971 0v255.99768a15.999855 15.999855 0 0 1-15.999855 15.999855z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentDigitalDesignMacIcon;
