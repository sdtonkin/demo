'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'mySitesCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'spService', 'COM_CONFIG', function ($scope, common, spService, COM_CONFIG) {
    var ctrl = this;


    this.$onInit = function () {
        ctrl.siteCollectionUrl = (ctrl.siteCollectionUrl == null ? 'https://compassion.sharepoint.com/sites/stage' : ctrl.siteCollectionUrl);
        spService.getMySites(ctrl.siteCollectionUrl).then(function (data) {
            if (!COM_CONFIG.isProduction) { console.log('sites', data); }
            ctrl.mySites = data;
        });        
    };
}]).component('mySites', {
    template: require('../../includes/My-Sites.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    bindings: {
        siteCollectionUrl: '@'
    }
});
