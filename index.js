const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");
const filesUpload = require("express-fileupload");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");

const clientUrl = process.env.CLIENT_URL;

const io = socket(server, {
  cors: {
    origin: clientUrl,
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});
io.on("connection", (client) => {
  client.emit("welcome", client.id);

  require("./chat/chat")(client, io);

  client.on("disconnect", () => {
    console.log("\nclint leave");
  });
});

app.use(
  cors({
    origin: [clientUrl, "https://localhost:5173"],
    credentials: true,
  }),
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: true }),
  filesUpload(),
);
app.set("trust proxy", 1);

const routes = {
  verify: require("./routes/isUser").verify,
  auth_router: require("./routes/auth_router"),
  rooms_router: require("./routes/rooms_router"),
  upload: require("./routes/upload"),
};
app.use("/", routes.auth_router);
app.use("/", routes.rooms_router);
app.use("/", verify, routes.upload);

app.get("/init", require("./routes/isUser").isUser);

const PORT = process.env.PORT || 4011;
server.listen(PORT, () => {
  console.log("server run at 4011");
});
