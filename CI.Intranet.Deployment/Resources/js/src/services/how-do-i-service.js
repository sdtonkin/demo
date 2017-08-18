'use strict';
angular.module('compassionIntranet').service('howDoIService', ['$http', '$q', 'COM_CONFIG', 'common', 'storage', function ($http, $q, COM_CONFIG, common, storage) {
    var ctrl = this;
    var howDoIKey = '' + _spPageContextInfo.userId;

    var delveUrl = '';
    // clear local storage if url param is detected
    common.checkForClearStatement('clearGroups', howDoIKey);
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    // set default expiration at 24 hours
    ctrl.expirationDuration = 24;
    ctrl.getLinks = function () {
        var defer = $q.defer();
        var local = storage.get(howDoIKey);
        if (local == null) {
            local = {};
            local.isExpired = true;
        }
        if (!local.isExpired)
            defer.resolve(local);
        else {
            defer.resolve(getLinks());
        }

        return defer.promise;
    };
    function getLinks() {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.resourceLinks).items
            .get()
            .then(function (data) {
                var links = [];
                var promises = [];
                var items = data;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var g = {};
                    g.id = item.Id;
                    g.name = item.Title;
                    g.url = item.Url.Url;

                }
            });

        return defer.promise;
    }
    
}]);