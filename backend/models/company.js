import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    websiteUrl: {
      type: String,
      require: true,
    },

    domainName: {
      type: String,
      reuqired: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);
export default Company;
