const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const codes = require("../constants/common");
const msg = require("../constants/message");

const User = require("../models/user");

const creatUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(
      new HttpError(
        msg.STATUS_MESSAGE.InvalidInput,
        codes.STATUS_CODE.UnprocessableEntity
      )
    );
  }

  const {
    firstName,
    lastName,
    username,
    password,
    dateOfBirth,
    email,
    country,
    state,
    phoneNumber,
    mobileNumber,
  } = req.body;

  // Checking username is already exist
  let hasUsername;
  try {
    hasUsername = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      msg.STATUS_MESSAGE.ServerError,
      codes.STATUS_CODE.InternalServerError
    );
    return next(error);
  }

  if (hasUsername) {
    const error = new HttpError(msg.STATUS_MESSAGE.ExistUser, 422);
    return next(error);
  }

  //Checking email is already exist
  let hasEmail;
  try {
    hasEmail = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, please try again later.',
      500
    );
    return next(error);
  }

  if (hasEmail) {
    const error = new HttpError(
      'Could not create user. email is already exist',
      422
    );
    return next(error);
  }

  const createdUser = new User({
    firstName,
    lastName,
    username,
    password,
    dateOfBirth,
    email,
    country,
    state,
    phoneNumber,
    mobileNumber,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(msg.STATUS_MESSAGE.CreateUserfaild, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }

  res.status(codes.STATUS_CODE.Success).json({ user: createdUser });
};
