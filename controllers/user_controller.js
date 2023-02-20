const db = require("../models/user_model");
const helper = require("../utils/helper");

let addAuthUser = () => {
  //owner & admin
};

let register = async (req, res, next) => {
  try {
    let data = req.body;
    data.role = "user";
    // let token  = helper.makeToken()
    data.pass = helper.encodePass(data.pass);
    var result = await db(data).save();
    let obj = result.toObject();
    delete obj["pass"];
    if (result) {
      res.status(200).json({
        status: true,
        message: "new account created",
        data: obj,
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
    var result = await db.find().select("-pass -__v");
    if (result) {
      res.status(200).json({
        status: true,
        message: "user data",
        data: result,
      });
    } else {
      throw new Error("Server error");
    }
  } catch (e) {
    next(e);
  }
};

let login = async (req, res, next) => {
  try {
    let data = req.body;
    let email = data.email;
    let pass = data.pass;
    let user = await db.findOne({ email: email });

    if (user) {
      if (helper.comparePass(pass, user.pass)) {
        let obj = user.toObject();
        delete obj["pass"];

        let token = helper.makeToken(obj);
        let authData = {
          user: user,
          token: token,
        };
        res.status(200).json({
          status: true,
          message: "new data updated",
          data: authData,
        });
      } else {
        res.status(400);
        throw new Error("incorrect password");
      }
    } else {
      res.status(404);
      throw new Error("user not found");
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
  register,
  update,
  login,
  drop,
  get,
};
