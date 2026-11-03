import { useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../hooks/useEvents";
import { emptyEventForm, toEventInput } from "../utils/validate-event";

function EventNewPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <EventForm
      initialValues={emptyEventForm}
      submitText="Kaydet"
      onSubmit={(values) => {
        addEvent(toEventInput(values));
        navigate("/admin", { state: { message: `"${values.title.trim()}" eklendi.` } });
      }}
    />
  );
}

export default EventNewPage;
