'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'newsPageLikesController';

myApp.controller(controllerName, ['$scope', 'yammerApiService', function ($scope, yammerApiService) {
    var ctrl = this;
   
    
    this.$onInit = function () {
        var messageId;
        if ($scope.messageId == null) {
            messageId = getMessageId();
        } else {
            messageId = $scope.messageId;
        }
        
        if (messageId == null) {
            ctrl.likeCount = 0;
            return;
        }

        yammerApiService.getLikeCountForMessage(messageId).then(function (response) {
            ctrl.likeCount = response;
        });
    }
    
    function getMessageId() {
        yammerApiService.getMessagesForGroup(COM_CONFIG.yammer.defaultGroupId).then(function (response) {
            var url = window.location;
            var thread = _.find(response.messages, function (data) { return _.findIndex(data.attachments, function(a){ return a.name == url; });
            return thread.liked_by.count;
        });
    }
}]).component('newsPageLikes', {
    template: require('../../includes/News-Page-Likes.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    scope: {
        messageId: '@'
    }
});