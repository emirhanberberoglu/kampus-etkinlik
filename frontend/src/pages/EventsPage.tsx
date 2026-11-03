import { useState } from "react";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { useEvents } from "../hooks/useEvents";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Kategori listesi güncel etkinliklerden çıkar; son etkinliği silinen kategori seçili kalmasın
  const categories = [...new Set(events.map((e) => e.category))];
  const activeCategory = category !== "" && categories.includes(category) ? category : "";
  const filtered = filterByCategory(searchEvents(events, searchText), activeCategory);

  return (
    <>
      <EventFilter
        searchText={searchText}
        category={activeCategory}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />
      {filtered.length > 0 && <p className="sonuc">{filtered.length} etkinlik listeleniyor.</p>}
      <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
    </>
  );
}

export default EventsPage;
