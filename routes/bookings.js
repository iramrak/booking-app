import express from "express";
import { reserveBooking, getUserBookings} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/reserve", reserveBooking);

router.get("/:userId", getUserBookings);

export default router;
