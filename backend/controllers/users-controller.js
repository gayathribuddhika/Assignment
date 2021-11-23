const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const codes = require("../constants/common");
const msg = require("../constants/message");

const User = require("../models/user");

// create a user
const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError( msg.STATUS_MESSAGE.InvalidInput, codes.STATUS_CODE.UnprocessableEntity)
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
    const error = new HttpError(msg.STATUS_MESSAGE.ServerError, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }

  if (hasUsername) {
    const error = new HttpError(msg.STATUS_MESSAGE.ExistUser, codes.STATUS_CODE.UnprocessableEntity);
    return next(error);
  }

  //Checking email is already exist
  let hasEmail;
  try {
    hasEmail = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(msg.STATUS_MESSAGE.ServerError, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }

  if (hasEmail) {
    const error = new HttpError(
      'Could not create user. email is already exist',
      422
    );
    return next(error);
  }

  // password encryption

  // creatting a new user
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

// fetch all registered users
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError(msg.STATUS_MESSAGE.GetUserFaild, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }
  res.status(codes.STATUS_CODE.Success).json(users);
}

// delete a user
const deleteUser = async (req, res, next) => {
  const user_id = req.params.user_id;
  
  let user;
  try {
    user = await User.findById(user_id);
  } catch (err) {
    const error = new HttpError(msg.STATUS_MESSAGE.DeleteUserFaild, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }
  if (!user) {
    const error = new HttpError(msg.STATUS_MESSAGE.UserNotFound, codes.STATUS_CODE.NotFound);
    return next(error);
  }
  await User.remove(user_id);
  res.status(codes.STATUS_CODE.Success).json({message: msg.STATUS_MESSAGE.Succ_delete});
}

exports.createUser = createUser;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;