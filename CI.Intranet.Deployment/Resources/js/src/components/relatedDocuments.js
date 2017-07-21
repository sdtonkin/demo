// import pnp from "sp-pnp-js";
var ctrlName = "relatedNewsCtrl";
var myApp = angular.module('');

myApp.controller(ctrlName, ['$scope', 'relatedService', '_CONFIG', function($scope, relatedService, R_CONFIG) {

    // var cacheObj = pnp.storage.local;
    // if (!_CONFIG.useCaching) {
    //     cacheObj.delete(ctrlName);
    // }
    // cacheObj.getOrPut(ctrlName, relatedService.getData).then(function(data) {
    relatedService.getData().then(function(data) {
        $scope.newsSite = DISCOVER_CONFIG.rootWeb + "/news/pages/default.aspx";

        if (data.length === 0) {
            $scope.notFound = "No related stories found";
        } else if (data[0].contentType === true) {

            $scope.news = data;
        } 
    });

}]).component('relatedEvents', {
    template: require("./relatedEvents.html"),
    controller: ctrlName,
    controlleras: 'ctrl'
});