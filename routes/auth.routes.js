const router = require('express').Router();
const Employee = require('../models/Employee');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Employee.findOne({ email });
    if (!user)
      return res.status(401).json({ success: false, message: "Foydalanuvchi topilmadi" });
    if (user.password !== password)
      return res.status(401).json({ success: false, message: "Parol noto'g'ri" });

    res.json({
      success: true,
      data: {
        _id:      user._id.toString(),
        uid:      user._id.toString(),
        email:    user.email,
        name:     user.name,
        role:     user.role || 'EMPLOYEE',
        position: user.position,
        salaryRate: user.salaryRate,
        salaryType: user.salaryType,
        currency:   user.currency,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;