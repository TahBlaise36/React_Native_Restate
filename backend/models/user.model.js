import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minlength: 6,
    },

    phone: { type: String },

    role: {
      type: String,
      enum: ["user", "agent", "owner", "admin"],
      default: "user",
    },

    avatarUrl: String,

    savedProperties: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    ],

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
