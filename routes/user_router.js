const Router = require("express").Router();
const { updateProfile } = require("../controllers/user_control");
const { verify } = require("./isUser");

Router.post("/update-profile", verify, updateProfile);

module.exports = Router;
