import type { Category } from "./campus-event";

// Form alanları ekranda hep metin olarak tutulur (kontenjan dahil)
export interface EventFormValues {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

export type EventFormErrors = Partial<Record<keyof EventFormValues, string>>;

// Kayda hazır hali: id ve afiş Context tarafından eklenir
export interface EventInput {
  title: string;
  category: Category;
  date: string;
  time: string;
  location: string;
  capacity: number;
  description: string;
}
