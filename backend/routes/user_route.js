const express = require("express");
const { check } = require('express-validator');
const router = express.Router()
const cors = require("cors")

const User = require("../models/user");
const userController = require('../controllers/users-controller');

router.use(cors())

router.post('/user', async(req, res) => {
    user = new User({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    })
});

module.exports = router;