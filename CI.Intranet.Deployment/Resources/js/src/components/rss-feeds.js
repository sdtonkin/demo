'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'rssFeedsCtrl';

myApp.controller(controllerName, ['$scope', 'rssFeedService', 'COM_CONFIG', function ($scope, rssFeedService, COM_CONFIG) {
    var ctrl = this;
    $scope.$parent.$watch('ctrl.myFeeds', function (newVal, oldVal, scope) {
        if (newVal == null) return;
        ctrl.myFeeds = newVal;
    });
    this.$onInit = function () {
        ctrl.articleLimit = (ctrl.articleLimit ? ctrl.articleLimit : 5);
    };
}]).component('rssFeeds', {
    template: require('../../includes/RSS-Feeds.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    bindings: {
        articleLimit: '@'
    }
});
