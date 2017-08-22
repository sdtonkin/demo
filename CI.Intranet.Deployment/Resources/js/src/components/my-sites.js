'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'mySitesCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'spService', 'COM_CONFIG', function ($scope, common, spService, COM_CONFIG) {
    var ctrl = this;

    this.$onInit = function () {
        bookmarkService.getMyBookmarks(userId).then(function (response) {
            ctrl.myBookmarks = angular.copy(response);
            ctrl.myBookmarksFromDb = response;
            getSortOrderLimits();
        });        
    };
}]).component('mySites', {
    template: require('../../includes/My-Sites.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
