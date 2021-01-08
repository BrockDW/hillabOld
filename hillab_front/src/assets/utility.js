import axios from "axios";
var frontEndUrl = "http://localhost:8083/";
var name = "HILLAB_JWT";

function checkForCookie() {
  var cookieInfo = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  // console.log(cookieInfo)
  if (!cookieInfo) {
    // console.log("The cookie does not exists");
    window.location.href = frontEndUrl;
  } else if (cookieInfo[2] !== "") {
    return cookieInfo[2];
    console.log("cookie exists");
  } else {
    // console.log("The cookie has reset to ''");
    alert("登录超时，请重新登录");
    window.location.href = frontEndUrl;
  }
}

function clearCookie() {
  var data = "";
  document.cookie =
    name + "=" + data + ";path=/;expries=" + "Thu, 01 Jan 1970 00:00:00 UTC";
  //window.location.href = frontEndUrl;
}

function toLong(string, limitLength) {
  if (string.length > limitLength) {
    return string.substring(0, limitLength) + "...";
  } else {
    return string;
  }
}

function sort(list, comparator) {
  console.log(comparator());
}

function getDate(curDate) {
  try {
    var month = String(curDate.getMonth() + 1).padStart(2, "0");
    var day = String(curDate.getDate()).padStart(2, "0");
    var year = curDate.getFullYear();

    var hours = String(curDate.getHours()).padStart(2, "0");
    var minutes = String(curDate.getMinutes()).padStart(2, "0");
    var seconds = String(curDate.getSeconds()).padStart(2, "0");
    var outputDate =
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
  } catch (err) {
    outputDate = curDate;
  }
  return outputDate;
}

function fetchToBackEnd(
  method,
  link,
  callBack,
  callBackFail,
  jsonObj,
  cookieInfoTwo
) {
  //alert(link);
  var okToFetch = true;
  if (cookieInfoTwo) {
    var curHeader = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookieInfoTwo,
    };
  } else {
    var curHeader = {
      "Content-Type": "application/json",
    };
  }

  if (method == "GET") {
    var options = {
      method: method,
      headers: curHeader,
    };
  } else if (method == "POST") {
    var options = {
      method: method,
      headers: curHeader,
      body: jsonObj,
    };
  } else {
    okToFetch = false;
    alert("fetch method must be get or post");
  }

  //alert(okToFetch)

  if (okToFetch) {
    fetch("http://www.scholarhills.com:8082/" + link, options)
      .then((result) => {
        // alert("STOP here!")
        if (result.status === 200) {
          return result.json();
        } else {
          result.json().then((nr) => {
            if (nr.message == "jwt token Unauthorized") {
              document.cookie =
                name + "=;path=/;expries=Thu, 01 Jan 1970 00:00:00 UTC";
              window.location.href = frontEndUrl;
            } else {
              callBackFail(nr);
            }
          });
          return null;
        }
      })
      .then((result) => {
        if (result) {
          callBack(result);
        }
      });
  }
}

function fetchToBackEndAxios(
  method,
  url,
  callBack,
  callBackFail,
  jsonObj,
  cookieInfo,
  imgHa
) {

  // console.log("json in fetch function" + jsonObj.category);

  // console.log
  var curAuth = "";
  var curContentType = "application/json";
  if (cookieInfo) {
    curAuth = "Bearer " + cookieInfo;
  }

  var curHeader = {
    "Content-Type": curContentType,
    Authorization: "Bearer " + cookieInfo,
  };
  axios({
    method: method,
    url: frontEndUrl + url,
    data: jsonObj,
    headers: curHeader,
  })
    .then((result) => {
      callBack(result.data);
      // console.log(result);
    })
    .catch((err) => {
      console.log("I am here!!", window.location.href)
      console.log(err);
      if (err.response) {
        callBackFail(err.response.data);
      } else {
        callBackFail({ message: "Connection Failed" + url});
      }
      
    });
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function checkChinese(email) {
  var re = /[\u3400-\u9FBF]/;
  return re.test(String(email).toLowerCase());
}

var functionList = {
  fetchToBackEnd,
  checkForCookie,
  clearCookie,
  getDate,
  validateEmail,
  fetchToBackEndAxios,
  frontEndUrl,
};

export default functionList;
