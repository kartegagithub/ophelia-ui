"use client";

import React, { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import * as Icons from "../../components";

const allIcons = Object.entries(Icons).filter(([, value]) => typeof value === "function");

export default function IconsPreviewPage() {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState<number>(32);
  const [color, setColor] = useState<string>("#262626");
  const [secondaryColor, setSecondaryColor] = useState<string>("#F62829");
  const [variant, setVariant] = useState<"filled" | "outlined" | "duotone" | "linear">("outlined");
  const [strokeWidth, setStrokeWidth] = useState<number>(1.5);
  const [rotate, setRotate] = useState<number>(0);
  const [mirrored, setMirrored] = useState<boolean>(false);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [spin, setSpin] = useState<boolean>(false);
  const [pulse, setPulse] = useState<boolean>(false);
  const [bounce, setBounce] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(1);
  const [iconClassName, setIconClassName] = useState<string>("");
  const [showCode, setShowCode] = useState<boolean>(false);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allIcons;
    return allIcons.filter(([name]) => name.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('iconsPreviewClassName') : null;
    if (saved) setIconClassName(saved);
  }, []);

  const copyToClipboard = async (iconName: string) => {
    const lines: string[] = [
      `<${iconName}`,
      `  size={${size}}`,
      `  variant="${variant}"`,
      (variant === 'outlined' || variant === 'linear') && strokeWidth !== 1.5 ? `  strokeWidth={${strokeWidth}}` : undefined,
      rotate !== 0 ? `  rotate={${rotate}}` : undefined,
      mirrored ? `  mirrored={${mirrored}}` : undefined,
      flipped ? `  flipped={${flipped}}` : undefined,
      spin ? `  spin={${spin}}` : undefined,
      pulse ? `  pulse={${pulse}}` : undefined,
      bounce ? `  bounce={${bounce}}` : undefined,
      opacity !== 1 ? `  opacity={${opacity}}` : undefined,
      variant === 'duotone' && secondaryColor ? `  secondaryColor="${secondaryColor}"` : undefined,
      `  title="${iconName}"`,
      `/>`
    ].filter(Boolean) as string[];

    const iconCode = lines.join("\n");

    try {
      await navigator.clipboard.writeText(iconCode);
      setCopiedIcon(iconName);
      setTimeout(() => setCopiedIcon(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      {/* Tailwind CDN to enable dynamic className utilities in preview */}
      <Script src="https://cdn.tailwindcss.com" strategy="afterInteractive" />
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">🎨 Ophelia Icons Library</h1>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showCode}
                onChange={(e) => setShowCode(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Show Code</span>
            </label>
            <div className="text-sm text-gray-500">
              {filtered.length} icons
            </div>
          </div>
        </div>

        {/* Advanced Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
          {/* Search */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Search Icons</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name..."
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Size */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Size: {size}px</label>
            <input
              type="range"
              min={12}
              max={128}
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value, 10))}
              className="w-full"
            />
          </div>

          {/* Variant */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Variant</label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white outline-none"
            >
              <option value="filled">Filled</option>
              <option value="outlined">Outlined</option>
              <option value="duotone">Duotone</option>
              <option value="linear">Linear</option>
            </select>
          </div>

          {/* className (Tailwind/CSS) */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium">className (örn: hover:text-red-600 hover:scale-110)</label>
            <div className="flex gap-2">
              <input
                value={iconClassName}
                onChange={(e) => setIconClassName(e.target.value)}
                onBlur={() => { try { localStorage.setItem('iconsPreviewClassName', iconClassName); } catch {} }}
                placeholder="hover:text-blue-600 transition duration-200"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white outline-none"
              />
              <button
                onClick={() => { try { localStorage.setItem('iconsPreviewClassName', iconClassName); } catch {} }}
                className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Save
              </button>
            </div>
          </div>

          {/* Primary Color */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Primary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-10 rounded border border-gray-300"
              />
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white outline-none"
              />
            </div>
          </div>

          {/* Secondary Color (for duotone) */}
          {variant === 'duotone' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Secondary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-12 h-10 rounded border border-gray-300"
                />
                <input
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white outline-none"
                />
              </div>
            </div>
          )}

          {/* Stroke Width */}
          {(variant === 'outlined' || variant === 'linear') && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Stroke Width: {strokeWidth}</label>
              <input
                type="range"
                min={0.5}
                max={4}
                step={0.1}
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {/* Transform */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Transform</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Rotate"
                value={rotate}
                onChange={(e) => setRotate(parseInt(e.target.value || "0", 10))}
                className="px-2 py-1 rounded border border-gray-300 bg-white outline-none text-sm"
              />
              <div className="flex gap-1">
                <button
                  onClick={() => setMirrored(!mirrored)}
                  className={`px-2 py-1 rounded text-xs ${mirrored ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  ↔️
                </button>
                <button
                  onClick={() => setFlipped(!flipped)}
                  className={`px-2 py-1 rounded text-xs ${flipped ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  ↕️
                </button>
              </div>
            </div>
          </div>

          {/* Animations */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Animations</label>
            <div className="flex gap-2">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={spin}
                  onChange={(e) => setSpin(e.target.checked)}
                  className="rounded"
                />
                <span className="text-xs">Spin</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={pulse}
                  onChange={(e) => setPulse(e.target.checked)}
                  className="rounded"
                />
                <span className="text-xs">Pulse</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={bounce}
                  onChange={(e) => setBounce(e.target.checked)}
                  className="rounded"
                />
                <span className="text-xs">Bounce</span>
              </label>
            </div>
          </div>

          {/* Opacity */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Opacity: {opacity}</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map(([name, Comp]) => (
            <div
              key={name}
              className="group border border-gray-200 rounded-lg p-4 flex flex-col items-center gap-3 bg-white hover:shadow-lg transition-all duration-200 relative"
            >
              {/* Icon */}
              <div className="flex items-center justify-center">
                {/* @ts-ignore - dynamic component */}
                <Comp 
                  size={size} 
                  color={undefined}
                  secondaryColor={variant === 'duotone' ? secondaryColor : undefined}
                  variant={variant}
                  strokeWidth={strokeWidth}
                  rotate={rotate}
                  mirrored={mirrored}
                  flipped={flipped}
                  spin={spin}
                  pulse={pulse}
                  bounce={bounce}
                  opacity={opacity}
                  className={`transition duration-200 text-[${color}] ${iconClassName}`}
                />
              </div>
              
              {/* Name */}
              <div className="text-xs text-center wrap-break-word leading-tight opacity-80 font-mono">
                {name}
              </div>
              
              {/* Copy Button */}
              <button
                onClick={() => copyToClipboard(name)}
                className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
                title="Copy code"
              >
                {copiedIcon === name ? (
                  <span className="text-green-500 text-xs">✓</span>
                ) : (
                  <span className="text-gray-500 text-xs">📋</span>
                )}
              </button>
              
              {/* Code Preview */}
              {showCode && (
                <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-xs p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity max-h-32 overflow-y-auto">
                  <pre className="whitespace-pre-wrap">
{(() => {
  const lines = [
    `<${name}`,
    `  size={${size}}`,
    `  variant="${variant}"`,
    (variant === 'outlined' || variant === 'linear') && strokeWidth !== 1.5 ? `  strokeWidth={${strokeWidth}}` : undefined,
    rotate !== 0 ? `  rotate={${rotate}}` : undefined,
    mirrored ? `  mirrored={${mirrored}}` : undefined,
    flipped ? `  flipped={${flipped}}` : undefined,
    spin ? `  spin={${spin}}` : undefined,
    pulse ? `  pulse={${pulse}}` : undefined,
    bounce ? `  bounce={${bounce}}` : undefined,
    opacity !== 1 ? `  opacity={${opacity}}` : undefined,
    variant === 'duotone' && secondaryColor ? `  secondaryColor="${secondaryColor}"` : undefined,
    `  title="${name}"`,
    `/>`
  ].filter(Boolean);
  return lines.join('\n');
})()}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center opacity-70 py-20">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-xl font-medium mb-2">No icons found</div>
            <div className="text-gray-500">Try a different search term</div>
          </div>
        )}
      </div>
    </div>
  );
}
