var app = angular.module("app", []);

app.constant("myConfig", {
    "url": "http://localhost",
    "port": "9000"
})

app.controller("taskCrt", function ($scope, taskService) {

    function init() {
        taskService.getAll().success(function (data) {
            $scope.listTasks = data;
        });
        $scope.titleTask = "liste de tache";

        $scope.newTask = "";
    }

    $scope.addTask = function addTask() {
        if ($scope.newTask !== "") {
            var dataInsert = dataTask($scope.newTask);
            taskService.addTask(index).success(function () {
                $scope.listTasks.splice(dataInsert);
            });
        }

        $scope.newTask = "";

    }

    $scope.deleteTask = function deleteTask(index) {

        taskService.deleteTask(index).success(function () {
            $scope.listTasks.splice(index, 1);
        });

    }

    function dataTask(newTask) {
        return {id: $scope.listTasks.length, titre: newTask, dateProgrom: "2016-03-02"};
    }

    init();

});


app.service("taskService", function ($http, myConfig) {

    this.getAll = function getAll() {
        return $http.get(myConfig.url + ":" + myConfig.port + "/serverGetAll");
    }

    this.addTask = function addTask(data) {

       return $http({
            method: "post",
            url: myConfig.url + ":" + myConfig.port + "/serverPostAdd",
            data: data
        });


    }

    this.deleteTask = function deleteTask(index) {
        return $http({
            method: "delete",
            url: myConfig.url + ":" + myConfig.port + "/serverDelete",
            data: {index:index}
        });
    }
});
