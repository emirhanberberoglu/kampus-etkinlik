# Kampüs Etkinlikleri · Backend (Sprint 7 · Express REST API)

Web Teknolojileri ve Programlama dersi proje çalışması. Öğrenci: **Emirhan Berberoğlu — 2416501013**.

`frontend/` klasöründeki React uygulamasının ileride bağlanacağı REST API. Bu sprintte etkinlikler bellekteki bir dizide tutulur; sunucu kapanınca `POST` ile eklenenler silinir (MongoDB Sprint 8'de gelecek).

## Çalıştırma

Node.js 18.11 veya üstü gerekir.

```bash
cd backend
cp .env.example .env     # Windows PowerShell: copy .env.example .env
npm install
npm run dev              # http://localhost:3000  (dosya değişince otomatik yeniden başlar)
npm start                # izleme olmadan normal başlatma
```

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | `node --watch src/server.js` — kodu kaydedince sunucu kendini yeniler |
| `npm start` | `node src/server.js` — tek seferlik başlatma |

## PORT değişkeni

Port kod içine yazılmadı, `.env` dosyasından okunur (`dotenv`). `.env` dosyası GitHub'a **gönderilmez** (`.gitignore` içinde); örnek değerler `.env.example` dosyasındadır.

```env
PORT=3000
```

`.env` yoksa ya da `PORT` boşsa sunucu `3000` ile açılır. Port doluysa sunucu hata mesajı verip kapanır; `.env` içindeki `PORT` değerini değiştirmek yeterlidir.

## Klasör yapısı

```text
backend/
  src/
    app.js                         Express uygulaması: cors, JSON, /health, route'lar, 404 ve hata yakalayıcı
    server.js                      .env'i okur, PORT'tan dinlemeye başlar
    routes/event-routes.js         /events adresleri → controller fonksiyonları
    controllers/event-controller.js  isteği işleyen fonksiyonlar (listele, tek getir, oluştur)
    data/events.js                 bellekteki 6 başlangıç etkinliği
  requests/kampus-api.json         Postman collection (6 istek)
  .env.example                     örnek ortam değişkenleri
  .gitignore                       node_modules ve .env'i dışarıda tutar
  package.json
  README.md
```

## REST sözleşmesi

| Metot | Adres | Açıklama | Başarılı | Hata |
| --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı; `status`, `time`, `student` döner | `200` | — |
| GET | `/events` | Tüm etkinlikler. İsteğe bağlı `?category=Seminer` ile kategoriye göre süzer | `200` | — |
| GET | `/events/:id` | Tek etkinlik | `200` | `404` Event not found |
| POST | `/events` | Yeni etkinlik oluşturur (JSON gövde) | `201` | `400` title, category and date are required |

Bu sprintte `PATCH /events/:id` ve `DELETE /events/:id` yoktur; Sprint 9'da eklenecek. Tanımsız her adres `404` ve `Route not found` döner.

### Etkinlik nesnesi

```json
{
  "id": "event-2",
  "title": "Açık Kaynağa İlk Katkı Atölyesi",
  "category": "Atölye",
  "capacity": 25,
  "date": "2026-12-05",
  "time": "10:30",
  "location": "Bilgisayar Laboratuvarı 4",
  "description": "Fork, branch ve pull request akışını uygulamalı öğren; ilk katkını birlikte gönderelim."
}
```

`POST /events` için `title`, `category` ve `date` zorunludur (boşluktan ibaret değer de eksik sayılır). `capacity` sayıya çevrilir, verilmezse `0` olur; `time`, `location` ve `description` verilmezse boş metin olur. `id` sunucuda üretilir (`event-<zaman>`).

### Hata biçimi

Tüm hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

| Durum | Kod | `error.message` |
| --- | --- | --- |
| Olmayan etkinlik id'si | 404 | `Event not found` |
| Tanımsız adres | 404 | `Route not found` |
| `title`, `category` veya `date` eksik | 400 | `title, category and date are required` |
| Bozuk JSON gövdesi | 400 | `Invalid JSON body` |
| Beklenmeyen sunucu hatası | 500 | `Internal server error` |

## Örnek istekler

```bash
curl http://localhost:3000/health
curl http://localhost:3000/events
curl "http://localhost:3000/events?category=Atölye"
curl http://localhost:3000/events/event-2
curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{"title":"Kampüs Kodlama Gecesi","category":"Yarışma","date":"2026-12-26"}'
```

## Postman ile deneme

1. `npm run dev` ile sunucuyu başlat.
2. Postman'de **Import** → `backend/requests/kampus-api.json` dosyasını seç.
3. **Kampüs API** collection'ındaki 6 isteği sırayla gönder; her isteğin test sekmesi beklenen durum kodunu denetler.

| İstek | Beklenen |
| --- | --- |
| 1 Health | 200 |
| 2 Etkinlik listesi | 200 |
| 3 Tek etkinlik | 200 |
| 4 Olmayan etkinlik (404) | 404 |
| 5 Etkinlik oluştur (201) | 201 |
| 6 Eksik veri (400) | 400 |
