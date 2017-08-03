angular.module('discoverIntranet').service('weatherService', function ($q, $http) {

    this.getWeather = function(location, unit) {
       // console.log("getting weather for " + location);
        var defer = $q.defer();
        
        $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + location + "%22)%20and%20u%3D%22" + unit + "%22&&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys").
            then(function(data, status, headers) {
                defer.resolve(data);
               // $scope.greeting = data.query.results.channel.item.link;
               //  var fore = data.query.results.channel.item.forecast;
            }, function(data){
                console.log("Error calling the yahoo weather service", data);
                defer.resolve(null);
            });
        return defer.promise;
    }
});