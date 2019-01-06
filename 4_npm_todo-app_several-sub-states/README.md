### 4_npm_todo-app_several-sub-states 
#### Source
https://codeburst.io/node-js-by-example-part-1-668376cd4f96
https://codeburst.io/node-js-by-example-part-2-dad2af5b7012
### 4_npm_todo-app_several-sub-states/hello-world 
#### Source
https://codeburst.io/node-js-by-example-part-1-668376cd4f96
https://codeburst.io/node-js-by-example-part-2-dad2af5b7012
#### Run project
$ node index.js
#### Code
Shows how to run http server.  
Code patterns:  
```js
const http = require('http');
```
### 4_npm_todo-app_several-sub-states/my-eslint 
#### Source
https://codeburst.io/node-js-by-example-part-1-668376cd4f96
https://codeburst.io/node-js-by-example-part-2-dad2af5b7012
#### Run lint syntax check
$ ./node_modules/.bin/eslint index.js
$ npm run lint
#### Code
Code patterns:  
```json
"scripts": {
  "lint": "eslint index.js",
}
```
```js
const http = require('http'); 
```
### 4_npm_todo-app_several-sub-states/my-express 
#### Source
https://codeburst.io/node-js-by-example-part-1-668376cd4f96
https://codeburst.io/node-js-by-example-part-2-dad2af5b7012
#### Run project
$ node index.js 
#### Code
Code patterns:  
```js
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));
```
### 4_npm_todo-app_several-sub-states/todo
#### Source
https://codeburst.io/node-js-by-example-part-1-668376cd4f96
https://codeburst.io/node-js-by-example-part-2-dad2af5b7012
#### Run Project
$ node src/index.js
#### Test REST API with Postman
##### Get todos
Get: http://localhost:3000/todos
##### Post todos
Post: http://localhost:3000/todos
Header: Content-Type:application/json
Body: raw, Json(application/json) 
{
    "note": "Sample Todo"
}
##### Post delete
Delete:http://localhost:3000/todos/:id
(send id without colon)
http://localhost:3000/todos/1516820260715
#### Code
Todo.js is an in memory object API.
Code patterns: 
```js
//header: browser may not cache data
app.use((req, res, next) => {
  res.setHeader('cache-control', 'private, max-age=0, no-cache, no-store, must-revalidate');
//get request: find all objects in db
app.get('/todos', (_, res) => {
  Todo.findAll().then((todos) => {
//post request: create new todo object
app.post('/todos', (req, res) => {
  Todo.create({ note: req.body.note })
//delete request: delete todo object with id
app.delete('/todos/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => todo.destroy())
//start server
app.listen(3000, () => console.log('Example app listening on port 3000!'));
``` 
Index.js contains the express server with routing instructions 
```js
//db
const todoById = {
//db index
const todoIds = [
//class Todo with 2 properties and one member function
const Todo = ({ id, note }) => ({
  id,
  note,
  destroy() {
//class Todo's static functions
module.exports = {
  create({ note }) {
  findAll() {
  findById(id) {
```
### 4_npm_todo-app_several-sub-states/my-passport 
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
    "token": "TOKEN"
}
#### Code
Shows authentication procedure.
Code patterns:  
```js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
/*By initializing Passport using passport.use 
 * with a LocalStrategy object, 
 * we can later protect the /login endpoint using it 
 * (indicated by the local parameter).
 */
passport.use(new LocalStrategy((username, password, done) => {
  
  //check username and password
  if (username === ADMIN && password === ADMIN_PASSWORD) {
    
    /*The done callback (as used here) takes two parameters. 
     * The first, if null, indicates there was no error; 
     * otherwise indicates an unexpected error 
     * (in our case there is no opportunity for an unexpected error). 
     * The second is the user object to pass on 
     * if authentication is successful; otherwise false.
     * In this simplified example, 
     * the user object is simply the string TOKEN. 
     * Later we will refactor and create an actual JSON Web Token.
     * The result of successfully logging in will be a JSON Web Token 
     * that can be used to authenticate future API calls. 
     */
    done(null, 'TOKEN');
    return;
  }

  //authentication failed, no token sent
  done(null, false);

}));

//11.) post: define routing to /login
app.post(
  //route
  '/login',

  /*We set session to false as we are building a REST interface 
   *(no sessions). 
   *The return of passport.authenticate(‘local’, { session: false }) 
   *is a middleware function that only applies to the /login route. 
   *If it successfully authenticates, 
   *the third parameter in app.post is called.
   *In this case, the operation of this middleware is 
   *essentially the following:
   *If the format of the request is bad it will return a 400 status code
   *(has to be a request with Content-Type: application/json header 
   *with a JSON body with username and password).
   *If unauthorized it will return as 401 status code.
   *If authorized it will add a user property (the user object, 
   *the string TOKEN for now, from above) to the request object 
   *and pass control to the next parameter in app.post.
   */
  passport.authenticate('local', { session: false }),
  
  //send back response
  (req, res) => {
    //sends a json object
    //req.user returns "TOKEN"
    res.send({
      token: req.user,
    });
  },
);

```
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
### Subproject my-sequelize
#### Run project
$ node .js
#### Code
Shows.  
Code patterns:  
```json
```
```js
```
