import { events } from "../data/events.js";

// Bütün hatalar aynı biçimde döner: { "error": { "message": "..." } }
function sendError(res, status, message) {
  return res.status(status).json({ error: { message } });
}

// undefined, null ve yalnızca boşluktan oluşan değerler "boş" sayılır
function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === "";
}

// Aynı milisaniyede iki kayıt gelirse id çakışmasın
function createId() {
  let id = `event-${Date.now()}`;
  let counter = 1;
  while (events.some((event) => event.id === id)) {
    id = `event-${Date.now()}-${counter}`;
    counter += 1;
  }
  return id;
}

// GET /events            → tüm etkinlikler
// GET /events?category=X → yalnızca o kategori (isteğe bağlı)
export function getEvents(req, res) {
  const { category } = req.query;
  const result = category
    ? events.filter((event) => event.category === category)
    : events;
  res.json(result);
}

// GET /events/:id → tek etkinlik, yoksa 404
export function getEventById(req, res) {
  const event = events.find((item) => item.id === req.params.id);
  if (!event) {
    return sendError(res, 404, "Event not found");
  }
  res.json(event);
}

// POST /events → body'deki bilgilerle yeni etkinlik, başarılıysa 201
export function createEvent(req, res) {
  const { title, category, capacity, date, time, location, description } = req.body ?? {};

  if (isBlank(title) || isBlank(category) || isBlank(date)) {
    return sendError(res, 400, "title, category and date are required");
  }

  const newEvent = {
    id: createId(),
    title: String(title).trim(),
    category: String(category).trim(),
    capacity: Number(capacity) || 0,
    date: String(date).trim(),
    time: time ?? "",
    location: location ?? "",
    description: description ?? "",
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
}
