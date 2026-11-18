import mongoose from "mongoose";

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
    date: { type: String, required: true },
    time: { type: String, default: "" },
    location: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, maxlength: 500, default: "" },
  },
  { timestamps: true } // createdAt ve updatedAt'i Mongoose kendisi yazar
);

// Model adı "Event" olduğu için MongoDB'deki koleksiyon adı "events" olur.
export const Event = mongoose.model("Event", eventSchema);
