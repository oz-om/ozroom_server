const auth_model = require("../models/auth_model");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { user, email, pass } = req.body;
  auth_model
    .register(user, email, pass)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.login = (req, res) => {
  const { user, pass } = req.body;
  auth_model
    .login(user, pass)
    .then((result) => {
      let token = jwt.sign(result.user, process.env.JWT_SECRET, { expiresIn: "120h" });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 5,
      });
      res.status(200).send(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.logout = (req, res) => {
  res.cookie("token", "outOfDate", {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    expires: new Date(Date.now() + 5 * 1000),
  });
  res.send({
    logout: true,
  });
};
