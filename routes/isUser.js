const jwt = require("jsonwebtoken");
const { getUserInfo } = require("../models/user_model");
exports.isUser = (req, res) => {
  const key = process.env.JWT_SECRET;
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, key, (err, user) => {
      if (err) {
        return res.json({
          loggedIn: false,
        });
      }
      getUserInfo(user.id, user.email)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });
  } else {
    res.json({
      loggedIn: false,
    });
  }
};

exports.verify = (req, res, next) => {
  const key = process.env.JWT_SECRET;
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, key, (err, user) => {
      if (err) {
        return res.json({
          login: false,
        });
      }
      getUserInfo(user.id, user.email).then((user) => {
        req.userInfo = user.user;
        next();
      });
    });
  }
};
