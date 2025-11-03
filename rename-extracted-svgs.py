#!/usr/bin/env python3
"""
Extracted SVG dosyalarını yeniden adlandırır:
1. Kebab-case formatına çevirir
2. Mevcut icon'larla çakışma varsa yeni isimlendirme yapar (örn: microphone2)
"""

import os
import re
from pathlib import Path

EXTRACTED_DIR = "extracted_svgs"
ICONS_DIR = "ophelia-icons/src/icons"

def to_kebab_case(name):
    """PascalCase veya camelCase'i kebab-case'e çevirir"""
    # Önce sayılar ve büyük harflerden önce tire ekle
    name = re.sub(r'([a-z0-9])([A-Z])', r'\1-\2', name)
    # Sayılar ve harfler arasına tire ekle
    name = re.sub(r'([A-Za-z])([0-9])', r'\1-\2', name)
    name = re.sub(r'([0-9])([A-Za-z])', r'\1-\2', name)
    # Küçük harfe çevir
    name = name.lower()
    # Çoklu tire'leri tek tire'ye çevir
    name = re.sub(r'-+', '-', name)
    # Başlangıç ve son tire'leri kaldır
    name = name.strip('-')
    return name

def get_existing_icon_names():
    """Mevcut icon dosya isimlerini al (kebab-case'e çevirilmiş)"""
    existing = set()
    if os.path.exists(ICONS_DIR):
        for file in os.listdir(ICONS_DIR):
            if file.endswith('.svg'):
                # uEA01-chat-module.svg formatından chat-module çıkar
                base_name = file.replace('.svg', '')
                # Unicode prefix'i kaldır
                if '-' in base_name:
                    icon_name = '-'.join(base_name.split('-')[1:])
                else:
                    icon_name = base_name
                # Kebab-case'e çevir
                kebab_name = to_kebab_case(icon_name)
                existing.add(kebab_name)
    return existing

def find_available_name(base_name, existing_names):
    """Kullanılabilir bir isim bul (çakışma varsa 2, 3, ... ekle - tire olmadan)"""
    if base_name not in existing_names:
        return base_name
    
    # Çakışma var, yeni isim bul (tire olmadan: microphone2, home2, etc.)
    counter = 2
    while True:
        new_name = f"{base_name}{counter}"
        if new_name not in existing_names:
            return new_name
        counter += 1
        if counter > 100:  # Safety limit
            return f"{base_name}-new"

def main():
    print("🔍 Mevcut icon dosyaları kontrol ediliyor...")
    existing_names = get_existing_icon_names()
    print(f"📋 {len(existing_names)} mevcut icon bulundu")
    
    if not os.path.exists(EXTRACTED_DIR):
        print(f"❌ {EXTRACTED_DIR} klasörü bulunamadı!")
        return
    
    print(f"\n📁 {EXTRACTED_DIR} klasöründeki dosyalar işleniyor...")
    
    # Tüm dosyaları listele
    files_to_rename = []
    for file in os.listdir(EXTRACTED_DIR):
        if file.endswith('.svg'):
            old_path = os.path.join(EXTRACTED_DIR, file)
            old_name = file.replace('.svg', '')
            
            # Kebab-case'e çevir
            kebab_name = to_kebab_case(old_name)
            
            # Çakışma kontrolü
            new_name = find_available_name(kebab_name, existing_names)
            
            if old_name != new_name or old_name != kebab_name:
                new_path = os.path.join(EXTRACTED_DIR, f"{new_name}.svg")
                files_to_rename.append({
                    'old': old_path,
                    'new': new_path,
                    'old_name': old_name,
                    'new_name': new_name
                })
    
    print(f"\n📝 {len(files_to_rename)} dosya yeniden adlandırılacak\n")
    
    # Dosyaları yeniden adlandır
    renamed_count = 0
    for item in files_to_rename:
        try:
            os.rename(item['old'], item['new'])
            print(f"✅ {item['old_name']} -> {item['new_name']}")
            renamed_count += 1
            # Mevcut listeye ekle (sonraki çakışmalar için)
            existing_names.add(item['new_name'])
        except Exception as e:
            print(f"❌ {item['old_name']} -> Hata: {e}")
    
    # Kebab-case'e çevrilmemiş dosyaları da kontrol et
    for file in os.listdir(EXTRACTED_DIR):
        if file.endswith('.svg'):
            old_name = file.replace('.svg', '')
            kebab_name = to_kebab_case(old_name)
            
            if old_name != kebab_name:
                old_path = os.path.join(EXTRACTED_DIR, file)
                new_name = find_available_name(kebab_name, existing_names)
                new_path = os.path.join(EXTRACTED_DIR, f"{new_name}.svg")
                
                if new_path != old_path:
                    try:
                        os.rename(old_path, new_path)
                        print(f"✅ {old_name} -> {new_name}")
                        renamed_count += 1
                        existing_names.add(new_name)
                    except Exception as e:
                        print(f"❌ {old_name} -> Hata: {e}")
    
    print(f"\n✨ Tamamlandı! {renamed_count} dosya yeniden adlandırıldı.")

if __name__ == "__main__":
    main()

