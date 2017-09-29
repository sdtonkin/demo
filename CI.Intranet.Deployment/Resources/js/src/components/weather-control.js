'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'weatherCtrl';

myApp.controller(controllerName, ['$scope', 'weatherService', 'COM_CONFIG', 'storage', function ($scope, weatherService, COM_CONFIG, storage) {
    var ctrl = this,
        location,
        weather;
    var store = _.where(COM_CONFIG.storage, function (s) { return s.service = 'weatherService'; });
    var locationStore = _.find(store, function (l) { return l.key.indexOf('LOCATION') != -1; });
    var weatherStore = _.find(store, function (l) { return l.key.indexOf('WEATHER') != -1; });
    
    this.$onInit = function () {
        $scope.lowBandwidth = window.lowBandwidth;
        if (window.lowBandwidth) return;

        weather = storage.get(weatherStore.key);
        if (weather == null) {
            location = storage.get(locationStore.key);
            if (location != null) {
                getWeatherByLocation(location);
            } else {
                getWeather();
            }            
        } else {
            $scope.noWeather = false;
            $scope.title = weather.title;
            $scope.temp = weather.temp;
            $scope.text = weather.text;
            $scope.city = weather.city;
            $scope.state = weather.state;
            $scope.image = weather.weatherIcon;
            $scope.unit = weather.unit;
        }
        
    };
    function getWeatherByLocation(location) {
        weatherService.getWeather(location, 'F').then(function (data) {
            $scope.noWeather = false;
            $scope.title = data.title;
            $scope.temp = data.temp;
            $scope.text = data.text;
            $scope.city = data.city;
            $scope.state = data.state;
            $scope.image = data.weatherIcon;
            $scope.unit = data.unit;
        });
    }
    function getWeather() {
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
    }
}]).component('weatherControl', {
    template: require("../../includes/Weather.html"),
    controller: controllerName,
    controllerAs: 'ctrl'
});
