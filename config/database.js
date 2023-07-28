const config = require("./config");
const db = require("mysql2");

const mode = process.env.NODE_ENV;

const connection = db.createConnection(config[mode]);

const initQuery = `

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(50) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  avatar VARCHAR(255) NOT NULL DEFAULT 'https://avatars.dicebear.com/api/bottts/default.svg',
  country VARCHAR(50) NOT NULL DEFAULT 'Vietnam',
  created_at DATETIME NOT NULL DEFAULT NOW()
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rooms (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  avatar VARCHAR(255) NOT NULL DEFAULT 'https://avatars.dicebear.com/api/bottts/default.svg',
  isPrivate VARCHAR(10) NOT NULL,
  private_key VARCHAR(255),
  live VARCHAR(10) NOT NULL DEFAULT false,
  topic VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  max INT NOT NULL,
  country VARCHAR(50) NOT NULL DEFAULT 'Vietnam',
  created_at DATETIME NOT NULL DEFAULT NOW(),
  owner_id INT NOT NULL,
  CONSTRAINT const_rooms
  FOREIGN KEY (owner_id)
  REFERENCES users(id)
  ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB;
`;

// DROP TRIGGER IF EXISTS TR_UpRmCountry;
//   CREATE TRIGGER TR_UpRmCountry
//   AFTER UPDATE ON users
//   FOR EACH ROW
//   BEGIN
//     UPDATE rooms SET country = NEW.country WHERE owner_id = NEW.id;
//   END;

connection.connect((err) => {
  if (err) {
    console.log("failed to connect to database");
    console.log(err);
  } else {
    connection.query(initQuery, function (error) {
      if (error) {
        console.log("error while creating tables");
        console.log(error);
      } else {
        console.log("tables was created");
      }
    });
  }
});

module.exports = (from) => {
  const connection = db.createConnection(config[mode]);
  connection.connect(function (err) {
    if (err) {
      console.log(`connectionRequest Failed ${err.stack} from ${from}`);
    } else {
      console.log(`DB connectionRequest Successful ${connection.threadId} from ${from}`);
    }
  });
  return connection;
};
