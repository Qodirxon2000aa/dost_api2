const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/employees',  require('./routes/employee.routes'));
app.use('/api/attendance', require('./routes/attendance.routes'));
app.use('/api/payroll',    require('./routes/payroll.routes'));
app.use('/api/objects',    require('./routes/object.routes'));
app.use('/api/logs',       require('./routes/log.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dost_electric';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB ulandi'))
  .catch(err => console.error('MongoDB xatosi:', err));

module.exports = app;