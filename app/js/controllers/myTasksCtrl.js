'use strict';

app.controller('myTasksCtrl', function($scope, todoService, $location) {

    var msgAlert = function(msg, visibilidad, state){
        $scope.msgAlerta = msg;
        $scope.msgVisible = visibilidad;
        $scope.styleAdded = state;
    }


    //get all elements
    $scope.getAll = function() {
        todoService.getAll()
            .success(function (data, status, headers, config) {
                $scope.tasks = data;
                numDone();
            })
            .error(function(data, status, headers, config) {
                alert(current);
            });
    }

    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.tasks, function (task) {
            count += task.done ? 0 : 1;
        });
        return count;
    };

    var numDone = function () {
        $scope.countDelete = 0;
        angular.forEach($scope.tasks, function (t) {
            $scope.countDelete += t.done ? 1 : 0;
        });
    };

    // Call to blogService.create()
    $scope.addTask = function() {
        //debugger;
        if($scope.textNewTask == "" || $scope.textNewTask == undefined) {
            $scope.empty = true;
            msgAlert("You must enter a task", true, false);
            return;
        }
        var task = {
            text : $scope.textNewTask,
            done : false
        };
        todoService.create(task)
            .success(function (task,current, status, headers, config) {
                $scope.tasks.push(task);
//                $scope.getAll();
                $scope.textNewTask = "";
                msgAlert("Task added", true, true) ;
            })
            .error(function (current, status, headers, config) {
                alert(current);
            });
    };

    $scope.selection = function(task){

        msgAlert("", false, false);
        todoService.selection(task.id)
        .success(function (task) {
                var selTask = _.find($scope.tasks, function(itemTask){return itemTask.id == task.id});
                selTask.done = task.done;
                numDone();
            })
                .error(function(current, status, headers, config) {
                    alert(current);
                });
    }

    $scope.delSelectedTasksC = function(){
        if($scope.countDelete == 0){
            msgAlert("You must select the task to delete", true, false);
            return;
        }
        todoService.delSelectedTasks()
            .success(function(Tasks){
                msgAlert("Deleted task", true, true);
                $scope.tasks = Tasks;
            })
            .error(function(current){
                alert(current)
            });
    }

    $scope.verifyText = function(){
        if($scope.textNewTask != "" || $scope.textNewTask != undefined) {
            msgAlert("", false, false);
            $scope.empty = false;
        }
    }

    //call this method at first!
    $scope.getAll();
});