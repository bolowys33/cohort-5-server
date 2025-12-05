const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/db");
const userRouter = require("./src/routes/user.routes");
const authRouter = require("./src/routes/auth.routes");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./src/documentation/swagger");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});


