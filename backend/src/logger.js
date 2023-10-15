// var expressWinston = require("express-winston");
const winston = require("winston"); // for transports.Console
const { createLogger, format } = require("winston");
var expressWinston = require("express-winston");
require("winston-daily-rotate-file");

var path = require("path");
var PROJECT_ROOT = path.join(__dirname, "..");

const rotateFile = new winston.transports.DailyRotateFile({
  filename: `${process.env.LOGFILE || "/var/log_generic"}-%DATE%.info`,
  datePattern: "YYYY-MM",
  zippedArchive: false,
  maxSize: "10m",
  maxFiles: "60d",
  colorize: false,
  decolorize: true,
  format: format.prettyPrint(),//format.json(),
  extension:'.log',
  createSymlink: true,
  symlinkName:`${process.env.LOGFILE || "/var/log_generic"}.info.log`,
  level: "info",
});

const rotateFile_debug = new winston.transports.DailyRotateFile({
  filename: `${process.env.LOGFILE || "/var/log_generic"}-%DATE%.silly`,
  datePattern: "YYYY-MM",
  zippedArchive: false,
  maxSize: "10m",
  maxFiles: "30",
  colorize: false,
  decolorize: true,
  extension:'.log',
  format: format.prettyPrint(),//format.json(),
  createSymlink: "true",
  symlinkName:`${process.env.LOGFILE || "/var/log_generic"}.silly.log`,
  level: "silly",
});

// rotateFile.on('rotate', function(oldFilename, newFilename) {
//   // do something fun
// });
const transports = [
  new winston.transports.Console({
    level: "info",
    format: format.combine(
      format.prettyPrint(),
      // format.json(),
      format.colorize(),
      // format.simple(),
      // format.printf(
      //     (info) => `${JSON.stringify(info)}`
      //   )
    ),
  }),
  rotateFile,
  rotateFile_debug,
];

const logConfiguration = {
  transports,
};
const logger = createLogger(logConfiguration);

// // https://gist.github.com/ludwig/b47b5de4a4c53235825af3b4cef4869a
// // this allows winston to handle output from express' morgan middleware
// logger.stream = {
//   write: function (message) {
//     logger.info(message);
//   },
// };

// // Sugestão de override
// // https://stackoverflow.com/questions/9380785/node-js-winston-can-i-add-default-meta-data-to-all-log-messages
// logger.log = function(){
//   var args = arguments;
//   if(args[2]) args[3] = args[2];
//   args[2] = {
//     "foo" : "bar"
//   }
//   winston.Logger.prototype.log.apply(this,args);
// }

const expressErrLogger = expressWinston.errorLogger({
  dumpExceptions: true,
  showStack: true,
  transports,
});

const expressLogger = expressWinston.logger({
  dumpExceptions: true,
  showStack: true,
  transports,
});

/**
 * Attempts to add file and line number info to the given log arguments.
 */
function formatLogArguments(args) {
  args = Array.prototype.slice.call(args);
  if (!args[1] || !(args[1] && args[1].codeline)) {
    var codelineNumber = (args[1] && args[1].codelineNumber) || 1;
    var stackInfo = getStackInfo(codelineNumber);
    if (stackInfo) {
      var calleeStr = stackInfo.relativePath + ":" + stackInfo.line+':'+stackInfo.pos;
      if (args[1] && !args[1].codeline) {
        args[1] = { ...args[1], codeline: calleeStr };
      } else {
        args[1] = { codeline: calleeStr ,codefile:stackInfo.relativePath};
      }
    }
  }
  // if (args[1] && args[1].stk && args[1].stk[0] && args[1].stk[1]) {
  //   var stkLines = [];
  //   for (x = args[1].stk[0]; x < args[1].stk[0]; x++) {
  //     let stkinfo = getStackInfo(x);
  //     stkLines.push(
  //       `x[${stackInfo.relativePath}:${stackInfo.line}:${stackInfo.pos}]`
  //     );
  //   }
  //   if (stkLines) {
  //     if (args[1]) {
  //       args[1] = { ...args[1], stkLines: stkLines.join("\n") };
  //     }
  //   }
  // }
  // if (args[1] && args[1].codelineNumber) {
  //   let stkinfo = getStackInfo(1);
  //   if (stkinfo) {
  //     if (args[1]) {
  //       args[1] = { ...args[1], stkList: stkinfo };
  //     }
  //   }
  // }
  return args;
}

/**
 * Parses and returns info about the call stack at the given index.
 */
function getStackInfo(stackIndex = 1) {
  // get call stack, and analyze it
  // get all file, method, and line numbers
  var stacklist = new Error().stack.split("\n").slice(3);

  // stack trace format:
  // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
  var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
  var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

  var s = stacklist[stackIndex] || stacklist[0];
  var sp = stackReg.exec(s) || stackReg2.exec(s);

  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(PROJECT_ROOT, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stacklist.join("\n"),
    };
  }
}

module.exports = {
  rotateFile,
  expressErrLogger,
  expressLogger,
  getStackInfo,
  logger,
  loge: function () {
    logger.error.apply(logger, formatLogArguments(arguments));
  }, //0
  logw: function () {
    logger.warn.apply(logger, formatLogArguments(arguments));
  }, //1,
  logi: function () {
    logger.info.apply(logger, formatLogArguments(arguments));
  }, //2
  logh: function () {
    logger.http.apply(logger, formatLogArguments(arguments));
  }, //3,
  logv: function () {
    logger.verbose.apply(logger, formatLogArguments(arguments));
  }, //4,
  logd: function () {
    logger.debug.apply(logger, formatLogArguments(arguments));
  }, //5
  logs: function () {
    logger.silly.apply(logger, formatLogArguments(arguments));
  }, //6
};
