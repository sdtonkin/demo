var myApp = angular.module('compassionIntranet'),
    controllerName = 'myRssFeedsCtrl';

myApp.controller(controllerName, ['$scope', 'rssFeedService', 'COM_CONFIG', function ($scope, rssFeedService, COM_CONFIG) {
    rssFeedService.getMyRssFeeds().then(function (reponse) {
        $scope.myFeeds = response;
    });
}]).component('myRssFeeds', {
    template: require('./My-RSS-Feeds.html'),
    controller:controllerName,
    controllerAs: 'ctrl'
});