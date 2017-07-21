var myApp = angular.module('compassionIntranet'),
    controllerName = 'myRssFeedsCtrl';

myApp.controller(controllerName, ['$scope', 'rssFeedService', 'COM_CONFIG', function ($scope, rssFeedService, COM_CONFIG) {
    this.$onInit = function () {
        var userId = _spPageContextInfo.userId;
        var articleLimit = $scope.ctrl.articlelimit;
        rssFeedService.getMyRssFeeds(userId, articleLimit).then(function (response) {
            $scope.myFeeds = response;
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
