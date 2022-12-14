require("dotenv").config();
const express = require("express");
const app = express();
app.disable("x-powered-by");
const userRouter = require("./api/users/user.router")

app.use(express.json());
app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server is up and running", process.env.APP_PORT );
});
