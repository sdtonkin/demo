'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'myDepartmentController';

myApp.controller(controllerName, ['$scope', '$q', 'COM_CONFIG', 'userProfileService', function ($scope, $q, COM_CONFIG, userProfileService) {
    var ctrl = this;
    var delveUrl = COM_CONFIG.delveProfileUrl,
        picUrl = '/_layouts/15/userphoto.aspx?size=S&accountname='; 

    ctrl.toggleVisibility = function () {
        return ctrl.activeTab == 'people';
    }
    $scope.$on('activeTab', function (event, arg) {
        ctrl.activeTab = arg;
    });

    this.$onInit = function () {
        ctrl.activeTab = 'people';
        userProfileService.getCurrentUserProfile().then(function (data) {
            ctrl.myProfile = data;
            var department = _.find(data.UserProfileProperties, function (d) {
                return d.Key == 'Department';
            }).Value;
            if (!COM_CONFIG.isProduction) { console.log('getCurrentUserProfile', department); }
            userProfileService.getUsersInMyDepartment(department).then(function (data) {
                var response = [];
                for (var i = 0; i < data.length; i++) {
                    var p = data[i];
                    var d = {};
                    d.picUrl = COM_CONFIG.pictureUrl + p.UserName;
                    d.title = p.Title;
                    d.jobTitle = p.JobTitle;
                    d.email = p.EMail;
                    d.profileUrl = delveUrl + p.UserName;
                    response.push(d);
                }

                ctrl.myDepartment = response;
            });
        });
    };
    

}]).component('myDepartment', {
    template: require('../../includes/My-Department.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});