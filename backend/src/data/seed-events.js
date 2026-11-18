// npm run seed ile veritabanına giren 6 örnek etkinlik.
// id alanı yok: _id değerini MongoDB kendisi verir.
// category değerleri model dosyasındaki enum listesinden seçilmiştir.
export const seedEvents = [
  {
    title: "Gömülü Sistemler Buluşması",
    category: "Seminer",
    capacity: 120,
    date: "2026-12-03",
    time: "14:00",
    location: "Mühendislik Fakültesi Amfi 3",
    description: "Mikrodenetleyicilerle gerçek zamanlı uygulama örnekleri ve sektörden kariyer önerileri.",
  },
  {
    title: "Açık Kaynağa İlk Katkı Atölyesi",
    category: "Atölye",
    capacity: 25,
    date: "2026-12-05",
    time: "10:30",
    location: "Bilgisayar Laboratuvarı 4",
    description: "Fork, branch ve pull request akışını uygulamalı öğren; ilk katkını birlikte gönderelim.",
  },
  {
    title: "Veri Biliminin Spordaki Rolü",
    category: "Söyleşi",
    capacity: 80,
    date: "2026-12-09",
    time: "15:00",
    location: "Kütüphane Konferans Salonu",
    description: "Maç verilerinden tahmin modelleri geliştiren bir mühendisle sohbet ve soru-cevap.",
  },
  {
    title: "Algoritma Maratonu",
    category: "Yarışma",
    capacity: 40,
    date: "2026-12-12",
    time: "09:00",
    location: "Teknoloji Merkezi Salon B",
    description: "İki kişilik takımlarla üç saatte beş problem çöz; en çok soruyu en kısa sürede bitiren kazanır.",
  },
  {
    title: "Fikirden İlk Müşteriye",
    category: "Seminer",
    capacity: 90,
    date: "2026-12-16",
    time: "13:30",
    location: "İktisat Fakültesi Konferans Salonu",
    description: "Öğrenci girişimcilerden ilk ürünü çıkarırken yaptıkları hatalar ve öğrendikleri dersler.",
  },
  {
    title: "Telefonla Kampüs Fotoğrafçılığı",
    category: "Atölye",
    capacity: 30,
    date: "2026-12-19",
    time: "11:00",
    location: "Güzel Sanatlar Atölyesi 2",
    description: "Işık, kompozisyon ve hızlı düzenleme ipuçlarıyla telefon kamerasından daha iyi kareler al.",
  },
];
