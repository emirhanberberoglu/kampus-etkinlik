import { useParams } from "react-router-dom";
import EventDetail from "../components/events/EventDetail";
import { useEvents } from "../hooks/useEvents";
import { findEventById } from "../utils/filter-events";
import NotFoundPage from "./NotFoundPage";

// /events/:id  → adres çubuğundaki id'ye göre etkinliği bulur
function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  const event = findEventById(events, id ?? "");

  if (!event) return <NotFoundPage />;
  return <EventDetail event={event} />;
}

export default EventDetailPage;
