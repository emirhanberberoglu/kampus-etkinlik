import { createContext } from "react";
import type { CampusEvent } from "../types/campus-event";
import type { EventInput } from "../types/event-form";

export interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (input: EventInput) => void;
  updateEvent: (id: string, input: EventInput) => void;
  deleteEvent: (id: string) => void;
}

// Provider dışında kullanılırsa null kalır; useEvents bunu hataya çevirir
export const EventsContext = createContext<EventsContextValue | null>(null);
