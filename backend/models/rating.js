import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    company_id: {
      type: String,
      required: true,
    },
    average_rating: {
      type: Number,
      default: 0,
    },
    total_reviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
