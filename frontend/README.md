Canlı adres: https://emirhanberberoglu-frontend.vercel.app/

# Kampüs Etkinlikleri (Vize Teslimi · React Router + Context)

Web Teknolojileri ve Programlama dersi proje çalışması. Öğrenci: **Emirhan Berberoğlu — 2416501013**.

Sprint 5'teki bileşen yapısının üstüne **React Router** (10 route), **Context API** (etkinlikleri tüm sayfalarda ortak tutar), **ekle / güncelle / sil** (silmeden önce onay), **form doğrulama** ve **giriş / kayıt / şifremi unuttum** sayfaları eklendi.

## Canlı yayın

- Vercel: <https://emirhanberberoglu-frontend.vercel.app/>
- GitHub: bu depo (`frontend/` klasörü)

## Çalıştırma

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc -b && vite build
npm run lint      # oxlint
npm run preview   # build çıktısını aç
```

## Sayfalar ve route'lar (10 adet)

| # | Adres | Sayfa | Açıklama |
| --- | --- | --- | --- |
| 1 | `/` | `HomePage` | En yakın tarihli 2 etkinlik |
| 2 | `/events` | `EventsPage` | Tüm etkinlikler, arama ve kategori filtresi |
| 3 | `/events/:id` | `EventDetailPage` | Etkinlik detayı (`useParams`) |
| 4 | `/admin` | `AdminPage` | Yönetim tablosu: Düzenle / Sil (onaylı) |
| 5 | `/admin/new` | `EventNewPage` | Etkinlik ekleme formu |
| 6 | `/admin/:id/edit` | `EventEditPage` | Etkinlik güncelleme formu (dolu açılır) |
| 7 | `/login` | `LoginPage` | Giriş formu (doğrulama) |
| 8 | `/register` | `RegisterPage` | Kayıt formu (doğrulama) |
| 9 | `/forgot-password` | `ForgotPasswordPage` | Şifremi unuttum formu (doğrulama) |
| 10 | `*` | `NotFoundPage` | Tanımsız adres ve olmayan etkinlik |

`vercel.json` içindeki rewrite sayesinde bu adresler Vercel'de sayfa yenilenince de açılır.

## Context nasıl çalışır?

- `src/context/events-context.ts` → `EventsContext` (liste + `addEvent`, `updateEvent`, `deleteEvent`).
- `src/context/events-reducer.ts` → `useReducer` ile çalışan saf `eventsReducer` (add / update / delete).
- `src/context/EventsProvider.tsx` → durumu tutar, `main.tsx` içinde tüm uygulamayı sarar.
- `src/hooks/useEvents.ts` → sayfalar ve başlık bu hook ile Context'e bağlanır.

Yönetim sayfasında yapılan her değişiklik Ana Sayfa, Etkinlikler, Detay ve başlık alanında hemen görünür. Veriler bellekte tutulur; sayfa yenilenirse başlangıç listesine dönülür (sunucu bağlantısı sonraki sprintlerde).

## Form doğrulama

| Form | Kurallar |
| --- | --- |
| Etkinlik (ekle/güncelle) | Ad en az 3 karakter · kategori, tarih, saat seçili · yer boş değil · kontenjan 1–1000 tam sayı · açıklama en az 10 karakter |
| Giriş | Geçerli e-posta · şifre en az 6 karakter |
| Kayıt | Ad soyad en az 3 karakter · geçerli e-posta · şifre en az 6 karakter · şifre tekrarı aynı |
| Şifremi unuttum | Geçerli e-posta |

Hata metni ilgili alanın altında çıkar, ilk hatalı alana odaklanılır, yazmaya başlayınca o alanın hatası silinir.

## Klasör yapısı

```
src/
  components/
    layout/   Header.tsx  Navigation.tsx  Footer.tsx  ScrollToTop.tsx
    events/   EventCard.tsx  EventList.tsx  EventFilter.tsx  EventDetail.tsx
    forms/    EventForm.tsx  TextField.tsx  FieldError.tsx
  context/    events-context.ts  events-reducer.ts  EventsProvider.tsx
  hooks/      useEvents.ts  usePageInfo.ts
  pages/      HomePage  EventsPage  EventDetailPage  AdminPage  EventNewPage
              EventEditPage  LoginPage  RegisterPage  ForgotPasswordPage  NotFoundPage
  data/       events.ts  categories.ts
  types/      campus-event.ts  event-form.ts
  utils/      filter-events.ts  format-date.ts  validate-event.ts  validate-auth.ts
  App.tsx  App.css  index.css  main.tsx
public/       afis.svg  images.jpg  favicon.svg
vercel.json   SPA yönlendirmesi
```

## Mobil görünüm

Mobil öncelikli CSS kullanıldı: kartlar telefonda tek sütun, masaüstünde 3 sütun; yönetim tablosu telefonda satır başına bir karta dönüşür; menü sığmazsa alt satıra iner; yatay kaydırma oluşmaz.

## Kullanılan teknolojiler

Vite · React 19 · TypeScript · react-router-dom · oxlint · Vercel
