/* eslint-disable no-console */

//new: module
const Sequelize = require('sequelize');

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//new: Todo Class / Model / Factory
const TodoFactory = require('../models/todo');

const ADMIN = 'admin';
const ADMIN_PASSWORD = 'password';

//new: db
const sequelize = new Sequelize('postgres://myuser:OBMITTED@localhost/mydb');

//new: access db 
sequelize
  
  //authentification
  .authenticate()
  
  //add server
  .then(() => {
    
    //new: (db, module) 
    const Todo = TodoFactory(sequelize, Sequelize);
    
    //put http server here: use, post, get, delete and listen
    const app = express();
    app.use(bodyParser.json());
    app.use((req, res, next) => {
      res.setHeader('cache-control', 'private, max-age=0, no-cache, no-store, must-revalidate');
      res.setHeader('expires', '0');
      res.setHeader('pragma', 'no-cache');
      next();
    });
    passport.use(new LocalStrategy((username, password, done) => {
      if (username === ADMIN && password === ADMIN_PASSWORD) {
        done(null, 'TOKEN');
        return;
      }
      done(null, false);
    }));
    app.post(
      '/login',
      passport.authenticate('local', { session: false }),
      (req, res) => {
        res.send({
          token: req.user,
        });
      },
    );
    app.get('/todos', (_, res) => {
      Todo.findAll().then((todos) => {
        res.send(todos);
      });
    });
    app.post('/todos', (req, res) => {
      Todo.create({ note: req.body.note })
        .then((todo) => {
          res.send(todo);
        });
    });
    app.delete('/todos/:id', (req, res) => {
      Todo.findById(req.params.id)
        .then(todo => todo.destroy())
        .then(() => res.send());
    });
    app.listen(3000, () => console.log('Example app listening on port 3000!'));
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
