const jwt = require("jsonwebtoken");

exports.isUser = (req, res) => {
  const key = process.env.JWT_SECRET;
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, key, (err, user) => {
      if (err) {
        return res.json({
          login: false,
        });
      }
      res.json({
        loggedIn: true,
        user,
      });
    });
  } else {
    res.json({
      login: false,
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
      req.userInfo = user;
      next();
    });
  }
};
