const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    phone_no: {
        type: Number,
        required: true,
        maxlength: 10
    },
    mobile_no: {
        type: Number,
        required: true,
        maxlength: 10
    },
    
    email: {
        type: String,
        reruired: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 12,
    },
    dob: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
    
});

const User = mongoose.model("User", userSchema);
exports.User = User;