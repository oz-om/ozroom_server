const db = require("../config/database");

exports.createRoom = (room) => {
  return new Promise((resolve, reject) => {
    let connection = db("createRoom_model");
    let query = `INSERT INTO rooms (owner_id, name, avatar, isPrivate, private_key, description, topic, max, country, live) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    connection.query(query, [room.owner_id, room.name, room.avatar, room.isPrivate, room.private_key, room.description, room.topic, room.max, room.country, room.live], (err, result) => {
      if (err) {
        console.log(err);
        connection.end();
        return reject({
          createRoom: false,
          msg: "there are a trouble!, please try again later",
        });
      }
      connection.end();
      resolve({
        createRoom: true,
        roomId: result.insertId,
        msg: "room was created successfully",
      });
    });
  });
};

exports.getRooms = (country) => {
  return new Promise((resolve, reject) => {
    let connection = db("getRooms_model");
    let query = `SELECT * FROM rooms WHERE country = ? AND live = 1 ORDER BY created_at`;
    connection.query(query, [country], (err, rooms) => {
      if (err) {
        connection.end();
        return reject({
          getRooms: false,
          msg: "there are a trouble!, please try again later",
        });
      }
      connection.end();
      resolve({
        getRooms: true,
        rooms,
      });
    });
  });
};

exports.getMyRooms = (userId) => {
  return new Promise((resolve, reject) => {
    let connection = db("getMyRooms_module");
    let query = `SELECT rooms.* FROM rooms JOIN users ON users.id = rooms.owner_id WHERE users.id = ?`;
    connection.query(query, [userId], (err, result) => {
      if (err) {
        console.log(err);
        connection.end();
        return reject({
          getMyRooms: false,
          error: "there are a trouble!, please try again later",
        });
      }
      connection.end();
      resolve({
        getMyRooms: true,
        myRooms: result,
      });
    });
  });
};

exports.updateRoom = (updateRoom) => {
  let { name, avatar, topic, description, max, isPrivate, private_key, id, owner_id } = updateRoom;
  return new Promise((resolve, reject) => {
    let connection = db("updatedRoom module");
    let query = `UPDATE rooms SET name = ?, avatar = ?, topic = ?, description = ?, max = ?, isPrivate = ?, private_key = ? WHERE id = ? AND owner_id = ?`;
    connection.query(query, [name, avatar, topic, description, max, isPrivate, private_key, id, owner_id], (err) => {
      if (err) {
        connection.end();
        console.log(err);
        return reject({
          updateRoom: false,
          err: "there are a trouble!, please try again later",
        });
      }
      connection.end();
      resolve({
        updateRoom: true,
        msg: "Room Update successfully",
      });
    });
  });
};

exports.deleteRoom = (room) => {
  return new Promise((resolve, reject) => {
    let connection = db("deleteRoom module");
    let query = `DELETE FROM rooms WHERE id = ? AND owner_id = ?`;
    connection.query(query, [room.id, room.owner_id], (err, res) => {
      if (err) {
        connection.end();
        console.log(err);
        return reject({
          deleteRoom: false,
          err: "there are a trouble!, please try again later",
        });
      }
      connection.end();
      resolve({
        deleteRoom: true,
        msg: "Room deleted successfully",
      });
    });
  });
};

exports.initRoom = (room) => {
  return new Promise((resolve, reject) => {
    let connection = db("initRoom module");
    let query = `UPDATE rooms SET live = 1 WHERE id = ? AND owner_id = ?`;
    connection.query(query, [room.id, room.owner_id], (err, result) => {
      if (err) {
        connection.end();
        console.log(err);
        return reject({
          initRoom: false,
          err: "there are a trouble!, please try again later",
        });
      }

      if (result.affectedRows) {
        connection.end();
        return resolve({
          initRoom: true,
          msg: "Room in live",
        });
      }

      reject({
        initRoom: false,
        err: "room not found",
      });
    });
  });
};

exports.killRoom = (room) => {
  return new Promise((resolve, reject) => {
    let connection = db("killRoom module");
    let query = `UPDATE rooms SET live = 0 WHERE id=? AND owner_id=?`;
    connection.query(query, [room.id, room.owner_id], (err) => {
      if (err) {
        connection.end();
        return reject({
          killRoom: false,
          err: "there are a trouble!, please try again later",
        });
      }
      connection.end();
      resolve({
        killRoom: true,
        msg: "room was killed",
      });
    });
  });
};

exports.isRoomOnline = (roomID) => {
  return new Promise((resolve, reject) => {
    let connection = db("isRoomOnline module");
    let query = `SELECT (live) FROM rooms WHERE rooms.id = ? `;
    connection.query(query, [roomID], (err, result) => {
      if (err) {
        connection.end();
        console.log(err);
        return reject({
          isOnline: false,
          err: "there are a trouble!, please try again later",
        });
      }

      if (+result[0].live) {
        connection.end();
        return resolve({
          isOnline: true,
          msg: "room is available",
        });
      }

      connection.end();
      reject({
        isOnline: false,
        err: "room is not available",
      });
    });
  });
};
