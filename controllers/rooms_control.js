const { createRoom, getRooms, getMyRooms, updateRoom, deleteRoom, initRoom, killRoom, isRoomOnline } = require("../models/rooms_model");

exports.createRoom = (req, res) => {
  let newRoom = {
    ...req.body,
    owner_id: req.userInfo.id,
    country: req.userInfo.country,
    live: false,
  };
  createRoom(newRoom)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getMyRooms = (req, res) => {
  getMyRooms(req.userInfo.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getRooms = (req, res) => {
  getRooms(req.userInfo.country)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.updateRoom = (req, res) => {
  let owner_id = req.userInfo.id;
  let updatedRoom = { ...req.body, owner_id };
  updateRoom(updatedRoom)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.deleteRoom = (req, res) => {
  let roomInfo = {
    id: req.body.id,
    owner_id: req.userInfo.id,
  };
  deleteRoom(roomInfo)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.initRoom = (req, res) => {
  let roomInfo = {
    owner_id: req.userInfo.id,
    id: req.body.id,
  };
  initRoom(roomInfo)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.killRoom = (req, res) => {
  let roomInfo = {
    owner_id: req.userInfo.id,
    id: req.body.id,
  };
  killRoom(roomInfo)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.isRoomOnline = (req, res) => {
  isRoomOnline(req.body.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
