'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'bookmarkPageController';

myApp.controller(controllerName, ['$scope', 'bookmarkService', function ($scope, bookmarkService) {
    var ctrl = this;
    var thisUrl = _spPageContextInfo.siteAbsoluteUrl;
    var userId = _spPageContextInfo.userId;
    var webTitle = _spPageContextInfo.webTitle;
    
    this.$onInit = function(){
        bookmarkService.getMyBookmarks(userId).then(function (response) {
            ctrl.myBookmarks = response;
        });
    }

    ctrl.isMyBookmark = function () {
        return _.findIndex(ctrl.myBookmarks, function (b) {
            return b.url == thisUrl;
        }) != -1;
    }
    ctrl.addMyBookmark = function () {
        bookmarkService.addMyBookmark(userId, webTitle, thisUrl).then(function (response) {
            ctrl.myBookmarks.push(response);
        });
    }

}]).component('bookmarkPage', {
    template: require('../../includes/Bookmark-Page.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});