
var ctrlName = "relatedNewsCtrl";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, ['$scope', 'relatedNewsService', 'COM_CONFIG', 'common', function ($scope, relatedNewsService, COM_CONFIG, common) {
    var ctrl = this;
    $scope.notFound = 'Retrieving related articles...';
    var articleLimit = (ctrl.articleLimit == null ? 3 : parseInt(ctrl.articleLimit))

    this.$onInit = function () {
        var newsType = $('#article-news-type').text().trim();
        var pageUrl = window.location.href;
        
        relatedNewsService.getRelatedNews(newsType, pageUrl, articleLimit).then(function (data) {
            $scope.newsSite = COM_CONFIG.rootWeb + "/news/pages/default.aspx";
            if (!COM_CONFIG.isProduction) { console.log('related news', data); }
            if (data.length === 0) {
                $scope.notFound = "No related stories found";
            } else {
                $scope.topImageUrl = (data[0].ImageUrl == null ? '' : data[0].ImageUrl);
                $scope.notFound = '';
                $scope.news = data;
            }
        });
    };

    function checkForFilterInUrl() {
        getUrlParamByName
    }
}]).component('relatedNews', {
    template: require('../../includes/Related-News.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        articlelimit: '@'
}
});