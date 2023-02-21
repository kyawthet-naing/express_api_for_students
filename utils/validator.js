const ObjectId = require("mongoose").Types.ObjectId;
const Helper = require("./helper");

///schema is Joi Object Schema
exports.validateBody = (schema) => {
  return (req, res, next) => {
    let result = schema.validate(req.body);
    if (result.error) {
      let errMsg = result.error.details[0].message.split('"').join("");
      let err = new Error(errMsg);
      err.status = 422;
      next(err);
    } else {
      next();
    }
  };
};

exports.validateMongoId = () => {
  return (req, res, next) => {
    ///req.params.id, so route params must be "/:id"
    if (!ObjectId.isValid(req.params.id)) {
      next(new Error(`invalid mongo id`));
    } else {
      next();
    }
  };
};

exports.validateQuery = (queryName) => {
  return (req, res, next) => {
    if (req.query[`${queryName}`] == undefined) {
      next(new Error("invalid request data"));
    } else {
      next();
    }
  };
};

exports.validateToken = () => {
  return (req, res, next) => {
    if (!req.headers.authorization) {
      let err = new Error("Invalid Token");
      err.status = 498;
      next(err);
      return;
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token) {
      try {
        let user = Helper.decodeToken(token);
        if (user) {
          req.user = user;
          next();
        } else {
          let err = new Error("Invalid Token");
          err.status = 498;
          next(err);
        }
      } catch (error) {
        let err = new Error("Invalid Token");
        err.status = 498;
        next(err);
      }
    } else {
      let err = new Error("Invalid Token");
      err.status = 498;
      next(err);
    }
  };
};

///role must be array ['owner'], for multi role access
///role must be array ['owner','admin']
exports.validateRole = (role) => {
  return (req, res, next) => {
    let valid;

    if (!req.headers.authorization) {
      let err = new Error("Invalid Token");
      err.status = 498;
      next(err);
      return;
    }
    let token = req.headers.authorization.split(" ")[1];
    req.user = Helper.decodeToken(token);

    for (const rol of role) {
      if (req.user.role == rol) {
        valid = true;
      }
    }

    if (valid) {
      next();
    } else {
      let err = new Error("You don't have this permission");
      err.status = 403;
      next(err);
    }
  };
};
