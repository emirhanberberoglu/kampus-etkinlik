import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { findEventById } from "../utils/filter-events";
import { useEvents } from "./useEvents";

const appName = "Kampüs Etkinlikleri";

const staticPages: { path: string; title: string; text?: string }[] = [
  { path: "/", title: appName, text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." },
  { path: "/events", title: "Tüm Etkinlikler", text: "Kampüste düzenlenen seminer, atölye, söyleşi ve yarışmalar." },
  { path: "/admin", title: "Etkinlik Yönetimi", text: "Etkinlikleri ekleyin, güncelleyin veya silin." },
  { path: "/admin/new", title: "Etkinlik Ekle" },
  { path: "/login", title: "Giriş Yap" },
  { path: "/register", title: "Kayıt Ol" },
  { path: "/forgot-password", title: "Şifremi Unuttum" },
];

// Adres çubuğundaki yola göre başlık bilgisini üretir ve sekme adını günceller
export function usePageInfo() {
  const { pathname } = useLocation();
  const { events } = useEvents();

  const eventMatch =
    matchPath("/events/:id", pathname) ?? matchPath("/admin/:id/edit", pathname);
  const event = eventMatch ? findEventById(events, eventMatch.params.id ?? "") : undefined;
  const page = staticPages.find((p) => matchPath(p.path, pathname));

  const title = event ? event.title : (page?.title ?? "Sayfa Bulunamadı");
  const text = event ? `${event.category} · ${event.location}` : page?.text;

  useEffect(() => {
    document.title = title === appName ? appName : `${title} — ${appName}`;
  }, [title]);

  return { title, text };
}
