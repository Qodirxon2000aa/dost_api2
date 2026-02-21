const Payroll = require('../models/Payroll');

exports.getAll = async (req, res) => {
  try {
    const { status, month, employeeId } = req.query;
    const filter = {};
    if (status)     filter.status = status;
    if (month)      filter.month = month;
    if (employeeId) filter.employeeId = employeeId;

    const data = await Payroll.find(filter)
      .populate('employeeId', 'name position')
      .sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const record = await Payroll.create(req.body);
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.approve = async (req, res) => {
  try {
    const record = await Payroll.findByIdAndUpdate(
      req.params.id,
      { status: 'APPROVED', paymentStatus: 'paid', paidAt: new Date() },
      { new: true }
    );
    res.json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.reject = async (req, res) => {
  try {
    await Payroll.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "O'chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};