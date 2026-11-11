import { Router } from "express";
import {
  createEvent,
  getEventById,
  getEvents,
} from "../controllers/event-controller.js";

// app.js içinde app.use("/events", ...) ile bağlanır; buradaki yollar onun devamıdır
const router = Router();

router.get("/", getEvents); //          GET  /events
router.get("/:id", getEventById); //    GET  /events/:id
router.post("/", createEvent); //       POST /events

export default router;
