// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json({data: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   //for each newToDo - need to assign new id then loop through list of todos and check whether the new id === any existing todo ids. If so, +1 to newId. then check the next one, if so, +1, then check the next one, if so +1, until the newId !== any existing todo ids.

   //assign random whole number for newToDo id
   let myId = Math.floor(Math.random()*100);

   //create newToDo item with form data
   let newTodo = {
     _id: myId,
     task: req.body.task,
     description: req.body.description
   };

   //add newToDo to array
   todos.push(newTodo);

//send newToDo item as JSON
   res.json(newTodo);
});

/* This endpoint will return a single todo with the
 * id specified in the route parameter (:id)
 */
app.get('/api/todos/:id', function show(req, res) {
   let todoId = parseInt(req.params.id);
   let selectedTodo = todos.find(function (todo){
     return todo._id === todoId;
   });

   res.json(selectedTodo);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   //get todo item id from url params
   let todoId = parseInt(req.params.id);

    //iterate through all todos to find that todo item that matches the id found above
    let completedTodo = todos.filter(function (todo){
      return todo._id == todoId;
    })[0];

    //remove the selected to do from the to do array
    todos.splice(todos.indexOf(completedTodo),1);
    //send back deleted todo item

   res.json(completedTodo);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
