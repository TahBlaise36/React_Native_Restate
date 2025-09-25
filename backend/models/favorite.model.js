import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  item: {
    type: String,
    required: [true, "Item is required"],
    trim: true,
    minlength: 1,
    maxlength: 100,
  },

  createdAt: { type: Date, default: Date.now },
});
const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
