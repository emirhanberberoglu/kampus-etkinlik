import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  getUpcomingEvents,
  updateEvent,
} from "../controllers/event-controller.js";

// app.js içinde app.use("/events", ...) ile bağlanır; buradaki yollar onun devamıdır
const router = Router();

// Express route'ları yukarıdan aşağıya dener. "/upcoming" sabit bir adrestir ve
// "/:id"den ÖNCE yazılmalıdır; yoksa "upcoming" bir id sanılır ve 404 döner.
router.get("/", getEvents); //                  GET    /events  (?search= & ?category=)
router.get("/upcoming", getUpcomingEvents); //  GET    /events/upcoming
router.get("/:id", getEventById); //            GET    /events/:id
router.post("/", createEvent); //               POST   /events
router.patch("/:id", updateEvent); //           PATCH  /events/:id
router.delete("/:id", deleteEvent); //          DELETE /events/:id

export default router;
