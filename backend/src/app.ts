import {config, opt } from "./config";
import {test,sync, orm} from "./orm";

const {
  logger,
  logi,
  logs,
  expressErrLogger,
  expressLogger,
} = require("./logger");

if (!isProduction) logs(config);

var http = require("http"),
  fs = require("fs"),
  express = require("express"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  cors = require("cors"),
  errorhandler = require("errorhandler"),
  https = require("https"),
  compression = require("compression"),
  modulos = require("./modules");

var isProduction = process.env.NODE_ENV === "production";

var app = express();

app.use(cors({ maxAge: 60000 }));

// app.use(require("morgan")("dev"));
app.use(expressLogger);

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(require("method-override")());
//app.use(express.static(__dirname + '/public'));

app.use(
  session({
    secret:config.sessionSecret, //|| process.env.SESSION_SECRET || "dfjjfvhsdysfysd",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

if (!isProduction) {
  app.use(errorhandler());
}

const shouldCompress = (req: any, res: any) => {
  if (req.headers["x-no-compression"]) {
    // Will not compress responses, if this header is present
    return false;
  }
  // Resort to standard compression
  return compression.filter(req, res);
};
// Compress all HTTP responses
app.use(
  compression({
    // filter: Decide if the answer should be compressed or not,
    // depending on the 'shouldCompress' function above
    filter: shouldCompress,
    // threshold: It is the byte threshold for the response
    // body size before considering compression, the default is 1 kB
    threshold: 0,
  })
);

// modulos.models.map((val: any) => {
//   let mod = require(val);
//   app.use(mod);
// });

test();
sync();
require("./config/passport");
var auth = require("./routes/auth");
app.use(require("./routes"));

/// catch 404 and forward to error handler
app.use(function (_req: any, _res: any, next: any) {
  var err = new Error("Not Found");
  //err.status = 404;
  next(err);
});

app.use(expressErrLogger);

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err: any, _req: any, res: any) {
    logi("erro app.ts:~103");
    // logi(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        // error: err,
      error: {},
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err: any, _req: any, res: any) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// TODO: restringir visibilidade da api upworker a IPs locais enquanto segurança não estiver configurada
// Starting both http & https servers
const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || 46954, () => {
  logi("Listening on port " + httpServer.address().port);
});

try {
/**  const certpath = "../certs";
  const privateKey = fs.readFileSync(
    certpath + "/cert.com.priv",
    "utf8"
  );
  const certificate = fs.readFileSync(
    certpath + "/cert.com.cert",
    "utf8"
  );
  const ca = fs.readFileSync(certpath + "/cert.com.full", "utf8");

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };
*/

  //const httpsServer = https.createServer(credentials, app);
  //httpsServer.listen(process.env.PORTSSL || 46955, () => {
  //  logi("Listening on port " + httpsServer.address().port);
  //});
} catch (e) {
  logi(e);
}
