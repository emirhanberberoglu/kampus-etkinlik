import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../hooks/useEvents";
import { findEventById } from "../utils/filter-events";
import { toEventInput, toFormValues } from "../utils/validate-event";
import NotFoundPage from "./NotFoundPage";

// /admin/:id/edit → form mevcut etkinliğin bilgileriyle dolu açılır
function EventEditPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = findEventById(events, id ?? "");

  if (!event) return <NotFoundPage />;

  return (
    <>
      <h2 className="bolum-baslik">Etkinlik Güncelle</h2>
      <EventForm
        key={event.id}
        initialValues={toFormValues(event)}
        submitText="Güncelle"
        onSubmit={(values) => {
          updateEvent(event.id, toEventInput(values));
          navigate("/admin", { state: { message: `"${values.title.trim()}" güncellendi.` } });
        }}
      />
    </>
  );
}

export default EventEditPage;
