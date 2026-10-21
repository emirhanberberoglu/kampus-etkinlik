import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string;
}

function EventList({
  events,
  onShowDetail,
  emptyText = "Gösterilecek etkinlik yok.",
}: EventListProps) {
  if (events.length === 0) return <p className="sonuc">{emptyText}</p>;

  return (
    <div className="etkinlik-listesi">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onShowDetail={onShowDetail} />
      ))}
    </div>
  );
}

export default EventList;
