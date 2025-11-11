import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { GOOGLE_CLIENT_ID, JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const register = async (req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Registration logic here
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { token, user: newUsers[0] },
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const login = async (req, res, next) => {
  try {
    // Login logic here
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      data: { token, user },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    // Logout logic here
    res.send({ title: "User Logout" });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { tokenId } = req.body;
    if (!tokenId) {
      const error = new Error("Token ID is required");
      error.statusCode = 400;
      throw error;
    }

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      const error = new Error("Invalid Google token");
      error.statusCode = 401;
      throw error;
    }

    const { email_verified, name, email } = payload;
    if (email_verified) {
      let user = await User.find({ email });
      if (user.length === 0) {
        const password = email + JWT_SECRET;
        user = await User.create({ name, email, password });
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: { token, user },
      });
    } else {
      const error = new Error("Google email not verified");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
