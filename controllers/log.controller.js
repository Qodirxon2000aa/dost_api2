const Log = require('../models/Log');

exports.getAll = async (req, res) => {
  try {
    const data = await Log.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const log = await Log.create(req.body);
    res.status(201).json({ success: true, data: log });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};