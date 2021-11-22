// import
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// database connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("Database Connected !!"))
  .catch((err) => console.log(err));

// router prefix
app.use("/api/user", require("./routes/user_route"));

// start the server
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);