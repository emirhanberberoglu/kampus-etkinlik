// Tarih API'de "GG-AA-YYYY" (örnek: "15-10-2026") metni, veritabanında gerçek Date olarak durur.
// Metin olarak saklansaydı "05-11-2026", "15-10-2026"dan önce sıralanırdı (Kasım Ekim'den önce);
// Date olarak saklayınca sıralama ve $gte karşılaştırması doğru çalışır.

// "15-10-2026" → Date. Biçim yanlışsa ya da tarih gerçek değilse (31-02-2026) geçersiz Date döner;
// Mongoose bunu "Cast to date failed" hatası yapar ve API 400 döndürür.
export function parseDate(value) {
  if (value === undefined || value === null || value instanceof Date) return value;
  if (typeof value !== "string") return new Date(NaN); // sayı, nesne gibi değerler kabul edilmez
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
  if (!m) return new Date(NaN); // biçim yanlış → 400
  const [, gun, ay, yil] = m.map(Number);
  const tarih = new Date(Date.UTC(yil, ay - 1, gun));
  if (tarih.getUTCDate() !== gun || tarih.getUTCMonth() !== ay - 1) {
    return new Date(NaN); // 31-02-2026 gibi
  }
  return tarih;
}

// Date → "15-10-2026"
export function formatDate(tarih) {
  if (!(tarih instanceof Date)) return tarih;
  const gun = String(tarih.getUTCDate()).padStart(2, "0");
  const ay = String(tarih.getUTCMonth() + 1).padStart(2, "0");
  return `${gun}-${ay}-${tarih.getUTCFullYear()}`;
}

// Bugünün başlangıcı (UTC 00:00). /events/upcoming "bugün ve sonrası" için kullanır.
export function todayStart() {
  const s = new Date();
  return new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()));
}
