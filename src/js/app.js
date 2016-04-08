var app = angular.module("app", ['ngRoute', 'ui.bootstrap']);

app.constant("myConfig", {
    "url": "http://localhost",
    "port": "9000"
});


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.

        when('/', {
            templateUrl: './src/view/listTask.html',
            controller: 'taskCrt'
        }).

        when('/add', {
            templateUrl: './src/view/addTask.html',
            controller: 'taskCrt'
        }).

        otherwise({
            redirectTo: '/'
        });

}]);


app.controller("taskCrt", function ($scope, taskService, $window) {

    function init() {
        $scope.listTasks = taskService.getAll();
        $scope.titleTask = "liste de tache";

        $scope.newTask = "";
    }

    $scope.addTask = function addTask() {
        $scope.listTasks = taskService.addTask(dataTask($scope.newTask));
        $window.location.href = '#/';
    }

    $scope.deleteTask = function deleteTask(index) {
        $scope.listTasks.splice(index, 1) ;

    }

    function dataTask(newTask) {
        return {id: $scope.listTasks.length, titre: newTask.titre, dateProgrom: newTask.date};
    }

    init();

    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

});


app.service("taskService", function ($http, myConfig) {

    var listTaskService = [
        {id: 1, titre: "Task1", dateProgrom: "2016-03-02"},
        {id: 2, titre: "Task2", dateProgrom: "2016-03-02"}
    ]

    this.getAll = function getAll() {
        return listTaskService;
    }

    this.addTask = function addTask(data) {

        return listTaskService.push(data);


    }
});
