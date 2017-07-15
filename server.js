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

  console.log(req.query);

  let searchTodos = req.query.q;

  console.log(searchTodos);

  let listOfFilteredTodos = todos.filter(function(todos){
    return(todos.task.includes(searchTodos) || todos.description.includes(searchTodos));
  });

  res.json({data : listOfFilteredTodos});

});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json({data: todos});
});

/* This endpoint will add a todo to our "database"
 * and respond with the newly created todo.
 */
app.post('/api/todos', function create(req, res) {
  //create newTodo object with form data (`req.body`)
  let newTodo = req.body;

   //if the todos list is more than one, set the newTodo._id value = the last todos item (which can be found by getting the todos.length and subtracting one)...id and add +1 to that id number. THis will be the newTodo id value
   let lastTodo = todos[todos.length-1];
   if(todos.length > 0){
     newTodo._id = lastTodo._id + 1;
   } else {
     newTodo._id = 1;
   }

   //add newToDo to todos array
   todos.push(newTodo);

//send newToDo item as JSON
   res.json(newTodo);
});

/* This endpoint will return a single todo with the
 * id specified in the route parameter (:id)
 */
app.get('/api/todos/:id', function show(req, res) {
  //get todoId from url params(`req.params`)
   let todoId = parseInt(req.params.id);

   //find todo by its id
   let selectedTodo = todos.find(function (todo){
     return todo._id === todoId;
   });
//send the selectedTodo as JSON response
   res.json(selectedTodo);
});

/* This endpoint will update a single todo with the
 * id specified in the route parameter (:id) and respond
 * with the newly updated todo.
 */
app.put('/api/todos/:id', function update(req, res) {
  //get todo id from url params  (`req.params`)
  let todoId = parseInt(req.params.id);
//find todo to update by its id
  let todoUpdate = todos.find(function (todo){
    return todo._id === todoId;
  });

//update the todo's task
  todoUpdate.task = req.body.task;
//update the todo's description
  todoUpdate.description = req.body.description;
  //respond with newly updated info
  res.json(todoUpdate);
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
