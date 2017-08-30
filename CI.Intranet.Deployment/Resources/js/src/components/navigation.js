'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'myDocumentsCtrl';

myApp.controller(controllerName, ['$scope', 'navigationService', 'COM_CONFIG', function ($scope, navigationService, COM_CONFIG) {
    var ctrl = this;
    ctrl.isSearchVisible = false;
    this.$onInit = function () {
        navigationService.getAllNodes().then(function (response) {
            ctrl.navNodes = response;
        });
        $('div.search-background > input').on('focus', function () {
            var txtVal = $('div.search-background > input').val();
            if (txtVal == 'Search') {
                $('div.search-background > input').val('');
            }
        });
        $('div.search-background > input').on('blur', function () {
            var txtVal = $('div.search-background > input').val();
            if (txtVal == '') {
                $('div.search-background > input').val('Search');
            }
        });
        $('div.search-background > input').on('keypress', function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            var txtVal = $('div.search-background > input').val();
            if (keycode == '13') {
                window.location = COM_CONFIG.searchWeb + '?k=' + txtVal;
            }            
        });
        
    };
    ctrl.activeNavNode = function () {
        
    };
    ctrl.toggleSearchBox = toggleSearchBox;
    ctrl.isSearchBoxVisible = false;
    ctrl.searchTitle = 'Search';

    function toggleSearchBox() {
        
        ctrl.isSearchVisible = !ctrl.isSearchVisible;
        if (ctrl.isSearchVisible) {
            $('div.search-background').show("slide", { direction: "right" }, 1000);
            $('#searchQueryTerm').focus();
            ctrl.searchTitle = '';
        }            
        else {
            $('div.search-background').hide("slide", { direction: "right" }, 1000);
            ctrl.searchTitle = 'Search';
        }
            
    }
}]).component('navigation', {
    template: require('../../includes/Navigation.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
