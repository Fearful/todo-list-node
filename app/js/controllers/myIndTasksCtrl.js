'use strict';

app.controller('myIndTasksCtrl', function($scope, todoService) {
    //get all elements

    $scope.textBtEdit = "Edit";
    $scope.state = true;
    var btEdit = true;


    $scope.getAll = function() {
        todoService.getAll()
            .success(function (data, status, headers, config) {
                $scope.tareas = data;
            })
            .error(function(data, status, headers, config) {
                alert(current);
            });
    }


    $scope.delTask = function(task){
        $scope.current;
        todoService.delTask(task.id)
            .success(function (id) {
//               var selTask = _.find($scope.tareas, function(itemTask){return itemTask.id == id});
//                var taskIndex = ;
                $scope.tasks.splice($scope.tasks.indexOf(task), 1);
            })
            .error(function(current) {
                alert(current);
            });
    }

    $scope.editTask= function(task){
        if(btEdit == true){
            $scope.state = false;
            $scope.textBtEdit = "Save";
            btEdit = false;
        }
        else{
            confirmEditTask(task);
        }
    }


    var confirmEditTask = function(task){
        $scope.current;
        debugger;
        task.texto = $scope.newText;
        debugger;
        todoService.editTask(task)
            .success(function () {
                $scope.getAll();
                $scope.textBtEdit = "Edit";
                $scope.state = true;
                btEdit = true;
            })
            .error(function(current) {
                alert(current);
            });
    }

    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.tasks, function (task) {
            count += task.done ? 0 : 1;
        });
        return count;
    }
    //call this method at first!
    $scope.getAll();
});