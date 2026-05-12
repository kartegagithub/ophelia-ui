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

const KgActivityIcon: React.FC<IconProps> = ({
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
    const p = "0 0 1219 1024".trim().split(/[\s,]+/).map(Number);
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
      viewBox="0 0 1219 1024"
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
          <linearGradient id="duotone-KgActivityIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? `url(#duotone-KgActivityIcon)` : undefined}>
        <path d="M591.433143 431.640381c-24.722286-25.35619-51.687619-48.420571-80.457143-68.998095a31.695238 31.695238 0 0 0 0.877714-6.826667c3.31581-2.681905 8.289524-5.851429 11.946667-8.289524a96.548571 96.548571 0 0 0 50.907429-62.268952c7.314286-43.739429-29.598476-63.292952-49.444572-73.776762a218.599619 218.599619 0 0 1-8.777143-4.778667c3.072-2.82819 6.680381-5.997714 9.508572-8.435809a109.568 109.568 0 0 0 47.201523-75.093334 30.134857 30.134857 0 0 0-27.989333-31.939047 29.696 29.696 0 0 0-31.305143 28.574476c-0.536381 9.947429-14.140952 21.74781-26.233904 32.085333-17.261714 14.969905-40.911238 35.401143-35.108572 65.828572a73.776762 73.776762 0 0 0 45.29981 47.786666l18.18819 9.606096c-1.024 6.192762-15.067429 15.36-24.283428 21.308952a100.449524 100.449524 0 0 0-34.767239 32.816762c-2.438095-1.316571-4.973714-2.779429-7.460571-4.047238a360.594286 360.594286 0 0 0-46.177524-19.065905c-7.314286-2.535619-14.677333-4.729905-22.186666-6.436571-50.41981-12.434286-94.012952-6.436571-121.07581 21.26019-8.045714 8.289524-14.336 18.090667-18.432 28.867048L241.371429 349.622857 27.160381 952.222476a43.398095 43.398095 0 0 0 55.05219 56.173714l584.118858-217.721904c2.145524-0.585143 4.242286-1.316571 6.339047-2.145524a1.852952 1.852952 0 0 0 1.121524-0.731429l0.682667-0.243809a84.845714 84.845714 0 0 0 24.966095-17.408 107.910095 107.910095 0 0 0 26.819048-81.334857 341.723429 341.723429 0 0 0-58.075429-161.01181c-22.186667-34.620952-47.88419-66.852571-76.751238-96.158476z m61.342476 290.767238c-22.820571 23.405714-130.389333-0.682667-237.714286-110.396952C307.687619 502.247619 283.89181 391.996952 306.712381 368.64c14.287238-14.628571 61.44-10.727619 121.027048 20.967619l-12.336762 21.260191a30.72 30.72 0 0 0 10.24 41.593904 28.91581 28.91581 0 0 0 29.988571 0.341334 29.598476 29.598476 0 0 0 10.776381-10.825143l11.849143-20.333715c23.747048 17.408 45.982476 36.717714 66.511238 57.782858 107.27619 109.714286 130.876952 219.672381 107.958857 243.078095v-0.097524zM999.131429 496.542476c-8.923429 3.900952-33.645714-8.97219-48.518096-16.579047-26.233905-13.55581-58.904381-30.329905-84.211809-7.558096-21.113905 19.017143-16.822857 48.274286-13.019429 73.97181 1.462857 8.679619 2.340571 17.408 2.681905 26.185143a168.521143 168.521143 0 0 1-35.303619-19.748572c-22.918095-15.262476-61.19619-40.911238-87.820191-7.996952a29.744762 29.744762 0 0 0 35.986286 45.446095c5.36381 2.925714 13.312 7.996952 18.870857 11.897905 20.528762 16.774095 45.494857 27.257905 71.875048 30.134857 5.558857 0 11.117714-0.731429 16.530286-2.194286 47.689143-13.165714 40.082286-64.707048 36.035047-92.403809-0.487619-3.413333-1.121524-7.509333-1.609143-11.50781 4.437333 2.145524 9.118476 4.534857 12.921905 6.534096 28.818286 14.823619 64.804571 33.304381 99.328 18.236952a29.744762 29.744762 0 1 0-23.698286-54.467048l-0.048761 0.048762zM658.090667 393.069714a29.744762 29.744762 0 0 0 22.723047-10.630095c6.144 0.633905 12.288 1.657905 18.285715 3.120762a106.154667 106.154667 0 0 0 84.504381-7.948191 82.944 82.944 0 0 0 31.158857-88.015238 343.576381 343.576381 0 0 1-1.950477-21.308952c8.630857-1.219048 17.456762-1.26781 26.185143-0.146286a126.780952 126.780952 0 0 0 92.842667-20.138666 29.696 29.696 0 0 0-36.668952-46.713905 76.068571 76.068571 0 0 1-52.077715 7.606857 82.017524 82.017524 0 0 0-74.313143 19.943619 83.72419 83.72419 0 0 0-13.06819 67.145143c2.486857 23.79581 1.316571 28.135619-4.33981 31.792762-9.069714 5.851429-21.113905 3.754667-39.936-0.195048-21.065143-4.534857-56.32-12.190476-77.775238 18.773334a29.744762 29.744762 0 0 0 24.283429 46.665142l0.146286 0.048762zM720.11581 118.491429a9.45981 9.45981 0 0 0 12.531809 12.580571l39.497143-18.090667a31.451429 31.451429 0 0 1 26.136381 0l39.497143 18.041905a9.45981 9.45981 0 0 0 12.483047-12.483048l-18.041904-39.497142a31.353905 31.353905 0 0 1 0-26.136381l18.041904-39.497143a9.411048 9.411048 0 0 0-12.531809-12.53181l-39.497143 18.041905a31.207619 31.207619 0 0 1-26.136381 0l-39.497143-18.041905a9.45981 9.45981 0 0 0-12.483047 12.53181l18.041904 39.497143a31.451429 31.451429 0 0 1 0 26.136381l-18.041904 39.497142zM1176.917333 374.296381a30.768762 30.768762 0 0 1 0-25.551238l17.65181-38.521905a9.264762 9.264762 0 0 0-12.190476-12.190476l-38.570667 17.603048a30.622476 30.622476 0 0 1-25.551238 0l-38.521905-17.65181a9.264762 9.264762 0 0 0-12.190476 12.239238l17.603048 38.521905a30.622476 30.622476 0 0 1 0 25.551238l-17.65181 38.521905a9.264762 9.264762 0 0 0 12.239238 12.239238l38.521905-17.65181a30.622476 30.622476 0 0 1 25.551238 0l38.521905 17.65181a9.264762 9.264762 0 0 0 12.239238-12.190476l-17.65181-38.570667zM263.070476 229.814857l29.257143-13.653333a23.259429 23.259429 0 0 1 19.358476-0.24381l29.062095 13.019429a7.119238 7.119238 0 0 0 9.362286-9.362286l-13.019428-29.062095a23.259429 23.259429 0 0 1 0.195047-19.309714l13.702095-29.257143a6.826667 6.826667 0 0 0-9.167238-9.216l-29.257142 13.702095a23.161905 23.161905 0 0 1-19.358477 0.195048l-29.062095-13.019429a7.119238 7.119238 0 0 0-9.362286 9.411048l13.068191 29.013333a23.210667 23.210667 0 0 1-0.24381 19.358476l-13.702095 29.257143a6.826667 6.826667 0 0 0 9.167238 9.167238z" />
      </g>
    </svg>
  );
};

export default KgActivityIcon;
