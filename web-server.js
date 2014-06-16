var express = require("express"),
    app     = express()

var _ = require("underscore");

var myTasks = [{
    id: 1,
    texto: 'Nico',
    hecho: true
},
    {
        id: 2,
        texto: 'Fede',
        hecho: false
    },
    {
        id:3,
        texto: 'hola que tal...',
        hecho: true
    }
];

var cont = myTasks.length;

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.errorHandler());
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
    app.use(express.errorHandler());
    app.use(app.router);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


app.get("/", function(req, res) {
    res.redirect("/index.html");
});

// get all Tasks
app.get('/api/myTasks', function(req, res){
    res.send (myTasks) ;
});

// create a new Task.   Preguntar id, texto hecho.   que hace res.json?
//NO SE PUEDE PASAR LA TAREA ENTERA Y AGREGARLA EN LUGAR DE DESARMAR EL OBJETO?

app.put('/newTask', function(req, res) {
    var newTask = {
        id : ++cont,
        texto : req.body.texto,
        hecho : req.body.hecho
    };
    myTasks.push(newTask);
    res.json(true);
});

// delete a particular task
app.delete('/delete', function(req, res) {

    var selTasks = _.where(myTasks, {hecho: false});
    myTasks = selTasks;
    res.json(true);


//    var oldTasks = myTasks;
//            myTasks = [];
//    angular.forEach(oldTasks, function (task) {
//        if (!task.hecho) myTasks.push(task);
//    });

//
//    _.each(myTasks, function(tarea){
//        if(tarea.hecho) {
//            var taskIndex = myTasks.indexOf(tarea);
//            myTasks.splice(taskIndex, 1);
//            res.json(true);
//        }
//    })
});

// Select a particular task
//app.post('/selectedTask', function(req, res) {
//    selTask = _.find(myTasks, function(itemTask){return itemTask.id == req.body.id});
//    var taskIndex = myTasks.indexOf(selTask);
//    myTasks[taskIndex] = req.body;
//    res.json(true);
//});

app.post('/selectedTask/:id', function(req, res) {
    selTask = _.find(myTasks, function(itemTask){return itemTask.id == req.params.id});
    var taskIndex = myTasks.indexOf(selTask);
    myTasks[taskIndex].hecho = !myTasks[taskIndex].hecho;
    res.json(true);

});



app.delete('/delTask/:id', function(req, res){
    selTask = _.find(myTasks, function(itemTask){return itemTask.id == req.params.id});
    var taskIndex = myTasks.indexOf(selTask);
    myTasks.splice(taskIndex, 1);
    res.json(true);
});


// update a created Task    est'a bien req.params.id?
// var postIndex = myPosts.indexOf(selPost);  que hace?
// myTasks[postIndex] = req.body;   no entiendo
// res.json(true);   return que fue correcto?
// _ que sentido tiene?
app.post('/editPost', function(req, res) {
    selTask= _.find(myTasks, function(itemTask){return itemTask.id == req.params.id});
    var postIndex = myTasks.indexOf(selPost);
    myTasks[postIndex] = req.body;
    res.json(true);
});