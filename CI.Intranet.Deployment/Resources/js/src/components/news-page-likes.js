'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'newsPageLikesController';

myApp.controller(controllerName, ['$scope', 'yammerApiService', function ($scope, yammerApiService) {
    var ctrl = this;
    var location = window.location.href;
    
    this.$onInit = function () {
        if ($scope.threadId == null) {
            yammerApiService.getLikeCountForMessage(location).then(function (response) {
                ctrl.likeCount = response;
            });
        }
        else {
            yammerApiService.getLikesByThreadId($scope.threadId).then(function (response) {
                ctrl.likeCount = response;
            });
        }
    }
    
}]).component('newsPageLikes', {
    template: require('../../includes/News-Page-Likes.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    scope: {
        threadId: '@'
    }
});