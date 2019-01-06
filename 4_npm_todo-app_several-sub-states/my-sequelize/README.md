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
