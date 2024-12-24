import Rating from "../models/rating";
import Review from "../models/review";

export const ratingController = async (req, res) => {
  const { filter, includeReviews = "false", product_id, sortBy } = req.query;

  try {
    let products = [];
    let reviewsData = [];
    // check it
    if (filter === "all_products") {
      products = await Rating.find({ company_id }).sort({
        average_rating: sortBy === "rating_desc" ? -1 : 1,
      });
    } else if (filter === "product_id" && product_id) {
      const productRating = await Rating.findOne({ product_id });
      if (!productRating) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (includeReviews === "true") {
        reviewsData = await Review.find({ product_id }).sort({
          rating: sortBy === "rating_desc" ? -1 : 1,
        });
        productRating.reviews = reviewsData;
      }

      return res.status(200).json({
        product_id: productRating.product_id,
        average_rating: productRating.average_rating,
        reviews: productRating.reviews || [],
      });
    } else {
      return res.status(400).json({
        message: "Invalid filter or missing product_id from ratingController",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
