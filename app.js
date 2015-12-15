angular.module('adventApp', [])
  .controller('CalendarCtrl', ['$scope', function loadCalendar ($scope) {
    var
      iterationValue,
      adventLength = 25;
    $scope.daysOfAdvent = [];
    for (iterationValue = 0; iterationValue < adventLength; iterationValue++) {
      $scope.daysOfAdvent.push({imgSrc: '', showNumber: false});
    }
    $scope.toggleDay = function (idx){
      var specificDay = $scope.daysOfAdvent[idx];
      specificDay['showNumber'] = !specificDay['showNumber'];
    };
  }])
