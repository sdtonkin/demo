'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'navigationCtrl';

myApp.controller(controllerName, ['$scope', 'navigationService', 'storage', 'COM_CONFIG', function ($scope, navigationService, storage, COM_CONFIG) {
    var ctrl = this;
    ctrl.isSearchVisible = false;
    ctrl.rootSiteUrl = COM_CONFIG.rootWeb;
    ctrl.showAlert = function () { alert('hi'); };
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
    ctrl.activeNavNode = function (node) {
        var pageUrl = _spPageContextInfo.serverRequestPath.toLowerCase();
        var siteUrl = _spPageContextInfo.webServerRelativeUrl;
        if (node.url.toLowerCase().endsWith(pageUrl)) 
            return true;
        if (node.url.endsWith(siteUrl))
            return true;
        if (_.contains(COM_CONFIG.groupSites, window.location.origin  + siteUrl) && node.title == 'Groups')
            return true;
        return false;
    };
    ctrl.toggleSearchBox = toggleSearchBox;
    ctrl.isSearchBoxVisible = false;
    ctrl.searchTitle = 'Search';

    function toggleSearchBox() {
        
        ctrl.isSearchVisible = !ctrl.isSearchVisible;
        if (ctrl.isSearchVisible) {
            // $('div.search-background').show("slide", { direction: "right" }, 1000);
            $('div.search-background').show();
            $('#searchQueryTerm').focus();
            ctrl.searchTitle = '';
            $('#navbarContent').addClass('active');
        }            
        else {
            //$('div.search-background').hide("slide", { direction: "right" }, 1000);
            $('div.search-background').hide();
            ctrl.searchTitle = 'Search';
            $('#navbarContent').removeClass('active');
        }
            
    }
}]).component('navigation', {
    template: require('../../includes/Navigation.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
