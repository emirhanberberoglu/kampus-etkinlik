import type { CampusEvent } from "../types/campus-event";
import type {
  EventFormErrors,
  EventFormValues,
  EventInput,
} from "../types/event-form";

export const emptyEventForm: EventFormValues = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

// Form alanlarının sırası: hata varsa ilk hatalı alana odaklanmak için
export const eventFieldOrder: (keyof EventFormValues)[] = [
  "title",
  "category",
  "date",
  "time",
  "location",
  "capacity",
  "description",
];

export function validateEvent(values: EventFormValues): EventFormErrors {
  const errors: EventFormErrors = {};

  if (values.title.trim().length < 3) {
    errors.title = "Etkinlik adı en az 3 karakter olmalı.";
  }
  if (values.category === "") {
    errors.category = "Bir kategori seçin.";
  }
  if (values.date === "") {
    errors.date = "Tarih seçin.";
  }
  if (values.time === "") {
    errors.time = "Saat seçin.";
  }
  if (values.location.trim() === "") {
    errors.location = "Yer boş olamaz.";
  }

  const capacity = Number(values.capacity);
  if (values.capacity.trim() === "" || !Number.isInteger(capacity) || capacity < 1 || capacity > 1000) {
    errors.capacity = "Kontenjan 1 ile 1000 arasında bir tam sayı olmalı.";
  }
  if (values.description.trim().length < 10) {
    errors.description = "Açıklama en az 10 karakter olmalı.";
  }

  return errors;
}

// Doğrulanmış form değerlerini kayıt tipine çevirir
export function toEventInput(values: EventFormValues): EventInput {
  return {
    title: values.title.trim(),
    category: values.category === "" ? "Seminer" : values.category,
    date: values.date,
    time: values.time,
    location: values.location.trim(),
    capacity: Number(values.capacity),
    description: values.description.trim(),
  };
}

// Güncelleme formunu mevcut etkinlikle doldurmak için
export function toFormValues(event: CampusEvent): EventFormValues {
  return {
    title: event.title,
    category: event.category,
    date: event.date,
    time: event.time,
    location: event.location,
    capacity: String(event.capacity),
    description: event.description,
  };
}
