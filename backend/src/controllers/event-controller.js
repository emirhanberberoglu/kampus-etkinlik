import mongoose from "mongoose";
import { Event } from "../models/event-model.js";
import { todayStart } from "../utils/date.js";

// Bütün hatalar aynı biçimde döner: { "error": { "message": "..." } }
function sendError(res, status, message) {
  return res.status(status).json({ error: { message } });
}

// Olmayan, silinmiş ya da biçimi geçersiz id: her yerde aynı 404
function notFound(res) {
  return sendError(res, 404, "Event not found");
}

// Şema kuralına uymayan ya da tarihe/sayıya çevrilemeyen değer istemci hatasıdır (400)
function isClientError(err) {
  return err.name === "ValidationError" || err.name === "CastError";
}

// İstemcinin değiştiremeyeceği alanlar (PATCH'te 400)
const KORUNAN_ALANLAR = ["_id", "createdAt", "updatedAt", "__v"];
// PATCH ile değişebilen alanlar; $set gibi MongoDB işleçleri ve bilinmeyen alanlar yok sayılır
const DEGISEN_ALANLAR = ["title", "category", "capacity", "date", "time", "location", "description"];

// GET /events                          → tüm etkinlikler (tarihe göre sıralı)
// GET /events?category=Atölye          → yalnızca o kategori
// GET /events?search=git               → başlığında "git" geçenler (büyük/küçük harf fark etmez)
// GET /events?search=git&category=Atölye → ikisi birlikte
// async/await: await unutulursa yanıt boş "{}" olur, bu yüzden Event.find() önünde await var.
export async function getEvents(req, res, next) {
  try {
    const { category, search } = req.query;
    if ((category !== undefined && typeof category !== "string") ||
        (search !== undefined && typeof search !== "string")) {
      return sendError(res, 400, "category and search must be single text values");
    }

    const filter = {};
    if (category) filter.category = category;
    if (search) {
      // ( * ? gibi işaretler regex'te özel anlam taşır; kaçırılmazsa "?search=(" sunucu hatası verir
      const guvenli = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.title = { $regex: guvenli, $options: "i" };
    }

    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err); // beklenmeyen hata app.js'teki hata yakalayıcıya gider, sunucu çökmez
  }
}

// GET /events/upcoming → bugün ve sonrasındaki etkinlikler, en yakın önce
// Not: /:id'den önce tanımlı olmalı (routes/event-routes.js)
export async function getUpcomingEvents(req, res, next) {
  try {
    const events = await Event
      .find({ date: { $gte: todayStart() } }) // $gte: büyük ya da eşit; geçmiş etkinlikler gelmez
      .sort({ date: 1, time: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

// GET /events/:id → tek etkinlik; biçimi yanlış ya da kaydı olmayan id 404 döner
export async function getEventById(req, res, next) {
  try {
    // "yok" gibi geçerli bir ObjectId olmayan değerde Mongoose CastError fırlatırdı (500).
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);

    const event = await Event.findById(req.params.id);
    if (!event) return notFound(res);
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
    if (isClientError(err)) return sendError(res, 400, err.message);
    next(err);
  }
}

// PATCH /events/:id → sadece gönderilen alanlar değişir, güncel kayıt döner
export async function updateEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);

    const body = req.body ?? {};
    if (typeof body !== "object" || Array.isArray(body) || Object.keys(body).length === 0) {
      return sendError(res, 400, "Body is empty");
    }

    const korunan = Object.keys(body).filter((k) => KORUNAN_ALANLAR.includes(k));
    if (korunan.length > 0) {
      return sendError(res, 400, `${korunan.join(", ")} cannot be changed`);
    }

    // Yalnızca değişebilen alanlar güncellemeye girer
    const guncelleme = {};
    for (const alan of DEGISEN_ALANLAR) {
      if (Object.hasOwn(body, alan)) guncelleme[alan] = body[alan];
    }

    const event = await Event.findByIdAndUpdate(req.params.id, guncelleme, {
      returnDocument: "after", // güncellenmiş kaydı döndür (yoksa eski hali gelir)
      runValidators: true, //     schema kuralları güncellemede de çalışsın (yoksa category: "Parti" kabul edilir)
    });
    if (!event) return notFound(res);
    res.json(event);
  } catch (err) {
    if (isClientError(err)) return sendError(res, 400, err.message); // yanlış tarih de buraya düşer (500 olmaz)
    next(err);
  }
}

// DELETE /events/:id → silindi: 204, gövde yok. Aynı id'yi bir daha silmek 404 verir.
export async function deleteEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);

    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return notFound(res); // ikinci silme de buraya düşer
    res.status(204).end(); // 204'te res.json yazılmaz: yanıtın gövdesi olmaz
  } catch (err) {
    next(err);
  }
}
