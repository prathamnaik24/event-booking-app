const prisma = require('../db');

// @desc    Get all events
// @route   GET /api/events
const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: { creator: { select: { name: true, email: true } } }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: { creator: { select: { name: true, email: true } } }
    });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, capacity } = req.body;
    
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        capacity: parseInt(capacity),
        createdBy: req.user.id,
      },
    });
    
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
  try {
    const { title, description, date, location, capacity } = req.body;
    
    const eventExists = await prisma.event.findUnique({ where: { id: req.params.id } });
    if (!eventExists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        ...(date && { date: new Date(date) }),
        location,
        ...(capacity && { capacity: parseInt(capacity) }),
      },
    });
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
  try {
    const eventExists = await prisma.event.findUnique({ where: { id: req.params.id } });
    if (!eventExists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete related bookings first to avoid foreign key constraints
    await prisma.booking.deleteMany({ where: { eventId: req.params.id } });

    await prisma.event.delete({ where: { id: req.params.id } });
    
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
