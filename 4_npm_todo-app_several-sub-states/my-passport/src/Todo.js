/*Todo in memory API*/

//time delay for promise or timeout
const DELAY = 1000;


//initial db: todoById data structure
//filled with two todo elements
const todoById = {
  1516820260715: {
    id: '1516820260715',
    note: 'Hello Todos',
  },
  1516820289796: {
    id: '1516820289796',
    note: 'Another Todo',
  },
};


//initial db index: todoIds array
//filled with two todo indices
const todoIds = [
  '1516820260715',
  '1516820289796',
];


//js data structure:
//constructor for a todo object
const Todo = ({ id, note }) => ({
  
  //properties
  id,
  note,

  //member function: todo.destroy()
  //returns a promise 
  //that resolves when object is deleted
  destroy() {
    
    //return promise
    return new Promise((resolve) => {
      
      //delete yourself from todoIds
      delete todoIds[this.id];
      
      //
      todoIds.splice(todoIds.indexOf(this.id), 1);
      
      //
      resolve();

    }, DELAY);
  
  },

});

//js data structure:
//static member functions: 
//Todo.create(), Todo.findAll(), Todo.findById()
module.exports = {
  
  //create item
  //returns a promise 
  //that resolves to a newly created todo object
  create({ note }) {
    
    //return promise
    return new Promise((resolve) => {
      
      //timeout function
      setTimeout(() => {
        
        //use date as id
        const id = Date.now().toString();
        
        //db: add new item to todoById data structure
        todoById[id] = {
          id,
          note,
        };

        //db: add new id to todoIds array
        todoIds.push(id);
        
        //construct object todo with Todo(id,item)
        //resolve: return object todo to caller
        resolve(Todo(todoById[id]));

      }, DELAY);
    
    });
  
  },
  
  //find all items
  //returns a promise 
  //that resolves to an array of todo objects
  findAll() {

    //return promise
    return new Promise((resolve) => {
      
      //timeout function
      setTimeout(() => {

        //for each id in todoIds: 
        //construct object todo with Todo(id,note)
        //resolve: return result to caller
        resolve(todoIds.map(id => Todo(todoById[id])));
      
      }, DELAY);
    
    });
  
  },
  
  //find item by id
  //eturns a promise 
  //that resolves to the todo object with provided id
  findById(id) {

    //return promise
    return new Promise((resolve) => {
      
      //timeout function
      setTimeout(() => {
        
        //construct object todo with Todo(id,item)
        //resolve: return object todo to caller
        resolve(Todo(todoById[id]));

      }, DELAY);
    
    });
  
  },

};
