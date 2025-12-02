const express = require("express");
const UserModel = require("../models/user.model");

const createUser = async (req, res) => {
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

    const newUser = await new UserModel(req.body);
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User created successfully", data: newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

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

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }
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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { createUser, getAllUsers, getSingleUser, updateUser, deleteUser };
