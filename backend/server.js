const express = require('express');
const app = express();

app.use(express.json());
require("./config/db");

const port = 8090;
app.listen(port, () => {
    console.log('Server started on http://localhost:' + port);
});