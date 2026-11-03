import type { CampusEvent } from "../types/campus-event";
import type { EventInput } from "../types/event-form";

export type EventsAction =
  | { type: "add"; id: string; input: EventInput }
  | { type: "update"; id: string; input: EventInput }
  | { type: "delete"; id: string };

// Saf fonksiyon: aynı state + aynı action her zaman aynı sonucu verir
export function eventsReducer(state: CampusEvent[], action: EventsAction): CampusEvent[] {
  switch (action.type) {
    case "add":
      return [...state, { id: action.id, ...action.input }];
    case "update":
      // Afiş formda düzenlenmediği için mevcut kayıttaki afiş korunur
      return state.map((e) =>
        e.id === action.id ? { ...action.input, id: e.id, image: e.image } : e,
      );
    case "delete":
      return state.filter((e) => e.id !== action.id);
    default:
      return state;
  }
}
