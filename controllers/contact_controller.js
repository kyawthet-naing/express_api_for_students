const db = require("../models/contact_model");
const response = require("../utils/response");

let create = async (req, res, next) => {
  try {
    let data = req.body;
    data.author = req.user._id;
    var result = await db(data).save();

    if (result) {
      response.success(res, {
        message: "new contact created",
        status: 201,
        data: result,
      });
    } else {
      response.throwError({
        message: "Opps! Something is not right!",
        status: 502,
      });
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
      response.success(res, {
        message: "contact data",
        status: 200,
        data: result,
      });
    } else {
      response.throwError({ status: 500 });
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
      response.success(res, {
        status: 200,
        data: updatedData,
      });
    } else {
      response.throwError();
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
      response.success(res, {
        message: "contact delete success",
        status: 200,
        data: result,
      });
    } else {
      response.throwError();
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
