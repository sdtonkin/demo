'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'newsPageLikesController';

myApp.controller(controllerName, ['$scope', 'yammerApiService', function ($scope, yammerApiService) {
    var ctrl = this;
    var location = window.location.href;
    
    this.$onInit = function () {
        yammerApiService.getOpenGraphItemByUrl(location).then(function (response) {
            console.log(response);
        });
    }
    
}]).component('newsPageLikes', {
    template: require('../../includes/News-Page-Likes.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    
});