const mongoose = require('mongoose');

//1. define schema
let TodoSchema = new mongoose.Schema({
  task: String,
  description: String
});

//2. generate a model using that schema
let Todo = mongoose.model('Todo', TodoSchema);

//3. export that model to the outside world
module.export = Todol
