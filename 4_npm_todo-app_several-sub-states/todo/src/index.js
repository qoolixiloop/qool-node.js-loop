/* eslint-disable no-console */

//1.) http server with routing
const express = require('express');

//2.) parse body of post request
//we will receive json data
//we parse it to construct todo object
const bodyParser = require('body-parser');

//5.) Todo object: own source file
const Todo = require('./Todo');

//7.) define app as an express http server
const app = express();

//8.) use body parser
app.use(bodyParser.json());

/*9.) Next, we want to ensure that our API is never cached by the browser (pretty common requirement). While there are a number of Express middleware packages that do this, we will write this trivial middleware ourselves.
 * Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.
 * Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next. 
 */
app.use((req, res, next) => {
  
  //header says: browser do not cache or store anything
  res.setHeader('cache-control', 
    'private, max-age=0, no-cache, no-store, must-revalidate');
  res.setHeader('expires', '0');
  res.setHeader('pragma', 'no-cache');
  next();

});

//12.) get: define routing to /todos
app.get('/todos', (_, res) => {
  
  //call Todo.findAll(): returns objects todos
  Todo.findAll()
    
    //when done, do ... 
    .then((todos) => {
    
    //send response: todos
    res.send(todos);
  
  });

});

//13.) post: define routing to /todos
app.post('/todos', (req, res) => {
  
  console.log("index.js:13.1)Request: " + req);
  console.log("index.js:13.2)Request.body: " + req);
  console.log("index.js:13.3)Request.body.note: " + req);
  console.log("index.js:13.4)Response: " + res);
  
  //call Todo.create: returns object todo
  Todo.create({ note: req.body.note })
    
    //when done, do...
    .then((todo) => {
      
      console.log("index.js:13.5)todo: " + todo);
      
      //send response containing object todo
      res.send(todo);

      console.log("index.js:13.6)Response: " + res);
    
    });

  console.log("index.js:13.7)Request: " + req);
  console.log("index.js:13.8)Response: " + res);

});

//14.) delete: define routing to /todos/:id
app.delete('/todos/:id', (req, res) => {
  
  //call Todo.findById: returns object todo
  Todo.findById(req.params.id)
    
    //when done, do ... call todo.destroy()
    .then(todo => todo.destroy())
    
    // when done, do ... send empty response
    .then(() => res.send());

});

//15.) run server
app.listen(3000, () => console.log('Example app listening on port 3000!'));
