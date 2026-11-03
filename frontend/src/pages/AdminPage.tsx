import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";
import { formatDate } from "../utils/format-date";

interface AdminLocationState {
  message?: string;
}

function AdminPage() {
  const { events, deleteEvent } = useEvents();
  const location = useLocation();
  const fromForm = (location.state as AdminLocationState | null)?.message ?? "";
  const [deleteMessage, setDeleteMessage] = useState("");
  const message = deleteMessage || fromForm;

  function handleDelete(id: string, title: string) {
    // Silmeden önce onay: İptal'e basılırsa hiçbir şey değişmez
    if (!window.confirm(`"${title}" silinsin mi?`)) return;
    deleteEvent(id);
    setDeleteMessage(`"${title}" silindi.`);
  }

  return (
    <>
      <p>
        <Link className="buton" to="/admin/new">
          + Yeni etkinlik
        </Link>
      </p>

      {message && (
        <p className="mesaj mesaj-basari" role="status">
          {message}
        </p>
      )}

      {events.length === 0 ? (
        <p className="sonuc">Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr>
              <th>Etkinlik</th>
              <th>Tarih</th>
              <th>Kategori</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td data-baslik="Etkinlik">{event.title}</td>
                <td data-baslik="Tarih">{formatDate(event.date)}</td>
                <td data-baslik="Kategori">{event.category}</td>
                <td className="islemler">
                  <Link className="buton" to={`/admin/${event.id}/edit`}>
                    Düzenle
                  </Link>
                  <button
                    type="button"
                    className="buton-sil"
                    onClick={() => handleDelete(event.id, event.title)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default AdminPage;
