'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'contactCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'contactService', 'COM_CONFIG', function ($scope, common, contactService, COM_CONFIG) {
    var ctrl = this;

    this.$onInit = function () {
        contactService.getContacts().then(function (data) {
            ctrl.contact = data;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
            }
        });
    };

}]).component('contact', {
    template: require('../../includes/Contacts.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
