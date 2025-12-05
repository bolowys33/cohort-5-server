const express = require("express");
const { signUp, login } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", login);

module.exports = authRouter;
