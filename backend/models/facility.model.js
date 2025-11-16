import mongoose from "mongoose";

const FacilitySchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Facility title is required"] },
    iconName: { type: String, required: [true, "Facility icon is required"] }, // e.g. "laundry", "wifi"
  },
  { timestamps: true }
);

const Facility = mongoose.model("Facility", FacilitySchema);

export default Facility;
