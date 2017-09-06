'use strict';
var myApp = angular.module('compassionIntranet'),
    ctrlName = 'employeeSpotlightCtrl';

myApp.controller(ctrlName, ['$rootScope', '$scope', '$q', 'COM_CONFIG', function ($rootScope, $scope, $q, COM_CONFIG) {
    var ctrl = this;
    $scope.activeTab = 'g';
    this.$onInit = function () {
        console.log('employeeSpotlightCtrl', ctrl);
        $scope.viewAllUrl = ctrl.viewAllGratitudesUrl;
    };

    $scope.submitGratitude = function () {
        var url = ctrl.submitGratitudeUrl;
        if (ctrl.newFormUrl) url = newFormUrl;
        var options = SP.UI.$create_DialogOptions();
        options.url = url;
        options.dialogReturnValueCallback = Function.createDelegate(null, null);

        SP.UI.ModalDialog.showModalDialog(options);
    }
}]).component('employeeSpotlight', {
    template: require('../../includes/Employee-Spotlight.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        viewAllGratitudesUrl: '@',
        submitGratitudeUrl: '@'
    }
});