### 4_npm_todo-app_several-sub-states/jwt
#### Source
https://codeburst.io/node-js-by-example-part-3-31a29f5d7e9c
#### Run Project
$ node src/index.js
#### Test REST API with Postman
##### Post
Post: http://localhost:3000/login
Header: Content-Type:application/json
Body: raw, JSON(application/json)
{
  "username" : "admin"
  "password" : "password"
}
Returns:
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIn0.a-MtrJzNEEXdn9bSsEtvvpEdKWE7aSgefqSuyiahC9U"
}
##### Test token with jwt debugger
https://jwt.io/
entering the token returns header info and:
{
  "username": "admin"
}
##### Send request with Token
Get: http://localhost:3000/todos
Header:
Authorization:bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIn0.a-MtrJzNEEXdn9bSsEtvvpEdKWE7aSgefqSuyiahC9U
#### Code
Shows authentication procedure.
Code patterns:  
```js
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jwt-simple');
const SECRET = 'mysecret';
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

```
