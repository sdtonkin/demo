'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'weatherCtrl';

myApp.controller(controllerName, ['$scope', 'weatherService', 'COM_CONFIG', function ($scope, weatherService, COM_CONFIG) {
    var ctrl = this,
        location;
    
    this.$onInit = function () {
        $scope.lowBandwidth = window.lowBandwidth;
        if (window.lowBandwidth) return;

        weatherService.getLocation().then(function (location) {            
            weatherService.getWeather(location, 'F').then(function (data) {
                console.log('weather', data);
                $scope.noWeather = false;
                $scope.title = data.title;
                $scope.temp = data.temp;
                $scope.text = data.text;
                $scope.city = data.city;
                $scope.state = data.state;
                $scope.image = data.weatherIcon;
                $scope.unit = data.unit;
            });
        });     
        
    };
}]).component('weatherControl', {
    template: require("../../includes/Weather.html"),
    controller: controllerName,
    controllerAs: 'ctrl'
});
