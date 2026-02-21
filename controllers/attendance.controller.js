const Attendance = require('../models/Attendance');
const mongoose   = require('mongoose');

exports.getAll = async (req, res) => {
  try {
    const { date, employeeId, status } = req.query;
    const filter = {};
    if (date)       filter.date = date;
    if (status)     filter.status = status;
    if (employeeId) {
      if (mongoose.Types.ObjectId.isValid(employeeId)) {
        filter.employeeId = employeeId;
      }
    }

    const data = await Attendance.find(filter)
      .populate('employeeId', 'name position')
      .sort({ createdAt: -1 });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Upsert — bir xodim bir kunda bitta yozuv
exports.upsert = async (req, res) => {
  try {
    const { employeeId, date, status, objectId, objectName, markedBy } = req.body;

    if (!employeeId || !date) {
      return res.status(400).json({ success: false, message: 'employeeId va date majburiy' });
    }

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ success: false, message: 'employeeId noto\'g\'ri format' });
    }

    const updateData = {
      status:     status     || 'PENDING',
      objectName: objectName || null,
      markedBy:   markedBy   || 'employee',
    };

    if (objectId && mongoose.Types.ObjectId.isValid(objectId)) {
      updateData.objectId = objectId;
    }

    const record = await Attendance.findOneAndUpdate(
      { employeeId, date },
      { $set: updateData },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, data: record });
  } catch (err) {
    console.error('Upsert xatosi:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.approve = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'PRESENT' } },
      { new: true }
    );
    if (!record) return res.status(404).json({ success: false, message: 'Topilmadi' });
    res.json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "O'chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};