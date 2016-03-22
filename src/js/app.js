var app = angular.module("app", []);


app.controller("taskCrt", function ($scope, taskService) {

    function init() {
        $scope.listTasks = taskService.getAll();
        $scope.titleTask = "liste de tache";

        $scope.newTask = "";
    }

    $scope.addTask = function addTask() {
        if ($scope.newTask !== "") {

            $scope.listTasks = taskService.addTask(dataTask($scope.newTask ));
        }

        $scope.newTask = "";

    }

    $scope.deleteTask = function deleteTask(index) {
        console.log(index);
        $scope.listTasks = taskService.deleteTask(index);
    }

    function dataTask(newTask ){
        return {id: $scope.listTasks.length + 1, titre: newTask, dateProgrom: "2016-03-02"};
    }
    init();

});


app.service("taskService", function () {
    var list = [{
        id: 0001,
        titre: "task 1",
        dateProgrom: "2016-03-02"
    }, {
        id: 0002,
        titre: "task 1",
        dateProgrom: "2016-03-02"
    }]
    this.getAll = function getAll() {
        return list;
    }

    this.addTask = function addTask(data) {
        list.push(data);
        return list;
    }

    this.deleteTask = function deleteTask(index) {

        list.splice(index, 1);
        return list;
    }
});
