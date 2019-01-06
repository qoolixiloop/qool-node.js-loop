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
