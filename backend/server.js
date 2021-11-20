const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

require("./config/db");

const port = 8090;
app.listen(port, () => {
    console.log('Server started on http://localhost:' + port);
});