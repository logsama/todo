var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

// get all todo items
app.get('/todos', function (req, res) {
	res.json(todos)
});

// get specific todo by id
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos,{id: todoId});
	
	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

// add a todo item
app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description','completed');

	if (!_.isBoolean(body.completed) ||
		!_.isString(body.description) ||
		body.description.trim().length === 0) {
		return res.status(400).send();
	}
	
	body.description = body.description.trim();

	body.id = todoNextId++;
	todos.push(body);

	res.json(body);
});

// delete a todo item
app.delete('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos,{id: todoId});
	
	if (matchedTodo) {
		// remove the item from the todo list
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});