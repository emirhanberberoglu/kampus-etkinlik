// "2026-10-12" → "12 Ekim 2026"
export function formatDate(date: string): string {
  const aylar = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  const parcalar = date.split("-");
  if (parcalar.length !== 3) return date;
  const yil = parcalar[0];
  const ay = aylar[parseInt(parcalar[1], 10) - 1];
  const gun = parseInt(parcalar[2], 10);
  if (!ay) return date;
  return `${gun} ${ay} ${yil}`;
}
