#!/usr/bin/env python3
"""
Extracted SVG dosyalarındaki JSX syntax hatalarını düzeltir.
fill={strokeColor}, fill={fillColor}, {size}, {className} gibi expression'ları temizler.
"""

import os
import re
from pathlib import Path

EXTRACTED_DIR = "extracted_svgs"

def fix_jsx_expressions(content):
    """SVG içeriğindeki JSX expression'larını temizle"""
    
    # {strokeColor} -> currentColor
    content = re.sub(r'\{strokeColor\}', 'currentColor', content)
    content = re.sub(r'\{strokeColor\s*\|\|\s*"([^"]*)"\}', r'\1', content)
    
    # {fillColor} -> none veya currentColor (duruma göre)
    content = re.sub(r'\{fillColor\}', 'none', content)
    content = re.sub(r'\{fillColor\s*\|\|\s*"([^"]*)"\}', r'\1', content)
    
    # {size} -> viewBox'dan alınan değer veya 24
    # Önce mevcut width/height değerlerini kontrol et
    width_match = re.search(r'width\s*=\s*"(\d+)"', content)
    height_match = re.search(r'height\s*=\s*"(\d+)"', content)
    
    default_size = "24"
    if width_match:
        default_size = width_match.group(1)
    elif height_match:
        default_size = height_match.group(1)
    else:
        # viewBox'dan al
        viewbox_match = re.search(r'viewBox\s*=\s*"([^"]+)"', content)
        if viewbox_match:
            viewbox_values = viewbox_match.group(1).split()
            if len(viewbox_values) >= 2:
                default_size = viewbox_values[2] if len(viewbox_values) > 2 else "24"
    
    content = re.sub(r'\{size\}', default_size, content)
    
    # {className} -> kaldır veya boş bırak
    content = re.sub(r'className\s*=\s*\{className\}', '', content)
    content = re.sub(r'\{className\}', '', content)
    
    # {ext1}, {ext2}, {ext3} -> kaldır
    content = re.sub(r'\{ext1\}', '', content)
    content = re.sub(r'\{ext2\}', '', content)
    content = re.sub(r'\{ext3\}', '', content)
    
    # class="{ext1}" gibi attribute'ları kaldır
    content = re.sub(r'\s+class\s*=\s*"\{ext1\}"', '', content)
    content = re.sub(r'\s+class\s*=\s*"\{ext2\}"', '', content)
    content = re.sub(r'\s+class\s*=\s*"\{ext3\}"', '', content)
    content = re.sub(r'\s+class\s*=\s*"\{className\}"', '', content)
    
    # fill={strokeColor} -> fill="currentColor"
    content = re.sub(r'fill\s*=\s*\{strokeColor\}', 'fill="currentColor"', content)
    
    # fill={fillColor} -> fill="none"
    content = re.sub(r'fill\s*=\s*\{fillColor\}', 'fill="none"', content)
    
    # stroke={strokeColor} -> stroke="currentColor"
    content = re.sub(r'stroke\s*=\s*\{strokeColor\}', 'stroke="currentColor"', content)
    
    # stroke={fillColor} -> stroke="none" (bu genelde hata ama yine de düzelt)
    content = re.sub(r'stroke\s*=\s*\{fillColor\}', 'stroke="none"', content)
    
    # width={size}, height={size} -> width="24", height="24"
    content = re.sub(r'width\s*=\s*\{size\}', f'width="{default_size}"', content)
    content = re.sub(r'height\s*=\s*\{size\}', f'height="{default_size}"', content)
    
    # Kalan JSX expression'ları temizle (generic)
    # {true} -> "true" veya true
    content = re.sub(r'\{true\}', 'true', content)
    content = re.sub(r'\{false\}', 'false', content)
    
    # className= gibi boş attribute'ları temizle
    content = re.sub(r'\s+className\s*=\s*["\']?["\']?\s*(?=\s|>|/>)', '', content)
    content = re.sub(r'\s+className\s*=\s*', '', content)
    
    # Boş attribute'ları temizle
    content = re.sub(r'\s+=\s*""', '', content)
    content = re.sub(r'\s+=\s*\'\'', '', content)
    
    # Tek başına kalan attribute isimlerini kaldır (className= gibi)
    content = re.sub(r'\s+[a-zA-Z]+\s*=\s*(?=\s|>|/>)', '', content)
    
    # Çoklu boşlukları temizle
    content = re.sub(r'\s{2,}', ' ', content)
    
    # Attribute'lar arasındaki tek boşlukları koru ama gereksiz boşlukları temizle
    content = re.sub(r'>\s+<', '><', content)
    
    return content

def fix_svg_file(filepath):
    """Tek bir SVG dosyasını düzelt"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        fixed_content = fix_jsx_expressions(content)
        
        # Eğer değişiklik varsa kaydet
        if fixed_content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            return True
        return False
    except Exception as e:
        print(f"❌ Hata ({filepath}): {e}")
        return False

def main():
    print("🔍 JSX syntax hataları kontrol ediliyor...")
    
    if not os.path.exists(EXTRACTED_DIR):
        print(f"❌ {EXTRACTED_DIR} klasörü bulunamadı!")
        return
    
    svg_files = [f for f in os.listdir(EXTRACTED_DIR) if f.endswith('.svg')]
    print(f"📋 {len(svg_files)} SVG dosyası bulundu\n")
    
    fixed_count = 0
    for i, filename in enumerate(svg_files, 1):
        filepath = os.path.join(EXTRACTED_DIR, filename)
        
        # Dosyada JSX expression var mı kontrol et
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if '{' in content and '}' in content:
            fixed = fix_svg_file(filepath)
            if fixed:
                print(f"✅ [{i}/{len(svg_files)}] {filename}")
                fixed_count += 1
    
    print(f"\n✨ Tamamlandı! {fixed_count} dosya düzeltildi.")

if __name__ == "__main__":
    main()

