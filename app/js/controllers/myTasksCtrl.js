'use strict';

app.controller('myTasksCtrl', function($scope, todoService, $location) {

    var msgAlert = function(msg, visibilidad, estado){
        $scope.msgAlerta = msg;
        $scope.msgVisible = visibilidad;
        $scope.styleAgregado = estado;
    }


    //get all elements
    $scope.getAll = function() {
        todoService.getAll()
            .success(function (data, status, headers, config) {
                $scope.tareas = data;
                numEliminar();
            })
            .error(function(data, status, headers, config) {
                alert(current);
            });
    }

    $scope.restantes = function () {
        var cuenta = 0;
        angular.forEach($scope.tareas, function (tarea) {
            cuenta += tarea.hecho ? 0 : 1;
        });
        return cuenta;
    };

    var numEliminar = function () {
        $scope.cuentaEliminar = 0;
        angular.forEach($scope.tareas, function (tarea) {
            $scope.cuentaEliminar += tarea.hecho ? 1 : 0;
        });
    };

    // Call to blogService.create()
    $scope.addTask = function() {
        var task = {
            texto : $scope.textoNuevaTarea,
            hecho : false
        };

        //debugger;
        if($scope.textoNuevaTarea == "" || $scope.textoNuevaTarea == undefined) {
            $scope.vacio = true;
            msgAlert("Debe ingresar la tarea", true, false)
            return;
        }
        todoService.create(task)
            .success(function (task,current, status, headers, config) {
                debugger;
                $scope.tareas.push(task);
//                $scope.getAll();
                $scope.textoNuevaTarea = "";
                msgAlert("Tarea agreagada", true, true) ;
            })
            .error(function (current, status, headers, config) {
                alert(current);
            });
    };

    $scope.seleccion = function(task){

        msgAlert("", false, false);
        todoService.seleccion(task.id)
        .success(function (task) {
                var selTask = _.find($scope.tareas, function(itemTask){return itemTask.id == task.id});
                selTask.hecho = task.hecho;
                numEliminar();
//                debugger;
//                task.hecho = hecho;
            })
                .error(function(current, status, headers, config) {
                    alert(current);
                });
    }

    $scope.delSelectedTasksC = function(){
        if($scope.cuentaEliminar == 0){
            msgAlert("Debe seleccionar la tarea a elminar", true, false);
            return;
        }
        todoService.delSelectedTasks()
            .success(function(Tasks){
                msgAlert("Tarea eliminada", true, true);
                $scope.tareas = Tasks;
            })
            .error(function(current){
                alert(current)
            });
    }

    $scope.verificaTexto = function(){
        if($scope.textoNuevaTarea != "" || $scope.textoNuevaTarea != undefined) {
            msgAlert("", false, false);
            $scope.vacio = false;
        }
    }




    //call this method at first!
    $scope.getAll();
});