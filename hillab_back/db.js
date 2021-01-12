const mysql = require("mysql");
const fs = require("fs");
const csv = require("csv-parser");

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
    profileImg: { type: "VARCHAR(255)" },
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
        for (var key in userExistingColumn) {
          var curCol = key;
          let checkColumnExistsSql = "SELECT " + curCol + " FROM users";
          db.query(checkColumnExistsSql, (err, result) => {
            if (err) {
              var missingColumn = err.sql.split(" ")[1];

              let curAddColumnSQL =
                "ALTER TABLE users ADD COLUMN " +
                missingColumn +
                " " +
                userExistingColumn[missingColumn].type;

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

  var volExistingColumn = {
    word: { type: "VARCHAR(255)" },
    syntacticCategory: { type: "VARCHAR(255)" },
    chinese: { type: "text" },
    englishExplanation: { type: "text" },
    sampleSentence: { type: "text" },
    sentenceTranslation: { type: "text" },
    level: { type: "int" },
  };

  let checkVolSql =
    "CREATE TABLE IF NOT EXISTS \
      vols(volID int AUTO_INCREMENT, \
      word VARCHAR(255) NOT NULL UNIQUE, \
      syntacticCategory VARCHAR(255), \
      chinese text, \
      englishExplanation text, \
      sampleSentence text, \
      sentenceTranslation text, \
      PRIMARY KEY(volID))";
  db.query(checkVolSql, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.warningCount == 0) {
        console.log("vol table");
        console.log(result);
      } else {
        for (var key in volExistingColumn) {
          var curCol = key;
          let checkColumnExistsSql = "SELECT " + curCol + " FROM vols";
          db.query(checkColumnExistsSql, (err, result) => {
            if (err) {
              var missingColumn = err.sql.split(" ")[1];

              let curAddColumnSQL =
                "ALTER TABLE vols ADD COLUMN " +
                missingColumn +
                " " +
                volExistingColumn[missingColumn].type;

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

        var okToAdd = true;
        
        if(okToAdd){
          var resultCSV = [];

          fs.createReadStream("./assets/vols.csv")
            .pipe(csv())
            .on("data", (row) => {
              resultCSV.push(row);
            })
            .on("end", () => {
              // console.log(resultCSV);
              var insertVolsSql =
                "INSERT INTO Vols \
              (word, syntacticCategory, chinese, englishExplanation, \
                sampleSentence, sentenceTranslation, level) VALUES ";
  
              for (var i = 0; i < resultCSV.length; i++) {
                var curRow = resultCSV[i];
                insertVolsSql +=
                  '( "' +
                  curRow.word +
                  '", ' +
                  '"' +
                  curRow.syntacticCategory +
                  '", ' +
                  '"' +
                  curRow.chinese +
                  '","' +
                  curRow.englishExplanation +
                  '", "' +
                  curRow.sampleSentence +
                  '", "' +
                  curRow.sentenceTranslation +
                  '", ' +
                  curRow.difficulty +
                  "),";
              }
              insertVolsSql = insertVolsSql.slice(0, insertVolsSql.length - 1);
              db.query(insertVolsSql, (err, result) => {
                if (err) {
                  console.log(err);
                  console.log("csv转sql时发生错误");
                } else {
                  console.log(result);
                  console.log("csv转sql成功");
                }
              });
              console.log(insertVolsSql);
            });
        }
      }
    }
  });
});

// function toCSV(json, keys) {
//   // json = Object.values(json);
//   var csv = "";
//   // var keys = (json[0] && Object.keys(json[0])) || [];
//   console.log("this is my keys", keys);
//   csv += keys.join(",") + "\n";
//   for (var line of json) {
//     // console.log(keys.map(key => {
//     //   return '"' + line[key] + '"'
//     // }).join(","));
//     csv += keys.map(key => {
//       return '"' + line[key] + '"'
//     }).join(",") + "\n";
//   }
//   return csv;
// }

// var resultCSV = toCSV(sampleVol, [
//   "difficulty",
//   "word",
//   "syntacticCategory",
//   "chinese",
//   "englishExplanation",
//   "sampleSentence",
//   "sentenceTranslation"
// ]);
// "0","vituperation","n","辱骂","","If two paranoias living in different surroundings meet, then nothing left but quarrel and \
// vituperation.","在截然不同的环境下生活的两个偏执的人相遇了，那就只剩下争执和谩骂了。"

// // console.log(resultCSV);

// fs.writeFile("./assets/vols.csv", resultCSV, 'utf8', (err)=>{
//   console.log(err);
// });

module.exports = db;
