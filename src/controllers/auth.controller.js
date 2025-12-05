const UserModel = require("../models/user.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const signUp = async (req, res) => {
  try {
    const { name, email, password, age, phoneNumber } = req.body;

    if (!name || !email || !password || !age || !phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all required fields." });
    }

    const userExists = await UserModel.findOne({ $or: [{ email }, { phoneNumber }] });
    if (userExists) {
      return res
        .status(409)
        .json({ success: false, message: "User with given email or phone number already exists." });
    }

    const newUser = new UserModel(req.body);
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User created successfully", data: newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User with email address not found" });
    }

    const isPasswordValid = await argon.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const payload = { userId: user._id, email: user.email, isAdmin: user.isAdmin };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { signUp, login };
