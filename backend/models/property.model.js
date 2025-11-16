import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Property title is required"],
    },

    description: { type: String },

    category: {
      type: String,
      required: [true, "Property category is required"],
    },

    price: {
      amount: {
        type: Number,
        required: [true, "Property price is required"],
      },
      currency: {
        type: String,
        default: "FCFA",
      },
    },

    rating: { type: Number, default: 0 },

    location: {
      address: {
        type: String,
        required: [true, "Property address is required"],
      },
      city: String,
      country: String,
      latitude: Number,
      longitude: Number,
    },

    details: {
      beds: Number,
      baths: Number,
      areaSqft: Number,
    },

    mainImage: {
      type: String,
      required: [true, "Main image is required"],
    },

    gallery: [
      {
        _id: false,
        id: String,
        imageUrl: String,
      },
    ],

    facilities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Facility" }],

    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Property must have an agent or owner"],
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", PropertySchema);

export default Property;
