const db = require("../models/user_model");
const helper = require("../utils/helper");
const response = require("../utils/response");

let addAuthUser = () => {
  //owner & admin
};

let register = async (req, res, next) => {
  try {
    let data = req.body;

    let alreadyInUse = await db.findOne({ email: data.email });
    if (alreadyInUse) {
      response.throwError({ message: "email is already in use" });
    }

    data.role = "user";
    data.pass = helper.encodePass(data.pass);
    var result = await db(data).save();
    let obj = result.toObject();
    delete obj["pass"];
    if (result) {
      response.success(res, {
        message: "register success",
        status: 201,
        data: obj,
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
    var result = await db.find().select("-pass -__v");
    if (result) {
      response.success(res, { data: result });
    } else {
      response.throwError();
    }
  } catch (e) {
    next(e);
  }
};

let getAdminOrOwner = async (req, res, next) => {
  try {
    var result = await db
      .find({
        $or: [
          {
            role: "admin",
          },
          {
            role: "owner",
          },
        ],
      })
      .select("-pass -__v");
    if (result) {
      response.success(res, { data: result });
    } else {
      response.throwError();
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
        delete obj.role;

        let loginData = {
          user: obj,
          token: token,
        };
        response.success(res, { message: "login success", data: loginData });
      } else {
        response.throwError({ status: 400, message: "incorrect password" });
      }
    } else {
      response.throwError({ status: 404, message: "user not found" });
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
      response.success(res, { data: updatedData });
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
      response.success(res, { data: result, message: "deletion successful" });
    } else {
      response.throwError();
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAdminOrOwner,
  register,
  update,
  login,
  drop,
  get,
};
