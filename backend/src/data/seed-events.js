// npm run seed ile veritabanına giren 6 örnek etkinlik.
// id alanı yok: _id değerini MongoDB kendisi verir.
// category değerleri model dosyasındaki enum listesinden seçilmiştir.
// date "GG-AA-YYYY" biçimindedir. İlk iki etkinliğin tarihi geçmiştir: /events/upcoming
// listesinde görünmezler, /events listesinde görünürler. Diğer dördü ileri tarihlidir.
export const seedEvents = [
  {
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 20,
    date: "15-10-2026", // geçmiş
    time: "10:00",
    location: "Robotik Laboratuvarı",
    description: "Sensör ve motor bağlantılarıyla ilk gezgin robotunu birlikte kuralım.",
  },
  {
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "05-11-2026", // geçmiş
    time: "14:00",
    location: "Bilgisayar Laboratuvarı 4",
    description: "HTML ve CSS ile mobil uyumlu bir sayfa tasarımını adım adım yapıyoruz.",
  },
  {
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    capacity: 100,
    date: "18-02-2027",
    time: "15:00",
    location: "Kütüphane Konferans Salonu",
    description: "Sektörden bir güvenlik uzmanıyla gerçek saldırı örnekleri ve kariyer sohbeti.",
  },
  {
    title: "Kodlama Yarışması",
    category: "Yarışma",
    capacity: 60,
    date: "25-02-2027",
    time: "09:00",
    location: "Teknoloji Merkezi Salon B",
    description: "İki kişilik takımlarla üç saatte beş problem çöz; en çok soruyu en kısa sürede bitiren kazanır.",
  },
  {
    title: "Yapay Zekâ Semineri",
    category: "Seminer",
    capacity: 120,
    date: "11-03-2027",
    time: "13:30",
    location: "Mühendislik Fakültesi Amfi 3",
    description: "Makine öğrenmesinin temel fikirleri ve günlük hayattaki uygulama örnekleri.",
  },
  {
    title: "Kariyer Günleri 2027",
    category: "Seminer",
    capacity: 200,
    date: "09-03-2027",
    time: "10:00",
    location: "Kongre ve Kültür Merkezi",
    description: "Firmaların standları, mülakat ipuçları ve staj fırsatları tek günde.",
  },
];
