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
##### Post: login
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
##### Get: get all Todos
Get: http://localhost:3000/todos
(local strategy: no token necessary)
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
##### Post: login
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
##### Get: Send request with Token
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
### 4_npm_todo-app_several-sub-states/sequelize
#### Source
https://codeburst.io/node-js-by-example-part-4-e84901514cfd
#### Database setup for Postgres
//db
$ sudo -u postgres createdb mydb
//user
$ sudo -u postgres psql
postgres=# create user myuser with password 'OBMITTED';
postgres=# grant all privileges on database mydb to myuser;
//leave psql
Ctrl-D
//validate everything is working
psql postgres://myuser:OBMITTED@localhost/mydb
mydb=>
leave psql
Ctrl-D
#### Sequelize: initialize
$ node_modules/.bin/sequelize init
generates: config/config.json (or complains if it already exists)
#### Update config/config.json
add:
"development": {
    "username": "myuser",
    "password": "OBMITTED",
    "database": "mydb",
    "host": "127.0.0.1",
    "dialect": "postgres"
},
#### Sequelize: generate model
$ node_modules/.bin/sequelize  model:generate --name Todo --attributes note:string
generates: model/todo.js (or complains if it already exists)
#### Sequelize migrate db
$ node_modules/.bin/sequelize db:migrate
generates message: 20180126121420-create-todo: migrated
as well as some complaints about its vim swp files if already opened.
#### Check if db has been updated
$ psql postgres://myuser:OBMITTED@localhost/mydb
mydb=>\dt
mydb=>\d "Todos"
#### Seed db with sample data
node_modules/.bin/sequelize  seed:generate --name demo-todo
generates message: seeders folder already exists, 
new seed was created at: 20190106182742-demo-todo.js
which is in fact only a template. Add the data:
```js
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todos', [{
      note: 'Hello Todos',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      note: 'Another Todo',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
```
#### seed db
$ node_modules/.bin/sequelize db:seed:all
generates message (because I now have two files):
20180126121555-demo-todo: migrated
20190106182742-demo-todo: migrated
#### check db again
$ psql postgres://myuser:OBMITTED@localhost/mydb
mydb=> select * from "Todos";
shows four entries
#### test connection
$ node src/test.js
generates output about db entries
####
$ node src/index.js
#### Run project
$ node src/index.js
#### Test endpoints with Postman
##### login with local strategy
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
##### get all Todos
Get: http://localhost:3000/todos
Get: http://localhost:3000/todos
(local strategy: no token necessary)
#### Code
Code patterns:
src/test.js  
```js
//src/test.js does not contain the server
//src/index.js contains the server
//but it shows, how to connect to the db and fetch all todo records.
const Sequelize = require('sequelize');
const TodoFactory = require('../models/todo');
const sequelize = new Sequelize('postgres://myuser:OBMITTED@localhost/mydb');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    const Todo = TodoFactory(sequelize, Sequelize);
    Todo.findAll().then(todos => console.log(todos));
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
```
model/todo.js
```js
//all self written code removed and replace by this code
//to generate todo objects
//there is also a probably self generated file model/index.js 
//(no clue how that works) 
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    note: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Todo;
};
```
