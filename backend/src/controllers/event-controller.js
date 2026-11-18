import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

// Bütün hatalar aynı biçimde döner: { "error": { "message": "..." } }
function sendError(res, status, message) {
  return res.status(status).json({ error: { message } });
}

// GET /events            → tüm etkinlikler (tarihe göre sıralı)
// GET /events?category=X → yalnızca o kategori (isteğe bağlı)
// async/await: await unutulursa yanıt boş "{}" olur, bu yüzden Event.find() önünde await var.
export async function getEvents(req, res, next) {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err); // beklenmeyen hata app.js'teki hata yakalayıcıya gider, sunucu çökmez
  }
}

// GET /events/:id → tek etkinlik; biçimi yanlış ya da kaydı olmayan id 404 döner
export async function getEventById(req, res, next) {
  try {
    // "yok" gibi geçerli bir ObjectId olmayan değerde Mongoose CastError fırlatırdı (500).
    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendError(res, 404, "Event not found");
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return sendError(res, 404, "Event not found");
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
}

// POST /events → doğrulamayı schema yapar, kurallara uymayan kayıt 400 döner
export async function createEvent(req, res, next) {
  try {
    // Sadece bilinen alanlar alınır; istemci _id ya da createdAt gönderse de yok sayılır.
    const { title, category, capacity, date, time, location, description } = req.body ?? {};
    const event = await Event.create({ title, category, capacity, date, time, location, description });
    res.status(201).json(event);
  } catch (err) {
    if (err.name === "ValidationError") {
      return sendError(res, 400, err.message);
    }
    next(err);
  }
}
