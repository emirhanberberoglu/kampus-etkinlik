import { Link } from "react-router-dom";
import EventList from "../components/events/EventList";
import { useEvents } from "../hooks/useEvents";

// En yakın tarihli 2 etkinlik (Context'teki güncel listeden hesaplanır)
function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  return (
    <section>
      <h2>Yaklaşan 2 Etkinlik</h2>
      <EventList events={upcoming} />
      <p className="tumunu-gor">
        <Link className="buton" to="/events">
          Tüm etkinlikleri gör
        </Link>
      </p>
    </section>
  );
}

export default HomePage;
