const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Finance = require('../models/Finance');

// Get all appointments
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ date: 1, time: 1 });
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Confirm appointment
router.put('/appointments/:id/confirm', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed' },
      { new: true }
    );
    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Cancel appointment
router.put('/appointments/:id/cancel', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete appointment
router.delete('/appointments/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Finance routes
router.get('/finances', async (req, res) => {
  try {
    const finances = await Finance.find()
      .populate('appointmentId')
      .sort({ paymentDate: -1 });
    
    // Calculate summary
    const summary = {
      total: finances.reduce((sum, f) => sum + f.amount, 0),
      pending: finances.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0),
      completed: finances.filter(f => f.status === 'completed').reduce((sum, f) => sum + f.amount, 0),
      refunded: finances.filter(f => f.status === 'refunded').reduce((sum, f) => sum + f.amount, 0)
    };

    res.json({
      success: true,
      data: finances,
      summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/finances', async (req, res) => {
  try {
    const { appointmentId, amount, paymentMethod, notes } = req.body;
    
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    const finance = new Finance({
      appointmentId,
      patientName: appointment.name,
      amount,
      paymentMethod,
      notes
    });

    await finance.save();
    res.status(201).json({
      success: true,
      data: finance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.put('/finances/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const finance = await Finance.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );
    
    if (!finance) {
      return res.status(404).json({
        success: false,
        error: 'Finance record not found'
      });
    }

    res.json({
      success: true,
      data: finance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/finances/summary', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};
    
    if (startDate && endDate) {
      query.paymentDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const finances = await Finance.find(query);
    
    const summary = {
      total: finances.reduce((sum, f) => sum + f.amount, 0),
      byMethod: {
        cash: finances.filter(f => f.paymentMethod === 'cash').reduce((sum, f) => sum + f.amount, 0),
        card: finances.filter(f => f.paymentMethod === 'card').reduce((sum, f) => sum + f.amount, 0),
        bank_transfer: finances.filter(f => f.paymentMethod === 'bank_transfer').reduce((sum, f) => sum + f.amount, 0)
      },
      byStatus: {
        pending: finances.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0),
        completed: finances.filter(f => f.status === 'completed').reduce((sum, f) => sum + f.amount, 0),
        refunded: finances.filter(f => f.status === 'refunded').reduce((sum, f) => sum + f.amount, 0)
      }
    };

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router; 