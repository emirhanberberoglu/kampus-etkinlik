import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const STUDENT_NUMBER = "2416501013";

const app = express();

// Middleware: her istek route'a gelmeden önce buradan geçer
app.use(cors()); //          frontend'in (localhost:5173) istek atmasına izin verir
app.use(express.json()); //  JSON body'yi req.body içine koyar

// Sunucu ayakta mı? (route'lardan önce tanımlı)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: STUDENT_NUMBER,
  });
});

app.use("/events", eventRoutes);

// Hiçbir route eşleşmediyse
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Hata yakalayıcı (4 parametreli): örneğin bozuk JSON gövdesi
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { message: "Invalid JSON body" } });
  }
  console.error(err);
  res.status(500).json({ error: { message: "Internal server error" } });
});

export default app;
