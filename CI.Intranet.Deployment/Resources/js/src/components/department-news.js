const ctrlName = "depNewsCtrl";
// const cacheObj = pnp.storage.local;
const myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, function($scope, departmentNewsService, COM_CONFIG, yammerApiService) {

    $scope.newsSite = DISCOVER_CONFIG.rootWeb + "/news/pages/default.aspx";
    // if (!DISCOVER_CONFIG.useCaching) {
    //     cacheObj.delete(ctrlName);
    // }

    // cacheObj.getOrPut(ctrlName, departmentNewsService.getNews).then(function(data) {
    departmentNewsService.getNews().then(function(data) {
        if (data.results) {
            let events = data.results.filter(function(item) {

                let x = item.ContentType
                if (x.indexOf('Event') > 0) return item;
            });

            let news = data.results.filter(function(item) {
                let x = item.ContentType
                if (x.indexOf('Article') > 0) return item;
            });

            // calculate likes
            // angular.forEach(events, function(item) {
            //     yammerApiService.getLikesAndComments(item.FileRef).then(function(data) {
            //         item.likes = data.results.likes;
            //         item.commentCount = data.results.comments;
            //     });
            // });


            $scope.department = data.userDepartment;
            $scope.departmentUrl = data.departmentLink;
            $scope.newsLink = data.departmentLink + "pages/news.aspx";
            $scope.news = news;
            $scope.events = events;
        } else {
            console.log("No department results");
        }
    });

}).component('departmentNews', {

    template: require("../../includes/Department-News.html"),
    controller: ctrlName,
    controllerAs: 'ctrl'

});