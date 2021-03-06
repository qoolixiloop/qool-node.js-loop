/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//two new modules
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jwt-simple');

const Todo = require('./Todo');
const ADMIN = 'admin';
const ADMIN_PASSWORD = 'password';

//new constant
const SECRET = 'mysecret';

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('cache-control', 'private, max-age=0, no-cache, no-store, must-revalidate');
  res.setHeader('expires', '0');
  res.setHeader('pragma', 'no-cache');
  next();
});

/*The strategy we are going to take is that we, once authenticated by username and password, are going to return a JSON Web Token consisting of a server-signed JSON payload including the logged in username. Then, when used on future API requests, the server can validate the signature to determine the authenticated user (by the username).
note: You can also store additional data in the JSON Web Token payload, for example a token expiration date.
*/
passport.use(new LocalStrategy((username, password, done) => {
  if (username === ADMIN && password === ADMIN_PASSWORD) {
    
    //jwt.encode() returns some 40bit key 
    done(null, jwt.encode({ username }, SECRET));
    return;
  }
  done(null, false);
}));

passport.use(new BearerStrategy((token, done) => {
  try {
    
    //jwt.decode() decodes the encoded key
    const { username } = jwt.decode(token, SECRET);
    if (username === ADMIN) {
      done(null, username);
      return;
    }
    done(null, false);
  } catch (error) {
    done(null, false);
  }
}));

app.post(
  '/login',
  //secure the endpoints: requiring a valid JSON Web Token.
  passport.authenticate('local', { session: false }),
  (req, res) => {
    res.send({
      token: req.user,
    });
  },
);

app.get(
  '/todos',
  //secure the endpoints: requiring a valid JSON Web Token.
  passport.authenticate('bearer', { session: false }),
  (_, res) => {
    Todo.findAll()
      .then((todos) => {
        res.send(todos);
      });
  },
);
app.post(
  '/todos',
  //secure the endpoints: requiring a valid JSON Web Token.
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    Todo.create({ note: req.body.note })
      .then((todo) => {
        res.send(todo);
      });
  },
);
app.delete(
  '/todos/:id',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    Todo.findById(req.params.id)
      .then(todo => todo.destroy())
      .then(() => res.send());
  },
);
app.listen(3000, () => console.log('Example app listening on port 3000!'));
