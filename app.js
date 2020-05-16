var express=require('express');

var app = express();

var todoController =require('./controllers/todoController');
//set up template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));//find static files in every route

//fire controllers
todoController(app);

//listen to port
app.listen(3000);
console.log('The app is up and running at port http://localhost:3000');
