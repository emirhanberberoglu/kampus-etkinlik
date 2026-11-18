# Kampüs Etkinlikleri · Backend (Sprint 7-8 · Express + MongoDB)

Web Teknolojileri ve Programlama dersi proje çalışması. Öğrenci: **Emirhan Berberoğlu — 2416501013**.

`frontend/` klasöründeki React uygulamasının ileride bağlanacağı REST API. Sprint 7'de etkinlikler bellekteki bir dizide tutuluyordu. **Sprint 8'de veri MongoDB'ye taşındı:** controller'lar artık `Event` modeli üzerinden veritabanına yazıp okuyor, sunucu kapanıp açılınca kayıtlar duruyor. Adresler ve durum kodları Sprint 7 ile aynı kaldı.

## Çalıştırma

Node.js 18.11 veya üstü gerekir. Veritabanı olarak MongoDB Atlas (bulut) ya da bilgisayardaki MongoDB kullanılabilir.

```bash
cd backend
cp .env.example .env      # Windows PowerShell: copy .env.example .env
# .env dosyasını aç ve MONGODB_URI satırına kendi veritabanı adresini yaz (aşağıya bak)
npm install
npm run seed              # 6 örnek etkinliği veritabanına ekler
npm run dev               # http://localhost:3000  (dosya değişince otomatik yeniden başlar)
```

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | `node --watch src/server.js` — önce veritabanına bağlanır, sonra sunucuyu açar |
| `npm start` | `node src/server.js` — izleme olmadan normal başlatma |
| `npm run seed` | `node src/seed.js` — `events` koleksiyonunu boşaltır, 6 etkinlik ekler |

## Ortam değişkenleri (`.env`)

Ayarlar koda yazılmaz, `backend/.env` dosyasından okunur (`dotenv`). **`.env` dosyası GitHub'a gönderilmez** (`.gitignore` içinde); repoda sadece yer tutucu değerlerin olduğu `.env.example` bulunur.

| Değişken | Açıklama | Örnek |
| --- | --- | --- |
| `PORT` | Sunucunun portu. Yoksa `3000` kullanılır | `3000` |
| `MONGODB_URI` | MongoDB bağlantı adresi. Adresin sonunda veritabanı adı (`/kampus`) olmalı | `mongodb://127.0.0.1:27017/kampus` |

`MONGODB_URI` için iki seçenek vardır:

- **Bilgisayardaki MongoDB:** `.env.example` içindeki hazır adres (`mongodb://127.0.0.1:27017/kampus`) olduğu gibi kullanılabilir.
- **MongoDB Atlas:** Atlas'ta cluster → **Connect** → **Drivers** adımındaki adres kopyalanır, içindeki şifre yer tutucusunun yerine veritabanı kullanıcısının şifresi yazılır ve adresin sonuna (soru işaretinden önce) veritabanı adı olan `/kampus` eklenir. Bu adres şifre içerir; sadece `.env` dosyasına yazılır.

> **Güvenlik:** Gerçek bağlantı adresi ve şifre kodda, README'de, `.env.example` içinde, Postman collection'ında ya da ekran görüntüsünde bulunmamalıdır. Başlangıçta sunucu yalnızca sunucu ve veritabanı adını yazdırır (`MongoDB bağlandı (Atlas): <sunucu adı>/kampus`), adresin tamamını yazdırmaz.

## Klasör yapısı

```text
backend/
  src/
    config/database.js             MongoDB bağlantısı (adres MONGODB_URI'den okunur)
    models/event-model.js          Event şeması ve modeli (doğrulama kuralları burada)
    data/seed-events.js            seed ile eklenen 6 örnek etkinlik
    seed.js                        npm run seed betiği
    app.js                         Express uygulaması: cors, JSON, /health, route'lar, 404 ve hata yakalayıcı
    server.js                      .env'i okur, veritabanına bağlanır, PORT'tan dinlemeye başlar
    routes/event-routes.js         /events adresleri → controller fonksiyonları
    controllers/event-controller.js  isteği işleyen fonksiyonlar (listele, tek getir, oluştur)
  requests/kampus-api.json         Postman collection (6 istek)
  .env.example                     örnek ortam değişkenleri (gerçek adres yok)
  .gitignore                       node_modules ve .env'i dışarıda tutar
  package.json
  README.md
```

## Veri modeli

Veritabanı adı `kampus`, koleksiyon adı `events` (model adı `Event` olduğu için Mongoose koleksiyona bu adı verir). Her kayıt (document) bir etkinliktir.

| Alan | Tür | Kural |
| --- | --- | --- |
| `title` | String | zorunlu, baştaki/sondaki boşluklar silinir (`trim`), 3-100 karakter |
| `category` | String | zorunlu, yalnızca `Seminer`, `Atölye`, `Söyleşi`, `Yarışma` |
| `capacity` | Number | en az `0`, verilmezse `0` |
| `date` | String | zorunlu (örnek: `2026-12-03`) |
| `time` | String | verilmezse boş |
| `location` | String | `trim`, verilmezse boş |
| `description` | String | `trim`, en fazla 500 karakter, verilmezse boş |
| `_id` | ObjectId | MongoDB verir (örnek: `6af57a006f13ad018f7b7a55`) |
| `createdAt`, `updatedAt` | Date | `timestamps` seçeneği ile Mongoose kendisi yazar |

