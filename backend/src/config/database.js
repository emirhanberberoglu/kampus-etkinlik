import mongoose from "mongoose";

// MongoDB bağlantısı tek yerde kurulur. Adres koda yazılmaz, .env içindeki
// MONGODB_URI değişkeninden okunur (dotenv'i server.js ve seed.js yükler).
export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI tanımlı değil (backend/.env dosyasını kontrol et)");
  }

  await mongoose.connect(uri);

  // Adres içinde şifre var: onu asla yazdırma, sadece sunucu ve veritabanı adı.
  const { host, name } = mongoose.connection;
  const yer = uri.startsWith("mongodb+srv://") ? "Atlas" : "yerel";
  console.log(`MongoDB bağlandı (${yer}): ${host}/${name}`);
}
