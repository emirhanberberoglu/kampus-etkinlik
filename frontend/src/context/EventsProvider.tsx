import { useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import { EventsContext } from "./events-context";
import type { EventsContextValue } from "./events-context";
import { eventsReducer } from "./events-reducer";

interface EventsProviderProps {
  children: ReactNode;
}

function EventsProvider({ children }: EventsProviderProps) {
  const [events, dispatch] = useReducer(eventsReducer, initialEvents);

  const value = useMemo<EventsContextValue>(
    () => ({
      events,
      addEvent: (input) => dispatch({ type: "add", id: `event-${Date.now()}`, input }),
      updateEvent: (id, input) => dispatch({ type: "update", id, input }),
      deleteEvent: (id) => dispatch({ type: "delete", id }),
    }),
    [events],
  );

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}

export default EventsProvider;
