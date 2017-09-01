'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'myRssFeedsCtrl';

myApp.controller(controllerName, ['$scope', 'rssFeedService', 'COM_CONFIG', function ($scope, rssFeedService, COM_CONFIG) {
    var ctrl = this;
    ctrl.showManager = false;
    ctrl.myFeeds = [];
    
    this.$onInit = function () {
        var userId = _spPageContextInfo.userId;
        var articleLimit = ($scope.ctrl.articleLimit != null ? $scope.ctrl.articleLimit : 5);
        rssFeedService.getMyRssFeeds(userId, articleLimit).then(function (response) {
            ctrl.myFeeds = response;            
        });
    };    
    
}]).component('myRssFeeds', {
    template: require('../../includes/My-RSS-Feeds.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    bindings: {
        articleLimit: '@'
    }
});
