import type { Category } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: () => void;
}

const formCategories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p className="form-not">
        Bu sprintte form sadece görünüm; kayıt yapılmaz.
      </p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label htmlFor="title">Etkinlik Adı</label>
          <input
            id="title"
            name="title"
            type="text"
            maxLength={80}
            placeholder="Örn. Kariyer Günleri 2026"
          />
        </div>
        <div>
          <label htmlFor="category">Kategori</label>
          <select id="category" name="category" defaultValue="">
            <option value="">Seçiniz</option>
            {formCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date">Tarih</label>
          <input id="date" name="date" type="date" />
        </div>
        <div>
          <label htmlFor="time">Saat</label>
          <input id="time" name="time" type="time" />
        </div>
        <div>
          <label htmlFor="location">Yer</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Örn. A Blok Konferans Salonu"
          />
        </div>
        <div>
          <label htmlFor="capacity">Kontenjan</label>
          <input id="capacity" name="capacity" type="number" min={1} />
        </div>
        <div>
          <label htmlFor="description">Açıklama</label>
          <textarea id="description" name="description" rows={5} />
        </div>
        <button type="submit">Kaydet</button>
      </form>
    </>
  );
}

export default EventForm;
