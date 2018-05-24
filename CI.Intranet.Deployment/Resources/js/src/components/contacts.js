'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'contactsCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'contactService', 'COM_CONFIG', function ($scope, common, contactService, COM_CONFIG) {
    var ctrl = this;

    this.$onInit = function () {
        var siteCollectionUrl = _spPageContextInfo.siteAbsoluteUrl;
        contactService.getContacts(siteCollectionUrl).then(function (data) {
            ctrl.contacts = data;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
            }
        });
    };

}]).component('contacts', {
    template: require('../../includes/Contacts.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
