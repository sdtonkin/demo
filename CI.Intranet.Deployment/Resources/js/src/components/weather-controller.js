import pnp from "sp-pnp-js";

var ctrlName = "weatherController";
var myApp = angular.module('compassionIntranet');
myApp.controller(ctrlName, ['$scope', '$q', 'weatherService', 'userProfileService', 'COM_CONFIG', function($scope, $q, weatherService, userProfileService, COM_CONFIG) {
    var cacheObj = pnp.storage.local;
    // if (!DISCOVER_CONFIG.useCaching) { 
    //     cacheObj.delete(ctrlName);
    // }

    //get user location
    let expire = pnp.util.dateAdd(now, "minute", 60);
    cacheObj.getOrPut(ctrlName, userProfileService.getUserLocation, expire).then(function(data) {
        //    console.log("User Location");
        //    console.dir(data);
        $scope.UserLocation = data;
        var location = $scope.UserLocation;
        var unit = "F";
        if (location == "") {
            // console.log("Location is null. Setting location to Colorado Springs, CO");
            var location = "Colorado Springs, CO";

        } else {
            if (location == "Colorado Springs") {
                var location = "Colorado Springs, CO";
            }
        }

        getWeather(location, unit);
    });


    //get weather

    //pass in location to getWeather
    function getWeather(location, unit) {
        let now = (now);
        let expire = pnp.util.dateAdd(now, "minute", 5);
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
                //var forecast = data.query.results.channel.item.forecast;

                // var js = JSON.stringify(forecast);
                // for (var i = 0; i < 1; i++) {
                //     $scope.forecast = data.query.results.channel.item.forecast[i];
                // }
                $scope.title = data.query.results.channel.item.title;
                $scope.temp = data.query.results.channel.item.condition.temp;
                $scope.text = data.query.results.channel.item.condition.text;
                $scope.city = data.query.results.channel.location.city;
                $scope.state = data.query.results.channel.location.region;

                //get weather description
                var desc = data.query.results.channel.item.condition.text;
                var span = "";
                if (desc == "Heavy Snow" || desc == "Snow" || desc == "Snow Showers") {
                    span = "icon-weather_cloud_snowflake";
                } else {
                    if (desc == "Cloudy" || desc == "Mostly Cloudy" || desc == "Partly Cloudy") {
                        span = "icon-weather_cloud";
                    }

                    if (desc == "Scattered Thunderstorms") {
                        span = "icon-weather_downpour_sun";
                    }
                    if (desc == "Scattered Showers") {
                        span = "icon-weather_downpour_sun";

                    }
                    if (desc == "Fog" || desc == "Foggy" || desc == "Haze") {
                        span = "icon-weather_fog";
                    }
                    if (desc == "Hail" || desc == "Sleet") {
                        span = "icon-weather_hail";
                    }
                    if (desc == "Severe Thunderstorms" || desc == "Thuderstorm" || desc == "Thundershowers") {
                        span = "icon-weather_lightning";
                    }
                    if (desc == "Showers" || desc == "Rain" || desc == "Freezing Drizzle" || desc == "Drizzle" || desc == "Freezing Rain" || desc == "Mixed Rain and Hail") {
                        span = "icon-weather_rain";
                    }
                    if (desc == "Scattered Snow Showers" || desc == "Light Snow Shower") {
                        span = "icon-weather_snow_sun";
                    }
                    if (desc == "Snow Flurries" || desc == "Mixed Rain and Snow" || desc == "Mixed Rain and Sleet" || desc == "Mixed Snow and Sleet") {
                        span = "icon-weather_snow";
                    }
                    if (desc == "Isolated Thunderstorms" || desc == "Isolated Thundershowers") {
                        span = "icon-weather_storm_sun";
                    }
                    if (desc == "Sunny") {
                        span = "icon-weather_sun";
                    }

                    if (desc == "Windy" || desc == "Blowing Snow" || desc == "Breezy" || desc == "Blustery") {
                        span = "icon-weather_windgust";
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
    template: require("./weather.html"),
    controller: ctrlName,
    controllerAs: 'ctrl'
});