const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
   uid:        { type: String },
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true }, // validation yo'q, oddiy string
  password:   { type: String },
  position:   { type: String, required: true },
  role:       { type: String, enum: ['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE'], default: 'EMPLOYEE' },
  salaryType: { type: String, enum: ['MONTHLY', 'DAILY'], default: 'MONTHLY' },
  salaryRate: { type: Number, default: 0 },
  currency:   { type: String, default: 'UZS' },
  status:     { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);