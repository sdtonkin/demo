
var ctrlName = "relatedNewsCtrl";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'relatedNewsService', 'COM_CONFIG', function ($scope, relatedNewsService, COM_CONFIG) {
    var ctrl = this;

    this.$onInit = function () {
        relatedNewsService.getData().then(function (data) {
            $scope.newsSite = COM_CONFIG.rootWeb + "/news/pages/default.aspx";
            console.log('related news', data);
            if (data.length === 0) {
                $scope.notFound = "No related stories found";
            } else {
                $scope.news = data;
            }
        });
    };
}]).component('relatedNews', {
    template: require('../../includes/Related-News.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        articlelimit: '@'
}
});