require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const Appointment = require('./models/Appointment');
const adminRoutes = require('./routes/admin');

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5432', 'http://localhost:5433'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/admin', adminRoutes);

// Public routes
app.post('/api/appointments', async (req, res) => {
  try {
    console.log('Received appointment data:', req.body);
    
    // Validate required fields
    const { name, contact, date, time, services, message } = req.body;
    if (!name || !contact || !date || !time || !services || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }

    const appointment = new Appointment({
      name,
      contact,
      date: new Date(date),
      time,
      services,
      message,
      status: 'pending'
    });

    const savedAppointment = await appointment.save();
    console.log('Appointment saved successfully:', savedAppointment);
    
    res.status(201).json({
      success: true,
      data: savedAppointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/appointments/available-slots', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({
        success: false,
        error: 'Date is required'
      });
    }

    // Get all confirmed appointments for the given date
    const bookedAppointments = await Appointment.find({
      date: new Date(date),
      status: 'confirmed'
    });

    // Extract booked times
    const bookedTimes = bookedAppointments.map(apt => apt.time);

    res.json({
      success: true,
      data: bookedTimes
    });
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 8775;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
