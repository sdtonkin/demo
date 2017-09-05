var ctrlName = "weatherController";
var myApp = angular.module('compassionIntranet');
myApp.controller(ctrlName, ['$scope', '$q', 'weatherService', 'userProfileService', 'COM_CONFIG', function($scope, $q, weatherService, userProfileService, COM_CONFIG) {
    
     
    this.$onInit = function () {
        $scope.lowBandwidth = window.lowBandwidth;
        if (window.lowBandwidth) return;
        var location = weatherService.getLocation();
        var loc = location.city + ', ' + location.region;

        weatherService.getWeather(loc, 'F').then(function (data) {
            console.log(data);
        });

        
    };
    
    function getWeather(location, unit) {
        let now = moment();
        let expire = $pnp.util.dateAdd(now, "minute", 5);
        cacheObj.getOrPut(ctrlName + "_weather", weatherService.getWeather.bind(this, location, unit), expire).then(function(response) {
            // $scope.Weather = data;
            $scope.noWeather = false;
            console.log("Weather", response);
            var data = null;
            if (response && response.data !== null && response.data.query && response.data.query.count !== 0 && response.data.query.results && response.data.query.results.channel && response.data.query.results.channel.item) {
                data = response.data;
            } else if (response !== null && response.query && response.query.count !== 0 && response.query.results && response.query.results.channel && response.query.results.channel.item) {
                data = response;
            }
            if (data) {
                $scope.title = data.query.results.channel.item.title;
                $scope.temp = data.query.results.channel.item.condition.temp;
                $scope.text = data.query.results.channel.item.condition.text;
                $scope.city = data.query.results.channel.location.city;
                $scope.state = data.query.results.channel.location.region;

                //get weather description
                var desc = data.query.results.channel.item.condition.text;
                var span = "";
                if (desc == "Heavy Snow" || desc == "Snow" || desc == "Snow Showers") {
                    span = "wi wi-snowflake-cold";
                } else {
                    if (desc == "Cloudy" || desc == "Mostly Cloudy" || desc == "Partly Cloudy" || desc == "Mostly Sunny") {
                        span = "wi wi-cloudy";
                    }

                    if (desc == "Scattered Thunderstorms") {
                        span = "wi wi-storm-showers";
                    }
                    if (desc == "Scattered Showers") {
                        span = "wi wi-showers";

                    }
                    if (desc == "Fog" || desc == "Foggy" || desc == "Haze") {
                        span = "wi wi-fog";
                    }
                    if (desc == "Hail" || desc == "Sleet") {
                        span = "wi wi-hail";
                    }
                    if (desc == "Severe Thunderstorms" || desc == "Thuderstorm" || desc == "Thundershowers") {
                        span = "wi wi-lightening";
                    }
                    if (desc == "Showers" || desc == "Rain" || desc == "Freezing Drizzle" || desc == "Drizzle" || desc == "Freezing Rain" || desc == "Mixed Rain and Hail") {
                        span = "wi wi-raindrops";
                    }
                    if (desc == "Scattered Snow Showers" || desc == "Light Snow Shower") {
                        span = "wi wi-snow";
                    }
                    if (desc == "Snow Flurries" || desc == "Mixed Rain and Snow" || desc == "Mixed Rain and Sleet" || desc == "Mixed Snow and Sleet") {
                        span = "wi wi-rain-mix";
                    }
                    if (desc == "Isolated Thunderstorms" || desc == "Isolated Thundershowers") {
                        span = "wi wi-thunderstorm";
                    }
                    if (desc == "Sunny") {
                        span = "wi wi-day-sunny";
                    }

                    if (desc == "Windy" || desc == "Blowing Snow" || desc == "Breezy" || desc == "Blustery") {
                        span = "wi wi-strong-wind";
                    }
                }
                //return span;
                $scope.image = span;
                $scope.unit = unit;

            } else {
                $scope.noWeather = true;
                cacheObj.delete(ctrlName + "_weather");
                $scope.$apply();
            }
        });


    }

}]).component('weatherCtrl', {
    template: require("../../includes/Weather.html"),
    controller: ctrlName,
    controllerAs: 'ctrl'
});