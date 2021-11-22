const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    country: { type: String, required: true },
    state: { type: String, required: true },
    state: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    mobileNumber: { type: String, required: true },
  },
  {
    timestamps: true,
  }
    
);

module.exports = mongoose.model("User", userSchema);
