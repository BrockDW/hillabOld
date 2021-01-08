const mysql = require("mysql");

const dbName = "hillabBD";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "password"
});

let sql = "SHOW DATABASES LIKE" + "'" + dbName + "'";
db.query(sql, (err, result) => {
  if (err) {
    throw err;
  }
  if (result.length == 0) {
    let sql =
      "CREATE DATABASE " +
      dbName +
      " CHARACTER SET utf8 COLLATE utf8_general_ci;";
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result, "Database created");
    });
  }

  db.changeUser({ database: dbName }, (err) => {
    if (err) throw err;
  });

  var userExistingColumn = {
    username: { type: "VARCHAR(255)" },
    password: { type: "text" },
    nickname: { type: "text" },
    relatedTopic: { type: "text" },
    profileImg: {type: "VARCHAR(255)"}
  };

  let checkUserSql =
    "CREATE TABLE IF NOT EXISTS users(userID int AUTO_INCREMENT, username VARCHAR(255) NOT NULL UNIQUE, profileImg VARCHAR(255), password text, nickname text, relatedTopic text, PRIMARY KEY(userID))";
  db.query(checkUserSql, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.warningCount == 0) {
        console.log("user table");
        console.log(result);
      } else {
        for (var key in userExistingColumn){
          var curCol = key;
          let checkColumnExistsSql = "SELECT " + curCol + " FROM users";
          db.query(checkColumnExistsSql, (err, result) => {
            if (err) {
              var missingColumn = err.sql.split(" ")[1];

              let curAddColumnSQL = "ALTER TABLE users ADD COLUMN " + missingColumn + " " + userExistingColumn[missingColumn].type;

              db.query(curAddColumnSQL, (err, result) => {
                if (err) {

                } else {
                  console.log(missingColumn, "is added");
                }
              });

              console.log(curAddColumnSQL);
            } else {
            }
          });
        }
      }
    }
  });
  var insertString = 'INSERT INTO `users`(`username`, `password`, `nickname`, `relatedTopic`) VALUES ("brockdw","123456789","bdw","[]")'
  // let createProfileSql =
  //   "CREATE TABLE IF NOT EXISTS profile(profileID int AUTO_INCREMENT, username text, bio text, profileImg text, userID int, FOREIGN KEY (userID) REFERENCES users(userID), PRIMARY KEY(profileID))";
  // db.query(createProfileSql, (err, result) => {
  //   if (err) {
  //     throw err;
  //   } else {
  //     if (result.warningCount == 0) {
  //       console.log("profile table");
  //       console.log(result);
  //     } else {
  //     }
  //   }
  // });
});
module.exports = db;
