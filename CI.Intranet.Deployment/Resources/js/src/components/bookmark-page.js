angular.module('discoverIntranet').controller('bookmarkPageController', ['$scope', 'listService', function ($scope, listService){
    var _pageTitle;
    
    this.$onInit = function(){
        var title = bones.page.title;
        if (title){
            _pageTitle = title.trim();
        }
        else {
            _pageTitle = window.location.href.toLowerCase();
        }
        listService.checkBookmark(window.location.href).then(function (response){
            $scope.pageBookmarked = (response.length > 0); //blah blah
        });
    }

    this.doBookmark = function(){
        if (!$scope.pageBookmarked){
            listService.addBookmark(_pageTitle, window.location.href).then(function (response){
                $scope.pageBookmarked = true;
            });
        }
    }

}]).component('bookmarkPage', {
    controller:'bookmarkPageController',
    template: `
        <btn ng-class="{'active': pageBookmarked}" class="icon bookmark" ng-click="$ctrl.doBookmark()">
            <span class="icon-Bookmark"></span>
            <div class="active-bookmark">
                <span class="icon-Bookmark-Active4"><span class="path1"></span><span class="path2"></span></span>
            </div>
            <span class="button-text">Bookmark</span>
        </btn>
    `
});