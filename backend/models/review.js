import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    company_id: {
      type: String,
      required: true,
    },
    client_id: {
      type: String,
      required: true,
    },
    client_name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    comment: {
      type: String,
    },
    metadata: {
      client_country: { type: String, required: true },
      client_email: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