Doğrulama kuralları schema'da durur. Kurala uymayan kayıt `Event validation failed: ...` hatasıyla reddedilir ve API bunu `400` olarak döndürür.

## REST sözleşmesi

| Metot | Adres | Açıklama | Başarılı | Hata |
| --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı; `status`, `time`, `student` döner | `200` | — |
| GET | `/events` | MongoDB'deki tüm etkinlikler (tarihe göre sıralı). İsteğe bağlı `?category=Seminer` ile kategoriye göre süzer | `200` | — |
| GET | `/events/:id` | Tek etkinlik; `:id` MongoDB `_id` değeridir | `200` | `404` Event not found (kayıt yoksa ya da id biçimi geçersizse) |
| POST | `/events` | Yeni etkinlik oluşturur (JSON gövde) | `201` | `400` schema doğrulaması |

`PATCH /events/:id` ve `DELETE /events/:id` Sprint 9'da eklenecek. Tanımsız her adres `404` ve `Route not found` döner.

`POST /events` için `title`, `category` ve `date` zorunludur. Gövdedeki `_id`, `createdAt` gibi bilinmeyen alanlar yok sayılır; bunları sunucu üretir.

### Hata biçimi

Tüm hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

| Durum | Kod | `error.message` |
| --- | --- | --- |
| Olmayan ya da geçersiz etkinlik id'si | 404 | `Event not found` |
| Tanımsız adres | 404 | `Route not found` |
| Schema kuralına uymayan gövde | 400 | `Event validation failed: ...` (hangi alanın neden reddedildiği yazar) |
| Bozuk JSON gövdesi | 400 | `Invalid JSON body` |
| Beklenmeyen sunucu hatası | 500 | `Server error` (ayrıntı yalnızca terminalde görünür) |

Controller'lardaki `try/catch`, beklenmeyen hataları `next(err)` ile `app.js` sonundaki hata yakalayıcıya gönderir; bu yüzden hatalı bir istek sunucuyu çökertmez.

## Örnek istekler

```bash
curl http://localhost:3000/health
curl http://localhost:3000/events
curl "http://localhost:3000/events?category=Atölye"
curl http://localhost:3000/events/<listeden-kopyaladığın-_id>
curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{"title":"Kampüs Kodlama Gecesi","category":"Yarışma","date":"2026-12-26"}'
```

Sprint 7'deki `event-2` gibi id'ler artık yoktur; id'ler MongoDB'den gelir. Bir `_id` öğrenmek için önce `GET /events` yanıtına bakılır.

## Postman ile deneme

1. `npm run seed`, ardından `npm run dev` ile sunucuyu başlat.
2. Postman'de **Import** → `backend/requests/kampus-api.json` dosyasını seç.
3. **Kampüs API** collection'ındaki 6 isteği sırayla gönder; her isteğin test sekmesi beklenen durum kodunu denetler. 2. istek listeden ilk etkinliğin `_id` değerini saklar, 3. istek onunla çalışır.

| İstek | Beklenen |
| --- | --- |
| 1 Health | 200, `status: ok` ve `student` |
| 2 Etkinlik listesi | 200, seed sonrası 6 kayıt (her kayıtta `_id`, `createdAt`, `updatedAt`) |
| 3 Tek etkinlik | 200, listeden alınan `_id` ile aynı kayıt |
| 4 Olmayan etkinlik (404) | 404, `Event not found` |
| 5 Etkinlik oluştur (201) | 201, yeni `_id` |
| 6 Eksik veri (400) | 400, schema hata mesajı |

## Kalıcılık testi

1. `npm run seed`, sonra `npm run dev`.
2. `POST /events` ile yeni bir etkinlik ekle (201, yanıttaki `_id`'yi not al).
3. Terminalde Ctrl+C ile sunucuyu durdur.
4. Tekrar `npm run dev`.
5. `GET /events` yeni etkinliği de listeler; `GET /events/<_id>` 200 döner. Atlas kullanılıyorsa **Browse Collections → events** altında da görünür.

`npm run seed` önce `deleteMany({})` ile koleksiyonu boşalttığı için kaç kez çalıştırılırsa çalıştırılsın `events` içinde 6 kayıt kalır.

## Sık karşılaşılan hatalar

| Ne oluyor | Çözüm |
| --- | --- |
| `MONGODB_URI tanımlı değil` | `.env` dosyası `backend` klasöründe mi, satır `MONGODB_URI=` ile mi başlıyor? |
| `bad auth : authentication failed` | Şifre yanlış ya da adresteki şifre yer tutucusu (`<` ve `>` işaretleri) yerinde kalmış |
| `Could not connect to any servers` / zaman aşımı | Atlas'ta Network Access `0.0.0.0/0` mı? Okul ağı engelliyorsa telefonun hotspot'u ile dene |
| Veri `test` veritabanına gidiyor | Adresin sonuna `/kampus` ekle |
| `GET /events` yanıtı `{}` | `Event.find()` önünde `await` eksik |
| `/events/yok` → 500 | `mongoose.isValidObjectId` kontrolü eksik |
| Her seed'de kayıt sayısı artıyor | `insertMany`'den önce `deleteMany({})` eksik |
