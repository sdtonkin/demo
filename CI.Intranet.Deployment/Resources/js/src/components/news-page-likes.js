'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'newsPageLikesController';

myApp.controller(controllerName, ['$scope', 'yammerApiService', function ($scope, yammerApiService) {
    var ctrl = this;
    var location = window.location.href;
    
    this.$onInit = function () {
        $scope.isLowBandwidth = window.lowBandwidth;
        if (window.lowBandwidth) return;
        if (ctrl.pageUrl != null) {
            yammerApiService.getLikeCountForMessage(ctrl.pageUrl).then(function (response) {
                ctrl.likeCount = response;
            });        
        } else if (ctrl.threadId == null) {
            yammerApiService.getLikeCountForMessage(location).then(function (response) {
                ctrl.likeCount = response;
            });
        } else {
            if (ctrl.threadId == '') {
                ctrl.likeCount = 0;
            } else {
                yammerApiService.getLikesByThreadId(ctrl.threadId).then(function (response) {
                    ctrl.likeCount = response;
                });
            }
        }
    }
    
}]).component('newsPageLikes', {
    template: require('../../includes/News-Page-Likes.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    bindings: {
        threadId: '@',
        pageUrl: '@'
    }
});