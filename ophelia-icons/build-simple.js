const fs = require('fs');
const path = require('path');

const SVG_DIR = "src/icons";
const OUT_DIR = "src/components";

function toPascalCase(name) {
  return name
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (m) => m.toUpperCase());
}

function generateReactComponent(svgFile) {
  const baseName = path.basename(svgFile, ".svg");
  const [unicodePart, ...iconParts] = baseName.split("-");
  const iconName = iconParts.join("-");
  
  if (!unicodePart || !iconName) return;
  
  const componentName = toPascalCase(iconName);
  const filePath = path.join(OUT_DIR, `${componentName}.tsx`);
  
  // SVG içeriğini oku
  const svgPath = path.join(SVG_DIR, svgFile);
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  
  // SVG path'ini çıkar
  const pathMatch = svgContent.match(/<path[^>]*d="([^"]*)"[^>]*>/);
  const pathData = pathMatch ? pathMatch[1] : '';
  
  const componentCode = `"use client";
import React from "react";

export type IconSize = number | string;
export type IconVariant = 'filled' | 'outlined' | 'duotone' | 'linear';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: IconSize;
  width?: IconSize;
  height?: IconSize;
  color?: string;
  secondaryColor?: string;
  variant?: IconVariant;
  strokeWidth?: number | string;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  rotate?: number;
  mirrored?: boolean;
  flipped?: boolean;
  spin?: boolean;
  pulse?: boolean;
  bounce?: boolean;
  title?: string;
  description?: string;
  visible?: boolean;
  opacity?: number;
}

const ${componentName}: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  color,
  secondaryColor,
  variant = 'filled',
  strokeWidth = 1.5,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  rotate = 0,
  mirrored = false,
  flipped = false,
  spin = false,
  pulse = false,
  bounce = false,
  title,
  description,
  visible = true,
  opacity,
  className = "",
  style,
  ...rest
}) => {
  const w = width ?? size;
  const h = height ?? size;
  
  const transforms = [];
  if (rotate) transforms.push(\`rotate(\${rotate}deg)\`);
  if (mirrored) transforms.push('scaleX(-1)');
  if (flipped) transforms.push('scaleY(-1)');
  
  const animationClasses = [];
  if (spin) animationClasses.push('animate-spin');
  if (pulse) animationClasses.push('animate-pulse');
  if (bounce) animationClasses.push('animate-bounce');
  
  const styles: React.CSSProperties = {
    color,
    opacity: visible ? opacity : 0,
    transform: transforms.length ? transforms.join(' ') : undefined,
    ...style,
  };

  const isOutlined = variant === 'outlined';
  const isDuotone = variant === 'duotone';
  const isLinear = variant === 'linear';
  
  const fillValue = isOutlined || isLinear ? 'none' : 'currentColor';
  const strokeValue = isOutlined || isLinear ? 'currentColor' : 'none';
  
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill={fillValue}
      stroke={strokeValue}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      xmlns="http://www.w3.org/2000/svg"
      className={[...animationClasses, className].filter(Boolean).join(" ")}
      style={styles}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      {...rest}
    >
      {title && <title>{title}</title>}
      {description && <desc>{description}</desc>}
      {isDuotone && secondaryColor && (
        <defs>
          <linearGradient id={\`duotone-\${componentName}\`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || 'currentColor'} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      )}
      <g fill={isDuotone ? \`url(#duotone-\${componentName})\` : undefined}>
        <path d="${pathData}" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
};

export default ${componentName};`;

  fs.writeFileSync(filePath, componentCode, 'utf8');
  console.log(`✅ Generated: ${componentName}.tsx`);
}

function main() {
  console.log('🔧 Starting simple icon build...');
  
  if (!fs.existsSync(SVG_DIR)) {
    console.log('❌ SVG directory not found:', SVG_DIR);
    return;
  }
  
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }
  
  const files = fs.readdirSync(SVG_DIR).filter(f => f.endsWith('.svg')).sort();
  console.log(`📁 Found ${files.length} SVG files`);
  
  files.forEach(file => {
    generateReactComponent(file);
  });
  
  // Update index.ts
  const componentNames = files.map(file => {
    const baseName = path.basename(file, ".svg");
    const [unicodePart, ...iconParts] = baseName.split("-");
    const iconName = iconParts.join("-");
    return toPascalCase(iconName);
  }).filter(Boolean);
  
  const indexContent = componentNames.map(name => 
    `export { default as ${name} } from "./${name}";`
  ).join('\n');
  
  fs.writeFileSync(path.join(OUT_DIR, 'index.ts'), indexContent, 'utf8');
  console.log('✅ Updated index.ts');
  
  console.log('🎉 Build completed!');
}

main();
