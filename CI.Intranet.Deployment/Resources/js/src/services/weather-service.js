
var serviceName = 'weatherService';
angular.module('compassionIntranet').service(serviceName, ['$q', '$http', 'COM_CONFIG', 'storage', 'common', function ($q, $http, COM_CONFIG, storage, common) {
    var ctrl = this;
    var store = _.where(COM_CONFIG.storage, function (s) {
        return s.service = serviceName;
    });
    var locationStore = _.find(store, function (l) {
        return l.key.indexOf('LOCATION') != -1;
    });
    var weatherStore = _.find(store, function (l) {
        return l.key.indexOf('WEATHER') != -1;
    });
    var locationKey = locationStore.key,
        weatherKey = weatherStore.key,
        locationExpiration = locationStore.expire,
        weatherExpiration = weatherStore.expire;
    
    common.checkForClearStatement(locationStore.clearCommand, locationKey);
    common.checkForClearStatement(weatherStore.clearCommand, weatherKey);

    ctrl.getWeather = function (location, unit) {
        var defer = $q.defer();

        $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + location + "%22)%20and%20u%3D%22" + unit + "%22&&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys").
            then(function (data, status, headers) {
                var w = {};
                w.title = data.data.query.results.channel.item.title;
                w.temp = data.data.query.results.channel.item.condition.temp;
                w.text = data.data.query.results.channel.item.condition.text;
                w.city = data.data.query.results.channel.location.city;
                w.state = data.data.query.results.channel.location.region;
                w.description = data.data.query.results.channel.item.condition.text;
                w.weatherIcon = getIcon(w.description);
                w.unit = unit;

                storage.set(weatherKey, w, weatherExpiration);
                defer.resolve(w);
            }, function (data) {
                console.error("Error calling the yahoo weather service", data);
                defer.reject(null);
            });
        return defer.promise;
    };
    function getIcon(desc) {
        var span;
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

        return span;
    }
    ctrl.getLocationFromIpAddress = function (ipAddress) {
        if (storage.get(locationKey) != null) {
            return storage.get(locationKey);
        }

        var defer = $q.defer();
        var url = COM_CONFIG.locationByIPUrl;
        $http.get(url).
            then(function (data, status, headers) {
                storage.set(locationKey, data, locationExpiration);
                defer.resolve(data);
            }, function (data) {
                console.error("Error calling the ip / location service", data);
                defer.reject(data);
            });
        return defer.promise;
    };
    ctrl.getLocationFromLatLong = function (latitude, longitude) {
        var defer = $q.defer();
        var url = COM_CONFIG.locationByLatLongUrl + latitude + ',' + longitude;
        $http.get(url).
            then(function (data, status, headers) {
                var loc = _.filter(data.data.results, function (d) { return _.contains(d.types, 'locality') });                
                if (loc.length == 0) {
                    console.log('getLocationFromLatLong Error: ', data);
                    defer.resolve('Colorado Springs, CO');                    
                } else {
                    storage.set(locationKey, loc[0].formatted_address, locationExpiration);
                    defer.resolve(loc[0].formatted_address);
                }
            }, function (data) {
                console.error("Error calling the ip / location service", data);
                defer.reject(data);
            });
        return defer.promise;
    };
    ctrl.getIpAddress = function () {
        var defer = $q.defer();
        $.get("https://ipinfo.io/json", function (data) {
            defer.resolve(data);
        });
        return defer.promise;
    }
    ctrl.getLocationFromService = function () {
        var defer = $q.defer();
        $.get(COM_CONFIG.locationByIPUrl, function (data) {
            defer.resolve(data);
        });
        return defer.promise;
    }
    ctrl.getLocation = function () {
        var defer = $q.defer();
        if (storage.get(locationKey) != null) {        
            defer.resolve(storage.get(locationKey));
        } else if (navigator.geolocation) {        
            try {
                getPosition().then(function (position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude
                    ctrl.getLocationFromLatLong(latitude, longitude).then(function (data) {
                        defer.resolve(data);
                    });
                }).catch(function (err) {
                    ctrl.getLocationFromService().then(function (data) {
                        defer.resolve(data.city + ', ' + data.region);
                    });
                });;
            }
            catch(ex) {
                ctrl.getLocationFromService().then(function (data) {
                    defer.resolve(data.city + ', ' + data.region);
                });
            }
        } else {
            ctrl.getLocationFromService().then(function (data) {
                defer.resolve(data.city + ', ' + data.region);
            });
        }

        return defer.promise;
    }
    var getPosition = function (options) {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    }
    function successLocation(position) {
        var loc = {};
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;        
    }
}]);