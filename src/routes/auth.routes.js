const express = require("express");
const { signUp, login } = require("../controllers/auth.controller");

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 *
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - age
 *               - phoneNumber
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: example@email.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: strongpassword123
 *               age:
 *                 type: integer
 *                 description: User's age
 *                 example: 30
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number
 *                 example: "+1234567890"
 *
 * /auth/signin:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: example@email.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: strongpassword123
 */

authRouter.post("/signup", signUp);
authRouter.post("/signin", login);

module.exports = authRouter;
