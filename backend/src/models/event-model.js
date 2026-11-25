import mongoose from "mongoose";
import { formatDate, parseDate } from "../utils/date.js";

// Kurallar schema'da durur; kayıt bu kurallara uymazsa Mongoose
// ValidationError fırlatır ve controller bunu 400'e çevirir.
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
    category: {
      type: String,
      required: true,
      enum: ["Seminer", "Atölye", "Söyleşi", "Yarışma"],
    },
    capacity: { type: Number, min: 0, default: 0 },
    // Veritabanında gerçek Date; dışarıdan "GG-AA-YYYY" gelir (set), dışarıya yine öyle gider (get)
    date: { type: Date, required: true, set: parseDate, get: formatDate },
    time: { type: String, default: "" },
    location: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, maxlength: 500, default: "" },
  },
  {
    timestamps: true, //            createdAt ve updatedAt'i Mongoose kendisi yazar
    toJSON: { getters: true }, //   yanıtta date "GG-AA-YYYY" görünsün (ISO metin değil)
    id: false, //                   getters açıkken fazladan "id" alanı eklenmesin
  }
);

// Model adı "Event" olduğu için MongoDB'deki koleksiyon adı "events" olur.
export const Event = mongoose.model("Event", eventSchema);
