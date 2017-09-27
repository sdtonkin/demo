'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'rssFeedsCtrl';

myApp.controller(controllerName, ['$scope', 'rssFeedService', 'COM_CONFIG', function ($scope, rssFeedService, COM_CONFIG) {
    var ctrl = this;
    $scope.$parent.$watch('ctrl.myFeeds', function (newVal, oldVal, scope) {
        if (newVal == null) return;
        ctrl.myFeeds = newVal;
        $scope.activeFeedId = (newVal.length > 0 ? newVal[0].id : 0);
    });
    this.$onInit = function () {        
        ctrl.articleLimit = (ctrl.articleLimit ? ctrl.articleLimit : 5);
    };
    $scope.toggleActiveFeed = function (articleId) {
        if ($scope.activeFeedId == articleId) {
            $scope.activeFeedId = 0;
        } else {
            $scope.activeFeedId = articleId;
        }
    }
}]).component('rssFeeds', {
    template: require('../../includes/RSS-Feeds.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    bindings: {
        articleLimit: '@'
    }
});
