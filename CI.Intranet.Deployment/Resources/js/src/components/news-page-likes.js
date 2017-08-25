'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'newsPageLikesController';

myApp.controller(controllerName, ['$scope', 'yammerApiService', function ($scope, yammerApiService) {
    var ctrl = this;
   
    
    this.$onInit = function () {
        var messageId = getMessageId();
        yammerApiService.getLikesCount(messageId).then(function (response) {
            ctrl.likeCount = response;
        });
    }
    function getMessageId() {
        var messageId = $('iframe#embed-feed').contents().find();
        console.log($('iframe#embed-feed').contents());
    }
}]).component('newsPageLikes', {
    template: require('../../includes/News-Page-Likes.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});