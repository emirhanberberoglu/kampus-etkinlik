// src/App.tsx

import { useState, useEffect } from "react";
import "./App.css";

import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import type { Category } from "./types/campus-event";

type PageName = "home" | "events" | "detail" | "add" | "update";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  useEffect(() => {
    let title = "Kampüs Etkinlikleri";
    if (page === "home") title = "Ana Sayfa - Kampüs Etkinlikleri";
    else if (page === "events") title = "Etkinlikler - Kampüs Etkinlikleri";
    else if (page === "detail") title = "Etkinlik Detayı - Kampüs Etkinlikleri";
    else if (page === "add") title = "Etkinlik Ekle - Kampüs Etkinlikleri";
    else if (page === "update") title = "Etkinlik Güncelle - Kampüs Etkinlikleri";
    
    document.title = title;
  }, [page]);

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const upcomingEvents = events.slice(0, 2);

  const filteredEvents = searchEvents(
    filterByCategory(events, selectedCategory),
    searchText
  );

  const selectedEvent = selectedId ? findEventById(events, selectedId) : null;

  function formatTarih(tarihStr: string) {
    const aylar = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    const parcalar = tarihStr.split("-");
    if (parcalar.length !== 3) return tarihStr;
    const yil = parcalar[0];
    const ay = aylar[parseInt(parcalar[1], 10) - 1];
    const gun = parseInt(parcalar[2], 10);
    return `${gun} ${ay} ${yil}`;
  }

  return (
    <>
      <header className="site-baslik">
        <h1>Kampüs Etkinlikleri</h1>
      </header>
      
      <nav className="menu">
        <a 
          href="#" 
          aria-current={page === "home" ? "page" : undefined} 
          onClick={(e) => { e.preventDefault(); go("home"); }}
        >
          Ana Sayfa
        </a>
        <a 
          href="#" 
          aria-current={page === "events" ? "page" : undefined} 
          onClick={(e) => { e.preventDefault(); go("events"); }}
        >
          Etkinlikler
        </a>
        <a 
          href="#" 
          aria-current={(page === "add" || page === "update") ? "page" : undefined} 
          onClick={(e) => { e.preventDefault(); go("add"); }}
        >
          Ekle
        </a>
      </nav>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan Etkinlikler</h2>
            <p>Fakültedeki seminer ve atölyeleri kaçırmayın.</p>
            
            <div className="etkinlik-listesi">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="etkinlik-kart">
                  <h3>{event.title}</h3>
                  <p className="kategori">{event.category}</p>
                  <p>Tarih: {formatTarih(event.date)}, {event.time}</p>
                  <p>Yer: {event.location}</p>
                  <button onClick={() => go("detail", event.id)}>
                    Detayları Gör
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {page === "events" && (
          <section>
            <h2>Tüm Etkinlikler</h2>
            
            <div className="filtre-alani">
              <input 
                type="text" 
                placeholder="Etkinlik ara..." 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value as Category | "")}
              >
                <option value="">Tüm Kategoriler</option>
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>
            </div>

            {/* SADECE DİNAMİK LİSTELENME SAYISI BURAYA EKLENDİ (Senin renklerine uygun) */}
            <p style={{ fontWeight: "bold", margin: "1rem 0" }}>
              {filteredEvents.length} etkinlik listeleniyor.
            </p>

            <div className="etkinlik-listesi">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div key={event.id} className="etkinlik-kart">
                    <h3>{event.title}</h3>
                    <p className="kategori">{event.category}</p>
                    <p>Tarih: {formatTarih(event.date)}, {event.time}</p>
                    <p>Yer: {event.location}</p>
                    <button onClick={() => go("detail", event.id)}>
                      Detayları Gör
                    </button>
                  </div>
                ))
              ) : (
                <p>Aradığınız kritere uygun etkinlik bulunamadı.</p>
              )}
            </div>
          </section>
        )}

        {page === "detail" && (
          <section>
            {selectedEvent ? (
              <div className="etkinlik-detay">
                <h2>{selectedEvent.title}</h2>
                <div className="etkinlik-kart" style={{ marginTop: "1rem", padding: "2rem" }}>
                  <div className="detay-icerik" style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
                    {selectedEvent.image && (
                      <img 
                        src={selectedEvent.image} 
                        alt={selectedEvent.title} 
                        className="detay-afis"
                        style={{ width: "100%", maxWidth: "300px", borderRadius: "8px", objectFit: "cover" }}
                      />
                    )}
                    <div className="detay-kunye" style={{ display: "flex", flexDirection: "column", gap: "0.8rem", flex: 1, minWidth: "250px" }}>
                      <p className="kategori" style={{ fontWeight: "bold", color: "#8e44ad", fontSize: "1.2rem", margin: 0 }}>{selectedEvent.category}</p>
                      <p style={{ margin: 0 }}><strong>Tarih:</strong> {formatTarih(selectedEvent.date)}, {selectedEvent.time}</p>
                      <p style={{ margin: 0 }}><strong>Yer:</strong> {selectedEvent.location}</p>
                      <p style={{ margin: 0 }}><strong>Kontenjan:</strong> {selectedEvent.capacity} kişi</p>
                      <div className="detay-aciklama" style={{ marginTop: "0.5rem", lineHeight: "1.6" }}>
                        <p style={{ margin: 0 }}>{selectedEvent.description}</p>
                      </div>
                      <button 
                        onClick={() => go("update", selectedEvent.id)} 
                        className="ikincil-buton"
                        style={{ marginTop: "1rem", alignSelf: "flex-start" }}
                      >
                        Etkinliği Güncelle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>Etkinlik bulunamadı veya silinmiş.</p>
            )}
          </section>
        )}

        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Yeni Etkinlik Ekle" : "Etkinliği Güncelle"}</h2>
            <div className="etkinlik-kart" style={{ maxWidth: "600px", marginTop: "1rem", padding: "2rem" }}>
                <form className="etkinlik-formu" onSubmit={(e) => { e.preventDefault(); alert("Bu özellik bir sonraki sprintte çalışacak usta!"); }} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div className="form-grup" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="title" style={{ fontWeight: "bold" }}>Etkinlik Adı</label>
                    <input type="text" id="title" placeholder="Örn: Kariyer Günleri" style={{ padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc" }} required />
                </div>
                <div className="form-grup" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="category" style={{ fontWeight: "bold" }}>Kategori</label>
                    <select id="category" style={{ padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc" }}>
                    <option value="Seminer">Seminer</option>
                    <option value="Atölye">Atölye</option>
                    <option value="Söyleşi">Söyleşi</option>
                    <option value="Yarışma">Yarışma</option>
                    </select>
                </div>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <div className="form-grup" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: "1 1 200px" }}>
                    <label htmlFor="date" style={{ fontWeight: "bold" }}>Tarih</label>
                    <input type="date" id="date" style={{ padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc" }} required />
                    </div>
                    <div className="form-grup" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: "1 1 200px" }}>
                    <label htmlFor="time" style={{ fontWeight: "bold" }}>Saat</label>
                    <input type="time" id="time" style={{ padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc" }} required />
                    </div>
                </div>
                <div className="form-grup" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="location" style={{ fontWeight: "bold" }}>Konum</label>
                    <input type="text" id="location" placeholder="Örn: A Blok Konferans Salonu" style={{ padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc" }} required />
                </div>
                <div className="form-grup" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="description" style={{ fontWeight: "bold" }}>Açıklama</label>
                    <textarea id="description" rows={4} placeholder="Etkinlik detaylarını yazın..." style={{ padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc", resize: "vertical" }} required></textarea>
                </div>
                <button type="submit" className="birincil-buton" style={{ padding: "0.8rem", backgroundColor: "#8e44ad", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", marginTop: "0.5rem", fontSize: "1rem" }}>
                    {page === "add" ? "Etkinliği Kaydet" : "Değişiklikleri Kaydet"}
                </button>
                </form>
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>Emirhan Berberoğlu - 2416501013 - 2026</p>
      </footer>
    </>
  );
}

export default App;