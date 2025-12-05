const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  getProfile,
  updateProfile,
  deleteAccount,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const userRouter = express.Router();

userRouter.use(authMiddleware);

userRouter.get("/", roleMiddleware, getAllUsers);
userRouter.get("/user/:id", roleMiddleware, getSingleUser);
userRouter.get("/user", getProfile);
userRouter.patch("/update", updateProfile);
userRouter.delete("/delete", deleteAccount);

module.exports = userRouter;
