// .env dosyasını okur; process.env.PORT kullanılmadan önce çalışması gerekir
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

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
