const UserModel = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password -__v");
    return res
      .status(200)
      .json({ success: true, message: "Users retrieved successfully", data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    const user = await UserModel.findById(id).select("-password -__v");
    console.log("got here");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User retrieved successfully", data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await UserModel.findById(id).select("-password -__v");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Profile retrieved successfully", data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    const { id } = req.user;

    const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true }).select(
      "-password -__v"
    );
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User updated successfully", data: updatedUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.user;

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { getAllUsers, getSingleUser, updateProfile, deleteAccount, getProfile };
