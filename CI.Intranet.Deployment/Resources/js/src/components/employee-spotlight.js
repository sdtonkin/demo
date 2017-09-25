'use strict';
var myApp = angular.module('compassionIntranet'),
    ctrlName = 'employeeSpotlightCtrl';

myApp.controller(ctrlName, ['$rootScope', '$scope', '$q', 'COM_CONFIG', function ($rootScope, $scope, $q, COM_CONFIG) {
    var ctrl = this;
    $scope.activeTab = 'g';
    this.$onInit = function () {
        console.log('employeeSpotlightCtrl', ctrl);
        $scope.viewAllUrl = ctrl.viewAllGratitudesUrl;
        $scope.viewAllHiresUrl = ctrl.viewAllHiresUrl;
        $scope.viewAllAnniversaryUrl = ctrl.viewAllAnniversaryUrl;
    };

    $scope.submitGratitude = function () {
        displaySubmitGratitude();
    }
    function displaySubmitGratitude() {
        var url = ctrl.submitGratitudeUrl;
        if (ctrl.newFormUrl) url = newFormUrl;
        var options = {};
        options.url = url;
        options.dialogReturnValueCallback = Function.createDelegate(null, null);

        SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
    }
}]).component('employeeSpotlight', {
    template: require('../../includes/Employee-Spotlight.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        viewAllGratitudesUrl: '@',
        submitGratitudeUrl: '@',
        viewAllHiresUrl: '@',
        viewAllAnniversaryUrl: '@'
    }
});