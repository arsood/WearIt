angular.module('wearit.controllers', [])

.controller("WearCtrl", function($scope) {
  var currentStatus = window.localStorage.getItem("status");

  if (currentStatus === "on") {
    $scope.status = "on";

    var cTime = JSON.parse(window.localStorage.getItem("currentWear"));

    $scope.wearDuration = moment(cTime.timeOn).fromNow(true);
  } else {
    $scope.status = "off";
  }

  $scope.putOn = function() {
    window.localStorage.setItem("status", "on");

    $scope.wearDuration = moment().fromNow(true);

    var currentWear = JSON.stringify({
      timeOn: new Date(),
      timeOff: null
    });

    window.localStorage.setItem("currentWear", currentWear);

    $scope.status = "on";
  }

  $scope.takeOff = function() {
    var wearHistory = window.localStorage.getItem("wearHistory");
    var currentWear = JSON.parse(window.localStorage.getItem("currentWear"));

    currentWear.timeOff = new Date();

    if (wearHistory) {
      var historyArray = JSON.parse(wearHistory);
    } else {
      var historyArray = [];
    }

    historyArray.push(currentWear);

    window.localStorage.setItem("wearHistory", JSON.stringify(historyArray));
    window.localStorage.removeItem("currentWear");

    $scope.status = "off";

    window.localStorage.setItem("status", "off");
  }
})

.controller("HistoryCtrl", function($scope, $window) {
  var wearHistory = window.localStorage.getItem("wearHistory");

  if (wearHistory) {
    $scope.history = JSON.parse(wearHistory).reverse();
  } else {
    $scope.history = [];
  }

  $scope.formatTime = function(timeOff) {
    return moment(timeOff).format("MMM D")
  }

  $scope.formatDiff = function(on, off) {
    return moment(off).from(moment(on), true);
  }

  $scope.clearHistory = function() {
    window.localStorage.clear();

    $window.location.reload(true);
  }
});
