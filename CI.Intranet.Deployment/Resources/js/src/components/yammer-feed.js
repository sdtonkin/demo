'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'yammerFeedController';

myApp.controller(controllerName, ['$rootScope', '$scope', '$q', 'COM_CONFIG', function ($rootScope, $scope, $q, COM_CONFIG) {
    var ctrl = this;
    
    this.$onInit = function () { 
        
    };

}]).component('yammerFeed', {
    template: require('../../includes/Yammer-Feed.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});