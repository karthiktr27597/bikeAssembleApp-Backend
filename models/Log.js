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
    required: true
  },
  duration: {
    type: Number,
    required: true
  }

});

export const Log = mongoose.model('Log', logSchema);
