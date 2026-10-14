// src/utils/filter-events.ts

import type { CampusEvent, Category } from "../types/campus-event";

// 1. Arama Fonksiyonu
export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  return list.filter((e) => 
    e.title.toLocaleLowerCase("tr-TR").includes(q) || 
    e.description.toLocaleLowerCase("tr-TR").includes(q)
  );
}

// 2. Kategori Filtreleme Fonksiyonu
export function filterByCategory(list: CampusEvent[], category: Category | ""): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

// 3. ID'ye Göre Etkinlik Bulma Fonksiyonu
export function findEventById(list: CampusEvent[], id: string): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}