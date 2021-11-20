const express = require("express")
const router = express.Router()
const cors = require("cors")

const User = require("../models/users");

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