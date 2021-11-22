// import
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
const mongoose = require("mongoose");
const msg = require('./constants/message');
const codes = require('./constants/common');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router prefix
app.use("/api/user", require("./routes/user_route"));

app.use((req, res, next) => {
  const error = new HttpError(msg.STATUS_MESSAGE.NotFound, errorCode.STATUS_CODE.NotFound);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || codes.STATUS_CODE.InternalServerError);
  res.json({ message: error.message || msg.STATUS_MESSAGE.unknownError });
});

// database connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("Database Connected Successfully!!"))
  .catch((err) => console.log(err));


// start the server
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);

