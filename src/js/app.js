var app=angular.module("app",[]);

app.directive("beezenDirective",function(){
   return {
            restrict: '',
            templateUrl: './src/view/directive.html',
            controller: function($scope){
                $scope.titleTask = "liste de tache";
                $scope.listTasks = [];
                $scope.newTask = "";

                $scope.addTask = function addTask() {
                    if ($scope.newTask !== "")
                        $scope.listTasks.push($scope.newTask);
                    $scope.newTask = "";
                }

                $scope.deleteTask = function deleteTask(index) {

                    $scope.listTasks.splice(index, 1);

                }
       }
    }

});