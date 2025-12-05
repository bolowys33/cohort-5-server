const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});


