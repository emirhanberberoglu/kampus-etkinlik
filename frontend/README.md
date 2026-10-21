Canlı adres: https://kampus-etkinlik-6ree.vercel.app/

# Kampüs Etkinlikleri (Sprint 5 · React Bileşenleri)

Sprint 4'teki tek parça `App.tsx` 8 bileşene bölündü. Her bileşen kendi dosyasında, veriyi `props` ile alır ve olayları `callback` ile `App`'e bildirir. Durum (`page`, `selectedId`, `searchText`, `category`) `App`'te kalır (lifting state). Ekran Sprint 4 ile aynıdır; değişen kodun içidir.

## Çalıştırma

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc -b && vite build
npm run preview   # build çıktısını aç
```

## Bileşen ağacı

| Bileşen | Props | Görevi |
| --- | --- | --- |
| `App` | (state burada) | Durumu tutar, sayfayı seçer, bileşenleri birleştirir. |
| `Header` | `title`, `text?` | Sayfa başlığı ve isteğe bağlı alt yazı. |
| `Navigation` | `current`, `onNavigate` | Menü; aktif linki işaretler, tıklamayı yukarı bildirir. |
| `Footer` | (yok) | Alt bilgi. |
| `EventList` | `events`, `onShowDetail`, `emptyText?` | Diziyi `EventCard`'lara çevirir; boşsa mesaj gösterir. |
| `EventCard` | `event`, `onShowDetail` | Tek etkinlik kartı. |
| `EventFilter` | `searchText`, `category`, `categories`, `onSearchChange`, `onCategoryChange` | Arama kutusu ve kategori seçimi. |
| `EventDetail` | `event`, `onBack`, `onEdit` | Afiş, künye ve açıklama. |
| `EventForm` | `onSubmit` | Ekle ve Güncelle için ortak form (sadece görünüm). |

## Klasör yapısı

```
src/
  components/
    layout/   Header.tsx  Navigation.tsx  Footer.tsx
    events/   EventCard.tsx  EventList.tsx  EventFilter.tsx  EventDetail.tsx
    forms/    EventForm.tsx
  data/events.ts              6 etkinlik kaydı
  types/campus-event.ts       CampusEvent ve Category tipleri
  types/page.ts               PageName tipi
  utils/filter-events.ts      arama, kategori filtresi, id ile bulma
  utils/format-date.ts        "2026-10-12" → "12 Ekim 2026"
  App.css  App.tsx  index.css  main.tsx
```
