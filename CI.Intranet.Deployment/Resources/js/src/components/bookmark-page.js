'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'bookmarkPageController';

myApp.controller(controllerName, ['$scope', 'bookmarkService', 'COM_CONFIG', function ($scope, bookmarkService, COM_CONFIG) {
    var ctrl = this;
    var thisUrl = window.location.href;
    var userId = _spPageContextInfo.userId;
    var pageId = _spPageContextInfo.pageItemId;
    var webUrl = _spPageContextInfo.webAbsoluteUrl;
    
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
        bookmarkService.addMyBookmark(userId, pageId, thisUrl, webUrl).then(function (response) {
            ctrl.myBookmarks.push(response);
        });
    }

}]).component('bookmarkPage', {
    template: require('../../includes/Bookmark-Page.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});