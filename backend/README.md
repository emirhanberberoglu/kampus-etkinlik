# Kampüs Etkinlikleri · Backend (Sprint 7-9 · Express + MongoDB)

Web Teknolojileri ve Programlama dersi proje çalışması. Öğrenci: **Emirhan Berberoğlu — 2416501013**.

`frontend/` klasöründeki React uygulamasının ileride bağlanacağı REST API. Sprint 7'de etkinlikler bellekteki bir dizide tutuluyordu. Sprint 8'de veri MongoDB'ye taşındı: controller'lar `Event` modeli üzerinden veritabanına yazıp okuyor, sunucu kapanıp açılınca kayıtlar duruyor. **Sprint 9'da API tam CRUD oldu:** `PATCH` ve `DELETE` çalışıyor, `/events` arama ve kategori filtresi alıyor, `GET /events/upcoming` yaklaşan etkinlikleri ayrı listeliyor ve tarih her yerde `GG-AA-YYYY` biçiminde.

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
    models/event-model.js          Event şeması ve modeli (doğrulama kuralları ve tarih dönüşümü burada)
    utils/date.js                  "GG-AA-YYYY" ↔ Date dönüşümü (parseDate, formatDate, todayStart)
    data/seed-events.js            seed ile eklenen 6 örnek etkinlik (2'si geçmiş tarihli)
    seed.js                        npm run seed betiği
    app.js                         Express uygulaması: cors, JSON, /health, route'lar, 404 ve hata yakalayıcı
    server.js                      .env'i okur, veritabanına bağlanır, PORT'tan dinlemeye başlar
    routes/event-routes.js         /events adresleri → controller fonksiyonları (sıra önemli: /upcoming, /:id'den önce)
    controllers/event-controller.js  listele, yaklaşan, tek getir, oluştur, güncelle, sil
  requests/kampus-api.json         Postman collection (18 istek, 45 test)
  requests/run-results.json        Postman Collection Runner çıktısı (Export Results)
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
| `date` | Date | zorunlu. API'de `"GG-AA-YYYY"` metni (örnek: `"15-10-2026"`), veritabanında gerçek `Date` |
| `time` | String | verilmezse boş |
| `location` | String | `trim`, verilmezse boş |
| `description` | String | `trim`, en fazla 500 karakter, verilmezse boş |
| `_id` | ObjectId | MongoDB verir (örnek: `6af57a006f13ad018f7b7a55`) |
| `createdAt`, `updatedAt` | Date | `timestamps` seçeneği ile Mongoose kendisi yazar |

Doğrulama kuralları schema'da durur. Kurala uymayan kayıt `Event validation failed: ...` hatasıyla reddedilir ve API bunu `400` olarak döndürür. Güncellemede (`PATCH`) aynı kurallar `runValidators: true` ile çalışır.

### Tarih biçimi: `GG-AA-YYYY`

Tarih istekte de yanıtta da `"GG-AA-YYYY"` biçimindedir: `"15-10-2026"`. `"2026-12-20"` gibi başka biçim ya da `"31-02-2026"` gibi gerçek olmayan tarih `400` döner.

Veritabanında ise metin değil gerçek `Date` olarak saklanır, çünkü metin olarak `"05-11-2026"`, `"15-10-2026"`dan **önce** sıralanırdı (Kasım Ekim'den önce). `Date` olarak `sort` ve `$gte` tarihleri doğru karşılaştırır. Dönüşüm `utils/date.js` içindedir; modelde `set: parseDate` (gelen metni Date yapar) ve `get: formatDate` (giden Date'i metin yapar), şemada `toJSON: { getters: true }` ve `id: false` kullanılır.

## REST sözleşmesi

| Metot | Adres | Açıklama | Başarılı | Hata |
| --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı; `status`, `time`, `student` döner | `200` | — |
| GET | `/events` | Tüm etkinlikler (tarihe göre sıralı). İsteğe bağlı `?search=` ve `?category=` | `200` | — |
| GET | `/events/upcoming` | Bugün ve sonrasındaki etkinlikler, tarihe göre sıralı (en yakın önce) | `200` | — |
| GET | `/events/:id` | Tek etkinlik; `:id` MongoDB `_id` değeridir | `200` | `404` |
| POST | `/events` | Yeni etkinlik oluşturur (JSON gövde) | `201` | `400` |
| PATCH | `/events/:id` | Yalnızca gönderilen alanları değiştirir, güncel kaydı döner | `200` | `400`, `404` |
| DELETE | `/events/:id` | Etkinliği siler, yanıt gövdesi yoktur | `204` | `404` |

Tanımsız her adres `404` ve `Route not found` döner. Geçersiz ya da olmayan id her yerde `404 Event not found` olur.

`POST /events` için `title`, `category` ve `date` zorunludur. Gövdedeki `_id`, `createdAt` gibi bilinmeyen alanlar yok sayılır; bunları sunucu üretir.

### Arama ve filtre (`GET /events`)

| Adres | Anlamı |
| --- | --- |
| `/events` | hepsi |
| `/events?category=Atölye` | yalnızca bu kategori |
| `/events?search=atölye` | başlığında "atölye" geçenler; büyük/küçük harf fark etmez |
| `/events?search=atölye&category=Atölye` | ikisi birlikte |

Arama başlıkta MongoDB `$regex` (`$options: "i"`) ile yapılır. Aranan metindeki `( * ? .` gibi regex işaretleri sorguya girmeden önce kaçırılır; bu yüzden `?search=(` sunucu hatası vermez, sonuç listesi boş döner. Türkçe karakterli arama (`atölye`) Postman'de ve tarayıcıda adres otomatik kodlandığı için çalışır; terminalde `curl -G ... --data-urlencode "search=atölye"` kullanılır.

### `GET /events/upcoming`

Tarihi bugün (UTC 00:00) ya da sonrası olan etkinlikleri `{ date: { $gte: todayStart() } }` ile süzer ve `date`, sonra `time` alanına göre artan sıralar. Seed'deki 2 geçmiş tarihli etkinlik bu listede yoktur: `/events` 6, `/events/upcoming` 4 kayıt verir. Route, `/:id`'den önce tanımlıdır; sıra tersine olsaydı `upcoming` bir `_id` sanılır ve `404` dönerdi.

### `PATCH /events/:id`

Gövdede yalnızca değişecek alanlar gönderilir; diğerleri olduğu gibi kalır.

| PATCH gövdesi | Sonuç | Neden |
| --- | --- | --- |
| `{ "capacity": 55 }` | `200` | yalnızca `capacity` değişti |
| `{ "title": " Yeni Başlık " }` | `200` | `trim` çalışır: `"Yeni Başlık"` |
| `{ "date": "28-12-2026" }` | `200` | tarih `GG-AA-YYYY` ile güncellenir |
| `{ }` | `400` | `Body is empty` |
| `{ "category": "Parti" }` | `400` | `enum` kuralı (`runValidators: true`) |
| `{ "capacity": -5 }` | `400` | `min: 0` kuralı |
| `{ "date": "2026-12-20" }` | `400` | `GG-AA-YYYY` biçimi değil (`Cast to date failed`) |
| `{ "_id": "abc" }` | `400` | `_id cannot be changed` (`createdAt`, `updatedAt`, `__v` da korunur) |
| `/events/yok` ya da silinmiş id | `404` | `Event not found` |

İki seçenek unutulursa PATCH sessizce yanlış çalışır: `returnDocument: "after"` yoksa kayıt güncellenir ama yanıtta eski hali döner, `runValidators: true` yoksa schema kuralları güncellemede işlemez. İkisi de `findByIdAndUpdate` içinde açıktır. Yalnızca `title`, `category`, `capacity`, `date`, `time`, `location`, `description` alanları güncellenebilir; bilinmeyen alanlar ve `$set` gibi MongoDB işleçleri yok sayılır.

### `DELETE /events/:id`

Başarılı silme `204 No Content` döner ve yanıtın gövdesi yoktur (`res.status(204).end()`). Aynı id'yi bir daha silmek, olmayan ya da geçersiz bir id'yi silmek `404 Event not found` döner. Silinen kayıt `GET /events` listesinden de çıkar.

### Hata biçimi

Tüm hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

| Durum | Kod | `error.message` |
| --- | --- | --- |
| Olmayan, silinmiş ya da geçersiz etkinlik id'si (GET, PATCH, DELETE) | 404 | `Event not found` |
| Tanımsız adres | 404 | `Route not found` |
| Schema kuralına uymayan gövde (POST) | 400 | `Event validation failed: ...` (hangi alanın neden reddedildiği yazar) |
| Schema kuralına uymayan gövde (PATCH) | 400 | `Validation failed: ...` ya da `Cast to date failed ...` |
| Boş PATCH gövdesi | 400 | `Body is empty` |
| Korunan alanı değiştirme | 400 | `_id cannot be changed` |
| Bozuk JSON gövdesi | 400 | `Invalid JSON body` |
| `?search=` ya da `?category=` birden fazla kez verilmiş | 400 | `category and search must be single text values` |
| Beklenmeyen sunucu hatası | 500 | `Server error` (ayrıntı yalnızca terminalde görünür) |

Controller'lardaki `try/catch`, beklenmeyen hataları `next(err)` ile `app.js` sonundaki hata yakalayıcıya gönderir; bu yüzden hatalı bir istek sunucuyu çökertmez.

## Örnek istekler

```bash
curl http://localhost:3000/health
curl http://localhost:3000/events
curl -G http://localhost:3000/events --data-urlencode "search=atölye" --data-urlencode "category=Atölye"
curl http://localhost:3000/events/upcoming
curl http://localhost:3000/events/<listeden-kopyaladığın-_id>
curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{"title":"Kampüs Kodlama Gecesi","category":"Yarışma","date":"26-12-2026"}'
curl -X PATCH http://localhost:3000/events/<_id> \
  -H "Content-Type: application/json" \
  -d '{"capacity":55}'
curl -i -X DELETE http://localhost:3000/events/<_id>
```

Id'ler MongoDB'den gelir; bir `_id` öğrenmek için önce `GET /events` yanıtına bakılır.

## Postman ile deneme

`backend/requests/kampus-api.json` 18 istek ve 45 test içerir. Test sekmeleri durum kodlarını ve yanıt içeriğini denetler.

1. `npm run seed`, ardından `npm run dev` ile sunucuyu başlat.
2. Postman'de **Import** → `backend/requests/kampus-api.json` dosyasını seç.
3. Collection'a sağ tık → **Run collection** → **Run**. Beklenen: **18 istek, 45 test, 0 hata**.
4. Runner ekranında **Export Results** ile sonucu `backend/requests/run-results.json` olarak kaydet.

2. istek listedeki ilk etkinliğin `_id` değerini (`eventId`), 5. istek yeni oluşan kaydın `_id` değerini (`newEventId`) saklar. PATCH ve DELETE istekleri o yeni kayıtla çalışır, son isteklerde de kayıt silinir; bu yüzden seed verisi bozulmaz ve collection istenildiği kadar tekrar çalıştırılabilir.

| İstek | Beklenen |
| --- | --- |
| 01 Health | 200, `status: ok` ve `student` |
| 02 Etkinlik listesi | 200, seed sonrası 6 kayıt, `date` her kayıtta `GG-AA-YYYY` |
| 03 Tek etkinlik | 200, listeden alınan `_id` ile aynı kayıt |
| 04 Olmayan etkinlik (404) | 404, `Event not found` |
| 05 Etkinlik oluştur (201) | 201, yeni `_id`, `date` `26-12-2026` |
| 06 Eksik veri (400) | 400, schema hata mesajı |
| 07 Yanlış tarih biçimi (400) | 400, hata `date` alanından |
| 08 Güncelle (200) | 200, yalnızca `capacity` değişti |
| 09 Tarih güncelle (200) | 200, yeni `date` |
| 10 Boş body (400) | 400, `Body is empty` |
| 11 Geçersiz kategori (400) | 400, `category` enum hatası |
| 12 _id değiştirme (400) | 400, `_id cannot be changed` |
| 13 Olmayan id güncelle (404) | 404, `Event not found` |
| 14 Arama | 200, her başlıkta aranan kelime var |
| 15 Arama + kategori | 200, hepsi hem kategoriye hem aramaya uyuyor |
| 16 Yaklaşan etkinlikler | 200, geçmiş tarih yok, artan sıralı |
| 17 Sil (204) | 204, gövde boş |
| 18 Tekrar sil (404) | 404, `Event not found` |

Aynı collection terminalde de çalışır (backend açıkken, repo kökünde):

```bash
npm i -g newman
newman run backend/requests/kampus-api.json
```

Dersteki hazır koleksiyonla kontrol: `newman run https://webdersi.vercel.app/test.json`.

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
| `/events/upcoming` → 404 `Event not found` | `/upcoming` route'unu `/:id`'den önce yaz |
| PATCH sonrası yanıtta eski değer | `findByIdAndUpdate` seçeneklerine `returnDocument: "after"` ekle |
| PATCH ile `category: "Parti"` kabul edildi | `runValidators: true` ekle |
| PATCH / DELETE → `Cannot PATCH /events/...` | `router.patch` / `router.delete` satırı eksik |
| DELETE → 200 ve gövde dolu | `res.status(204).end()` kullan; 204'ün gövdesi olmaz |
| `?search=(` → 500 | Aramayı regex'e koymadan önce özel işaretleri kaçır |
| `/events/upcoming` tüm kayıtları veriyor | Seed'de geçmiş tarihli etkinlik yok ya da `$gte` yerine `$lte` yazılmış |
| POST'ta tarih `400 Cast to date failed` | `"26-12-2026"` gönder; `"2026-12-26"` kabul edilmez |
| PATCH'te yanlış tarih → 500 | `catch` içinde `CastError` da `400`'e çevrilmeli |
| Yanıtta `date` `"2026-12-01T00:00:00.000Z"` görünüyor | Schema'ya `toJSON: { getters: true }` ekle |
| Türkçe arama (`atölye`) sonuç vermiyor | Postman ve tarayıcı adresi kendisi kodlar; terminalde `--data-urlencode` kullan |
