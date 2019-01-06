/* eslint-disable no-console */

//1.) http server with routing
const express = require('express');

//2.) parse body of post request
//we will receive json data
//we parse it to construct todo object
const bodyParser = require('body-parser');

//3.) module to define /login endpoint
const passport = require('passport');

//4.)
const LocalStrategy = require('passport-local').Strategy;

//5.) Todo object: own source file
const Todo = require('./Todo');

//6.) authentication: user and password
/*For now, we hard-code in an admin username and password (will refactor later). In more complete solutions, one often looks up the username and password (encrypted) from persistent storage (a database).
 */
const ADMIN = 'admin';
const ADMIN_PASSWORD = 'password';

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

//10.) authentication: passport with LocalStrategy
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
  
  //We set session to false as we are building a REST interface 
  //(no sessions). 
  //The return of passport.authenticate(‘local’, { session: false }) 
  //is a middleware function that only applies to the /login route. 
  //If it successfully authenticates, 
  //the third parameter in app.post is called.
  /*In this case, the operation of this middleware is 
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
