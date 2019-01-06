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

```
