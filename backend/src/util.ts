const moment = require("moment");
import { logger, logi, logd, logs, loge, logw, logv, logh, getStackInfo,} from "./logger";
import {get as opg} from 'object-path'

export { logger, logi, logd, logs, loge, logw, logv, logh ,getStackInfo};

export function r(r: any) {
  return r;
}

export function rc(r: any) {
  logs(r,{codelineNumber:2})
  return r
}

export function er(err: any) {
  logd(err,{codelineNumber:2})
  return err;
}

export {opg}

export function ec(err: any) {
  loge(err,{codelineNumber:2})
  return err;
}
// export function rc(r: any) {
//   logs(r, { stk: [2, 3] });
//   return r;
// }

// export function er(err: any) {
//   logd(err, { stk: [2, 3] });
//   return err;
// }

// export function ec(err: any) {
//   loge(err, { stk: [2, 3] });
//   return err;
// }
// export function rc(r: any) {
//   logs(r,{stkInfo:getStackInfo(1)})
//   return r
// }
// export function er(err: any) {
//   logd(err,{stkInfo:getStackInfo(1)})
//   return err;
// }

// export function ec(err: any) {
//   loge(err,{stkInfo:getStackInfo(1)})
//   return err;
// }
export function momentDate(date: string, def = "2000-01-01T00:00:00-0300") {
  let res: any,
    dates: string,
    valido = false;
  if (typeof date == "string") {
    if (date.match(/^\d{4}.\d{2}.\d{2}.\d{2}.\d{2}.\d{2}.*/)) {
      dates = date.replace(
        /^(\d{4}).(\d{2}).(\d{2}).(\d{2}).(\d{2}):(\d{2})(.*)/,
        "$1-$2-$3T$4:$5:$6-0300"
      );
      valido = true;
    } else if (date.match(/^\d{2}.\d{2}.\d{4}.\d{2}.\d{2}.\d{2}.*/)) {
      dates = date.replace(
        /^(\d{2}).(\d{2}).(\d{4}).(\d{2}).(\d{2}):(\d{2})(.*)/,
        "$3-$2-$1T$4:$5:$6-0300"
      );
      valido = true;
    }
  }
  res = moment(valido ? dates : def).utcOffset("-0300");
  return res;
}
export function formatDate(date?: string, def = "2000-01-01T00:00:00-0300") {
  return momentDate(date, def).format();
}

export function formatedNow() {
  return moment().utcOffset("-0300").format();
}

var rand = function() {
  return Math.random().toString(36).substr(2); // remove `0.`
};

export var token = function() {
  return rand() + rand(); // to make it longer
};

export function generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}