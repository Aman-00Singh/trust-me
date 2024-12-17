import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { URL } from "url";
import validator from "validator";
import Company from "../models/company.js";

export const signupController = async (req, res) => {
  const { websiteUrl, companyName, email, password } = req.body;
  if (!websiteUrl || !companyName || !email || !password) {
    console.log(websiteUrl, companyName, email, password);
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!validator.isURL(websiteUrl)) {
    return res.status(400).json({ message: "Invalid website URL" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  try {
    const domainName = getRootDomain(websiteUrl);
    const emailDomain = email.split("@")[1];
    if (domainName !== emailDomain) {
      return res
        .status(400)
        .json({ message: "Domain name does not match with email address" });
    }
    const existingDomain = await Company.findOne({ domainName });
    if (existingDomain) {
      return res.status(400).json({ message: "Domain name already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newDomain = new Company({
      websiteUrl,
      companyName,
      domainName: domainName,
      email: email,
      password: hashedPassword,
    });
    await newDomain.save();
    return res
      .status(201)
      .json({ message: "Company registered successfully", newDomain });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error from signup" });
  }
};

export const loginCntroller = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingCompany = await Company.findOne({ email });
    if (!existingCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingCompany.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(existingCompany._id);
    const refreshToken = generateRefreshToken(existingCompany._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.json({ accessToken });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error from login" });
  }
};

export const logoutController = async (req, res) => {
  try {
    await res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error from logout" });
  }
};

//generate access token
function generateAccessToken(existingCompanyId) {
  try {
    const accessToken = jwt.sign(
      { companyId: existingCompanyId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    return accessToken;
  } catch (error) {
    console.log(error);
  }
}

// generate refresh token
function generateRefreshToken(existingCompanyId) {
  try {
    const refreshToken = jwt.sign(
      { companyId: existingCompanyId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15d" }
    );
    return refreshToken;
  } catch (error) {
    console.log(error);
  }
}

// Extract root domain from website URL
const getRootDomain = (url) => {
  const parsedUrl = new URL(url);
  const hostname = parsedUrl.hostname;
  const parts = hostname.split(".");
  return parts.length > 2 ? parts.slice(-2).join(".") : hostname;
};
