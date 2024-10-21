import cookie from 'cookie';

interface CookieOptions {
  path?: string;
  expires?: Date;
  [key: string]: any; // Diğer olası opsiyonlar için
}

export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  // Çerezin süresini sonsuz yapmak için çok uzak bir tarih belirliyoruz
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 10); // 10 yıl

  const cookieString = cookie.serialize(name, value, {
    path: '/',
    expires, // Çerezin geçerlilik süresi
    ...options,
  });

  // Çerezi tarayıcıya set etmek için `document.cookie` kullanıyoruz
  document.cookie = cookieString;
}
