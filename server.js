require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectDB = require("./db/connect");
const port = process.env.PORT || 3500;
const mongoose = require("mongoose");

// Connect to MongoDB
connectDB();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const packagesRouter = require("./routes/api/package");

const authenticateUser = require("./middleware/authentication");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
// app.use("/", indexRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, usersRouter);
app.use("/api/v1/packages", authenticateUser, packagesRouter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.get("/", (req, res) => {
  res.send("zfx api");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`Server is listening on ${port}...`));
});
