'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'myDocumentsCtrl';

myApp.controller(controllerName, ['$scope', 'documentService', 'COM_CONFIG', function ($scope, documentService, COM_CONFIG) {
    var userId = _spPageContextInfo.userId,
        userDisplayName = _spPageContextInfo.userDisplayName;

    this.$onInit = function () {
        documentService.getMyDocuments(userDisplayName).then(function (response) {
            ctrl.myDocuments = response;
        });
    };
}]).component('myDocuments', {
    template: require('../../includes/My-Documents.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
