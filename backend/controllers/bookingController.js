const prisma = require('../db');

// @desc    Book an event
// @route   POST /api/bookings
// @access  Private
const bookEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    
    const event = await prisma.event.findUnique({ where: { id: eventId }, include: { bookings: true } });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user already booked
    const alreadyBooked = await prisma.booking.findFirst({
      where: { userId: req.user.id, eventId }
    });

    if (alreadyBooked) {
      return res.status(400).json({ message: 'You have already booked this event' });
    }

    // Check capacity
    if (event.bookings.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is at full capacity' });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        eventId,
      },
      include: { event: true }
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: { event: true }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { bookEvent, getMyBookings };
