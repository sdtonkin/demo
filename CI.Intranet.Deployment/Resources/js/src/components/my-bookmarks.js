'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'bookmarkCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'modalService', 'bookmarkService', 'COM_CONFIG', function ($scope, common, modalService, bookmarkService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;    
    var isDirty = false;

    ctrl.enableSaveButton = function () {
        if (isDirty)
            $scope.systemMessage = '';
        return !isDirty;
    };
    this.$onInit = function () {
        ctrl.myBookmarks = $scope.$parent.ctrl.myBookmarks;
    };
    $scope.$parent.$watch('ctrl.myBookmarks', function (newVal, oldVal, scope) {
        if (newVal == null) return;
        ctrl.myBookmarks = newVal;
        ctrl.myBookmarksFromDb = scope.ctrl.myBookmarksFromDb;
    });
    
    function getSortOrderLimits() {
        var count = ctrl.myBookmarks.length;
        var response = [];
        for (var i = 1; i <= count; i++) {
            response.push(i);
        }
        $scope.myBookmarksSortList = response;
    }
    
}]).component('myBookmarks', {
    template: require('../../includes/My-Bookmarks.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
