import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: [true, "Booking must include a property"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Booking must include a user"],
  },
  bookingDate: {
    type: Date,
    required: [true, "Booking date is required"],
  },

  checkInDate: Date,
  checkOutDate: Date,

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "confirmed",
  },
  pricePaid: {
    amount: Number,
    currency: { type: String, default: "FCFA" },
  },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
