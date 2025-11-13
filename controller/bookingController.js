import Booking from "../models/booking.js";
import Event from "../models/event.js";

export const reserveBooking = async (req, res) => {
  try {
    const { event_id, user_id } = req.body;

    const event = await Event.findById(event_id);
    if (!event) return res.status(404).json({ message: "Event not found ❌" });

    const existingBooking = await Booking.findOne({ eventId: event._id, userId: user_id });
    if (existingBooking) {
      return res.status(400).json({ message: "User already booked this event ❌" });
    }

    if (event.bookedSeats >= event.totalSeats) {
      return res.status(400).json({ message: "No seats available ❌" });
    }

    await Booking.create({
      eventId: event._id,
      userId: user_id,
    });

    event.bookedSeats += 1;
    await event.save();

    res.status(201).json({ message: "Booking successful! ✅" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
};
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId }).populate("eventId");

    res.status(200).json(bookings);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
};