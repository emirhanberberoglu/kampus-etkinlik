# Kampüs Etkinlikleri Projesi

Bu proje, Web Teknolojileri ve Programlama dersi kapsamında adım adım (çevik/agile sprint mantığıyla) geliştirilen bir etkinlik yönetim platformudur.

## 🌐 Canlı Yayın (Vercel) Adresi
Projenin en güncel çalışan hali: https://kampus-etkinlik-6ree.vercel.app/

## 🛠️ Kullanılan Teknolojiler
* **HTML5** (Semantik Etiketler)
* **CSS3** (Grid, Mobile-First, Custom Variables)
* **JavaScript** (ES Modules, DOM)
* **TypeScript, Vite ve React** (Sprint 4+)
* **Git & GitHub** (Versiyon Kontrolü)
* **Vercel** (Canlı Yayın / Deployment)

---

## 🚀 Geliştirme Süreci (Sprint Günlüğü)

### ✅ Sprint 1: İskelet Kurulumu (Tamamlandı)
* HTML5 anlamsal (semantic) etiketleri kullanılarak projenin temel iskeleti oluşturuldu.
* Toplam 5 sayfalık (Ana Sayfa, Etkinlikler, Detay, Ekle, Güncelle) yapı kuruldu.
* Hiçbir stil veya script dosyası kullanılmadan saf HTML ile veri hiyerarşisi sağlandı.

### ✅ Sprint 2: Tasarım ve Düzen (Tamamlandı)
* Mobil öncelikli (mobile-first) CSS tasarımı entegre edildi.
* Sayfa yerleşimleri (özellikle etkinlik kartları ve detay sayfası) için **CSS Grid** (Izgara) yapısı kullanıldı.
* Öğrenci numarasına (2416501013) dayalı özel CSS değişkenleriyle özgün renk ve font (Trebuchet MS, Hue 293) atamaları yapıldı.
* Eski tablo yapıları modern kartlara çevrildi, form elemanlarına hata (validation) stilleri eklendi.

### ✅ Sprint 3: JavaScript ve DOM (Tamamlandı)
* Etkinlikler `data.js` içindeki bir diziden üretilir; kartlar JavaScript ile çizilir.
* Arama kutusu ve kategori filtresi birlikte çalışır.
* Detay sayfası adres çubuğundaki `?id=` değerine göre doğru etkinliği açar.
* Ekleme formu kendi hata ve başarı mesajlarını gösterir.

### ✅ Sprint 4: Vite, TypeScript ve React (Tamamlandı)
* Proje `frontend/` klasöründe Vite React-TS olarak yeniden kuruldu (detaylar için `frontend/README.md`).
* Etkinlik verisi `CampusEvent` tipiyle tanımlandı; arama ve filtre işlemleri saf fonksiyonlara taşındı.
* 5 sayfa tek `App.tsx` içinde, sayfa geçişi ve arama `useState` ile çalışır; sekme adı `useEffect` ile güncellenir.

### ✅ Sprint 5: React Bileşenleri (Components) (Tamamlandı)
* Sprint 4'teki tek parça `App.tsx` (249 satır) 8 bileşene bölündü:
  * **Layout bileşenleri**: `Header` (sayfa başlığı), `Navigation` (sayfa geçişi), `Footer` (alt bilgi)
  * **Etkinlik bileşenleri**: `EventCard` (tek kart), `EventList` (kart listesi), `EventFilter` (arama & kategori), `EventDetail` (detay sayfası)
  * **Form bileşeni**: `EventForm` (ekleme / güncelleme)
* Her bileşen kendi dosyasında, props tipi TypeScript `interface` ile tanımlıdır ve `export default` ile dışa açılır.
* **State lifting**: `page`, `selectedId`, `searchText`, `category` gibi durumlar `App.tsx` içinde tutulur; bileşenler `onNavigate`, `onShowDetail`, `onSearchChange`, `onBack`, `onSubmit` gibi callback'lerle haber verirler.
* Yardımcı dosyalar: `types/page.ts` (tip tanımları), `utils/format-date.ts` (tarih formatı).
* Satır içi stiller kaldırıldı, tüm stiller `App.css` içinde CSS değişkenleriyle tanımlıdır.
* **Ekran görünümü Sprint 4 ile birebir aynı kaldı.**
