// 交易流水号 UUID
export function generateUUID() {
  var d = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;

}
// 显示日期在页面上  yyyy-MM-dd
export function getDate() {
  var date = new Date();
  //年
  var year = date.getFullYear();
  //月
  var month = date.getMonth() + 1;
  //日
  var day = date.getDate();
  //时
  var hh = date.getHours();
  //分
  var mm = date.getMinutes();
  //秒
  var ss = date.getSeconds();
  var curDate = year;
  if (month > 9) {
    curDate = curDate + "-" + month;
  } else {
    curDate = curDate + "-0" + month;
  }
  if (day > 9) {
    curDate = curDate + "-" + day;
  } else {
    curDate = curDate + "-0" + day;
  }
  return curDate

}
export function getTime() {
  var date = new Date();
  var hh = date.getHours();
  //分
  var mm = date.getMinutes();
  //秒
  var ss = date.getSeconds();
  var curTime = hh;
  if (hh > 9) {
    curTime = curTime;
  } else {
    curTime = "0";
  }
  if (mm > 9) {
    curTime = curTime + ":" + mm;
  } else {
    curTime = curTime + ":0" + mm;
  }
  if (ss > 9) {
    curTime = curTime + ":" + ss;
  } else {
    curTime = curTime + ":0" + ss;
  }
  // var time=hh+":"+mm+":"+ss;
  return curTime

}
export function ISYMD(ymd) {
  let Y1 = new Date(ymd).getFullYear()
  let M1 = new Date(ymd).getMonth() + 1
  let D1 = new Date(ymd).getDate()
  if (M1 > 9) {
    M1 = M1
  } else {
    M1 = '0' + M1
  }
  if (D1 > 9) {
    D1 = D1
  } else {
    D1 = '0' + D1
  }
  let YMD = Y1 + '-' + M1 + '-' + D1
  return YMD

}