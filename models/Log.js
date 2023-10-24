import mongoose from "mongoose";


const logSchema = new mongoose.Schema({
  employeeId: {
    type: Number,
    required: true,
    unique: false
  },
  bike: {
    type: String,
    required: true,
  },
  loginTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  logoutTime: {
    type: Date,
    default: null,
  },
  standardDuration: {
    type: Number,
    required: true
  },
  actualDuration: {
    type: Number,
    default: null,
  },
  BikeAssumbled: {
    type: Number,
    default: 0,
  }

});

export const Log = mongoose.model('Log', logSchema);
