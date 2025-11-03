#!/usr/bin/env python3
"""
AppTheme.tsx dosyasındaki tüm SVG'leri extract eder ve ayrı dosyalara kaydeder.
Props'ları (size, className, strokeColor, fillColor, ext1, ext2, ext3) düzgün şekilde doldurur.
"""

import re
import os
from pathlib import Path

# AppTheme.tsx dosyasının yolu
APP_THEME_PATH = "AppTheme.tsx"
OUTPUT_DIR = "extracted_svgs"

def extract_case_blocks(content):
    """Switch case bloğundaki tüm case'leri extract eder"""
    # Switch bloğunu bul
    switch_match = re.search(r'switch\s*\(\s*iconName\s*\)\s*\{', content)
    if not switch_match:
        print("❌ Switch bloğu bulunamadı")
        return []
    
    switch_start = switch_match.end()
    # Switch bloğunun sonunu bul (default case'ten sonraki })
    switch_block = content[switch_start:]
    
    cases = []
    case_pattern = r'case\s+"([^"]+)":'
    
    for match in re.finditer(case_pattern, switch_block):
        case_name = match.group(1)
        case_start = match.end()
        
        # Sonraki case veya default'u bul
        next_case = re.search(r'\n\s+case\s+"', switch_block[case_start:])
        next_default = re.search(r'\n\s+default\s*:', switch_block[case_start:])
        
        if next_case:
            case_end = case_start + next_case.start()
        elif next_default:
            case_end = case_start + next_default.start()
        else:
            case_end = len(switch_block)
        
        case_content = switch_block[case_start:case_end].strip()
        
        # Return statement'ını bul
        # Template string return (`...`)
        template_match = re.search(r'return\s*`([^`]+)`', case_content, re.DOTALL)
        if template_match:
            svg_content = template_match.group(1)
            cases.append({
                'name': case_name,
                'content': svg_content,
                'type': 'template'
            })
            continue
        
        # JSX return (<svg>...</svg>)
        return_match = re.search(r'return\s*(\(?)', case_content)
        if return_match:
            return_start = return_match.end()
            has_paren = return_match.group(1) == '('
            
            # SVG tag'ini bul
            svg_match = re.search(r'<svg[^>]*>.*?</svg>', case_content, re.DOTALL)
            if svg_match:
                svg_content = svg_match.group(0)
                cases.append({
                    'name': case_name,
                    'content': svg_content,
                    'type': 'jsx'
                })
            else:
                # Eğer SVG bulunamazsa, tüm return içeriğini al
                if has_paren:
                    # Matching parentheses bul
                    paren_count = 1
                    i = return_start
                    while i < len(case_content) and paren_count > 0:
                        if case_content[i] == '(':
                            paren_count += 1
                        elif case_content[i] == ')':
                            paren_count -= 1
                        i += 1
                    svg_content = case_content[return_start:i-1].strip()
                else:
                    svg_content = case_content[return_start:].strip()
                
                # İlk ve son parantezleri kaldır
                if svg_content.startswith('(') and svg_content.endswith(')'):
                    svg_content = svg_content[1:-1].strip()
                
                if svg_content and '<svg' in svg_content:
                    cases.append({
                        'name': case_name,
                        'content': svg_content,
                        'type': 'jsx'
                    })
    
    return cases

