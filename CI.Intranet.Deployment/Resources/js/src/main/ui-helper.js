'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'uiHelper',
    firstNameId = 'ci-user-first-name';

myApp.controller(controllerName, ['$scope', 'COM_CONFIG', function ($scope, COM_CONFIG) {
    var userDisplayName = _spPageContextInfo.userDisplayName,
    userId = _spPageContextInfo.userId;
    var userFirstName = getFirstName(userDisplayName);
    var userLastName = getLastName(userDisplayName);

    $scope.init = function () {
        addFirstNameToWelcomeMessage(userFirstName);
    };
    function addFirstNameToWelcomeMessage(firstName) {
        $('#' + firstNameId).text(firstName);
    }
    function getFirstName(fullName) {
        var names = fullName.split(' ');
        if (names.length > 0)
            return names[0];
        else
            return '';
    }
    function getLastName(fullName) {
        var names = fullName.split(' ');
        if (names.length > 1)
            return names[1];
        else
            return '';
    }
}]);