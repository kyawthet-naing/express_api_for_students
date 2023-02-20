const db = require("../models/contact_model");

let create = async (req, res, next) => {
  try {
    let data = req.body;
    data.author = req.user._id;
    var result = await db(data).save();

    if (result) {
      res.status(200).json({
        status: true,
        message: "new data created",
        data: result,
      });
    } else {
      throw new Error("Server error");
    }
  } catch (e) {
    next(e);
  }
};

let get = async (req, res, next) => {
  try {
    var result = await db
      .find()
      .populate({ path: "author", select: "name email" });
    if (result) {
      res.status(200).json({
        status: true,
        message: "contact data",
        data: result,
      });
    } else {
      throw new Error("Server error");
    }
  } catch (e) {
    next(e);
  }
};

let update = async (req, res, next) => {
  try {
    const options = req.params;
    var result = await db.findByIdAndUpdate(options.id, req.body);
    if (result) {
      let updatedData = await db.findById(result._id);
      res.status(200).json({
        status: true,
        message: "new data updated",
        data: updatedData,
      });
    } else {
      throw new Error("Server error");
    }
  } catch (e) {
    next(e);
  }
};

let drop = async (req, res, next) => {
  try {
    const options = req.params;
    var result = await db.findByIdAndDelete(options.id);
    if (result) {
      res.status(200).json({
        status: true,
        message: "data deleted",
        data: result,
      });
    } else {
      throw new Error("Server error");
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  update,
  drop,
  get,
};
