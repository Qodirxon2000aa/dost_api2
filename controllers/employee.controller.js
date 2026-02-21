const Employee = require('../models/Employee');

exports.getAll = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json({ success: true, data: employees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ success: false, message: 'Topilmadi' });
    res.json({ success: true, data: emp });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json({ success: true, data: emp });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!emp) return res.status(404).json({ success: false, message: 'Topilmadi' });
    res.json({ success: true, data: emp });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "O'chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};