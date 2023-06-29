const Router = require("express").Router();
const { getRooms, createRoom, getMyRooms, updateRoom, deleteRoom, initRoom, killRoom, isRoomOnline } = require("../controllers/rooms_control");
const { verify } = require("./isUser");

Router.post("/create_room", verify, createRoom);
Router.get("/get_rooms", verify, getRooms);
Router.get("/get_my_rooms", verify, getMyRooms);
Router.post("/update_room", verify, updateRoom);
Router.post("/delete_room", verify, deleteRoom);
Router.post("/init_room", verify, initRoom);
Router.post("/is_room_online", verify, isRoomOnline);
Router.post("/kill_room", verify, killRoom);

module.exports = Router;
