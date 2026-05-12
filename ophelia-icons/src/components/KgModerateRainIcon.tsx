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

const KgModerateRainIcon: React.FC<IconProps> = ({
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
  
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 1024 1024"
      fill={fillValue}
      stroke={strokeValue}
      strokeWidth={strokeWidth}
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
          <linearGradient id="duotone-KgModerateRainIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgModerateRainIcon)` : undefined}>
        <path d="M996.443359 426.133985c0-57.669159-26.447267-110.895842-72.61581-146.020471a29.395079 29.395079 0 0 1-10.296581-14.988169 217.141615 217.141615 0 0 0-207.633885-155.943385 216.726431 216.726431 0 0 0-52.23024 6.352326 29.062931 29.062931 0 0 1-30.931262-11.749728 238.938814 238.938814 0 0 0-357.88924-41.103289 238.233 238.233 0 0 0-76.68462 153.286204 29.062931 29.062931 0 0 1-16.441315 23.499456c-2.864775 1.328591-5.812586 2.864775-8.594324 4.400958a27.111563 27.111563 0 0 1-7.722436 2.906293 185.712131 185.712131 0 0 0-103.131888 63.813893 181.020544 181.020544 0 0 0-41.103289 115.58743c0 101.388112 82.95391 183.8438 184.92328 183.8438h615.469848C913.530968 610.019303 996.443359 527.563615 996.443359 426.133985z" /><path d="M272.029037 874.201348a29.062931 29.062931 0 0 0 27.73434-37.615736l-35.000073-114.092765a29.062931 29.062931 0 0 0-55.551717 17.064093l35.000073 114.134283c3.8197 12.49706 15.361835 20.510126 27.73434 20.510125h0.083037zM431.376937 1011.876606a29.062931 29.062931 0 0 0 27.734341-37.615737l-34.958555-114.134283a29.062931 29.062931 0 0 0-55.551717 17.064092l35.000073 114.134284a29.062931 29.062931 0 0 0 27.73434 20.551644h0.041518zM634.070124 833.596282a29.062931 29.062931 0 0 0-19.223053 36.287145l35.000073 114.134283a29.021413 29.021413 0 1 0 55.46868-17.064092l-35.000073-114.092765a29.021413 29.021413 0 0 0-36.287145-19.264571h0.041518zM515.244254 874.201348a29.062931 29.062931 0 0 0 27.73434-37.615736l-34.958555-114.092765a29.062931 29.062931 0 0 0-55.551717 17.064093l35.000073 114.134283c3.8197 12.49706 15.361835 20.510126 27.73434 20.510125h0.041519zM758.542507 874.201348a29.062931 29.062931 0 0 0 27.73434-37.615736l-35.000073-114.092765a29.062931 29.062931 0 0 0-55.551717 17.064093l35.000073 114.134283c3.778181 12.49706 15.361835 20.510126 27.73434 20.510125h0.041518z" />
      </g>
    </svg>
  );
};

export default KgModerateRainIcon;
