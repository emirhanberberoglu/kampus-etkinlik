// .env dosyasını okur; process.env değerleri kullanılmadan önce çalışması gerekir
import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 3000;

try {
  // Önce veritabanı, sonra sunucu: bağlantı kurulamazsa API hiç açılmaz
  await connectDatabase();

  const server = app.listen(PORT, () => {
    console.log(`API: http://localhost:${PORT}`);
  });

  // Port doluysa anlaşılır bir mesaj ver
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} kullanımda. Açık başka bir terminali kapat ya da .env içindeki PORT'u değiştir.`);
    } else {
      console.error(err);
    }
    process.exit(1);
  });
} catch (err) {
  console.error(`Bağlanılamadı: ${err.message}`);
  process.exit(1);
}
