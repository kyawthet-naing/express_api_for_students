const ObjectId = require("mongoose").Types.ObjectId;
const Helper = require("./helper");

///schema is Joi Object Schema
exports.validateBody = (schema) => {
  return (req, res, next) => {
    let result = schema.validate(req.body);
    if (result.error) {
      let errMsg = result.error.details[0].message.split('"').join("");
      next(new Error(errMsg));
    } else {
      next();
    }
  };
};

exports.validateMongoId = () => {
  return (req, res, next) => {
    ///req.params.id, so route params must be "/:id"
    if (!ObjectId.isValid(req.params.id)) {
      next(new Error(`invalid request data`));
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
      next(new Error("Tokenization Error"));
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
          next(new Error("Tokenization Error"));
        }
      } catch (error) {
        next(new Error("Tokenization Error"));
      }
    } else {
      next(new Error("Tokenization Error"));
    }
  };
};
