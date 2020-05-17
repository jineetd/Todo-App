var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://test:test@cluster0-lnytd.mongodb.net/test?retryWrites=true&w=majority');

//create a schema
var todoSchema=new mongoose.Schema({
  item: String
});

var Todo=mongoose.model('Todo',todoSchema);

/*var itemOne=Todo({item:'get flowers'}).save(function(err){
  if(err) throw err;
  console.log('item saved');
});*/


//var data=[{item:'Intern work'},{item:'prepare for placements'},{item:'Write paper'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports=function(app){
  app.get('/todo',function(req,res){
    //get data  from mongoDB and pass it to a view
    Todo.find({},function(err,data){
      if(err) throw err;
      res.render('todo',{todos:data});
    });

  });

  app.post('/todo',urlencodedParser,function(req,res){
    //get data from the view and add it to mongoDB
    var newTodo=Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    });

  });

  app.delete('/todo/:item',function(req,res){
    //delete the requested item from mongoDB
    Todo.find({item:req.params.item.replace(/\-/g,' ')}).deleteOne(function(err,data){
      if(err) throw err;
      res.json(data);
    });
    /*data=data.filter(function(todo){
      return todo.item.replace(/ /g,'-') !== req.params.item;
    });
    res.json(data);*/
  });
};
