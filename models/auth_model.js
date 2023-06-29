const db = require("../config/database");

exports.register = (username, email, password) => {
  return new Promise((resolve, reject) => {
    const connection = db("register_model");

    let query = `SELECT * FROM users WHERE username = ? OR email = ?`;
    connection.query(query, [username, email], (err, users) => {
      if (err) {
        connection.end();
        return reject({
          register: false,
          msg: "there are a trouble!, please try again later",
        });
      }
      if (users.length > 0) {
        connection.end();
        return reject({
          register: false,
          msg: "user already exist",
        });
      }
      let query = `INSERT INTO users (username, email, password) VALUES (?,?,?)`;
      connection.query(query, [username, email, password], (err) => {
        if (err) {
          console.log(err);
          connection.end();
          return reject({
            register: false,
            msg: "there are a trouble!, please try again later",
          });
        }
        return resolve({
          register: true,
          msg: "register was successfully",
        });
      });
    });
  });
};

exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    const connection = db("login_model");
    let query = `SELECT * FROM users WHERE email = ? OR username = ?`;
    connection.query(query, [email, email], (err, user) => {
      if (err) {
        console.log("there an error at login model", err);
        connection.end();
        return reject({
          login: false,
          msg: "there are a trouble!, please try again later",
        });
      }
      if (user.length > 0) {
        if (user[0].password === password) {
          const { password, ...userData } = user[0];
          connection.end();
          return resolve({
            login: true,
            msg: "login was successfully",
            user: userData,
          });
        } else {
          connection.end();
          return reject({
            login: false,
            msg: "user/email or password is wrong!",
          });
        }
      } else {
        connection.end();
        return reject({
          login: false,
          msg: "user doesn't exist",
        });
      }
    });
  });
};
