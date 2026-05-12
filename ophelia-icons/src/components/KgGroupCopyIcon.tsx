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

const KgGroupCopyIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 1115 1024"
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
          <linearGradient id="duotone-KgGroupCopyIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgGroupCopyIcon)` : undefined}>
        <path d="M1093.387463 702.173612h-39.691463v-44.658627h17.270448V44.658627H44.612776v612.856358h708.302328v44.658627H22.283463A22.31403 22.31403 0 0 1 0 679.829015V22.329313C0 9.980179 9.980179 0 22.283463 0H1093.387463A22.298746 22.298746 0 0 1 1115.701493 22.31403v657.514985a22.359881 22.359881 0 0 1-22.31403 22.344597z m-362.786388 138.408119H385.085134a22.31403 22.31403 0 0 1 0-44.658627h345.515941a22.375164 22.375164 0 1 1 0 44.658627z" /><path d="M1001.716537 502.508896c12.303284 0 22.268179 9.85791 22.283463 22.008358v477.336836c0.030567 5.868896-2.292537 11.493254-6.480239 15.650388a22.421015 22.421015 0 0 1-15.803224 6.495522H794.654567c-5.914746 0-11.584955-2.307821-15.757373-6.434388a21.855522 21.855522 0 0 1-6.52609-15.589254V524.532537c0-12.150448 9.980179-22.008358 22.283463-22.008358h207.06197z m-22.252895 44.001432H816.907463v433.350687h162.556179V546.510328zM495.906388 713.834985V810.029851h-45.575642v-96.194866h45.575642z m176.571224 0V810.029851h-45.575642v-96.194866H672.477612z m122.88-475.793194c4.860179 6.373254 5.838328 14.870925 2.552358 22.161194L711.603582 464.789015a22.207045 22.207045 0 0 1-20.541134 13.52597 22.298746 22.298746 0 0 1-20.571702-13.52597l-86.22997-204.58603a21.901373 21.901373 0 0 1 11.997612-28.763701 22.359881 22.359881 0 0 1 29.115224 11.844776l65.688836 155.831403 65.719403-155.831403a22.405731 22.405731 0 0 1 38.575761-5.242269z m-363.825672-21.091343c5.074149 2.85803 8.742209 7.458388 10.392836 12.777074H501.301493a22.14591 22.14591 0 0 1 21.519283 22.008359c0 11.86006-9.521672 21.595701-21.519283 22.008358l-58.368-0.015284v169.34209c0 12.272716-10.194149 22.222328-22.772538 22.222328S397.373134 455.343761 397.373134 443.055761V273.728955h-68.65385a22.344597 22.344597 0 0 1-19.929791-10.774925 21.794388 21.794388 0 0 1 0-22.451582 22.344597 22.344597 0 0 1 19.929791-10.774926h69.647283c1.650627-5.318687 5.318687-9.919045 10.392836-12.777074 7.045731-3.973731 15.74209-3.973731 22.772537 0z" /><path d="M840.597015 718.328358h35.671881v44.735045H840.597015V718.328358z m71.313194 0H947.58209v44.735045h-35.671881V718.328358zM840.597015 787.654687h35.671881v44.750328H840.597015v-44.750328z m71.313194 0H947.58209v44.750328h-35.671881v-44.750328zM840.597015 856.996299h35.671881V901.731343H840.597015v-44.735044z m71.313194 0H947.58209V901.731343h-35.671881v-44.735044z" />
      </g>
    </svg>
  );
};

export default KgGroupCopyIcon;
