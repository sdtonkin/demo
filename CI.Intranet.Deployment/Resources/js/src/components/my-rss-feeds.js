'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'myRssFeedsCtrl';

myApp.controller(controllerName, ['$scope', 'rssFeedService', 'COM_CONFIG', function ($scope, rssFeedService, COM_CONFIG) {
    var ctrl = this;
    ctrl.showManager = false;
    this.$onInit = function () {
        var userId = _spPageContextInfo.userId;
        var articleLimit = ($scope.ctrl.articlelimit != null ? $scope.ctrl.articlelimit : 5);
        rssFeedService.getMyRssFeeds(userId, articleLimit).then(function (response) {
            ctrl.myFeeds = response;
            ctrl.showNoFeedsMessage = ctrl.myFeeds.length == 0;
        });
    };    
    
}]).component('myRssFeeds', {
    template: require('../../includes/My-RSS-Feeds.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    bindings: {
        articlelimit: '@'
    }
});
