const fs = require("fs");

function storeImage(storeImgName, type, data, folderName, complexity) {
  storeImgName = storeImgName.replace(/ /g,"_");
  var curImgNum = Math.floor(complexity * 100 * 10000 + Math.random() * 900000);
  
  if (type == "image/jpeg") {
    var base64Data = data.replace(/^data:image\/jpeg;base64,/, "");
  } else if (type == "image/png") {
    var base64Data = data.replace(/^data:image\/png;base64,/, "");
  }

  var imgDirName = __dirname + "/" + folderName + "/";

  fs.writeFile(imgDirName + curImgNum + "_"+storeImgName, base64Data, "base64", function (err) {
    console.log(err);
  });

  return curImgNum + "_"+storeImgName;
}


module.exports={storeImage}
