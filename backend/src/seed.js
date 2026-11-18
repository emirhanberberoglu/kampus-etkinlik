// Kullanım: npm run seed
// Önce koleksiyonu boşaltır, sonra 6 etkinliği ekler. Bu yüzden kaç kez
// çalıştırılırsa çalıştırılsın veritabanında her zaman 6 kayıt kalır.
import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { Event } from "./models/event-model.js";
import { seedEvents } from "./data/seed-events.js";

try {
  await connectDatabase();
  await Event.deleteMany({});
  const created = await Event.insertMany(seedEvents);
  console.log(`${created.length} etkinlik eklendi`);
} catch (err) {
  console.error(`Seed çalışmadı: ${err.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
