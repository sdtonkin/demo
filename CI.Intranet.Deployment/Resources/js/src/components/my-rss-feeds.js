var myApp = angular.module('compassionIntranet'),
    controllerName = 'myRssFeedsCtrl';

myApp.controller(controllerName, ['$scope', 'rssFeedService', 'COM_CONFIG', function ($scope, rssFeedService, COM_CONFIG) {
    this.$onInit = function () {
        var userId = _spPageContextInfo.userId;
        rssFeedService.getMyRssFeeds(userId).then(function (response) {
            $scope.myFeeds = response;
        });
    }
}]).component('myRssFeeds', {
    template: require('../../includes/My-RSS-Feeds.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
