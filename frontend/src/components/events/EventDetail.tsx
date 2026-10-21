import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article>
      <div className={event.image ? "detay-izgara" : "detay-izgara afissiz"}>
        {event.image && (
          <figure>
            <img src={event.image} alt={`${event.title} afişi`} />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}
        <dl>
          <dt>Tarih</dt>
          <dd>
            {formatDate(event.date)}, {event.time}
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </div>

      <section className="detay-aciklama">
        <h2>Açıklama</h2>
        <p>{event.description}</p>
        <div className="detay-butonlar">
          <button type="button" onClick={onBack}>
            ← Listeye dön
          </button>
          <button type="button" onClick={() => onEdit(event.id)}>
            Bu etkinliği güncelle
          </button>
        </div>
      </section>
    </article>
  );
}

export default EventDetail;
