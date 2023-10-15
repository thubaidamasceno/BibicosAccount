// var mongoose = require("mongoose");
var router = require("express").Router();
var passport = require("passport");

const {orm, User} = require("../../model")

var auth = require("../auth");
var config = require("../../config").config;
const nodemailer = require("nodemailer");
const { r, er, pr, token } = require("../../util");

const { logger, logi } = require("../../logger");
const { log } = require("winston");

const { Model, DataTypes, Deferrable, Sequelize } = require("sequelize");

router.get("/current", auth.optional, function (req, res, next) {
  // console.log({ crr: req });
  if (!req.payload || !req.payload.id) {
    return res.sendStatus(401);
    // return res.send(null);
  }
  User.findByPk(req.payload.id)
    .then(async function (user) {
      if (!user) {
        return res.sendStatus(401);
      }
      const toAuthJson = await user.toAuthJSON() 
      return res.json({ user: toAuthJson});
    })
    .catch(next);
});

router.get("/current", auth.required, function (req, res, next) {
  // console.log({ crr: req });

  User.findByPk(req.payload.id)
    .then(async function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return res.json({ user: await user.toAuthJSON() });
    })
    .catch((next) => {
      // if (!req.payload || !req.payload.id) {
      return res.send(null);
      // }/
    });
});

const Auth = (req, res, next) => {
  return passport.authenticate(
    "local",
    { session: false },
    async function (err, user, info) {
      if (!err && user) {
        user.token = user.generateJWT();
        logi({ req, res, err, user, info });
        return res.json({ user: await user.toAuthJSON() });
      } else if (err) {
        logi({ req, res, err, user, info });
        return next({ err, user, info });
      } else {
        logi({ req, res, err, user, info });
        return res.status(422).json({ err, user, info });
      }
    }
  )(req, res, next);
};

const criaUser = ({
  role,
  username,
  password,
  email,
  recover_token,
  req,
  res,
  next,
  posAuth,
}) => {
  console.log(password);
  const user = User.build({
    role,
    username,
    email,
    recover_token,
  });

  user.setPassword(password);
  user
    .save()
    .then(function () {
      return posAuth ? null : Auth(req, res, next);
    })
    .catch((err) => {
      console.log(err);
      return posAuth ? null : Auth(req, res, next);
    });
};

router.post("/login", function (req, res, next) {
  // console.log(orm)
  let username = req.body.user.username;
  let password = req.body.user.password;

  if (!username)
    return res
      .status(422)
      .json({ errors: { username: "Informe o usuário ou email" } });
  username = username.replace(
    /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)(@.*)?/,
    "$1"
  );
  req.body.user.username = username;

  if (username === config.superuser && password === config.secret) {
    return User.findOne({ where: { username: config.superuser } })
      .then(function (user) {
        if (!user || (user && !user.validPassword(config.secret))) {
          return criaUser({
            username: config.superuser,
            role: "dev",
            email: `${config.superuser}@damasceno.pro`,
            password: config.secret,
            req,
            res,
            next,
          });
        } else {
          return Auth(req, res, next);
        }
      })
      .catch(() => {
        console.log(req.body);
        return criaUser({
          username: config.superuser,
          role: "dev",
          password: config.secret,
          req,
          res,
          next,
        });
      });
  } else return Auth(req, res, next);
});

router.post("/resetpass", async (req, res, next) => {
  const onError = (err) => {
    console.log(err);
    return res.json({ error: 1 });
  };
  const { email, pass, token } = req.body;
  try {
    let us = await User.findOne({
      where: { email, recover_token: token },
    }).then(r, er);
    if (us && us.username) {
      User.findOne({ username: us.username })
        .then((usr) => {
          usr.setPassword(pass);
          usr
            .save()
            .then(() => {
              User.update(
                { recover_token: null },
                { where: { email, recover_token: token } },
              );
              return res.status(422).json({ error: 0, sucess: 1 });
            })
            .catch(onError);
        })
        .catch(onError);
    } else return res.status(422).json({ error: 1 });
  } catch (e) {
    console.log(e);
    return res.status(422).json({ error: 1 });
  }
});

router.post("/recoverpass", async (req, res, next) => {
  const email = req.body.email;
  const site = req.body.site;
  // console.log(email)
  try {
    if (
      typeof email === "string" &&
      email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      )
    ) {
      let tk = token();
      let user = await User.findOne({ where: { email } }).then(r, er);
      if (!user) {
        if (
          email.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/
          )
        )
          criaUser({
            role: "default",
            email,
            username: email.replace(
              /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)(@.*)?/,
              "$1"
            ),
            password: email + tk,
            recover_token: tk,
            posAuth: true,
          });
        else {
          console.log(`${email} é um endereço de email invalido`);
        }
      } else {
        const updstt = await User.update(
          { recover_token: tk },
          { where: { email } }
        ).then((a, b) => {
          console.log({ a, b });
          return { a, b };
        });
      }

      let link = `${site}/#/resetpass?email=${encodeURIComponent(
        email
      )}&token=${tk}`;

      nodemailer
        .createTransport({
          host: process.env.SMTP_HOST || "postfix",
          port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 25,
          secure: process.env.SMTP_SECURE || "STARTLS",
          //secure: "STARTLS", // upgrade later with STARTTLS
          //secure: false, // upgrade later with STARTTLS
          auth: {
            user: process.env.SMTP_AUTH_USER || "",
            pass: process.env.SMTP_AUTH_PASS || "",
          },
          tls: {
            rejectUnauthorized: false,
          },
        })
        .sendMail({
          from: `bbacc-trasactional@daamsceno.pro`,
          subject: "Recuperação de senha - Sistema BibicosAccount",
          text: `Acesse o seguinte endereço para criar ou alterar sua senha: ${link}`,
          encoding: "quoted-printable",
          html: `<div dir="ltr"><div><h2>Criação de Senha - Sistema BibicosAccount</h2>Acesse o seguinte endereço para criar sua senha:<br/><a href="${link}">${link}</a></div>
                    <div>
                        <div dir="ltr" data-smartmail="gmail_signature">
                            <div dir="ltr">
                                <div><br></div>
                                <div>Caso não tenha solicitado esse email, por favor desconsidere.<br></div>
                                <div>Atenciosamente</div>
                            </div>
                        </div>
                    </div>
                </div>`,
          to: email,
          bcc: "bbacc-trasactional@daamsceno.pro",
        })
        .then((a, b) => console.log({ a, b }));
    }
    return res.json({ email });
  } catch (e) {
    console.log(e);
    return res.status(422).json({ errors: { erro: e } });
  }
});

module.exports = router;
