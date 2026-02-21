const Object = require('../models/Object');

exports.getAll = async (req, res) => {
  try {
    const data = await Object.find({ status: 'active' }).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const obj = await Object.create(req.body);
    res.status(201).json({ success: true, data: obj });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Object.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "O'chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addSpent = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    const obj = await Object.findByIdAndUpdate(
      req.params.id,
      { $inc: { spentAmount: amount } },
      { new: true }
    );
    res.json({ success: true, data: obj });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addIncome = async (req, res) => {
  try {
    const amount  = Number(req.body.amount);
    const comment = String(req.body.comment || '');

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: "Summa noto'g'ri" });
    }

    const incomeEntry = {
      amount,
      comment,
      createdAt: new Date(),
    };

    const obj = await Object.findByIdAndUpdate(
      req.params.id,
      {
        $inc:  { totalBudget: amount },
        $push: { incomeHistory: incomeEntry },
      },
      { new: true, runValidators: true }
    );

    if (!obj) {
      return res.status(404).json({ success: false, message: "Obyekt topilmadi" });
    }

    res.json({ success: true, data: obj });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};