def process_svg_content(svg_content, case_name, content_type):
    """SVG içeriğini işler ve props'ları düzgün şekilde yerleştirir"""
    
    if content_type == 'template':
        # Template string formatı: `${size}`, `${className}`, `${strokeColor}`, `${fillColor}`
        # Bunları varsayılan değerlerle doldur
        
        # ${size} -> viewBox'dan veya "24"
        default_size = "24"
        viewbox_match = re.search(r'viewBox\s*=\s*"([^"]+)"', svg_content)
        if viewbox_match:
            viewbox_values = viewbox_match.group(1).split()
            if len(viewbox_values) >= 2:
                default_size = viewbox_values[2] if len(viewbox_values) > 2 else "24"
        
        # Template string değişkenlerini doldur
        svg_content = re.sub(r'\$\{size\}', default_size, svg_content)
        svg_content = re.sub(r'\$\{className\}', '', svg_content)
        svg_content = re.sub(r'\$\{strokeColor\}', 'currentColor', svg_content)
        svg_content = re.sub(r'\$\{fillColor\}', 'none', svg_content)
        svg_content = re.sub(r'\$\{ext1\}', '', svg_content)
        svg_content = re.sub(r'\$\{ext2\}', '', svg_content)
        svg_content = re.sub(r'\$\{ext3\}', '', svg_content)
        
        # Conditional: strokeColor || "white" -> currentColor
        svg_content = re.sub(r'\$\{strokeColor\s*\|\|\s*"([^"]*)"\}', r'\1', svg_content)
        svg_content = re.sub(r'\$\{fillColor\s*\|\|\s*"([^"]*)"\}', r'\1', svg_content)
        
    elif content_type == 'jsx':
        # JSX formatı: width={size}, className={className}, stroke={strokeColor}
        
        # width={size} -> width="24"
        default_size = "24"
        viewbox_match = re.search(r'viewBox\s*=\s*"([^"]+)"', svg_content)
        if viewbox_match:
            viewbox_values = viewbox_match.group(1).split()
            if len(viewbox_values) >= 2:
                default_size = viewbox_values[2] if len(viewbox_values) > 2 else "24"
        
        svg_content = re.sub(r'width\s*=\s*\{size\}', f'width="{default_size}"', svg_content)
        svg_content = re.sub(r'height\s*=\s*\{size\}', f'height="{default_size}"', svg_content)
        
        # className={className} -> class=""
        svg_content = re.sub(r'className\s*=\s*\{className\}', '', svg_content)
        svg_content = re.sub(r'className\s*=\s*"([^"]*)"', r'class="\1"', svg_content)
        
        # stroke={strokeColor} -> stroke="currentColor"
        svg_content = re.sub(r'stroke\s*=\s*\{strokeColor\}', 'stroke="currentColor"', svg_content)
        # strokeColor || "white" -> currentColor
        svg_content = re.sub(r'stroke\s*=\s*\{strokeColor\s*\|\|\s*"([^"]*)"\}', r'stroke="\1"', svg_content)
        
        # fill={fillColor} -> fill="none" veya "currentColor"
        svg_content = re.sub(r'fill\s*=\s*\{fillColor\}', 'fill="none"', svg_content)
        svg_content = re.sub(r'fill\s*=\s*\{fillColor\s*\|\|\s*"([^"]*)"\}', r'fill="\1"', svg_content)
        
        # JSX camelCase -> SVG kebab-case
        svg_content = re.sub(r'strokeWidth\s*=\s*"([^"]*)"', r'stroke-width="\1"', svg_content)
        svg_content = re.sub(r'strokeWidth\s*=\s*\{(\d+)\}', r'stroke-width="\1"', svg_content)
        svg_content = re.sub(r'strokeLinecap\s*=\s*"([^"]*)"', r'stroke-linecap="\1"', svg_content)
        svg_content = re.sub(r'strokeLinejoin\s*=\s*"([^"]*)"', r'stroke-linejoin="\1"', svg_content)
        svg_content = re.sub(r'strokeDasharray\s*=\s*"([^"]*)"', r'stroke-dasharray="\1"', svg_content)
        svg_content = re.sub(r'aria-hidden\s*=\s*\{true\}', 'aria-hidden="true"', svg_content)
        svg_content = re.sub(r'aria-hidden\s*=\s*"true"', 'aria-hidden="true"', svg_content)
    
    # ext1, ext2, ext3 class attribute'larını kaldır
    svg_content = re.sub(r'\s+class\s*=\s*"\$\{ext1\}"', '', svg_content)
    svg_content = re.sub(r'\s+class\s*=\s*"\$\{ext2\}"', '', svg_content)
    svg_content = re.sub(r'\s+class\s*=\s*"\$\{ext3\}"', '', svg_content)
    svg_content = re.sub(r'\s+class\s*=\s*\{ext1\}', '', svg_content)
    svg_content = re.sub(r'\s+class\s*=\s*\{ext2\}', '', svg_content)
    svg_content = re.sub(r'\s+class\s*=\s*\{ext3\}', '', svg_content)
    
    # Boş class attribute'unu kaldır
    svg_content = re.sub(r'\s+class\s*=\s*""', '', svg_content)
    
    # xmlns ekle (yoksa)
    if 'xmlns' not in svg_content and '<svg' in svg_content:
        svg_content = re.sub(
            r'(<svg[^>]*)',
            r'\1 xmlns="http://www.w3.org/2000/svg"',
            svg_content,
            count=1
        )
    
    return svg_content

def create_svg_file(case_name, svg_content, output_dir):
    """SVG dosyası oluşturur"""
    # Dosya adını oluştur
    filename = f"{case_name}.svg"
    filepath = os.path.join(output_dir, filename)
    
    # SVG dosyasına yaz
    with open(filepath, 'w', encoding='utf-8') as f:
        # XML declaration ekle
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        
        # Eğer SVG tag'i yoksa ekle
        if not svg_content.strip().startswith('<svg'):
            # viewBox varsa ondan al, yoksa default
            viewbox_match = re.search(r'viewBox\s*=\s*"([^"]+)"', svg_content)
            viewbox = viewbox_match.group(1) if viewbox_match else "0 0 24 24"
            
            f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}">\n')
            f.write(svg_content)
            f.write('\n</svg>')
        else:
            f.write(svg_content)
    
    return filepath

def main():
    print("🔍 AppTheme.tsx dosyasını okunuyor...")
    
    # Dosyayı oku
    with open(APP_THEME_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("📋 Case'ler extract ediliyor...")
    cases = extract_case_blocks(content)
    
    print(f"✅ {len(cases)} case bulundu")
    
    # Output klasörünü oluştur
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"\n📁 SVG dosyaları {OUTPUT_DIR} klasörüne kaydediliyor...\n")
    
    extracted_count = 0
    for i, case in enumerate(cases, 1):
        case_name = case['name']
        svg_content = case['content']
        
        # Boş SVG'leri atla
        if not svg_content.strip() or svg_content.strip() == '<svg></svg>':
            print(f"⏭️  [{i}/{len(cases)}] {case_name} - Boş SVG, atlanıyor")
            continue
        
        try:
            # SVG içeriğini işle
            content_type = case.get('type', 'jsx')
            processed_svg = process_svg_content(svg_content, case_name, content_type)
            filepath = create_svg_file(case_name, processed_svg, OUTPUT_DIR)
            extracted_count += 1
            print(f"✅ [{i}/{len(cases)}] {case_name} ({content_type}) -> {filepath}")
        except Exception as e:
            print(f"❌ [{i}/{len(cases)}] {case_name} - Hata: {e}")
            import traceback
            traceback.print_exc()
    
    print(f"\n✨ Tamamlandı! {extracted_count} SVG dosyası extract edildi.")

if __name__ == "__main__":
    main()

