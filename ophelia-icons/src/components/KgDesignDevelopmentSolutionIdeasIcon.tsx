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

const KgDesignDevelopmentSolutionIdeasIcon: React.FC<IconProps> = ({
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
          <linearGradient id="duotone-KgDesignDevelopmentSolutionIdeasIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgDesignDevelopmentSolutionIdeasIcon)` : undefined}>
        <path d="M832 256c-44.112 0-80-35.888-80-80s35.888-80 80-80 80 35.888 80 80-35.888 80-80 80zM224 304c-35.296 0-64-28.704-64-64s28.704-64 64-64 64 28.704 64 64-28.704 64-64 64zM528 816c-70.576 0-128-57.424-128-128s57.424-128 128-128 128 57.424 128 128-57.424 128-128 128z" /><path d="M224 480h-64a16 16 0 0 1-16-16v-40.352a143.52 143.52 0 0 1-13.968-5.792L101.488 446.4a16 16 0 0 1-22.624 0L33.6 401.136a16 16 0 0 1 0-22.624l28.528-28.544A143.552 143.552 0 0 1 56.352 336H16a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h40.352a143.52 143.52 0 0 1 5.792-13.968L33.6 197.488a16 16 0 0 1 0-22.624L78.864 129.6a16 16 0 0 1 22.624 0l28.544 28.528c4.544-2.176 9.2-4.096 13.968-5.792V112a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v40.352c4.768 1.696 9.424 3.616 13.968 5.792L282.512 129.6a16 16 0 0 1 22.624 0l45.248 45.248a16 16 0 0 1 0 22.624l-28.528 28.544c2.176 4.544 4.096 9.2 5.792 13.968H368a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16h-40.352a143.52 143.52 0 0 1-5.792 13.968l28.528 28.544a16 16 0 0 1 0 22.624L305.136 446.4a16 16 0 0 1-22.624 0l-28.544-28.528a143.52 143.52 0 0 1-13.968 5.792V464a16 16 0 0 1-16 16z m-48-32h32v-36.192a16 16 0 0 1 12-15.472 111.264 111.264 0 0 0 28.784-11.952c6.288-3.68 14.304-2.688 19.456 2.48l25.6 25.6 22.608-22.64-25.6-25.6a16.032 16.032 0 0 1-2.464-19.44c5.296-8.96 9.296-18.64 11.92-28.768a16 16 0 0 1 15.488-12.016H352v-32h-36.208a16 16 0 0 1-15.488-12.016 110.768 110.768 0 0 0-11.92-28.768 16.032 16.032 0 0 1 2.48-19.456l25.6-25.6-22.64-22.608-25.6 25.6a16.048 16.048 0 0 1-19.44 2.464 111.264 111.264 0 0 0-28.784-11.952 16 16 0 0 1-12-15.472V128h-32v36.192a16 16 0 0 1-12 15.472 111.264 111.264 0 0 0-28.784 11.952c-6.256 3.68-14.272 2.688-19.456-2.48l-25.6-25.6-22.608 22.64 25.6 25.6c5.152 5.152 6.16 13.168 2.464 19.44a111.264 111.264 0 0 0-11.952 28.784 16 16 0 0 1-15.472 12H32v32h36.192a16 16 0 0 1 15.472 12c2.64 10.144 6.656 19.84 11.952 28.784 3.696 6.272 2.688 14.288-2.48 19.456l-25.6 25.6 22.64 22.608 25.6-25.6a16.08 16.08 0 0 1 19.44-2.464c8.96 5.296 18.64 9.312 28.784 11.936a16 16 0 0 1 12 15.488V448zM544 1024h-96a16 16 0 0 1-16-16v-74.288a206.4 206.4 0 0 1-30.56-12.64l-52.512 52.528a16.48 16.48 0 0 1-22.624 0l-67.904-67.904a16 16 0 0 1 0-22.624l52.528-52.528a206.384 206.384 0 0 1-12.64-30.544H224a16 16 0 0 1-16-16v-96a16 16 0 0 1 16-16h74.288a206.4 206.4 0 0 1 12.64-30.56l-52.528-52.512a16 16 0 0 1 0-22.624l67.904-67.904a16.48 16.48 0 0 1 22.624 0l52.528 52.528a206.4 206.4 0 0 1 30.544-12.64V464a16 16 0 0 1 16-16h96a16 16 0 0 1 16 16v74.288a206.4 206.4 0 0 1 30.56 12.64l52.512-52.528a16.48 16.48 0 0 1 22.624 0l67.904 67.904a16 16 0 0 1 0 22.624l-52.528 52.528a206.4 206.4 0 0 1 12.64 30.544H768a16 16 0 0 1 16 16v96a16 16 0 0 1-16 16h-74.288a206.4 206.4 0 0 1-12.64 30.56l52.528 52.512a16 16 0 0 1 0 22.624l-67.904 67.904a16.48 16.48 0 0 1-22.624 0l-52.528-52.528c-9.792 5.024-20 9.248-30.544 12.64V1008a16 16 0 0 1-16 16z m-80-32h64v-70.304a16 16 0 0 1 12-15.488c15.952-4.112 31.168-10.4 45.232-18.72a16.112 16.112 0 0 1 19.456 2.464l49.696 49.712 45.28-45.28-49.712-49.696a16.032 16.032 0 0 1-2.464-19.456c8.32-14.064 14.608-29.28 18.72-45.232a16 16 0 0 1 15.488-12H752v-64h-70.304a16 16 0 0 1-15.488-12 174.272 174.272 0 0 0-18.72-45.232 16.032 16.032 0 0 1 2.464-19.456l49.712-49.696-45.28-45.28-49.696 49.712a16.048 16.048 0 0 1-19.456 2.464c-14.064-8.32-29.28-14.608-45.232-18.72a16 16 0 0 1-12-15.488V480h-64v70.304a16 16 0 0 1-12 15.488c-15.952 4.112-31.168 10.4-45.232 18.72-6.288 3.68-14.288 2.688-19.456-2.464l-49.696-49.712-45.28 45.28 49.712 49.696c5.152 5.152 6.176 13.168 2.464 19.456-8.32 14.064-14.608 29.28-18.72 45.232a16 16 0 0 1-15.488 12H240v64h70.304a16 16 0 0 1 15.488 12c4.112 15.952 10.4 31.168 18.72 45.232 3.712 6.288 2.688 14.304-2.464 19.456l-49.712 49.696 45.28 45.28 49.696-49.712a16.112 16.112 0 0 1 19.456-2.464c14.064 8.32 29.28 14.608 45.232 18.72a16 16 0 0 1 12 15.488V992zM832 448h-64a16 16 0 0 1-16-16v-55.456c-8.944-2.816-17.6-6.4-25.92-10.768l-39.216 39.232a16.48 16.48 0 0 1-22.624 0l-45.248-45.248a16 16 0 0 1 0-22.624l39.232-39.232A158.704 158.704 0 0 1 647.456 272H592a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h55.456c2.816-8.944 6.4-17.6 10.768-25.92L618.992 110.88a16 16 0 0 1 0-22.624l45.248-45.248a16.48 16.48 0 0 1 22.624 0l39.232 39.232A157.568 157.568 0 0 1 752 71.456V16a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v55.456c8.944 2.816 17.6 6.4 25.92 10.768l39.216-39.232a16.48 16.48 0 0 1 22.624 0l45.248 45.248a16 16 0 0 1 0 22.624L941.776 150.08c4.368 8.32 7.952 16.96 10.768 25.904H1008a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16h-55.456a158.704 158.704 0 0 1-10.768 25.92l39.232 39.216a16 16 0 0 1 0 22.624l-45.248 45.248a16.48 16.48 0 0 1-22.624 0l-39.232-39.232c-8.32 4.368-16.96 7.952-25.904 10.768V432a16 16 0 0 1-16 16z m-48-32h32v-51.68a16 16 0 0 1 12.448-15.6 127.264 127.264 0 0 0 39.584-16.432 16 16 0 0 1 19.84 2.208l36.576 36.576 22.624-22.624-36.576-36.576a16 16 0 0 1-2.24-19.84c7.728-12.256 13.264-25.584 16.464-39.584A16 16 0 0 1 940.32 240H992v-32h-51.68a16 16 0 0 1-15.6-12.448 127.264 127.264 0 0 0-16.432-39.584 16 16 0 0 1 2.208-19.84l36.576-36.576-22.624-22.624-36.576 36.576a16 16 0 0 1-19.84 2.208 127.264 127.264 0 0 0-39.584-16.432A16 16 0 0 1 816 83.68V32h-32v51.68a16 16 0 0 1-12.448 15.6c-14.032 3.2-27.36 8.736-39.584 16.432a16 16 0 0 1-19.84-2.208l-36.576-36.576-22.624 22.624 36.576 36.576a16 16 0 0 1 2.208 19.84 127.264 127.264 0 0 0-16.432 39.584 16 16 0 0 1-15.6 12.448H608v32h51.68a16 16 0 0 1 15.6 12.448c3.2 14 8.736 27.328 16.448 39.6a16 16 0 0 1-2.24 19.84l-36.56 36.56 22.624 22.624 36.576-36.576a16 16 0 0 1 19.84-2.208 127.264 127.264 0 0 0 39.584 16.432 16 16 0 0 1 12.448 15.6V416z" /><path d="M800 320c-52.944 0-96-43.056-96-96s43.056-96 96-96 96 43.056 96 96-43.056 96-96 96z m0-160c-35.296 0-64 28.704-64 64s28.704 64 64 64 64-28.704 64-64-28.704-64-64-64zM192 368c-44.112 0-80-35.888-80-80s35.888-80 80-80 80 35.888 80 80-35.888 80-80 80z m0-128c-26.464 0-48 21.536-48 48s21.536 48 48 48 48-21.536 48-48-21.536-48-48-48zM496 880c-79.408 0-144-64.592-144-144s64.592-144 144-144 144 64.592 144 144-64.592 144-144 144z m0-256c-61.76 0-112 50.24-112 112s50.24 112 112 112 112-50.24 112-112-50.24-112-112-112z" /><path d="M432 752c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 5.92-5.92 16.64-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM496 752c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.64-5.92 22.72 0 3.04 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.64 11.36c-3.04 2.88-7.2 4.64-11.36 4.64zM560 752c-4.16 0-8.32-1.76-11.36-4.64-2.88-3.04-4.64-7.04-4.64-11.36 0-4.16 1.76-8.32 4.64-11.36 6.08-5.92 16.8-5.92 22.72 0 2.88 3.04 4.64 7.2 4.64 11.36s-1.76 8.32-4.8 11.36c-2.88 2.88-6.88 4.64-11.2 4.64z" />
      </g>
    </svg>
  );
};

export default KgDesignDevelopmentSolutionIdeasIcon;
