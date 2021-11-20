const express = require("express");
const router = express.Router();
const db = require("../config/db");

// get all users

router.get('/lab1', async (req, res) => {
    try {
        const item = await Item.find();
        res.send(item);
    } catch (ex) {
        res.status(500).send("Something went Wrong.");
    }
    
});