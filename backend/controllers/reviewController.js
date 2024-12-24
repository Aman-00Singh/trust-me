import Review from "../models/reviewModel.js";
import Rating from "../models/ratingModel.js";

export const reviewController = async (req, res) => {
  const { product_id } = req.params;
  const { company_id, client_id, client_name, rating, comment, metadata } =
    req.body;

  try {
    if (rating < 1 || rating > 10) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 10" });
    }

    const newReview = new Review({
      product_id,
      company_id,
      client_id,
      client_name,
      rating,
      comment,
      metadata,
    });
    await newReview.save();

    const ratingData = await Rating.findOne({ product_id });
    if (ratingData) {
      const newtotalRating =
        ratingData.average_rating * ratingData.total_reviews + rating;
      const newtotalReviews = ratingData.total_reviews + 1;
      ratingData.average_rating = newtotalRating / newtotalReviews;
      ratingData.total_reviews = newtotalReviews;
      await ratingData.save();
    } else {
      const newRating = new Rating({
        product_id,
        company_id,
        average_rating: rating,
        total_reviews: 1,
      });
      await newRating.save();
    }

    return res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error from review controller" });
  }
};
