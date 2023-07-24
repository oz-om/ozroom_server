const db = require("../config/database");

exports.updateProfile = (updates) => {
  const { id, avatar, country } = updates;
  return new Promise((resolve, reject) => {
    let connection = db("update_profile model");
    let query = `UPDATE users SET avatar = ?, country = ? WHERE id = ?`;
    connection.query(query, [avatar, country, id], (err) => {
      if (err) {
        connection.end();
        console.log(err);
        return reject({
          updated: false,
          error: "something went wrong, pleas try agin",
        });
      }
      connection.end();
      resolve({
        updated: true,
        msg: "update success",
      });
    });
  });
};

exports.getUserInfo = (userId, email) => {
  return new Promise((resolve, reject) => {
    let connection = db("getUserInfo_model");
    let query = `SELECT * FROM users WHERE email = ?  AND id = ?`;
    connection.query(query, [email, userId], (err, userInfo) => {
      if (err) {
        connection.end();
        return reject({
          loggedIn: false,
          error: "something went wrong pleas try again",
        });
      }
      if (userInfo.length) {
        connection.end();
        const { created_at, password, ...user } = userInfo[0];
        return resolve({
          loggedIn: true,
          user,
        });
      }
      connection.end();
      return reject({
        loggedIn: false,
        error: "user not exist",
      });
    });
  });
};
