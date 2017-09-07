'use strict';
angular.module('compassionIntranet').service('employeeAnnouncementService', ['$http', '$q', 'COM_CONFIG', 'storage','common', function ($http, $q, COM_CONFIG, storage, common) {
    var ctrl = this;
    var announcementKey = 'CI_EMPLOYEE_ANNOUNCEMENT_KEY';
    
    // clear local storage if url param is detected
    common.checkForClearStatement('clearEmployeeAnnouncements', announcementKey);
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

ctrl.getAnnouncement = getEmployeeAnnouncement
    function getEmployeeAnnouncement() {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        var today = new Date();
        web.lists.getByTitle(COM_CONFIG.lists.employeeAnnouncements).items
            .filter("COM_PublishDate <= '" + today + "' AND COM_ExpirationDate > '" + today + "'")
            .get()
            .then(function (data) {
                console.log('employee announcement', data);
                defer.resolve(data);
            });
        return defer.promise;
    }
}]);