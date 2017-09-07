'use strict';
angular.module('compassionIntranet').service('employeeAnnouncementService', ['$http', '$q', 'COM_CONFIG', 'storage','common', function ($http, $q, COM_CONFIG, storage, common) {
    var ctrl = this;
    var announcementKey = 'CI_EMPLOYEE_ANNOUNCEMENT_KEY';
    
    // clear local storage if url param is detected
    common.checkForClearStatement('clearEmployeeAnnouncements', announcementKey);
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

ctrl.getAnnouncements = getEmployeeAnnouncements
    function getEmployeeAnnouncements() {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        var today = moment().format('YYYY-MM-DD') + 'T00:00:00Z';
        web.lists.getByTitle(COM_CONFIG.lists.employeeAnnouncements).items
            .filter("COM_PublishDate le '" + today + "' and COM_ExpirationDate gt '" + today + "'")
            .get()
            .then(function (data) {
                data.map(function (item) {
                    if (item.Title) {
                        item.title = item.Title
                    }            
                    if (item.COM_AnnoucementText) {
                        item.message = item.COM_AnnoucementText;
                    }
                    if (item.COM_ToolbarIconUrl) {
                        item.iconUrl = item.COM_ToolbarIconUrl;
                    }
                });
                console.log('employee announcement', data);
                defer.resolve(data);
            });
        return defer.promise;
    }
}]);