angular.module('compassionIntranet').service('weatherService', ['$q', '$http', 'COM_CONFIG', 'storage'], function ($q, $http, COM_CONFIG, storage) {
    var ctrl = this;
    var locationKey = 'CI-Intranet-Location-Key',
        weatherKey = 'CI-Intranet-Weather-Key';
    ctrl.getWeather = function (location, unit) {
        var defer = $q.defer();
        
        $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + location + "%22)%20and%20u%3D%22" + unit + "%22&&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys").
            then(function(data, status, headers) {
                defer.resolve(data);
            }, function(data){
                console.log("Error calling the yahoo weather service", data);
                defer.resolve(null);
            });
        return defer.promise;
    }
    ctrl.getLocation = function () {
        if (storage.get(locationKey) != null) {
            return storage.get(locationKey);
        }

        var defer = $q.defer();
        var url = COM_CONFIG.locationByIPUrl;
        $http.get(url).
            then(function (data, status, headers) {
                storage.set(locationKey, data, 24);
                defer.resolve(data);                
            }, function (data) {
                console.log("Error calling the ip / location service", data);
                defer.reject(data);
            });
        return defer.promise;
    }
});