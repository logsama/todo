var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [ {
	id: 1,
	description: "Study Node.js",
	completed: false
}, {
	id: 2,
	description: "Go to market",
	completed: false
}, {
	id: 3,
	description: "Go to sleep",
	completed: true
}];

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

// get all todo items
app.get('/todos', function (req, res) {
	res.json(todos)
});

// get specific todo by id
app.get('/todos/:id', function (req, res) {

});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});