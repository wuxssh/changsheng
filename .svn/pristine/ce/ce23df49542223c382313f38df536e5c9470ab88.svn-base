
import {getCodeArr,getCodeType} from "./service";
const cardType = function(val) { // 证件类型过滤
    var codeList = getCodeType('llidtype') ? getCodeType('llidtype'):[]
    // console.log(codeList)
    // console.log(codeList)
    var a = null;
    codeList.forEach(element => {
      if (element.code == val) {
        a = element.codename;
      }
    });
    return a;
}
const  customeridentification = function(val) { // 客户标示过滤
    var codeList = getCodeType('customeridentification') ? getCodeType('customeridentification'):[]
    console.log(codeList)
    var a = null;
    codeList.forEach(element => {
      if (element.code == val) {
        a = element.codename;
      }
    });
    return a;
}
const   accidenttype = function(val) { // 出险类型过滤
  var codeList = getCodeType('accidenttype') ? getCodeType('accidenttype'):[]
  console.log(codeList)
  var a = null;
  codeList.forEach(element => {
    if (element.code == val) {
      a = element.codename;
    }
  });
  return a;
}
const   resodefilt = function(val) { // 理赔类型
  var codeList = getCodeType('llclaimtype') ? getCodeType('llclaimtype'):[]
  console.log(codeList)
  var a = null;
  codeList.forEach(element => {
    if (element.code == val) {
      a = element.codename;
    }
  });
  return a;
}
const   accreasonfilt = function(val) { // 事故原因
  var codeList = getCodeType('accreason') ? getCodeType('accreason'):[]
  console.log(codeList)
  var a = null;
  codeList.forEach(element => {
    if (element.code == val) {
      a = element.codename;
    }
  });
  return a;
}
const  accresultfilt = function(val) { // 疾病诊断
  var codeList = getCodeType('accresult') ? getCodeType('accresult'):[]
  console.log(codeList)
  var a = null;
  codeList.forEach(element => {
    if (element.code == val) {
      a = element.codename;
    }
  });
  return a;
}
const  givetypefilt = function(val) { // 理赔结论
  var codeList = getCodeType('llclaimconclusion') ? getCodeType('llclaimconclusion'):[]
  console.log(codeList)
  var a = null;
  codeList.forEach(element => {
    if (element.code == val) {
      a = element.codename;
    }
  });
  return a;
}
const   accidentcoursefilt = function(val) { // 客户标示过滤
  var codeList = getCodeType('accreason') ? getCodeType('accreason'):[]
  console.log(codeList)
  var a = null;
  codeList.forEach(element => {
    if (element.code == val) {
      a = element.codename;
    }
  });
  return a;
}

const floatToin =  function (val) {
  if(val == 0) {
    return parseInt(val)
  }
}
export {
    cardType,
    customeridentification,
    accidenttype,
    accreasonfilt,
    accresultfilt,
    givetypefilt,
    accidentcoursefilt,
    resodefilt
}