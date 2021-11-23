const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
var fs = require('fs');
const HttpError = require('../models/http-error');
const bcrypt = require('bcryptjs');
var generator = require('generate-password');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const Group = require('../models/group');
const Role = require('../models/role');
const Cabinet = require('../models/cabinet');
const Trustee = require('../models/trustee');

const USER = process.env.USER;
const PASS = process.env.PASS;

const collecitons = require('../shared/shared-variable');
const applicationAudit = require('../models/applicationAudit');

const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const {
    name,
    username,
    password,
    email,
    usertype,
    type,
    status,
    createdby,
    createdmachine,
  } = req.body;

  //Checking username is already exist

  let hasUsername;
  try {
    hasUsername = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, please try again later.',
      500
    );
    return next(error);
  }

  if (hasUsername) {
    const error = new HttpError(
      'Could not create user. username is already exist',
      422
    );
    return next(error);
  }

  //Checking username is already exist

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('Creating user failed, please try again.', 500);
    return next(error);
  }

  // const title = req.body.title;
  const createdUser = new User({
    name,
    username,
    password: hashedPassword,
    email,
    usertype,
    type,
    status,
    createdby,
    createdmachine,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Creating user failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser });
};

const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const {
    name,
    username,
    email,
    usertype,
    status,
    modifiedby,
    modifiedmachine,
  } = req.body;
  const userId = req.params.id;

  let allUsers;
  try {
    allUsers = await User.find();
  } catch (error) {
    const err = new HttpError('Fetching users failed', 500);
    return next(error);
  }

  let restUsers = allUsers.filter((user) => user.id !== userId);

  //Checking username is already exist

  let hasUsername = restUsers.find((user) => user.username === username);
  if (hasUsername) {
    const error = new HttpError(
      'Could not update user. username is already exist',
      500
    );

    return next(error);
  }

  //Checking email is already exist

  let hasEmail = restUsers.find((user) => user.email === email);
  if (hasEmail) {
    const error = new HttpError(
      'Could not update user. email is already exist',
      500
    );

    return next(error);
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update user.',
      500
    );
    return next(error);
  }

  user.name = name;
  user.username = username;
  user.email = email;
  user.usertype = usertype;
  user.status = status;
  user.modifiedby = modifiedby;
  user.modifiedmachine = modifiedmachine;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update user.',
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    const err = new HttpError('Fetching users failed', 500);
    return next(error);
  }

  let newUsers = [];

  for (let user of users) {
    if (user.usertype !== '3') {
      newUsers.push(user);
    }
  }

  res
    .status(200)
    .json({ users: newUsers.map((user) => user.toObject({ getters: true })) });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a user.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      'Could not find user for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  let user;
  try {
    user = await User.findById(userId).populate('groups').populate('roles');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete user.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('could not find user for this id.', 404);
    return next(error);
  }

  // console.log(user.groups.length);
  try {
    //removing the user

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await user.remove({ session: sess });

    //removing the relevent user id from the group.

    for (let i = 0; i < user.groups.length; i++) {
      user.groups[i].users.pull(user);
      await user.groups[i].save({ session: sess });
    }

    //removing the relevent user id from the roles.

    for (let i = 0; i < user.roles.length; i++) {
      user.roles[i].users.pull(user);
      await user.roles[i].save({ session: sess });
    }

    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete user.',
      500
    );
    return next(error);
  }

  res.status(200).json({ messgae: 'Deleted User Successfully' });
};

const deleteAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find().populate('groups').populate('roles');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete all user.',
      500
    );
    return next(error);
  }

  if (!users) {
    const error = new HttpError('could not find users.', 404);
    return next(error);
  }

  // console.log(user.groups.length);

  for (let user of users) {
    if (user.usertype !== '3') {
      try {
        //removing the user

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await user.remove({ session: sess });

        //removing the relevent user id from the group.

        for (let i = 0; i < user.groups.length; i++) {
          user.groups[i].users.pull(user);
          await user.groups[i].save({ session: sess });
        }

        //removing the relevent user id from the roles.

        for (let i = 0; i < user.roles.length; i++) {
          user.roles[i].users.pull(user);
          await user.roles[i].save({ session: sess });
        }

        await sess.commitTransaction();
      } catch (err) {
        const error = new HttpError(
          'Something went wrong, could not delete user.',
          500
        );
        return next(error);
      }
    }
  }

  res.status(200).json({ messgae: 'Deleted All User Successfully' });
};

const resetPassword = async (req, res, next) => {
  const userId = req.params.userId;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not reset Password.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('could not find uesrs.', 404);
    return next(error);
  }

  let password = generator.generate({
    length: 10,
    numbers: true,
  });

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Password Hashing failed, please try again.',
      500
    );
    return next(error);
  }

  user.password = hashedPassword;
  user.status = 3;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not reset the password',
      500
    );
    return next(error);
  }

  let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: USER,
      pass: PASS,
    },
  });

  let mailOption = {
    from: USER,
    to: user.email,
    subject: 'Your Password Has Been Resetted',
    text: `New Password - ${password}`,
  };

  transport.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log('error occured');
    } else {
      console.log('email sent ' + info.response);
    }
  });

  res.status(200).json({ newPassword: password });
};

const newOrResetedUserPasswordReset = async (req, res, next) => {
  const userId = req.params.userId;

  const { newPassword, oldPassword } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not reset Password.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('could not find uesrs.', 404);
    return next(error);
  }

  isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(oldPassword, user.password);
  } catch (err) {
    const error = new HttpError(
      'Resetting password failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not reset password',
      403
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(newPassword, 12);
  } catch (err) {
    const error = new HttpError(
      'Resetting password failed, please try again.',
      500
    );
    return next(error);
  }

  user.password = hashedPassword;
  user.status = 2;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not reset the password',
      500
    );
    return next(error);
  }

  res.status(200).json({ messgae: 'Password Resetted Successfully!' });
};

const resetAllPassword = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not reset All Password.',
      500
    );
    return next(error);
  }

  if (!users) {
    const error = new HttpError('could not find uesrs.', 404);
    return next(error);
  }

  for (let user of users) {
    if (user.usertype !== '3') {
      let password = generator.generate({
        length: 10,
        numbers: true,
      });

      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 12);
      } catch (err) {
        const error = new HttpError(
          'Hashing password failed, please try again.',
          500
        );
        return next(error);
      }

      user.password = hashedPassword;
      user.status = 3;

      try {
        await user.save();
      } catch (err) {
        const error = new HttpError(
          'Something went wrong, could not reset the password',
          500
        );
        return next(error);
      }
    }
  }

  res.status(200).json({ messgae: 'All password reseted Successfully' });
};

const uploadProfilePicture = async (req, res, next) => {
  const userId = req.params.userId;

  let profilePic;
  if (req.file) {
    profilePic = fs.readFileSync(req.file.path);
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not upload profile picuture.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('could not find uesr.', 404);
    return next(error);
  }

  if (!profilePic) {
    const error = new HttpError(
      'Profile Picture is not there. Please check your data',
      400
    );
    return next(error);
  }

  // let encode_profile_pic = profilePic.toString('base64');

  // user.profilePic.data = new Buffer(encode_profile_pic, 'base64');

  user.profilePic.data = profilePic;
  user.profilePic.contentType = req.file.mimetype;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not upload the profile picture',
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

exports.createUser = createUser;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.deleteAllUser = deleteAllUser;
exports.resetPassword = resetPassword;
exports.newOrResetedUserPasswordReset = newOrResetedUserPasswordReset;
exports.resetAllPassword = resetAllPassword;
exports.uploadProfilePicture = uploadProfilePicture;
