import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updates = req.body;

    if ("password" in updates) {
      const error = new Error("Password cannot be updated here");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findById(req.params.id).session(session);

    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }

    await User.deleteOne({ _id: user._id }, { session });
    await session.commitTransaction();

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const toggleSavedProperty = async (req, res, next) => {
  try {
    const { userId, propertyId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const exists = user.savedProperties.includes(propertyId);

    if (exists) {
      user.savedProperties.pull(propertyId);
    } else {
      user.savedProperties.push(propertyId);
    }

    await user.save();

    res.json({ success: true, data: user.savedProperties });
  } catch (err) {
    next(err);
  }
};
