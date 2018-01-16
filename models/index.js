//want to include all possible models. resource that lists all the stuff in this directory

let mongoose = require('mongoose');
mongoose.connect(process.env.DBPORT || 'mongodb://localhost/todo-app');

//./ means 'this'folder
//take in the exports file and set it to a variable
let Todo = require('./todo');

//creating an object in db with key value pair
let db = {
  Todo: Todo
}
//db.todo

//export to our server - to give our server a model to use
module.exports = db

/**********
object of key value pairs
another way to do the above ^ 
***********/
module.exports = {
  Todo: require('./todo'),
};
