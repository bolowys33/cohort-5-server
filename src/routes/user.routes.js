const express = require("express");
const {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/user/:id", getSingleUser);
userRouter.patch("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

module.exports = userRouter;
