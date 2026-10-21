import "./App.css";
import { useEffect, useState } from "react";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const pageInfo: Record<Exclude<PageName, "detail">, { title: string; text?: string }> = {
  home: { title: "Kampüs Etkinlikleri", text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." },
  events: { title: "Tüm Etkinlikler", text: "Ekim ayında kampüste düzenlenen etkinlikler." },
  add: { title: "Etkinlik Ekle" },
  update: { title: "Etkinlik Güncelle" },
};

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const title = page === "detail" ? (selected?.title ?? "Etkinlik bulunamadı") : pageInfo[page].title;
  const text = page === "detail" ? undefined : pageInfo[page].text;
  const tabTitle = page === "home" ? "Ana Sayfa" : title;

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${tabTitle}`;
  }, [tabTitle]);

  return (
    <>
      <Header title={title} text={text} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <p className="tumunu-gor">
              <button type="button" onClick={() => go("events")}>Tüm etkinlikleri gör</button>
            </p>
          </section>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && <p className="sonuc">{filtered.length} etkinlik listeleniyor.</p>}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {page === "detail" && !selected && (
          <div className="hata-mesaji" role="alert">
            <h2>Etkinlik bulunamadı</h2>
            <p>Aradığınız etkinliğe ulaşılamıyor veya böyle bir etkinlik mevcut değil.</p>
            <button type="button" onClick={() => go("events")}>← Listeye dön</button>
          </div>
        )}

        {(page === "add" || page === "update") && (
          <EventForm key={page} onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
