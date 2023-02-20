require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 6001;
const fileUpload = require("express-fileupload");
const path = require("path");
///part of mongo
const mongoose = require("mongoose");
const dbURL = `mongodb://127.0.0.1:27017/${process.env.DBNAME}`;

mongoose.set("strictQuery", true);
mongoose.connect(dbURL, {});

///https://expressjs.com/en/starter/static-files.html
const uploadedFiles = express.static(path.join(__dirname, "uploads"));
app.use(fileUpload());
app.use(express.json());

const contactRouter = require("./routes/contact_route");
const userRouter = require("./routes/user_route");
app.use("/uploads", uploadedFiles);

app.use("/contact", contactRouter);
app.use("/user", userRouter);

app.use((err, req, res, next) => {
  var code = res.statusCode || 500;
  res.status(code == 200 ? 500 : code).json({
    status: false,
    message: err.message,
    data: null,
  });
});

app.listen(port, () => console.log(`Server is running at ${port}`));
