import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { categories } from "../../data/categories";
import type { EventFormErrors, EventFormValues } from "../../types/event-form";
import { eventFieldOrder, validateEvent } from "../../utils/validate-event";
import FieldError from "./FieldError";
import TextField from "./TextField";

interface EventFormProps {
  initialValues: EventFormValues;
  submitText: string;
  onSubmit: (values: EventFormValues) => void;
}

// Ekle ve Güncelle sayfalarının ortak formu: kontrollü alanlar + doğrulama
function EventForm({ initialValues, submitText, onSubmit }: EventFormProps) {
  const [values, setValues] = useState<EventFormValues>(initialValues);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    // Kullanıcı düzeltmeye başlayınca o alanın hatası kaybolur
    if (errors[name as keyof EventFormValues]) {
      setErrors({ ...errors, [name]: undefined });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(values);
    setErrors(found);

    const firstInvalid = eventFieldOrder.find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    onSubmit(values);
  }

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <TextField
        id="title"
        label="Etkinlik Adı"
        value={values.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="Örn. Kariyer Günleri 2026"
      />

      <div className="alan">
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          name="category"
          value={values.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
          aria-describedby={errors.category ? "category-hata" : undefined}
        >
          <option value="">Seçiniz</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <FieldError id="category" message={errors.category} />
      </div>

      <TextField id="date" label="Tarih" type="date" value={values.date} onChange={handleChange} error={errors.date} />
      <TextField id="time" label="Saat" type="time" value={values.time} onChange={handleChange} error={errors.time} />
      <TextField
        id="location"
        label="Yer"
        value={values.location}
        onChange={handleChange}
        error={errors.location}
        placeholder="Örn. A Blok Konferans Salonu"
      />
      <TextField
        id="capacity"
        label="Kontenjan"
        type="number"
        value={values.capacity}
        onChange={handleChange}
        error={errors.capacity}
      />

      <div className="alan">
        <label htmlFor="description">Açıklama</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={values.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
          aria-describedby={errors.description ? "description-hata" : undefined}
        />
        <FieldError id="description" message={errors.description} />
      </div>

      <button type="submit">{submitText}</button>
    </form>
  );
}

export default EventForm;
