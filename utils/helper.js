const limitCount = Number(process.env.LIMIT_COUNT);
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

//hash pass return
let encodePass = (pass) => bcrypt.hashSync(pass, 10);
///boolean return
let comparePass = (pass, hashPass) => bcrypt.compareSync(pass, hashPass);

//token return
let makeToken = (payload) => jwt.sign(payload, process.env.SECRET_KEY);
//decoded data return
let decodeToken = (token) => jwt.decode(token, process.env.SECRET_KEY);

///pagination
let skipCount = (req) => {
  let count = 0;
  let params = req.query;

  ///if params contain page
  ///count assign
  if (params.page) {
    try {
      count =
        Number(params.page) <= 0
          ? 0
          : (Number(req.query.page) - 1) * limitCount;
    } catch (_) {
      count = 0;
    }
  } else {
    count = 0;
  }
  return count;
};

module.exports = {
  skipCount,
  limitCount,
  comparePass,
  encodePass,
  makeToken,
  decodeToken,
};
