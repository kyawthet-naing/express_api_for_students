const uuid = require("uuid");

exports.save = (req, res, next) => {
  try {
    let file = req.files.cover;
    var ext = file["name"].toString().split(".");
    let name = `${uuid.v4()}.${ext[ext.length - 1]}`;
    file.mv(`./uploads/${name}`);
    req.body.cover = `/uploads/${name}`;
    next();
  } catch (e) {
    ///if file not found
    next();
  }
};
