# Kampüs Etkinlikleri Projesi

Bu proje, Web Teknolojileri ve Programlama dersi kapsamında adım adım (çevik/agile sprint mantığıyla) geliştirilen bir etkinlik yönetim platformudur. Öğrenci: **Emirhan Berberoğlu — 2416501013**.

## 🌐 Canlı Yayın (Vercel) Adresi
Frontend'in en güncel çalışan hali: https://emirhanberberoglu-frontend.vercel.app/

(Backend bu aşamada yalnızca yerelde çalışır; canlıya alınması sonraki sprintlerde.)

## 📁 Depo Yapısı

```text
kampus-etkinlik/
  sprint1/ sprint2/ sprint3/   HTML, CSS ve JavaScript aşamaları
  frontend/                    React + TypeScript + Vite uygulaması (Sprint 4-6)
  backend/                     Express REST API (Sprint 7)
  README.md
```

## 🛠️ Kullanılan Teknolojiler
* **HTML5** (Semantik Etiketler)
* **CSS3** (Grid, Mobile-First, Custom Variables)
* **JavaScript** (ES Modules, DOM)
* **TypeScript, Vite ve React** (Sprint 4+), **React Router ve Context API** (Sprint 6)
* **Node.js ve Express** (Sprint 7: REST API, dotenv, cors)
* **Git & GitHub** (Versiyon Kontrolü)
* **Vercel** (Canlı Yayın / Deployment)

## ▶️ Projeyi Çalıştırma

**Frontend** (`http://localhost:5173`):

```bash
cd frontend
npm install
npm run dev
```

**Backend** (`http://localhost:3000`):

```bash
cd backend
cp .env.example .env      # Windows PowerShell: copy .env.example .env
npm install
npm run dev
```

Backend'in çalıştırma komutları, `PORT` değişkeni ve REST sözleşmesi tablosu için `backend/README.md` dosyasına bak.

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

### ✅ Sprint 6 / Vize Teslimi: React Router ve Context (Tamamlandı)
* **React Router** ile 10 route tanımlandı (ana sayfa, etkinlik listesi, detay, yönetim, ekleme, güncelleme, giriş, kayıt, şifremi unuttum, 404).
* **Context API** ve `useReducer` ile etkinlik listesi tüm sayfalarda ortak tutulur; ekleme, güncelleme ve silme (onaylı) yönetim sayfasından yapılır.
* Etkinlik, giriş, kayıt ve şifremi unuttum formlarına doğrulama kuralları eklendi.
* `vercel.json` rewrite'ı sayesinde adresler Vercel'de sayfa yenilenince de açılır.
* Ayrıntılar: `frontend/README.md`.

### ✅ Sprint 7: Express ve REST API (Tamamlandı)
* Bu sprintte **yalnızca `backend/` klasörü eklendi; `frontend/` değişmedi.**
* Express 5 ile REST API kuruldu: `GET /health`, `GET /events` (isteğe bağlı `?category=`), `GET /events/:id`, `POST /events`.
* Kod üç katmana ayrıldı: **route** (`routes/event-routes.js`), **controller** (`controllers/event-controller.js`) ve **veri** (`data/events.js`). `app.js` uygulamayı kurar, `server.js` sunucuyu başlatır.
* Port koda yazılmadı, `.env` dosyasından (`dotenv`) okunur; `.env` ve `node_modules` GitHub'a gönderilmez, örnek değerler `.env.example` içindedir.
* Tüm hatalar `{ "error": { "message": "..." } }` biçiminde döner (404 ve 400 durumları dahil).
* `GET /health` yanıtında `student` alanı öğrenci numarasını (2416501013) taşır.
* Etkinlikler bellekteki dizide tutulur, 6 başlangıç etkinliği vardır; `POST` ile eklenenler sunucu kapanınca silinir (kalıcı veri Sprint 8'de).
* 6 isteklik Postman collection'ı `backend/requests/kampus-api.json` dosyasındadır.
* Ayrıntılı çalıştırma komutları ve REST sözleşmesi tablosu: `backend/README.md`.
