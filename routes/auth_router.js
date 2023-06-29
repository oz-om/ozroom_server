const Router = require("express").Router();
const { register, login, logout } = require("../controllers/auth_control");

Router.post("/register", register);
Router.post("/login", login);
Router.get("/logout", logout);

module.exports = Router;
