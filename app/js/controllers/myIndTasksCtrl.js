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


    $scope.eliminarTask = function(task){
        $scope.current;
        todoService.borrarTarea(task.id)
            .success(function (id) {
//               var selTask = _.find($scope.tareas, function(itemTask){return itemTask.id == id});
//                var taskIndex = ;
                $scope.tareas.splice($scope.tareas.indexOf(task), 1);
            })
            .error(function(current) {
                alert(current);
            });
    }

    $scope.editarTask= function(task){
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
        task.texto = $scope.textoNuevo;
        debugger;
        todoService.editarTarea(task)
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

    $scope.restantes = function () {
        var cuenta = 0;
        angular.forEach($scope.tareas, function (tarea) {
            cuenta += tarea.hecho ? 0 : 1;
        });
        return cuenta;
    }
    //call this method at first!
    $scope.getAll();
});