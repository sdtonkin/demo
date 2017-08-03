'use strict';
angular.module('compassionIntranet').service('groupService', ['$http', '$q', 'COM_CONFIG', function ($http, $q, COM_CONFIG) {
    var ctrl = this;
    var groupsKey = '4FC856F1-CCF7-49C8-9971-22861DE3EB56' + _spPageContextInfo.userId;

    // clear local storage if url param is detected
    checkForClearStatement();
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    // set default expiration at 24 hours
    ctrl.expirationDuration = 24;
    ctrl.getGroups = function () {
        var local = storage.get(groupsKey);
        if (local == null) {
            local = {};
            local.isExpired = true;
        }   
        if (!local.isExpired)
            defer.resolve(local);
        else {
            let web = new $pnp.Web(COM_CONFIG.rootWeb);
            web.lists.getByTitle(COM_CONFIG.lists.userApps).items
                .filter("COM_ToolbarUser eq '" + userId + "'")
                .get()
                .then(function (data) {
                    var promises = new Array();
                    for (var i = 0; data.length > i; i++) {
                        var p = getUserApp(data[i]);
                        promises.push(p)
                    }
                    $q.all(promises).then(function (response) {
                        response = formatAppApps(response);
                        storage.set(userAppsKey, response, 0);
                        defer.resolve(response);
                    });
                });
        }
    };
}]);